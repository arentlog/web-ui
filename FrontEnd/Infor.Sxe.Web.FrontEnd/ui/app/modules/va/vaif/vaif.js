'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('va', 'vaif', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('va', 'vaif');

   $stateProvider.state('vaif.detail', {
      url: '/detail?id&pk&pk2',
      params: {
         header: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/detail.json');
            },
            controller: 'VaifDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('vaif.detail.sectionaddons', {
      url: '/section-addons',
      params: {
         sctn: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/sections/addons.json');
            },
            controller: 'VaifSectionAddonsCtrl as sctnaddons'
         }
      }
   });

   $stateProvider.state('vaif.detail.sectionextendin', {
      url: '/section-extend-in',
      params: {
         sctn: null
      },
      views: {
         extendedDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/sections/extend-in.json');
            },
            controller: 'VaifSectionExtendInCtrl as sctnextin'
         }
      }
   });

   $stateProvider.state('vaif.detail.sectionextendex', {
      url: '/section-extend-ex',
      params: {
         sctn: null
      },
      views: {
         extendedDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/sections/extend-ex.json');
            },
            controller: 'VaifSectionExtendExCtrl as sctnextex'
         }
      }
   });

   $stateProvider.state('vaif.detail.sectionextendii', {
      url: '/section-extend-ii',
      params: {
         sctn: null
      },
      views: {
         extendedDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/sections/extend-ii.json');
            },
            controller: 'VaifSectionExtendIiCtrl as sctnextii'
         }
      }
   });
   $stateProvider.state('vaif.detail.sectionspec', {
      url: '/section-specifications',
      params: {
         sctn: null
      },
      views: {
         extendedDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/sections/extend-specifications.json');
            },
            controller: 'VaifSectionSpecCtrl as sctnspec'
         }
      }
   });

   $stateProvider.state('vaif.detail.linedetail', {
      url: '/line-detail',
      params: {
         line: null
      },
      views: {
         lineDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/lines/line-detail.json');
            },
            controller: 'VaifLineExtendCtrl as linedtl'
         }
      }
   });

   $stateProvider.state('vaif.detail.linehistory', {
      url: '/line-history',
      params: { line: null },
      views: {
         lineDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/lines/line-history-view.json');
            },
            controller: 'VaifLineHistoryCtrl as lhc'
         }
      }

   });

   $stateProvider.state('vaif.detail.linecomment', {
      url: '/line-comment',
      params: { line: null },
      views: {
         lineDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaif/tabs/lines/line-comment-view.json');
            },
            controller: 'VaifLineCommentCtrl as linecom'
         }
      }

   });
});

