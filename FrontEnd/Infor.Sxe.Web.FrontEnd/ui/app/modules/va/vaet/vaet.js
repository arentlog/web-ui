'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('va', 'vaet', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('va', 'vaet');

   $stateProvider.state('vaet.detail', {
      url: '/detail',
      params: {
         vaNumber: null,
         vaSuffix: null,
         rollupCallback: null,
         goDirectlyToRollUp: false
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/detail.json');
            },
            controller: 'VaetDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('vaet.headerdetail', {
      url: '/header-detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/header-detail.json');
            },
            controller: 'VaetCreateEditCtrl as crtedt'
         }
      }
   });

   $stateProvider.state('vaet.headernonstock', {
      url: '/header-non-stock',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/header-nonstock.json');
            },
            controller: 'VaetHeaderNonstockCtrl as hdrnst'
         }
      }
   });

   $stateProvider.state('vaet.ordercopy', {
      url: '/order-copy',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/order-copy.json');
            },
            controller: 'VaetOrderCopyCtrl as copy'
         }
      }
   });

   $stateProvider.state('vaet.ordercopyinfo', {
      url: '/order-copy-info',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/order-copy-info.json');
            },
            controller: 'VaetOrderCopyInfoCtrl as cpyinfo'
         }
      }
   });

   $stateProvider.state('vaet.orderdelete', {
      url: '/order-delete',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/order-delete.json');
            },
            controller: 'VaetOrderDeleteCtrl as orddel'
         }
      }
   });

   $stateProvider.state('vaet.orderprint', {
      url: '/order-print',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/order-print.json');
            },
            controller: 'VaetOrderPrintCtrl as ordprt'
         }
      }
   });

   $stateProvider.state('vaet.productConfigManager', {
      url: '/product-config-manager',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/product-config-manager.json');
            },
            controller: 'VaetProductConfigManagerCtrl as ordPcm'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionaddedit', {
      url: '/section-add-edit',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/add-edit.json');
            },
            controller: 'VaetSectionAddEditCtrl as sctnaddedit'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionaddons', {
      url: '/section-addons',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/addons.json');
            },
            controller: 'VaetSectionAddonsCtrl as sctnaddons'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionextendin', {
      url: '/section-extend-in',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/extend-in.json');
            },
            controller: 'VaetSectionExtendInCtrl as sctnextin'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionextendex', {
      url: '/section-extend-ex',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/extend-ex.json');
            },
            controller: 'VaetSectionExtendExCtrl as sctnextex'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionspec', {
      url: '/section-specifications',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/specifications.json');
            },
            controller: 'VaetSectionSpecCtrl as sctnspec'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionreviewlabor', {
      url: '/section-review-labor',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/review-labor.json');
            },
            controller: 'VaetSectionRevLaborCtrl as sctnrev'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionreviewlabor.extend', {
      url: '/extend',
      views: {
         subReviewLabor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/labor-extend.json');
            },
            controller: 'VaetSectionLaborExtendCtrl as sctnlext'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionreviewlabor.info', {
      url: '/info',
      views: {
         subReviewLabor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/labor-info.json');
            },
            controller: 'VaetSectionLaborInfoCtrl as sctnlinf'
         }
      }
   });

   $stateProvider.state('vaet.detail.sectionsourcing', {
      url: '/section-sourcing',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/sections/sourcing.json');
            },
            controller: 'VaetSectionSourcingCtrl as sctnsrc'
         }
      }
   });

   $stateProvider.state('vaet.detail.lineaddedit', {
      url: '/line-add-edit',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/add-edit.json');
            },
            controller: 'VaetLineAddEditCtrl as lineaddedit'
         }
      }
   });

   $stateProvider.state('vaet.detail.lineaddedit.linenonstock', {
      url: '/line-non-stock',
      views: {
         subAddEdit: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-nonstock.json');
            },
            controller: 'VaetLineNonstockCtrl as linenst'
         }
      }
   });

   $stateProvider.state('vaet.detail.lineextend', {
      url: '/line-extend',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-extend.json');
            },
            controller: 'VaetLineExtendCtrl as lineext'
         }
      }
   });

   $stateProvider.state('vaet.detail.linelabor', {
      url: '/line-labor',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-labor.json');
            },
            controller: 'VaetLineLaborCtrl as linelabor'
         }
      }
   });

   $stateProvider.state('vaet.detail.linelaborex', {
      url: '/line-labor-ex',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-laborex.json');
            },
            controller: 'VaetLineLaborExCtrl as linelaborex'
         }
      }
   });

   $stateProvider.state('vaet.detail.linecomments', {
      url: '/line-comments',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-comments.json');
            },
            controller: 'VaetLineCommentsCtrl as linecom'
         }
      }
   });

   $stateProvider.state('vaet.detail.rollup', {
      url: '/rollup',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/rollup.json');
            },
            controller: 'VaetRollupCtrl as rollup'
         }
      }
   });

   $stateProvider.state('vaet.detail.lineSerial', {
      url: '/line-serial',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               //return JsonViewService.getView('shared/serials/shared-serials-view.json');
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-serials.json');
            },
            controller: 'VaetLineSerialCtrl as lineser'
         }
      }
   });

   $stateProvider.state('vaet.detail.lineLot', {
      url: '/line-lot',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-lots.json');
            },
            controller: 'VaetLineLotCtrl as linelot'
         }
      }
   });

   $stateProvider.state('vaet.detail.linehistory', {
      url: '/line-history',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-history.json');
            },
            controller: 'VaetLineHistoryCtrl as linehist'
         }
      }
   });

   $stateProvider.state('vaet.detail.linesourcing', {
      url: '/line-sourcing',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/sourcing.json');
            },
            controller: 'VaetLineSourcingCtrl as linesrc'
         }
      }
   });

   $stateProvider.state('vaet.detail.linesourcing.linebacktie', {
      url: '/line-back-tie',
      views: {
         subLineSrc: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaet/tabs/lineitems/line-backtie.json');
            },
            controller: 'VaetLineBackTieCtrl as linebacktie'
         }
      }
   });

   BinAllocationStateProvider.addStates('va', 'vaet', 'vaet.detail');

});

