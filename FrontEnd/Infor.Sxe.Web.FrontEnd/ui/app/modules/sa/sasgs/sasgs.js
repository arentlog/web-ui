'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasgs',
      dataPath: 'api/sa/sasgm',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasgm/lookup',
      searchResultsField: 'sataxmasterlookupresults',
      searchCriteria: { taxgroup: 1 },
      resultsRowIdField: 'rowidSasgm',
      createStateView: 'sa/sasgs/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sasgs/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sa/assasetup/sasgscopy',
      recentlyVisited: {
         title: { label: 'global.type', valueFunction: 'base.formatType' },
         description: [{ label: 'global.group', valueFunction: 'base.formatTaxGroup' },
         { label: 'global.jurisdiction', valueFunction: 'base.formatJurisdiction' }]
      }
   });
});

app.service('SasgsService', function ($state, AodataService, Constants, ConfigService, DataService, GridService, MessageService, OptionApiService, OptionSetService, Utils, Sasc, SecurityService) {

   var glSaveCriteria = {};
   var glSaved = false;

   this.extendBaseController = function (self) {

      OptionSetService.get('SA', 'RecType', function (set) {
         self.recTypes = set.children;
      });

      OptionApiService.get('TaxGroup', function (set) {
         self.taxGroups = set;
      });

      // Build 'Apply To' drop-down
      self.flatExciseApply = [
         { value: 'L', label: MessageService.get("global.line") },
         { value: 'U', label: MessageService.get("global.unit") }
      ];

      // Add Taxation Weight to dropdown when using expanded tax groups
      if (AodataService.getValue('TAX', 'ExpandedTaxGroups').toLowerCase() === 'yes') {
         self.flatExciseApply.push({ value: 'W', label: MessageService.get("global.taxation.weight") })
      }

      self.formatType = function (sasgs) {
         if (sasgs.recty && self.recTypes) {
            for (var i = 0; i < self.recTypes.length; i++) {
               var type = self.recTypes[i];

               if (sasgs.recty === type.value) {
                  return type.label;
               }
            }
         }
         return '';

      };

      self.formatTaxGroup = function (sasgs) {
         if (sasgs.taxgroup) {
            var idx = self.taxGroups.findIndex(function (option) {
               return option.value === sasgs.taxgroup;
            });

            if (idx >= 0) {
               var option = self.taxGroups[idx];
               return option.label;
            }
            else {
               return sasgs.taxgroup;
            }
         }
         return '';

      };

      self.formatJurisdiction = function (sasgs) {
         var jurText = "";
         if (sasgs.recty === 1) {
            jurText = MessageService.get('global.federal');
         } else if (sasgs.recty === 2) {
            jurText = sasgs.statecd;
         } else if (sasgs.recty === 3) {
            jurText = sasgs.statecd;
            jurText += Constants.SUB_TITLE_SEPARATOR + sasgs.countycd;
         } else if (sasgs.recty === 4) {
            jurText = sasgs.statecd;
            jurText += Constants.SUB_TITLE_SEPARATOR + sasgs.countycd;
            jurText += Constants.SUB_TITLE_SEPARATOR + sasgs.citycd;
         } else {
            jurText = sasgs.statecd;
            jurText += Constants.SUB_TITLE_SEPARATOR + sasgs.countycd;
            jurText += Constants.SUB_TITLE_SEPARATOR + sasgs.citycd;
            jurText += Constants.SUB_TITLE_SEPARATOR + sasgs.othercd;
         }
         return jurText;
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromrecty = stateParams.object.recty;
      request.fromtaxgroup = stateParams.object.taxgroup;
      request.fromstatecd = stateParams.object.statecd;
      request.fromcountycd = stateParams.object.countycd;
      request.fromcitycd = stateParams.object.citycd;
      request.fromothercd = stateParams.object.othercd;
      request.torecty = stateParams.object.recty;
      request.totaxgroup = stateParams.object.taxgroup;
      request.todescrip = stateParams.object.descrip;

      self.copySubTitle = base.formatType(stateParams.object);
      self.copySubTitle += Constants.SUB_TITLE_SEPARATOR + base.formatTaxGroup(stateParams.object);
      self.copySubTitle += Constants.SUB_TITLE_SEPARATOR + base.formatJurisdiction(stateParams.object);

      if (request.torecty <= 1) {
         request.tostatecd = '';
         request.tocountycd = '';
         request.tocitycd = '';
         request.toothercd = '';
      } else if (request.torecty === 2) {
         request.tostatecd = stateParams.object.statecd;
         request.tocountycd = '';
         request.tocitycd = '';
         request.toothercd = '';
      } else if (request.torecty === 3) {
         request.tostatecd = stateParams.object.statecd;
         request.tocountycd = stateParams.object.countycd;
         request.tocitycd = '';
         request.toothercd = '';
      } else if (request.torecty === 4) {
         request.tostatecd = stateParams.object.statecd;
         request.tocountycd = stateParams.object.countycd;
         request.tocitycd = stateParams.object.citycd;
         request.toothercd = '';
      } else {
         request.tostatecd = stateParams.object.statecd;
         request.tocountycd = stateParams.object.countycd;
         request.tocitycd = stateParams.object.citycd;
         request.toothercd = stateParams.object.othercd;
      }

      self.getDescription = function () {
         var descriptionCriteria = {
            recty: request.torecty,
            taxgroup: request.totaxgroup,
            statecd: request.tostatecd,
            countycd: request.tocountycd,
            citycd: request.tocitycd,
            othercd: request.toothercd
         };

         DataService.post('api/sa/assasetup/sasgsdescription', { data: descriptionCriteria, busy: true }, function (data) {
            if (data) {
               request.todescrip = data.descrip;
            }
         });
      };

   };

   this.extendCreateController = function (self) {
      self.sasgs.maxtaxty = 'i';
      self.sasgs.orgdestcd = '2';
      self.sasgs.taxgroup = 1;
      self.sasgs.statecd = '';
      self.sasgs.countycd = '';
      self.sasgs.citycd = '';
      self.sasgs.othercd = '';

      self.getDescription = function () {
         var descriptionCriteria = {
            recty: self.sasgs.recty,
            taxgroup: self.sasgs.taxgroup,
            statecd: self.sasgs.statecd,
            countycd: self.sasgs.countycd,
            citycd: self.sasgs.citycd,
            othercd: self.sasgs.othercd
         };

         DataService.post('api/sa/assasetup/sasgsdescription', { data: descriptionCriteria, busy: true }, function (data) {
            if (data) {
               self.sasgs.descrip = data.descrip;
            }
         });
      };

   };

   this.extendMasterController = function (self, base, scope) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         taxgroup: 1,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'recty', label: MessageService.get('global.type') },
         { value: 'taxgroup', label: MessageService.get('global.group') },
         { value: 'statecd', label: MessageService.get('global.state') },
         { value: 'countycd', label: MessageService.get('global.county') },
         { value: 'citycd', label: MessageService.get('global.city') },
         { value: 'othercd', label: MessageService.get('global.other') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['recty', 'taxgroup'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/sa/sasgm/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.sataxmasterlookupresults;
            }
         });
      };

      self.recordTypeFormatter = function (row, cell, value, column, item) {

         if (value) {
            if (value === 1) {
               return MessageService.get('global.federal');
            } else if (value === 2) {
               return MessageService.get('global.state');
            } else if (value === 3) {
               return MessageService.get('global.county');
            } else if (value === 4) {
               return MessageService.get('global.city');
            } else {
               return MessageService.get('global.other');
            }

         } else {
            return value;
         }

      };

      self.taxGroupFormatter = function (row, cell, value, column, item) {

         if (value) {
            var idx = base.taxGroups.findIndex(function (option) {
               return option.value === value;
            });

            if (idx >= 0) {
               var option = base.taxGroups[idx];
               return option.label;
            }
            else {
               return value;
            }
         } else {
            return value;
         }

      };

   };

   this.updateRecord = function (self, base, sasgs, scope, callback) {

      // Need to save the data to the record before executing the call that will save the GL accounts
      // Was not saving any changes to the GL accounts if the GL was updated first
      DataService.put('api/sa/sasgm', { data: sasgs }, function () {

         if (glSaved) {

            DataService.post('api/sa/assasetup/sasgsglsave', { data: glSaveCriteria, busy: true }, function () {
               callback();
            });
         } else {
            callback();
         }
      });
   };

   this.extendDetailController = function (self, base, sasgs) {
      var subTitle = '';

      glSaved = false;

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('sasgs', 'General') < 3;
      self.isAddonsTabReadonly = SecurityService.getSubSecurityLevel('sasgs', 'Addons') < 3;
      self.isGLTabReadonly = SecurityService.getSubSecurityLevel('sasgs', 'GL') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('sasgs', 'Custom') < 3;

      sasgs.$promise.then(function () {
         subTitle = base.formatType(sasgs);
         subTitle += Constants.SUB_TITLE_SEPARATOR + base.formatTaxGroup(sasgs);
         subTitle += Constants.SUB_TITLE_SEPARATOR + base.formatJurisdiction(sasgs);
      });

      self.getSubTitle = function () {
         return subTitle;
      };

      // Perform custom submit which handles the multiple pieces of the save operation
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

         // The general ledger results prodataset will only exist if it's tab has been activated
         if (self.glResults) {

            glSaveCriteria = self.glResults;
            glSaved = true;

         }

         // Proceed with standard save for SASGS if the addons and GL were saved successfully
         if (addonSaved) {
            self.submit();
         }

      };

   };

});

