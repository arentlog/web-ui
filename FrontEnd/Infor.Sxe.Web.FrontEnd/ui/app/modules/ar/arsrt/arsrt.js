'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsrt',
      dataPath: 'api/ar/arsrt',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arsrtfetch',
      searchResultsField: '',
      resultsRowIdField: 'rowidArsrt',
      masterStateParams: {
         custno: null,
         shipto: null
      },
      recentlyVisited: {
         title: { label: 'global.rebate.type', value: 'rebatety' },
          description: [{ label: 'global.customer', value: 'custno' }, { label: 'global.ship.to', value: 'shipto' }]
      }
   });
});

app.service('ArsrtService', function ($state, DataService, MessageService, Utils) {

   this.extendMasterController = function (self, base, scope, stateParams) {

      if (stateParams.custno) {
         var shiptoValue = stateParams.shipto || '';

         base.submitHyperlinkSearch(stateParams.custno, shiptoValue);
      }

      self.customerInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ARIC HyperLink
         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno });
         }
      };

      self.shiptoInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };
   };

   this.extendBaseController = function (self) {

      // Performs Search off HyperLink from another function
      self.submitHyperlinkSearch = function (customerNumber, shiptoCode) {
         self.criteria.custno = customerNumber;
         self.criteria.shipto = shiptoCode;
         self.search();
      };
   };

   this.extendDetailController = function (self, base, arsrt, scope) {
      self.currentrebate = '';
      self.currentreblbl = '';

      // Load Sub Title with Rebate Type
      self.getSubTitle = function () {
         return self.arsrt.rebatety
      };

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arsrt.custno', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arsrt.custno && self.arsrt.shipto && self.arsrt.custno !== 0 && self.arsrt.shipto !== '') {
               params = {
                  custno: newValue,
                  shipto: self.arsrt.shipto,
                  fldlist: 'rebatety'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentrebate = arss.rebatety;
                  self.currentreblbl = MessageService.get('global.ship.to.rebate.type');
               });
            } else if (self.arsrt.custno && self.arsrt.custno !== 0) {
               params = {
                  custno: newValue,
                  fldlist: 'rebatety'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentrebate = arsc.rebatety;
                  self.currentreblbl = MessageService.get('global.cust.rebate.type');
               });
            }
         }
      });

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arsrt.shipto', function (newValue, oldValue) {
        if (newValue !== oldValue) {
           var params;

           if (self.arsrt.custno && self.arsrt.shipto && self.arsrt.custno !== 0 && self.arsrt.shipto !== '') {
              params = {
                 custno: self.arsrt.custno,
                 shipto: newValue,
                 fldlist: 'rebatety'
              };

              DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                 self.currentrebate = arss.rebatety;
                 self.currentreblbl = MessageService.get('global.ship.to.rebate.type');
              });
           } else if (self.arsrt.custno && self.arsrt.custno !== 0) {
              params = {
                 custno: self.arsrt.custno,
                 fldlist: 'rebatety'
              };

              DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                 self.currentrebate = arsc.rebatety;
                 self.currentreblbl = MessageService.get('global.cust.rebate.type');
              });
           }
        }
      });
   }

   this.extendCreateController = function (self, base, arsrt, scope) {
      self.currentrebate = '';
      self.currentreblbl = '';
      self.arsrt.shipto = '';
      self.arsrt.rebatety = '';

      // Clear the Sub Title - No Record Created Yet
      self.getSubTitle = function () {
         return MessageService.get('global.new')
      };

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arsrt.custno', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arsrt.custno && self.arsrt.shipto && self.arsrt.custno !== 0 && self.arsrt.shipto !== '') {
               params = {
                  custno: newValue,
                  shipto: self.arsrt.shipto,
                  fldlist: 'rebatety'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentrebate = arss.rebatety;
                  self.currentreblbl = MessageService.get('global.ship.to.rebate.type');
               });
            } else if (self.arsrt.custno && self.arsrt.custno !== 0) {
               params = {
                  custno: newValue,
                  fldlist: 'rebatety'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentrebate = arsc.rebatety;
                  self.currentreblbl = MessageService.get('global.cust.rebate.type');
               });
            }
         }
      });

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arsrt.shipto', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arsrt.custno && self.arsrt.shipto && self.arsrt.custno !== 0 && self.arsrt.shipto !== '') {
               params = {
                  custno: self.arsrt.custno,
                  shipto: newValue,
                  fldlist: 'rebatety'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentrebate = arss.rebatety;
                  self.currentreblbl = MessageService.get('global.ship.to.rebate.type');
               });
            } else if (self.arsrt.custno && self.arsrt.custno !== 0) {
               params = {
                  custno: self.arsrt.custno,
                  fldlist: 'rebatety'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentrebate = arsc.rebatety;
                  self.currentreblbl = MessageService.get('global.cust.rebate.type');
               });
            }
         }
      });
   }

});