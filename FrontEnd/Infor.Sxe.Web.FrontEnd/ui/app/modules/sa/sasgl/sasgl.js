'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasgl',
      dataPath: 'api/sa/sasgl',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasgl/lookup',
      searchResultsField: 'salocaltaxlookupresults',
      resultsRowIdField: 'rowidSasgl',
      createStateView: 'sa/sasgl/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sasgl/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sa/assasetup/sasglcopy',
      detailSubTitle: [
         { label: null, value: 'state' },
         { label: null, value: 'taxauth' }
      ],
      recentlyVisited: {
         title: { label: 'global.province', value: 'state' },
         description: { label: 'global.authority', value: 'taxauth' }
      }
   });
});

app.service('SasglService', function ($state, Constants, ConfigService, DataService, Utils, Sasc) {

   var glSaveCriteria = {};

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromstate = stateParams.object.state;
      request.fromtaxauth = stateParams.object.taxauth;
      request.tostate = stateParams.object.state;
      request.totaxauth = stateParams.object.taxauth;
   };

   this.extendCreateController = function (self) {
      self.sasgl.descrip = '';
   };

   this.updateRecord = function (self, base, sasgl, scope, callback) {

      // Need to save the data to the record before executing the call that will save the GL accounts
      // Was not saving any changes to the GL accounts if the GL was updated first
      DataService.put('api/sa/sasgl', { data: sasgl }, function () {

         if (glSaveCriteria) {

            DataService.post('api/sa/assasetup/sasglglsave', { data: glSaveCriteria, busy: true }, function () {
               callback();
            });
         } else {
            callback();
         }
      });
   };

   this.extendDetailController = function (self, base, sasgl) {

      sasgl.$promise.then(function () {

         // Make sure that the state and tax authority are loaded to prevent an error
         if (sasgl.state && sasgl.taxauth) {

            // Get data needed for detail screen
            DataService.get('api/sa/assasetup/sasglload/' + sasgl.state + '/' + sasgl.taxauth, function (data) {
               if (data) {

                  // Make the data visible in the detail section
                  self.localResults = data;

                  // Load the data to be displayed in the grid
                  self.taxRates = [
                     { taxgroup: self.localResults.taxgroupnm1, pst: self.localResults.saletax1, gst: self.localResults.saletaxo1, total: self.localResults.saletaxtot1 },
                     { taxgroup: self.localResults.taxgroupnm2, pst: self.localResults.saletax2, gst: self.localResults.saletaxo2, total: self.localResults.saletaxtot2 },
                     { taxgroup: self.localResults.taxgroupnm3, pst: self.localResults.saletax3, gst: self.localResults.saletaxo3, total: self.localResults.saletaxtot3 },
                     { taxgroup: self.localResults.taxgroupnm4, pst: self.localResults.saletax4, gst: self.localResults.saletaxo4, total: self.localResults.saletaxtot4 },
                     { taxgroup: self.localResults.taxgroupnm5, pst: self.localResults.saletax5, gst: self.localResults.saletaxo5, total: self.localResults.saletaxtot5 }
                  ];

               } else {
                  // Load default data to be displayed in the grid
                  self.taxRates = [
                     { taxgroup: Sasc.taxgroupnm1, pst: 0, gst: 0, total: 0 },
                     { taxgroup: Sasc.taxgroupnm2, pst: 0, gst: 0, total: 0 },
                     { taxgroup: Sasc.taxgroupnm3, pst: 0, gst: 0, total: 0 },
                     { taxgroup: Sasc.taxgroupnm4, pst: 0, gst: 0, total: 0 },
                     { taxgroup: Sasc.taxgroupnm5, pst: 0, gst: 0, total: 0 }
                  ];

               }
            });
         }

      });

      // Determine if the cells in the GST Rate column of the grid should be editable
      self.isGstCellEditable = function (row, cell, value, column, item) {

         // If the tax group is blank, the GST column is not enterable.  Otherwise the column is enterable.
         if (self.localResults['taxgroupnm' + (row + 1)]) {
            return true;
         } else {
            return false;
         }

      };

      // If the user changes the GST tax rate, update the total tax rate in the grid
      self.gstValueChange = function (e, args) {
         if (args && args.value !== args.oldValue) {

            self.record = self.taxRates[args.row];
            self.record.total = self.localResults['saletax' + (args.row + 1)] + args.value;
            self.localResults['saletaxo' + (args.row + 1)] = args.value || 0;
            self.grid.loadData(self.taxRates);

         }
      };

      self.customSubmit = function () {

         var glSave = {
            state: sasgl.state,
            taxauth: sasgl.taxauth,
            provinceglno: self.localResults.provinceglno,
            gstglno: self.localResults.gstglno
         };

         glSaveCriteria = {
            sasglglsave: glSave,
            cState: sasgl.state,
            cTaxAuth: sasgl.taxauth,
            cAction: 'save'
         };

         // Store off any GST tax rate changes before saving the record as long as the tax group is not blank
         for (var i = 0; i <= 4; i++) {
            var recNum = i + 1;
            if (self.localResults['taxgroupnm' + recNum]) {
               sasgl['saletaxo' + recNum] = self.localResults['saletaxo' + recNum];
            }
         }

         self.submit();

      };

   };

});