app.controller('VaetBaseCtrl', function ($state, ConfigService, DataService, MessageService, OptionSetService, Sasoo, Utils, UtilsData, AodataService, SecurityService) {
   var self = this;
   self.currentSectionRowIndex = -1;
   self.sasoo = Sasoo;
   self.vanox = '0-00';
   self.copyVanox = '0-00';
   self.deleteVanox = '0-00';
   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('vaet', 'Header') < 3;
   self.isSectionsTabReadonly = SecurityService.getSubSecurityLevel('vaet', 'Sections') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('vaet', 'Line Items') < 3;

   //Check if Allow Expanded Name/Address
   self.extShipToAddrMaxLength = UtilsData.getNameAddressMaxLength();

   self.criteria = {
      whse: '',
      shipprod: '',
      stagecd: -1,
      vano: 0,
      vasuf: 0,
      verno: 0,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.updateRecord = {
      transtype: 'va',
      whse: '',
      shipprod: '',
      nonstockty: '',
      qtyord: 1,
      unit: 'each',
      verno: 0
   };

   self.isHeaderTabSelected = 0;
   self.isSectionTabSelected = 0;
   self.wasHeaderViewed = false;

   // Get data that will determine what to display and how to navigate through VAET
   DataService.get('api/va/asvaheader/vaheadergetsettings', function (vaheadersettings) {
      if (vaheadersettings) {
         self.headersettings = vaheadersettings;
         self.criteria.whse = self.headersettings.homewhse;

         // Based on the 'Force  VA Hearder Entry Before / After Sections' SASO option, determine which tab will be the default
         if (self.headersettings.vaheaderty.toLowerCase() === 's') {
            self.isHeaderFirst = true;
            self.isSectionFirst = false;
         } else {
            self.isHeaderFirst = false;
            self.isSectionFirst = true;
         }
      } else {
         self.headersettings = {
            homewhsefl: false,
            homewhse: '',
            lnonstockfl: false,
            sortby: 1,
            vaheaderty: 'n'
         };

         self.isHeaderFirst = false;
         self.isSectionFirst = true;

      }

   });

   // Need to be able to clear section and line data when the user adds a new VA or edits a different VA
   self.clearData = function () {

      self.sectionAuto = [];
      self.sectionResults = [];
      self.sectionCompleteRecord = [];
      self.sectionSourcingRecord = [];
      self.sectionSelectedRecord = [];
      self.sectionUpdateRecord = [];
      self.sectionSelectedData = '';

      self.lineList = [];
      self.lineSelectedRecord = [];
      self.lineSelectedRecords = [];
      self.lineSourcingRecord = [];
      self.lineUpdateRecord = [];
      self.lineEditAuth = false;
      self.lineWipList = '';

   };

   self.clearData();

   self.copySelectedRecord = {};
   self.vaordercfg = {};
   self.saveButtonEnabled = false;

   self.addMode = false;
   self.isInAddMode = function () {
      return self.addMode;
   };

   self.lineAddMode = false;
   self.isLineInAddMode = function () {
      return self.lineAddMode;
   };

   self.sectionAddMode = false;
   self.isSectionInAddMode = function () {
      return self.sectionAddMode;
   };

   self.isMaster = function () {
      return $state.is('vaet.master');
   };

   self.includesMaster = function () {
      return $state.includes('vaet.master');
   };

   self.isDetail = function () {
      return $state.is('vaet.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vaet.detail');
   };

   self.isProductConfigManager = function () {
      return $state.is('vaet.productConfigManager');
   };

   self.isReviewLabor = function () {
      return $state.is('vaet.detail.sectionreviewlabor');
   };

   self.isAddEdit = function () {
      return $state.is('vaet.detail.lineaddedit');
   };

   self.isLineSource = function () {
      return $state.is('vaet.detail.linesourcing');
   };

   // Perform search and update data set for the grid
   self.search = function () {

      DataService.post('api/va/asvaheader/vaheaderretrieve', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.vaheaderlistresults;
         if (data.lMoreRecords) {
            MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
         }
      });
   };

   // Get section data for the selected VA order
   self.retrieveSectionsList = function (softUpdate) {

      DataService.get('api/va/asvasection/vasectionretrieve/' + self.vaet.vano + '/' + self.vaet.vasuf, function (data) {
         if (data) {

            if (softUpdate) {
               var selectedIndex = data.indexOf(JSLINQ(data).Where(function (item) { return item.rowid === self.sectionSelectedRecord.rowid; }).FirstOrDefault());
               var currentIndex = self.sectionResults.indexOf(self.sectionSelectedRecord);
               Utils.replaceObject(self.sectionResults[currentIndex], data[selectedIndex]);
               self.sctnGrid.updateRow(currentIndex);
            } else {
               self.sectionResults = data;
            }
         }
      });
   };

   // Get section data after adding an 'Inventory In' record
   self.retrieveSectionsListForInventoryIn = function () {

      var data = DataService.getResource('api/va/asvasection/vasectionretrieve/' + self.vaet.vano + '/' + self.vaet.vasuf, { busy: true });

      data.$promise.then(function () {
         if (data) {
            delete data.$promise;
            delete data.$resolved;
            Utils.clearArray(self.sectionResults); // clear the sectionResults
            angular.forEach(data, function (element) {
               self.sectionResults.push(element);
            });
         }
      });

      return data;

   };

   // Get line item data for the selected VA order section
   self.retrieveLineItemsList = function (softUpdate) {

      self.sectionSelectedData = self.sectionSelectedRecord.seqno + ' - ' + self.sectionSelectedRecord.codedesc;

      var valinelistcriteria = {
         functionnm: 'vaet',
         vano: self.sectionSelectedRecord.vano,
         vasuf: self.sectionSelectedRecord.vasuf,
         seqno: self.sectionSelectedRecord.seqno,
         lineno: 0
      };
      DataService.post('api/va/asvaline/valineretrieve', { data: valinelistcriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               if (softUpdate) {
                  var selectedIndex = data.valinelistresults.indexOf(JSLINQ(data.valinelistresults).Where(function (item) { return item.rowid === self.lineSelectedRecord.rowid; }).FirstOrDefault());
                  var currentIndex = self.lineList.indexOf(self.lineSelectedRecord);
                  Utils.replaceObject(self.lineList[currentIndex], data.valinelistresults[selectedIndex]);
                  self.lineGrid.updateRow(currentIndex);
               } else {
                  self.lineList = data.valinelistresults;
               }
            }

         }
      });

   };

   self.lineSubTitle = function (lineno) {
      var lineSubTitle = '';

      if (self.lineUpdateRecord && self.lineUpdateRecord.vano) {
         lineSubTitle = self.lineUpdateRecord.vano + '-' + Utils.pad(self.lineUpdateRecord.vasuf, 2) + ' | ';
         lineSubTitle += MessageService.get('global.sequence') + ': ' + self.lineUpdateRecord.seqno + ' | ';
         lineSubTitle += MessageService.get('global.line') + ': ' + lineno;
      }

      return lineSubTitle;
   };

   self.sectionSubTitle = function () {
      var sectionSubTitle = '';

      if (self.sectionSelectedRecord && self.sectionSelectedRecord.vano) {
         sectionSubTitle = self.sectionSelectedRecord.vano + '-' + Utils.pad(self.sectionSelectedRecord.vasuf, 2) + ' | ';
         sectionSubTitle += MessageService.get('global.sequence') + ': ' + self.sectionSelectedRecord.seqno + ' | ';
         sectionSubTitle += MessageService.get('global.type') + ': ' + self.formatSectionType(self.sectionSelectedRecord.sctntype) + ' | ';
         sectionSubTitle += MessageService.get('global.code') + ': ' + self.sectionSelectedRecord.sctncode;
      }

      return sectionSubTitle;
   };

   self.checkVaAccess = function (vaOrder, vaSuffix, callback) {

      // Make sure the VA order can be edited
      DataService.get('api/va/asvaheader/vaheaderdetailcheckaccess/' + vaOrder + '/' + vaSuffix, function (data) {

         if (!MessageService.processMessaging(data)) {
            callback();
         }

      });

   };

   OptionSetService.get('VA', 'NonStockType', function (set) {
      self.nonstockTypes = set.children;
   });

   self.formatNonstockType = function (nonstockty) {
      if ((nonstockty || nonstockty === '') && self.nonstockTypes) {
         for (var i = 0; i < self.nonstockTypes.length; i++) {
            var type = self.nonstockTypes[i];

            if (nonstockty.toLowerCase() === type.value.toLowerCase()) {
               return type.label;
            }
         }
      }
      return '';

   };

   OptionSetService.get('VA', 'SectionType', function (set) {
      self.sectionTypes = set.children;
   });

   self.formatSectionType = function (sctntype) {
      if ((sctntype || sctntype === '') && self.sectionTypes) {
         for (var i = 0; i < self.sectionTypes.length; i++) {
            var type = self.sectionTypes[i];

            if (sctntype.toLowerCase() === type.value.toLowerCase()) {
               return type.label;
            }
         }
      }
      return '';

   };

   OptionSetService.get('VA', 'SectionStageCodeType', function (set) {
      self.sectionStages = set.children;
   });

   self.formatSectionStage = function (sctnstg) {
      if (sctnstg && self.sectionStages) {
         for (var i = 0; i < self.sectionStages.length; i++) {
            var type = self.sectionStages[i];

            if (sctnstg === type.value) {
               return type.label;
            }
         }
      }
      return '';

   };

   OptionSetService.get('VA', 'StageCodeType', function (set) {
      self.stageTypes = set.children;
   });

   self.formatStageCd = function (stagecd) {
      if (stagecd && self.stageTypes) {
         for (var i = 0; i < self.stageTypes.length; i++) {
            var type = self.stageTypes[i];

            if (stagecd === type.value) {
               return type.label;
            }
         }
      }
      return '';

   };

   OptionSetService.get('VA', 'VAOrderTransactionType', function (set) {
      self.transTypes = set.children;
   });

   self.formatTransactionType = function (transtype) {
      if (transtype && self.transTypes) {
         for (var i = 0; i < self.transTypes.length; i++) {
            var type = self.transTypes[i];

            if (transtype.toLowerCase() === type.value.toLowerCase()) {
               return type.label;
            }
         }
      }
      return '';

   };

   OptionSetService.get('PO', 'TransactionType', function (set) {
      self.poTransTypes = set.children;
   });

   self.formatPOTransType = function (potranstype) {
      if (potranstype && self.poTransTypes) {
         for (var i = 0; i < self.poTransTypes.length; i++) {
            var type = self.poTransTypes[i];

            if (potranstype.toLowerCase() === type.value.toLowerCase()) {
               return type.label;
            }
         }
      }
      return '';

   };

});

