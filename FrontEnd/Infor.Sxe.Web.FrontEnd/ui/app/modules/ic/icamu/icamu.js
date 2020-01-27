'use strict';

app.config(function ($stateProvider, StateProvider, ProductWarehouseUsageStateProvider, AdjustersInformationStateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icamu', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icamu', { params: { buyer: undefined, whse: undefined, vendno: undefined, prod: undefined } });

   $stateProvider.state('icamu.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/detail.json');
            },
            controller: 'IcamuDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('icamu.drilldown', {
      url: '/drilldown',
      params: { drillDownRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/drilldown.json');
            },
            controller: 'IcamuDrillDownCtrl as drldwn'
         }
      }
   });

   $stateProvider.state('icamu.drilldown.exception', {
      url: '/exception',
      params: { exceptionRecord: null },
      views: {
         drillDownExceptionChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/tabs/exception-drilldown.json');
            },
            controller: 'IcamuDrillDownExceptionCtrl as drldwnexc'
         }
      }
   });

   $stateProvider.state('icamu.valuechangeinquiry', {
      url: '/value-change-inquiry',
      params: undefined,
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/value-change-inquiry.json');
            },
            controller: 'IcamuValueChangeInquiryCtrl as vci'
         }
      }
   });

   $stateProvider.state('icamu.manualproductlist', {
      url: '/manual-product-list',
      params: undefined,
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/manual-product-list.json');
            },
            controller: 'IcamuManualProductListCtrl as mpl'
         }
      }
   });

   $stateProvider.state('icamu.massupdate', {
      url: '/mass-update',
      params: undefined,
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/mass-update.json');
            },
            controller: 'IcamuMassUpdateCtrl as mu'
         }
      }
   });

   // Import From Excel state
   $stateProvider.state('icamu.importFromExcel', {
      url: '/import-from-excel',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/import/import-from-excel.json');
            },
            controller: 'IcamuImportFromExcelCtrl as ife'
         }
      }
   });

   // Import From Excel - Line Details state
   $stateProvider.state('icamu.importFromExcel.lineDetails', {
      url: '/line-details',
      params: { selectedLine: null, row: null },
      views: {
         importFromExcelChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamu/import/import-from-excel-details.json');
            },
            controller: 'IcamuImportFromExcelDetailsCtrl as ifeD'
         }
      }
   });

   ProductWarehouseUsageStateProvider.addStates('ic', 'icamu', 'icamu.drilldown');
   AdjustersInformationStateProvider.addStates('ic', 'icamu', 'icamu.drilldown');
});

