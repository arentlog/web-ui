'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icspr',
      recordName: 'icspraddchg',
      dataPath: 'api/ic/icspr',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsprsearch',
      searchResultsField: 'icsprresults',
      resultsRowIdField: 'icsprRowpointer',
      recordRowIdField: 'icsprRowpointer',
      copyStateView: 'ic/icspr/copy.json',
      recentlyVisited: {
         title: { label: '', valueFunction: 'base.formatRestrictType' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });

   $stateProvider.state('icspr.detail.customer', {
      url: '/customer-detail',
      params: {
         icsprtaddchg: null,
         customerSearchFunction: null,
         customerTypeList: null,
         customerTypeDefault: null,
         stateAllowed: null,
         zipcdAllowed: null,
         countryAllowed: null
      },
      views: {
         customerDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icspr/customer-detail.json');
            },
            controller: 'IcsprtDetailCtrl as sub'
         }
      }
   });

});

app.service('IcsprService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils, SecurityService) {

   var holdSearchRecord;
   var holdDefaultRestrictType;
   var holdDefaultRestrictList;

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the icsprAddChg table off selected Grid Record
      var path = 'api/ic/asicsetup/icsprload/' + stateParams.id;

      return DataService.getResource(path, { busy: true });

   };


   this.updateRecord = function (self, base, icspraddchg, scope, callback) {

      var icspraddchgList = [];

      self.icspraddchg.updatetype = 'Chg';

      icspraddchgList.push(icspraddchg);

      DataService.post('api/ic/asicsetup/icsprupdate', { data: icspraddchgList, busy: true }, function (data) {

         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data);
            }
         }
      });

   };


   this.createRecord = function (self, base, icspraddchg, scope, callback) {

      var icspraddchgList = [];

      self.icspraddchg.updatetype = 'Add';

      icspraddchgList.push(icspraddchg);

      DataService.post('api/ic/asicsetup/icsprupdate', { data: icspraddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data.icspraddchg[0]);
            }
         }
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var icspraddchg;

      var icspraddchgList = [];

      // Process one Row at a Time
      records.forEach(function (record) {

         icspraddchg = angular.copy(record);

         // Load initially as Activate
         icspraddchg.updatetype = 'Delete';

         icspraddchgList.push(icspraddchg);

      });

      DataService.post('api/ic/asicsetup/icsprupdate', { data: icspraddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data);
            }
         }
      });

   };


   // Copy - OK Button
   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

      var icspraddchgList = [];
      var icspraddchg = angular.copy(request);

      icspraddchg.updatetype = 'Copy';
      icspraddchg.icsprRowPointer = stateParams.id;

      icspraddchgList.push(icspraddchg);

      DataService.post('api/ic/asicsetup/icsprupdate', { data: icspraddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               // No Error
               // Pull in the first record and re-load the data.rowid field used in setup-ctrl with the rowpoinnter
               // CallBack displays the detail automatically off the callback data and refreshes the grid once off the detail
               if (data.icspraddchg.length) {
                  var record = data.icspraddchg[0];
                  record.rowid = record.icsprRowpointer;
                  callback(record);
               }
            }
         }
      });

   };


   // Copy - Initialize the fields for the Copy screen
   this.extendCopyController = function (self, base, request, scope, stateParams) {

      var restrictType = stateParams.object.restricttype;

      // Display the Type of Restriction
      if (restrictType) {
         switch (restrictType.toUpperCase()) {
            case 'PR':                                                                       //ignore jslint - correct indentation
               request.restrictTypeList = MessageService.get('global.product');              //ignore jslint - correct indentation
               request.product = stateParams.object.columnvalue1;                            //ignore jslint - correct indentation
               break;                                                                        //ignore jslint - correct indentation
            case 'PL':                                                                       //ignore jslint - correct indentation
               request.restrictTypeList = MessageService.get('global.product.line');         //ignore jslint - correct indentation
               request.prodline = stateParams.object.columnvalue1;                           //ignore jslint - correct indentation
               request.vendno = parseFloat(stateParams.object.columnvalue2);                 //ignore jslint - correct indentation
               break;                                                                        //ignore jslint - correct indentation
            case 'PC':                                                                       //ignore jslint - correct indentation
               request.restrictTypeList = MessageService.get('global.product.category');     //ignore jslint - correct indentation
               request.prodcat = stateParams.object.columnvalue1;                            //ignore jslint - correct indentation
               break;                                                                        //ignore jslint - correct indentation
            case 'PT':                                                                       //ignore jslint - correct indentation
               request.restrictTypeList = MessageService.get('global.product.price.type');   //ignore jslint - correct indentation
               request.prodprctype = stateParams.object.columnvalue1;                        //ignore jslint - correct indentation
               break;                                                                        //ignore jslint - correct indentation
            case 'BC':                                                                       //ignore jslint - correct indentation
               request.restrictTypeList = MessageService.get('global.brand.code');           //ignore jslint - correct indentation
               request.brandcd = stateParams.object.columnvalue1;                            //ignore jslint - correct indentation
               break;                                                                        //ignore jslint - correct indentation
            default:                                                                         //ignore jslint - correct indentation
               request.restrictTypeList = MessageService.get('global.invalid');              //ignore jslint - correct indentation
               break;                                                                        //ignore jslint - correct indentation
         }
      }

      // On Screen Fields that can change
      request.restricttype = restrictType;
      request.whse = stateParams.object.whse;
      request.startdt = stateParams.object.startdt;
      request.expiredt = stateParams.object.expiredt;
      request.updatetype = 'Copy';

      // Full Table of values to copy off the existing record data
      request.activefl = stateParams.object.activefl;
      request.statuscd = stateParams.object.statuscd;
      request.restrictcd = stateParams.object.restrictcd;
      request.certrequiredfl = stateParams.object.certrequiredfl;
      request.restrictovrfl = stateParams.object.restrictovrfl;
      request.user1 = stateParams.object.user1;
      request.user2 = stateParams.object.user2;
      request.user3 = stateParams.object.user3;
      request.user4 = stateParams.object.user4;
      request.user5 = stateParams.object.user5;
      request.user6 = stateParams.object.user6;
      request.user7 = stateParams.object.user7;
      request.user8 = stateParams.object.user8;
      request.user9 = stateParams.object.user9;

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         if (request.startdt) {
            subTitleText = Utils.formatDate(request.startdt);
         }

         if (request.whse) {
            subTitleText += ' | ' + request.whse;
         }

         if (request.restricttype) {

            switch (request.restricttype.toUpperCase()) {
               case 'PR':                                               //ignore jslint - correct indentation
                  subTitleText += ' | ' + request.product;              //ignore jslint - correct indentation
                  break;                                                //ignore jslint - correct indentation
               case 'PL':                                               //ignore jslint - correct indentation
                  subTitleText += ' | ' + request.prodline;             //ignore jslint - correct indentation
                  if (request.vendno) {                                 //ignore jslint - correct indentation
                     subTitleText += ' | ' + request.vendno;            //ignore jslint - correct indentation
                  }                                                     //ignore jslint - correct indentation
                  break;                                                //ignore jslint - correct indentation
               case 'PC':                                               //ignore jslint - correct indentation
                  subTitleText += ' | ' + request.prodcat;              //ignore jslint - correct indentation
                  break;                                                //ignore jslint - correct indentation
               case 'PT':                                               //ignore jslint - correct indentation
                  subTitleText += ' | ' + request.prodprctype;          //ignore jslint - correct indentation
                  break;                                                //ignore jslint - correct indentation
               case 'BC':                                               //ignore jslint - correct indentation
                  subTitleText += ' | ' + request.brandcd;              //ignore jslint - correct indentation
                  break;                                                //ignore jslint - correct indentation
               default:                                                          //ignore jslint - correct indentation
                  subTitleText += ' | ' + MessageService.get('global.invalid');  //ignore jslint - correct indentation
                  break;                                                         //ignore jslint - correct indentation
            }

         }
         return subTitleText;
      };

   };

   this.extendMasterController = function (self, base, scope) {

      self.restrictTypeList = [];
      var holdDefaultRestrictArray;
      var holdAllowWhseField = AodataService.getValue("ICSPR", "ICRestrictionByWhse");

      self.vendorInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // APIV HyperLink - vendor #
         if (currentRow && parseFloat(currentRow.columnvalue2) > 0) {
            $state.go('apiv.detail', { pk: parseFloat(currentRow.columnvalue2)});
         }
      };

      // Load the Restriction Types based off AO Settings
      DataService.get('api/ic/asicsetup/icsprinitialize', { busy: true }, function (data) {

         var dropDownLabel;
         var restrictType;

         if (data) {

            // Parse out the comma delimited field value for the drop down list
            var restrictTypeArray = [];
            restrictTypeArray = data.icsprdropdownlist.split(",");

            // Build the Drop Down data
            for (var i = 0; i <= restrictTypeArray.length; i++) {

               restrictType = restrictTypeArray[i];

               if (restrictType) {
                  switch (restrictType.toUpperCase()) {
                     case 'PR':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product');                   //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'PL':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.line');              //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'PC':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.category');          //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'PT':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.price.type');        //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'BC':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.brand.code');                //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     default:                                                                   //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.invalid');                   //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                  }

                  self.restrictTypeList.push({ value: restrictType, label: dropDownLabel });

                  if (restrictType === data.icsprselectiontype) {
                     holdDefaultRestrictArray = i;
                  }
               }
            }

            // Load the Default drop down setting
            if (self.restrictTypeList.length) {
               self.advCriteria.restricttype = self.restrictTypeList[holdDefaultRestrictArray].value;
               holdDefaultRestrictType = self.advCriteria.restricttype;
               holdDefaultRestrictList = self.advCriteria.restrictTypeList;

               // Load the correct columns
               if (base.criteria && base.criteria.restricttype) {
                  base.loadRestrictType(base.criteria.restricttype); 
               } else {
                  base.loadRestrictType(self.advCriteria.restricttype);
               }

            }
         }
      });

      // Advanced search criteria object with initial values
      self.advCriteria = {
         restricttype: holdDefaultRestrictType,
         statuscd: '',
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'statuscd', label: MessageService.get('global.status') },
         { value: 'expiredactivefl', label: MessageService.get('global.expired.active') },
         { value: 'certrequiredfl', label: MessageService.get('global.certificate.license.required') },
         { value: 'restrictovrfl', label: MessageService.get('global.restriction.override') },
         { value: 'begexpiredt', label: MessageService.get('global.from.expire.date') },
         { value: 'endexpiredt', label: MessageService.get('global.to.expire.date') },
         { value: 'startdt', label: MessageService.get('global.start.date') },
         { value: 'custno', label: MessageService.get('global.customer.number') },
         { value: 'shipto', label: MessageService.get('global.ship.to') },
         { value: 'certcode', label: MessageService.get('global.certificate.license.id') },
         { value: 'restrictcd', label: MessageService.get('global.restriction.code') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') }
      ];

      // Add Whse if AO Setting is set to Allow
      if (holdAllowWhseField) {
         self.criteriaList.push({ value: 'whse', label: MessageService.get('global.warehouse') });
      }

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['restricttype', 'product', 'prodline', 'vendno', 'prodcat', 'prodprctype', 'brandcd', 'statuscd', 'startdt', 'begexpiredt', 'endexpiredt'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         holdSearchRecord = criteria;

         // Load the Colum Label
         base.loadRestrictType(criteria.restricttype);

         DataService.post('api/ic/asicsetup/icsprsearch', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.icsprresults;

               if (data.lMoreRecords) {
                  MessageService.alert('global.warning', data.cWarningMsg);
               }
            }

         });
      };

      // Action - Activate or Deactivate selected records
      self.doAction = function (mode) {

         // Pull in Selected Rows
         var records = GridService.getSelectedRecords(base.grid);
         var icspraddchgList = [];

         // Process one Row at a Time
         records.forEach(function (record) {

            // Copy in the data selected
            var icspraddchg = angular.copy(record);

            // Load initially as Activate
            icspraddchg.updatetype = 'Chg';
            icspraddchg.activefl = true;

            // Change to Inactive if selected
            if (mode === 'inactivate') {
               icspraddchg.activefl = false;
            }

            // Push the changed data above to the table sending
            icspraddchgList.push(icspraddchg);

         });

         // Update all Selected Records
         DataService.post('api/ic/asicsetup/icsprupdate', { data: icspraddchgList, busy: true }, function (data) {

            if (data) {

               // Display any Messages/Errors - ttblmessaging
               if (!MessageService.processMessaging(data.messaging)) {

                  // No Error - read in the Records to Update the Selected Records
                  data.icspraddchg.forEach(function (record) {

                     // Unique ID for the Row Updated
                     var idx = base.dataset.findIndex(function (search) {
                        return search.icsprRowpointer === record.icsprRowpointer;
                     });

                     if (idx >= 0) {

                        // Update the Row in the Grid
                        base.dataset[idx].activefl = record.activefl;

                        // Refresh the Row Selected
                        base.grid.updateRow(idx);
                     }

                  });

               } else {
                  // Error occurred - refresh Grid (search) for Rows Updated - resetting the row with the error
                  if (holdSearchRecord !== '') {
                     self.search();
                  } else {
                     base.refreshSearch = true;
                     $state.go('^.master', null, { reload: '^.master' });
                  }
               }
            }
         });

      };

   };


   this.extendBaseController = function (self) {

      self.restrictTypeList = [];
      self.customerTypeList = [];
      self.customerFullList = [];
      var holdDefaultRestrictArray;
      var holdSelectedRestrictType;
      var holdAllowWhseField = AodataService.getValue("ICSPR", "ICRestrictionByWhse");

      // Load the Restriction Types based off AO Settings
      DataService.get('api/ic/asicsetup/icsprinitialize', { busy: true }, function (data) {

         var dropDownLabel;
         var restrictType;
         var customerType;
         var i;

         if (data) {

            // Parse out the comma delimited field value for the drop down lists
            var restrictTypeArray = [];
            restrictTypeArray = data.icsprdropdownlist.split(",");

            // Build the Restrictions Drop Down data
            for (i = 0; i <= restrictTypeArray.length; i++) {

               restrictType = restrictTypeArray[i];

               if (restrictType) {
                  switch (restrictType.toUpperCase()) {
                     case 'PR':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product');                      //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PL':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.line');                 //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PC':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.category');             //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PT':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.price.type');           //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'BC':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.brand.code');                   //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     default:                                                                      //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.invalid');                      //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                  }

                  self.restrictTypeList.push({ value: restrictType, label: dropDownLabel });

                  if (restrictType === data.icsprselectiontype) {
                     holdDefaultRestrictArray = i;
                  }
               }
            }

            // Load the Default drop down setting
            if (self.restrictTypeList.length) {
               self.criteria.restricttype = self.restrictTypeList[holdDefaultRestrictArray].value;
               holdDefaultRestrictType = self.criteria.restricttype;
               holdDefaultRestrictList = self.criteria.restrictTypeList;

               // Load the Colum Label
               self.loadRestrictType(self.criteria.restricttype);

            }

            // Build the Customer Drop Down data
            var customerTypeArray = [];
            customerTypeArray = data.icsprtdropdownlist.split(",");

            // Add All for the Search Default Selection
            self.customerFullList.push({ value: 'All', label: MessageService.get('global.all') });

            for (i = 0; i <= customerTypeArray.length; i++) {

               customerType = customerTypeArray[i];

               // Set the First AO Value for ICSPRT records as the Default for 'New' records
               if (i === 0) {
                  self.customerTypeDefault = customerType;
               }

               if (customerType) {
                  switch (customerType.toUpperCase()) {
                     case 'CN':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.customer.number');           //ignore jslint - correct indentation
                        self.custnoAllowed = true;                                              //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'ST':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.ship.to');                   //ignore jslint - correct indentation
                        self.shiptoAllowed = true;                                              //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'CS':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.city.dash.state');           //ignore jslint - correct indentation
                        self.stateAllowed = true;                                               //ignore jslint - correct indentation
                        self.cityAllowed = true;                                                //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'ZC':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.postal.code');               //ignore jslint - correct indentation
                        self.zipcdAllowed = true;                                               //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'CC':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.country.code');              //ignore jslint - correct indentation
                        self.countryAllowed = true;                                             //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'CL':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.certificate.code');          //ignore jslint - correct indentation
                        self.certcodeAllowed = true;                                            //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'CT':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.customer.type');             //ignore jslint - correct indentation
                        self.custtypeAllowed = true;                                            //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'CP':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.customer.price.type');       //ignore jslint - correct indentation
                        self.pricetypeAllowed = true;                                           //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     case 'TE':                                                                 //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.customer.territory');        //ignore jslint - correct indentation
                        self.salesterrAllowed = true;                                           //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                     default:                                                                   //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.invalid');                   //ignore jslint - correct indentation
                        break;                                                                  //ignore jslint - correct indentation
                  }

                  self.customerTypeList.push({ value: customerType, label: dropDownLabel });
                  self.customerFullList.push({ value: customerType, label: dropDownLabel });

               }
            }

         }
      });

      // Column Label - loaded off Search Choice
      self.loadRestrictType = function (restrictType) {

         if (restrictType) {

            holdSelectedRestrictType = restrictType;

            switch (restrictType.toUpperCase()) {
               case 'PR':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product');                      //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PL':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product.line');                 //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PC':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product.category');             //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PT':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product.price.type');           //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'BC':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.brand.code');                   //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               default:                                                                               //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.invalid');                      //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
            }
         }
      };


      // Format function for record type in recently visited display
      self.formatRestrictType = function (icspr) {

         var restrictType = icspr.restricttype;
         var recentTitle;

         if (restrictType) {
            switch (restrictType.toUpperCase()) {
               case 'PR':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product') + ': ' + icspr.product;                      //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'PL':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product.line') + ': ' + icspr.prodline;                //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'PC':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product.category') + ': ' + icspr.prodcat;             //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'PT':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product.price.type') + ': ' + icspr.prodprctype;       //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'BC':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.brand.code') + ': ' + icspr.brandcd;                   //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               default:                                                                                           //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.invalid');                                             //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
            }
         }

         return recentTitle;
      };


      // Format function for record Description data in recently visited display
      self.formatSubData = function (icspr) {

         var restrictType = icspr.restricttype;
         var recentSubTitle;

         if (restrictType) {
            switch (restrictType.toUpperCase()) {
               case 'PL':                                                                                      //ignore jslint - correct indentation
                  if (icspr.vendno) {                                                                          //ignore jslint - correct indentation
                     recentSubTitle = $translate.instant('global.vendor.number') + ': ' + icspr.vendno;        //ignore jslint - correct indentation

                     if (icspr.whse) {                                                                         //ignore jslint - correct indentation
                        recentSubTitle += ', ' + $translate.instant('global.warehouse') + ': ' + icspr.whse;   //ignore jslint - correct indentation

                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle += ', ' + $translate.instant('global.start.date') +                  //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     } else {                                                                                  //ignore jslint - correct indentation
                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle += ', ' + $translate.instant('global.start.date') +                  //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  } else {                                                                                     //ignore jslint - correct indentation
                     if (icspr.whse) {                                                                         //ignore jslint - correct indentation
                        recentSubTitle = $translate.instant('global.warehouse') + ': ' + icspr.whse;           //ignore jslint - correct indentation

                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle += ', ' + $translate.instant('global.start.date') +                  //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     } else {                                                                                  //ignore jslint - correct indentation
                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle = $translate.instant('global.start.date') +                          //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  }                                                                                            //ignore jslint - correct indentation
                  break;                                                                                       //ignore jslint - correct indentation
               case 'PR':                                                                                      //ignore jslint - correct indentation
               case 'PC':                                                                                      //ignore jslint - correct indentation
               case 'PT':                                                                                      //ignore jslint - correct indentation
               case 'BC':                                                                                      //ignore jslint - correct indentation
                  if (icspr.whse) {                                                                            //ignore jslint - correct indentation
                     recentSubTitle = $translate.instant('global.warehouse') + ': ' + icspr.whse;              //ignore jslint - correct indentation

                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle += ', ' + $translate.instant('global.start.date') +                     //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  } else {                                                                                     //ignore jslint - correct indentation
                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle = $translate.instant('global.start.date') +                             //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  }                                                                                            //ignore jslint - correct indentation
                  break;                                                                                       //ignore jslint - correct indentation
               default:                                                                                        //ignore jslint - correct indentation
                  if (icspr.whse) {                                                                            //ignore jslint - correct indentation
                     recentSubTitle = $translate.instant('global.warehouse') + ': ' + icspr.whse;              //ignore jslint - correct indentation

                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle += ', ' + $translate.instant('global.start.date') +                     //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  } else {                                                                                     //ignore jslint - correct indentation
                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle = $translate.instant('global.start.date') +                             //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  }                                                                                            //ignore jslint - correct indentation
                  break;                                                                                       //ignore jslint - correct indentation
            }
         }

         return recentSubTitle;
      };

      self.allowWhseField = function () {
         return holdAllowWhseField;
      };


      self.displayVendorColumn = function () {
         if (holdSelectedRestrictType === 'PL') {
            return true;
         }
         else {
            return false;
         }
      };
   };


   this.extendSearchController = function (self, base, criteria, scope) {

      base.criteria.statuscd = '';
      base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

      // If the Record Type changes - reset the type data - keep the record type as is
      base.setResetRecordDefaults = function () {

         if (base.criteria.restricttype) {
            base.criteria.product = '';
            base.criteria.prodline = '';
            base.criteria.whse = '';
            base.criteria.vendno = '0';
            base.criteria.prodcat = '';
            base.criteria.prodprctype = '';
            base.criteria.brandcd = '';
            base.criteria.statuscd = '';
            base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

            if (base.restrictTypeList.length) {
               base.criteria.restricttype = holdDefaultRestrictType;
            }
         }
      };

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

         if (base.restrictTypeList.length) {
            base.criteria.restricttype = holdDefaultRestrictType;
         }

      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icspr.master');
         }

         // Load the Colum Label
         base.loadRestrictType(base.criteria.restricttype);

         holdSearchRecord = '';

         base.search();
      };

   };


   this.extendDetailController = function (self, base, icspraddchg, scope) {

      self.criteriaType = 'All';
      self.customerTypeList = base.customerTypeFullList;

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icspr', 'General') < 3;
      self.isCustomerTabReadonly = SecurityService.getSubSecurityLevel('icspr', 'Customer') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icspr', 'Custom') < 3;

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         if (self.icspraddchg.restricttype) {

            subTitleText = MessageService.get('global.restriction.type') + ': ';

            switch (self.icspraddchg.restricttype.toUpperCase()) {
               case 'PR':                                                              //ignore jslint - correct indentation
                  subTitleText += MessageService.get('global.product');                //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               case 'PL':                                                              //ignore jslint - correct indentation
                  subTitleText += MessageService.get('global.product.line');           //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               case 'PC':                                                              //ignore jslint - correct indentation
                  subTitleText += MessageService.get('global.product.category');       //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               case 'PT':                                                              //ignore jslint - correct indentation
                  subTitleText += MessageService.get('global.product.price.type');     //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               case 'BC':                                                              //ignore jslint - correct indentation
                  subTitleText += MessageService.get('global.brand.code');             //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               default:                                                                //ignore jslint - correct indentation
                  subTitleText += MessageService.get('global.invalid');                //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
            }

         }
         return subTitleText;
      };

   };

   this.extendCreateController = function (self, base, icspraddchg, scope) {

      self.icspraddchg.restricttype = base.criteria.restricttype;
      self.icspraddchg.activefl = true;
      self.icspraddchg.statuscd = 'N';
      self.icspraddchg.recordtype = 'S';

   };

});



