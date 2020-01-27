'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsoc',
      dataPath: 'api/ic/icsoc',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsocload',
      searchResultsField: '',
      resultsRowIdField: 'icsocrowid',
      recentlyVisited: {
         title: { label: 'global.level', value: 'levelcd' },
         description: [
            { label: '', valueFunction: 'base.formatRecordType' }
         ]
      }
   });
});

app.service('IcsocService', function ($state, $translate, DataService, MessageService, UserService, Utils) {

   this.extendMasterController = function (self, base, scope) {

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

      self.recordTypeList = [];

      // Load the Record Type off AO Settings
      DataService.get('api/ic/asicsetup/icsoclevelcdsinitiate', { busy: true }, function (data) {

         if (data) {
            data.forEach(function (item) {
               self.recordTypeList.push({ value: item.levelcd, label: item.levelcddesc});
            });

            if (self.recordTypeList.length) {
               self.criteria.levelcd = self.recordTypeList[0].value;
               self.includeColumn(self.criteria.levelcd);
            }
         }
      });

      // Format function for record type in recently visited display
      self.formatRecordType = function (icsoc) {
         var subTitleText;

         if (icsoc.levelcd) {
            switch (icsoc.levelcd) {
               case 1:
                  subTitleText = MessageService.get('global.customer') + ': ' + icsoc.custno;
                  if (icsoc.shipto) {
                     subTitleText += ' | ' + MessageService.get('global.ship.to') + ': ' + icsoc.shipto;
                  }
                  break;
               case 2:
               case 3:
                  subTitleText = MessageService.get('global.customer') + ': ' + icsoc.custno;
                  if (icsoc.shipto) {
                     subTitleText += ' | ' + MessageService.get('global.ship.to') + ': ' + icsoc.shipto;
                  }
                  if (icsoc.pricetype) {
                     subTitleText += ' | ' + MessageService.get('global.price.type') + ': ' + icsoc.pricetype;
                  }
                  if (icsoc.whse) {
                     subTitleText += ' | ' + MessageService.get('global.warehouse') + ': ' + icsoc.whse;
                  }
                  break;
               case 4:
               case 5:
                  subTitleText = MessageService.get('global.customer') + ': ' + icsoc.custno;
                  if (icsoc.shipto) {
                     subTitleText += ' | ' + MessageService.get('global.ship.to') + ': ' + icsoc.shipto;
                  }
                  if (icsoc.pricetype) {
                     subTitleText += ' | ' + MessageService.get('global.price.type') + ': ' + icsoc.pricetype;
                  }
                  break;
               case 6:
               case 7:
                  subTitleText = MessageService.get('global.price.type') + ': ' + icsoc.pricetype;
                  if (icsoc.custtype) {
                     subTitleText += ' | ' + MessageService.get('global.customer.type') + ': ' + icsoc.custtype;
                  }
                  if (icsoc.whse) {
                     subTitleText += ' | ' + MessageService.get('global.warehouse') + ': ' + icsoc.whse;
                  }
                  break;
               case 8:
               case 9:
                  subTitleText = MessageService.get('global.price.type') + ': ' + icsoc.pricetype;
                  if (icsoc.custtype) {
                     subTitleText += ' | ' + MessageService.get('global.customer.type') + ': ' + icsoc.custtype;
                  }
                  break;
            }
         }
         return subTitleText;
      };

      self.includeColumn = function (levelCode) {

         self.customerOK = false;
         self.shiptoOK = false;
         self.whseOK = false;
         self.pricetypeOK = false;
         self.custtypeOK = false;

         if (levelCode === 1) {
            self.customerOK = true;
            self.shiptoOK = true;
         } else if (levelCode === 2 || levelCode === 3) {
            self.customerOK = true;
            self.shiptoOK = true;
            self.whseOK = true;
            self.pricetypeOK = true;
         } else if (levelCode === 4 || levelCode === 5) {
            self.customerOK = true;
            self.shiptoOK = true;
            self.pricetypeOK = true;
         } else if (levelCode === 6 || levelCode === 7) {
            self.whseOK = true;
            self.pricetypeOK = true;
            self.custtypeOK = true;
         } else if (levelCode === 8 || levelCode === 9) {
            self.pricetypeOK = true;
            self.custtypeOK = true;
         }
      };

   };

   this.extendSearchController = function (self, base, criteria, scope) {

      // If the Record Type changes - reset the type data - keep the record type as is
      base.setResetRecordDefaults = function () {

         if (base.criteria.levelcd) {
            base.criteria.custno = 0;
            base.criteria.shipto = '';
            base.criteria.whse = '';
            base.criteria.custtype = '';
            base.criteria.pricetype = '';
         }
      };

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

         if (base.recordTypeList.length) {
            base.criteria.levelcd = base.recordTypeList[0].value;
         }
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icsoc.master');
         }

         // Load the Column Labels
         base.includeColumn(base.criteria.levelcd);

         base.search();
      };

   };

   this.extendDetailController = function (self, base, icsoc, scope) {

      // Detail Level - Sub Title Based on Record Type
      self.getSubTitle = function () {

         var subTitleText;

         subTitleText = MessageService.get('global.level') + ': ' + self.icsoc.levelcd + ' | ';

         if (self.icsoc.levelcd) {
            switch (self.icsoc.levelcd) {
               case 1:
                  subTitleText = MessageService.get('global.customer') + ': ' + self.icsoc.custno;
                  if (self.icsoc.shipto) {
                     subTitleText += ' | ' + MessageService.get('global.ship.to') + ': ' + self.icsoc.shipto;
                  }
                  break;
               case 2:
               case 3:
                  subTitleText = MessageService.get('global.customer') + ': ' + self.icsoc.custno;
                  if (self.icsoc.shipto) {
                     subTitleText += ' | ' + MessageService.get('global.ship.to') + ': ' + self.icsoc.shipto;
                  }
                  if (self.icsoc.pricetype) {
                     subTitleText += ' | ' + MessageService.get('global.price.type') + ': ' + self.icsoc.pricetype;
                  }
                  if (self.icsoc.whse) {
                     subTitleText += ' | ' + MessageService.get('global.warehouse') + ': ' + self.icsoc.whse;
                  }
                  break;
               case 4:
               case 5:
                  subTitleText = MessageService.get('global.customer') + ': ' + self.icsoc.custno;
                  if (self.icsoc.shipto) {
                     subTitleText += ' | ' + MessageService.get('global.ship.to') + ': ' + self.icsoc.shipto;
                  }
                  if (self.icsoc.pricetype) {
                     subTitleText += ' | ' + MessageService.get('global.price.type') + ': ' + self.icsoc.pricetype;
                  }
                  break;
               case 6:
               case 7:
                  subTitleText = MessageService.get('global.price.type') + ': ' + self.icsoc.pricetype;
                  if (self.icsoc.custtype) {
                     subTitleText += ' | ' + MessageService.get('global.customer.type') + ': ' + self.icsoc.custtype;
                  }
                  if (self.icsoc.whse) {
                     subTitleText += ' | ' + MessageService.get('global.warehouse') + ': ' + self.icsoc.whse;
                  }
                  break;
               case 8:
               case 9:
                  subTitleText = MessageService.get('global.price.type') + ': ' + self.icsoc.pricetype;
                  if (self.icsoc.custtype) {
                     subTitleText += ' | ' + MessageService.get('global.customer.type') + ': ' + self.icsoc.custtype;
                  }
                  break;
            }
         }
         return subTitleText;
      };

   };

   this.extendCreateController = function (self, base, icsoc, scope) {

      // Initial Defaults
      self.icsoc.custno = 0;
      self.icsoc.shipto = '';
      self.icsoc.whse = '';
      self.icsoc.custtype = '';
      self.icsoc.pricetype = '';
      self.icsoc.daymofl = false;

      // First Level Code in the Drop Down
      if (base.recordTypeList.length) {
         self.icsoc.levelcd = base.recordTypeList[0].value;
      }

      if (self.icsoc.levelcd) {
         self.icsoc.custno = 0;
         self.icsoc.shipto = '';
         self.icsoc.whse = '';
         self.icsoc.custtype = '';
         self.icsoc.pricetype = '';
         self.icsoc.daymofl = false;
      }
   };

});