'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsg',
      dataPath: 'api/ar/arsg',
      searchMethod: 'POST',
      searchPath: 'api/ar/arsg/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'argrouplookupresults',
      resultsRowIdField: 'rowidArsg',
      createStateView: 'ar/arsg/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ar/arsg/copy.json',
      copyMethod: 'POST',
      copyRequest: [],
      copyPath: 'api/ar/asarsetup/argroupcopy',
      recentlyVisited: {
         title: { label: 'global.group', value: 'groupid' },
         description: {label: null, value: 'name'}
      }
   });
});

app.service('ArsgService', function ($state, MessageService, ConfigService, AodataService, DataService, GridService, UserService, Utils, SecurityService) {
   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         includeinactive: false,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'lookupnm', label: MessageService.get('global.lookup.name') },
         { value: 'includeinactive', label: MessageService.get('global.include.inactive')},
         { value: 'name', label: MessageService.get('global.name') },
         { value: 'city', label: MessageService.get('global.city') },
         { value: 'state', label: MessageService.get('global.state') },
         { value: 'zipcd', label: MessageService.get('global.zip.code') },
         { value: 'phoneno', label: MessageService.get('global.phone.number') },
         { value: 'keywords', label: MessageService.get('global.keyword') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['lookupnm'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ar/arsg/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.argrouplookupresults;
            }
         });
      };
      // Status Custom Formatter
      self.statusFormatter = function (row, cell, value) {
         if (value) {
            return MessageService.get('global.active');
         } else {
            return MessageService.get('global.inactive');
         }
      };

   };

   this.extendBaseController = function (self) {
      self.getGeoCodeLookupCriteria = function (arsg) {
         return {
            tablename: 'arsg',
            groupid: arsg.groupid,
            streetaddr: arsg.addr1,
            city: arsg.city,
            state: arsg.state,
            zipcd: arsg.zipcd,
            country: arsg.countrycd,
            geocd: arsg.geocd,
            outofcityfl: arsg.outofcityfl
         };
      };
   };

   this.extendCreateController = function (self, base, arsg) {

      self.arsg.credlimappty = 'C';
      self.arsg.statustype = true;
      self.arsg.crestdt = Utils.getCurrentDate();
      self.arsg.credlim = 0;

      self.getGeoCodeLookupCriteria = function () {
         return base.getGeoCodeLookupCriteria(arsg);
      };
    //Bind default value for lookupName from name

      self.bindLookupName = function () {
         if (self.arsg.name) {
            self.arsg.lookupnm = self.arsg.name.substring(0, 15);
         }
      };
   };
   
   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.groupCopy = {
         fromgroupid: stateParams.object.groupid
      };

      request.push(self.groupCopy);

      self.fromname = stateParams.object.name;

   };

   this.extendDetailController = function (self, base, arsg) {

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('arsg', 'General') < 3;
      self.isCreditTabReadonly = SecurityService.getSubSecurityLevel('arsg', 'Credit') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('arsg', 'Custom') < 3;

      self.getGeoCodeLookupCriteria = function () {
         return base.getGeoCodeLookupCriteria(arsg);
      };

      self.customSubmit = function () {
         var isValid = true;

         //Needed for the GeoCode validation.
         if (self.addressControl) {
            isValid = self.addressControl.validate();
         }

         if (isValid) {
            self.submit();
         }
      };

      arsg.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (arsg.apmgr === 'GDPR Restricted Data' || arsg.apmgr === 'XXXXXXXXXXXXXXX' ||
             arsg.pocontctnm === 'GDPR Restricted Data' || arsg.pocontctnm === 'XXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }

      });

   };
});