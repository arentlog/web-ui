'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsef',
      dataPath: 'api/ic/icsef',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsefretrieve',
      searchResultsField: '',
      resultsRowIdField: 'icsefrowid',
      searchCriteria: { availfl: true },
      searchRecordLimitField: 'recordlimit',
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: [
            { label: 'global.warehouse', value: 'whse' },
            { label: 'global.receipt', valueFunction: 'base.formatDate' },
            { label: 'global.sequence.number', value: 'seqno' }
         ]
      }
   });
});

app.service('IcsefService', function ($state, $translate, DataService, MessageService, UserService, Utils, Sasoo, Sasc) {

   this.extendBaseController = function (self) {
      // Format function for date in recently visited display
      self.formatDate = function (icsef) {
         var displayDate = Utils.formatDate(icsef.receiptdt);
         return displayDate;
      }
   }
   this.extendDetailController = function (self, base, icsef, scope) {
      self.sasoo = Sasoo;
      self.sasc = Sasc;
      self.getSubTitle = function () {
         var subTitleText;
         subTitleText = self.icsef.prod + ' | ' + self.icsef.whse + ' | ' +
                        Utils.formatDate(self.icsef.receiptdt) + ' | ' + self.icsef.seqno;
         return subTitleText;
      };
   };
});