app.controller('SasgsDetailGeneralCtrl', function ($scope, DataService) {
   var self = this;
   var sasgs = $scope.dtl.sasgs;

   sasgs.$promise.then(function () {
      var sasgsCriteria = {
         recty: sasgs.recty,
         taxgroup: sasgs.taxgroup,
         statecd: sasgs.statecd,
         countycd: sasgs.countycd,
         citycd: sasgs.citycd,
         othercd: sasgs.othercd,
         sasgmRowid: sasgs.rowID
      };

      // Don't make SI call if no rowID is available to find the record
      if (sasgs.rowID) {

         // Get the total tax rate to be displayed
         DataService.post('api/sa/assasetup/sasgsdisplaytotals', { data: sasgsCriteria, busy: true }, function (data) {
            if (data) {
               self.federalTotal = data.federalTot;
               self.stateTotal = data.stateTot;
               self.countyTotal = data.countyTot;
               self.cityTotal = data.cityTot;
               self.otherTotal = data.otherTot;
               self.totalRate = data.totalTot;
               self.federalTotalHidden = data.federalTothidden;
               self.stateTotalHidden = data.stateTothidden;
               self.countyTotalHidden = data.countyTothidden;
               self.cityTotalHidden = data.cityTothidden;
               self.otherTotalHidden = data.otherTothidden;
               self.totalRateHidden = data.totalTothidden;
            } else {
               self.federalTotal = 0;
               self.stateTotal = 0;
               self.countyTotal = 0;
               self.cityTotal = 0;
               self.otherTotal = 0;
               self.totalRate = 0;
               self.federalTotalHidden = true;
               self.stateTotalHidden = true;
               self.countyTotalHidden = true;
               self.cityTotalHidden = true;
               self.otherTotalHidden = true;
               self.totalRateHidden = true;
            }
         });

      }

   });

});