app.controller('VaetSearchCtrl', function ($scope, $state, ConfigService, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.reloadCriteria = function () {
      base.vanox = '0-00';
      base.criteria = {
         whse: base.headersettings.homewhse,
         shipprod: '',
         stagecd: -1,
         vano: 0,
         vasuf: 0,
         verno: 0,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };
   };

   // Get data based on VA product selected in Search section
   self.vaProductChange = function () {

      var vaHeaderData = {
         vano: 0,
         vasuf: 0,
         shipprod: base.criteria.shipprod,
         transtype: 'va',
         whse: base.criteria.whse,
         qtyord: 1,
         unit: 'each',
         stagecd: 0
      };
      var criteria = {
         vaheaderaddchg: vaHeaderData,
         cFieldName: "shipprod"
      };

      // Get the last setup version for the search product entered
      DataService.post('api/va/asvaheader/vaheaderleavefield', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.criteria.verno = data.verno;
         } else {
            base.criteria.verno = 0;
         }
      });

   };

   // If the user entered a VA order in the search criteria, break it into order number and suffix
   self.orderSelected = function (args) {
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = base.vanox.split('-');
            if (orderParts.length === 2) {
               base.criteria.vano = orderParts[0];
               base.criteria.vasuf = orderParts[1];
            } else {
               base.criteria.vano = base.vanox;
               base.criteria.vasuf = 0;
            }
         } else {
            base.criteria.vano = args.value;
            base.criteria.vasuf = args.value2;
         }
      } else {
         base.criteria.vano = 0;
         base.criteria.vasuf = 0;
      }

   };

   self.updateAutocompleteCriteria = function (args) {
      // the VA Order # lookup autocomplete was sending the previously selected vano and vasuf in the FacetQuery and returning no results
      // this clears the FacetQuery so that only the currently entered order # is sent with the query
      if (args.source === 'autocomplete') {
         if (args.criteria.FacetQuery)
            args.criteria.FacetQuery = {};
      }
      return args.criteria;
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      self.reloadCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vaet.master');
      }

      base.search();
   };
});

