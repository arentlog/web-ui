'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdsw',
      dataPath: 'api/pd/pdsc',
      recordName: 'pdsc',
      searchMethod: 'POST',
      searchPath: '',
      searchResultsField: '',
      resultsRowIdField: 'pdscRowidStr',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whse' }
      ],
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whse' }
      }
   });
});

app.service('PdswService', function ($state, $translate, ConfigService, DataService, UserService, Sasc) {

   this.extendBaseController = function (self) {
      self.sasc = Sasc;
      self.disctype = '';

      self.isCellEditable = function (row) {
         if (row === 8 || self.disctype.toUpperCase() === 'C') {
            return false;
         } else {
            return true;
         }
      };

      self.applyQtyBreak = function (qtyBreak, pdsc) {
         // qtybrk 1-8, prcdisc 1-9
         for (var i = 0; i <= 8; i++) {
            var obj = qtyBreak[i];
            var seqNum = i + 1;
            if (seqNum <= 8) {
               pdsc['qtybrk' + seqNum] = obj.qtybrk;
            }
            pdsc['prcdisc' + seqNum] = obj.prcdisc;
         }
      };

      self.search = function () {
         var criteria = {
            whse: self.criteria.whse,
            recordcountlimit: ConfigService.getDefaultRecordLimit()
         };

         // Load the main grid
         DataService.post('/web/api/pd/pdscwholeorderlist', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (data.ttblpdscwholeorderlist) {
                  self.dataset = data.ttblpdscwholeorderlist;
               }
            }
         });
      }; // search

   };
   this.extendCreateController = function (self, base, pdsc) {
      pdsc.whse = '';
      pdsc.disctype = 'q';
      self.breakOnLabel = $translate.instant('global.quantity');
      self.qtyBreak = [
         { seqno: $translate.instant('number.1'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.2'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.3'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.4'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.5'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.6'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.7'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.8'), qtybrk: 0, prcdisc: 0 },
         { seqno: $translate.instant('number.9'), qtybrk: '', prcdisc: 0 }
      ];

      self.customSubmit = function () {
         base.applyQtyBreak(self.qtyBreak, pdsc);
         self.submit();
      };
      self.setBreakOnLabel = function () {
         if (pdsc.disctype.toUpperCase() === 'D') {
            self.breakOnLabel = $translate.instant('global.amount');
         }
         else {
            self.breakOnLabel = $translate.instant('global.quantity');
         }
      };
   };

   this.extendDetailController = function (self, base, pdsc) {
      pdsc.$promise.then(function () {
         base.disctype = pdsc.disctype;
         self.setBreakOnLabel();
         self.qtyBreak = [
            { seqno: $translate.instant('number.1'), qtybrk: pdsc.qtybrk1, prcdisc: pdsc.prcdisc1 },
            { seqno: $translate.instant('number.2'), qtybrk: pdsc.qtybrk2, prcdisc: pdsc.prcdisc2 },
            { seqno: $translate.instant('number.3'), qtybrk: pdsc.qtybrk3, prcdisc: pdsc.prcdisc3 },
            { seqno: $translate.instant('number.4'), qtybrk: pdsc.qtybrk4, prcdisc: pdsc.prcdisc4 },
            { seqno: $translate.instant('number.5'), qtybrk: pdsc.qtybrk5, prcdisc: pdsc.prcdisc5 },
            { seqno: $translate.instant('number.6'), qtybrk: pdsc.qtybrk6, prcdisc: pdsc.prcdisc6 },
            { seqno: $translate.instant('number.7'), qtybrk: pdsc.qtybrk7, prcdisc: pdsc.prcdisc7 },
            { seqno: $translate.instant('number.8'), qtybrk: pdsc.qtybrk8, prcdisc: pdsc.prcdisc8 },
            { seqno: $translate.instant('number.9'), qtybrk: '', prcdisc: pdsc.prcdisc9 }
         ];
      });
      self.customSubmit = function () {
         base.applyQtyBreak(self.qtyBreak, pdsc);
         self.submit();
      };
      self.setBreakOnLabel = function () {
         base.disctype = pdsc.disctype;
         if (pdsc.disctype.toUpperCase() === 'D') {
            self.breakOnLabel = $translate.instant('global.amount');
         }
         else {
            self.breakOnLabel = $translate.instant('global.quantity');
         }
      };

   };
});
