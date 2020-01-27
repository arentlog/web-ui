'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icspc',
      recordName: 'icspcaddchg',
      dataPath: 'api/ic/icspc',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icspcsearch',
      searchResultsField: 'icspcresults',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'icspcRowpointer',
      recordRowIdField: 'icspcRowpointer',
      copyStateView: 'ic/icspc/copy.json',
      recentlyVisited: {
         title: { label: '', valueFunction: 'base.formatRecordType' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });

   $stateProvider.state('icspc.detail.product', {
      url: '/product-detail',
      params: { icspcdaddchg: null, productSearchFunction: null },
      views: {
         productDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icspc/product-detail.json');
            },
            controller: 'IcspcdDetailCtrl as sub'
         }
      }
   });

});


app.service('IcspcService', function ($translate, $state, DataService, MessageService, UserService, ConfigService, GridService, Utils, Sasoo, UtilsData, SecurityService) {

   var holdSearchRecord;

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the ICSPCAddChg table off selected Grid Record
      var path = 'api/ic/asicsetup/icspcload/' + stateParams.id;

      return DataService.getResource(path, { busy: true });

   };


   this.updateRecord = function (self, base, icspcaddchg, scope, callback) {

      var icspcaddchgList = [];

      self.icspcaddchg.updatetype = 'Chg';

      icspcaddchgList.push(icspcaddchg);

      DataService.post('api/ic/asicsetup/icspcupdate', { data: icspcaddchgList, busy: true }, function (data) {

         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data);
            }
         }
      });

   };

   this.createRecord = function (self, base, icspcaddchg, scope, callback) {

      var icspcaddchgList = [];

      self.icspcaddchg.updatetype = 'Add';

      icspcaddchgList.push(icspcaddchg);

      DataService.post('api/ic/asicsetup/icspcupdate', { data: icspcaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data.icspcaddchg[0]);
            }
         }
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var icspcaddchg;

      var icspcaddchgList = [];

      // Process one Row at a Time
      records.forEach(function (record) {

         icspcaddchg = angular.copy(record);

         // Load initially as Activate
         icspcaddchg.updatetype = 'Del';

         icspcaddchgList.push(icspcaddchg);

      });

      DataService.post('api/ic/asicsetup/icspcupdate', { data: icspcaddchgList, busy: true }, function (data) {
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

      var icspcaddchgList = [];
      var icspcaddchg = angular.copy(request);

      icspcaddchg.updatetype = 'Copy';
      icspcaddchg.icspcRowPointer = stateParams.id;

      icspcaddchgList.push(icspcaddchg);

      DataService.post('api/ic/asicsetup/icspcupdate', { data: icspcaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               // Pull in the first record and re-load the data.rowid field used in setup-ctrl with the rowpoinnter
               // CallBack displays the detail automatically off the callback data and refreshes the grid once off the detail
               if (data.icspcaddchg.length) {
                  var record = data.icspcaddchg[0];
                  record.rowid = record.icspcRowpointer;
                  callback(record);
               }
            }
         }
      });

   };


   // Copy - Initialize the fields for the Copy screen
   this.extendCopyController = function (self, base, request, scope, stateParams) {

      var firstChar = stateParams.object.recordtype.substring(0, 1);
      var setupType = 'R';

      if (firstChar) {
         if (firstChar.toUpperCase() === 'F') {
            setupType = 'F';
         }
      }

      // Screen Values
      request.setuptype = setupType;
      request.whse = stateParams.object.whse;
      request.custno = stateParams.object.custno;
      request.shipto = stateParams.object.shipto;
      request.shiptogrp = stateParams.object.shiptogrp;
      request.startdt = stateParams.object.startdt;
      request.expiredt = stateParams.object.expiredt;
      request.copydetailfl = false;
      request.copyusage = 'A';

      // Full Record Fields - Not on the Screen -
      // NOTE: ActiveFl is excluded since Active turns on ICSW Updates/Resesrvations
      request.contractno = stateParams.object.contractno;
      request.refer = stateParams.object.refer;
      request.fillpriority = stateParams.object.fillpriority;
      request.user1 = stateParams.object.user1;
      request.user2 = stateParams.object.user2;
      request.user3 = stateParams.object.user3;
      request.user4 = stateParams.object.user4;
      request.user5 = stateParams.object.user5;
      request.user6 = stateParams.object.user6;
      request.user7 = stateParams.object.user7;
      request.user8 = stateParams.object.user8;
      request.user9 = stateParams.object.user9;
   };


   this.extendBaseController = function (self) {

      self.recordTypeLabel = MessageService.get('global.reservation.type');

      // Column Label - loaded off Search Choice
      self.loadRecordType = function (setupType) {
         var recordType = setupType;

         if (recordType) {
            switch (recordType.toUpperCase()) {
               case 'R':
                  self.recordTypeLabel = MessageService.get('global.reservation.type');
                  break;
               case 'F':
                  self.recordTypeLabel = MessageService.get('global.forecast.type');
                  break;
            }
         }
      };

      // Record type in recently visited display
      self.formatRecordType = function (icspc) {

         var recordType = '';

         if (icspc.icspcaddchg) {
            recordType = icspc.icspcaddchg[0].recordtype;
         } else {
            recordType = icspc.recordtype;
         }

         if (recordType) {
            switch (recordType.toUpperCase()) {
               case 'C':
               case 'S':
                  return $translate.instant('global.reservation') + ': ' + $translate.instant('global.customer.number');
               case 'FC':
               case 'FS':
               case 'FG':
                  return $translate.instant('global.forecast') + ': ' + $translate.instant('global.customer.number');

               default:
                  return recordType;
            }
         } else {
            return recordType;
         }
      };

      // Format function for record Description data in recently visited display
      self.formatSubData = function (icspc) {

         var recordType = '';
         var whseValue = '';
         var customerNo = 0;
         var shipToNumber = '';
         var shipToGroup = '';

         if (icspc.icspcaddchg) {
            recordType = icspc.icspcaddchg[0].recordtype;
            whseValue = icspc.icspcaddchg[0].whse;
            customerNo = icspc.icspcaddchg[0].custno;
            shipToNumber = icspc.icspcaddchg[0].shipto;
            shipToGroup = icspc.icspcaddchg[0].shiptogrp;
         } else {
            recordType = icspc.recordtype;
            whseValue = icspc.whse;
            customerNo = icspc.custno;
            shipToNumber = icspc.shipto;
            shipToGroup = icspc.shiptogrp;
         }

         var recentSubTitle;

         recentSubTitle = customerNo;

         if (shipToNumber) {
            recentSubTitle += ', ' + $translate.instant('global.ship.to') + ': ' + shipToNumber;
         };

         if (shipToGroup) {
            recentSubTitle += ', ' + $translate.instant('global.ship.to.group') + ': ' + shipToGroup;
         }

         if (whseValue) {
            recentSubTitle += ', ' + $translate.instant('global.warehouse') + ': ' + whseValue;
         }

         return recentSubTitle;
      };

   };


   this.extendMasterController = function (self, base, scope) {



      self.customerInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ARIC HyperLink
         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno });
         }
      };

      self.shiptoInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };

      // Advanced search criteria object with initial values
      self.advCriteria = {
         whse: Sasoo.whse,
         setuptype: 'R',
         statuscd: '',
         pullqtycd: '',
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'contractno', label: MessageService.get('global.contract.number') },
         { value: 'custno', label: MessageService.get('global.customer.number') },
         { value: 'begexpiredt', label: MessageService.get('global.from.expire.date') },
         { value: 'begstartdt', label: MessageService.get('global.from.start.date') },
         { value: 'product', label: MessageService.get('global.product') },
         { value: 'pullqtycd', label: MessageService.get('global.pull.quantity') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') },
         { value: 'refer', label: MessageService.get('global.reference') },
         { value: 'setuptype', label: MessageService.get('global.setup.type') },
         { value: 'shipto', label: MessageService.get('global.ship.to') },
         { value: 'shiptogrp', label: MessageService.get('global.ship.to.group') },
         { value: 'statuscd', label: MessageService.get('global.status') },
         { value: 'endexpiredt', label: MessageService.get('global.to.expire.date') },
         { value: 'endstartdt', label: MessageService.get('global.to.start.date') },
         { value: 'whse', label: MessageService.get('global.warehouse') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['setuptype', 'custno', 'whse', 'shipto'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         // Load the Colum Label
         base.loadRecordType(criteria.setuptype);

         holdSearchRecord = criteria;

         DataService.post('api/ic/asicsetup/icspcsearch', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.icspcresults;

               if (data.lMoreRecords) {
                  MessageService.alert('global.warning', data.cWarningMsg);
               }
            }

         });
      };

      self.loadDefaultWhse = function () {

         // Ship To Default Whse
         if (self.advCriteria.custno && self.advCriteria.shipto) {
            var params = {
               custno: self.advCriteria.custno,
               shipto: self.advCriteria.shipto,
               fldlist: 'whse'
            };

            DataService.get('api/ar/arss/getbypk', { params: params, busy: true }, function (arss) {

               // Load to the Whse field
               if (arss.whse) {
                  self.advCriteria.whse = arss.whse;
               } else {
                  loadCustomerWhse();
               }

            });
         } else {
            loadCustomerWhse();
         }

      };

      // Action - Activate or Deactivate selected records
      self.doAction = function (mode) {

         // Pull in Selected Rows
         var records = GridService.getSelectedRecords(base.grid);
         var icspcaddchgList = [];

         // Process one Row at a Time
         records.forEach(function (record) {

            // Copy in the data selected
            var icspcaddchg = angular.copy(record);

            // Load initially as Activate
            icspcaddchg.updatetype = 'Chg';
            icspcaddchg.activefl = 'true';

            // Change to Inactive if selected
            if (mode === 'inactivate') {
               icspcaddchg.activefl = 'false';
            }

            // Push the changed data above to the table sending
            icspcaddchgList.push(icspcaddchg);

         });

         // Update all Selected Records
         DataService.post('api/ic/asicsetup/icspcupdate', { data: icspcaddchgList, busy: true }, function (data) {

            if (data) {

               // Display any Messages/Errors - ttblmessaging
               if (!MessageService.processMessaging(data.messaging)) {

                  // No Error - read in the Records to Update the Selected Records
                  data.icspcaddchg.forEach(function (record) {

                     // Unique ID for the Row Updated
                     var idx = base.dataset.findIndex(function (search) {
                        return search.icspcRowpointer === record.icspcRowpointer;
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

      // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
      self.referenceLookupChanged = function () {
         UtilsData.getSastnDescriptionSpecial('R', self.advCriteria.refer, function(descrip) {
            self.advCriteria.refer = descrip;
         });
      }

      function loadCustomerWhse() {

         if (self.advCriteria.custno) {
            var params = {
               custno: self.advCriteria.custno,
               fldlist: 'whse'
            };

            DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (arsc) {

               // Load to the Whse field
               if (arsc.whse) {
                  self.advCriteria.whse = arsc.whse;
               }
            });
         }
      }

   };


   this.extendSearchController = function (self, base, criteria, scope) {

      base.criteria.whse = Sasoo.whse;
      base.criteria.setuptype = "R";
      base.criteria.statuscd = '';
      base.criteria.pullqtycd = '';
      base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

      // Default Whse
      base.loadDefaultWhse = function () {

         // Ship To Default Whse
         if (base.criteria.custno && base.criteria.shipto) {
            var params = {
               custno: base.criteria.custno,
               shipto: base.criteria.shipto,
               fldlist: 'whse'
            };

            DataService.get('api/ar/arss/getbypk', { params: params, busy: true }, function (arss) {

               // Load to the Whse field
               if (arss.whse) {
                  base.criteria.whse = arss.whse;
               } else {
                  loadCustomerWhse();
               }

            });
         } else {
            loadCustomerWhse();
         }

      };

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

         base.criteria.setuptype = "R";
         base.criteria.statuscd = '';
         base.criteria.pullqtycd = '';
         base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icspc.master');
         }

         // Load the Colum Label
         base.loadRecordType(base.criteria.setuptype);

         holdSearchRecord = '';

         base.search();
      };

      function loadCustomerWhse() {

         if (base.criteria.custno) {
            var params = {
               custno: base.criteria.custno,
               fldlist: 'whse'
            };

            DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (arsc) {

               // Load to the Whse field
               if (arsc.whse) {
                  base.criteria.whse = arsc.whse;
               }
            });
         }
      }

   };


   this.extendDetailController = function (self, base, icspcaddchg, scope) {

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icspc', 'General') < 3;
      self.isProductTabReadonly = SecurityService.getSubSecurityLevel('icspc', 'Product') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icspc', 'Custom') < 3;

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         if (self.icspcaddchg.recordtype) {

            switch (self.icspcaddchg.recordtype.toLowerCase()) {
               case "c":
                  subTitleText = MessageService.get('global.setup.type') + ': ' + MessageService.get('global.reservation') + ' | ' +
                                 MessageService.get('global.record.type') + ': ' + MessageService.get('global.customer');
                  break;
               case "s":
                  subTitleText = MessageService.get('global.setup.type') + ': ' + MessageService.get('global.reservation') + ' | ' +
                                 MessageService.get('global.record.type') + ': ' + MessageService.get('global.ship.to');
                  break;
               case "fc":
                  subTitleText = MessageService.get('global.setup.type') + ': ' + MessageService.get('global.forecast') + ' | ' +
                                 MessageService.get('global.record.type') + ': ' + MessageService.get('global.customer');
                  break;
               case "fs":
                  subTitleText = MessageService.get('global.setup.type') + ': ' + MessageService.get('global.forecast') + ' | ' +
                                 MessageService.get('global.record.type') + ': ' + MessageService.get('global.ship.to');
                  break;
               case "fg":
                  subTitleText = MessageService.get('global.setup.type') + ': ' + MessageService.get('global.forecast') + ' | ' +
                                 MessageService.get('global.record.type') + ': ' + MessageService.get('global.ship.to.group');
                  break;
            }
         }

         return subTitleText;
      };

      // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
      self.referenceLookupChanged = function () {
         UtilsData.getSastnDescriptionSpecial('R', self.icspcaddchg.refer, function (descrip) {
            self.icspcaddchg.refer = descrip;
         });
      };

   };

   this.extendCreateController = function (self, base, icspcaddchg, scope) {

      //Default the Whse and the Customer # fields from the search values since they are
      //required fields.  Additionally, the significance of defaulting the Custno means
      //that the Whse won't get reset to the ARSC default whse unless the user changes it.
      self.icspcaddchg.whse = base.criteria.whse;
      self.icspcaddchg.custno = base.criteria.custno;
      self.icspcaddchg.setuptype = base.criteria.setuptype;
      self.icspcaddchg.activefl = true;

      if (self.icspcaddchg.setuptype) {

         switch (self.icspcaddchg.setuptype.toLowerCase()) {
            case "r":
               self.icspcaddchg.fillpriorityfl = true;
               self.icspcaddchg.shiptogrpfl = false;
               self.icspcaddchg.fillpriority = 1;
               self.icspcaddchg.expectedratepct = 0;
               self.icspcaddchg.expiredusagetype = 'R';
               self.icspcaddchg.expectedratepctfl = false;
               self.icspcaddchg.expiredusagetypefl = false;
               self.setupType = MessageService.get('global.reservation');
               break;
            case "f":
               self.icspcaddchg.fillpriorityfl = false;
               self.icspcaddchg.shiptogrpfl = true;
               self.icspcaddchg.fillpriority = 0;
               self.icspcaddchg.expectedratepct = 100;
               self.icspcaddchg.expiredusagetype = 'R';
               self.icspcaddchg.expectedratepctfl = true;
               self.icspcaddchg.expiredusagetypefl = true;
               self.setupType = MessageService.get('global.forecast');
               break;
         }
      }

      // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
      self.referenceLookupChanged = function () {
         UtilsData.getSastnDescriptionSpecial('R', self.icspcaddchg.refer, function (descrip) {
            self.icspcaddchg.refer = descrip;
         });
      };

      // Default Whse
      self.loadDefaultWhse = function (args) {

         // Ship To Default Whse
         if (self.icspcaddchg.custno && self.icspcaddchg.shipto) {
            var params = {
               custno: self.icspcaddchg.custno,
               shipto: self.icspcaddchg.shipto,
               fldlist: 'whse'
            };

            DataService.get('api/ar/arss/getbypk', { params: params, busy: true }, function (arss) {

               // Load to the Whse field
               if (arss.whse) {
                  self.icspcaddchg.whse = arss.whse;
               } else {
                  loadCustomerWhse();
               }

            });
         } else {
            loadCustomerWhse();
         }
      };

      function loadCustomerWhse() {

         if (self.icspcaddchg.custno) {
            var params = {
               custno: self.icspcaddchg.custno,
               fldlist: 'whse'
            };

            DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (arsc) {

               // Load to the Whse field
               if (arsc.whse) {
                  self.icspcaddchg.whse = arsc.whse;
               }
            });
         }
      }

   };

});