app.controller('VaetMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, SecurityService, Utils) {
   var self = this;
   var base = $scope.base;
   var securityLevel = SecurityService.getSecurityLevel('vaet');
   var mstVano = 0;
   var mstVasuf = 0;

   self.customerInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // ARIC HyperLink
      if (currentRow && currentRow.ordercustno) {
         $state.go('aric.detail', { pk: currentRow.ordercustno });
      }

   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // ICIA HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: currentRow.whse }, { reload: 'icia.detail' });
      }

   };

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // ICIP HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }

   };

   self.tiedorderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // Tied Order HyperLink
      if (currentRow && currentRow.orderaltno) {
         if (currentRow.ordertype.toLowerCase() === 'o') {
            $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertype.toLowerCase() === 'p') {
            $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertype.toLowerCase() === 't') {
            $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertype.toLowerCase() === 'f') {
            $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertype.toLowerCase() === 'w') {
            $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
         }
      }

   };

   self.valueaddInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // VAIF HyperLink
      if (currentRow && currentRow.vano) {
         $state.go('vaif.detail', { pk: currentRow.vano, pk2: currentRow.vasuf });
      }

   };

   // Create a new VA order - Create the default data for a new VA order
   self.create = function () {
      base.addMode = true;
      base.updateRecord.vano = 0;
      base.updateRecord.vasuf = 0;
      base.updateRecord.transtype = 'va';
      base.updateRecord.whse = base.headersettings.homewhse;
      base.updateRecord.shipprod = base.criteria.shipprod;
      base.updateRecord.nonstockty = '';
      base.updateRecord.qtyord = 1;
      base.updateRecord.unit = 'each';
      base.updateRecord.verno = base.criteria.verno;
      base.updateRecord.rowid = 0;

      $state.go('^.headerdetail');
   };

   // Checks for Configure button enablement
   self.enableConfigBtn = function () {
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         if (base.sasoo.cfgaccesscd.toLowerCase() === 'v' && singleRecord.stagecd < 2 && singleRecord.vacfgfl === true && securityLevel > 3) {
            return true;
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   // Launch configurator logic
   self.configure = function () {

      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         var currRequest = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/' + (window.location.pathname ? window.location.pathname + '/' : '');
         var cfgRedirectUrl = currRequest + 'ui/app/modules/shared/configurator/configuration-complete.html';

         base.vaordercfg = {
            vano: singleRecord.vano,
            vasuf: singleRecord.vasuf,
            shipprod: singleRecord.shipprod,
            redirectURL: cfgRedirectUrl,
            securitylvl: SecurityService.getSecurityLevel('vaet')
         };

         $state.go('^.productConfigManager');

      }

   };

   self.allowEditCallback = function () {

      // If access to edit the order is allowed, get the order data
      DataService.get('api/va/asvaheader/vaheaderinitialize/' + mstVano + '/' + mstVasuf, function (data) {
         if (data) {
            base.updateRecord = data;
            $state.go('^.headerdetail');
         }
      });
   };

   // Edit existing VA order header information - Load data from the VA order selected
   self.edit = function () {
      base.addMode = false;

      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {

         mstVano = singleRecord.vano;
         mstVasuf = singleRecord.vasuf;

         // Make sure the VA order can be edited
         base.checkVaAccess(singleRecord.vano, singleRecord.vasuf, self.allowEditCallback);

      }
   };

   // Copy an existing VA order
   self.copy = function () {
      base.addMode = false;

      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         base.copyVanox = singleRecord.vano + '-' + Utils.pad(singleRecord.vasuf, 2);
      } else {
         base.copyVanox = '0-00';
      }

      $state.go('^.ordercopy');

   };

   // Delete an existing VA order - Load data from the VA order selected
   self.cancelOrder = function () {
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         base.deleteVanox = singleRecord.vano + '-' + Utils.pad(singleRecord.vasuf, 2);
      }
      $state.go('^.orderdelete');
   };

   // Print an existing VA order - Load data from the VA order selected
   self.printOrder = function () {
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         base.printVanox = singleRecord.vano + '-' + Utils.pad(singleRecord.vasuf, 2);
      }
      $state.go('^.orderprint');
   };

   // Access the detail information for the VA order
   self.allowDrillDownCallback = function () {
      base.wasHeaderViewed = false;
      base.isHeaderTabSelected = 0;
      base.isSectionTabSelected = 0;

      base.clearData();

      if (base.isHeaderFirst) {
         base.isHeaderTabSelected++;
      } else {
         base.isSectionTabSelected++;
      }

      $state.go('^.detail');
   };

   self.drillDown = function (e, args) {
      base.vaet = args[0].item;
      base.vaet.vasuf = Utils.pad(base.vaet.vasuf, 2);

      // Make sure the VA order can be edited
      base.checkVaAccess(base.vaet.vano, base.vaet.vasuf, self.allowDrillDownCallback);

   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('VaetCreateEditCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, MruService, Utils) {
   var self = this;
   var base = $scope.base;

   // Set the screen title if adding new VA order or editing an existing VA order
   self.detailSubTitle = MessageService.get('global.add.new.order');
   var addMode = base.isInAddMode();
   if (!addMode) {
      self.vanox = base.updateRecord.vano + '-' + Utils.pad(base.updateRecord.vasuf, 2);
      self.detailSubTitle = MessageService.get('global.update') + ' ' + self.vanox;
   }

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var criteria = {
         vaheaderaddchg: base.updateRecord,
         cFieldName: chgField
      };

      DataService.post('api/va/asvaheader/vaheaderleavefield', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.updateRecord = data;

            // Go to Nonstock screen if nontock type is changed or user enters a nonstock product
            if (chgField === 'nonstockty' && base.updateRecord.nonstockty.toLowerCase() === 'n') {
               $state.go('vaet.headernonstock');
            } else if (chgField === 'shipprod' && base.updateRecord.shipprod && base.updateRecord.nonstockty.toLowerCase() === 'n') {
               $state.go('vaet.headernonstock');
            }

         }
      });
   };

   // If canceling the changes, remove the lock on the record
   self.cancelChange = function () {
      DataService.get('api/va/asvaheader/vaheaderremovesoftlock/' + base.updateRecord.vano + '/' + base.updateRecord.vasuf);
      $state.go('^.master');
   };

   self.afterEdit = function () {

      // The updated VA order inforamation will be returned from this SI call and be bound to the base object.
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         singleRecord.nonstockty = base.updateRecord.nonstockty;
         singleRecord.shipprod = base.updateRecord.shipprod;
         singleRecord.verno = base.updateRecord.verno;
         singleRecord.qtyord = base.updateRecord.qtyord;
         singleRecord.unit = base.updateRecord.unit;
         var indx = base.dataset.indexOf(singleRecord);
         base.grid.updateRow(indx);
      }

      MessageService.info('global.information', 'message.save.operation.completed.successfully');

      DataService.get('api/va/asvaheader/vaheaderremovesoftlock/' + base.updateRecord.vano + '/' + base.updateRecord.vasuf);

      $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });

   };

   // Save
   self.submit = function () {
      var addMode = base.isInAddMode();

      // Execute code based upon whether adding a new VA order or editing an existing VA order
      if (addMode) {
         DataService.post('api/va/asvaheader/vaheaderaddrecord', { data: base.updateRecord, busy: true }, function (data) {

            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  base.updateRecord = data.vaheaderaddchg;
                  base.vaet = data.vaheaderaddchg;

                  // Always suffix = zero and this point.
                  var valueAddOrderNumber = data.vaheaderaddchg.vano.toString() + '-00';
                  var params = { fldlist: 'rowpointer,vano,vasuf' };
                  DataService.get('api/va/vaeh/getbyrowid/' + data.vaheaderaddchg.rowid, { params: params }, function (data) {
                     MruService.addToList('VAOrder', data.rowpointer, valueAddOrderNumber, data.vano, data.vasuf);
                  });

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  self.launchDrillDownAfterAdd(data.vaheaderaddchg.vano, data.vaheaderaddchg.vasuf);
               }

            }
         });
      } else {

         DataService.post('api/va/asvaheader/vaheaderchangerecord', { data: base.updateRecord, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  base.updateRecord = data.vaheaderaddchg;
                  self.afterEdit();
               }

            }

         });
      }
   };

   // Access the detail information for the VA order
   self.allowDrillDownCallback = function () {
      base.wasHeaderViewed = false;
      base.isHeaderTabSelected = 0;
      base.isSectionTabSelected = 0;

      base.clearData();

      // SASO controls whether going to Header tab or Sections tab
      if (base.isHeaderFirst) {
         base.isHeaderTabSelected++;
      } else {
         base.isSectionTabSelected++;
      }

      $state.go('^.detail');
   };

   self.launchDrillDownAfterAdd = function (newVano, newVasuf) {

      // Confirm the new VA order was created correctly and detail data can be added
      base.checkVaAccess(newVano, newVasuf, self.allowDrillDownCallback);

   };

});

app.controller('VaetHeaderNonstockCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   var addMode = base.isInAddMode();

   // If adding a new VA order, start with a clean data set to hold the data for the nonstock screen
   // If maintaining a VA order, display the data from that order
   if (addMode) {
      self.nsRecord = {
         shipprod: '',
         proddesc: '',
         proddesc2: '',
         prodcat: '',
         whse: base.criteria.whse,
         cubes: 0,
         weight: 0,
         arpvendno: 0,
         arpprodline: '',
         arpwhse: '',
         asknsoanfl: false
      };
   } else {
      self.nsRecord = {
         shipprod: base.updateRecord.shipprod,
         proddesc: base.updateRecord.proddesc,
         proddesc2: base.updateRecord.proddesc2,
         prodcat: base.updateRecord.prodcat,
         whse: base.updateRecord.whse,
         cubes: base.updateRecord.cubes,
         weight: base.updateRecord.weight,
         arpvendno: base.updateRecord.arpvendno,
         arpprodline: base.updateRecord.arpprodline,
         arpwhse: base.updateRecord.arpwhse,
         asknsoanfl: false
      };
   }

   // Create a new object to hold the data for the nonstock screen.  If the user doesn't want to apply any
   // changes made here, they can be easily deleted


   // Validate the nonstock product entered
   self.productChange = function () {
      var vanonstockcriteria = {
         shipprod: self.nsRecord.shipprod,
         prodcat: self.nsRecord.prodcat,
         whse: base.updateRecord.whse
      };
      DataService.post('api/va/asvaentry/vanonstockleaveprod', { data: vanonstockcriteria, busy: true }, function (data) {
         if (data) {

            // Prompt the user to determine if defaults should be used
            if (data.nonstkmessage) {

               var nsQuestion = MessageService.get('global.description') + ': ';
               nsQuestion += data.cproddesc + '<BR>';
               nsQuestion += data.prcavlmessage + '<BR>';
               nsQuestion += MessageService.get('global.product.category') + ': ' + data.prodcat;
               nsQuestion += '<BR>' + '<BR>' + data.nonstkmessage;

               MessageService.yesNo('global.use.existing.settings', nsQuestion, function () {
                  self.nsRecord = data;
               });

            }

            // Display warning that this product is available
            if (data.warningmessage) {
               MessageService.info('global.warning', data.warningmessage);
            }
         }

      });
   };

   // If the nonstock product came from the previous screen, force the validation
   if (!base.updateRecord.vano && base.updateRecord.shipprod) {
      self.productChange();
   }

   self.cancel = function () {
      self.nsRecord = {};
      $state.go('vaet.headerdetail');
   };

   self.submit = function () {
      var vanonstockvalidate = {
         shipprod: self.nsRecord.shipprod,
         prodcat: self.nsRecord.prodcat,
         whse: base.updateRecord.whse,
         arpvendno: self.nsRecord.arpvendno,
         arpprodline: self.nsRecord.arpprodline,
         arpwhse: self.nsRecord.arpwhse,
         asknsoanfl: false
      };
      DataService.post('api/va/asvaheader/vaheadernonstockval', { data: vanonstockvalidate, busy: true }, function (data) {
         if (data) {

            // Prompt user if product in an OAN nonstock
            if (data.asknsoanfl) {
               MessageService.yesNo('global.question', 'question.product.is.an.active.order.as.needed', function () {
                  base.updateRecord.nonstockty = '';
               });
            }

            // Return nonstock data to the Add/Edit screen
            base.updateRecord.shipprod = self.nsRecord.shipprod;
            base.updateRecord.proddesc = self.nsRecord.proddesc;
            base.updateRecord.proddesc2 = self.nsRecord.proddesc2;
            base.updateRecord.cubes = self.nsRecord.cubes;
            base.updateRecord.weight = self.nsRecord.weight;
            base.updateRecord.prodcat = self.nsRecord.prodcat;
            base.updateRecord.arpvendno = self.nsRecord.arpvendno;
            base.updateRecord.arpprodline = self.nsRecord.arpprodline;
            base.updateRecord.arpwhse = self.nsRecord.arpwhse;

            $state.go('vaet.headerdetail');
         }
      });
   };

});