app.controller('SasgsDetailAddonsCtrl', function ($scope, DataService, GridService) {
   var self = this;
   var dtl = $scope.dtl;
   var sasgs = $scope.dtl.sasgs;

   sasgs.$promise.then(function () {
      var addonCriteria = {
         callingfunction: 'sasgs',
         tableRowid: sasgs.rowID
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

app.controller('SasgsDetailGLCtrl', function ($scope, DataService, MessageService, Sasc) {
   var self = this;
   var dtl = $scope.dtl;
   var sasgs = $scope.dtl.sasgs;

   sasgs.$promise.then(function () {
      var glCriteria = {
         recty: sasgs.recty,
         taxgroup: sasgs.taxgroup,
         statecd: sasgs.statecd,
         countycd: sasgs.countycd,
         citycd: sasgs.citycd,
         othercd: sasgs.othercd,
         sasgmRowid: sasgs.rowID
      };

      // Get the total tax rate to be displayed
      DataService.post('api/sa/assasetup/sasgsglload', { data: glCriteria, busy: true }, function (data) {
         if (data) {

            // Make the gl data visible to the detail section
            dtl.glResults = data;

         } else {
            // If GL data doesn't exist, make a new one
            dtl.glResults = {
               recty: sasgs.recty,
               taxgroup: sasgs.taxgroup,
               statecd: sasgs.statecd,
               countycd: sasgs.countycd,
               citycd: sasgs.citycd,
               othercd: sasgs.othercd,
               sasgmRowid: sasgs.rowID,
               glyear: Sasc.glcurfisc,
               salesglno: '',
               useglno: '',
               transitglno: '',
               exciseglno: '',
               cashsalesglno: '',
               cashuseglno: '',
               cashtransitglno: '',
               cashexciseglno: '',
               salesglnodesc: '',
               useglnodesc: '',
               transitglnodesc: '',
               exciseglnodesc: '',
               cashsalesglnodesc: '',
               cashuseglnodesc: '',
               cashtransitglnodesc: '',
               cashexciseglnodesc: '',
               cashbasislabel: '',
               cashhiddenfl: Sasc.smtaxtype
            };

         }
      });
   });

   // Validate changed GL fields
   self.glaccountChanged = function (args) {

      if (args.value) {
         DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
      }
   };

});

