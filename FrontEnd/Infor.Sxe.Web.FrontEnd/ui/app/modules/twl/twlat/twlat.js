'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlat',
      dataPath: 'api/twl/stntbl',
      searchMethod: 'POST',
      searchPath: 'api/twl/astwladmin/getstationlist',
      searchResultsField: 'stationresults',
      resultsRowIdField: 'stntblRowid',
      createStateView: 'twl/twlat/create.json',
      postCreateState: '^.detail.edit',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.station', value: 'stnNum' }
      ],
      recentlyVisited: {
         title: { label: 'global.station', value: 'stnNum' },
         description: { label: 'global.warehouse', value: 'whNum' }
      }
   });
});

app.service('TwlatService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };

   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);
         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twlat) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlat.coNum = base.criteriaUsed.coNum;
      twlat.whNum = base.criteriaUsed.whNum;

      twlat.rowStatus = true;
      twlat.stnNum = '';
      twlat.stnType = 'R';
      twlat.labelPrinter = 'zebra';
      twlat.labelQueue = '';
      twlat.linePrinter = 'standard';
      twlat.lineQueue = '';
      twlat.lastLogin = '';
      twlat.lastLogout = '';
      twlat.lastEmpNum = '';
      twlat.lastPid = '';
   };

   this.extendDetailController = function (self, base, twlat) {
      twlat.$promise.then(function () {

         self.labelQueueList = [];
         self.reportQueueList = [];
         self.labelTempList = [];
         self.reportTempList = [];

         self.bindPrinterTypes = function () {

            var queueRecord = {
               value: '',
               label: ''
            };
            // Add blank value to both label and report printer queue
            self.reportTempList.push('');
            self.reportQueueList.push(queueRecord);
            self.labelTempList.push('');
            self.labelQueueList.push(queueRecord);

            var printerCriteria = {
               coNum: twlat.coNum,
               whNum: twlat.whNum
            };
            DataService.post('api/twl/printmst/gettwlprinters', { data: printerCriteria, busy: true }, function (data) {
               if (data) {

                  data.forEach(function (printer) {
                     // Active printers only - Add to appropriate drop down: report or label
                     if (printer.rowStatus) {
                        var printQueue = printer.printer.substr(0, 15);
                        queueRecord = {
                           value: printQueue,
                           label: printQueue
                        };
                        if (printer.type) {
                           if (self.reportTempList.indexOf(printQueue) < 0) {
                              self.reportTempList.push(printQueue);
                              self.reportQueueList.push(queueRecord);
                           }
                        } else {
                           if (self.labelTempList.indexOf(printQueue) < 0) {
                              self.labelTempList.push(printQueue);
                              self.labelQueueList.push(queueRecord);
                           }
                        }
                     }
                  });
               }
            });
         };
         self.bindPrinterTypes();
      });
   };

});