app.controller('IcspcDetailProductCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {

   // self = prd
   var self = this;

   // Detail ICSPC record
   var icspcaddchg = $scope.dtl.icspcaddchg;

   // ICIP Hyperlink - product/whse
   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.product > '') {
         $state.go('icip.detail', { pk: currentRow.product, pk2: icspcaddchg.whse});
      }
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         record.updatetype = 'Chg';
         $state.go('icspc.detail.product', { icspcdaddchg: record, productSearchFunction: self.search });
      }

   };

   // Create - Build default data
   self.create = function () {
      var record;

      if (icspcaddchg.setuptype === 'F') {

         record = {
            updatetype: 'Add',
            expectedratepct: icspcaddchg.expectedratepct
         };

      } else if (icspcaddchg.setuptype === 'R') {
         record = {
            updatetype: 'Add'
         };
      }

      $state.go('icspc.detail.product', { icspcdaddchg: record, productSearchFunction: self.search });
   };

   // Search Selection - Build Grid Data - productList
   self.search = function () {

      var productCriteria = {
         product: $scope.dtl.criteriaProduct,
         pullqtyfl: $scope.dtl.criteriaAllowPullQtyFl,
         demandqtyfl: $scope.dtl.criteriaDemandQtyFl,
         icspcRowpointer: icspcaddchg.icspcRowpointer
      };

      DataService.post('api/ic/asicsetup/icspcdsearch', { data: productCriteria, busy: true }, function (data) {
         if (data) {

            // Load the Records into the Grid
            self.productList = data;

            var record = data[0];

            // Load the Column Labels Based on Start Date
            if (record && icspcaddchg.setuptype === 'F') {

               // Load Forecast Grid Labels
               loadForecastLabels(data[0]);

            } else if (icspcaddchg.setuptype === 'F') {

               // No Data in the Grid, so load the labels
               var params = {
                  pvSrcrowpointer: icspcaddchg.icspcRowpointer,
                  pvIcsprowpointer: 'nothing',
                  pvIcspcdinitfl: 'true'
               };

               DataService.get('api/ic/asicsetup/icspcdload/{pvSrcrowpointer}/{pvIcsprowpointer}/{pvIcspcdinitfl}', { pathParams: params, busy: true }, function (data2) {

                  if (data2) {
                     // Load Forecast Grid Labels
                     loadForecastLabels(data2);
                  }
               });
            }
         }
      });
   };

   self.delete = function () {

      var record;

      if (icspcaddchg.setuptype === 'F') {
         record = GridService.getSelectedRecord(self.grid2);
      } else if (icspcaddchg.setuptype === 'R') {
         record = GridService.getSelectedRecord(self.grid);
      }

      if (record) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            // Enough Data to Delete the ICSPCD Record and Adjust ICSW Quantity if ICSPC is Active
            var productDetailCriteria = {
               updatetype: 'Delete',
               srcrowpointer: icspcaddchg.icspcRowpointer,
               icsprowpointer: record.icsprowpointer,
               product: record.product,
               qtyrequired: record.qtyrequired,
               qtyreserved: record.qtyreserved
            };

            DataService.post('api/ic/asicsetup/icspcdupdate', { data: productDetailCriteria, busy: true }, function (data) {
               if (data) {
                  self.search();
               }
            });

         });
      }

   };

   // Sensitivity of Fields/Grid
   self.isForecast = function () {
      return icspcaddchg.setuptype.toUpperCase() === 'F';
   };

   // Search when first enter the Detail Tab
   if ($state.is('icspc.create')) {
      self.search();
   } else {
      icspcaddchg.$promise.then(function () {
         self.search();
      });
   };

   // Forecast Grid Labels
   function loadForecastLabels(labelrecord) {
      if (labelrecord) {

         for (var i = 0; i <= 11; i++) {
            var forcastLabel = 'forecastLabel' + (i + 1);
            var monthLabel = 'monthlabel' + (i + 1);

            self[forcastLabel] = labelrecord[monthLabel] + ' ' + MessageService.get('global.forecast');
         }
      }
   }

});


