'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlau',
      dataPath: 'api/twl/udcfg',
      searchMethod: 'POST',
      searchPath: 'api/twl/astwlsetup/getuserspecific',
      searchResultsField: 'userspecificresults',
      searchCriteria: { udcLevel: 0, udcType: 'question' },
      resultsRowIdField: 'udcfgrowid',
      recentlyVisited: null
   });
});

// Note: Record Count Limit intentionally left off.  For Defaults (metadata) there are currently about 650 records in the
// database and will need to return all in order for the user to copy all.
// There will always be fewer Company-Warehouse and User Specific records.
app.service('TwlauService', function ($state, $translate, DataService, GridService, MessageService, UserService, Utils) {
   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.userId = UserService.getTwlUserId();

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };
   };
   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);
         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
         base.criteria.udcLevel = 0;
         base.criteria.udcType = 'question';
      };
   };
   this.extendMasterController = function (self, base) {
      self.copyDefaults = function () {
         var records = GridService.getSelectedRecords(base.grid);
         // Proceed if any rows are selected
         if (records && records.length) {
            var copyDefaultList = [];
            records.forEach(function (record) {
               copyDefaultList.push({
                  coNum: base.criteriaUsed.coNum,
                  whNum: base.criteriaUsed.whNum,
                  sysName: record.sysName,
                  udcType: record.udcType,
                  udcId: record.udcId
               });
            });
            DataService.post('api/twl/astwlsetup/userspecificcopy', { data: copyDefaultList, busy: true }, function (data) {
               if (data) {
                  MessageService.info('global.alert', data);
               } else {
                  MessageService.info('global.information', 'global.copy.completed.successfully');
               }
            });
         }
      };
   };
   this.extendDetailController = function (self, base, udcfg) {
      self.getSubTitle = function () {
         switch (base.criteriaUsed.udcLevel) {
         case 0:
            return $translate.instant('global.default');
         case 1:
            return $translate.instant('global.company.warehouse');
         case 2:
            return $translate.instant('global.company.warehouse.user');
         default:
            return '';
         }
      };

      self.userSpecificChanged = function () {
         // Setting to User Specific
         if (udcfg.userSpecificfl && udcfg.autoRespfl) {
            MessageService.yesNo('global.question', 'question.this.will.disable.auto.fill',
            function () {
               // Yes processing
               udcfg.autoRespfl = false;
            }, function () {
               // No processing
               udcfg.userSpecificfl = false;
            });
         }
         else if (!udcfg.userSpecificfl) {
            MessageService.yesNo('global.question', 'question.user.specific.level.values.will.be.deleted',
            function () {
               // Yes processing - delete will occur in ud_cfgTransactionLogic
            }, function () {
               // No processing
               udcfg.userSpecificfl = true;
            });
         }
      };
   };
});