app.controller('VaifBaseCtrl', function ($scope, $state, $translate, ConfigService, DataService, MessageService, OptionSetService, Utils) {

   var self = this;
   self.selectLineTabIfNotOnlyVisible = false;
   self.headerTabVisible = true;
   self.lineTabVisible = true;
   self.laborTabVisible = true;

   /**
    * Return the formatted order number and suffix
    */
   self.getFullOrderNumber = function (vano, vasuf) {
      if (!vasuf) {
         vasuf = 0;
      }
      if (vano) {
         return vano + '-' + Utils.pad(vasuf, 2);
      } else {
         return '';
      }
   };

   self.getFullOrderNumber2 = function (e) {
      if (e.vano) {
         return self.getFullOrderNumber(e.vano, e.vasuf);
      }
      else {
         return '0-00';
      }
   };

   self.auditHyperlink = function () {
      $state.go('audit.master', { pk: 'vaeh' });
   };

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'vaif',
      rowIdField: 'rowID',
      stateRef: 'vaif.detail',
      title: { label: 'global.value.add.order.number', valueFunction: 'base.getFullOrderNumber2' },
      description: { label: 'global.stage', valueFunction: 'base.formatStage' }
   };

   self.displayOnlyInSearch = [
      { value: 0, label: MessageService.get('global.all') },
      { value: 1, label: MessageService.get('global.header.information') },
      { value: 2, label: MessageService.get('global.line.detail') },
      { value: 3, label: MessageService.get('global.labor.detail') }
   ];

   self.formatStage = function (vaeh) {
      if (vaeh.stagecd || vaeh.stagecd === 0) {
         switch (vaeh.stagecd.toString()) {
            case '0':                                             //ignore jslint - correct indentation
               return $translate.instant('global.entered');       //ignore jslint - correct indentation
            case '1':                                             //ignore jslint - correct indentation
               return $translate.instant('global.ordered');       //ignore jslint - correct indentation
            case '3':                                             //ignore jslint - correct indentation
               return $translate.instant('global.printed');       //ignore jslint - correct indentation
            case '5':                                             //ignore jslint - correct indentation
               return $translate.instant('global.received');      //ignore jslint - correct indentation
            case '7':                                             //ignore jslint - correct indentation
               return $translate.instant('global.closed');        //ignore jslint - correct indentation
            case '9':                                             //ignore jslint - correct indentation
               return $translate.instant('global.cancelled');     //ignore jslint - correct indentation
            default:                                              //ignore jslint - correct indentation
               return '';                                         //ignore jslint - correct indentation
         }
      } else {
         return '';
      }
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

   self.isMaster = function () {
      return $state.is('vaif.master');
   };

   self.includesMaster = function () {
      return $state.includes('vaif.master');
   };

   self.isDetail = function () {
      return $state.is('vaif.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vaif.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria = {
         slprodstat: 'All',
         vanox: '0-00',
         vano: 0,
         vasuf: 0,
         detailtype: 0
      };
      self.criteria.irecordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      self.headerTabVisible = self.criteria.detailtype === 0 || self.criteria.detailtype === 1;
      self.lineTabVisible = self.criteria.detailtype === 0 || self.criteria.detailtype === 2;
      self.laborTabVisible = self.criteria.detailtype === 0 || self.criteria.detailtype === 3;
      self.selectLineTabIfNotOnlyVisible = false;

      if ((self.criteria.vano && self.criteria.vano !== '0') || !self.criteria.keyword) {
         DataService.post('api/va/asvainquiry/vaifbuildvalist', { data: self.criteria, busy: true }, function (data) {
            self.datasetHeader = data.vaifbuildvahdrlistresults;
            self.datasetLine = data.vaifbuildvalinelistresults;
            self.datasetLabor = data.vaifbuildvalaborlistresults;
         });
      } else if (self.criteria.keyword) {
         var keywordCriteria = {
            iBatchSize: self.criteria.irecordcountlimit,
            cSearchString: self.criteria.keyword
         };
         DataService.post('api/va/asvainquiry/vaifbuildvalistbysearchwordindex', { data: keywordCriteria, busy: true }, function (data) {
            self.datasetHeader = data.vaifbuildvahdrlistresults;
            self.datasetLine = data.vaifbuildvalinelistresults;
            self.datasetLabor = data.vaifbuildvalaborlistresults;
         });
      } else {
         self.datasetHeader = [];
         self.datasetLine = [];
         self.datasetLabor = [];
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('VaifSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   self.changeOfVAOrder = function (args) {
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = base.criteria.vanox.split('-');
            if (orderParts.length === 2) {
               base.criteria.vano = orderParts[0];
               base.criteria.vasuf = orderParts[1];
            } else {
               base.criteria.vano = base.criteria.vanox;
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

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vaif.master');
      }

      // Get data
      base.search();
   };
});

app.controller('VaifMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService) {
   var self = this;

   // Advanced search criteria object with initial values
   self.advCriteria = {
      vanox: '0-00',
      vano: 0,
      vasuf: 0,
      slprodstat: 'All',
      detailtype: 0,
      transtypelist: [],
      stagelist: [],
      irecordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   /* HYPERLINKS */
   self.auditHyperlink = function () {
      $state.go('audit.master', { pk: 'vaeh' });
   };

   self.custnoHyperlink = function () {
      $state.go('aric.detail', { pk: self.advCriteria.custno });
   };

   self.vendnoHyperlink = function () {
      $state.go('apiv.detail', { pk: self.advCriteria.vendno });
   };

   self.prodHyperlink = function () {
      $state.go('icip.detail', { pk: self.advCriteria.prod });
   };


   self.compprodHyperlink = function () {
      $state.go('icip.detail', { pk: self.advCriteria.compprod });
   };



   self.customerInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.ordercustno) {
         $state.go('aric.detail', { pk: currentRow.ordercustno });
      }
   };

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: currentRow.whse }, { reload: 'icia.detail' });
      }
   };

   self.tiedorderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // Tied Order HyperLink
      if (currentRow && currentRow.orderaltno) {
         if (currentRow.ordertypedspl.toLowerCase() === 'oe') {
            $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertypedspl.toLowerCase() === 'po') {
            $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertypedspl.toLowerCase() === 'wt') {
            $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertypedspl.toLowerCase() === 'va') {
            $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.ordertypedspl.toLowerCase() === 'kp') {
            $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
         }
      }
   };

   self.changeOfVAOrder = function (args) {
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = self.advCriteria.vanox.split('-');
            if (orderParts.length === 2) {
               self.advCriteria.vano = orderParts[0];
               self.advCriteria.vasuf = orderParts[1];
            } else {
               self.advCriteria.vano = self.advCriteria.vanox;
               self.advCriteria.vasuf = 0;
            }
         } else {
            self.advCriteria.vano = args.value;
            self.advCriteria.vasuf = args.value2;
         }
      } else {
         self.advCriteria.vano = 0;
         self.advCriteria.vasuf = 0;
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

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'vanox', label: MessageService.get('global.order.number') },
      { value: 'prod', label: MessageService.get('global.finished.product') },
      { value: 'verno', label: MessageService.get('global.setup.version.number') },
      { value: 'compprod', label: MessageService.get('global.component.product') },
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'custno', label: MessageService.get('global.customer.number') },
      { value: 'vendno', label: MessageService.get('global.vendor.number') },
      { value: 'takenby', label: MessageService.get('global.taken.by') },
      { value: 'slstage', label: MessageService.get('global.stage') },
      { value: 'sltranstype', label: MessageService.get('global.transaction.type') },
      { value: 'slprodstat', label: MessageService.get('global.line.type') },
      { value: 'detailtype', label: MessageService.get('global.detail.type') },
      { value: 'entereddate', label: MessageService.get('global.entered.date') },
      { value: 'promiseddate', label: MessageService.get('global.promised.date') },
      { value: 'reqshipdate', label: MessageService.get('global.requested.ship.date') },
      { value: 'estcompdt', label: MessageService.get('global.estimated.completion.date') },
      { value: 'slbotype', label: MessageService.get('global.backorder.filter') },
      { value: 'receiptdt', label: MessageService.get('global.receipt.date') },
      { value: 'irecordcountlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['prod,compprod,whse'];

   self.fromenteredChanged = function () {
      self.advCriteria.toentereddate = self.advCriteria.fromentereddate;
   };
   self.frompromisedChanged = function () {
      self.advCriteria.topromiseddate = self.advCriteria.frompromiseddate;
   };
   self.fromreqshipChanged = function () {
      self.advCriteria.toreqshipdate = self.advCriteria.fromreqshipdate;
   };
   self.fromestcompChanged = function () {
      self.advCriteria.toestcompdt = self.advCriteria.fromestcompdt;
   };
   self.fromreceiptChanged = function () {
      self.advCriteria.toreceiptdt = self.advCriteria.fromreceiptdt;
   };

   /**
    * Drill down to detail
    */
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('vaif.detail', { header: record, pk: record.vano, pk2: record.vasuf });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var base = $scope.base;

      var advCriteria = angular.copy(self.advCriteria);

      base.headerTabVisible = advCriteria.detailtype === 0 || advCriteria.detailtype === 1;
      base.lineTabVisible = advCriteria.detailtype === 0 || advCriteria.detailtype === 2;
      base.laborTabVisible = advCriteria.detailtype === 0 || advCriteria.detailtype === 3;
      self.selectLineTabIfNotOnlyVisible = advCriteria.compprod || advCriteria.slprodstat !== 'All';

      // Load list of selected stages
      advCriteria.slstage = advCriteria.stageList ? advCriteria.stageList.toString() : '';
      delete advCriteria.stageList;

      // Load list of selected transaction types
      advCriteria.sltranstype = advCriteria.transTypeList ? advCriteria.transTypeList.toString() : '';
      delete advCriteria.transTypeList;

      // Apply record limit (if cleared by user)
      if (!advCriteria.irecordcountlimit) {
         advCriteria.irecordcountlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/va/asvainquiry/vaifbuildvalist', { data: advCriteria, busy: true }, function (data) {
         base.datasetHeader = data.vaifbuildvahdrlistresults;
         base.datasetLine = data.vaifbuildvalinelistresults;
         base.datasetLabor = data.vaifbuildvalaborlistresults;
      });
   };
});