app.controller('IcamuBaseCtrl', function ($state, $translate, ConfigService, GridService, DataService, MessageService, SecurityService, Utils, Sasoo) {
   var self = this;

   self.MENU_FUNCTION_ICAMU = 'icamu';

   // These are dependent on the SASSM (Menu Item) 'Label' field definitions for ICAMU.
   self.SUBMENU_ICAMU_USAGE_ANALYSIS = 'Usg Analysis';
   self.SUBMENU_ICAMU_USAGE_HISTORY = 'Usg History';
   self.SUBMENU_ICAMU_REQUIRED = 'Required';
   self.SUBMENU_ICAMU_ORDERING = 'Ordering';
   self.SUBMENU_ICAMU_FROZEN = 'Frozen';
   self.SUBMENU_ICAMU_EXCEPTIONS = 'Exceptions';
   self.SUBMENU_ICAMU_ADJUSTER = 'Adjuster Inquiry';

   self.ROWS_TO_UPDATE = 500;
   self.ROWS_TO_DELETE = 5000;

   self.securityTopLevel = 0;
   self.securitySubLevelUsageAnalysis = 0;
   self.securitySubLevelUsageHistory = 0;
   self.securitySubLevelRequired = 0;
   self.securitySubLevelOrdering = 0;
   self.securitySubLevelFrozen = 0;
   self.securitySubLevelExceptions = 0;
   self.securitySubLevelAdjuster = 0;

   self.isUsageAnalysisAllowed = false;
   self.isUsageHistoryAllowed = false;
   self.isRequiredAllowed = false;
   self.isOrderingAllowed = false;
   self.isFrozenAllowed = false;
   self.isExceptionsAllowed = false;
   self.isAdjustersAllowed = false;

   self.homewhsefl = Sasoo.homewhsefl;
   self.homewhse = Sasoo.whse;

   self.isHyperlinkLaunched = false;
   self.criteria = {};
   self.icamudropdownscriteria = {};
   self.icamusingle = {};
   self.exception = {};
   self.icamudropdownsresults = [];
   self.icamuresults = [];

   self.drillDownRecord = {
      descrip: '',
      statusdesc: '',
      statusdescfmt: '',
      whserank: '',
      activefl: true,
      whse: '',
      buyer: '',
      prod: '',
      frozentype: '',
      frozenmmyy: '',
      frozenmmyyfmt: '',
      exceptlist: ''
   };

   // Used in shared/usage-analysis/usage-analysis.js
   self.usageAnalysis = {
      prod: '',
      whse: '',
      reportno: 0,
      secure: self.securitySubLevelUsageAnalysis
   };

   self.isMaster = function () {
      return $state.is('icamu.master');
   };

   self.includesMaster = function () {
      return $state.includes('icamu.master');
   };

   self.isDetail = function () {
      return $state.is('icamu.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icamu.detail');
   };

   self.isDrillDown = function () {
      return $state.is('icamu.drilldown');
   };

   self.includesDrilldown = function () {
      return $state.includes('icamu.drilldown');
   };

   // Product Hyperlink
   self.prodHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };

   self.getSecurity = function () {

      self.seecostfl = Sasoo.seecostfl;
      self.icmanlistty = Sasoo.icmanlistty;
      self.icmanlistoverfl = Sasoo.icmanlistoverfl;
      self.icmassmaintfl = Sasoo.icmassmaintfl;

      self.securityTopLevel = SecurityService.getSecurityLevel(self.MENU_FUNCTION_ICAMU);

      self.securitySubLevelUsageAnalysis = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_USAGE_ANALYSIS);
      self.securitySubLevelUsageHistory = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_USAGE_HISTORY);
      self.securitySubLevelRequired = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_REQUIRED);
      self.securitySubLevelOrdering = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_ORDERING);
      self.securitySubLevelFrozen = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_FROZEN);
      self.securitySubLevelExceptions = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_EXCEPTIONS);
      self.securitySubLevelAdjusters = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMU, self.SUBMENU_ICAMU_ADJUSTER);

      self.isUsageAnalysisAllowed = (self.securitySubLevelUsageAnalysis >= 3) ? true : false;
      self.isUsageHistoryAllowed = (self.securitySubLevelUsageHistory >= 3) ? true : false;
      self.isRequiredAllowed = (self.securitySubLevelRequired >= 3) ? true : false;
      self.isOrderingAllowed = (self.securitySubLevelOrdering >= 3) ? true : false;
      self.isFrozenAllowed = (self.securitySubLevelFrozen >= 3) ? true : false;
      self.isExceptionsAllowed = (self.securitySubLevelExceptions >= 3) ? true : false;
      self.isAdjustersAllowed = (self.securitySubLevelAdjusters >= 3) ? true : false;

   }; // self.getSecurity

   // Initialize the search criteria object
   self.initCriteria = function () {

      if (self.icamusingle) {
         self.criteria.statustype = self.icamusingle.statustype;
         self.criteria.buyeroroperator = self.icamusingle.buyeroroperator;
         self.criteria.buyer = self.icamusingle.buyeroroperator;
         self.criteria.operator = Sasoo.oper2;
         self.criteria.countryoforigin = self.icamusingle.countryoforigin;

         // convert the exception list for selection
         self.criteria.exceptlist = (self.icamusingle.exceptlist) ? self.icamusingle.exceptlist : '';
         self.exceptlistmult = self.criteria.exceptlist.split(',');

         self.criteria.fmclass = '1';
         self.criteria.fmprodcat = self.icamusingle.fmprodcat;
         self.criteria.fmrank = self.icamusingle.fmrank;
         self.criteria.frozenreason = self.icamusingle.frozenreason;
         self.criteria.prodline = self.icamusingle.prodline;
         self.criteria.statustype = self.icamusingle.statustype;
         self.criteria.toclass = '13';
         self.criteria.toprodcat = self.icamusingle.toprodcat;
         self.criteria.torank = self.icamusingle.torank;
         self.criteria.vendno = self.icamusingle.vendno;
         self.criteria.whse = self.icamusingle.whse;
      }

      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

      self.RecordTypeChanged();

      if (self.homewhsefl) {
         self.criteria.whse = self.homewhse;
      }

   }; // self.initCriteria

   self.initDropDownOptions = function () {

      // options set by SI call
      self.optfromrank = [];                                                                                //ignore jslint - correct indentation
      self.opttorank = [];                                                                                  //ignore jslint - correct indentation

      self.icamudropdownsresults.forEach(function (dropdownresult) {                                        //ignore jslint - correct indentation
         var opt = {
            codedesc: dropdownresult.codedesc,
            codeval: dropdownresult.codeval
         };
         switch (dropdownresult.dropdowntype) {
            case 'fromrank':                                                                                //ignore jslint - correct indentation
            self.optfromrank.push(opt);
            break;                                                                                          //ignore jslint - correct indentation
            case 'torank':                                                                                  //ignore jslint - correct indentation
            self.opttorank.push(opt);
            break;                                                                                          //ignore jslint - correct indentation
         }
      });

   };  // self.initDropDownOptions

   self.icamuInitialize = function (callback) {

      self.fromrank = [];     // From Rank drowpdown
      self.torank = [];

      var params = {
         icamudropdownscriteria: self.icamudropdownscriteria,
         icamucriteria: self.criteria
      };

      // note - busy flag set to false because we are manipulated the UI fields
      DataService.post('api/ic/asicadmin/icamuinitializemain', { data: params, busy: false }, function (data) {
         if (data) {
            self.icamuresults = data.icamuresults;

            self.icamudropdownsresults = data.icamudropdownsresults;
            self.initDropDownOptions();

            self.icamusingle = data.icamusingle;
            self.initCriteria();

            if (callback) {
               callback();
            }
         }
      });

   }; // self.icamuInitialize

   self.RecordTypeChanged = function () {

      var params = {
         icamusingle: self.icamusingle,
         icamucriteria: self.criteria
      };

      // note - busy flag set to false because we are manipulated the UI fields
      DataService.post('api/ic/asicadmin/icamusetfieldsbasedonstatus', { data: params, busy: false }, function (data) {
         if (data) {
            self.icamusingle = data.icamusingle;
         }
      });

   }; // self.RecordTypeChanged

   self.FrozenReasonChanged = function () {

      var params = {
         icamusingle: self.icamusingle,
         icamucriteria: self.criteria
      };

      // note - busy flag set to false because we are manipulated the UI fields
      DataService.post('api/ic/asicadmin/icamufrozenreasonchange', { data: params, busy: false }, function (data) {
         if (data) {
            self.icamusingle = data.icamusingle;
         }
      });

   }; // self.FrozenReasonChanged

   self.statusDescripFormat = function (value) {

      switch (value.toLowerCase()) {
         case 'dir':                                                                                  //ignore jslint - correct indentation
            return $translate.instant('global.direct');                                               //ignore jslint - correct indentation
         case 'stk':                                                                                  //ignore jslint - correct indentation
            return $translate.instant('global.stock');                                                //ignore jslint - correct indentation
         case 'dnr':                                                                                  //ignore jslint - correct indentation
            return $translate.instant('global.do.not.reorder');                                       //ignore jslint - correct indentation
         case 'oan':                                                                                  //ignore jslint - correct indentation
            return $translate.instant('global.order.as.needed');                                      //ignore jslint - correct indentation
         case 'oan-ns':                                                                               //ignore jslint - correct indentation
            return $translate.instant('global.create.as.oan.ns');                                     //ignore jslint - correct indentation
      }

   }; // self.statusDescripFormat

   // called when displaying the Status column in the main grid
   self.statusDescripFormatter = function (row, cell, value) {

      return self.statusDescripFormat(value);

   }; // self.statusDescripFormatter

   self.frozenMMYYFormat = function (value) {
      var str1 = '';
      var str2 = '';

      if (value.length === 4) {
         str1 = value.substr(0, 2);
         str2 = value.substr(2, 2);

         return str1 + '/' + str2;
      } else {
         return value;
      }

   }; // self.frozenMMYYFormat

   // called when displaying the Frozen Date columns in the main grid
   self.frozenDateFormatter = function (row, cell, value) {

      return self.frozenMMYYFormat(value);

   }; // self.frozenDateFormatter

   function noHardErrors(datacheck) {
      return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
   }

   self.selectUpdatedRows = function () {
      self.dataset.forEach(function (icamu, index) {
         if (icamu.statusmess.toLowerCase() === 'updated') {
            self.grid.selectRow(index);
         } else {
            self.grid.unselectRow(index);
         }
      });
   };

   // Perform search and update data set for the grid
   self.search = function (callback) {
      self.dataset = {}; // To fix the data reload grid issue.
      // update values from screen screen values
      self.icamusingle.statustype = self.criteria.statustype;
      self.icamusingle.whse = self.criteria.whse;
      self.icamusingle.frozenreason = self.criteria.frozenreason;
      self.icamusingle.vendno = self.criteria.vendno;
      self.icamusingle.prodline = self.criteria.prodline;
      self.icamusingle.countryoforigin = self.criteria.countryoforigin;
      self.icamusingle.fmprodcat = self.criteria.fmprodcat;
      self.icamusingle.toprodcat = self.criteria.toprodcat;
      self.icamusingle.fmclass = self.criteria.fmclass;
      self.icamusingle.toclass = self.criteria.toclass;
      self.icamusingle.fmrank = self.criteria.fmrank;
      self.icamusingle.torank = self.criteria.torank;
      self.icamusingle.recordcountlimit = self.criteria.recordcountlimit;
      self.icamusingle.userfield = self.criteria.userfield;

      self.criteria.buyeroroperator = (self.criteria.statustype === 'a') ? self.criteria.buyer : self.criteria.operator;
      self.icamusingle.buyeroroperator = self.criteria.buyeroroperator;

      self.criteria.validatelist = 'all';

      // convert the selected exceptions
      self.criteria.exceptlist = ((self.exceptlistmult) ? self.exceptlistmult.toString() : '');
      self.icamusingle.exceptlist = self.criteria.exceptlist;

      var params = {
         icamuresults: self.icamuresults,
         icamucriteria: self.criteria,
         icamusingle: self.icamusingle
      };

      DataService.post('api/ic/asicadmin/icamubuildmainlist', { data: params, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               self.dataset = data.icamuresults;

               if (callback) {
                  callback();
               }
            }
         }
      });

   }; // self.search

   self.callRecalculate = function () {
      self.recalculateOrderingControls(GridService.getSelectedRecord(self.grid));
   };

   self.recalculateOrderingControls = function (currentRecord) {

      var record = currentRecord;
      if (record.statusdesc.toLowerCase() === 'stk') {
         var criteriaList = [];
         criteriaList.push(
         {
            prod: record.prod,
            whse: record.whse
         });

         DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criteriaList, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else {
         MessageService.info('global.informational', 'message.the.product.must.be.a.stocked.item');
      }
   }; // self.recalculateOrderingControls

   self.getSecurity();

}); // IcamuBaseCtrl

app.controller('IcamuSearchCtrl', function ($scope, $state, $translate, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.setDefaultWarehouse = function () {
      if (base.homewhsefl) {
         base.criteria.whse = base.homewhse;
      } else {
         base.criteria.whse = '';
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.icamuInitialize();
      self.setDefaultWarehouse();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icamu.master');
      }

      base.search();
   };

   //If we are hyperlink Launched, we don't want to Initialize twice.  Do not run this
   //when the screen is instantiated.
   if (!base.isHyperlinkLaunched) {
      self.clear();
   }
   self.setDefaultWarehouse();

}); // IcamuSearchCtrl

