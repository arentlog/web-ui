'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdss',
      dataPath: 'api/pd/pdss',
      resultsRowIdField: 'pdssRowidStr', //WebHandler call requires Rowid as a String.
      recordName: 'pdss',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whse' },
         { label: 'global.customer.price.type', value: 'custptype' },
         { label: 'global.product.price.type', value: 'pricetype' }
      ],
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whse' },
         description: [
            { label: 'global.customer.price.type', value: 'custptype' },
            { label: 'global.product.price.type', value: 'pricetype' },
            { label: 'global.begin.date', valueFunction: 'base.formatDate' }
         ]
      }
   });
});

app.service('PdssService', function ($state, $translate, ConfigService, DataService, MessageService, UserService, Utils, Sasoo, Sasc) {

   //This function overrides the standard Search with our custom version.
   this.search = function (self, criteria, scope, callback) {
      var requestCriteria = {
         whse: criteria.whse,
         custptype: criteria.custptype,
         pricetype: criteria.pricetype,
         startdt: criteria.startdt,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      DataService.post('/web/api/pd/pdssgetlist', { data: requestCriteria, busy: true }, function (data) {
         if (data && data.ttblpdssresults) {
            callback(data.ttblpdssresults);
         } else {
            //Important so we don't get residual data from previous searches if no records are returned.
            callback([]);
         }
      });
   };

   this.extendBaseController = function (self) {
      self.sasc = Sasc;
      if (!self.sasc.pdspecialfl) {
         MessageService.alert('global.alert', 'global.admin.options.not.setup.for.this.function');
      }
      // Format function for date in recently visited display
      self.formatDate = function (pdss) {
         var displayDate = Utils.formatDate(pdss.startdt);
         return displayDate;
      };
      self.isCellEditable = function (row) {
         if (row === 8) {
            return false;
         } else {
            return true;
         }
      };
      self.applyQtyBreak = function (qtyBreak, pdss) {
         // qtybrk 1-8, prcdisc 1-9
         for (var i = 0; i <= 8; i++) {
            var obj = qtyBreak[i];
            var seqNum = i + 1;
            if (seqNum <= 8) {
               pdss['qtybrk' + seqNum] = obj.qtybrk;
            }
            pdss['prcdisc' + seqNum] = obj.prcdisc;
         }
      };
   };
   this.extendCreateController = function (self, base, pdss) {
      pdss.whse = '';
      pdss.custptype = '';
      pdss.statustype = true;
      pdss.disctype = false;
      self.breakOnLabel = MessageService.get('global.quantity');
      self.qtyBreak = [
         { seqno: MessageService.get('number.1'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.2'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.3'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.4'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.5'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.6'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.7'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.8'), qtybrk: 0, prcdisc: 0 },
         { seqno: MessageService.get('number.9'), qtybrk: '', prcdisc: 0 }
      ];

      self.customSubmit = function () {
         base.applyQtyBreak(self.qtyBreak, pdss);
         self.submit();
      };
      self.setBreakOnLabel = function () {
         if (pdss.disctype) {
            self.breakOnLabel = MessageService.get('global.amount');
         } else {
            self.breakOnLabel = MessageService.get('global.quantity');
         }
      };
   };

   this.extendDetailController = function (self, base, pdss) {
      pdss.$promise.then(function () {
         self.setBreakOnLabel();
         self.qtyBreak = [
            { seqno: MessageService.get('number.1'), qtybrk: pdss.qtybrk1, prcdisc: pdss.prcdisc1 },
            { seqno: MessageService.get('number.2'), qtybrk: pdss.qtybrk2, prcdisc: pdss.prcdisc2 },
            { seqno: MessageService.get('number.3'), qtybrk: pdss.qtybrk3, prcdisc: pdss.prcdisc3 },
            { seqno: MessageService.get('number.4'), qtybrk: pdss.qtybrk4, prcdisc: pdss.prcdisc4 },
            { seqno: MessageService.get('number.5'), qtybrk: pdss.qtybrk5, prcdisc: pdss.prcdisc5 },
            { seqno: MessageService.get('number.6'), qtybrk: pdss.qtybrk6, prcdisc: pdss.prcdisc6 },
            { seqno: MessageService.get('number.7'), qtybrk: pdss.qtybrk7, prcdisc: pdss.prcdisc7 },
            { seqno: MessageService.get('number.8'), qtybrk: pdss.qtybrk8, prcdisc: pdss.prcdisc8 },
            { seqno: MessageService.get('number.9'), qtybrk: '', prcdisc: pdss.prcdisc9 }
         ];
      });
      self.customSubmit = function () {
         base.applyQtyBreak(self.qtyBreak, pdss);
         self.submit();
         base.search();
      };
      self.setBreakOnLabel = function () {
         if (pdss.disctype) {
            self.breakOnLabel = MessageService.get('global.amount');
         } else {
            self.breakOnLabel = MessageService.get('global.quantity');
         }
      };
   };
});