app.controller('VaifDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, Sasoo, Sasc) {
   var self = this;
   var base = $scope.base;

   self.workingSection = 0;
   self.workingSectionType = '';
   self.workingSectionDescrip = '';
   self.workingRowIndex = null;
   self.icincaddgl = Sasc.icincaddgl;
   self.zero = 0;
   self.WL = [];

   // Get vaeh record (handle both id param and pk params)
   if ($stateParams.id) {
      self.vaeh = DataService.getResource('api/va/vaeh/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         vano: $stateParams.pk,
         vasuf: $stateParams.pk2,
         fillmode: true
      };

      base.criteria.vanox = base.getFullOrderNumber(params.vano, params.vasuf);

      self.vaeh = DataService.getResource('api/va/vaeh/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.vaeh.$promise.then(function () {
      if (self.vaeh) {
         self.isLoadingFinished = true;
         self.subTitle = MessageService.get('global.order.number') + ': ' + base.getFullOrderNumber(self.vaeh.vano, self.vaeh.vasuf);

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.vaeh);

         /* Extra Data */
         self.vaeh.seecostfl = Sasoo.seecostfl;
         var isPendingOrWipInternalCharges = self.vaeh.pndintrnamt !== 0 || self.vaeh.wipintrnamt !== 0;
         self.vaeh.pendingTotal = self.vaeh.pndinvamt + self.vaeh.pndextrnamt +
            (self.vaeh.pndinvinamt * -1) + self.vaeh.pndaddons + (isPendingOrWipInternalCharges ? self.vaeh.pndintrnamt : self.vaeh.pndintrnest);

         self.vaeh.wipTotal = self.vaeh.wipinvamt + self.vaeh.wipextrnamt + self.vaeh.wipintrnamt +
            self.vaeh.wipaddons + (self.vaeh.wipinvinamt * -1);
         var advCriteria = {};
         if ($stateParams.header) {
            // Get specific row
            advCriteria = {
               vano: $stateParams.header.vano,
               vasuf: $stateParams.header.vasuf,
               slprodstat: 'All',
               detailtype: 0,
               transtypelist: [],
               stagelist: [],
               irecordcountlimit: 0
            };
            DataService.post('api/va/asvainquiry/vaifbuildvalist', { data: advCriteria, busy: true }, function (data) {
               self.vaehRow = data.vaifbuildvahdrlistresults[0];
               self.laborlist = data.vaifbuildvalaborlistresults;
            });
         } else {
            // Get specific row
            advCriteria = {
               vano: self.vaeh.vano,
               vasuf: self.vaeh.vasuf,
               slprodstat: 'All',
               detailtype: 0,
               transtypelist: [],
               stagelist: [],
               irecordcountlimit: 0
            };
            DataService.post('api/va/asvainquiry/vaifbuildvalist', { data: advCriteria, busy: true }, function (data) {
               self.vaehRow = data.vaifbuildvahdrlistresults[0];
               self.laborlist = data.vaifbuildvalaborlistresults;
            });
         }

         //Hide-Unhide the WL Tab
         var params = { whse: self.vaeh.whse, fillmode: true, fldlist: 'wlloc' };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               self.wlTabVisible = data.wlloc ? true : false;
            }
         });

         self.vaeh.wipLateCharges = 0;
         self.vaecresults = [];
         DataService.post('api/va/asvainquiry/vaeccreatetemptable', { data: self.vaeh, busy: true }, function (data) {
            if (data.vaecresults) {
               self.vaecresults = data.vaecresults;
               self.vaecresults.forEach(function (record) {
                  self.vaeh.wipLateCharges += record.amount;
               });
            }
         });

      }
   });

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: self.vaeh.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: self.vaeh.whse }, { reload: 'icia.detail' });
      }
   };

   self.refreshLineData = function () {
      if (self.workingSection) {
         var criteria = {
            functionnm: 'vaif',
            vano: self.vaeh.vano,
            vasuf: self.vaeh.vasuf,
            seqno: self.workingSection, // The section the user has selected
            lineno: 0 // all lines
         };
         DataService.post('api/va/asvaline/valineretrieve', { data: criteria, busy: true }, function (data) {
            self.valinelistresults = data.valinelistresults;
            if (data.messaging) {
               MessageService.processMessaging(data.messaging);
            }
         });
      }
   };

   self.refreshWLData = function () {
      var criteria = {
         orderno: self.vaeh.vano,
         ordersuf: self.vaeh.vasuf,
         seqno: self.workingSection,
         ordertype: 'f',
         whseview: 'S',
         customparam: ''
      };

      // Load WL Inquiry
      DataService.post('api/wl/aswlinquiry/loadwlinquiry', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.WL.unavailableMessage = data.cUnavailableMessage;
            self.WL.dataset = data.loadwlinqdtlresults;

            if (data.loadwlinqhdrresults) {
               self.WL.wLHeader = data.loadwlinqhdrresults[0];
            }
            self.WL.single = data.loadwlinqsingle;
         }
      });
   };


});

