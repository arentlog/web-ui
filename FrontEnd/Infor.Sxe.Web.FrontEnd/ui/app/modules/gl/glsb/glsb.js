'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'gl',
      menuFn: 'glsb',
      dataPath: 'api/gl/glsb',
      searchMethod: 'POST',
      searchPath: 'api/gl/glsb/lookup',
      searchResultsField: 'glbdgaccountlookupresults',
      resultsRowIdField: 'rowidGlsb',
      createStateView: 'gl/glsb/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'gl/glsb/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/gl/asglsetup/glsbcopy',
      primaryKeyParams: ['gldivno', 'gldeptno', 'glacctno', 'glsubno', 'revno', 'yr'],
      searchCriteria: {
         year: parseInt(new Date().getFullYear().toString().substr(2, 2), 10),
         yr: parseInt(new Date().getFullYear().toString().substr(2, 2), 10),
         recordcountlimit: 200
      },
      recentlyVisited: {
         title: { label: 'global.year', value: 'yr' },
         description: [
            { label: 'global.division', value: 'gldivno' },
            { label: 'global.department', value: 'gldeptno' },
            { label: 'global.account.number', value: 'glacctno' },
            { label: 'global.sub.account.number', value: 'glsubno' },
            { label: 'global.revision', value: 'revno' }
         ]
      }
   });
});