app.controller('IcamuMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   var selectedrecords = [];

   self.iRecords = 0;
   self.iTotalRecords = 0;

   //This is set to this value because it's pretty close to the number of server agents we run in production.
   self.drilldownContinue = function (record) {
      base.drillDownRecord.descrip = record.descrip;
      base.drillDownRecord.statusdesc = record.statusdesc;
      base.drillDownRecord.statusdescfmt = base.statusDescripFormat(base.drillDownRecord.statusdesc);
      base.drillDownRecord.whserank = record.whserank,
      base.drillDownRecord.activefl = record.activefl;
      base.drillDownRecord.whse = record.whse;
      base.drillDownRecord.buyer = base.criteria.buyeroroperator;
      base.drillDownRecord.prod = record.prod;
      base.drillDownRecord.frozentype = record.frozentype;
      base.drillDownRecord.frozenmmyy = record.frozenmmyy;
      base.drillDownRecord.frozenmmyyfmt = base.frozenMMYYFormat(base.drillDownRecord.frozenmmyy);
      base.drillDownRecord.exceptlist = base.criteria.exceptlist;

      // for exception banner
      base.exception.prod = base.drillDownRecord.prod;
      base.exception.whse = base.drillDownRecord.whse;
      base.exception.descrip = base.drillDownRecord.descrip;
      base.exception.statusdescfmt = base.drillDownRecord.statusdescfmt;
      base.exception.whserank = base.drillDownRecord.whserank;

      // for shared Usage Analysis tab
      base.usageAnalysis.prod = base.drillDownRecord.prod;
      base.usageAnalysis.whse = base.drillDownRecord.whse;
      base.usageAnalysis.reportno = 0;
      base.usageAnalysis.secure = base.securitySubLevelUsageAnalysis;

      $state.go('icamu.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
   };

   self.hyperlinkDrillToProduct = function () {
      if (base.dataset) {
         base.dataset.forEach(function (record) {
            if (record.prod === base.criteria.prod) {
               self.drilldownContinue(record);
            }
         });
      }
   };

   self.hyperlinkInitializeContinue = function () {
      if ($stateParams.buyer) {
         base.criteria.buyer = $stateParams.buyer;
      }
      if ($stateParams.whse) {
         base.criteria.whse = $stateParams.whse;
      }
      if ($stateParams.vendno) {
         base.criteria.vendno = $stateParams.vendno;
      }

      //Optional, if sent, we will drill them to a specific line.
      if ($stateParams.prod) {
         //NOTE: Prod is not a visible search criteria.  Its only used for drilldown
         base.criteria.prod = $stateParams.prod;
      }

      if (base.criteria.prod && base.criteria.prod.length > 0) {
         base.search(self.hyperlinkDrillToProduct);
      } else {
         base.search();
      }
   };

   // If we came in with a hyperlink
   if ($stateParams.buyer || $stateParams.whse || $stateParams.vendno) {
      base.isHyperlinkLaunched = true;
      base.icamuInitialize(self.hyperlinkInitializeContinue);
   }

   if ($stateParams.refreshSearch) {
      base.search();
   }

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if (base.refreshSearch) {
      base.search();

      // Reset refresh flag
      base.refreshSearch = false;
   }

   self.setUpdateFlagInICAMU = function (record) {
      var updaterecord = {};

      var params = {
         activefl: record.activefl,
         whse: record.whse,
         buyer: record.buyer,
         prod: record.prod,
         frozentype: record.frozentype,
         frozenmmyy: record.frozenmmyy
      };

      DataService.get('api/ic/icamu/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            updaterecord = data;
            updaterecord.updatefl = true;
            DataService.put('api/ic/icamu', { data: updaterecord, busy: true });
         }
      });

   }; // self.setUpdateFlagInICAMU

   self.drilldown = function (e, args) {
      var record = args[0].item;
      var indx = args[0].row;
      record.statusmess = MessageService.get('global.updated');
      base.grid.updateRow(indx);
      self.setUpdateFlagInICAMU(record);

      self.drilldownContinue(record);
   };

   self.callMaintainProduct = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         var indx = base.dataset.indexOf(record);
         record.statusmess = MessageService.get('global.updated');
         base.grid.updateRow(indx);
         self.setUpdateFlagInICAMU(record);

         $state.go('icsw.detail.edit', { pk: record.prod, pk2: record.whse, activeTab: 'ordering' });
      }
   };

   self.deleteRecordsContinue = function (pageBlock) {

      self.iRecords = 0;

      var startingPoint = pageBlock * base.ROWS_TO_DELETE;
      var endingPoint = (pageBlock * base.ROWS_TO_DELETE) + base.ROWS_TO_DELETE;

      var deleteList = [];

      //Read X rows at a time then this gets recursively called again for the next chunk of X rows
      for (var i = startingPoint; i < endingPoint; i++) {

         if (selectedrecords[i]) {
            var deleteRecord = {
               prod: selectedrecords[i].prod,
               whse: selectedrecords[i].whse,
               activefl: selectedrecords[i].activefl,
               userfield: selectedrecords[i].userfield
            };

            deleteList.push(deleteRecord);
            self.iRecords++;
            self.iTotalRecords++;
         }

      }

      if (self.iRecords !== 0) {

         if (pageBlock !== 0) {
            MessageService.info('global.information', 'message.processing.continues.with.record.number', { recordNumber: startingPoint, pageSize: base.ROWS_TO_DELETE});
         }

         var deletecriteria = {
            ttblicamudeleterecordcriteria: deleteList
         };

         DataService.post('/web/api/ic/icamudeletelist', { data: deletecriteria, busy: true }, function () {
            //NOTE:  This particular call doesn't have a data response object

            if (self.iTotalRecords === selectedrecords.length) {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');

               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            }

            //If we've hit the Chunk limit, then recursively call it again.
            self.deleteRecordsContinue(pageBlock + 1);
         });
      }
   };

   self.deleteRecords = function () {
      selectedrecords = GridService.getSelectedRecords(base.grid);
      if (selectedrecords) {
         var message = 'question.are.you.sure.you.want.to.delete';

         MessageService.okCancel('global.delete.confirmation', message, function () {
            //Call for the 1st block of records
            self.deleteRecordsContinue(0);
         }); 
      }
   };

   self.importFromExcel = function () {
      $state.go('icamu.importFromExcel');
   };

}); // IcamuMasterCtrl

app.controller('IcamuDetailCtrl', function () {


}); // IcamuDetailCtrl

app.controller('IcamuDrillDownCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   self.exceptionsList = [];
   self.exception = {};

   self.drillDownRecord = JSON.parse($stateParams.drillDownRecord);
   self.icslBuyer = null;

   self.getSubTitle = function () {
      return '';
   };

   // Product Hyperlink
   self.prodHyperlink = function () {
      $state.go('icip.detail', { pk: self.drillDownRecord.prod, pk2: self.drillDownRecord.whse });
   };

   self.isDrillDown = function () {
      return $state.is('icamu.drilldown');
   };

   self.checkForAdjuster = function () {
      self.foundAdjuster = false;
      var params = {
         prod: self.drillDownRecord.prod,
         whse: self.drillDownRecord.whse
      };
      DataService.get('api/ic/icsw/getbypk', { params: params }, function (data) {
         if (data) {
            self.prodline = data.prodline;
            self.arpvendno = data.arpvenno;

            if (self.prodline) {
               params = {
                  whse: self.drillDownRecord.whse,
                  vendno: self.arpvendno,
                  prodline: self.prodline
               };
               DataService.get('api/ic/icsl/getbypk', { params: params, busy: true }, function (icsldata) {
                  if (icsldata) {
                     self.icslBuyer = icsldata.buyer;

                     if (self.icslBuyer) {
                        params = {
                           activefl: true,
                           whse: self.drillDownRecord.whse,
                           buyer: self.icslBuyer,
                           prod: self.drillDownRecord.prod,
                           exctype: 'InvValChg'
                        };
                        DataService.get('api/ic/icamue/existsbypk', { params: params, busy: true }, function (icamuedata) {
                           if (icamuedata) {
                              self.foundAdjuster = true;
                           }
                        });
                     }
                  }
               });
            } // if prodline
         }  // if data (icsw)
      });
   }; // self.checkForAdjuster

   self.getExceptionList = function () {

      var params = {
         activefl: true,
         whse: self.drillDownRecord.whse,
         buyer: self.drillDownRecord.buyer,
         prod: self.drillDownRecord.prod,
         frozentype: self.drillDownRecord.frozentype,
         exceptlist: self.drillDownRecord.exceptlist
      };

      DataService.post('api/ic/icamue/geticamuelist', { data: params, busy: true }, function (data) {
         if (data) {
            self.exceptionsList = data;
         }
      });

   }; // self.getExceptionList

   self.exceptionDrilldown = function (e, args) {
      base.icamue = {};

      var record = args[0].item;
      if (record) {
         base.icamue = record;
         $state.go('.exception', { selectedLine: args[0].item, row: args[0].row });
      }
   };

   self.maintainWarehouseProduct = function () {
      if (self.drillDownRecord) {
         $state.go('icsw.detail', { pk: self.drillDownRecord.prod, pk2: self.drillDownRecord.whse });
      }
   };

   self.launchUsageView = function () {
      $state.go('.productWarehouseUsage', { enabled: true, prod: self.drillDownRecord.prod, whse: self.drillDownRecord.whse, unit: '', recalcEnabled: true, returnState: $state.current.name });
   };

   self.launchAdjusterInquiry = function () {
      $state.go('icamu.drilldown.adjustersInformation', { prod: self.drillDownRecord.prod, whse: self.drillDownRecord.whse });
   };

   self.callRecalculate = function () {
      base.recalculateOrderingControls(self.drillDownRecord);
   };

   if (self.drillDownRecord) {
      self.checkForAdjuster();
   }

});

app.controller('IcamuDrillDownExceptionCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   var self = this;
   var base = $scope.base;

   base.icamuexceptionsingle = {};
   base.highsaledata = [];
   base.loadexcptreceiptsttresults = [];

   switch (base.icamue.exctype.toLowerCase()) {
      case 'invvalchg':                                                                                                       //ignore jslint - correct indentation
         if (base.icamue.excc1.toLowerCase() === 'a') {                                                                       //ignore jslint - correct indentation
            // ASQ Inventory Value Change
            self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-asq.json';                                              //ignore jslint - correct indentation
         } else if (base.icamue.excc1.toLowerCase() === 'h') {                                                                //ignore jslint - correct indentation
            // Five High Inventory Value Change
            self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-fivehi.json';                                           //ignore jslint - correct indentation
         } else if (base.icamue.excc1.toLowerCase() === 't') {                                                                //ignore jslint - correct indentation
            // Threshold Inventory Value Change
            self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-threshold-inv.json';                                    //ignore jslint - correct indentation
         }                                                                                                                    //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'asqmaxdoll':                                                                                                      //ignore jslint - correct indentation
         // Average Sales Qty - Max Amount
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-asq.json';                                                 //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case '5himaxdoll':                                                                                                      //ignore jslint - correct indentation
         // Five-High Sales - Max Amount
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-fivehi.json';                                              //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'frzhits':                                                                                                         //ignore jslint - correct indentation
      case 'frzhitsoan':                                                                                                      //ignore jslint - correct indentation
      case 'frzhitsdnr':                                                                                                      //ignore jslint - correct indentation
         // Frozen Product With Hits, Frozen Product With Hits - Order As Needed, Frozen Product With Hits - Do Not Reorder
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-freezehits.json';                                          //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'thresexp':                                                                                                        //ignore jslint - correct indentation
         // Threshold Ready To Expire
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-threshold-exp.json';                                       //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'threslow':                                                                                                        //ignore jslint - correct indentation
         // Threshold With Low Activity
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-threshold-low.json';                                       //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'frzunfrz':                                                                                                        //ignore jslint - correct indentation
         // Frozen Product About To Unfreeze
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-unfreeze.json';                                            //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'excepusage':                                                                                                      //ignore jslint - correct indentation
         // Exceptional Usage Corrected
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-excepusage.json';                                          //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'lowusage':                                                                                                        //ignore jslint - correct indentation
         // Low Usage Corrected
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-lowusage.json';                                            //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'stockout':                                                                                                        //ignore jslint - correct indentation
         // Fifteen Day Stock Out Corrected
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-stockout.json';                                            //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'safetyrev':                                                                                                       //ignore jslint - correct indentation
         // Purchase Order Safety Review
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-safety.json';                                              //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'poleadtime':                                                                                                      //ignore jslint - correct indentation
         // Purchase Order Lead Time Review
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-leadtime.json';                                            //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'trendpct':                                                                                                        //ignore jslint - correct indentation
         // Seasonal Trending - Min/Max Exceeded
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-seas-demand.json';                                         //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
      case 'extlt':                                                                                                           //ignore jslint - correct indentation
         // Extended Lead Time Warning
         self.exceptionView = 'ic/icamu/tabs/exception/icamu-excpt-extlt.json';                                               //ignore jslint - correct indentation
         break;                                                                                                               //ignore jslint - correct indentation
   }

   self.getSubTitle = function () {
      return base.icamue.excdesc;
   };

   self.mmyy = function (dt) {
      return (dt && dt.length === 4) ? (dt.substring(0, 2) + '/' + dt.substring(2)) : '';
   };

   self.usageHistoryClicked = function () {
      $state.go('icamu.drilldown.productWarehouseUsage', { enabled: true, prod: base.icamue.prod, whse: base.icamue.whse, unit: '', recalcEnabled: false, returnState: $state.current.name });
   };

   self.loadExceptionReceipts = function () {
      var params = {
         orderlist: base.icamuexceptionsingle.orderlist,
         linenolist: base.icamuexceptionsingle.linenolist
      };

      DataService.post('api/ic/asicinquiry/loadexceptionreceiptstt', { data: params, busy: true }, function (data) {
         if (data) {
            base.loadexcptreceiptsttresults = data;
         }
      });

   }; // self.loadExceptionReceipts

   self.createHighSaleData = function () {
      base.highsaledata = [];

      for (var i = 0; i < 5; i++) {

         var hisale = 0;
         var hisaleno = '';
         var hisaledt = null;
         var hichar = '';

         switch (i + 1) {

            case 1:                                                                                                  //ignore jslint - correct indentation
               hisale = base.icamuexceptionsingle.highsale1;                                                         //ignore jslint - correct indentation
               hisaleno = base.icamuexceptionsingle.highsaleno1;                                                     //ignore jslint - correct indentation
               hisaledt = base.icamuexceptionsingle.highsaledt1;                                                     //ignore jslint - correct indentation
               hichar = base.icamuexceptionsingle.highchar1;                                                         //ignore jslint - correct indentation
               break;                                                                                                //ignore jslint - correct indentation
            case 2:                                                                                                  //ignore jslint - correct indentation
               hisale = base.icamuexceptionsingle.highsale2;                                                         //ignore jslint - correct indentation
               hisaleno = base.icamuexceptionsingle.highsaleno2;                                                     //ignore jslint - correct indentation
               hisaledt = base.icamuexceptionsingle.highsaledt2;                                                     //ignore jslint - correct indentation
               hichar = base.icamuexceptionsingle.highchar2;                                                         //ignore jslint - correct indentation
               break;                                                                                                //ignore jslint - correct indentation
            case 3:                                                                                                  //ignore jslint - correct indentation
               hisale = base.icamuexceptionsingle.highsale3;                                                         //ignore jslint - correct indentation
               hisaleno = base.icamuexceptionsingle.highsaleno3;                                                     //ignore jslint - correct indentation
               hisaledt = base.icamuexceptionsingle.highsaledt3;                                                     //ignore jslint - correct indentation
               hichar = base.icamuexceptionsingle.highchar3;                                                         //ignore jslint - correct indentation
               break;                                                                                                //ignore jslint - correct indentation
            case 4:                                                                                                  //ignore jslint - correct indentation
               hisale = base.icamuexceptionsingle.highsale4;                                                         //ignore jslint - correct indentation
               hisaleno = base.icamuexceptionsingle.highsaleno4;                                                     //ignore jslint - correct indentation
               hisaledt = base.icamuexceptionsingle.highsaledt4;                                                     //ignore jslint - correct indentation
               hichar = base.icamuexceptionsingle.highchar4;                                                         //ignore jslint - correct indentation
               break;                                                                                                //ignore jslint - correct indentation
            case 5:                                                                                                  //ignore jslint - correct indentation
               hisale = base.icamuexceptionsingle.highsale5;                                                         //ignore jslint - correct indentation
               hisaleno = base.icamuexceptionsingle.highsaleno5;                                                     //ignore jslint - correct indentation
               hisaledt = base.icamuexceptionsingle.highsaledt5;                                                     //ignore jslint - correct indentation
               hichar = base.icamuexceptionsingle.highchar5;                                                         //ignore jslint - correct indentation
               break;                                                                                                //ignore jslint - correct indentation

         } // switch

         base.highsaledata.push(
            {
               bucket: i + 1,
               highsale: hisale,
               highchar: hichar,
               highsaleno: hisaleno,
               highsaledt: hisaledt
            }
         ); // push

      } // for i

   }; // self.createHighSaleData

   self.loadException = function () {
      var params = { icamueRowID: base.icamue.rowID };

      DataService.post('api/ic/asicadmin/icamuloadexception', { data: params, busy: true }, function (data) {
         if (data) {
            base.icamuexceptionsingle = data.icamuexceptionsingle;

            // Fill the receipts grid if applicable
            if (base.icamuexceptionsingle.orderlist) {
               self.loadExceptionReceipts();
            }

            // create the data for the High Sales grid
            if (base.icamuexceptionsingle.exctype.toLowerCase() === '5himaxdoll') {
               self.createHighSaleData();
            }
         }
      });

   }; // self.loadException

   self.loadException();

}); // IcamuDrillDownExceptionCtrl