app.controller('VaifDetailHeaderCtrl', function ($state, $scope, DataService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.zero = 0;

   /* Catch a Refresh when on a section screen */
   if (!dtl.workingSection &&
      ($state.is('vaif.detail.sectionextendin') ||
         $state.is('vaif.detail.sectionextendex') ||
         $state.is('vaif.detail.sectionextendii') ||
         $state.is('vaif.detail.sectionspec') ||
         $state.is('vaif.detail.sectionaddons') ||
         $state.is('vaif.detail.linedetail'))) {
      $state.go('vaif.detail');
   }

   // Get VA Header labor information
   self.loadLaborInfo = function () {
      if (dtl.vaeh) {
         var laborCriteria = {
            vano: dtl.vaeh.vano,
            vasuf: dtl.vaeh.vasuf
         };
         DataService.post('api/va/asvaentry/vagetheadlabor', { data: laborCriteria, busy: true }, function (data) {
            dtl.laborResults = data;
         });
      }
   };

   self.loadInventory = function () {
      if (dtl.vaeh) {
         var params = {
            prod: dtl.vaeh.shipprod,
            whse: dtl.vaeh.whse,
            fldlist: 'serlottype',
            fillmode: true
         };
         DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true }, function (icsw) {
            if (icsw) {
               dtl.vaeh.serlottype = icsw.serlottype;
            }
         });
      }
   };

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   // After record has resolved...
   dtl.vaeh.$promise.then(function () {

      self.loadLaborInfo();

      // Get extra data needed to display on the Header screen
      DataService.get('api/va/asvaheader/vaheaderdetailload/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf, function (data) {
         if (data) {
            self.compData = data.vaheaderallcomponent;
            self.hdrExtra = data.vaheaderextrafields;
         }
      });

      self.loadInventory();


      // Load Configurator details
      var configParams = {
         ordertype: 'f',
         orderno: dtl.vaeh.vano,
         ordersuf: dtl.vaeh.vasuf,
         lineno: 1,
         seqno: 0,
         fldlist: 'cfgintdata'
      };
      if (dtl.vaeh.vacfgfl) {
         DataService.get('api/shared/cfgdata/getbypk', { params: configParams, busy: true }, function (data) {
            if (data) {
               dtl.vaeh.cfgintdatafield = (data.cfgintdata) ? data.cfgintdata.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
            }
         });
      }

   });
});

