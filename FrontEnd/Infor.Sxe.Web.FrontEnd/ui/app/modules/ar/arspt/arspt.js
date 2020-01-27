'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arspt',
      dataPath: 'api/ar/arspt',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arsptgetlist',
      searchResultsField: 'arsptgetlistresults',
      searchRecordLimitField: 'recordcountlimit',
      resultsRowIdField: 'arsptrowid',
      masterStateParams: {
         custno: null,
         shipto: null
      },
      recentlyVisited: {
         title: { label: 'global.price.type', value: 'pricetype' },
         description:[ {label: 'global.customer', value: 'custno'}, { label:'global.ship.to', value: 'shipto'} ]
      }
   });
});


app.service('ArsptService', function ($state, DataService, MessageService, Utils) {


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

   this.extendDetailController = function (self, base, arspt, scope) {
      self.currentprctyval = '';
      self.currentprctylbl = '';
      self.currentprclvlval = '';
      self.currentprclvllbl = '';
      self.currentdisclvlval = '';
      self.currentdisclvllbl = '';

      // Load Sub Title with Price Type
      self.getSubTitle = function () {
         return self.arspt.pricetype
      };

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arspt.custno', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arspt.custno && self.arspt.shipto && self.arspt.custno !== 0 && self.arspt.shipto !== '') {
               params = {
                  custno: newValue,
                  shipto: self.arspt.shipto,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentprctyval = arss.pricetype;
                  self.currentprctylbl = MessageService.get('global.ship.to.price.type');
                  self.currentprclvlval = arss.pricecd;
                  self.currentprclvllbl = MessageService.get('global.ship.to.price.level');
                  self.currentdisclvlval = arss.disccd;
                  self.currentdisclvllbl = MessageService.get('global.ship.to.disc.level');
               });
            } else if (self.arspt.custno && self.arspt.custno !== 0) {
               params = {
                  custno: newValue,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentprctyval = arsc.pricetype;
                  self.currentprctylbl = MessageService.get('global.customer.price.type');
                  self.currentprclvlval = arsc.pricecd;
                  self.currentprclvllbl = MessageService.get('global.customer.price.level');
                  self.currentdisclvlval = arsc.disccd;
                  self.currentdisclvllbl = MessageService.get('global.customer.disc.level');
               });
            }
         }
      });

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arspt.shipto', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arspt.custno && self.arspt.shipto && self.arspt.custno !== 0 && self.arspt.shipto !== '') {
               params = {
                  custno: self.arspt.custno,
                  shipto: newValue,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentprctyval = arss.pricetype;
                  self.currentprctylbl = MessageService.get('global.ship.to.price.type');
                  self.currentprclvlval = arss.pricecd;
                  self.currentprclvllbl = MessageService.get('global.ship.to.price.level');
                  self.currentdisclvlval = arss.disccd;
                  self.currentdisclvllbl = MessageService.get('global.ship.to.disc.level');
               });
            } else if (self.arspt.custno && self.arspt.custno !== 0) {
               params = {
                  custno: self.arspt.custno,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentprctyval = arsc.pricetype;
                  self.currentprctylbl = MessageService.get('global.customer.price.type');
                  self.currentprclvlval = arsc.pricecd;
                  self.currentprclvllbl = MessageService.get('global.customer.price.level');
                  self.currentdisclvlval = arsc.disccd;
                  self.currentdisclvllbl = MessageService.get('global.customer.disc.level');
               });
            }
         }
      });
   }

   this.extendCreateController = function (self, base, arspt, scope) {
      self.currentprctyval = '';
      self.currentprctylbl = '';
      self.currentprclvlval = '';
      self.currentprclvllbl = '';
      self.currentdisclvlval = '';
      self.currentdisclvllbl = '';
      self.arspt.custno = 0;
      self.arspt.shipto = '';
      self.arspt.pricecd = 0;
      self.arspt.disccd = 0;

      // Clear the Sub Title - No Record Created Yet
      self.getSubTitle = function () {
         return MessageService.get('global.new')
      };

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arspt.custno', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arspt.custno && self.arspt.shipto && self.arspt.custno !== 0 && self.arspt.shipto !== '') {
               params = {
                  custno: newValue,
                  shipto: self.arspt.shipto,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentprctyval = arss.pricetype;
                  self.currentprctylbl = MessageService.get('global.ship.to.price.type');
                  self.currentprclvlval = arss.pricecd;
                  self.currentprclvllbl = MessageService.get('global.ship.to.price.level');
                  self.currentdisclvlval = arss.disccd;
                  self.currentdisclvllbl = MessageService.get('global.ship.to.disc.level');
               });
            } else if (self.arspt.custno && self.arspt.custno !== 0) {
               params = {
                  custno: newValue,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentprctyval = arsc.pricetype;
                  self.currentprctylbl = MessageService.get('global.customer.price.type');
                  self.currentprclvlval = arsc.pricecd;
                  self.currentprclvllbl = MessageService.get('global.customer.price.level');
                  self.currentdisclvlval = arsc.disccd;
                  self.currentdisclvllbl = MessageService.get('global.customer.disc.level');
               });
            }
         }
      });

      // Update screen display rebatetype when customer/shipto changes
      scope.$watch('dtl.arspt.shipto', function (newValue, oldValue) {
         if (newValue !== oldValue) {
            var params;

            if (self.arspt.custno && self.arspt.shipto && self.arspt.custno !== 0 && self.arspt.shipto !== '') {
               params = {
                  custno: self.arspt.custno,
                  shipto: newValue,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arss/getbypk', { params: params }, function (arss) {
                  self.currentprctyval = arss.pricetype;
                  self.currentprctylbl = MessageService.get('global.ship.to.price.type');
                  self.currentprclvlval = arss.pricecd;
                  self.currentprclvllbl = MessageService.get('global.ship.to.price.level');
                  self.currentdisclvlval = arss.disccd;
                  self.currentdisclvllbl = MessageService.get('global.ship.to.disc.level');
               });
            } else if (self.arspt.custno && self.arspt.custno !== 0) {
               params = {
                  custno: self.arspt.custno,
                  fldlist: 'pricetype,pricecd,disccd'
               };

               DataService.get('api/ar/arsc/getbypk', { params: params }, function (arsc) {
                  self.currentprctyval = arsc.pricetype;
                  self.currentprctylbl = MessageService.get('global.customer.price.type');
                  self.currentprclvlval = arsc.pricecd;
                  self.currentprclvllbl = MessageService.get('global.customer.price.level');
                  self.currentdisclvlval = arsc.disccd;
                  self.currentdisclvllbl = MessageService.get('global.customer.disc.level');
               });
            }
         }
      });
   }
});