app.controller('IcamuValueChangeInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, SecurityService, UserService, Utils, Sasoo) {
   var self = this;

   self.icamudropdownscriteria = {};
   self.icamuinvvalchgcriteria = {};
   self.icamudropdownsresults = [];
   self.icamuinvvalchgresults = [];
   self.icamuinvvalchgsingle = {};

   self.homewhsefl = Sasoo.homewhsefl;
   self.homewhse = Sasoo.whse;
 
   function noHardErrors(datacheck) {
      return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
   }

   // Clear form
   self.clear = function () {

      Utils.clearObject(self.icamuinvvalchgcriteria);
      self.resetCriteria();

   }; // self.clear

   self.search = function () {

      var params = {
         fromwhse: self.icamuinvvalchgcriteria.fromwhse,
         towhse: self.icamuinvvalchgcriteria.towhse,
         fromrank: self.icamuinvvalchgcriteria.fromrank,
         torank: self.icamuinvvalchgcriteria.torank,
         fromadj: self.icamuinvvalchgcriteria.fromadj,
         toadj: self.icamuinvvalchgcriteria.toadj
      };

      DataService.post('api/ic/asicadmin/icamubuildvaluechangetable', { data: params, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               self.icamuinvvalchgresults = data.icamuinvvalchgresults;
               self.icamuinvvalchgsingle = data.icamuinvvalchgsingle;

               self.dataset = data.icamuinvvalchgresults;
            }
         }
      });

   }; // self.search

   self.resetCriteria = function () {

      self.icamuinvvalchgcriteria.fromwhse = (self.homewhsefl) ? self.homewhse : '';
      self.icamuinvvalchgcriteria.towhse = (self.homewhsefl) ? self.homewhse : '';
      self.icamuinvvalchgcriteria.fromrank = '';
      self.icamuinvvalchgcriteria.torank = '';
      self.icamuinvvalchgcriteria.fromadj = '';
      self.icamuinvvalchgcriteria.toadj = '';

   }; //  self.resetCriteria

   self.initDropDownOptions = function () {

      // options set by SI call
      self.optfromrank = [];                                                                                //ignore jslint - correct indentation
      self.opttorank = [];                                                                                  //ignore jslint - correct indentation

      self.icamudropdownsresults.forEach(function (dropdownresult) {                                        //ignore jslint - correct indentation
         var opt = {
            codedesc: dropdownresult.codedesc,
            codeval: dropdownresult.codeval
         };
         switch (dropdownresult.dropdowntype) {
            case 'fromrank':                                                                                //ignore jslint - correct indentation
            self.optfromrank.push(opt);
            break;                                                                                       //ignore jslint - correct indentation
            case 'torank':                                                                                  //ignore jslint - correct indentation
            self.opttorank.push(opt);
            break;                                                                                       //ignore jslint - correct indentation
         }
      });

   }; // self.initDropDownOptions

   self.initCriteria = function () {

      self.initDropDownOptions();
      self.resetCriteria();

   }; // self.initCriteria


   self.valuechangeInquiryInitialize = function () {
      self.fromRank = [];  // From Rank drowpdown                                                        //ignore jslint - correct indentation
      self.toRank = [];                                                                                  //ignore jslint - correct indentation

      var params = {
         icamudropdownscriteria: self.icamudropdownscriteria,
         icamuinvvalchgcriteria: self.icamuinvvalchgcriteria
      };

      DataService.post('api/ic/asicadmin/icamuinitializevaluechange', { data: params, busy: true }, function (data) {
         if (data) {
            self.icamudropdownsresults = data.icamudropdownsresults;
            self.icamuinvvalchgresults = data.icamuinvvalchgresults;
            self.icamuinvvalchgsingle = data.icamuinvvalchgsingle;

            self.homewhsefl = self.icamuinvvalchgsingle.homewhsefl;
            self.homewhse = self.icamuinvvalchgsingle.homewhse;

            self.initCriteria();
         }
      });

   }; // self.valuechangeInquiryInitialize

   self.valuechangeInquiryInitialize();

}); // IcamuValueChangeInquiryCtrl

app.controller('IcamuManualProductListCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.icamumanprodlistcriteria = {};
   self.icamumanprodlistsingle = {};

   function noHardErrors(datacheck) {
      return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
   }

   self.ManualProductListCreate = function () {

      var params = {
         icamumanprodlistcriteria: self.icamumanprodlistcriteria,
         icamumanprodlistsingle: self.icamumanprodlistsingle
      };

      DataService.post('api/ic/asicadmin/icamucreatemanualproductlist', { data: params, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               self.icamumanprodlistcriteria = data.icamumanprodlistcriteria;
               self.icamumanprodlistsingle = data.icamumanprodlistsingle;

               // Note - There will be one informational message returned indicating the number of products that were created

               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('icamu.master', null, { reload: '^.master' });
            }
         }
      });

   }; // self.ManualProductListCreate

   self.reset = function () {
      Utils.clearObject(self.icamumanprodlistcriteria);
      self.initCriteria();
   }; // self.reset

   self.initCriteria = function () {

      self.icamumanprodlistcriteria.validatelist = 'all';

      // Ranges
      self.icamumanprodlistcriteria.fromwhse = '';
      self.icamumanprodlistcriteria.towhse = '';

      self.icamumanprodlistcriteria.fromprod = '';
      self.icamumanprodlistcriteria.toprod = '';

      self.icamumanprodlistcriteria.fromrank = '';
      self.icamumanprodlistcriteria.torank = '';

      self.icamumanprodlistcriteria.fmacquiredt = null;
      self.icamumanprodlistcriteria.toacquiredt = null;

      // Selection Fields
      self.icamumanprodlistcriteria.vendorno = 0;
      self.icamumanprodlistcriteria.prodline = '';
      self.icamumanprodlistcriteria.pricetype = '';
      self.icamumanprodlistcriteria.category = '';
      self.icamumanprodlistcriteria.slgroup = '';
      self.icamumanprodlistcriteria.stndpack = '';
      self.icamumanprodlistcriteria.countryoforigin = '';

      // Rebates
      self.icamumanprodlistcriteria.rebatetype = '';
      self.icamumanprodlistcriteria.rebsubtype = '';

      // Ordering Controls
      self.icamumanprodlistcriteria.ordcalcty = '';
      self.icamumanprodlistcriteria.leadtime = 0;
      self.icamumanprodlistcriteria.frozendate = '';
      self.icamumanprodlistcriteria.frozentype = '';
      self.icamumanprodlistcriteria.frozenmonths = 0;

      // Usage
      self.icamumanprodlistcriteria.usagectrl = '';
      self.icamumanprodlistcriteria.usagemonths = 0;
      self.icamumanprodlistcriteria.surplusty = '';
      self.icamumanprodlistcriteria.noproducts = ConfigService.getDefaultRecordLimit();

   }; // self.initCriteria

   self.initCriteria();

}); // IcamuManualProductListCtrl