app.controller('VaifDetailSectionCtrl', function ($state, $scope, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.setWorkingSection = function (workingSection, workingSectionType, workingSectionDescrip, workingRowIndex, isSelectRowNow) {
      dtl.workingSection = workingSection ? workingSection : 0;
      dtl.workingSectionType = workingSectionType ? workingSectionType : '';
      dtl.workingSectionDescrip = workingSectionDescrip ? workingSectionDescrip : '';
      dtl.workingRowIndex = workingRowIndex ? workingRowIndex : null;
      if (isSelectRowNow) {
         this.sectionGrid.selectRow(workingRowIndex);  // On a single select only situation this auto unselects if any other selection is made already
      }
      dtl.refreshLineData();
   };

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   self.timeTypeFormatter = function (row, cell, value, column, item) {
      if (value) {

         if (value.toLowerCase() === 'a') {
            return MessageService.get('global.actual');
         } else {
            return MessageService.get('global.estimated');
         }

      } else {
         return value;
      }
   };

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   self.stageFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionStage(value);
      }
   };

   self.altTypeFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatPOTransType(value);
      } else {
         return value;
      }
   };

   self.altStageFormatter = function (row, cell, value, column, item) {
      if (value) {

         // From g-postg.i
         if (value.toLowerCase() === 'ent') {
            return MessageService.get('global.entered');
         } else if (value.toLowerCase() === 'ord') {
            return MessageService.get('global.ordered');
         } else if (value.toLowerCase() === 'prt') {
            return MessageService.get('global.printed');
         } else if (value.toLowerCase() === 'ack') {
            return MessageService.get('global.acknowledged');
         } else if (value.toLowerCase() === 'pre') {
            return MessageService.get('global.pre.receiving');
         } else if (value.toLowerCase() === 'rcv') {
            return MessageService.get('global.received');
         } else if (value.toLowerCase() === 'cst') {
            return MessageService.get('global.costed');
         } else if (value.toLowerCase() === 'cls') {
            return MessageService.get('global.closed');
         } else {
            return MessageService.get('global.cancelled');
         }

      } else {
         return value;
      }
   };

   self.isSectionList = function () {
      return !($state.is('vaif.detail.sectionextendin') ||
         $state.is('vaif.detail.sectionextendex') ||
         $state.is('vaif.detail.sectionextendii') ||
         $state.is('vaif.detail.sectionspec') ||
         $state.is('vaif.detail.sectionaddons'));
   };

   // After record has resolved...
   dtl.vaeh.$promise.then(function () {
      DataService.get('api/va/asvasection/vasectionretrieve/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf, function (data) {
         if (data) {
            self.sectionResults = data;
         }
      });
   });

   self.sectionExtend = function (e, args) {
      var section = args[0].item;
      var dtl = $scope.dtl;
      self.setWorkingSection(section.seqno, section.sctntype, section.codedesc, self.sectionResults.indexOf(section), true);
      switch (dtl.workingSectionType.toLowerCase()) {
         case 'in':                                                         //ignore jslint - correct indentation
            $state.go('vaif.detail.sectionextendin', { sctn: section });    //ignore jslint - correct indentation
            break;                                                          //ignore jslint - correct indentation
         case 'ex':                                                         //ignore jslint - correct indentation
         case 'is':                                                         //ignore jslint - correct indentation
         case 'it':                                                         //ignore jslint - correct indentation
            $state.go('vaif.detail.sectionextendex', { sctn: section });    //ignore jslint - correct indentation
            break;                                                          //ignore jslint - correct indentation
         case 'ii':                                                         //ignore jslint - correct indentation
            $state.go('vaif.detail.sectionextendii', { sctn: section });    //ignore jslint - correct indentation
            break;                                                          //ignore jslint - correct indentation
         default: // sp                                                     //ignore jslint - correct indentation
            $state.go('vaif.detail.sectionspec', { sctn: section });        //ignore jslint - correct indentation
            break;                                                          //ignore jslint - correct indentation
      }
   };

   self.sectionSelectionChange = function (e, args) {
      var records = GridService.getSelectedRecords(self.sectionGrid);
      if (records && records.length === 1) {
         self.setWorkingSection(records[0].seqno, records[0].sctntype, records[0].codedesc, self.sectionResults.indexOf(records[0]), false);
      } else {
         self.setWorkingSection(0, '', '', null, false);
      }
   };

   self.TiedOrderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderaltno) {
         $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
      }
   };
});

