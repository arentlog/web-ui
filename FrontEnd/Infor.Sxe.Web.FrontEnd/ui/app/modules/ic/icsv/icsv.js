'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsv',
      dataPath: 'api/ic/icsv',
      recordName: 'icsv',
      searchResultsField: '',
      resultsRowIdField: 'icsvRowidStr',
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: [{ label: 'global.vendor.number', value: 'vendno' }]
      }
   });
});

app.service('IcsvService', function ($state, $translate, DataService, Utils, MessageService, ConfigService) {
   this.extendBaseController = function (self) {
      self.UPCformat = {};
      self.upcprompt = '';

      self.search = function () {
         var crit = {
            vendno: self.criteria.vendno === "" ? 0 : self.criteria.vendno,
            prod: self.criteria.prod,
            recordcountlimit: ConfigService.getDefaultRecordLimit()
         }

         DataService.post('/web/api/ic/icsvrecordlist', { data: crit, busy: true }, function (data) {
            self.dataset = data.ttblicsvrecords;
         });
      };

      self.calcUPC = function (icsv) {
         return Utils.pad(icsv.section1, self.UPCformat.upclength1)
            + self.UPCformat.upcdelim //ignore jslint - line break added for readability
            + Utils.pad(icsv.section2, self.UPCformat.upclength2) //ignore jslint - line break added for readability
            + self.UPCformat.upcdelim //ignore jslint - line break added for readability
            + Utils.pad(icsv.section3, self.UPCformat.upclength3) //ignore jslint - line break added for readability
            + self.UPCformat.upcdelim //ignore jslint - line break added for readability
            + Utils.pad(icsv.section4, self.UPCformat.upclength4) //ignore jslint - line break added for readability
            + self.UPCformat.upcdelim //ignore jslint - line break added for readability
            + Utils.pad(icsv.section5, self.UPCformat.upclength5) //ignore jslint - line break added for readability
            + self.UPCformat.upcdelim //ignore jslint - line break added for readability
            + Utils.pad(icsv.section6, self.UPCformat.upclength6); //ignore jslint - line break added for readability
      };

      self.initialize = function () {
         DataService.get('api/ic/asicsetup/icsvinitiate', function (data) {
            if (data) {
               self.UPCformat = data;
               self.upcprompt = data.upcprompt;

               //User Hook (do not rename)
               if (self.initializeContinue) {
                  self.initializeContinue();
               };
            }
         });
      };

      self.mask = function (length) {
         length = length || 0;
         return Utils.pad("", length, "#");
      };

      self.initialize();
   };

   this.extendSearchController = function (self, base) {
      base.criteria.type = 'u';
   };

   this.extendMasterController = function (self) {
      self.UPCtype = function (row, cell, value) {
         if (value) {
            switch (value) { //ignore jslint - created as a switch for future extendability
               case 'u': //ignore jslint - correct indentation
                  return $translate.instant('global.upc.number'); //ignore jslint - correct indentation
               default: //ignore jslint - correct indentation
                  return value; //ignore jslint - correct indentation
            }
         } else {
            return value;
         }
      };
   };

   this.extendDetailController = function (self, base, icsv) {
      self.upcnoSave = '';

      self.UPC = function () {
         return base.calcUPC(icsv);
      };

      self.initialize = function () {
         icsv.$promise.then(function () {
            self.upcnoSave = self.UPC();
            DataService.post('api/ic/asicsetup/icsvrowselect', { data: icsv, busy: true }, function (data) {
               //Nothing specific to do with the response, this provides validation

               //User Hook (do not rename)
               if (self.initializeContinue) {
                  self.initializeContinue();
               }
            });
         });
      };

      self.fieldLeave = function (fieldName) {
         var requestCriteria = {
            icsv: icsv,
            cField: fieldName
         };

         DataService.post('api/ic/asicsetup/icsvfieldleave', { data: requestCriteria, busy: true }, function (data) {
            //Nothing specific to do with the response, this just provides validation

            //User Hook (do not rename)
            if (self.fieldLeaveContinue) {
               self.fieldLeaveContinue();
            }
         });
      };

      self.customSubmit = function () {
         if (self.upcnoSave !== self.UPC()) {
            var requestCriteria = {
               ttblicswstatuschgfl: {
                  prod: self.icsv.prod,
                  whse: ''
               }
            };

            /*Process All Warehouses.*/
            DataService.post('/web/api/ic/icswupdateedi852statuschg', { data: requestCriteria, busy: true }, function (data) {
               self.submit();
            });
         } else {
            self.submit();
         }
      };

      self.initialize();

   };

   this.extendCreateController = function (self, base, icsv) {
      icsv.type = 'u';
      icsv.section1 = 0;
      icsv.section2 = 0;
      icsv.section3 = 0;
      icsv.section4 = 0;
      icsv.section5 = 0;
      icsv.section6 = 0;

      self.UPC = function () {
         return base.calcUPC(icsv);
      };

      self.fieldLeave = function (fieldName) {
         if (!icsv.vendno) {
            MessageService.error('global.error', 'message.vendor.is.required');
         } else if (!icsv.prod) {
            MessageService.error('global.error', 'message.product.is.required');
         } else {
            var requestCriteria = {
               icsv: icsv,
               cField: fieldName
            };

            DataService.post('api/ic/asicsetup/icsvfieldleave', { data: requestCriteria, busy: true }, function (data) {
               //Nothing specific to do with the response, this just provides validation

               //User Hook (do not rename)
               if (self.fieldLeaveContinue) {
                  self.fieldLeaveContinue();
               }
            });
         }
      };

      self.customSubmit = function () {
         //Turn around and immediately call the standard.
         self.submit();
      };
   };
});
