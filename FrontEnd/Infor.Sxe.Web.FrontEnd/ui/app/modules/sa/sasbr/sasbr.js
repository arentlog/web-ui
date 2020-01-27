'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasbr',

      searchMethod: 'POST',
      searchPath: '',
      searchResultsField: 'sasbrresults',
      resultsRowIdField: 'sxxmlruleRowid',
      recordName: 'sxxmrule',
      primaryKeyParams: [''],
      passGridRecord: true,
      recentlyVisited: null
   });
});


app.service('SasbrService', function ($state, $translate, $filter, DataService, GridService, MessageService) {

   this.getRecord = function (self, base, stateParams) {

      if (stateParams.object) {
         self.sasbrresults = stateParams.object;
      }

      /*
      There are 2 datasets passed from the Service Interface calls: 
      sasbrmaint   - controls the screen behavior and is mapped on the Detail screen to dtl.sasbrmaint  
      sasbrresults - contains the record data and is mapped on the Detail screen to dtl.sasbr  

      There is no sasbr record in the database. The actual business rule record is stored in the sxxmlrule table.
      */

      var params = {
         sasbrresults: self.sasbrresults,
         cfunction: 'Update',
         cCategory: '',
         cRuleType: ''
      };

      return DataService.getResource('api/sa/assasetup/sasbrdetail', { data: params, method: 'POST', busy: true }, function (data) {
         data.$promise.then(function () {
            self.sasbrmaint = data.sasbrmaint;
            self.sasbr = data.sasbrresults;
         });
      });

   }; // getRecord

   this.extendSearchController = function (self, base) {

      // Load the Category dropdown      
      DataService.get('api/sa/assasetup/sasbrcatload', function (categories) {
         if (categories) {
            base.sasbrCategories = categories;

            // Note - remove <Show All> with shift() - H5 should only use Show All without the brackets
            base.sasbrCategories.shift();

            base.loadSearchRules();
         }
      });

   }; // extendSearchController

   this.extendMasterController = function (self) {

      // ARIC hyperlink
      self.customerInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow) {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };

      // APIV hyperlink
      self.vendorInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow) {
            $state.go('apiv.detail', { pk: currentRow.vendno, pk2: currentRow.shipfmno });
         }
      };

      // called from Direction column in the main grid 
      self.directionFormatter = function (row, cell, value) {
         if (value) {
            switch (value.toLowerCase()) {
               case 'i':                                                                           //ignore jslint - correct indentation 
                  return $translate.instant('global.inbound');                                     //ignore jslint - correct indentation 
               case 'o':                                                                           //ignore jslint - correct indentation 
                  return $translate.instant('global.outbound');                                    //ignore jslint - correct indentation                                 //ignore jslint - correct indentation 
               default:                                                                            //ignore jslint - correct indentation 
                  return value;                                                                    //ignore jslint - correct indentation 
            }
         } else {
            return $translate.instant('global.none');

         }
      }; // directionFormatter

   }; // extendMasterController

   this.extendBaseController = function (self) {

      // Customer hyperlink
      self.customerHyperlink = function (customer) {
         if (customer) {
            $state.go('aric.detail', { pk: customer });
         }
      };

      // Ship To hyperlink
      self.shipToHyperlink = function (customer, shipto) {
         if (customer && shipto) {
            $state.go('aric.detail', { pk: customer, pk2: shipto });
         }
      };

      // Vendor hyperlink
      self.vendorHyperlink = function (vendor) {
         if (vendor) {
            $state.go('apiv.detail', { pk: vendor });
         }
      };

      // Ship From hyperlink
      self.shipFromHyperlink = function (vendor, shipfrom) {
         if (vendor && shipfrom) {
            $state.go('apiv.detail', { pk: vendor, pk2: shipfrom });
         }
      };

      // called from Level column in the main grid and Detail Sub Title 
      self.levelFormatter = function (row, cell, value) {
         if (value) {
            switch (value.toLowerCase()) {
               case 'global':                                                                      //ignore jslint - correct indentation 
                  return $translate.instant('global.global');                                      //ignore jslint - correct indentation 
               case 'company':                                                                     //ignore jslint - correct indentation 
                  return $translate.instant('global.company');                                     //ignore jslint - correct indentation 
               case 'customer':                                                                    //ignore jslint - correct indentation 
                  return $translate.instant('global.customer');                                    //ignore jslint - correct indentation 
               case 'shipto':                                                                      //ignore jslint - correct indentation 
                  return $translate.instant('global.ship.to');                                     //ignore jslint - correct indentation 
               case 'vendor':                                                                      //ignore jslint - correct indentation 
                  return $translate.instant('global.vendor');                                      //ignore jslint - correct indentation 
               case 'shipfmno':                                                                    //ignore jslint - correct indentation 
                  return $translate.instant('global.ship.from');                                   //ignore jslint - correct indentation 
               default:                                                                            //ignore jslint - correct indentation 
                  return value;                                                                    //ignore jslint - correct indentation 
            }
         } else {
            return value;
         }
      }; // levelFormatter

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      // Called when the user changes Level in the Search
      self.rulelevelChanged = function () {
         self.search();
      };

      // Load the Rule dropdown for the selected Category (called from the Search Category dropdown)
      self.loadSearchRules = function () {
         var params = {
            cCategory: self.criteria.category || 'Show All',
            lincludeshowall: false
         };

         DataService.get('api/sa/assasetup/sasbrruleload/' + params.cCategory + '/' + params.lincludeshowall, { busy: true }, function (ruletypes) {
            if (ruletypes) {
               self.sasbrSearchRules = ruletypes;
               self.search();
            }
         });
      }; // loadSearchRules

      self.search = function () {

         var criteria = {
            category: self.criteria.category || 'Show All',
            ruletype: self.criteria.ruletype || 'Show All',
            rulelevel: self.criteria.rulelevel || 'Show All',
            direction: self.criteria.direction || 'a',
            dochandler: self.criteria.dochandler || '',
            nodenm: self.criteria.nodenm || '',
            attrnm: self.criteria.attrnm || '',
            rulevalue: self.criteria.rulevalue || '',
            recordcountlimit: 0,
            userfield: ''
         };

         // Load the main grid
         DataService.post('api/sa/assasetup/sasbrload/', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (noHardErrors(data)) { self.dataset = data.sasbrresults; }
            }
         });


      }; // search                

      self.initBase = function () {
         self.sasbrCategories = [];
         self.sasbrSearchRules = [];
         self.sasbrDetailRules = [];
         self.sasbr = [];
         self.sasbrmaint = [];
         self.sasbrresults = [];
      }; // initBase

      self.initBase();

   }; // extendBaseController

   this.extendDetailController = function (self, base, sasbr, scope, stateParams) {

      // Load Sub Title with the Rule Description and Level
      self.getSubTitle = function () {

         var ruledescrip = stateParams.object.ruledescrip || '';
         var level = stateParams.object.level || '';
         if (level) {
            level = base.levelFormatter(0, 0, level);
            level = ' | ' + level + ' ' + $translate.instant('global.level');
         }

         return (ruledescrip || '') + (level || '');
      }; // getSubTitle

      // Load the displayed Extended Description (some business rule templates exceed the max allowable width for a Text Area) 
      self.getExtendedDescrip = function (extdescrip) {
         return (extdescrip) ? extdescrip.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
      }; // getExtendedDescrip 

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;
         // add specific validation here
         return isValid;
      }; // validateForm

      self.customSubmit = function () {
         // Perform UI validation
         var isValid = self.validateForm();
         if (isValid) {
            self.submit();
         }
      }; // customSubmit

      self.customReset = function () {
         // not in create mode
         self.reset();
      }; // customReset

   }; // extendDetailController

   this.extendCreateController = function (self, base) {

      /*
         There are 2 datasets passed from the Service Interface calls: 
            sasbrmaint   - controls the screen behavior and is mapped on the Detail screen to dtl.sasbrmaint  
            sasbrresults - contains the record data and is mapped on the Detail screen to dtl.sasbr  

         There is no sasbr record in the database. The actual business rule record is stored in the sxxmlrule table.

         If the business rule already exists in the sxxmlrule table with the same keys the record will be updated in the SI call 
         instead of creating an error the record already exists.

      */

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      // Load the Rule dropdown for the selected Category (called from the Detail Category dropdown)
      self.loadDetailRules = function (category) {
         var params = {
            cCategory: category || 'Show All',
            lincludeshowall: false
         };

         DataService.get('api/sa/assasetup/sasbrruleload/' + params.cCategory + '/' + params.lincludeshowall, { busy: true }, function (ruletypes) {
            if (ruletypes) {
               self.sasbrDetailRules = ruletypes;
            }
         });
      }; // loadDetailRules

      // Convert tradingPartnervalues return from SI call to the dropdown dataset
      // Note - tradingPartnervalues changes dynamically with every business rule based on the levels checked for the template in SASTT - Business Rules setup
      self.buildTradingPartnerDataSet = function () {
         self.tradingPartnerDataSet = [];
         if (self.sasbrmaint.tradingPartnervalues) {
            // convert string to an array
            var tmparray = self.sasbrmaint.tradingPartnervalues.split(',');
            var arraysize = tmparray.length;
            var index;
            for (index = 0; index < arraysize; index += 2) {
               var option = {
                  'type': 'OPT',
                  'label': tmparray[index],
                  'value': tmparray[index + 1]
               };
               self.tradingPartnerDataSet.push(option);
            }
         }
      }; // buildTradingPartnerDataSet

      // This is called each type the Rule value dropdown is changed in Detail screen while in Create mode (it will NOT create a new business rule)
      // Note - This will dynamically setup the rest of the Detail screen based on the template in 'SASTT - Business Rules setup' for the selected business rule  
      self.changeRuleType = function () {
         var params = {
            cfunction: 'Create',
            cCategory: self.sasbrmaint.category,
            cRuleType: self.sasbrmaint.cbRule,
            sasbrresults: self.sasbr
         };

         DataService.post('api/sa/assasetup/sasbrdetail', { data: params, busy: true }, function (data) {
            if (data) {
               self.sasbrmaint = data.sasbrmaint;
               self.sasbrmaint.category = params.cCategory;
               self.sasbr = data.sasbrresults;
               self.buildTradingPartnerDataSet();

               //For New rows, they should be set to "None" (blank) by default.
               if (!self.sasbr.direction) {
                  self.sasbr.direction = '';
               }
            }
         });

      }; // changeRuleType

      self.customReset = function () {
         // if creating a new business rule then we reset the data from the template setup in SASTT otherwise just reset the screen 
         if (base.isCreate() && self.sasbrmaint.cbRule) {
            self.fieldChanged('btnClear');
         } else {
            self.reset();
         }
      }; // customReset

      // Called when the user changes specific fields in the Detail screen to reset the form based on the business rule template 
      // Note - fiCustno, fiShipTo, fiVendno, fiShipfmno have been excluled intentionally for HTML5 since we already display the name, etc. with the lookups
      self.fieldChanged = function (fieldchanged) {
         var cCategory = self.sasbrmaint.category;

         var params = {
            cfieldname: fieldchanged,
            sasbrmaint: self.sasbrmaint,
            sasbrresults: self.sasbr
         };

         // no busy indicator by design since the user is just navigating around the screen
         DataService.post('api/sa/assasetup/sasbrfieldchange', { data: params }, function (data) {
            if (noHardErrors(data)) {
               self.sasbrmaint = data.sasbrmaint;
               self.sasbrmaint.category = cCategory;
               self.sasbr = data.sasbrresults;
            }
         });

      }; // fieldChanged

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;
         // add specific validation here
         return isValid;
      }; // validateForm

      self.customSubmit = function () {
         // Perform UI validation
         var isValid = self.validateForm();
         if (isValid) {
            self.submit();
         }
      }; // customSubmit

      self.initCreate = function () {
         self.sasbrDetailRules = {};
         self.sasbrmaint = {};
         self.sasbr = {};

         // base and detail screens will always have the same buisiness rule cateories
         self.sasbrCategories = base.sasbrCategories;

         // default Category dropdown to what was selected in the Search
         self.sasbrmaint.category = base.criteria.category;
         // default Rule dropdown to what was selected in Search 
         self.sasbrmaint.cbRule = base.criteria.ruletype;

         // Load the Detail Rule dropdown (if Rule is not 'Show All' the business rule template will be presented)
         self.loadDetailRules(self.sasbrmaint.category);
         self.changeRuleType();
      }; // initCreate

      self.initCreate();

   }; // extendCreateController

   this.createRecord = function (self, base, sasbr, scope, callback) {

      self.sasbrmaint.cfunction = 'Create';
      switch (self.sasbr.tradingpartner.toLowerCase()) {
         case 'c':                                                                                                   //ignore jslint - correct indentation 
            self.sasbrmaint.custVend = self.sasbr.custno;                                                            //ignore jslint - correct indentation 
            self.sasbrmaint.shipFromTo = self.sasbr.shipto;                                                          //ignore jslint - correct indentation 
            break;                                                                                                   //ignore jslint - correct indentation 
         case 'v':                                                                                                   //ignore jslint - correct indentation 
            self.sasbrmaint.custVend = self.sasbr.vendno;                                                            //ignore jslint - correct indentation 
            self.sasbrmaint.shipFromTo = (!self.sasbr.shipfmno) ? '' : self.sasbr.shipfmno.toString();               //ignore jslint - correct indentation 
            break;                                                                                                   //ignore jslint - correct indentation 
         case 'n':                                                                                                   //ignore jslint - correct indentation 
            self.sasbrmaint.custVend = 0;                                                                            //ignore jslint - correct indentation 
            self.sasbrmaint.shipFromTo = '';                                                                         //ignore jslint - correct indentation 
            break;                                                                                                   //ignore jslint - correct indentation 
      }

      var params = {
         sasbrmaint: self.sasbrmaint,
         sasbrresults: self.sasbr
      };

      DataService.post('api/sa/assasetup/sasbrsave', { data: params, busy: true }, function () {
         callback(sasbr);
      });

   }; // createRecord

   this.updateRecord = function (self, base, sasbr, scope, callback) {

      self.sasbrmaint.cfunction = 'Update';

      var params = {
         sasbrmaint: self.sasbrmaint,
         sasbrresults: self.sasbr
      };

      DataService.post('api/sa/assasetup/sasbrsave', { data: params, busy: true }, function () {
         callback(sasbr);
      });

   }; // updateRecord

   this.deleteRecord = function (self, base, sasbr, scope, callback) {

      var sasbrresults = [];
      sasbrresults.push(sasbr);

      DataService.post('api/sa/assasetup/sasbrdelete', { data: sasbrresults, busy: true }, function () {
         // no data returned
         callback();
      });

   }; // deleteRecord

   this.deleteMultiple = function (self, base, records, scope, callback) {

      var sasbrresults = [];
      records.forEach(function (record) {
         sasbrresults.push(record);
      });

      DataService.post('api/sa/assasetup/sasbrdelete', { data: sasbrresults, busy: true }, function () {
         // no data returned
         callback();
      });

   }; // deleteMultiple

});  // SasbrService