app.controller('VaifSectionAddonsCtrl', function ($state, $scope, $stateParams, $translate, DataService, UtilsData) {
   var self = this;
   var dtl = $scope.dtl;
   self.sctn = $stateParams.sctn;

   if (!dtl.workingSection) {
      $state.go('vaif.master');
   }

   // Get the addon data for the selected section
   var vagetaddoncriteria = {
      functionnm: 'vaif',
      vano: dtl.vaeh.vano,
      vasuf: dtl.vaeh.vasuf,
      seqno: dtl.workingSection
   };
   DataService.post('api/va/asvasection/vasectionretrieveaddons', { data: vagetaddoncriteria, busy: true }, function (data) {
      if (data.vaaddons[0]) {
         self.sctn.sectionAddon = data.vaaddons[0];
         self.sctn.sectionAddon.addondesc1 = '1. ';
         self.sctn.sectionAddon.addondesc2 = '2. ';
         self.sctn.sectionAddon.addondesc3 = '3. ';
         self.sctn.sectionAddon.addondesc4 = '4. ';

         if (self.sctn.sectionAddon.addonno1) {
            UtilsData.getSastnDescripSingle('X', self.sctn.sectionAddon.addonno1, function (descrip) {
               self.sctn.sectionAddon.addondesc1 += descrip;
            });
         }

         if (self.sctn.sectionAddon.addonno2) {
            UtilsData.getSastnDescripSingle('X', self.sctn.sectionAddon.addonno2, function (descrip) {
               self.sctn.sectionAddon.addondesc2 += descrip;
            });
         }

         if (self.sctn.sectionAddon.addonno3) {
            UtilsData.getSastnDescripSingle('X', self.sctn.sectionAddon.addonno3, function (descrip) {
               self.sctn.sectionAddon.addondesc3 += descrip;
            });
         }

         if (self.sctn.sectionAddon.addonno4) {
            UtilsData.getSastnDescripSingle('X', self.sctn.sectionAddon.addonno4, function (descrip) {
               self.sctn.sectionAddon.addondesc4 += descrip;
            });
         }
      }
   });
});

app.controller('VaifSectionExtendInCtrl', function ($state, $scope, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.sctn = $stateParams.sctn;

   if (!dtl.workingSection) {
      $state.go('vaif.master');
   }

   dtl.vaeh.$promise.then(function () {
      self.detailTitle = MessageService.get('global.extended.information') + ': ' +
         base.formatSectionType(dtl.workingSectionType);
      self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
      self.detailSubTitle += dtl.workingSection + ' | ' + dtl.workingSectionDescrip;

      // Get the specification data for the selected section
      DataService.get('api/va/asvasection/vasectionspecinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection, function (data) {
         if (data) {
            self.sctn.sectionSpec = data;
            self.sctn.sectionSpec.specdatafield = (data.specdata) ? data.specdata.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
            switch (dtl.workingSectionType.toLowerCase()) {
               case 'in':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendininitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionInternal = data2;
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               case 'ex':                                                                                                                                                             //ignore jslint - correct indentation
               case 'is':                                                                                                                                                             //ignore jslint - correct indentation
               case 'it':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendexinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionExtend = data2;

                        if (self.sctn.sectionExtend.desttype.toLowerCase() === 'f') {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.final.product');
                        } else {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.intermediate.product');
                        }
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               default: // sp, ii                                                                                                                                                     //ignore jslint - correct indentation
                  break;                                                                                                                                                              //ignore jslint - correct indentation
            }
         }
      });

   });


});