app.service('GlsbService', function (MessageService, Sasoo, $state, Sasc, Utils, DataService, ConfigService) {
   this.extendMasterController = function (self, base) {
      // Advanced search criteria object with initial values
      self.advCriteria = {
         yr: parseInt(new Date().getFullYear().toString().substr(2, 2), 10),
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'lookupnm', label: MessageService.get('global.lookup.name') },
         { value: 'yr', label: MessageService.get('global.year') },
         { value: 'gldivno', label: MessageService.get('global.division') },
         { value: 'glacctno', label: MessageService.get('global.account') },
         { value: 'gldeptno', label: MessageService.get('global.department') },
         { value: 'glsubno', label: MessageService.get('global.sub.account.number') },
         { value: 'revno', label: MessageService.get('global.revision') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['yr'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/gl/glsb/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.glbdgaccountlookupresults;
            }
         });
      };
   };
   this.updateRecord = function (self, base, glsb, scope, callback) {
      self.amounts.rowidGlsb = glsb.rowID;

      if (glsb.budgettype) {
         self.amounts.peramt1 = self.budgetAmounts[0].peramt;
         self.amounts.peramt2 = self.budgetAmounts[1].peramt;
         self.amounts.peramt3 = self.budgetAmounts[2].peramt;
         self.amounts.peramt4 = self.budgetAmounts[3].peramt;
         self.amounts.peramt5 = self.budgetAmounts[4].peramt;
         self.amounts.peramt6 = self.budgetAmounts[5].peramt;
         self.amounts.peramt7 = self.budgetAmounts[6].peramt;
         self.amounts.peramt8 = self.budgetAmounts[7].peramt;
         self.amounts.peramt9 = self.budgetAmounts[8].peramt;
         self.amounts.peramt10 = self.budgetAmounts[9].peramt;
         self.amounts.peramt11 = self.budgetAmounts[10].peramt;
         self.amounts.peramt12 = self.budgetAmounts[11].peramt;

      } else {
         self.amounts.budpct1 = self.budgetAmounts[0].budpct;
         self.amounts.budpct2 = self.budgetAmounts[1].budpct;
         self.amounts.budpct3 = self.budgetAmounts[2].budpct;
         self.amounts.budpct4 = self.budgetAmounts[3].budpct;
         self.amounts.budpct5 = self.budgetAmounts[4].budpct;
         self.amounts.budpct6 = self.budgetAmounts[5].budpct;
         self.amounts.budpct7 = self.budgetAmounts[6].budpct;
         self.amounts.budpct8 = self.budgetAmounts[7].budpct;
         self.amounts.budpct9 = self.budgetAmounts[8].budpct;
         self.amounts.budpct10 = self.budgetAmounts[9].budpct;
         self.amounts.budpct11 = self.budgetAmounts[10].budpct;
         self.amounts.budpct12 = self.budgetAmounts[11].budpct;
      }
      
      DataService.post('api/gl/asglsetup/glsbsavechanges', { data: self.amounts, busy: true }, function (data) {

            callback(data);

      });

   };
   this.extendSearchController = function (self, base) {
      base.criteria.yr = base.criteria.year;

   };
   this.extendDetailController = function (self, base, glsb, stateParams) {
      self.pctchg = 0;
      self.calcmethod = 'n';
      base.rowid = stateParams.rowID;

      self.getSubTitle = function () {
         return MessageService.get('global.year') + ': ' + glsb.yr + ' | ' +
            MessageService.get('global.account') + ': ' + base.glno + ' | ' +
            MessageService.get('global.revision') + ' : ' + glsb.revno;
      };

      self.entryTypeChanged = function () {
         self.grid.loadData(self.budgetAmounts);
      };

      self.isAmountEditable = function () {
         if (glsb.budgettype) {
            return true;
         } else {
            return false;
         }
      };

      self.isPercentEditable = function () {
         if (!glsb.budgettype) {
            return true;
         } else {
            return false;
         }
      };

      self.loadBudgetAmounts = function () {
         self.budgetAmounts = [
            { period: self.amounts.periodlbl1, peramt: self.amounts.peramt1, budpct: self.amounts.budpct1, budytd: self.amounts.budytd1, pctytd: self.amounts.pctytd1, actual: self.amounts.actual1 },
            { period: self.amounts.periodlbl2, peramt: self.amounts.peramt2, budpct: self.amounts.budpct2, budytd: self.amounts.budytd2, pctytd: self.amounts.pctytd2, actual: self.amounts.actual2 },
            { period: self.amounts.periodlbl3, peramt: self.amounts.peramt3, budpct: self.amounts.budpct3, budytd: self.amounts.budytd3, pctytd: self.amounts.pctytd3, actual: self.amounts.actual3 },
            { period: self.amounts.periodlbl4, peramt: self.amounts.peramt4, budpct: self.amounts.budpct4, budytd: self.amounts.budytd4, pctytd: self.amounts.pctytd4, actual: self.amounts.actual4 },
            { period: self.amounts.periodlbl5, peramt: self.amounts.peramt5, budpct: self.amounts.budpct5, budytd: self.amounts.budytd5, pctytd: self.amounts.pctytd5, actual: self.amounts.actual5 },
            { period: self.amounts.periodlbl6, peramt: self.amounts.peramt6, budpct: self.amounts.budpct6, budytd: self.amounts.budytd6, pctytd: self.amounts.pctytd6, actual: self.amounts.actual6 },
            { period: self.amounts.periodlbl7, peramt: self.amounts.peramt7, budpct: self.amounts.budpct7, budytd: self.amounts.budytd7, pctytd: self.amounts.pctytd7, actual: self.amounts.actual7 },
            { period: self.amounts.periodlbl8, peramt: self.amounts.peramt8, budpct: self.amounts.budpct8, budytd: self.amounts.budytd8, pctytd: self.amounts.pctytd8, actual: self.amounts.actual8 },
            { period: self.amounts.periodlbl9, peramt: self.amounts.peramt9, budpct: self.amounts.budpct9, budytd: self.amounts.budytd9, pctytd: self.amounts.pctytd9, actual: self.amounts.actual9 },
            { period: self.amounts.periodlbl10, peramt: self.amounts.peramt10, budpct: self.amounts.budpct10, budytd: self.amounts.budytd10, pctytd: self.amounts.pctytd10, actual: self.amounts.actual10 },
            { period: self.amounts.periodlbl11, peramt: self.amounts.peramt11, budpct: self.amounts.budpct11, budytd: self.amounts.budytd11, pctytd: self.amounts.pctytd11, actual: self.amounts.actual11 },
            { period: self.amounts.periodlbl12, peramt: self.amounts.peramt12, budpct: self.amounts.budpct12, budytd: self.amounts.budytd12, pctytd: self.amounts.pctytd12, actual: self.amounts.actual12 }
         ];

         if (self.amounts.gl13perfl) {
            self.budgetAmounts.push({ period: self.amounts.periodlbl13, peramt: self.amounts.peramt13, budpct: self.amounts.budpct13, budytd: self.amounts.budytd13, pctytd: self.amounts.pctytd13, actual: self.amounts.actual13 });
         }
      };

      self.getInitialAmounts = function () {
         var criteria = {
            rowidGlsb: glsb.rowID
         };

         DataService.post('api/gl/asglsetup/glsbreqinit', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.amounts = data;
               self.loadBudgetAmounts();
            }
         });
      };

      self.createDivisions = function () {
         var criteria = {
            rowidGlsb: glsb.rowID
         };

         DataService.post('api/gl/asglsetup/glsbdivcreate', { data: criteria, busy: true }, function (divdata) {
            if (divdata.toString()) {
               self.message = divdata.toString();
               MessageService.info('global.information', self.message);
            }
         });
      };


      self.recalculateBudget = function () {
         var criteria = {
            rowidGlsb: glsb.rowID,
            entty: glsb.budgettype,
            annbud: glsb.annbud,
            calcmethod: self.calcmethod,
            pctchg: self.pctchg
         };

         DataService.post('api/gl/asglsetup/glsbreqcalc', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.amounts = data;
               self.loadBudgetAmounts();
            }
         });
      };

      glsb.$promise.then(function () {
         var criteria = {
            yr: glsb.yr,
            gldivno: glsb.gldivno,
            gldeptno: glsb.gldeptno,
            glacctno: glsb.glacctno,
            glsubno: glsb.glsubno,
            revno: glsb.revno
         };
         DataService.post('api/gl/glsb/lookup', { data: criteria, busy: true }, function (data) {
            base.glno = data.glbdgaccountlookupresults[0].glno;
         });

         self.getInitialAmounts();
      });
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      self.getSubTitle = function () {
         return MessageService.get('global.year') + ': ' + self.yr + ' | ' +
            MessageService.get('global.account') + ': ' + stateParams.object.glno + ' | ' +
            MessageService.get('global.revision') + ' : ' + stateParams.object.revno;
      };

      self.request.toglno = stateParams.object.glno;
      var fieldList = 'yr';

      DataService.getResource('api/gl/glsb/getbyrowid/' + stateParams.object.rowidGlsb + '?fldlist=' + fieldList, function (data) {
         if (data) {
            self.yr = data.yr;
         }
         self.request.toyr = self.yr;
      });


   };

   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {
      var criteria = {
         toyr: self.request.toyr,
         toglno: self.request.toglno,
         torevno: self.request.torevno,
         rowidGlsb: stateParams.object.rowidGlsb
      };

         DataService.post('api/gl/asglsetup/glsbcopy', { data: criteria, busy: true }, function (data) {
            callback(data);
         });

   };
   this.createRecord = function (self, base, glsb, scope, callback) {
      var criteria = {
         yr: self.glsb.yr,
         glno: self.glsb.glno,
         revno: self.glsb.revno
      };

      DataService.post('api/gl/asglsetup/glsbcreate', { data: criteria, busy: true }, function (data) {
         if (data) {
            var dummyglsb = {
               rowID: data.rowidGlsb
            };
            callback(dummyglsb);
         }
      });
   };

   this.extendCreateController = function (self) {
      self.budgettype = false;
      self.calcmethod = 'n';


   };

});