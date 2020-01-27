'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ap', 'apema', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('ap', 'apema');

   $stateProvider.state('apema.master.exchangeRate', {
      url: '/exchange-rate',
      params: { currencyty: null, callback: null },
      views: {
         subMaster: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/shared/exchange-rate/exchange-rate.json');
            },
            controller: 'ApExchangeRateCtrl as exch'
         }
      }
   });

   $stateProvider.state('apema.apply', {
      url: '/apply',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apema/apply.json');
            },
            controller: 'ApemaApplyCtrl as apl'
         }
      }
   });

   $stateProvider.state('apema.update', {
      url: '/update',
      params: { updateParams: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apema/update.json');
            },
            controller: 'ApemaUpdateCtrl as upd'
         }
      }
   });
});

app.controller('ApemaBaseCtrl', function ($state, DataService, Utils, Sasc) {
   var self = this;

   self.criteria = { postDate: Utils.getCurrentDate() };
   self.isGLDivSet = Sasc.gldivfl;
   self.lastVendor = 0;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'apema',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ap',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.exchangeRateCallback = function (continuefl) {
      // No callback processing necessary here
   };

   self.isMaster = function () {
      return $state.is('apema.master');
   };

   self.includesMaster = function () {
      return $state.includes('apema.master');
   };

   /**
    * Initialize datasets, totals and proof
    */
   self.initialize = function () {
      self.totCredits = 0;
      self.totInvoices = 0;
      self.proof = 0;
      self.datasetCredits = [];
      self.datasetInvoices = [];
   };

   self.loadExchangeRate = function () {
      $state.go('apema.master.exchangeRate', { currencyty: self.criteria.currencyty, callback: 'base.exchangeRateCallback' });
   };

   /**
    * Perform search and update data set for the grid
    */
   self.search = function () {

      if (self.criteria.vendorNumber) {

         // Load balance information from APSV
         if (self.criteria.vendorNumber !== self.lastVendor) {
            var params = {
               vendno: self.criteria.vendorNumber,
               fldlist: 'currbal,currencyty'
            };

            DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.lastVendor = self.criteria.vendorNumber;
                  self.criteria.currbal = data.currbal;
                  self.criteria.currencyty = data.currencyty;

                  // If foreign currency vendor show the exchange rate view
                  if (self.criteria.currencyty) {
                     self.loadExchangeRate();
                  }
               }
            });
         }

         var criteria = {
            dVendno: self.criteria.vendorNumber,
            dPostdt: self.criteria.postDate
         };

         // Load the list of credits (perhaps while displaying the foreign exchange rate view)
         DataService.post('api/ap/asapentry/apemagetcredits', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.datasetCredits = data;
            }
         });

         // When starting a new search, also clear out the Invoices list
         self.datasetInvoices = [];
      }
   };

   self.initialize();
});

app.controller('ApemaSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   /**
    * Clear search view and reset
    */
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.postDate = Utils.getCurrentDate();
      base.lastVendor = 0;

      // Initialize datasets, totals and proof
      base.initialize();

      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('apema.master');
      }
   };

   /**
    * Post date cannot be blank - Reset to current date when cleared
    */
   self.postDateChanged = function () {
      if (!criteria.postDate) {
         criteria.postDate = Utils.getCurrentDate();
      }
   };

   /**
    * Perform search
    */
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('apema.master');
      }

      base.search();
   };
});

app.controller('ApemaMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService) {
   var self = this;
   var base = $scope.base;

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return false;
      } else {
         return true;
      }
   };

   /**
    * Update the selected credits and proof totals when rows are selected/unselected
    */
   self.rowSelected = function () {
      var records = GridService.getSelectedRecords(base.grid);
      base.totCredits = 0;

      records.forEach(function (record) {
         base.totCredits += record.damount;
      });
      base.totCredits = Math.abs(base.totCredits);
      base.proof = base.totCredits - base.totInvoices;
   };

   /**
    * Submit button processing
    */
   self.submit = function () {

      // If no open journal, first direct user to open a journal
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            // Proceed with submission after successful journal open
            self.submit();
         });
      } else {
         var selectedCredits = GridService.getSelectedRecords(base.grid);
         var selectedInvoices = [];

         // Set the lselected flag for each selected Credit
         selectedCredits.forEach(function (credit) {
            credit.lselected = true;
         });

         base.datasetInvoices.forEach(function (invoice) {
            if (invoice.dapplyamt) {
               selectedInvoices.push(invoice);
            }
         });

         var criteria = {
            apemacredits: selectedCredits,
            apemainvoices: selectedInvoices,
            dVendno: base.criteria.vendorNumber,
            dPostdt: base.criteria.postDate,
            iJrnlno: base.journal.gJrnlno
         };

         DataService.post('api/ap/asapentry/apemapreupdate', { data: criteria, busy: true }, function (data) {
            if (data) {
               var updateParams = {
                  isDivNumberEnabled: base.isGLDivSet && data.proof !== 0,
                  isReferenceNumberEnabled: data.proof !== 0,
                  apemaUpdate: data,
                  credits: selectedCredits,
                  invoices: selectedInvoices
               };
               $state.go('^.update', { updateParams: updateParams });
            }
         });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('ApemaApplyCtrl', function ($scope, $state, DataService, Utils, MessageService) {
   var self = this;
   var base = $scope.base;

   self.totCredits = base.totCredits;
   self.totInvoices = base.totInvoices;
   self.proof = base.proof;

   /**
    * Load the Invoices list
    */
   function getInvoiceList() {
      var criteria = {
         dVendno: base.criteria.vendorNumber,
         dPostdt: base.criteria.postDate
      };

      DataService.post('api/ap/asapentry/apemagetinvoices', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.datasetInvoices = data;
            self.applyInvoices = angular.copy(base.datasetInvoices);
         }
      });
   }

   /**
    * Apply Amount change processing
    */
   self.onCellChange = function (e, args) {

      // If the apply amount has changed, update the totals and proof amount
      self.totInvoices -= args.oldValue;
      self.totInvoices += args.value;
      self.proof = self.totCredits - self.totInvoices;

      var record = self.applyInvoices[args.row];

      // Show error and back out change when over applying
      if (record && args.value > record.damount) {
         MessageService.info('global.error', 'error.must.be.less.than.or.equal.to.sch.payment.amount.');

         //TODO: cm; Replace when cell validation is added to control
         self.grid.updateCell(args.row, args.cell, args.oldValue);
      }
   };

   self.submit = function () {
      Utils.replaceObject(base.datasetInvoices, self.applyInvoices);

      base.totInvoices = self.totInvoices;
      base.proof = self.proof;

      $state.go('^.master');
   };

   // Only build the invoice list once or applied amounts will be lost
   if (base.datasetInvoices.length) {
      // Use a copy of the base Invoice list so changes can be undone
      self.applyInvoices = angular.copy(base.datasetInvoices);
   } else {
      getInvoiceList();
   }
});

app.controller('ApemaUpdateCtrl', function ($scope, $state, $stateParams, DataService, UtilsData) {
   var self = this;
   var base = $scope.base;

   self.params = $stateParams.updateParams;
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ap', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   /**
    * Final update to apply misc credits to invoices
    */
   self.submit = function () {
      var criteria = {
         apemacredits: self.params.credits,
         apemainvoices: self.params.invoices,
         apemaupdate: self.params.apemaUpdate
      };

      DataService.post('api/ap/asapentry/apemaupdate', { data: criteria, busy: true }, function () {
         $state.go('^.master');
         base.initialize();
         base.search();
      });
   };
});