app.controller('VaetOrderCopyCtrl', function ($scope, $state, DataService, MessageService, SecurityService, Utils) {
   var self = this;
   var base = $scope.base;

   self.vanox = base.copyVanox;
   self.allowCopy = false;
   self.copyOrderInfo = {};

   self.vaStageDisplay = function () {
      return base.formatStageCd(self.copyOrderInfo.stagecd);
   };

   self.vaTypeDisplay = function () {
      return base.formatTransactionType(self.copyOrderInfo.transtype);
   };

   self.orderSelected = function (args) {
      if (args) {
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = self.vanox.split('-');
               if (orderParts.length === 2) {
                  self.vano = orderParts[0];
                  self.vasuf = orderParts[1];
               } else {
                  self.vano = self.vanox;
                  self.vasuf = 0;
               }
            } else {
               self.vano = args.value;
               self.vasuf = args.value2;
            }
         } else {
            self.vano = 0;
            self.vasuf = 0;
         }
      } else {
         orderParts = self.vanox.split('-');
         if (orderParts.length === 2) {
            self.vano = orderParts[0];
            self.vasuf = orderParts[1];
         } else {
            self.vano = self.vanox;
            self.vasuf = 0;
         }
      }

      // If a VA order was entered, find the VAEH record to display data on the screen
      if (self.vano) {

         var params = { vano: self.vano, vasuf: self.vasuf };
         DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {

               // Make the header data visible
               self.copyOrderInfo = data;
               self.vanox = data.vano + '-' + Utils.pad(data.vasuf, 2);
               self.copyOrderInfo.stagecd = self.vaStageDisplay();
               self.copyOrderInfo.transtype = self.vaTypeDisplay();
               self.allowCopy = true;

               if (base.copyRecord && base.copyRecord.vano !== data.vano) {
                  self.copyCompleteMessage = '';
               }

            } else {
               self.copyOrderInfo.shipprod = '';
               self.copyOrderInfo.refer = '';
               self.copyOrderInfo.stagecd = '';
               self.copyOrderInfo.transtype = '';
               self.copyCompleteMessage = '';
               self.allowCopy = false;
            }
         });

      }

   };

   if (self.vanox && self.vanox !== '0-00') {
      if (base.copyRecord && base.copyRecord.newvano) {
         self.copyCompleteMessage = MessageService.get('global.copy.completed.successfully') + ' ' +
            MessageService.get('global.new.order.number') + ': ' + base.copyRecord.newvano + '-' + Utils.pad(base.copyRecord.newvasuf, 2);
      }

      self.orderSelected();
   }

   self.continueCopy = function () {

      DataService.get('api/va/asvaheader/vaheadercopyretrieve/' + self.copyOrderInfo.vano + '/' + self.copyOrderInfo.vasuf, function (data) {
         if (data) {
            base.copyRecord = data;
            $state.go('vaet.ordercopyinfo');
         }
      });

   };

});

app.controller('VaetOrderCopyInfoCtrl', function ($scope, $state, DataService, MessageService, MruService, SecurityService, Utils) {
   var self = this;
   var base = $scope.base;

   self.subtitle = base.copyRecord.vano + '-' + Utils.pad(base.copyRecord.vasuf, 2);

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var criteria = {
         vaheadercopy: base.copyRecord,
         cFieldName: chgField
      };

      DataService.post('api/va/asvaheader/vaheadercopyleavefield', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.copyRecord = data;
         }
      });
   };

   self.submit = function () {

      DataService.post('api/va/asvaheader/vaheadercopycreate', { data: base.copyRecord, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               base.copyRecord = data.vaheadercopy;
               base.copyVanox = base.copyRecord.vano + '-' + Utils.pad(base.copyRecord.vasuf, 2);
               self.submitAddToMRU();
               self.copyCompleteMessage = MessageService.get('global.order') + ' ';
               self.copyCompleteMessage += base.copyRecord.newvano + '-' + Utils.pad(base.copyRecord.newvasuf, 2);
               self.copyCompleteMessage += ' ' + MessageService.get('global.created');
               MessageService.info('global.information', self.copyCompleteMessage);
               $state.go('^.ordercopy');
            }

         }
      });
   };

   self.submitAddToMRU = function () {
      var vaOrderNumber = base.copyRecord.newvano + '-' + Utils.pad(base.copyRecord.newvasuf, 2);
      var params = { vano: base.copyRecord.newvano, vasuf: base.copyRecord.newvasuf };
      DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            MruService.addToList('VAOrder', data.rowpointer, vaOrderNumber, base.copyRecord.newvano, base.copyRecord.newvasuf);
         }
      });
   };

   self.cancel = function () {
      $state.go('^.ordercopy');
   };

});