app.controller('IcsprDetailCustomerCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {

   // self = cst
   var self = this;

   var base = $scope.base;

   // Detail ICSPR record
   var icspraddchg = $scope.dtl.icspraddchg;


   // ARIC Hyperlink - customer
   self.customerInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.custno > 0) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // ARIC Hyperlink - customer/shipto
   self.shiptoInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };


   // Drill down - sub level
   self.drilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         record.updatetype = 'Chg';
         $state.go('icspr.detail.customer', {
            icsprtaddchg: record,
            customerSearchFunction: self.search,
            customerTypeList: base.customerTypeList,
            customerTypeDefault: base.customerTypeDefault,
            stateAllowed: base.stateAllowed,
            zipcdAllowed: base.zipcdAllowed,
            countryAllowed: base.countryAllowed
         });
      }

   };


   // Create - Build default data
   self.create = function () {
      var record;

      record = {
         srcrowpointer: icspraddchg.icsprRowpointer,
         updatetype: 'Add'
      };

      $state.go('icspr.detail.customer', {
         icsprtaddchg: record,
         customerSearchFunction: self.search,
         customerTypeList: base.customerTypeList,
         customerTypeDefault: base.customerTypeDefault,
         stateAllowed: base.stateAllowed,
         zipcdAllowed: base.zipcdAllowed,
         countryAllowed: base.countryAllowed
      });
   };


   // Search Selection - Build Grid Data - customerList
   self.search = function () {

      var icsprtcriteriaList = [];

      var customerCriteria = {
         srcrowpointer: icspraddchg.icsprRowpointer,
         territorycd: $scope.dtl.criteriaType
      };

      icsprtcriteriaList.push(customerCriteria);

      DataService.post('api/ic/asicsetup/icsprtsearch', { data: icsprtcriteriaList, busy: true }, function (data) {
         if (data) {

            // Load the Records into the Grid
            self.icsprtList = data;
         }
      });
   };


   // Delete - Single Record
   self.delete = function () {

      var record;

      record = GridService.getSelectedRecord(self.grid);

      if (record) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var customerDetailCriteria = {
               updatetype: 'Delete',
               srcrowpointer: icspraddchg.icsprRowpointer,
               territorycd: record.territorycd,
               seqno: record.seqno
            };

            DataService.post('api/ic/asicsetup/icsprtupdate', { data: customerDetailCriteria, busy: true }, function (data) {
               if (data) {
                  self.search();
               }
            });

         });
      }

   };

   // Search when first enter the Detail Tab
   if ($state.is('icspr.create')) {
      self.search();
   } else {
      icspraddchg.$promise.then(function () {
         self.search();
      });
   };

   self.allowCustomerField = function () {
      return base.custnoAllowed;
   };

   self.allowShipToField = function () {
      return base.shiptoAllowed;
   };

   self.allowCityField = function () {
      return base.cityAllowed;
   };

   self.allowStateField = function () {
      return base.stateAllowed;
   };

   self.allowZipCdField = function () {
      return base.zipcdAllowed;
   };

   self.allowCountryField = function () {
      return base.countryAllowed;
   };

   self.allowCustTypeField = function () {
      return base.custtypeAllowed;
   };

   self.allowPriceTypeField = function () {
      return base.pricetypeAllowed;
   };

   self.allowCertCodeField = function () {
      return base.certcodeAllowed;
   };

   self.allowSalesTerrField = function () {
      return base.salesterrAllowed;
   };

});


