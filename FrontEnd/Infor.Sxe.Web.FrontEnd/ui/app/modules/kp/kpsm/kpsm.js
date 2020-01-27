'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'kp',
      menuFn: 'kpsm',
      dataPath: 'api/kp/kpsm',
      searchMethod: 'POST',
      searchPath: 'api/kp/kpsm/lookup',
      searchResultsField: '',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'rowidKpsm',
      recentlyVisited: {
         title: { label: 'global.tally.product', value: 'prod' },
         description: [{ label: 'global.warehouse', value: 'whse' }, { label: 'global.component', value: 'comprod' }]
      }
   });
});

app.service('KpsmService', function ($state, DataService, GridService, MessageService, TabService, Utils, Sasoo) {

   var sumOEMix = 0;
   var sumPOMix = 0;

   this.extendBaseController = function (self) {

      // Calculate the total PO mix percent and the total OE mix percent for the tally components
      self.calculateTotals = function (base) {

         sumOEMix = 0;
         sumPOMix = 0;

         if (base.dataset && base.dataset.length > 0) {

            for (var i = 0; i < base.dataset.length; i++) {
               var obj = base.dataset[i];

               sumPOMix += obj.pomixpct || 0;
               sumOEMix += obj.oemixpct || 0;
            }

         }

      };

   };

   this.extendCreateController = function (self, base, kpsm, scope) {

      kpsm.prod = base.criteria.prod;
      kpsm.whse = base.criteria.whse;

   };

   this.extendMasterController = function (self, base, scope) {

      self.productInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ICIP HyperLink
         if (currentRow && currentRow.comprod) {
            $state.go('icip.detail', { pk: currentRow.comprod });
         }
      };

      // When the user attempts to close the KPSM tab, check the mix totals
      // If the totals are not 100, question whether they want to leave or return and address the totals
      TabService.canUserCloseTab('kpsm.master', function () {

        if (base.dataset && base.dataset.length > 0) {

            base.calculateTotals(base);

            if (sumPOMix !== 100 || sumOEMix !== 100) {
               MessageService.okCancel('global.question', 'question.po.mix.pct.and.oe.mix.pct.should.each.total.100.d', function () {
                  TabService.closeTab('kpsm.master');
               });
               return false;
            }
         }
         return true;
      });

   };

   this.extendDetailController = function (self, base, kpsm, scope) {

      // Load Sub Title with Price Type
      self.getSubTitle = function () {
         return self.kpsm.prod;
      };

      base.calculateTotals(base);

      self.totalpomixpct = sumPOMix;
      self.totaloemixpct = sumOEMix;

      // If the OE % is changed, adjust the total OE percentage based on new value
      scope.$watch('dtl.kpsm.oemixpct', function (newValue, oldValue) {

         if ((newValue !== oldValue) && (oldValue !== undefined)) {
            self.totaloemixpct = sumOEMix - oldValue + newValue;
            sumOEMix = self.totaloemixpct;
         }

      });

      // If the OE % is changed, adjust the total OE percentage based on new value
      scope.$watch('dtl.kpsm.pomixpct', function (newValue, oldValue) {

         if ((newValue !== oldValue) && (oldValue !== undefined)) {
            self.totalpomixpct = sumPOMix - oldValue + newValue;
            sumPOMix = self.totalpomixpct;
         }

      });

   };

});