app.controller('IcspcdDetailCtrl', function ($scope, $state, $stateParams, DataService, Sasoo) {

   // self = sub
   var self = this;
   var icspcaddchg = $scope.dtl.icspcaddchg;

   // Single Grid Record Selected or New Record for Add
   self.icspcdaddchg = $stateParams.icspcdaddchg;

   // ICIP Hyperlink - product/whse
   self.productInquiryHyperlink = function () {

      if (self.icspcdaddchg.product > '') {
         $state.go('icip.detail', { pk: self.icspcdaddchg.product, pk2: icspcaddchg.whse });
      }
   };

   // Add mode
   if (self.icspcdaddchg.updatetype === 'Add') {

      // Default Allow to Pull Quantity to 'yes' on new Detail Product Records
      if (icspcaddchg.setuptype === 'R') {
         self.icspcdaddchg.allowpullqtyfl = true;
      } else {
         self.icspcdaddchg.allowpullqtyfl = false;
      }

      // Forecast - runs Load again with 'true' for init flag to load Months and Sensitivity off SASOO
      if (icspcaddchg.setuptype === 'F') {
         var params = {
            pvSrcrowpointer: icspcaddchg.icspcRowpointer,
            pvIcsprowpointer: 'nothing',
            pvIcspcdinitfl: 'true'
         };

         DataService.get('api/ic/asicsetup/icspcdload/{pvSrcrowpointer}/{pvIcsprowpointer}/{pvIcspcdinitfl}', { pathParams: params, busy: true }, function (data) {

            if (data) {
               self.icspcdaddchg.qtyactualsensitivefl = data.qtyactualsensitivefl;

               // Load Forecast Grid Labels
               loadForecastLabels(data);

               // Load Forecast Grid Detail Data
               loadForecastData();
            }
         });
      }
   } else if (self.icspcdaddchg.updatetype === 'Chg') {

      // Load the Detail Table Data
      var params = {
         pvSrcrowpointer: self.icspcdaddchg.srcrowpointer,
         pvIcsprowpointer: self.icspcdaddchg.icsprowpointer,
         pvIcspcdinitfl: 'false'
      };

      DataService.get('api/ic/asicsetup/icspcdload/{pvSrcrowpointer}/{pvIcsprowpointer}/{pvIcspcdinitfl}', { pathParams: params, busy: true }, function (data) {

         if (data) {

            self.icspcdaddchg.product = data.product;

            // Forecast - runs Load again with 'true' for init flag to load Months and Sensitivity off SASOO
            if (icspcaddchg.setuptype === 'F') {
               var params = {
                  pvSrcrowpointer: self.icspcdaddchg.srcrowpointer,
                  pvIcsprowpointer: self.icspcdaddchg.icsprowpointer,
                  pvIcspcdinitfl: 'true'
               };

               DataService.get('api/ic/asicsetup/icspcdload/{pvSrcrowpointer}/{pvIcsprowpointer}/{pvIcspcdinitfl}', { pathParams: params, busy: true }, function (data2) {

                  if (data2) {
                     self.icspcdaddchg.qtyactualsensitivefl = data2.qtyactualsensitivefl;

                     // Load Forecast Grid Labels
                     loadForecastLabels(data2);
                  }
               });

               // Load Forecast Grid Detail Data
               loadForecastData();
            }
         }
      });
   }

   // In 'Add' mode if the product changes, update the ICSW Quantity Fields
   self.loadICSWValues = function () {

      if (self.icspcdaddchg.product) {
         var icswParams = {
            prod: self.icspcdaddchg.product,
            whse: icspcaddchg.whse
         };

         DataService.get('api/ic/icsw/getbypk', { params: icswParams, busy: true }, function (data) {
            if (data) {
               self.icspcdaddchg.qtybo = data.qtybo;
               self.icspcdaddchg.qtyavail = data.qtyonhand - data.qtyreservd - data.qtycommit;
            }
         });
      }
   };

   // Sensitivity of Fields/Grid
   self.isForecast = function () {
      return icspcaddchg.setuptype.toUpperCase() === 'F';
   };

   // Sensitivity of Product
   self.isChangeMode = function () {
      return self.icspcdaddchg.updateType === 'Chg';
   };

   // Sensitivity of the Quantity Reserved
   self.isOperatorChgBal = function () {
      return Sasoo.chgbalfl;
   };

   // Detail Grid - Actual Qty editable or not
   self.allowActualQtyChg = function () {
      return self.icspcdaddchg.qtyactualsensitivefl;
   };

   // Forecast Grid Labels
   function loadForecastLabels(labelrecord) {
      if (labelrecord) {

         for (var i = 0; i <= 11; i++) {
            var monthLabel = 'monthlabel' + (i + 1);

            self.icspcdaddchg[monthLabel] = labelrecord[monthLabel];
         }
      }
   }

   function loadForecastData() {
      self.forecastGrid = [
         { monthLabel: self.icspcdaddchg.monthlabel1, forecastData: self.icspcdaddchg.qtyforecast1, actualData: self.icspcdaddchg.qtyactual1 },
         { monthLabel: self.icspcdaddchg.monthlabel2, forecastData: self.icspcdaddchg.qtyforecast2, actualData: self.icspcdaddchg.qtyactual2 },
         { monthLabel: self.icspcdaddchg.monthlabel3, forecastData: self.icspcdaddchg.qtyforecast3, actualData: self.icspcdaddchg.qtyactual3 },
         { monthLabel: self.icspcdaddchg.monthlabel4, forecastData: self.icspcdaddchg.qtyforecast4, actualData: self.icspcdaddchg.qtyactual4 },
         { monthLabel: self.icspcdaddchg.monthlabel5, forecastData: self.icspcdaddchg.qtyforecast5, actualData: self.icspcdaddchg.qtyactual5 },
         { monthLabel: self.icspcdaddchg.monthlabel6, forecastData: self.icspcdaddchg.qtyforecast6, actualData: self.icspcdaddchg.qtyactual6 },
         { monthLabel: self.icspcdaddchg.monthlabel7, forecastData: self.icspcdaddchg.qtyforecast7, actualData: self.icspcdaddchg.qtyactual7 },
         { monthLabel: self.icspcdaddchg.monthlabel8, forecastData: self.icspcdaddchg.qtyforecast8, actualData: self.icspcdaddchg.qtyactual8 },
         { monthLabel: self.icspcdaddchg.monthlabel9, forecastData: self.icspcdaddchg.qtyforecast9, actualData: self.icspcdaddchg.qtyactual9 },
         { monthLabel: self.icspcdaddchg.monthlabel10, forecastData: self.icspcdaddchg.qtyforecast10, actualData: self.icspcdaddchg.qtyactual10 },
         { monthLabel: self.icspcdaddchg.monthlabel11, forecastData: self.icspcdaddchg.qtyforecast11, actualData: self.icspcdaddchg.qtyactual11 },
         { monthLabel: self.icspcdaddchg.monthlabel12, forecastData: self.icspcdaddchg.qtyforecast12, actualData: self.icspcdaddchg.qtyactual12 }
      ];
   }

   // Save Button
   self.submit = function () {

      if (icspcaddchg.setuptype === 'F') {

         for (var i = 0; i <= 11; i++) {

            var obj = self.forecastGrid[i];
            var forcastFieldName = 'qtyforecast' + (i + 1);
            var actualFieldName = 'qtyactual' + (i + 1);

            // Move the Grid Data to the Object Table for Update (buckets 1 - 12)
            self.icspcdaddchg[forcastFieldName] = obj.forecastData;
            self.icspcdaddchg[actualFieldName] = obj.actualData;
         }
      }

      var icspRowPointer = '';
      if (self.icspcdaddchg.updatetype === 'Chg') {
         icspRowPointer = self.icspcdaddchg.icsprowpointer;
      }

      var productDetailCriteria = {
         updatetype: self.icspcdaddchg.updatetype,
         srcrowpointer: icspcaddchg.icspcRowpointer,
         icsprowpointer: icspRowPointer,
         product: self.icspcdaddchg.product,
         allowpullqtyfl: self.icspcdaddchg.allowpullqtyfl,
         replenishfl: self.icspcdaddchg.replenishfl,
         qtyrequired: self.icspcdaddchg.qtyrequired,
         qtyreserved: self.icspcdaddchg.qtyreserved,
         qtyexpected: self.icspcdaddchg.qtyexpected,
         expectedratepct: self.icspcdaddchg.expectedratepct,
         qtyforecast1: self.icspcdaddchg.qtyforecast1,
         qtyforecast2: self.icspcdaddchg.qtyforecast2,
         qtyforecast3: self.icspcdaddchg.qtyforecast3,
         qtyforecast4: self.icspcdaddchg.qtyforecast4,
         qtyforecast5: self.icspcdaddchg.qtyforecast5,
         qtyforecast6: self.icspcdaddchg.qtyforecast6,
         qtyforecast7: self.icspcdaddchg.qtyforecast7,
         qtyforecast8: self.icspcdaddchg.qtyforecast8,
         qtyforecast9: self.icspcdaddchg.qtyforecast9,
         qtyforecast10: self.icspcdaddchg.qtyforecast10,
         qtyforecast11: self.icspcdaddchg.qtyforecast11,
         qtyforecast12: self.icspcdaddchg.qtyforecast12,
         qtyactual1: self.icspcdaddchg.qtyactual1,
         qtyactual2: self.icspcdaddchg.qtyactual2,
         qtyactual3: self.icspcdaddchg.qtyactual3,
         qtyactual4: self.icspcdaddchg.qtyactual4,
         qtyactual5: self.icspcdaddchg.qtyactual5,
         qtyactual6: self.icspcdaddchg.qtyactual6,
         qtyactual7: self.icspcdaddchg.qtyactual7,
         qtyactual8: self.icspcdaddchg.qtyactual8,
         qtyactual9: self.icspcdaddchg.qtyactual9,
         qtyactual10: self.icspcdaddchg.qtyactual10,
         qtyactual11: self.icspcdaddchg.qtyactual11,
         qtyactual12: self.icspcdaddchg.qtyactual12,
         qtyactualsensitivefl: self.icspcdaddchg.qtyactualsensitivefl,
         user1: self.icspcdaddchg.user1,
         user2: self.icspcdaddchg.user2,
         user3: self.icspcdaddchg.user3,
         user4: self.icspcdaddchg.user4,
         user5: self.icspcdaddchg.user5,
         user6: parseFloat(self.icspcdaddchg.user6),
         user7: parseFloat(self.icspcdaddchg.user7),
         user8: new Date(self.icspcdaddchg.user8),
         user9: new Date(self.icspcdaddchg.user9)
      };

      DataService.post('api/ic/asicsetup/icspcdupdate', { data: productDetailCriteria, busy: true }, function (data) {
         // Return to Product Grid - Refresh Search
         $state.go('^');
         $stateParams.productSearchFunction();
      });

   };

});