app.controller('VaetOrderDeleteCtrl', function ($scope, $state, DataService, MessageService, SecurityService, Utils) {
   var self = this;
   var base = $scope.base;

   self.deleteRecord = {};
   self.deleteRecord.vanox = base.deleteVanox;

   self.vaNonstockDisplay = function () {
      return base.formatNonstockType(self.deleteRecord.nonstockty);
   };

   self.vaStageDisplay = function () {
      return base.formatStageCd(self.deleteRecord.stagecd);
   };

   self.vaTypeDisplay = function () {
      return base.formatTransactionType(self.deleteRecord.transtype);
   };

   // Determine if there are any completed sections on the VA order to be cancelled
   self.checkSectionStatus = function () {
      self.deleteRecord.completeSection = false;
      DataService.get('api/va/asvasection/vasectionretrieve/' + self.deleteRecord.vano + '/' + self.deleteRecord.vasuf, function (data) {
         if (data) {
            for (var i = 0; i < data.length; i++) {
               if (data[i].completefl === true) {
                  self.deleteRecord.completeSection = true;
               }
            }
         }
      });
   };

   self.orderSelected = function (args) {
      if (args) {
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = self.deleteRecord.vanox.split('-');
               if (orderParts.length === 2) {
                  self.vano = orderParts[0];
                  self.vasuf = orderParts[1];
               } else {
                  self.vano = self.deleteRecord.vanox;
                  self.vasuf = 0;
               }
            } else {
               self.vano = args.value;
               self.vasuf = args.value2;
            }
         } else {
            self.vano = 0;
            self.vasuf = 0;
         }
      } else {
         orderParts = self.deleteRecord.vanox.split('-');
         if (orderParts.length === 2) {
            self.vano = orderParts[0];
            self.vasuf = orderParts[1];
         } else {
            self.vano = self.deleteRecord.vanox;
            self.vasuf = 0;
         }
      }

      // If a VA order was entered, find the VAEH record to display data on the screen
      if (self.vano) {

         var params = { vano: self.vano, vasuf: self.vasuf };
         DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {

               // Make the header data visible in the detail controller
               self.deleteRecord = data;
               self.deleteRecord.vanox = data.vano + '-' + Utils.pad(data.vasuf, 2);

               // Calculate additional information needed to display - taken from vaethtot.las
               if (self.deleteRecord.pndintrnamt !== 0 || self.deleteRecord.wipintrnamt !== 0) {
                  self.deleteRecord.totpending = self.deleteRecord.pndinvamt + self.deleteRecord.pndextrnamt + self.deleteRecord.pndintrnamt + (self.deleteRecord.pndinvinamt * -1) + self.deleteRecord.pndaddons;
                  self.deleteRecord.totwip = self.deleteRecord.wipinvamt + self.deleteRecord.wipextrnamt + self.deleteRecord.wipintrnamt + (self.deleteRecord.wipinvinamt * -1) + self.deleteRecord.wipaddons;
               } else {
                  self.deleteRecord.totpending = self.deleteRecord.pndinvamt + self.deleteRecord.pndextrnamt + self.deleteRecord.pndintrnest + (self.deleteRecord.pndinvinamt * -1) + self.deleteRecord.pndaddons;
                  self.deleteRecord.totwip = self.deleteRecord.wipinvamt + self.deleteRecord.wipextrnamt + self.deleteRecord.wipintrnamt + (self.deleteRecord.wipinvinamt * -1) + self.deleteRecord.wipaddons;
               }

               self.checkSectionStatus();
            }
         });

      }

   };

   if (self.deleteRecord.vanox && self.deleteRecord.vanox !== '0-00') {
      self.orderSelected();
   }

   self.finalDelete = function () {

      // If completed sections exist, ask the user whether to continue
      // If no sections have been completed, continue with the delete
      if (self.deleteRecord.completeSection) {
         MessageService.okCancel('global.question', 'message.va.sections.is.complete.wip.gl.will.be.reversed', function () {
            self.allowDelete();
         });
      } else {
         self.allowDelete();
      }

   };

   self.allowDelete = function () {

      var deleteCriteria = {
         vano: self.deleteRecord.vano,
         vasuf: self.deleteRecord.vasuf,
         ourproc: 'vaet',
         securitylvl: SecurityService.getSecurityLevel('vaet'),
         lostbusreason: self.lostbusty
      };

      DataService.post('api/va/asvaheader/vadeleteorder', { data: deleteCriteria, busy: true }, function (data) {

         if (!MessageService.processMessaging(data)) {
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }

      });

   };

});

app.controller('VaetOrderPrintCtrl', function ($scope, $state, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.printRecord = {};
   self.printRecord.vanox = base.printVanox;

   // Turn everything off, print load call will turn things back on
   self.isPrintPickEnabled = false;
   self.printPick = false;
   self.printPickSeqno = 0;
   self.isPrintInternalEnabled = false;
   self.printInternal = false;
   self.printInternalSeqno = 0;

   self.orderSelected = function (args) {
      if (args) {
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = self.printRecord.vanox.split('-');
               if (orderParts.length === 2) {
                  self.vano = orderParts[0];
                  self.vasuf = orderParts[1];
               } else {
                  self.vano = self.printRecord.vanox;
                  self.vasuf = 0;
               }
            } else {
               self.vano = args.value;
               self.vasuf = args.value2;
            }
         } else {
            self.vano = 0;
            self.vasuf = 0;
         }
      } else {
         orderParts = self.printRecord.vanox.split('-');
         if (orderParts.length === 2) {
            self.vano = orderParts[0];
            self.vasuf = orderParts[1];
         } else {
            self.vano = self.printRecord.vanox;
            self.vasuf = 0;
         }
      }

      // If a VA order was entered, find print information
      if (self.vano) {

         DataService.get('api/va/asvaheader/vaheaderprintinitialize/' + self.vano + '/' + self.vasuf, function (data) {
            if (data) {

               // Determine which types of prints can be performed
               self.printRecord = data;
               self.printRecord.vanox = self.vano + '-' + Utils.pad(self.vasuf, 2);

               for (var i = 0; i < data.length; i++) {
                  if (data[i].type === 'e') {
                     self.isPrintPickEnabled = true;
                     self.printPickSeqno = data[i].seqno;
                  } else if (data[i].type === 'i') {
                     self.isPrintInternalEnabled = true;
                     self.printInternalSeqno = data[i].seqno;
                  }
               }
            }
         });

      }

   };

   if (self.printRecord.vanox && self.printRecord.vanox !== '0-00') {
      self.orderSelected();
   }

   self.submit = function () {

      // Get the printer data back into the VA print object
      for (var i = 0; i < self.printRecord.length; i++) {
         if (self.printRecord[i].type === 'e') {
            if (self.printPick) {
               self.printRecord[i].printfl = true;
               self.printRecord[i].seqno = self.printPickSeqno;
               self.printRecord[i].printernm = self.pickTicketSettings.printernm;
               self.printRecord[i].printtype = self.pickTicketSettings.printtype;
               self.printRecord[i].printoptfl = self.pickTicketSettings.printoptfl;
               self.printRecord[i].faxphoneno = self.pickTicketSettings.faxphoneno;
               self.printRecord[i].faxfrom = self.pickTicketSettings.faxfrom;
               self.printRecord[i].faxto1 = self.pickTicketSettings.faxto1;
               self.printRecord[i].faxto2 = self.pickTicketSettings.faxto2;
               self.printRecord[i].faxcom = self.pickTicketSettings.faxcom;
               self.printRecord[i].faxpriority = self.pickTicketSettings.faxpriorityfl;
               self.printRecord[i].emailaddr = self.pickTicketSettings.emailaddr;
               self.printRecord[i].filefl = self.pickTicketSettings.filefl;
               self.printRecord[i].queue = self.pickTicketSettings.queue;
               self.printRecord[i].wide = self.pickTicketSettings.widefl;
            }
         } else if (self.printRecord[i].type === 'i') {
            if (self.printInternal) {
               self.printRecord[i].printfl = true;
               self.printRecord[i].seqno = self.printInternalSeqno;
               self.printRecord[i].printernm = self.internalVaSettings.printernm;
               self.printRecord[i].printtype = self.internalVaSettings.printtype;
               self.printRecord[i].printoptfl = self.internalVaSettings.printoptfl;
               self.printRecord[i].faxphoneno = self.internalVaSettings.faxphoneno;
               self.printRecord[i].faxfrom = self.internalVaSettings.faxfrom;
               self.printRecord[i].faxto1 = self.internalVaSettings.faxto1;
               self.printRecord[i].faxto2 = self.internalVaSettings.faxto2;
               self.printRecord[i].faxcom = self.internalVaSettings.faxcom;
               self.printRecord[i].faxpriority = self.internalVaSettings.faxpriorityfl;
               self.printRecord[i].emailaddr = self.internalVaSettings.emailaddr;
               self.printRecord[i].filefl = self.internalVaSettings.filefl;
               self.printRecord[i].queue = self.internalVaSettings.queue;
               self.printRecord[i].wide = self.internalVaSettings.widefl;
            }
         }
      }

      var printCriteria = {
         vaheaderprint: self.printRecord,
         pvVano: self.vano,
         pvVasuf: self.vasuf
      };

      DataService.post('api/va/asvaheader/vaheaderprintrun', { data: printCriteria, busy: true }, function (data) {

         if (!MessageService.processMessaging(data)) {
            MessageService.info('global.information', 'message.your.print.request.has.been.sent');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }

      });
   };

});