app.controller('VaifSectionExtendExCtrl', function ($state, $scope, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.sctn = $stateParams.sctn;

   if (!dtl.workingSection) {
      $state.go('vaif.master');
   }

   dtl.vaeh.$promise.then(function () {

      self.detailTitle = MessageService.get('global.extended.information') + ': ' +
         base.formatSectionType(dtl.workingSectionType);

      self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
      self.detailSubTitle += dtl.workingSection + ' | ' + dtl.workingSectionDescrip;


      // Get the specification data for the selected section
      DataService.get('api/va/asvasection/vasectionspecinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection, function (data) {
         if (data) {
            self.sctn.sectionSpec = data;
            self.sctn.sectionSpec.specdatafield = (data.specdata) ? data.specdata.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
            switch (dtl.workingSectionType.toLowerCase()) {
               case 'in':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendininitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionInternal = data2;
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               case 'ex':                                                                                                                                                             //ignore jslint - correct indentation
               case 'is':                                                                                                                                                             //ignore jslint - correct indentation
               case 'it':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendexinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionExtend = data2;

                        if (self.sctn.sectionExtend.desttype.toLowerCase() === 'f') {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.final.product');
                        } else {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.intermediate.product');
                        }
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               default: // sp, ii                                                                                                                                                     //ignore jslint - correct indentation
                  break;                                                                                                                                                              //ignore jslint - correct indentation
            }
         }
      });
   });
});

app.controller('VaifSectionExtendIiCtrl', function ($state, $scope, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.sctn = $stateParams.sctn;

   if (!dtl.workingSection) {
      $state.go('vaif.master');
   }

   dtl.vaeh.$promise.then(function () {

      self.detailTitle = MessageService.get('global.extended.information') + ': ' +
         base.formatSectionType(dtl.workingSectionType);

      self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
      self.detailSubTitle += dtl.workingSection + ' | ' + dtl.workingSectionDescrip;


      // Get the specification data for the selected section
      DataService.get('api/va/asvasection/vasectionspecinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection, function (data) {
         if (data) {
            self.sctn.sectionSpec = data;
            self.sctn.sectionSpec.specdatafield = (data.specdata) ? data.specdata.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
            switch (dtl.workingSectionType.toLowerCase()) {
               case 'in':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendininitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionInternal = data2;
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               case 'ex':                                                                                                                                                             //ignore jslint - correct indentation
               case 'is':                                                                                                                                                             //ignore jslint - correct indentation
               case 'it':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendexinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionExtend = data2;

                        if (self.sctn.sectionExtend.desttype.toLowerCase() === 'f') {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.final.product');
                        } else {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.intermediate.product');
                        }
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               default: // sp, ii                                                                                                                                                     //ignore jslint - correct indentation
                  break;                                                                                                                                                              //ignore jslint - correct indentation
            }
         }
      });
   });
});

app.controller('VaifSectionSpecCtrl', function ($state, $scope, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var dtl = $scope.dtl;
   self.sctn = $stateParams.sctn;

   if (!dtl.workingSection) {
      $state.go('vaif.master');
   }

   dtl.vaeh.$promise.then(function () {

      self.detailTitle = MessageService.get('global.specifications.instructions');

      self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
      self.detailSubTitle += dtl.workingSection + ' | ' + dtl.workingSectionDescrip;


      // Get the specification data for the selected section
      DataService.get('api/va/asvasection/vasectionspecinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection, function (data) {
         if (data) {
            self.sctn.sectionSpec = data;
            self.sctn.sectionSpec.specdatafield = (data.specdata) ? data.specdata.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
            switch (dtl.workingSectionType.toLowerCase()) {
               case 'in':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendininitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionInternal = data2;
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               case 'ex':                                                                                                                                                             //ignore jslint - correct indentation
               case 'is':                                                                                                                                                             //ignore jslint - correct indentation
               case 'it':                                                                                                                                                             //ignore jslint - correct indentation
                  DataService.get('api/va/asvasection/vasectionextendexinitialize/' + dtl.vaeh.vano + '/' + dtl.vaeh.vasuf + '/' + dtl.workingSection + '/chg', function (data2) {    //ignore jslint - correct indentation
                     if (data2) {
                        self.sctn.sectionExtend = data2;

                        if (self.sctn.sectionExtend.desttype.toLowerCase() === 'f') {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.final.product');
                        } else {
                           self.sctn.sectionExtend.prodTitle = MessageService.get('global.intermediate.product');
                        }
                     }
                  });
                  break;                                                                                                                                                              //ignore jslint - correct indentation
               default: // sp, ii                                                                                                                                                     //ignore jslint - correct indentation
                  break;                                                                                                                                                              //ignore jslint - correct indentation
            }
         }
      });
   });
});