app.controller('IcsprtDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {

   // self = sub
   var self = this;
   var icspraddchg = $scope.dtl.icspraddchg;
   self.customerFullList = $stateParams.customerTypeList;
   self.stateAllowed = $stateParams.stateAllowed;
   self.zipcdAllowed = $stateParams.zipcdAllowed;
   self.countryAllowed = $stateParams.countryAllowed;

   // Single Grid Record Selected or New Record for Add
   self.icsprtaddchg = $stateParams.icsprtaddchg;


   // Add mode
   if (self.icsprtaddchg.updatetype === 'Add') {
      self.icsprtaddchg.territorycd = $stateParams.customerTypeDefault;
   }


   // Sensitivity of Fields
   self.isChangeMode = function () {
      return self.icsprtaddchg.updatetype === 'Chg';
   };


   // Visibility of the Fields based on type and usable field settings
   self.isVisible = function (fieldType) {

      if (fieldType) {

         switch (fieldType.toLowerCase()) {
            case 'custno':                                                                                     //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CN' || self.icsprtaddchg.territorycd === 'ST') {         //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'shipto':                                                                                     //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'ST') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'city':                                                                                       //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CS') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'state':                                                                                      //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CS') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               } else if (self.icsprtaddchg.territorycd === 'CN' || self.icsprtaddchg.territorycd === 'ST') {  //ignore jslint - correct indentation
                  return self.stateAllowed;                                                                    //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'zipcd':                                                                                      //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'ZC') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               } else if (self.icsprtaddchg.territorycd === 'CN' || self.icsprtaddchg.territorycd === 'ST') {  //ignore jslint - correct indentation
                  return self.zipcdAllowed;                                                                    //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'countrycd':                                                                                  //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CC') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               } else if (self.icsprtaddchg.territorycd === 'CN' || self.icsprtaddchg.territorycd === 'ST') {  //ignore jslint - correct indentation
                  return self.countryAllowed;                                                                  //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'certcode':                                                                                   //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CL') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'custtype':                                                                                   //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CT') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'pricetype':                                                                                  //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'CP') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            case 'salesterr':                                                                                  //ignore jslint - correct indentation
               if (self.icsprtaddchg.territorycd === 'TE') {                                                   //ignore jslint - correct indentation
                  return true;                                                                                 //ignore jslint - correct indentation
               }                                                                                               //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
            default:                                                                                           //ignore jslint - correct indentation
               return false;                                                                                   //ignore jslint - correct indentation
               break;                                                                                          //ignore jslint - correct indentation
         }

         return false;

      }
   };

   // Save Button
   self.submit = function () {

      var customerDetailCriteria = {
         updatetype: self.icsprtaddchg.updatetype,
         srcrowpointer: icspraddchg.icsprRowpointer,
         territorycd: self.icsprtaddchg.territorycd,
         seqno: self.icsprtaddchg.seqno,
         custno: self.icsprtaddchg.custno,
         shipto: self.icsprtaddchg.shipto,
         city: self.icsprtaddchg.city,
         state: self.icsprtaddchg.state,
         zipcd: self.icsprtaddchg.zipcd,
         countrycd: self.icsprtaddchg.countrycd,
         custtype: self.icsprtaddchg.custtype,
         pricetype: self.icsprtaddchg.pricetype,
         salesterr: self.icsprtaddchg.salesterr,
         certcode: self.icsprtaddchg.certcode,
         user1: self.icsprtaddchg.user1,
         user2: self.icsprtaddchg.user2,
         user3: self.icsprtaddchg.user3,
         user4: self.icsprtaddchg.user4,
         user5: self.icsprtaddchg.user5,
         user6: parseFloat(self.icsprtaddchg.user6),
         user7: parseFloat(self.icsprtaddchg.user7),
         user8: new Date(self.icsprtaddchg.user8),
         user9: new Date(self.icsprtaddchg.user9)
      };

      DataService.post('api/ic/asicsetup/icsprtupdate', { data: customerDetailCriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               // Return to Customer Grid - Refresh Search
               $state.go('^');
               $stateParams.customerSearchFunction();
            }
         }
      });

   };

});