app.controller('VaetProductConfigManagerCtrl', function ($scope, $state, $stateParams, $sce, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Get the URL for the configurator and launch a window in which it will run
   DataService.post('api/va/asvaheader/vaordercfglaunch', { data: base.vaordercfg, busy: true }, function (data) {
      if (data) {
         var trustAsUrl = $sce.trustAsResourceUrl(data);
         if (trustAsUrl) {
            self.sourceUri = trustAsUrl;
         }
      }
   });

   self.back = function () {

      // Clicking the back button will indicate that the user is done with the configurator
      $state.go('^.master');

      DataService.post('api/va/asvaheader/vaordercfgfinish', { data: base.vaordercfg, busy: true }, function (data) {
         if (data) {

            DataService.post('api/va/asvaheader/vaordercfgexecfunc', { data: base.vaordercfg, busy: true }, function (data) {
               if (data) {
                  var configuratorSuccessFl = data;

                  if (data.cWarnMessage) {
                     MessageService.alert('global.warning', data.cWarnMessage);
                  }
               } else {
                  MessageService.error('global.error', 'global.configuration.error');
               }
            });

         } else {
            MessageService.error('global.error', 'message.no.manufacturing.data.was.returned.from.the.configurator');
         }
      });

   };

});

app.controller('VaetDetailCtrl', function ($scope, $state, $translate, $stateParams, DataService, GridService, MessageService, TabService, Utils) {
   var self = this;
   var base = $scope.base;

   self.isLineTabSelected = 0;
   self.saveButtonEnabled = false;
   self.headerUpdateNeeded = false;

   self.rollupCallback = $stateParams.rollupCallback;
   self.goDirectlyToRollUp = $stateParams.goDirectlyToRollUp ? true : false;

   self.cancelRollbackScreenDisplay = false;

   self.isSaveButtonEnabled = function () {
      return self.saveButtonEnabled;
   };

   // Get extra data needed to display on the Header screen
   self.getExtraHeaderData = function () {
      DataService.get('api/va/asvaheader/vaheaderdetailload/' + self.vaet.vano + '/' + self.vaet.vasuf, function (data) {
         if (data) {
            self.compData = data.vaheaderallcomponent;
            self.hdrExtra = data.vaheaderextrafields;
         }
      });
   };

   // Get VA Header labor information
   self.getLaborHeaderData = function () {
      if (self.vaet) {
         var laborCriteria = {
            vano: self.vaet.vano,
            vasuf: self.vaet.vasuf
         };
         DataService.post('api/va/asvaentry/vagetheadlabor', { data: laborCriteria, busy: true }, function (data) {
            self.laborResults = data;
         });
      }
   };

   self.updateHeaderDisplay = function () {

      var params = {};

      // Get the VA Header data
      if (base.vaet) {
         params = { vano: base.vaet.vano, vasuf: base.vaet.vasuf };
      } else {
         params = { vano: $stateParams.vaNumber, vasuf: $stateParams.vaSuffix };
      }

      DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {

            if (self.vaet) {
               Utils.replaceObject(self.vaet, data);
            } else {
               self.vaet = data;
            }

            // Calculate additional information needed to display - taken from vaethtot.las
            if (self.vaet.pndintrnamt !== 0 || self.vaet.wipintrnamt !== 0) {
               self.pndintval = self.vaet.pndintrnamt;
               self.pndinttype = MessageService.get('global.act.in.parenthesis');
               self.totpending = self.vaet.pndinvamt + self.vaet.pndextrnamt + self.vaet.pndintrnamt + (self.vaet.pndinvinamt * -1) + self.vaet.pndaddons;
               self.totwip = self.vaet.wipinvamt + self.vaet.wipextrnamt + self.vaet.wipintrnamt + (self.vaet.wipinvinamt * -1) + self.vaet.wipaddons;
            } else {
               self.pndintval = self.vaet.pndintrnest;
               self.pndinttype = MessageService.get('global.est.in.parenthesis');
               self.totpending = self.vaet.pndinvamt + self.vaet.pndextrnamt + self.vaet.pndintrnest + (self.vaet.pndinvinamt * -1) + self.vaet.pndaddons;
               self.totwip = self.vaet.wipinvamt + self.vaet.wipextrnamt + self.vaet.wipintrnamt + (self.vaet.wipinvinamt * -1) + self.vaet.wipaddons;
            }

            self.getExtraHeaderData();

            self.getLaborHeaderData();

            self.headerUpdateNeeded = false;
         }
      });
   };

   self.activate = function (type) {

      if (type === 'header') {
         self.saveButtonEnabled = true;

         if (self.headerUpdateNeeded) {
            self.updateHeaderDisplay();
         }

      } else {
         if (type === 'lines') {
            var isSectionSelected = true;
            if (base.sctnGrid && base.sectionResults) {
               var selectedRows = GridService.getSelectedRecords(base.sctnGrid);
               if (!selectedRows || selectedRows.length !== 1) {
                  isSectionSelected = false;
               }
            } else {
               isSectionSelected = false;
            }

            if (!isSectionSelected) {
               //Clear residual data.
               base.lineList = [];
               MessageService.error('global.error', 'message.to.view.lines.you.must.select.a.section');
            }
         } else if (type === 'sections') {
            //if there was an active cell, reselect and update it
            if (base.currentSectionRowIndex >= 0) {
               base.sctnGrid.selectRow(base.currentSectionRowIndex);
               base.sctnGrid.updateRow(base.currentSectionRowIndex);
            }
         }

         self.saveButtonEnabled = false;
      }
   };

   TabService.canUserCloseTab($state.current, function () {
      if (self.cancelRollbackScreenDisplay === true) {
         self.cancelRollbackScreenDisplay = false;
         self.rollupCallback = null;
      }

      //if we need to show the VA rollup, then do not allow them to close, and open the rollup screen
      if (self.rollupCallback) {
         $state.go('.rollup');
         MessageService.info('global.warning', 'message.va.rollup.must.be.completed');
         return false;
      } else if ($state.current.name !== 'vaet.master') {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      }
      else {
         return true;
      }
   });

   self.setVaHeaderData = function () {
      self.vaHeaderData = $scope.base.vaet;
      if (self.vaHeaderData) {
         self.vaHeaderData.vanox = self.vaHeaderData.vano + '-' + Utils.pad(self.vaHeaderData.vasuf, 2);
         self.vaHeaderData.stagecdx = base.formatStageCd(self.vaHeaderData.stagecd);
         self.vaHeaderData.nonstocktyx = base.formatNonstockType(self.vaHeaderData.nonstockty);
         self.vaHeaderData.transtypex = base.formatTransactionType(self.vaHeaderData.transtype);
      }
   };

   // Get data to display in Detail banner screen
   if ($stateParams.vaNumber) {
      var params = {
         vano: $stateParams.vaNumber,
         vasuf: $stateParams.vaSuffix
      };
      DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            $scope.base.vaet = data;
            self.setVaHeaderData();
            if (self.goDirectlyToRollUp) {
               self.clearLock();
            }
         }
      });
   } else {
      self.setVaHeaderData();
   }

   // The VA record will be loaded in the code for the Header tab since that is the only screen
   // that directly displays data from VAEH
   self.vaet = null;

   self.performRollupCallback = function (data) {
      self.rollupCallback({
         orderno: data.orderno,
         ordersuf: data.ordersuf,
         lineno: data.lineno,
         price: data.price,
         vano: base.vaet.vano,
         vasuf: base.vaet.vasuf
      }, function (data2) {
         DataService.get('api/va/asvaheader/vaheaderremovesoftlock/' + data2.vano + '/' + data2.vasuf, function () {
         });
         $state.go('vaet.master');
      });
   }

   // Clear the lock if the user goes back to the Master grid
   self.clearLock = function () {

      if (self.cancelRollbackScreenDisplay === true) {
         self.cancelRollbackScreenDisplay = false;
         self.rollupCallback = null;
      }

      // If SASO indicates user should be forced to the Header tab, check to see if the use has been there
      if (!base.wasHeaderViewed && base.headersettings.vaheaderty.toLowerCase() === 'a') {
         base.isHeaderTabSelected++;
      } else {

         //if this exists, it means we're here for a va rollup, so show the rollup screen
         if (self.rollupCallback) {
            $state.go('.rollup');
         } else {
            if (base.vaet) {
               DataService.get('api/va/asvaheader/vaheaderremovesoftlock/' + base.vaet.vano + '/' + base.vaet.vasuf, function () {
               });
            }
            //NOTE: (remove after updated) had to take this out of the navigation on click in json becuase we need it to come from in here
            //once we've made sure we dont have to go to the rollup screen
            $state.go('vaet.master');
         }
      }

   };

   // Save
   self.submit = function () {
      DataService.put('api/va/vaeh', { data: self.vaet }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };
});

