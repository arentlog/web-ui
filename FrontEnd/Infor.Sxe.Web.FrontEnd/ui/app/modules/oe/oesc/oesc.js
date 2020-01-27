'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oesc',
      dataPath: 'api/sm/smsm',
      searchMethod: 'POST',
      searchPath: 'api/sm/smsm/getsmsmes',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'oe/oesc/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'oe/oesc/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sm/assmsetup/smcommissioncopy',
      detailSubTitle: [
         { label: 'global.type', value: 'commtype' },
         { label: 'global.sales.rep', value: 'slsrep' }
      ],
      recentlyVisited: {
         title: { label: 'global.commission.type', value: 'commtype' },
         description: { label: 'global.sales.rep', value: 'slsrep' }
      }
   });
});

app.service('OescService', function ($state, DataService, GridService, MessageService, UtilsData) {

   var copyCriteria = [];

   this.extendBaseController = function (self) {

      self.applyCommissionBreaks = function (commissionBreaks, oesc) {

         // Get the data from the grid on the detail screen back into the record
         for (var i = 0; i < 10; i++) {
            var obj = commissionBreaks[i];
            var breakNum = i + 1;
            oesc['targetamt' + breakNum] = obj.targetamt;
            oesc['commpctin' + breakNum] = obj.commpctin;
            oesc['commpctout' + breakNum] = obj.commpctout;
            oesc['commpctouto' + breakNum] = obj.commpctouto;
         }

      };

   };

   // The smsalesrepcopy call expects an array of data, not just a single record copy, so create the submit here
   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

      copyCriteria[0] = {
         fromcommtype: stateParams.object.commtype,
         fromslsrep: stateParams.object.slsrep,
         tocommtype: request.tocommtype,
         toslsrep: request.toslsrep
      };

      DataService.post('api/sm/assmsetup/smcommissioncopy', { data: copyCriteria, busy: true }, function (data) {
         callback(data);
      });

   };

   // Load the inital data values needed in the copy screen
   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromcommtype = stateParams.object.commtype;
      request.fromslsrep = stateParams.object.slsrep;
      request.tocommtype = stateParams.object.commtype;
      request.toslsrep = stateParams.object.slsrep;
   };

   // Load the initial values needed when creating a new sales rep
   this.extendCreateController = function (self, base, oesc, scope) {

      self.oesc.steprate = true;
      self.oesc.slsrep = '';
   };

   this.extendDetailController = function (self, base, oesc, scope) {

      // Assign the initial values
      self.salesMonthYear = MessageService.get('global.never.updated');
      self.salesQuarterYear = MessageService.get('global.never.updated');
      self.salesYear = MessageService.get('global.never.updated');
      self.commMonthYear = MessageService.get('global.never.updated');
      self.commQuarterYear = MessageService.get('global.never.updated');
      self.commYear = MessageService.get('global.never.updated');
      self.expandLabel = MessageService.get('global.sales.info');
      self.targetLabel = MessageService.get('global.target');

      // Once the record is in scope, load values from the record
      oesc.$promise.then(function () {

         // Load last updated information from the last updated date
         if (oesc.lastupddt) {

            var salesDate = new Date(oesc.lastupddt);
            var salesMonth = salesDate.getMonth() + 1;
            var salesQuarter = 0;
            var salesYear = salesDate.getFullYear();
            // salesYear = salesYear.toString().substr(2, 2);

            if (salesMonth === 1) {
               self.salesMonthYear = MessageService.get('global.january') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.1st.quarter') + ' ' + salesYear;
            } else if (salesMonth === 2) {
               self.salesMonthYear = MessageService.get('global.february') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.1st.quarter') + ' ' + salesYear;
            } else if (salesMonth === 3) {
               self.salesMonthYear = MessageService.get('global.march') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.1st.quarter') + ' ' + salesYear;
            } else if (salesMonth === 4) {
               self.salesMonthYear = MessageService.get('global.april') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.2nd.quarter') + ' ' + salesYear;
            } else if (salesMonth === 5) {
               self.salesMonthYear = MessageService.get('global.may') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.2nd.quarter') + ' ' + salesYear;
            } else if (salesMonth === 6) {
               self.salesMonthYear = MessageService.get('global.june') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.2nd.quarter') + ' ' + salesYear;
            } else if (salesMonth === 7) {
               self.salesMonthYear = MessageService.get('global.july') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.3rd.quarter') + ' ' + salesYear;
            } else if (salesMonth === 8) {
               self.salesMonthYear = MessageService.get('global.august') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.3rd.quarter') + ' ' + salesYear;
            } else if (salesMonth === 9) {
               self.salesMonthYear = MessageService.get('global.september') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.3rd.quarter') + ' ' + salesYear;
            } else if (salesMonth ===10) {
               self.salesMonthYear = MessageService.get('global.october') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.4th.quarter') + ' ' + salesYear;
            } else if (salesMonth === 11) {
               self.salesMonthYear = MessageService.get('global.november') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.4th.quarter') + ' ' + salesYear;
            }
               else {
               self.salesMonthYear = MessageService.get('global.december') + ' ' + salesYear;
               self.salesQuarterYear = MessageService.get('global.4th.quarter') + ' ' + salesYear;
            }


            self.salesYear = salesDate.getFullYear();
            self.commMonthYear = self.salesMonthYear;
            self.commQuarterYear = self.salesQuarterYear;
            self.commYear = salesDate.getFullYear();
         }

         // Load expandable area label based on interval, target and based on values
         if (!oesc.interval || oesc.interval === 'O' || oesc.interval === 'L') {
            self.expandLabel = MessageService.get('global.sales.info');
         } else if (!oesc.targettype || oesc.targettype === 'X') {
            self.expandLabel = MessageService.get('global.sales.info');
         } else if (oesc.targettype === 'S') {
            self.expandLabel = MessageService.get('global.net.sales');
         } else if (oesc.targettype === 'M') {
            self.expandLabel = MessageService.get('global.margin.amount');
         } else if (oesc.commbasedon === 'N') {
            self.expandLabel = MessageService.get('global.net.sales');
         } else if (oesc.commbasedon === 'G') {
            self.expandLabel = MessageService.get('global.gross.sales');
         } else if (oesc.commbasedon === 'M') {
            self.expandLabel = MessageService.get('global.margin.amount');
         } else {
            self.expandLabel = MessageService.get('global.sales.info');
         }

         // Load column label based on target value
         if (!oesc.targettype) {
            self.targetLabel = MessageService.get('global.target');
         } else if (oesc.targettype === 'Q' || oesc.targettype === 'X') {
            self.targetLabel = MessageService.get('global.target.percent');
         } else {
            self.targetLabel = MessageService.get('global.target.amount');
         }

         // Load the data to be displayed in the grid
         self.commissionBreaks = [
            { seqno: 1, targetamt: oesc.targetamt1, commpctout: oesc.commpctout1, commpctin: oesc.commpctin1, commpctouto: oesc.commpctouto1 },
            { seqno: 2, targetamt: oesc.targetamt2, commpctout: oesc.commpctout2, commpctin: oesc.commpctin2, commpctouto: oesc.commpctouto2 },
            { seqno: 3, targetamt: oesc.targetamt3, commpctout: oesc.commpctout3, commpctin: oesc.commpctin3, commpctouto: oesc.commpctouto3 },
            { seqno: 4, targetamt: oesc.targetamt4, commpctout: oesc.commpctout4, commpctin: oesc.commpctin4, commpctouto: oesc.commpctouto4 },
            { seqno: 5, targetamt: oesc.targetamt5, commpctout: oesc.commpctout5, commpctin: oesc.commpctin5, commpctouto: oesc.commpctouto5 },
            { seqno: 6, targetamt: oesc.targetamt6, commpctout: oesc.commpctout6, commpctin: oesc.commpctin6, commpctouto: oesc.commpctouto6 },
            { seqno: 7, targetamt: oesc.targetamt7, commpctout: oesc.commpctout7, commpctin: oesc.commpctin7, commpctouto: oesc.commpctouto7 },
            { seqno: 8, targetamt: oesc.targetamt8, commpctout: oesc.commpctout8, commpctin: oesc.commpctin8, commpctouto: oesc.commpctouto8 },
            { seqno: 9, targetamt: oesc.targetamt9, commpctout: oesc.commpctout9, commpctin: oesc.commpctin9, commpctouto: oesc.commpctouto9 },
            { seqno: 10, targetamt: oesc.targetamt10, commpctout: oesc.commpctout10, commpctin: oesc.commpctin10, commpctouto: oesc.commpctouto10 },
         ];

      });

      // If the interval, target or based on value changed, update the expandable area label and grid column label based on the new value
      self.changeCommissionData = function () {

         if (!self.oesc.interval || self.oesc.interval === 'O' || self.oesc.interval === 'L') {
            self.expandLabel = MessageService.get('global.sales.info');
         } else if (!self.oesc.targettype || self.oesc.targettype === 'X') {
            self.expandLabel = MessageService.get('global.sales.info');
         } else if (self.oesc.targettype === 'S') {
            self.expandLabel = MessageService.get('global.net.sales');
         } else if (self.oesc.targettype === 'M') {
            self.expandLabel = MessageService.get('global.margin.amount');
         } else if (self.oesc.commbasedon === 'N') {
            self.expandLabel = MessageService.get('global.net.sales');
         } else if (self.oesc.commbasedon === 'G') {
            self.expandLabel = MessageService.get('global.gross.sales');
         } else if (self.oesc.commbasedon === 'M') {
            self.expandLabel = MessageService.get('global.margin.amount');
         } else {
            self.expandLabel = MessageService.get('global.sales.info');
         }

         if (!self.oesc.targettype) {
            self.targetLabel = MessageService.get('global.target');
         } else if (self.oesc.targettype === 'Q' || self.oesc.targettype === 'X') {
            self.targetLabel = MessageService.get('global.target.percent');
         } else {
            self.targetLabel = MessageService.get('global.target.amount');
         }

         // After the values have changed, need to reload the grid so that the correct shading is applied to the cell.
         // This will force the grid to execute the editable functions
         self.grid.loadData(self.commissionBreaks);

      };

      // Determine if the cells in the target column of the grid should be editable
      self.isTargetCellEditable = function (row, cell, value, column, item) {

         // If the Target Type and the Interval are both blank, the Target column is not enterable.  Otherwise the column is enterable.
         if (self.oesc.targettype || self.oesc.interval) {
            return true;
         } else {
            return false;
         }

      }

      // Determine if the cells in the inside, outside and single columns should be editable
      self.isFirstCellEditable = function (row, cell, value, column, item) {

         // If the Target Type and the Interval are both blank, only the first row of the grid is enterable.  Otherwise all rows are enterable.
         if (row === 0) {
            return true;
         } else {
            if (self.oesc.targettype || self.oesc.interval) {
               return true;
            } else {
               return false;
            }
         }

      }

      // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
      self.referenceLookupChanged = function () {
         UtilsData.getSastnDescriptionSpecial('R', self.oesc.refer, function (descrip) {
            self.oesc.refer = descrip;
         });
      }

      // Before saving the record, apply the data from the grid back into the record
      self.customSubmit = function () {

         base.applyCommissionBreaks(self.commissionBreaks, oesc);

         self.submit();

      };
   };

});