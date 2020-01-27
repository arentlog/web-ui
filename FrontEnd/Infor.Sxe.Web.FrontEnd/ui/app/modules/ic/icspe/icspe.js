'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icspe',
      recordName: 'icspesetup',
      dataPath: 'api/ic/icspe',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/geticspelist',
      searchResultsField: 'icspesetup',
      searchRecordLimitField: 'recordcountlimit',
      resultsRowIdField: 'icsperowid',
      recordRowIdField: 'icsperowid',
      primaryKeyParams: ['prod'],
      detailSubTitle: [
         {label: 'global.product', value: 'prod'}
      ],
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });
});

app.service('IcspeService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils) {

   var holdTaxMethodType = AodataService.getValue('TAX', 'taxmethodty').toUpperCase();

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the table off selected Grid Record/Recently Visited
      var criteria = {
         icsperowid: stateParams.id
      };

      return DataService.getResource('api/ic/asicsetup/icspeload', { data: criteria, method: 'POST', busy: true });

   };


   this.createRecord = function (self, base, icspesetup, scope, callback) {

      var icspeList = {
         prod: icspesetup.prod,
         state: icspesetup.state,
         startdt: icspesetup.startdt,
         enddt: icspesetup.enddt,
         addonno: icspesetup.addonno,
         amount: icspesetup.amount,
         ehftype: icspesetup.ehftype,
         user1: icspesetup.user1,
         user2: icspesetup.user2,
         user3: icspesetup.user3,
         user4: icspesetup.user4,
         user5: icspesetup.user5,
         user6: parseFloat(icspesetup.user6),
         user7: parseFloat(icspesetup.user7),
         user8: new Date(icspesetup.user8),
         user9: new Date(icspesetup.user9)
      };

      DataService.post('api/ic/asicsetup/icspecreate', { data: icspeList, busy: true }, function (data) {
         if (data) {
            // Load the returned record into CallBack to load the icspe.rowid (new record)
            callback(data);
         }
      });
   };


   this.updateRecord = function (self, base, icspesetup, scope, callback) {

      var record = icspesetup;

      var icspeList = {
         icsperowid: icspesetup.icsperowid,
         srcrowpointer: icspesetup.srcrowpointer,
         prod: icspesetup.prod,
         state: icspesetup.state,
         startdt: icspesetup.startdt,
         enddt: icspesetup.enddt,
         addonno: icspesetup.addonno,
         amount: icspesetup.amount,
         ehftype: icspesetup.ehftype,
         user1: icspesetup.user1,
         user2: icspesetup.user2,
         user3: icspesetup.user3,
         user4: icspesetup.user4,
         user5: icspesetup.user5,
         user6: parseFloat(icspesetup.user6),
         user7: parseFloat(icspesetup.user7),
         user8: new Date(icspesetup.user8),
         user9: new Date(icspesetup.user9)
      };

      DataService.post('api/ic/asicsetup/icspesave', { data: icspeList, busy: true }, function () {
         callback(record);
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var icspeList = [];

      // Process one Row at a Time
      records.forEach(function (record) {

         icspeList.push(record);

      });

      DataService.post('api/ic/asicsetup/icspedelete', { data: icspeList, busy: true }, function () {
         callback('ok');
      });

   };

   this.deleteRecord = function (self, base, record, scope, callback) {

      var icspeList = [];

      icspeList.push(record);

      DataService.post('api/ic/asicsetup/icspedelete', { data: icspeList, busy: true }, function () {
         callback('ok');
      });

   };


   this.extendBaseController = function (self) {

      // Column Label - loaded off Tax Method
      if (holdTaxMethodType === 'G') {
         self.stateLabel = MessageService.get('global.province');
      } else {
         self.stateLabel = MessageService.get('global.state');
      }

      // Format function for record Description data in recently visited display
      self.formatSubData = function (icspesetup) {

         var recentSubTitle = '';
         var previousLoaded;

         if (icspesetup.state) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + self.stateLabel + ': ' + icspesetup.statedesc;
            } else {
               recentSubTitle = self.stateLabel + ': ' + icspesetup.statedesc;
            }
         }

         if (icspesetup.startdt) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + $translate.instant('global.start.date') + ': ' + Utils.formatDate(icspesetup.startdt);
            } else {
               recentSubTitle = $translate.instant('global.start.date') + ': ' + Utils.formatDate(icspesetup.startdt);
            }
         }

         return recentSubTitle;
      };

   };

   this.extendMasterController = function (self, base, scope) {

      // ICIP Hyperlink - product/whse
      self.productInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.prod > '') {
            $state.go('icip.detail', { pk: currentRow.prod});
         }
      };
   };

   this.extendDetailController = function (self, base, icspesetup, scope) {

      self.icspesetup.$promise.then(function () {
         self.perUnitLabel = $translate.instant('global.per') + ' ' + self.icspesetup.unit;
      });
   };


   this.extendCreateController = function (self, base, icspesetup, scope) {

      self.icspesetup.state = '';
      self.icspesetup.addonno = 0;

      // Per Unit off ICSP or ICSC records when Changed
      self.loadUnit = function (icspesetup) {

         var params;

         self.icspesetup.unit = '';
         self.perUnitLabel = '';

         params = {
            prod: self.icspesetup.prod,
            fldlist: 'unitstock'
         };

         DataService.get('api/ic/icsp/getbypk', { params: params }, function (data) {
            if (data) {
               self.icspesetup.unit = data.unitstock;
               self.perUnitLabel = $translate.instant('global.per') + ' ' + self.icspesetup.unit;
            } else {
               params = {
                  catalog: self.icspesetup.prod,
                  fldlist: 'unitstock'
               };

               DataService.get('api/ic/icsc/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.icspesetup.unit = data.unitstock;
                     self.perUnitLabel = $translate.instant('global.per') + ' ' + self.icspesetup.unit;
                  }
               });
            }
         });
      };
   };


});