app.controller('VaetDetailHeaderCtrl', function ($scope, UtilsData) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.zero = 0;
   base.wasHeaderViewed = true;

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   dtl.updateHeaderDisplay();

   // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function (args) {
      UtilsData.getSastnDescriptionSpecial('R', args.value, function (descrip) {
         dtl.vaet.refer = descrip;
      });
   }
});

app.controller('VaetDetailLaborCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;
   var vaet = $scope.base.vaet;

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   var vaifbuildlistcriteria = {
      vano: vaet.vano,
      vasuf: vaet.vasuf,
      prod: vaet.shipprod,
      verno: vaet.verno,
      whse: vaet.whse
   };
   DataService.post('api/va/asvainquiry/vaifbuildvalist', { data: vaifbuildlistcriteria, busy: true }, function (data) {
      if (data) {
         self.headerResults = data.vaifbuildvahdrlistresults;
         self.laborResults = data.vaifbuildvalaborlistresults;
         self.lineResults = data.vaifbuildvalinelistresults;

      }
   });

});

app.controller('VaetRollupCtrl', function ($scope, $state, $translate, DataService, Utils) {
   //rollup
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.subTitle = '';

   //Prevent initialize errors
   self.criteria = {
      vacalcdfltty: 'markup',
      ourproc: 'oeet',
      orderno: 0,
      ordersuf: 0,
      lineno: 0,
      pdrecno: 0,
      prod: '',
      whse: '',
      qty: 0,
      unit: '',
      custno: 0,
      shipto: ''
   };
   self.results = {
      prcupdatefl: true,
      overprc: 0,
      varollfl: true
   }

   DataService.get('api/va/asvaentry/vaetdetailbannerlogoff/' + base.vaet.vano, { busy: true }, function (logoffData) {
      if (logoffData) {
         self.criteria = {
            vacalcdfltty: 'markup',
            ourproc: logoffData.ourproc,
            orderno: logoffData.orderno,
            ordersuf: logoffData.ordersuf,
            lineno: logoffData.lineno
         };
         DataService.post('api/va/asvaentry/varollcstprcinitialize', { data: self.criteria, busy: true }, function (rollupInitData) {
            if (rollupInitData) {
               self.results = rollupInitData;
               self.results.varollfl = true;
               self.results.prcupdatefl = base.sasoo.oepricefl === 'e';
               self.subTitle = self.results.orderno + '-' + Utils.pad(self.results.ordersuf, 2) + ': ' + self.results.lineno;
            } else {
               self.subTitle = '';
            }
         }, function () {
            //call errored out, leave VAET
            self.cancel();
         });
      }
   }, function () {
      //call errored out, leave VAET
      self.cancel();
   });

   self.laborBasedLabel = function () {
      var returnLabel = $translate.instant('global.price.labor.based.on.cost.');
      if (self.criteria.vacalcdfltty === 'margin') {
         return returnLabel + $translate.instant('global.margin');
      } else if (self.criteria.vacalcdfltty === 'markup') {
         return returnLabel + $translate.instant('global.markup');
      } else {
         return '';
      }
   };

   self.inventoryBasedLabel = function () {
      var returnLabel = $translate.instant('global.price.inventory.based.on.');
      if (self.criteria.vacalcdfltty === 'margin') {
         return returnLabel + $translate.instant('global.margin');
      } else if (self.criteria.vacalcdfltty === 'markup') {
         return returnLabel + $translate.instant('global.markup');
      } else {
         return '';
      }
   };

   self.marginsOrMarkups = function () {
      if (self.criteria.vacalcdfltty === 'margin') {
         return $translate.instant('global.margin');
      } else if (self.criteria.vacalcdfltty === 'markup') {
         return $translate.instant('global.markup');
      } else {
         return '';
      }
   };

   self.update = function () {
      var rollupUpdate = {
         custno: self.results.custno,
         lineno: self.results.lineno,
         orderno: self.results.orderno,
         ordersuf: self.results.ordersuf,
         ourproc: self.results.ourproc,
         prcupdatefl: self.results.prcupdatefl,
         price: self.results.overprc,
         prod: self.results.prod,
         qty: self.results.qty,
         shipto: self.results.shipto,
         unit: self.results.unit,
         userfield: self.results.userfield,
         whse: self.results.whse
      };
      DataService.post('api/va/asvaentry/varollcstprcupdate', { data: rollupUpdate, busy: true }, function (data) {
         if (data) {
            if (data.prcupdatefl && dtl.rollupCallback) {
               $state.go('^');
               dtl.cancelRollbackScreenDisplay = true;
               dtl.performRollupCallback({
                  orderno: data.orderno,
                  ordersuf: data.ordersuf,
                  lineno: data.lineno,
                  price: data.price
               });
            } else {
               self.cancel();
            }
         }
      });
   };

   self.recalculate = function () {
      self.criteria.varollfl = true;
      DataService.post('api/va/asvaentry/varollcstprccalculate', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.results = data;
            self.results.varollfl = true;  // Not set in varollcstprc*
         }
      });
   };

   self.cancel = function () {
      $state.go('^');
      dtl.cancelRollbackScreenDisplay = true;
      dtl.clearLock();
   };
});