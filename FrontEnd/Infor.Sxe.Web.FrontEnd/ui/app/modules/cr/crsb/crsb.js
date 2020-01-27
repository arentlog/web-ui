'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'cr',
      menuFn: 'crsb',
      dataPath: 'api/shared/crsb',
      searchMethod: 'POST',
      searchPath: 'api/shared/crsb/lookup',
      searchResultsField: 'crbanklookupresults',
      searchCriteria: {statustypecd: 'B'},
      createStateView: 'cr/crsb/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'cr/crsb/copy.json',
      copyMethod: 'POST',
      copyRequest: [],
      copyPath: 'api/shared/ascrsetup/crbankcopy',
      copySubTitle: [
         {label: null, value: 'bankno'},
         {label: null, value: 'name'}
      ],
      resultsRowIdField: 'rowidCrsb',
      recentlyVisited: {
         title: { label: 'global.bank.number', value: 'bankno' }
      }
   });
});

app.service('CrsbService', function ($state, AodataService, DataService, MessageService, MruService, Sasc, UtilsData) {

   this.extendBaseController = function (self) {
      self.banknoDropDownOptions = [];

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });
   };
      
   this.extendDetailController = function (self, base, crsb, scope) {

         self.allowAPCreditACH = AodataService.getValue('AP', 'AllowAPCreditACH');
         self.isGlDivFl = Sasc.gldivfl;
         self.divnoDropDownOptions = [];

         // The Division # drop down will be rebuilt each time (not cached) due to div# security.
         UtilsData.getDivNoDropDown('cr', function (dropDownList) {
            self.divnoDropDownOptions = dropDownList;
         });

        // When the full crsb object has been resolved, fetch the corresponding glacct data
         crsb.$promise.then(function () {

            MruService.addToList('Bank', crsb.rowpointer, crsb.bankno + ' - ' + crsb.name, crsb.bankno);

            var glfetchcriteria = { bankno: crsb.bankno };
            DataService.post('api/shared/ascrsetup/crbankglfetch', { data: glfetchcriteria, busy: true }, function (data) {
                  if (data) {
                     self.glAccountNumber = data.crbankglacct;
                  }
               });
         });
         self.clearCheckRun = function () {
            MessageService.yesNo('global.confirm', 'question.clear.check.run', function () {
               //yes callback
               crsb.chkopeninit = "";
               self.chkopeninit = "";
               self.customSubmit();
            });
         };


         self.customSubmit = function () {
            var glsavecriteria = [{ bankno: crsb.bankno, crbankglacct: self.glAccountNumber }];
            DataService.post('api/shared/ascrsetup/crbankglsave', { data: glsavecriteria, busy: true }, function (data) {
                  if (data) {
                     var params = {
                        bankno: crsb.bankno,
                        fldlist: 'gldivno,gldeptno,glacctno,glsubno'
                     };

                     DataService.get('api/shared/crsb/getbypk', { params: params, busy: true }, function (data) {
                        if (data) {
                           crsb.gldivno = data.gldivno;
                           crsb.gldeptno = data.gldeptno;
                           crsb.glacctno = data.glacctno;
                           crsb.glsubno = data.glsubno;
                           if (self.addressControl.validate()) {
                              self.submit();
                           }
                        }
                     });
                  }
               });
         };
      };

   this.extendCreateController = function (self, base, crsb) {
      self.isGlDivFl = Sasc.gldivfl;
      crsb.statustype = true; // Default bank status will set as active
      self.divnoDropDownOptions = [];

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('cr', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      self.crsbToCopy = stateParams.object;
      self.tobankno = self.crsbToCopy.bankno;
      self.name = self.crsbToCopy.name;

      self.customSubmit = function () {
         //have to reset the request here incase of error
         if (request.length > 0) {
            request.pop();
         }

         var bankCopy = {
            frombankno: self.crsbToCopy.bankno,
            tobankno: self.tobankno,
            name: self.name
         };
         request.push(bankCopy);

         self.submit();
      };
   };

});
