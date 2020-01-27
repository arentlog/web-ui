'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasgg',
      dataPath: 'api/sa/sasgs',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasgs/lookup',
      searchResultsField: 'sastatetaxlookupresults',
      resultsRowIdField: 'rowidSasgs',
      createStateView: 'sa/sasgg/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sasgg/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sa/assasetup/sasggstvatcopy',
      detailSubTitle: [
         { label: null, value: 'state' },
         { label: null, value: 'descrip' }
      ],
      recentlyVisited: {
         title: { label: 'global.province', value: 'state' },
         description: { label: 'global.description', value: 'descrip' }
      }
   });
});

app.service('SasggService', function ($state, Constants, ConfigService, DataService, SecurityService) {

   var glSaveCriteria = {};

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromstate = stateParams.object.state;
      request.tostate = stateParams.object.state;
      self.descrip = stateParams.object.descrip;
   };

   this.extendCreateController = function (self) {
      self.sasgg.pstgstfl = true;
   };

   this.updateRecord = function (self, base, sasgg, scope, callback) {

      // Need to save the data to the record before executing the call that will save the GL accounts
      // Was throwing an error if the GL was updated first
      DataService.put('api/sa/sasgs', { data: sasgg }, function () {

         if (glSaveCriteria) {

            DataService.post('api/sa/assasetup/sasggstvatadditionalsave', { data: glSaveCriteria, busy: true }, function () {
               callback();
            });
         } else {
            callback();
         }
      });
   };


   this.extendDetailController = function (self, base, sasgg) {

      self.isRequiredTabReadonly = SecurityService.getSubSecurityLevel('sasgg', 'Required') < 3;
      self.isAddonsTabReadonly = SecurityService.getSubSecurityLevel('sasgg', 'Addons') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('sasgg', 'Custom') < 3;

      self.customSubmit = function () {
         var addonSaved = true;

         // The addon results prodataset will only exist if it's tab has been activated
         if (self.addonResults) {

            var addonSaveCriteria = self.addonResults;

            DataService.post('api/sa/assasetup/sasgaddonssave', { data: addonSaveCriteria, busy: true }, function (data) {
               if (data.messaging) {
                  addonSaved = false;
               }
            }, function errorCallback(response) {
               addonSaved = false;
            });
         }

         // Save the GL data from the General tab if it has been accessed and the addons saved successfully
         if (self.provResults && addonSaved) {
            glSaveCriteria = {
               state: self.provResults.state,
               callingfunction: 'sasgg',
               glyear: self.provResults.glyear,
               acctno: self.provResults.acctno,
               acctdesc: self.provResults.acctdesc,
               arcashglno: self.provResults.arcashglno,
               arcashgldesc: self.provResults.arcashgldesc,
               taxmethodty: self.provResults.taxmethodty
            };

         }

         // Proceed with standard save for SASGS if the addons and GL were saved successfully
         if (addonSaved) {
            self.submit();
         }

      };

   };

});

app.controller('SasggDetailGeneralCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var sasgg = $scope.dtl.sasgg;

   sasgg.$promise.then(function () {

      // Create a new version from an existing version
      if (sasgg.state) {
         DataService.get('api/sa/assasetup/sasggstvatload/' + sasgg.state, function (data) {
            if (data) {

               // Make the data visible in the detail section
               dtl.provResults = data;
            }
         });
      }
   });

});

app.controller('SasggDetailAddonsCtrl', function ($scope, DataService, GridService) {
   var self = this;
   var dtl = $scope.dtl;
   var sasgg = $scope.dtl.sasgg;

   sasgg.$promise.then(function () {
      var addonCriteria = {
         callingfunction: 'sasgg',
         tableRowid: sasgg.rowID
      };

      // Get the OE addons data
      DataService.post('api/sa/assasetup/sasgaddonsload', { data: addonCriteria, busy: true }, function (data) {
         if (data) {

            // Make the addon data visible to the detail section
            dtl.addonResults = data.sasgaddonsresults;

            // Make the taxability data available for the addon grid drop down
            self.taxabilityList = data.sasgaddonstaxability;

            // Make the tax group data available for the grid drop down
            // Tax group returned as a character value but is compared to an integer value so need to convert
            self.taxGroupList = data.sasgaddonstaxgroup;
            for (var i = 0; i < data.sasgaddonstaxgroup.length; i++) {
               self.taxGroupList[i].groupnum = parseInt(data.sasgaddonstaxgroup[i].groupvalue, 10);
            }

         }
      });
   });

});