app.controller('IcamuMassUpdateCtrl', function ($scope, $state, $stateParams, $translate, ConfigService, DataService, MessageService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   var mu = self;

   var sublabel = $translate.instant('symbol.pound.of.products');
   var selectedrecords = GridService.getSelectedRecords(base.grid);

   self.icamumassupdatedropdowns = [];
   self.icamumassupdatesingle = {};
   self.icamumassupdate = {};

   self.dHoldASQDiff = 0;
   self.dHoldHi5Diff = 0;

   self.iRecords = 0;
   self.lRefreshGrid = false;

   function entered(datacheck) {
      return (datacheck) ? true : false;
   }

   function enteredLogical(datacheck) {
      return (datacheck === null) ? false : true;
   }

   self.updateflLogicalDisabled = function (datacheck) {
      return ((datacheck === null) || (datacheck === '')) ? true : false;
   };

   self.getSubTitle = function () {
      return sublabel + ': ' + ((selectedrecords) ? selectedrecords.length.toString() : '0');
   };

   self.reset = function () {
      Utils.clearObject(self.icamumassupdate);
      self.setStartupValues();
   }; // self.reset

   self.submitUpdateContinue = function (pageBlock) {

      var startingPoint = pageBlock * base.ROWS_TO_UPDATE;
      var endingPoint = (pageBlock * base.ROWS_TO_UPDATE) + base.ROWS_TO_UPDATE;

      var massUpdateList = [];

      //Read X rows at a time.  Then this gets recursively called again for the next chunk
      for (var i = startingPoint; i < endingPoint; i++) {

         if (selectedrecords[i]) {
            var massUpdateRecord = {
               prod: selectedrecords[i].prod,
               whse: selectedrecords[i].whse,
               activefl: selectedrecords[i].activefl,
               class: selectedrecords[i].class,
               linehits: selectedrecords[i].linehits,
               frozenmmyy: selectedrecords[i].frozenmmyy,
               frozentype: selectedrecords[i].frozentype,
               frozentypedesc: selectedrecords[i].frozentypedesc,
               frozentypes: selectedrecords[i].frozentypes,
               frozendesc: selectedrecords[i].frozendesc,
               userfield: selectedrecords[i].userfield
            };

            massUpdateList.push(massUpdateRecord);
            self.iRecords++;
            self.iTotalRecords++;
         }
      }
      if (massUpdateList.length !== 0) {

         if (pageBlock !== 0) {
            MessageService.info('global.information', 'message.processing.continues.with.record.number', { recordNumber: startingPoint, pageSize: base.ROWS_TO_UPDATE });
         }

         var massupdatecriteria = {
            ttblicamumassupdate: mu.icamumassupdate,
            ttblicamumassupdatelist: massUpdateList
         };

         DataService.post('/web/api/ic/icamumassupdatelist', { data: massupdatecriteria, busy: true }, function (data) {
            if (data) {

               // only error lines are returned
               if (data.ttblicamumassupdatelist) {
                  base.dataset = base.dataset.concat(data.ttblicamumassupdatelist);
                  base.icamuresults = base.dataset;
                  self.lRefreshGrid = false;
               }

               if (self.iRecords === selectedrecords.length) {
                  // Go back to master list and refresh the search only if there are no update messages to read
                  // Note - GUI does not auto refresh the grid but Silverlight does, when we refresh we lose the update messages
                  if (!self.lRefreshGrid) {
                     MessageService.alert('global.warning', 'message.warning.update.exceptions.warnings.occurred');
                  }
                  base.refreshSearch = self.lRefreshGrid;
                  $state.go('icamu.master', null, { reload: '^.master' });
               }
               else {
                  //If we've hit the Chunk limit, then recursively call it again.
                  self.submitUpdateContinue(pageBlock + 1);
               }
            }
         });
      }
   };

   self.submit = function () {
      self.lRefreshGrid = true;
      self.iRecords = 0;

      // Validate changes on the Mass Update Screen before updating
      var validatecriteria = {
         ttblicamumassupdate: mu.icamumassupdate
      };

      DataService.post('/web/api/ic/icamumassvalidate', { data: validatecriteria, busy: true }, function () {

         base.dataset = [];

         //Call for the 1st block
         self.submitUpdateContinue(0);

      });
   };

   // function is called when a field value changes in the Mass Update screen to auto set the appropriate Update checkbox
   self.change = function (field) {
      switch (field) {
      // Required
      case 'cStatustype':
         mu.icamumassupdate.tbStatusType = entered(mu.icamumassupdate.cStatustype);
         break;
      case 'cPriceType':
         mu.icamumassupdate.tbPriceType = entered(mu.icamumassupdate.cPriceType);
         break;
      case 'cProdPreference':
         mu.icamumassupdate.tbProdPreference = entered(mu.icamumassupdate.cProdPreference);
         break;

      // Authorized Replenishment Path
      case 'cArptype':
         mu.icamumassupdate.tbArpType = entered(mu.icamumassupdate.cArptype);
         break;
      case 'cArpPushFl':
         mu.icamumassupdate.tbArpPushFl = true;
         break;
      case 'dArpVendorNo':
         mu.icamumassupdate.tbArpVendorNo = entered(mu.icamumassupdate.dArpVendorNo);
         break;
      case 'cArpWhse':
         mu.icamumassupdate.tbArpWhse = entered(mu.icamumassupdate.cArpWhse);
         break;
      case 'cArpProdLine':
         mu.icamumassupdate.tbArpProdLine = entered(mu.icamumassupdate.cArpProdLine);
         break;
      case 'cVendorProd':
         mu.icamumassupdate.tbVendorProd = entered(mu.icamumassupdate.cVendorProd);
         break;
      case 'cFamilyGroup':
         mu.icamumassupdate.tbFamilyGroup = entered(mu.icamumassupdate.cFamilyGroup);
         break;

      // Rebates
      case 'cRebateTy':
         mu.icamumassupdate.tbRebateTy = entered(mu.icamumassupdate.cRebateTy);
         break;
      case 'cRebSubTy':
         mu.icamumassupdate.tbRebSubTy = entered(mu.icamumassupdate.cRebSubTy);
         break;

      // Product Frozen
      case 'cFrozentype':
         mu.icamumassupdate.tbFrozenType = entered(mu.icamumassupdate.cFrozentype);
         break;
      case 'dtAcquiredt':
         mu.icamumassupdate.tbAcquireDt = entered(mu.icamumassupdate.dtAcquiredt);
         break;
      case 'cFrozenDate':
         mu.icamumassupdate.tbFrozenDate = entered(mu.icamumassupdate.cFrozenDate);
         break;
      case 'iFrozenMonths':
         mu.icamumassupdate.tbFrozenMonths = entered(mu.icamumassupdate.iFrozenMonths);
         break;

      // Usage
      case 'dUsageRate':
         mu.icamumassupdate.tbUsageRate = entered(mu.icamumassupdate.dUsageRate);
         break;
      case 'iUsageMonths':
         mu.icamumassupdate.tbUsageMonths = entered(mu.icamumassupdate.iUsageMonths);
         break;
      case 'tbUsMthsFrzEntered':
         mu.icamumassupdate.tbUsMthsFrz = enteredLogical(mu.icamumassupdate.tbUsMthsFrzEntered);
         break;
      case 'cUsagectrl':
         mu.icamumassupdate.tbUsageCtrl = entered(mu.icamumassupdate.cUsagectrl);
         break;

      // Safety Allowance
      case 'cClass':
         mu.icamumassupdate.tbClass = entered(mu.icamumassupdate.cClass);
         break;
      case 'dSafeAllAmt':
         mu.icamumassupdate.tbSafeAllAmt = entered(mu.icamumassupdate.dSafeAllAmt);
         break;
      case 'cSafeAllType':
         mu.icamumassupdate.tbSafeAllAmt = entered(mu.icamumassupdate.cSafeAllType);
         break;
      case 'tbFrozenClassEntered':
         mu.icamumassupdate.tbFrozenClass = enteredLogical(mu.icamumassupdate.tbFrozenClassEntered);
         break;

      // Ranking
      case 'cWhseRank':
         mu.icamumassupdate.tbWhseRank = entered(mu.icamumassupdate.cWhseRank);
         break;
      case 'tbRankFreezeEntered':
         mu.icamumassupdate.tbRankFreeze = enteredLogical(mu.icamumassupdate.tbRankFreezeEntered);
         break;

      // Surplus
      case 'cSurplusTy':
         mu.icamumassupdate.tbSurplusTy = entered(mu.icamumassupdate.cSurplusTy);
         break;

      // Lead Time
      case 'iLeadTime':
         mu.icamumassupdate.tbLeadTime = entered(mu.icamumassupdate.iLeadTime);
         break;
      case 'iFrozenLeadTimeType':
         mu.icamumassupdate.tbFrozenLeadTimeType = entered(mu.icamumassupdate.iFrozenLeadTimeType);
         break;

      // Ordering Units
      case 'cBuyingUnit':
         mu.icamumassupdate.tbBuyingUnit = entered(mu.icamumassupdate.cBuyingUnit);
         break;
      case 'cStndUnit':
         mu.icamumassupdate.tbStndUnit = entered(mu.icamumassupdate.cStndUnit);
         break;
      case 'cTransferUnit':
         mu.icamumassupdate.tbTransferUnit = entered(mu.icamumassupdate.cTransferUnit);
         break;

      // Ordering
      case 'cOrdcalcty':
         mu.icamumassupdate.tbOrdCalcTy = entered(mu.icamumassupdate.cOrdcalcty);
         break;
      case 'cOverreasin':
         mu.icamumassupdate.tbOverReasIn = entered(mu.icamumassupdate.cOverreasin);
         break;
      case 'tbRollOANUsagefl':
         mu.icamumassupdate.tbRollOANUsageUpdatefl = enteredLogical(mu.icamumassupdate.tbRollOANUsagefl);
         break;
      case 'iOrderPoint':
         mu.icamumassupdate.tbOrderPoint = entered(mu.icamumassupdate.iOrderPoint);
         break;
      case 'iLinePoint':
         mu.icamumassupdate.tbLinePoint = entered(mu.icamumassupdate.iLinePoint);
         break;
      case 'iOrdQtyIn':
         mu.icamumassupdate.tbOrdQtyIn = entered(mu.icamumassupdate.iOrdQtyIn);
         break;

      // Order Point Adjusters
      case 'cThreshRefer':
         mu.icamumassupdate.tbThreshRefer = entered(mu.icamumassupdate.cThreshRefer);
         break;
      case 'dMinThreshold':
         mu.icamumassupdate.tbMinThreshold = entered(mu.icamumassupdate.dMinThreshold);
         break;
      case 'dtMinThreshExpDt':
         mu.icamumassupdate.tbMinThreshExpDt = entered(mu.icamumassupdate.dtMinThreshExpDt);
         break;
      case 'countryoforigin':
         mu.icamumassupdate.tbCountryofOrigin = entered(mu.icamumassupdate.countryoforigin);
         break;
      case 'tariffcd':
         mu.icamumassupdate.tbTariffCd = entered(mu.icamumassupdate.tariffcd);
         break;

      // Average Sales Quantity (ASQ)
      case 'tbAsqFlEntered':
         mu.icamumassupdate.tbAsqFl = false;
         // If the ASQ flag is off, then the max $ diff must be 0
         if (mu.icamumassupdate.tbAsqFlEntered === false) {
            mu.icamumassupdate.dASQDiff = 0;
            mu.icamumassupdate.tbASQDiff = true;
            mu.icamumassupdate.tbASQDiffFlEntered = false;
            mu.icamumassupdate.tbASQDiffFl = true;
            self.dHoldASQDiff = 0;
         }
         break;
      case 'tbAsqFl':
         // If the ASQ flag is off, then the max $ diff must be 0
         if (mu.icamumassupdate.tbAsqFlEntered === false) {
            mu.icamumassupdate.dASQDiff = 0;
            mu.icamumassupdate.tbASQDiff = true;
            mu.icamumassupdate.tbASQDiffFlEntered = false;
            mu.icamumassupdate.tbASQDiffFl = true;
            self.dHoldASQDiff = 0;
         }
         break;
      case 'tbAsqDiffFlEntered':
         mu.icamumassupdate.tbAsqDiffFl = true;
         if (mu.icamumassupdate.tbAsqDiffFlEntered === false) {
            mu.icamumassupdate.dASQDiff = 0;
         } else {
            mu.icamumassupdate.tbAsqFl = true;
            mu.icamumassupdate.tbASQFlEntered = true;
         }
         break;
      case 'tbAsqDiffFl':
         if (mu.icamumassupdate.tbAsqDiffFlEntered === false) {
            mu.icamumassupdate.AsqDiff = 0;
         } else {
            mu.icamumassupdate.tbAsqFl = true;
            mu.icamumassupdate.tbASQFlEntered = true;
         }
         break;
      case 'dASQDiff':
         if (mu.icamumassupdate.dASQDiff !== self.dHoldASQDiff) {
            mu.icamumassupdate.tbASQDiff = true;
         }
         self.dHoldASQDiff = mu.icamumassupdate.dASQDiff;
         break;

      // Five-High
      case 'tbHi5FlEntered':
         // If the ASQ flag is off, then the max $ diff must be 0
         mu.icamumassupdate.tbHi5Fl = true;
         if (mu.icamumassupdate.tbHi5FlEntered === false) {
            mu.icamumassupdate.dHi5Diff = 0;
            mu.icamumassupdate.tbHi5Diff = true;
            mu.icamumassupdate.tbHi5DiffFl = true;
            mu.icamumassupdate.tbHi5DiffFlEntered = false;
            self.dHoldHi5Diff = 0;
         }
         break;
      case 'tbHi5Fl':
         // If the ASQ flag is off, then the max $ diff must be 0
         mu.icamumassupdate.tbHi5Fl = true;
         if (mu.icamumassupdate.tbHi5FlEntered === false) {
            mu.icamumassupdate.dHi5Diff = 0;
            mu.icamumassupdate.tbHi5Diff = true;
            mu.icamumassupdate.tbHi5DiffFl = true;
            mu.icamumassupdate.tbHi5DiffFlEntered = false;
            self.dHoldHi5Diff = 0;
         }
         break;
      case 'tbHi5DiffFlEntered':
         mu.icamumassupdate.tbHi5DiffFl = true;
         if (mu.icamumassupdate.tbHi5FlEntered === false) {
            mu.icamumassupdate.dHi5Diff = 0;
         } else {
            mu.icamumassupdate.tbHi5Fl = true;
            mu.icamumassupdate.tbHi5FlEntered = true;
         }
         break;
      case 'tbHi5DiffFl':
         if (mu.icamumassupdate.tbHi5DiffFlEntered === false) {
            mu.icamumassupdate.dHi5Diff = 0;
         } else {
            mu.icamumassupdate.tbHi5Fl = true;
            mu.icamumassupdate.tbHi5FlEntered = true;
         }
         break;
      case 'dHi5Diff':
         if (mu.icamumassupdate.dHi5Diff !== self.dHoldHi5Diff) {
            mu.icamumassupdate.tbHi5Diff = true;
         }
         self.dHoldHi5Diff = mu.icamumassupdate.dHi5Diff;
         break;

      // Seasonality
      case 'iSeasBegMM':
         mu.icamumassupdate.tbSeasBegMM = entered(mu.icamumassupdate.iSeasBegMM);
         break;
      case 'iSeasEndMM':
         mu.icamumassupdate.tbSeasEndMM = entered(mu.icamumassupdate.iSeasEndMM);
         break;
      case 'iOrdQtyOut':
         mu.icamumassupdate.tbOrdQtyOut = entered(mu.icamumassupdate.iOrdQtyOut);
         break;
      case 'cOverreasout':
         mu.icamumassupdate.tbOverReasOut = entered(mu.icamumassupdate.cOverreasout);
         break;

      // Trending Demand
      case 'dSeasTrendMin':
         mu.icamumassupdate.tbSeasTrendMin = entered(mu.icamumassupdate.dSeasTrendMin);
         break;
      case 'dSeasTrendMax':
         mu.icamumassupdate.tbSeasTrendMax = entered(mu.icamumassupdate.dSeasTrendMax);
         break;
      case 'dtSeasTrendExpDt':
         mu.icamumassupdate.tbSeasTrendExpDt = entered(mu.icamumassupdate.dtSeasTrendExpDt);
         break;
      case 'iSeasTrendLyu':
         mu.icamumassupdate.tbSeasTrendLYU = entered(mu.icamumassupdate.iSeasTrendLyu);
         break;
      case 'iSeasTrendTYU':
         mu.icamumassupdate.tbSeasTrendTYU = entered(mu.icamumassupdate.iSeasTrendTYU);
         break;

      // Reservation
      case 'cReserveTy':
         mu.icamumassupdate.tbReserveTy = entered(mu.icamumassupdate.cReserveTy);
         break;
      case 'iReserveDays':
         mu.icamumassupdate.tbReserveDays = entered(mu.icamumassupdate.iReserveDays);
         break;
      case 'cNCNR':
         mu.icamumassupdate.tbNCNR = enteredLogical(mu.icamumassupdate.cNCNR);
         break;
      }
   }; // self.change

   self.setStartupValues = function () {
      self.dHoldASQDiff = 0;
      self.dHoldHi5Diff = 0;

      mu.icamumassupdate.cArptype = 'V';
      mu.icamumassupdate.cArpPushFl = 'n';
      mu.icamumassupdate.cClass = '1';
      mu.icamumassupdate.cSafeAllType = 'Q';
   }; // self.setStartupValues

   self.initializeMassUpdate = function () {

      self.icamumassupdatedropdowns = [];
      self.icamumassupdatesingle = {};

      // Initialize the screen widgets
      DataService.get('api/ic/asicadmin/icamuinitializemassupdate', { busy: true }, function (data) {
         if (data) {
            self.icamumassupdatedropdowns = data.icamumassupdatedropdowns;
            self.icamumassupdatesingle = data.icamumassupdatesingle;
         }
      });

      self.setStartupValues();

   }; // self.initializeMassUpdate

   self.initializeMassUpdate();

}); // IcamuMassUpdateCtrl

