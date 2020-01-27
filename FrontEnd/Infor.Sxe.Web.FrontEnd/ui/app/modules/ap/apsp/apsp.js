'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apsp',
      dataPath: 'api/ap/apsp',
      searchMethod: 'POST',
      searchPath: 'api/ap/apsp/lookup',
      searchResultsField: 'apsplookupresults',
      searchRecordLimitField: 'recordcountlimit',
      searchDefaultWarehouseField: 'whse',
      searchCriteria: {
         year: parseInt(new Date().getFullYear().toString().substr(2, 2), 10)
      },
      resultsRowIdField: 'rowidApsp',
      copyStateView: 'ap/apsp/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ap/asapsetup/apspcopy',
      recentlyVisited: {
         title: { label: 'global.vendor.number', value: 'vendno' },
         description: [
            { label: 'global.warehouse', value: 'whse' },
            { label: 'global.product.line', value: 'prodline' },
            { label: 'global.year', value: 'yr' }
         ]
      }
   });
});

app.service('ApspService', function (MessageService, Sasoo, Sasc, Utils, DataService) {

   this.extendBaseController = function (self) {

      self.calculateTotals = function (ctrl, purchaseHistory) {
         ctrl.qtysold = 0;
         ctrl.purchamt = 0;
         ctrl.salesamt = 0;
         ctrl.cogamt = 0;

         for (var i = 0; i <= 11; i++) {
            var obj = purchaseHistory[i];

            ctrl.qtysold += obj.qtysold || 0;
            ctrl.purchamt += obj.purchamt || 0;
            ctrl.salesamt += obj.salesamt || 0;
            ctrl.cogamt += obj.cogamt || 0;

         }
      };

      self.loadColumnLabels = function (ctrl) {

         var params = {
            whse: ctrl.apsp.whse,
            vendno: ctrl.apsp.vendno,
            prodline: ctrl.apsp.prodline
         };

         DataService.get('api/ic/icsl/getbypk', { params: params, busy: true }, function (icsl) {

            if (icsl) {

               if (icsl.tarbuytype.toUpperCase() === 'D') {
                  ctrl.purchaseHistoryLabel1 = MessageService.get('global.amount.purchased');
                  ctrl.purchaseHistoryLabel2 = MessageService.get('global.amount.sold');
               } else if (icsl.tarbuytype.toUpperCase() === 'Q') {
                  ctrl.purchaseHistoryLabel1 = MessageService.get('global.quantity.purchased');
                  ctrl.purchaseHistoryLabel2 = MessageService.get('global.quantity.sold');
               } else if (icsl.tarbuytype.toUpperCase() === 'C') {
                  ctrl.purchaseHistoryLabel1 = MessageService.get('global.cubes.purchased');
                  ctrl.purchaseHistoryLabel2 = MessageService.get('global.cubes.sold');
               } else if (icsl.tarbuytype.toUpperCase() === 'W') {
                  ctrl.purchaseHistoryLabel1 = MessageService.get('global.weight.purchased');
                  ctrl.purchaseHistoryLabel2 = MessageService.get('global.weight.sold');
               }
            }
         });
      };

      self.applyPurchaseHistory = function (purchaseHistory, apsp) {

         for (var i = 0; i <= 11; i++) {
            var obj = purchaseHistory[i];
            var monthNum = i + 1;
            apsp['qtysold' + monthNum] = obj.qtysold;
            apsp['purchamt' + monthNum] = obj.purchamt;
            apsp['salesamt' + monthNum] = obj.salesamt;
            apsp['cogamt' + monthNum] = obj.cogamt;
         }

      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.getSubTitle = function () {
         return MessageService.get('global.vendor') + ': ' + stateParams.object.vendno + ' | ' +
            MessageService.get('global.warehouse') + ': ' + stateParams.object.whse + ' | ' +
            MessageService.get('global.product.line') + ': ' + stateParams.object.prodline + ' | ' +
              MessageService.get('global.year') + ': ' + stateParams.object.yr;
      };

      request.tovendno = stateParams.object.vendno;
      request.towhse = stateParams.object.whse;
      request.toprodline = stateParams.object.prodline;
      request.toyear = stateParams.object.yr;
      request.fromvendno = stateParams.object.vendno;
      request.fromwhse = stateParams.object.whse;
      request.fromprodline = stateParams.object.prodline;
      request.fromyear = stateParams.object.yr;

   };

   this.extendCreateController = function (self, base, apsp) {
      var currencySymbol = Sasc.currsymbol;
      self.purchaseHistoryLabel1 = MessageService.get('global.amount.purchased');
      self.purchaseHistoryLabel2 = MessageService.get('global.amount.sold');
      self.purchaseHistoryLabel3 = currencySymbol + ' ' + MessageService.get('global.sales');
      self.purchaseHistoryLabel4 = currencySymbol + ' ' + MessageService.get('global.cost.of.sales');
      self.qtysold = 0;
      self.purchamt = 0;
      self.salesamt = 0;
      self.cogamt = 0;
      self.sasoo = Sasoo;
      apsp.whse = base.criteria.whse;
      apsp.yr = Utils.getCurrentYearTwo();

      self.loadColumnLabels = function () {
         if (apsp.whse && apsp.vendno && apsp.prodline) {
            base.loadColumnLabels(self);
         }
      };

      self.purchaseHistory = [
         { month: MessageService.get('global.january'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.february'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.march'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.april'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.may'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.june'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.july'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.august'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.september'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.october'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.november'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 },
         { month: MessageService.get('global.december'), purchamt: 0, qtysold: 0, salesamt: 0, cogamt: 0 }
      ];

      self.calculateTotals = function () {
         base.calculateTotals(self, self.purchaseHistory);
      };

      self.customSubmit = function () {

         base.applyPurchaseHistory(self.purchaseHistory, apsp);

         self.submit();

      };
   };

   this.extendDetailController = function (self, base, apsp) {
      var currencySymbol = Sasc.currsymbol;
      self.purchaseHistoryLabel1 = MessageService.get('global.amount.purchased');
      self.purchaseHistoryLabel2 = MessageService.get('global.amount.sold');
      self.purchaseHistoryLabel3 = currencySymbol + ' ' + MessageService.get('global.sales');
      self.purchaseHistoryLabel4 = currencySymbol + ' ' + MessageService.get('global.cost.of.sales');

      self.getSubTitle = function () {
         return MessageService.get('global.vendor') + ': ' + self.apsp.vendno + ' | ' +
              MessageService.get('global.warehouse') + ': ' + self.apsp.whse + ' | ' +
              MessageService.get('global.product.line') + ': ' + self.apsp.prodline + ' | ' +
              MessageService.get('global.year') + ': ' + self.apsp.yr;
      };

      self.calculateTotals = function () {
         base.calculateTotals(self, self.purchaseHistory);
      };

      // When the full apsp object has been resolved, build the purchase history data set
      apsp.$promise.then(function () {

         self.loadColumnLabels = function () {
            base.loadColumnLabels(self);
         };

         self.purchaseHistory = [
            { month: MessageService.get('global.january'), purchamt: apsp.purchamt1, qtysold: apsp.qtysold1, salesamt: apsp.salesamt1, cogamt: apsp.cogamt1 },
            { month: MessageService.get('global.february'), purchamt: apsp.purchamt2, qtysold: apsp.qtysold2, salesamt: apsp.salesamt2, cogamt: apsp.cogamt2 },
            { month: MessageService.get('global.march'), purchamt: apsp.purchamt3, qtysold: apsp.qtysold3, salesamt: apsp.salesamt3, cogamt: apsp.cogamt3 },
            { month: MessageService.get('global.april'), purchamt: apsp.purchamt4, qtysold: apsp.qtysold4, salesamt: apsp.salesamt4, cogamt: apsp.cogamt4 },
            { month: MessageService.get('global.may'), purchamt: apsp.purchamt5, qtysold: apsp.qtysold5, salesamt: apsp.salesamt5, cogamt: apsp.cogamt5 },
            { month: MessageService.get('global.june'), purchamt: apsp.purchamt6, qtysold: apsp.qtysold6, salesamt: apsp.salesamt6, cogamt: apsp.cogamt6 },
            { month: MessageService.get('global.july'), purchamt: apsp.purchamt7, qtysold: apsp.qtysold7, salesamt: apsp.salesamt7, cogamt: apsp.cogamt7 },
            { month: MessageService.get('global.august'), purchamt: apsp.purchamt8, qtysold: apsp.qtysold8, salesamt: apsp.salesamt8, cogamt: apsp.cogamt8 },
            { month: MessageService.get('global.september'), purchamt: apsp.purchamt9, qtysold: apsp.qtysold9, salesamt: apsp.salesamt9, cogamt: apsp.cogamt9 },
            { month: MessageService.get('global.october'), purchamt: apsp.purchamt10, qtysold: apsp.qtysold10, salesamt: apsp.salesamt10, cogamt: apsp.cogamt10 },
            { month: MessageService.get('global.november'), purchamt: apsp.purchamt11, qtysold: apsp.qtysold11, salesamt: apsp.salesamt11, cogamt: apsp.cogamt11 },
            { month: MessageService.get('global.december'), purchamt: apsp.purchamt12, qtysold: apsp.qtysold12, salesamt: apsp.salesamt12, cogamt: apsp.cogamt12 }
         ];

         self.calculateTotals();

         self.loadColumnLabels();
      });

      self.customSubmit = function () {

         base.applyPurchaseHistory(self.purchaseHistory, apsp);

         self.submit();

      };
   };
});