app.controller('VaifDetailLinesCtrl', function ($state, $scope) {
   //lines
   var self = this;
   var dtl = $scope.dtl;

   if (!dtl.workingSection) {
      $state.go('vaif.master');
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('vaif.detail.linedetail', { line: record });
   };

   self.selected = function (e, args) {
      if (args[0]) {
         self.currentRow = args[0].data;
      }
   };

   self.lineComment = function () {
      $state.go('vaif.detail.linecomment', { line: self.currentRow });
   };

   self.lineHistory = function () {
      $state.go('vaif.detail.linehistory', { line: self.currentRow });
   };
   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: currentRow.whse }, { reload: 'icia.detail' });
      }
   };

   self.tiedorderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // Tied Order HyperLink
      if (currentRow && currentRow.orderaltno) {
         if (currentRow.orderalttype.toLowerCase() === 'o') {
            $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 'p') {
            $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 't') {
            $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 'f') {
            $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 'w') {
            $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
         }
      }
   };

   self.backtiedorderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // Tied Order HyperLink
      if (currentRow && currentRow.powtorderaltno) {
         if (currentRow.powtorderalttype.toLowerCase() === 'o') {
            $state.go('oeio.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 'p') {
            $state.go('poip.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 't') {
            $state.go('wtit.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 'f') {
            $state.go('vaif.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 'w') {
            $state.go('kpiw.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         }
      }
   };

});

app.controller('VaifLineExtendCtrl', function ($state, $scope, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var dtl = $scope.dtl;
   self.nonstockVisible = false;

   if ($stateParams.line) {
      self.linerow = $stateParams.line;
      self.linerow.vaassemblyty = '';
      self.linerow.fullDescription = self.linerow.proddesc;
      self.linerow.fullDescription += self.linerow.proddesc2 ? (' - ' + self.linerow.proddesc2) : '';
      // Handle time display - handling strange data that could be in there from previously like 5 digit hours
      self.linerow.hourMinuteDisplay = (self.linerow.hours.toString().length < 3 ? Utils.pad(self.linerow.hours, 3) : self.linerow.hours.toString()) + ':';
      self.linerow.hourMinuteDisplay += (self.linerow.minutes.toString().length < 2 ? Utils.pad(self.linerow.minutes, 2) : self.linerow.minutes.toString());
      self.linerow.timeacttyDisplay = self.linerow.timeactty.toLowerCase() === 'a' ? MessageService.get('global.actual') : MessageService.get('global.estimated');
      if (self.linerow.icspstatus.toLowerCase() === 'l') {
         var params = { whse: dtl.vaeh.whse, prod: self.linerow.shipprod, fillmode: true, fldlist: 'vaassemblyty' };
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
            if (icsp) {
               self.linerow.vaassemblyty = icsp.vaassemblyty;
            }
         });
      }
   } else {
      $state.go('vaif.detail');
   }

   dtl.vaeh.$promise.then(function () {
      self.nonstock = {};
      self.isLoadingFinished = true;
      self.detailTitle = MessageService.get('global.line.detail');
      self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
      self.detailSubTitle += dtl.workingSection + ' | ' + MessageService.get('global.line.number') + ' ' + self.linerow.lineno;

      if ((self.linerow.sctntype.toLowerCase() === 'ii' || self.linerow.sctntype.toLowerCase() === 'in') &&
         self.linerow.nonstockty.toLowerCase() === 'n') {
         self.nonstockVisible = true;
         DataService.post('api/va/asvasetup/vasplinenonstock', { data: self.linerow, busy: true }, function (data) {
            if (data) {
               self.nonstock = data;
            }
         });
      }
   });

});

app.controller('VaifLineHistoryCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var dtl = $scope.dtl;
   self.valinehistresults = [];

   if ($stateParams.line) {
      self.linerow = $stateParams.line;
   } else {
      $state.go('vaif.detail');
   }


   dtl.vaeh.$promise.then(function () {
      self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
      self.detailSubTitle += dtl.workingSection + ' | ' + MessageService.get('global.line.number') + ' ' + self.linerow.lineno;
      var Valinehistcriteria = {
         functionnm: 'vaif',
         lineno: self.linerow.lineno,
         seqno: self.linerow.seqno,
         vano: dtl.vaeh.vano,
         vasuf: dtl.vaeh.vasuf
      };
      DataService.post('api/va/asvaline/valinehistoryretrieve', { data: Valinehistcriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               self.valinehistresults = data.valinehist;
            }

         }
      });
   });

});

app.controller('VaifLineCommentCtrl', function ($scope, $state, $stateParams, MessageService) {
   var self = this;
   var dtl = $scope.dtl;

   if ($stateParams.line) {
      self.linerow = $stateParams.line;
   } else {
      $state.go('vaif.detail');
   }

   self.comType = 'fl' + self.linerow.seqno;

   self.detailSubTitle = dtl.subTitle + ' | ' + MessageService.get('global.sequence.number.poundsign') + ' ';
   self.detailSubTitle += dtl.workingSection + ' | ' + MessageService.get('global.line.number') + ' ' + self.linerow.lineno;

   // The shared comment controller only has a back button
   // Need to redisplay the grid to pick up the change in the comment flag
   self.cancel = function () {
      dtl.refreshLineData();
      $state.go('^');
   };

});

app.controller('VaifDetailWarehouseLogisticsCtrl', function ($scope, $state) {
   var dtl = $scope.dtl;

   if (!dtl) {
      $state.go('vaif.detail');
   }

});