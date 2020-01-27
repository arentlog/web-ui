'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsp',
      dataPath: 'api/ar/arsp',
      searchMethod: 'POST',
      searchPath: 'api/ar/arsp/lookup',
      searchRecordLimitField: 'recordlimit',
      resultsRowIdField: 'rowidArsp',
      copyStateView: 'ar/arsp/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ar/asarsetup/arspcustpaymenthistorycopy',
      recentlyVisited: {
         title: { label: 'global.customer.number', value: 'custno' },
      }
   });
});

app.service('ArspService', function ($timeout, MessageService, Utils, DataService, Sasoo, Sasc) {

   this.extendBaseController = function (self) {
      self.sasc = Sasc;

      self.isCellEditable = function (row, cell, value, column, item) {
         if (row === 12) {
            return false;
         } else {
            return true;
         }
      };

      self.calculateTotals = function (ctrl, paymentHistory) {
         var avg = paymentHistory[12];
         var divcount = 0;
         avg.per1bal = 0;
         avg.per2bal = 0;
         avg.per3bal = 0;
         avg.per4bal = 0;
         avg.per5bal = 0;
         avg.servbal = 0;
         avg.credbal = 0;
         avg.ttl = 0;

         for (var i = 0; i <= 11; i++) {

            var obj = paymentHistory[i];

            obj.ttl = obj.per1bal + obj.per2bal + obj.per3bal + obj.per4bal + obj.per5bal + obj.servbal + obj.credbal;

            avg.per1bal += obj.per1bal || 0;
            avg.per2bal += obj.per2bal || 0;
            avg.per3bal += obj.per3bal || 0;
            avg.per4bal += obj.per4bal || 0;
            avg.per5bal += obj.per5bal || 0;
            avg.servbal += obj.servbal || 0;
            avg.credbal += obj.credbal || 0;
            avg.ttl += obj.ttl || 0;

            if (obj.ttl) {
               divcount += 1;
            } else {
               divcount += 0;
            }

           ctrl.paymentHistoryGrid.updateRow(i);

         }

         if (self.sasc.arrollcd.toUpperCase() === 'N') {
            avg.per1bal = divcount !== 0 ? Math.round(avg.per1bal / divcount) : 0;
            avg.per2bal = divcount !== 0 ? Math.round(avg.per2bal / divcount) : 0;
            avg.per3bal = divcount !== 0 ? Math.round(avg.per3bal / divcount) : 0;
            avg.per4bal = divcount !== 0 ? Math.round(avg.per4bal / divcount) : 0;
            avg.per5bal = divcount !== 0 ? Math.round(avg.per5bal / divcount) : 0;
            avg.servbal = divcount !== 0 ? Math.round(avg.servbal / divcount) : 0;
            avg.credbal = divcount !== 0 ? Math.round(avg.credbal / divcount) : 0;
            avg.ttl = divcount !== 0 ? Math.round(avg.ttl / divcount) : 0;

         } else {
            avg.per1bal = divcount !== 0 ? Math.round(avg.per1bal / divcount) : 0;
            avg.per2bal = divcount !== 0 ? Math.round(avg.per2bal / divcount) : 0;
            avg.per3bal = divcount !== 0 ? Math.round(avg.per3bal / divcount) : 0;
            avg.per4bal = divcount !== 0 ? Math.round(avg.per4bal / divcount) : 0;
            avg.per5bal = divcount !== 0 ? Math.round(avg.per5bal / divcount) : 0;

            if (self.sasc.arrollcd.toUpperCase() === 'B') {
               avg.ttl = divcount !== 0 ? Math.round(avg.ttl / divcount) : 0;

            } else if (self.sasc.arrollcd.toUpperCase() === 'M') {
               avg.servbal = divcount !== 0 ? Math.round(avg.servbal / divcount) : 0;
               avg.ttl = divcount !== 0 ? Math.round(avg.ttl / divcount) : 0;

            } else if (self.sasc.arrollcd.toUpperCase() === 'S') {
               avg.credbal = divcount !== 0 ? Math.round(avg.credbal / divcount) : 0;
               avg.ttl = divcount !== 0 ? Math.round(avg.ttl / divcount) : 0;
            }
         }

         ctrl.paymentHistoryGrid.updateRow(12);
      };

      self.applyPaymentHistory = function (paymentHistory, arsp) {

         for (var i = 0; i <= 11; i++) {
            var obj = paymentHistory[i];
            var monthNum = i + 1;
            arsp['per1bal' + monthNum] = obj.per1bal;
            arsp['per2bal' + monthNum] = obj.per2bal;
            arsp['per3bal' + monthNum] = obj.per3bal;
            arsp['per4bal' + monthNum] = obj.per4bal;
            arsp['per5bal' + monthNum] = obj.per5bal;
            arsp['servbal' + monthNum] = obj.servbal;
            arsp['credbal' + monthNum] = obj.credbal;

         }
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.getSubTitle = function () {
         return MessageService.get('global.customer.number') + ': ' + stateParams.object.custno;
      };

      request.tocustno = stateParams.object.custno;
      request.fromcustno = stateParams.object.custno;
   };

   this.extendCreateController = function (self, base, arsp) {

      self.per1bal = 0;
      self.per2bal = 0;
      self.per3bal = 0;
      self.per4bal = 0;
      self.per5bal = 0;
      self.servbal = 0;
      self.credbal = 0;
      self.ttl = 0;

      self.paymentHistory = [
         { month: MessageService.get('global.january'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.february'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.march'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.april'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.may'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.june'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.july'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.august'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.september'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.october'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.november'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.december'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 },
         { month: MessageService.get('global.average'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0 }
      ];

      self.calculateTotals = function () {
         base.calculateTotals(self, self.paymentHistory);
      };

      self.customSubmit = function () {

         base.applyPaymentHistory(self.paymentHistory, arsp);

         self.submit();

      };
   };

   this.extendDetailController = function (self, base, arsp) {
      self.getSubTitle = function () {
         return MessageService.get('global.customer.number') + ': ' + self.arsp.custno;
      };

      self.calculateTotals = function () {
          base.calculateTotals(self, self.paymentHistory);
      };

      // When the full arsp object has been resolved, build the payment history data set
      arsp.$promise.then(function () {

         self.paymentHistory = [
            { month: MessageService.get('global.january'), per1bal: arsp.per1bal1, per2bal: arsp.per2bal1, per3bal: arsp.per3bal1, per4bal: arsp.per4bal1, per5bal: arsp.per5bal1, servbal: arsp.servbal1, credbal: arsp.credbal1, ttl: arsp.per1bal1 + arsp.per2bal1 + arsp.per3bal1 + arsp.per4bal1 + arsp.per5bal1 + arsp.servbal1 + arsp.credbal1 },
            { month: MessageService.get('global.february'), per1bal: arsp.per1bal2, per2bal: arsp.per2bal2, per3bal: arsp.per3bal2, per4bal: arsp.per4bal2, per5bal: arsp.per5bal2, servbal: arsp.servbal2, credbal: arsp.credbal2, ttl: arsp.per1bal2 + arsp.per2bal2 + arsp.per3bal2 + arsp.per4bal2 + arsp.per5bal2 + arsp.servbal2 + arsp.credbal2 },
            { month: MessageService.get('global.march'), per1bal: arsp.per1bal3, per2bal: arsp.per2bal3, per3bal: arsp.per3bal3, per4bal: arsp.per4bal3, per5bal: arsp.per5bal3, servbal: arsp.servbal3, credbal: arsp.credbal3, ttl: arsp.per1bal3 + arsp.per2bal3 + arsp.per3bal3 + arsp.per4bal3 + arsp.per5bal3 + arsp.servbal3 + arsp.credbal3 },
            { month: MessageService.get('global.april'), per1bal: arsp.per1bal4, per2bal: arsp.per2bal4, per3bal: arsp.per3bal4, per4bal: arsp.per4bal4, per5bal: arsp.per5bal4, servbal: arsp.servbal4, credbal: arsp.credbal4, ttl: arsp.per1bal4 + arsp.per2bal4 + arsp.per3bal4 + arsp.per4bal4 + arsp.per5bal4 + arsp.servbal4 + arsp.credbal4 },
            { month: MessageService.get('global.may'), per1bal: arsp.per1bal5, per2bal: arsp.per2bal5, per3bal: arsp.per3bal5, per4bal: arsp.per4bal5, per5bal: arsp.per5bal5, servbal: arsp.servbal5, credbal: arsp.credbal5, ttl: arsp.per1bal5 + arsp.per2bal5 + arsp.per3bal5 + arsp.per4bal5 + arsp.per5bal5 + arsp.servbal5 + arsp.credbal5 },
            { month: MessageService.get('global.june'), per1bal: arsp.per1bal6, per2bal: arsp.per2bal6, per3bal: arsp.per3bal6, per4bal: arsp.per4bal6, per5bal: arsp.per5bal6, servbal: arsp.servbal6, credbal: arsp.credbal6, ttl: arsp.per1bal6 + arsp.per2bal6 + arsp.per3bal6 + arsp.per4bal6 + arsp.per5bal6 + arsp.servbal6 + arsp.credbal6 },
            { month: MessageService.get('global.july'), per1bal: arsp.per1bal7, per2bal: arsp.per2bal7, per3bal: arsp.per3bal7, per4bal: arsp.per4bal7, per5bal: arsp.per5bal7, servbal: arsp.servbal7, credbal: arsp.credbal7, ttl: arsp.per1bal7 + arsp.per2bal7 + arsp.per3bal7 + arsp.per4bal7 + arsp.per5bal7 + arsp.servbal7 + arsp.credbal7 },
            { month: MessageService.get('global.august'), per1bal: arsp.per1bal8, per2bal: arsp.per2bal8, per3bal: arsp.per3bal8, per4bal: arsp.per4bal8, per5bal: arsp.per5bal8, servbal: arsp.servbal8, credbal: arsp.credbal8, ttl: arsp.per1bal8 + arsp.per2bal8 + arsp.per3bal8 + arsp.per4bal8 + arsp.per5bal8 + arsp.servbal8 + arsp.credbal8 },
            { month: MessageService.get('global.september'), per1bal: arsp.per1bal9, per2bal: arsp.per2bal9, per3bal: arsp.per3bal9, per4bal: arsp.per4bal9, per5bal: arsp.per5bal9, servbal: arsp.servbal9, credbal: arsp.credbal9, ttl: arsp.per1bal9 + arsp.per2bal9 + arsp.per3bal9 + arsp.per4bal9 + arsp.per5bal9 + arsp.servbal9 + arsp.credbal9 },
            { month: MessageService.get('global.october'), per1bal: arsp.per1bal10, per2bal: arsp.per2bal10, per3bal: arsp.per3bal10, per4bal: arsp.per4bal10, per5bal: arsp.per5bal10, servbal: arsp.servbal10, credbal: arsp.credbal10, ttl: arsp.per1bal10 + arsp.per2bal10 + arsp.per3bal10 + arsp.per4bal10 + arsp.per5bal10 + arsp.servbal10 + arsp.credbal10 },
            { month: MessageService.get('global.november'), per1bal: arsp.per1bal11, per2bal: arsp.per2bal11, per3bal: arsp.per3bal11, per4bal: arsp.per4bal11, per5bal: arsp.per5bal11, servbal: arsp.servbal11, credbal: arsp.credbal11, ttl: arsp.per1bal11 + arsp.per2bal11 + arsp.per3bal11 + arsp.per4bal11 + arsp.per5bal11 + arsp.servbal11 + arsp.credbal11 },
            { month: MessageService.get('global.december'), per1bal: arsp.per1bal12, per2bal: arsp.per2bal12, per3bal: arsp.per3bal12, per4bal: arsp.per4bal12, per5bal: arsp.per5bal12, servbal: arsp.servbal12, credbal: arsp.credbal12, ttl: arsp.per1bal12 + arsp.per2bal12 + arsp.per3bal12 + arsp.per4bal12 + arsp.per5bal12 + arsp.servbal12 + arsp.credbal12 },
            { month: MessageService.get('global.average'), per1bal: 0, per2bal: 0, per3bal: 0, per4bal: 0, per5bal: 0, servbal: 0, credbal: 0, ttl: 0}
         ];

         // to avoid SOHO update row error, wait until angular sends the data to the grid
         $timeout(function () {
            self.calculateTotals();
         });

      });

      self.customSubmit = function () {

         base.applyPaymentHistory(self.paymentHistory, arsp);

         self.submit();

      };
   };
});
