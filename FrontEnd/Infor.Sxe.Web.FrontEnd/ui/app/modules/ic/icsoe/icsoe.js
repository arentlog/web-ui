'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsoe',
      recordName: 'icsoesetup',
      dataPath: 'api/ic/icsoe',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/geticsoelist',
      searchResultsField: 'icsoesetup',
      searchRecordLimitField: 'recordcountlimit',
      resultsRowIdField: 'icsoerowid',
      recordRowIdField: 'icsoerowid',
      primaryKeyParams: ['custno'],
      detailSubTitle: [
         {label: 'global.customer.number', value: 'custno'}
      ],
      recentlyVisited: {
         title: { label: 'global.customer.number', value: 'custno' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });
});

app.service('IcsoeService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils) {

   var holdTaxMethodType = AodataService.getValue('TAX', 'taxmethodty').toUpperCase();

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the icsoe table off selected Grid Record/Recently Visited
      var criteria = {
         icsoerowid: stateParams.id
      };

      return DataService.getResource('api/ic/asicsetup/icsoeload', { data: criteria, method: 'POST', busy: true });

   };


   this.createRecord = function (self, base, icsoesetup, scope, callback) {

      var icsoeList = {
         custno: icsoesetup.custno,
         shipto: icsoesetup.shipto,
         prod: icsoesetup.prod,
         startdt: icsoesetup.startdt,
         enddt: icsoesetup.enddt,
         addonno: icsoesetup.addonno,
         state: icsoesetup.state,
         certificate: icsoesetup.certificate,
         user1: icsoesetup.user1,
         user2: icsoesetup.user2,
         user3: icsoesetup.user3,
         user4: icsoesetup.user4,
         user5: icsoesetup.user5,
         user6: parseFloat(icsoesetup.user6),
         user7: parseFloat(icsoesetup.user7),
         user8: new Date(icsoesetup.user8),
         user9: new Date(icsoesetup.user9)
      };

      DataService.post('api/ic/asicsetup/icsoecreate', { data: icsoeList, busy: true }, function (data) {
         if (data) {
            // Load the returned record into CallBack to load the icsoe.rowid (new record)
            callback(data);
         }
      });
   };


   this.updateRecord = function (self, base, icsoesetup, scope, callback) {

      var record = icsoesetup;

      var icsoeList = {
         arsrcrowpointer: icsoesetup.arsrcrowpointer,
         state: icsoesetup.state,
         addonno: icsoesetup.addonno,
         icsrcrowpointer: icsoesetup.icsrcrowpointer,
         startdt: icsoesetup.startdt,
         enddt: icsoesetup.enddt,
         certificate: icsoesetup.certificate,
         user1: icsoesetup.user1,
         user2: icsoesetup.user2,
         user3: icsoesetup.user3,
         user4: icsoesetup.user4,
         user5: icsoesetup.user5,
         user6: parseFloat(icsoesetup.user6),
         user7: parseFloat(icsoesetup.user7),
         user8: new Date(icsoesetup.user8),
         user9: new Date(icsoesetup.user9)
      };

      DataService.post('api/ic/asicsetup/icsoesave', { data: icsoeList, busy: true }, function () {
         callback(record);
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var icsoeList = [];

      // Process one Row at a Time
      records.forEach(function (record) {

         icsoeList.push(record);

      });

      DataService.post('api/ic/asicsetup/icsoedelete', { data: icsoeList, busy: true }, function () {
         callback();
      });

   };

   this.deleteRecord = function (self, base, record, scope, callback) {

      var icsoeList = [];

      icsoeList.push(record);

      DataService.post('api/ic/asicsetup/icsoedelete', { data: icsoeList, busy: true }, function () {
         callback();
      });

   };


   this.extendMasterController = function (self, base, scope) {

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

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'prod', label: MessageService.get('global.product') },
         { value: 'enddt', label: MessageService.get('global.to.end.date') },
         { value: 'startdt', label: MessageService.get('global.start.date') },
         { value: 'custno', label: MessageService.get('global.customer.number') },
         { value: 'shipto', label: MessageService.get('global.ship.to') },
         { value: 'addonno', label: MessageService.get('global.addon.number') },
         { value: 'state', label: MessageService.get('global.state') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];


      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['custno', 'shipto', 'state', 'addonno'];

      // Advanced search and update data set for the grid
      self.search = function () {

         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/asicsetup/geticsoelist', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.icsoesetup;

               if (data.lMoreRecords) {
                  MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
               }
            }

         });
      };

   };


   this.extendBaseController = function (self) {

      // Column Label - loaded off Tax Method
      if (holdTaxMethodType === 'G') {
         self.stateLabel = MessageService.get('global.province');
      } else {
         self.stateLabel = MessageService.get('global.state');
      }

      // Format function for record Description data in recently visited display
      self.formatSubData = function (icsoesetup) {

         var recentSubTitle = '';
         var previousLoaded;

         if (icsoesetup.shipto) {
            recentSubTitle = $translate.instant('global.ship.to') + ': ' + icsoesetup.shipto;
         }

         if (icsoesetup.state) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + self.stateLabel + ': ' + icsoesetup.statedesc;
            } else {
               recentSubTitle = self.stateLabel + ': ' + icsoesetup.statedesc;
            }
         }

         if (icsoesetup.addonno) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + $translate.instant('global.addon.number') + ': ' + icsoesetup.addondesc;
            } else {
               recentSubTitle = $translate.instant('global.addon.number') + ': ' + icsoesetup.addondesc;
            }
         }

         if (icsoesetup.prod) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + $translate.instant('global.product') + ': ' + icsoesetup.prod;
            } else {
               recentSubTitle = $translate.instant('global.product') + ': ' + icsoesetup.prod;
            }
         }

         if (icsoesetup.startdt) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + $translate.instant('global.start.date') + ': ' + Utils.formatDate(icsoesetup.startdt);
            } else {
               recentSubTitle = $translate.instant('global.start.date') + ': ' + Utils.formatDate(icsoesetup.startdt);
            }
         }

         return recentSubTitle;
      };
   };

});
