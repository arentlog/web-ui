'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saag', {
      widgets: ['SEARCH'],
      defaultState: 'saag'
   });

   $stateProvider.state('saag.complianceMaster', {
      url: '/compliance-master',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saag/compliance/compliance-master.json');
            },
            controller: 'SaagComplianceMasterCtrl as cmst'
         }
      }
   });

   $stateProvider.state('saag.expirationMaster', {
      url: '/expiration-master',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saag/expiration/expiration-master.json');
            },
            controller: 'SaagExpirationMasterCtrl as emst'
         }
      }
   });

   $stateProvider.state('saag.historyMaster', {
      url: '/history-master',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saag/history/history-master.json');
            },
            controller: 'SaagHistoryMasterCtrl as hmst'
         }
      }
   });

});

app.controller('SaagBaseCtrl', function ($state, $stateParams, AodataService, ConfigService, DataService, MessageService, SecurityService, TabService, UserService, Constants, Utils, PvUser) {
   var self = this;
   self.PvUser = PvUser;
   self.criteria = {};
   self.ccriteria = {};
   self.ecriteria = {};
   self.hcriteria = {};

   self.ccriteria.sourcecd = ['al'];
   self.ecriteria.sourcecd = ['al'];
   self.ecriteria.timeWindow = '7';
   self.ecriteria.statuscd = 'd';
   self.hcriteria.actionType = 'print';
 
   self.MENU_FUNCTION_SAAG = 'saag';
   self.SUBMENU_SAAG_COMP = 'Compliance';     //This is dependent on the PV_SASSM (Menu Item) 'Label' field definition for SAAG.
   self.SUBMENU_SAAG_EXPR = 'Expiration';     //This is dependent on the PV_SASSM (Menu Item) 'Label' field definition for SAAG.
   self.SUBMENU_SAAG_HIST = 'History';        //This is dependent on the PV_SASSM (Menu Item) 'Label' field definition for SAAG.

   self.securityLevelSAAG = SecurityService.getSecurityLevel(self.MENU_FUNCTION_SAAG);
   self.securityLevelCOMP = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_SAAG, self.SUBMENU_SAAG_COMP);
   self.securityLevelEXPR = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_SAAG, self.SUBMENU_SAAG_EXPR);
   self.securityLevelHIST = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_SAAG, self.SUBMENU_SAAG_HIST);

   self.dropboxInterface = AodataService.getValue('sa', 'DropboxInterfaceFl').toLowerCase();

   self.recordsToActOn = [];
   self.recordsToPrint = [];

   // Set a default function - look at security
   if (self.securityLevelCOMP <= 1 && self.securityLevelEXPR <= 1 && self.securityLevelHIST <= 1) {
      MessageService.error('global.error', 'message.minimum.security.level.not.setup.for.operator');
      TabService.closeTab('saag');
   } else {
      $state.go('saag.expirationMaster');
   }

   self.isMaster = function () {
      return ($state.is('saag.complianceMaster') || $state.is('saag.expirationMaster') || $state.is('saag.historyMaster'));
   };

   self.includesMaster = function () {
      return ($state.includes('saag.complianceMaster') || $state.includes('saag.expirationMaster') || $state.includes('saag.historyMaster'));
   };

   self.isCompliance = function () {
      return $state.is('saag.complianceMaster');
   };

   self.isExpiration = function () {
      return $state.is('saag.expirationMaster');
   };

   self.isHistory = function () {
      return $state.is('saag.historyMaster');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.MaxResults = ConfigService.getDefaultRecordLimit();
   };

   self.isDropboxEnabled = function () {
      var retn = false;
      if (self.dropboxInterface === 'yes' && self.PvUser.dropboxauthkey) {
         retn = true;
      }
      return retn;
   };

   self.recordFormatter = function (row, cell, value, column, item) {
      if (value) {

         if (value.toLowerCase() === 'arsd') {
            return 'ARSOC';
         } else if (value.toLowerCase() === 'carrier') {
            return 'TWLOCM';
         } else if (value.toLowerCase() === 'cmsp') {
            return 'OESP';
         } else if (value.toLowerCase() === 'empmst') {
            return 'TWLAE';
         } else if (value.toLowerCase() === 'pv_user') {
            return 'SASO';
         } else if (value.toLowerCase() === 'sasta') {
            return 'SASTT';
         } else if (value.toLowerCase() === 'smsn') {
            return 'OESS';
         } else if (value.toLowerCase() === 'vendaddr') {
            return 'TWLIV';
         } else if (value.toLowerCase() === 'venmst') {
            return 'TWLIV';
         } else {
            return value.toUpperCase();
         }

      } else {
         return value;
      }
   };

   $state.go('saag.complianceMaster');

   // Perform search and update data set for the Compliance grid
   self.csearch = function () {
      self.cdataset = [];
      self.rectypeCriteriaValues = [];                                                         //ignore jslint
      self.conoCriteriaValues = [];                                                            //ignore jslint
      self.cityCriteriaValues = [];                                                            //ignore jslint
      self.stateCriteriaValues = [];                                                           //ignore jslint
      self.zipcdCriteriaValues = [];                                                           //ignore jslint
      self.countrycdCriteriaValues = [];                                                       //ignore jslint

      // Load criteria needed for elastic search
      self.criteria.LookupParameter = 'gdprctrl';
      self.criteria.MaxResults = ConfigService.getDefaultRecordLimit();

      // The search call and the facet handling is based on code in lookup.js
      DataService.post(Constants.SEARCH_PATH, { data: self.criteria, errorFunction: 'search.saag' }, function (data) {
         data = Utils.processData(self.criteria, data);

         self.cdataset = data.hits;

         data.facets = Utils.processFacets(self.criteria.LookupParameter, data.facets);

         data.facets.forEach(function (facet) {
            if (facet.id && facet.FacetNodes.length > 0) {
               switch (facet.id.toLowerCase()) {
                  case 'rectype':                                                                           //ignore jslint
                     facet.FacetNodes.forEach(function (facetnode) {                                        //ignore jslint
                        self.rectypeCriteriaValues.push({ label: facetnode.label, value: facetnode.value });      //ignore jslint
                     });                                                                                    //ignore jslint
                     break;                                                                                 //ignore jslint
                  case 'cono':                                                                              //ignore jslint
                     facet.FacetNodes.forEach(function (facetnode) {                                        //ignore jslint
                        self.conoCriteriaValues.push({ label: facetnode.label, value: facetnode.value });         //ignore jslint
                     });                                                                                    //ignore jslint
                     break;                                                                                 //ignore jslint
                  case 'city':                                                                              //ignore jslint
                     facet.FacetNodes.forEach(function (facetnode) {                                        //ignore jslint
                        self.cityCriteriaValues.push({ label: facetnode.label, value: facetnode.value });         //ignore jslint
                     });                                                                                    //ignore jslint
                     break;                                                                                 //ignore jslint
                  case 'state':                                                                             //ignore jslint
                     facet.FacetNodes.forEach(function (facetnode) {                                        //ignore jslint
                        self.stateCriteriaValues.push({ label: facetnode.label, value: facetnode.value });        //ignore jslint
                     });                                                                                    //ignore jslint
                     break;                                                                                 //ignore jslint
                  case 'zipcd':                                                                             //ignore jslint
                     facet.FacetNodes.forEach(function (facetnode) {                                        //ignore jslint
                        self.zipcdCriteriaValues.push({ label: facetnode.label, value: facetnode.value });        //ignore jslint
                     });                                                                                    //ignore jslint
                     break;                                                                                 //ignore jslint
                  case 'countrycd':                                                                         //ignore jslint
                     facet.FacetNodes.forEach(function (facetnode) {                                        //ignore jslint
                        self.countrycdCriteriaValues.push({ label: facetnode.label, value: facetnode.value });    //ignore jslint
                     });                                                                                    //ignore jslint
                     break;                                                                                 //ignore jslint
                  default:                                                                                  //ignore jslint
                     break;                                                                                 //ignore jslint
               }
            }
         });

      });

   };

   // Perform search and update data set for the Expiration grid
   self.esearch = function () {
      var sources = ['al'];

      if (self.ecriteria.sourcecd[0] && self.ecriteria.sourcecd[0] !== 'al') {
         sources = self.ecriteria.sourcecd;
      }

      self.ecriteria.sourcelist = sources ? sources.toString() : '';

      var crit = {
         expSources: self.ecriteria.sourcelist,
         expTime: self.ecriteria.timeWindow,
         expStatus: self.ecriteria.statuscd
      };
      DataService.post('/web/api/shared/GdprExpireSearch', { data: crit, busy: true }, function (data) {
         if (data) {
            if (data.ttblgdprexpireresults) {
               self.edataset = data.ttblgdprexpireresults;
            }
         }
      });
   };

   // Perform search and update data set for the History grid
   self.hsearch = function () {
      if (self.hcriteria.actionType) {
         DataService.post('api/pv/pvadminlog/listbysubject', { data: { subject: self.hcriteria.actionType, batchsize: -1 }, busy: true }, function (data) { //batchsize required as -1 to get all records.  For now all records are required because data is not sorted by date automatically in the table, so grabbing the top records will not work...
            if (data) {
               self.hdataset = data;
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.createHistory = function (historyType) {
      var historyToSave = [];
      var date = new Date();
      var time = ((date.getHours() * 60) + date.getMinutes()) * 60 + date.getSeconds();
      date = Utils.pad(date.getMonth() + 1, 2, '0') + '/' + Utils.pad(date.getDate(), 2, '0') + '/' + Utils.pad(date.getFullYear().toString().substr(2), 2, '0');

      historyToSave.push({
         oper2: UserService.getUserName(),
         note: 'Action Taken on GDPR Results',
         function: 'GDPR Compliance',
         setting: 'GDPR',
         cono: UserService.getCono(),
         subject: historyType.toUpperCase(),
         changedt: date,
         changetm: time
      });

      DataService.post('api/pv/pvadminlog/pv_adminlogsave', { data: historyToSave, busy: true });

   };
});

app.controller('SaagSearchCtrl', function () {
});

app.controller('SaagMasterCtrl', function () {
});

