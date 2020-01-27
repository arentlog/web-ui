'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'va',
      menuFn: 'vaec',
      dataPath: 'api/va/vaehc',
      searchMethod: 'POST',
      searchPath: 'api/va/asvainquiry/vaeccreatetemptable',
      searchResultsField: 'vaecresults',
      resultsRowIdField: 'vaehcrowid',
      primaryKeyParams: ['vano'],
      recordName: 'vaehc',
      detailSubTitle: [
         {label: null, value: 'vano'}
      ],
      recentlyVisited: null
   });
});


app.service('VaecService', function ($state, $translate, $filter, DataService, GridService, MessageService, Utils) {

   this.extendMasterController = function (self) {

      self.vaorderHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow) {
            $state.go('vaif.detail', { pk: currentRow.vano, pk2: currentRow.vasuf });
         }
      };

      self.shipprodHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow) {
            $state.go('icip.detail', { pk: currentRow.shipprod });
         }
      };

      self.journalHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow) {
            $state.go('glij.master', { pk: currentRow.jrnlno });
         }
      };

   }; // extendMasterController

   this.extendSearchController = function (self, base, criteria) {

      self.resetCriteria = function () {
         base.criteria.vanox = '0-00'
         base.criteria.vano = 0;
         base.criteria.vasuf = 0;
      };

      self.changeOfVAOrder = function (args) {
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = base.criteria.vanox.split('-');
               if (orderParts.length === 2) {
                  base.criteria.vano = orderParts[0];
                  base.criteria.vasuf = orderParts[1];
               } else {
                  base.criteria.vano = base.criteria.vanox;
                  base.criteria.vasuf = 0;
               }
            } else {
               base.criteria.vano = args.value;
               base.criteria.vasuf = args.value2;
            }
         } else {
            base.criteria.vano = 0;
            base.criteria.vasuf = 0;
         }
      };

      // Clear form
      self.clear = function () {
         Utils.clearObject(criteria);
         self.resetCriteria();
      };

      self.clear();

   }; // extendSearchController

   this.extendBaseController = function (self) {

      self.vanox = '0-00';

   }; // extendBaseController

   this.extendDetailController = function (self, base) {

      self.vaorderHyperlink = function () {
         self.splitFullVAOrderNumber();
         if (self.vaehc.vano) {
            $state.go('vaif.detail', { pk: self.vaehc.vano, pk2: self.vaehc.vasuf });
         }
      };

      self.journalHyperlink = function () {
         if (self.vaehc.jrnlno) {
            $state.go('glij.master', { pk: self.vaehc.jrnlno });
         }
      };

      self.getFullVAOrderNumber = function (vaehc) {
         if (vaehc) {
            return vaehc.vano + '-' + Utils.pad(vaehc.vasuf, 2);
         } else {
            return '';
         }
      };

      self.splitFullVAOrderNumber = function () {
         if (base.vanox) {
            var orderParts = base.vanox.split('-');
            self.vaehc.vano = orderParts[0];
            self.vaehc.vasuf = (orderParts.length === 2) ? orderParts[1] : 0;
         }
      };

      self.vaehc.$promise.then(function () {
         if (self.vaehc) {
            base.vanox = self.getFullVAOrderNumber(self.vaehc);
         }
      });

   }; // extendDetailController

   this.extendCreateController = function (self, base) {

      self.vaorderHyperlink = function () {
         if (self.vaehc.vano) {
            $state.go('vaif.detail', { pk: self.vaehc.vano, pk2: self.vaehc.vasuf });
         }
      };

      self.journalHyperlink = function () {
         if (self.vaehc.jrnlno) {
            $state.go('glij.master', { pk: self.vaehc.jrnlno });
         }
      };

      self.changeOfVAOrder = function (args) {
         self.vaehc.whse = '';
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = base.vanox.split('-');
               if (orderParts.length === 2) {
                  self.vaehc.vano = orderParts[0];
                  self.vaehc.vasuf = orderParts[1];
               } else {
                  self.vaehc.vano = base.vanox;
                  self.vaehc.vasuf = 0;
               }
            } else {
               self.vaehc.vano = args.value;
               self.vaehc.vasuf = args.value2;
            }
            var params = {
               vano: self.vaehc.vano,
               vasuf: self.vaehc.vasuf,
               fillmode: false
            };
            DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.vaehc.whse = data.whse;
               }
            });
         } else {
            self.vaehc.vano = 0;
            self.vaehc.vasuf = 0;
         }
      };

      base.vanox = '0-00';
      self.vaehc.vano = 0;
      self.vaehc.vasuf = 0;
      self.vaehc.whse = '';

   }; // extendCreateController

});  // VaecService

