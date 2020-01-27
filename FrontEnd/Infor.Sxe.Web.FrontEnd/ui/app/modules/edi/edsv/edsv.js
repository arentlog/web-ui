'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'edi',
      menuFn: 'edsv',
      dataPath: 'api/edi/edsv',
      searchMethod: 'POST',
      searchPath: 'api/edi/asedientry/edsvsearch',
      searchResultsField: '',
      resultsRowIdField: 'rowidEdsv',
      detailSubTitle: [
         { label: 'global.vendor.number', value: 'vendno' }
      ],
      recentlyVisited: {
         title: { label: 'global.type', valueFunction: 'base.formatTypeCodeDescription' },
         description: [
            { label: 'global.vendor.number', value: 'vendno' },
            { label: 'global.vendor.customer.id', value: 'vendorid' },
            { label: 'global.contract', value: 'contractno' },
            { label: '', valueFunction: 'base.formatPrimaryKey' }
         ]
      }
   });
});

app.service('EdsvService', function ($state, $translate, MessageService) {

   this.extendBaseController = function (self) {
      self.LABEL_DELIMITER = ': ';
      self.TYPE_CODE_CUSTOMERLIST = 'cl';
      self.TYPE_CODE_CUSTOMERREBATE = 'cr';
      self.TYPE_CODE_CUSTOMERTYPE = 'ct';
      self.TYPE_CODE_WAREHOUSE = 'w';

      self.formatPrimaryKey = function (edsv) {
         var primaryKeyDescription = '';

         if (edsv) {
            switch (edsv.typecd.toLowerCase()) {
               case self.TYPE_CODE_CUSTOMERLIST: //ignore jslint - correct indentation
                  var customerShipTo = ''; //ignore jslint - correct indentation
                  customerShipTo = $translate.instant('global.customer.number') + self.LABEL_DELIMITER + edsv.custno;  //ignore jslint - correct indentation
                  if (edsv.shipto) { //ignore jslint - correct indentation
                     customerShipTo += ' ' + $translate.instant('global.ship.to') + self.LABEL_DELIMITER + edsv.shipto; //ignore jslint - correct indentation
                  } //ignore jslint - correct indentation
                  return customerShipTo; //ignore jslint - correct indentation
               case self.TYPE_CODE_CUSTOMERREBATE: //ignore jslint - correct indentation
                  return $translate.instant('global.customer.rebate') + self.LABEL_DELIMITER + edsv.custrebty; //ignore jslint - correct indentation
               case self.TYPE_CODE_CUSTOMERTYPE: //ignore jslint - correct indentation
                  return $translate.instant('global.customer.type') + self.LABEL_DELIMITER + edsv.custtype; //ignore jslint - correct indentation
               case self.TYPE_CODE_WAREHOUSE: //ignore jslint - correct indentation
                  return $translate.instant('global.warehouse') + self.LABEL_DELIMITER + edsv.whse; //ignore jslint - correct indentation
               default: //ignore jslint - correct indentation
                  return primaryKeyDescription; //ignore jslint - correct indentation
            }
         } else {
            return primaryKeyDescription;
         }
      };

      self.formatTypeCodeDescription = function (edsv) {
         var typeCodeDescription = edsv.typecd;

         if (typeCodeDescription) {
            switch (typeCodeDescription.toLowerCase()) {
               case self.TYPE_CODE_CUSTOMERLIST: //ignore jslint - correct indentation
                  return $translate.instant('global.customer.list'); //ignore jslint - correct indentation
               case self.TYPE_CODE_CUSTOMERREBATE: //ignore jslint - correct indentation
                  return $translate.instant('global.customer.rebate'); //ignore jslint - correct indentation
               case self.TYPE_CODE_CUSTOMERTYPE: //ignore jslint - correct indentation
                  return $translate.instant('global.customer.type'); //ignore jslint - correct indentation
               case self.TYPE_CODE_WAREHOUSE: //ignore jslint - correct indentation
                  return $translate.instant('global.warehouse'); //ignore jslint - correct indentation
               default: //ignore jslint - correct indentation
                  return typeCodeDescription; //ignore jslint - correct indentation
            }
         } else {
            return typeCodeDescription;
         }
      };
   };

   this.extendSearchController = function (self, base, criteria, scope, edsv) {

      self.customSearch = function () {
         //Doing this programatically (vs marking the Vendor # as required) so the user
         //can still create a new row by entering a Vendor # in the 'create' view without
         //getting stopped with errors from the Search panel.
         if (!base.criteria.vendno) {
            MessageService.error('global.error', 'message.vendor.number.is.required');
         } else {
            self.submit();
         }
      };
   };

   this.extendMasterController = function (self, base, scope) {

      self.navigateToCustomer = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno });
         }
      };

      self.navigateToShipto = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };

      self.navigateToVendor = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.vendno > 0) {
            $state.go('apiv.detail', { pk: currentRow.vendno });
         }
      };
   };

   //NOTE:  Do not remove 'self' from injection, otherwise you will cause a runtime error on the 'create'.
   this.extendCreateController = function (self, base, edsv) {

      //Default in the Vendor # we're working with.
      edsv.vendno = base.criteria.vendno;
      edsv.typecd = base.TYPE_CODE_CUSTOMERLIST;

      //Default some values so we don't get NPE in the backend on strings.
      edsv.shipto = '';
      edsv.contractno = '';
      edsv.whse = '';

      self.navigateToCustomer = function () {
         if (edsv && edsv.custno > 0) {
            $state.go('aric.detail', { pk: edsv.custno });
         }
      };

      self.navigateToShipto = function () {
         if (edsv && edsv.custno > 0) {
            $state.go('aric.detail', { pk: edsv.custno, pk2: edsv.shipto });
         }
      };

      self.navigateToVendor = function () {
         if (edsv && edsv.vendno > 0) {
            $state.go('apiv.detail', { pk: edsv.vendno });
         }
      };

      self.customSubmit = function () {
         if (edsv) {
            //Cleanse the data in case they entered some and then changed the type.  We don't
            //want those other elements of data getting stored on the Save.
            switch (edsv.typecd.toLowerCase()) {
               case base.TYPE_CODE_CUSTOMERLIST:         //ignore jslint - correct indentation
                  edsv.custrebty = '';                   //ignore jslint - correct indentation
                  edsv.custtype = '';                    //ignore jslint - correct indentation
                  edsv.whse = '';                        //ignore jslint - correct indentation
                  break;                                 //ignore jslint - correct indentation
               case base.TYPE_CODE_CUSTOMERREBATE:       //ignore jslint - correct indentation
                  edsv.custno = 0;                       //ignore jslint - correct indentation
                  edsv.shipto = '';                      //ignore jslint - correct indentation
                  edsv.custtype = '';                    //ignore jslint - correct indentation
                  edsv.whse = '';                        //ignore jslint - correct indentation
                  break;                                 //ignore jslint - correct indentation
               case base.TYPE_CODE_CUSTOMERTYPE:         //ignore jslint - correct indentation
                  edsv.custno = 0;                       //ignore jslint - correct indentation
                  edsv.shipto = '';                      //ignore jslint - correct indentation
                  edsv.custrebty = '';                   //ignore jslint - correct indentation
                  edsv.whse = '';                        //ignore jslint - correct indentation
                  break;                                 //ignore jslint - correct indentation
               case base.TYPE_CODE_WAREHOUSE:            //ignore jslint - correct indentation
                  edsv.custno = 0;                       //ignore jslint - correct indentation
                  edsv.shipto = '';                      //ignore jslint - correct indentation
                  edsv.custrebty = '';                   //ignore jslint - correct indentation
                  edsv.custtype = '';                    //ignore jslint - correct indentation
                  edsv.contractno = '';                  //ignore jslint - correct indentation
                  break;                                 //ignore jslint - correct indentation
            }
         }
         self.submit();
      };
   };

   this.extendDetailController = function (self, base, edsv, scope) {

      self.navigateToCustomer = function () {
         if (edsv && edsv.custno > 0) {
            $state.go('aric.detail', { pk: edsv.custno });
         }
      };

      self.navigateToShipto = function () {
         if (edsv && edsv.custno > 0) {
            $state.go('aric.detail', { pk: edsv.custno, pk2: edsv.shipto });
         }
      };

      self.navigateToVendor = function () {
         if (edsv && edsv.vendno > 0) {
            $state.go('apiv.detail', { pk: edsv.vendno });
         }
      };

      //Only want to fire this informational message if the user goes into Edit Mode.  Unnecessary to show it
      //if simply going into detail in inquiry mode.
      scope.$watch('dtl.edsv.typecd', function (newValue, oldValue) {
         if (base.isEdit() && newValue && newValue !== oldValue) {
            if (newValue === base.TYPE_CODE_CUSTOMERLIST && edsv && edsv.custno > 0) {
               MessageService.info('global.information', 'message.the.customer.and.shipto.are.part.of.the.unique');
            }
            else if (newValue === base.TYPE_CODE_WAREHOUSE && edsv && edsv.whse) {
               MessageService.info('global.information', 'message.the.warehouse.are.part.of.the.unique');
            }
         }
      });

      self.customEdit = function () {
         if (edsv) {
            if (edsv.typecd === base.TYPE_CODE_CUSTOMERLIST && edsv.custno > 0) {
               MessageService.info('global.information', 'message.the.customer.and.shipto.are.part.of.the.unique');
            }
            else if (edsv.typecd === base.TYPE_CODE_WAREHOUSE && edsv.whse) {
               MessageService.info('global.information', 'message.the.warehouse.are.part.of.the.unique');
            }
         }
         $state.go('.edit');
      };

      self.customSubmit = function () {
         //NOTE: No need to clean any data since they can't change the Type in Edit mode.
         self.submit();
      };
   };
});
