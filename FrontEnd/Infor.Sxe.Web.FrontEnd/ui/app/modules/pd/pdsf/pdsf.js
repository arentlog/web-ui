'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdsf',
      dataPath: 'api/pd/pdsf',
      searchMethod: 'POST',
      searchPath: 'api/pd/aspdsetup/pdsfload',
      searchResultsField: 'pdsfloadresults',
      resultsRowIdField: 'pdsfrowid',
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });
});


app.service('PdsfService', function ($state, $translate, DataService, MessageService, UserService, ConfigService, GridService, Utils, Sasc, Sasoo) {

   this.extendMasterController = function (self, base, scope) {

      self.productInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow && currentRow.prod > '') {
            $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
         }
      };

      // Perform search
      self.submit = function (actionType) {

         // Perform Previous/Next or Main Search
         base.loadSearchData(actionType);

      };

   };

   this.extendBaseController = function (self) {

      var enableReplacement = false;
      var enableStandard = false;

      //For 'New' records, this particular screen expects the last value to be sticky.  If the
      //user has the 'Automatically Load Next Product' flag set, then the 'Product' field will
      //be pre-filled with the next product.
      self.lastPdsf = {};

      if (Sasc.icglcost.toUpperCase() === 'R' && Sasoo.chgglcostfl === true) {
         enableReplacement = true;
      } else if (Sasc.icglcost.toUpperCase() !== 'R') {
         enableReplacement = true;
      }

      if (Sasc.icglcost.toUpperCase() === 'S' && Sasoo.chgglcostfl === true) {
         enableStandard = true;
      } else if (Sasc.icglcost.toUpperCase() !== 'S') {
         enableStandard = true;
      }

      self.loadSearchData = function (actionType) {

         if (actionType === 'prev' || actionType === 'next' || actionType === 'search') {

            var searchCriteria = {
               prod: self.criteria.prod,
               whse: self.criteria.whse,
               action: actionType
            };

            DataService.post('api/pd/aspdsetup/pdsfload', { data: searchCriteria, busy: true }, function (data) {
               if (data) {

                  // Load the Product and information for the product
                  self.criteria.pricetext = data.pdsficswresults.cpricetext;
                  self.criteria.speccostty = data.pdsficswresults.cspeccostty;
                  self.criteria.prod = data.pdsficswresults.prod;

                  if (data.cWarningMessage) {
                     MessageService.alert('global.warning', data.cWarningMessage);
                  }

                  self.criteria.action = 'search';
                  self.search();
               }
            });
         }
      };

      // Format function for record data in recently visited display
      self.formatSubData = function (pdsf) {

         var recentSubTitle;

         if (pdsf.whse) {
            recentSubTitle = $translate.instant('global.warehouse') + ': ' + pdsf.whse;

            if (pdsf.effectdt) {
               recentSubTitle += ', ' + $translate.instant('global.effective.date') +
                        ': ' + Utils.formatDate(pdsf.effectdt);
            }
         } else if (pdsf.effectdt) {
            recentSubTitle = $translate.instant('global.effective.date') +
                     ': ' + Utils.formatDate(pdsf.effectdt);
         }

         return recentSubTitle;
      };

      self.enableCost = function (type) {

         if (type === 'repl') {
            return enableReplacement;
         } else if (type === 'stnd') {
            return enableStandard;
         } else {
            return true;
         }
      };

      self.loadICSWData = function (icProduct, icWarehouse) {

         self.emptyspclabel = ' ';
         self.speccostty = ' ';
         self.baseprice = '';
         self.listprice = '';
         self.replcost = '';
         self.stndcost = '';
         self.lastcost = '';
         self.priceupddt = '';
         self.replcostdt = '';
         self.stndcostdt = '';
         self.pricetext = '';

         var unitValue = '';

         if (!icProduct) {
            icProduct = '';
         }

         if (!icWarehouse) {
            icWarehouse = '';
         }

         if (icProduct) {
            var params = {
               prod: icProduct,
               fldlist: 'icspecrecno,unitstock'
            };

            // NOTE: Do not Print Errors here - No ICSP or no ICSW or no ICSD - let the back end SaveChanges display so not duplicate messages shown
            // If a record is not returned - it is null - and no data is loaded
            DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
               if (icsp) {

                  unitValue = icsp.unitstock;

                  self.pricetext = $translate.instant('global.prices') + ' ' + $translate.instant('global.per') + ' ' + unitValue;

                  var params = {
                     prod: icProduct,
                     icspecrecno: icsp.icspecrecno,
                     fldlist: 'prccostper,speccostty'
                  };

                  DataService.get('api/ic/icss/getbypk', { params: params }, function (icss) {
                     if (icss) {

                        if (icss.prccostper) {
                           unitValue = icss.prccostper;
                        }

                        if (icss.speccostty.toUpperCase() === 'T' || icss.speccostty.toUpperCase() === 'H') {
                           self.speccostty = '(' + icss.speccostty + ')';
                        }

                        self.pricetext = $translate.instant('global.prices') + ' ' + $translate.instant('global.per') + ' ' + unitValue;

                        if (icWarehouse) {
                           var params = {
                              prod: icProduct,
                              whse: icWarehouse,
                              fldlist: 'baseprice,listprice,replcost,stndcost,lastcost,priceupddt,replcostdt,stndcostdt'
                           };

                           DataService.get('api/ic/icsw/getbypk', { params: params }, function (icsw) {
                              if (icsw) {
                                 self.baseprice = icsw.baseprice;
                                 self.listprice = icsw.listprice;
                                 self.replcost = icsw.replcost;
                                 self.stndcost = icsw.stndcost;
                                 self.lastcost = icsw.lastcost;
                                 self.priceupddt = icsw.priceupddt;
                                 self.replcostdt = icsw.replcostdt;
                                 self.stndcostdt = icsw.stndcostdt;

                                 if (icsw.baseprice) {
                                    self.pricetext = icsw.baseprice.toFixed(5) + ' ' + $translate.instant('global.per') + ' ' + unitValue;
                                 } else {
                                    self.pricetext = $translate.instant('global.prices') + ' ' + $translate.instant('global.per') + ' ' + unitValue;
                                 }
                              }
                           });
                        } // Whse Loaded
                     }
                  });
               }
            });
         }  // Product Loaded
      };
   };


   this.extendSearchController = function (self, base, criteria, scope) {

      // Perform search
      self.submit = function () {
         base.criteria.action = 'search';

         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('pdsf.master');
         }

         // Load the Column Labels
         base.loadSearchData('search');

      };

   };


   this.extendDetailController = function (self, base, pdsf, scope) {

      // Need the ICSW Data Specific to Detail Record
      pdsf.$promise.then(function () {
         base.loadICSWData(self.pdsf.prod, self.pdsf.whse);
      });

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         subTitleText = self.pdsf.prod + ' | ';

         if (self.pdsf.whse) {
            subTitleText += self.pdsf.whse + ' | ';
         }

         subTitleText += Utils.formatDate(self.pdsf.effectdt);

         return subTitleText;
      };

      self.customReset = function () {
         //Clear out the last values so a reset will truly clear all fields and
         //not refresh last data.
         base.lastPdsf = {};

         //Call the standard
         self.reset();
      }; 
   };

   this.extendCreateController = function (self, base, pdsf, scope) {

      //If the whse isn't set assume they want to use the same whse in the search.
      self.pdsf.whse = !base.lastPdsf || !base.lastPdsf.whse ? base.criteria.whse : '';

      self.pdsf.effectdt = Utils.getCurrentDate();
      self.pdsf.pround = Sasc.pdpround;
      self.pdsf.ptarget = Sasc.pdptarget;
      self.pdsf.basetype = "";
      self.pdsf.baseprice = 0;
      self.pdsf.listtype = "";
      self.pdsf.listprice = 0;
      self.pdsf.repltype = "";
      self.pdsf.replcost = 0;
      self.pdsf.stndtype = "";
      self.pdsf.stndcost = 0;
      self.pdsf.pexactrnd = 0;

      self.assignFromLast = function () {
         //Key Values - Get the Product from criteria because if they have the 'Automatically
         //'Load Next Product' set, that will have been pre-populated.
         self.pdsf.prod = base.criteria.prod;
         self.pdsf.whse = base.lastPdsf.whse;
         self.pdsf.effectdt = base.lastPdsf.effectdt;

         //Other Fields
         self.pdsf.pround = base.lastPdsf.pround;
         self.pdsf.ptarget = base.lastPdsf.ptarget;
         self.pdsf.basetype = base.lastPdsf.basetype;
         self.pdsf.baseprice = base.lastPdsf.baseprice;
         self.pdsf.listtype = base.lastPdsf.listtype;
         self.pdsf.listprice = base.lastPdsf.listprice;
         self.pdsf.repltype = base.lastPdsf.repltype;
         self.pdsf.replcost = base.lastPdsf.replcost;
         self.pdsf.stndtype = base.lastPdsf.stndtype;
         self.pdsf.stndcost = base.lastPdsf.stndcost;
         self.pdsf.pexactrnd = base.lastPdsf.pexactrnd;
      }

      if (base.lastPdsf && base.lastPdsf.prod) {
         self.assignFromLast();
      }

      // Need the ICSW Data Specific to Create Record
      scope.$watch('dtl.pdsf.prod', function (newValue, oldValue) {

         base.loadICSWData(newValue, self.pdsf.whse);

      });

      scope.$watch('dtl.pdsf.whse', function (newValue, oldValue) {

         base.loadICSWData(self.pdsf.prod, newValue);

      });

      self.customReset = function () {
         //Clear out the last values so a reset will truly clear all fields and
         //not refresh last data.
         base.lastPdsf = {};

         //Call the standard
         self.reset();
      }; 
   };


   this.createRecord = function (self, base, pdsf, scope, callback) {

      if (!pdsf.whse) {
         pdsf.whse = '';
      }

      // SaveChange
      DataService.post('api/pd/pdsf', { data: pdsf }, function (pdsf) {
         if (pdsf) {
            callback(pdsf);

            // Load/Search after Record Created
            base.criteria.prod = pdsf.prod;
            base.criteria.whse = pdsf.whse;
            base.criteria.action = 'search';

            //Save off the last one updated, so it can be defaulted for 'new'
            Utils.replaceObject(base.lastPdsf, pdsf);

            // If Auto Load - go to Next Product/Whse Record
            if (base.criteria.autoload === true) {
               base.criteria.prod = pdsf.prod;
               base.criteria.whse = pdsf.whse;
               base.loadSearchData('next');
            }
         }
      });
   };


   this.updateRecord = function (self, base, pdsf, scope, callback) {

      if (!pdsf.whse) {
         pdsf.whse = '';
      }

      // SaveChange
      DataService.put('api/pd/pdsf', { data: pdsf }, function () {
         callback();

         //Save off the last one updated, so it can be defaulted for 'new'
         Utils.replaceObject(base.lastPdsf, pdsf);

         if (base.criteria.autoload === true) {
            base.criteria.prod = pdsf.prod;
            base.criteria.whse = pdsf.whse;
            base.loadSearchData('next');
         }
      });
   };

});