app.controller('IcamuImportFromExcelCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {

   // alias => ife
   var self = this;
   var base = $scope.base;

   self.icamuimportfileraw = [];

   self.reset = function () {
      self.importedFile = null;
      self.maxLines = 50;
      self.importDataCollection = [];
      self.worksheetno = 0;
      self.isFileImported = false;
   };
   self.reset();

   self.isImportFromExcel = function () {
      return $state.is('icamu.importFromExcel');
   };

   function noHardErrors(datacheck) {
      return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
   }

   self.importFile = function () {
      if (self.importedFile) {
         Utils.readAsBinaryString(self.importedFile, self.fileReaderOnLoadCallback);
      } else {
         MessageService.error('global.error', 'global.input.file.is.required');
      }

   }; // self.importfile

   self.fileReaderOnLoadCallback = function (data) {
      var workbook = XLSX.read(data, { type: 'binary' }); //ignore jslint - Defined in library.
      var sheets = [];
      $.each(workbook.Sheets, function (index, value) { //ignore jslint - Defined in library.
         sheets.push(value);
      });

      var importFiles = [];

      sheets.forEach(function (sheet, index) {
         var rowObjects = XLSX.utils.sheet_to_row_object_array(sheet); //ignore jslint - Defined in library.
         rowObjects.forEach(function (row) {
            var newImportFile = {
               cWorkSheet: index,
               iRow: row.__rowNum__, //ignore jslint - correct
               cColValues: ''
            };

            if (newImportFile.iRow > 0) {

               var whse = row['Warehouse'];     //ignore jslint - correct
               var prod = row['Product'];       //ignore jslint - correct

               newImportFile.worksheetno = index + 1;
               newImportFile.whse = whse;
               newImportFile.prod = prod;
            }

            if (newImportFile.whse || newImportFile.prod) {
               importFiles.push(newImportFile);
            }

         }); // rowObjects.forEach

      }); // sheets.forEach

      if (importFiles.length > 0) {

         self.icamuimportfileraw = [];
         var numrows = importFiles.length;

         createimportfile:
         for (var i = 0; i < numrows; i++) {
            if (i > self.maxLines) {
               MessageService.error('global.error', 'message.imported.lines.exceeded.the.max.line.count.import.stopped');
               break createimportfile;
            } else {
               self.icamuimportfileraw.push(
                  {
                     worksheetno: importFiles[i].worksheetno,
                     whse: importFiles[i].whse,
                     prod: importFiles[i].prod,
                     loadrow: importFiles[i].iRow + 1
                  }
               ); // push
            }
         }

         self.validateimportdata();
         self.isFileImported = true;
      } else {
         MessageService.error('global.error', 'message.imported.file.contained.no.lines.or.was.formatted.incorrectly');
      }
   };

   self.validateimportdata = function () {
      var processerrors = 0;
      if (self.icamuimportfileraw.length > 0) {
         DataService.post('api/ic/asicadmin/icamufilterimportdata', { data: self.icamuimportfileraw, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);
               self.importDataCollection = [];

               // Lines with Errors
               data.icamuimportexcelerrors.forEach(function (error) {
                  processerrors++;
                  var rawdatalength = self.icamuimportfileraw.length;
                  matcherrorexcel:
                  for (var i = 0; i < rawdatalength; i++) {
                     if (error.iRow === self.icamuimportfileraw[i].loadrow) {
                        self.importDataCollection.push({
                           processfl: false,
                           worksheetno: self.icamuimportfileraw[i].worksheetno,
                           whse: self.icamuimportfileraw[i].whse,
                           prod: self.icamuimportfileraw[i].prod,
                           loadrow: self.icamuimportfileraw[i].loadrow,
                           errormsg: error.cErrorMsg
                        });
                        break matcherrorexcel;
                     }
                  }
               });

               // Good lines
               data.icamuimportfilefiltered.forEach(function (oktoprocess) {
                  var rawdatalength = self.icamuimportfileraw.length;
                  matchoktoprocessexcel:
                  for (var i = 0; i < rawdatalength; i++) {
                     if ((oktoprocess.whse === self.icamuimportfileraw[i].whse) && (oktoprocess.prod === self.icamuimportfileraw[i].prod)) {
                        self.importDataCollection.push({
                           processfl: true,
                           worksheetno: self.icamuimportfileraw[i].worksheetno,
                           whse: self.icamuimportfileraw[i].whse,
                           prod: self.icamuimportfileraw[i].prod,
                           loadrow: self.icamuimportfileraw[i].loadrow,
                           errormsg: ''
                        });
                        break matchoktoprocessexcel;
                     }
                  }
               });
            }
         });
      }
   }; //self.validateimportdata

   self.submitcorrected = function () {
      var newdata = angular.copy(self.importDataCollection);
      var processerrors = 0;

      if (newdata.length > 0) {
         DataService.post('api/ic/asicadmin/icamufilterimportdata', { data: newdata, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);
               self.importDataCollection = [];

               // Lines with Errors
               data.icamuimportexcelerrors.forEach(function (error) {
                  processerrors++;
                  var newdatalength = newdata.length;
                  matcherrorexcel:
                     for (var i = 0; i < newdatalength; i++) {                                                       //ignore jslint - correct indentation
                        if (error.iRow === newdata[i].loadrow) {                                                     //ignore jslint - correct indentation
                           self.importDataCollection.push({                                                          //ignore jslint - correct indentation
                              processfl: false,
                              worksheetno: newdata[i].worksheetno,
                              whse: newdata[i].whse,
                              prod: newdata[i].prod,
                              loadrow: newdata[i].loadrow,
                              errormsg: error.cErrorMsg
                           });
                           break matcherrorexcel;                                                                    //ignore jslint - correct indentation
                        }                                                                                            //ignore jslint - correct indentation
                     };                                                                                              //ignore jslint - correct indentation
               });

               // Good lines
               data.icamuimportfilefiltered.forEach(function (oktoprocess) {
                  var newdatalength = newdata.length;
                  matchoktoprocessexcel:
                     for (var i = 0; i < newdatalength; i++) {                                                       //ignore jslint - correct indentation
                        if ((oktoprocess.whse === newdata[i].whse) && (oktoprocess.prod === newdata[i].prod)) {      //ignore jslint - correct indentation
                           self.importDataCollection.push({                                                          //ignore jslint - correct indentation
                              processfl: true,
                              worksheetno: newdata[i].worksheetno,
                              whse: newdata[i].whse,
                              prod: newdata[i].prod,
                              loadrow: newdata[i].loadrow,
                              errormsg: ''
                           });
                           break matchoktoprocessexcel;                                                              //ignore jslint - correct indentation
                        }                                                                                            //ignore jslint - correct indentation
                     };                                                                                              //ignore jslint - correct indentation
               });

               if (processerrors === 0) {
                  // No Errors - create the Manual Product List
                  DataService.post('api/ic/asicadmin/icamuimportfileok', { data: newdata, busy: true }, function (data) {
                     if (noHardErrors(data)) {
                        base.refreshSearch = true;
                        $state.go('icamu.master', null, { reload: '^.master' });
                     }
                  });
               }

            } // if data

         }); // DataService.post

      } // if (newdata.length > 0)

   }; //self.submitcorrected

   self.submit = function () {
      self.submitcorrected();
   };

   self.cancel = function () {
      self.reset();
   };

   self.deleteNewData = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var selectedRows = GridService.getSelectedRecords(self.grid);
         selectedRows.forEach(function (row) {
            var index = self.importDataCollection.indexOf(row);
            self.importDataCollection.splice(index, 1);
         });
         MessageService.info('global.information', 'message.delete.operation.completed.successfully');
      });
   };

   self.drilldown = function (e, args) {
      $state.go('icamu.importFromExcel.lineDetails', { selectedLine: args[0].item, row: args[0].row });
   };

}); // IcamuImportFromExcelCtrl


app.controller('IcamuImportFromExcelDetailsCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {

   // alias => ifeD
   var self = this;
   var ife = $scope.ife;

   self.line = $stateParams.selectedLine;
   self.row = $stateParams.row;
   self.icamuimportfileraw = [];

   self.submit = function () {
      self.icamuimportfileraw = [];

      self.icamuimportfileraw.push(
         {
            worksheetno: self.line.worksheetno,
            whse: self.line.whse,
            prod: self.line.prod,
            loadrow: self.line.loadrow
         }
      );

      DataService.post('api/ic/asicadmin/icamufilterimportdata', { data: self.icamuimportfileraw, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data.messaging);

            // Note - single error is returned from the call
            if (data.icamuimportexcelerrors.length > 0) {
               MessageService.error('global.error', data.icamuimportexcelerrors[0].cErrorMsg);
            } else if (data.icamuimportfilefiltered.length > 0) {
               ife.importDataCollection[self.row].processfl = true;
               ife.importDataCollection[self.row].errormsg = '';
               ife.importDataCollection[self.row].whse = data.icamuimportfilefiltered[0].whse;
               ife.importDataCollection[self.row].prod = data.icamuimportfilefiltered[0].prod;
               ife.grid.updateRow(self.row);
               $state.go('^');
            }
         }
      });
   }; // self.submit

}); // IcamuImportFromExcelDetailsCtrl
