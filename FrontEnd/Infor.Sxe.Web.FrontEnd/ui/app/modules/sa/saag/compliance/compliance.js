'use strict';

app.controller('SaagComplianceSearchCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.criteria.name = '';
      base.ccriteria.sourcecd = ['al'];

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saag.complianceMaster');
      }

      base.criteria.FacetQuery = {};

      if (base.ccriteria.sourcecd[0] && base.ccriteria.sourcecd[0] !== 'al') {
         base.criteria.FacetQuery.sourcecd = base.ccriteria.sourcecd;
      }

      base.csearch();
   };
});

app.controller('SaagComplianceMasterCtrl', function ($scope, $state, $stateParams, GridService, MessageService, ModalService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.sasc = Sasc;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.criteria.FacetQuery = {};

      if (base.ccriteria.sourcecd[0] && base.ccriteria.sourcecd[0] !== 'al') {
         base.criteria.FacetQuery.sourcecd = base.ccriteria.sourcecd;
      }

      base.csearch();
   }

   // Advanced search criteria object with initial values
   self.advCriteria = {
      rectype: [''],
      cono: [''],
      city: [''],
      country: [self.sasc.country],
      state: [''],
      zipcd: ['']
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'rectype', label: MessageService.get('global.record') },
      { value: 'cono', label: MessageService.get('global.company') },
      { value: 'city', label: MessageService.get('global.city') },
      { value: 'country', label: MessageService.get('global.country') },
      { value: 'state', label: MessageService.get('global.state') },
      { value: 'zipcd', label: MessageService.get('global.zip.code') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['cono', 'rectype'];

   self.search = function () {

      base.criteria.FacetQuery = {};

      // If a facet value was selected, then add to the facet query
      if (base.ccriteria.sourcecd[0] && base.ccriteria.sourcecd[0] !== 'al') {
         base.criteria.FacetQuery.sourcecd = base.ccriteria.sourcecd;
      }

      if (self.advCriteria.rectype[0]) {
         base.criteria.FacetQuery.rectype = self.advCriteria.rectype;
      }

      if (self.advCriteria.cono[0]) {
         base.criteria.FacetQuery.cono = self.advCriteria.cono;
      }

      if (self.advCriteria.city[0]) {
         base.criteria.FacetQuery.city = self.advCriteria.city;
      }

      if (self.advCriteria.state[0]) {
         base.criteria.FacetQuery.state = self.advCriteria.state;
      }

      if (self.advCriteria.zipcd[0]) {
         base.criteria.FacetQuery.zipcd = self.advCriteria.zipcd;
      }

      if (self.advCriteria.country[0]) {
         base.criteria.FacetQuery.countrycd = self.advCriteria.country;
      }

      base.csearch();
   };

   self.print = function () {
      var records = GridService.getSelectedRecords(base.cgrid);
      if (records) {
         base.recordsToPrint = [];

         records.forEach(function (record) {
            base.recordsToPrint.push(
               {
                  gdprrowpointer: record.rowpointer,
                  recordty: record.rectype,
                  fieldnm: record.fieldnm
               });
         });

         if (base.recordsToPrint.length) {

            // Get the expiration date to be applied the the disabled records
            ModalService.showModal('sa/saag/compliance/get-print-type.json', 'SaagGetPrintTypeCtrl as gprt', $scope, function (modal) {
               self.getPrintTypeModal = modal;
            });

         } else {
            MessageService.info('global.information', 'message.no.records.have.been.selected');
         }
      }
   };

   self.disable = function () {
      var records = GridService.getSelectedRecords(base.cgrid);
      if (records) {
         base.recordsToActOn = [];

         records.forEach(function (record) {
            base.recordsToActOn.push(
               {
                  gdprrowpointer: record.rowpointer,
                  gdprrowid: record.rowid,
                  recordty: record.rectype,
                  fieldnm: record.fieldnm
               });
         });

         if (base.recordsToActOn.length) {

            self.actionType = 'd';

            // Get the expiration date to be applied the the disabled records
            ModalService.showModal('sa/saag/compliance/get-expiration.json', 'SaagGetExpirationCtrl as gexp', $scope, function (modal) {
               self.getExpirationDateModal = modal;
            });

         } else {
            MessageService.info('global.information', 'message.no.records.have.been.selected');
         }

      }
   };

   self.forget = function () {
      var records = GridService.getSelectedRecords(base.cgrid);
      if (records) {
         base.recordsToActOn = [];

         records.forEach(function (record) {
            base.recordsToActOn.push(
               {
                  gdprrowpointer: record.rowpointer,
                  gdprrowid: record.rowid,
                  recordty: record.rectype,
                  fieldnm: record.fieldnm
               });
         });

         if (base.recordsToActOn.length) {

            self.actionType = 'f';

            // Get the expiration date to be applied the the forgotten records
            ModalService.showModal('sa/saag/compliance/get-expiration.json', 'SaagGetExpirationCtrl as gexp', $scope, function (modal) {
               self.getExpirationDateModal = modal;
            });

         } else {
            MessageService.info('global.information', 'message.no.records.have.been.selected');
         }

      }
   };

});

app.controller('SaagGetExpirationCtrl', function ($scope, $state, DataService, MruService, RecentlyVisitedService) {
   var self = this;
   var base = $scope.base;
   var cmst = $scope.cmst;

   self.clearStoredData = function () {
      if (base.recordsToActOn) {

         base.recordsToActOn.forEach(function (gdprdata) {

            switch (gdprdata.recordty.toLowerCase()) {
               case 'apsf':                                                                              //ignore jslint
                  RecentlyVisitedService.removeFromList('apsf', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'apsv':                                                                              //ignore jslint
                  // For MRUs, pass the rowpointer for elastic lookups and the rowid for other lookups
                  MruService.removeFromList('Vendor', gdprdata.gdprrowpointer);                          //ignore jslint
                  RecentlyVisitedService.removeFromList('apsv', gdprdata.gdprrowid);                     //ignore jslint
                  RecentlyVisitedService.removeFromList('apiv', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'apss':                                                                              //ignore jslint
                  MruService.removeFromList('ShipFrom', gdprdata.gdprrowpointer);                        //ignore jslint
                  RecentlyVisitedService.removeFromList('apss', gdprdata.gdprrowid);                     //ignore jslint
                  RecentlyVisitedService.removeFromList('apiv', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'arsc':                                                                              //ignore jslint
                  MruService.removeFromList('Customer', gdprdata.gdprrowpointer);                        //ignore jslint
                  RecentlyVisitedService.removeFromList('arsc', gdprdata.gdprrowid);                     //ignore jslint
                  RecentlyVisitedService.removeFromList('aric', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'arsg':                                                                              //ignore jslint
                  MruService.removeFromList('Group', gdprdata.gdprrowid);                                //ignore jslint
                  RecentlyVisitedService.removeFromList('arsg', gdprdata.gdprrowid);                     //ignore jslint
                  RecentlyVisitedService.removeFromList('aric', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'arss':                                                                              //ignore jslint
                  MruService.removeFromList('ShipTo', gdprdata.gdprrowpointer);                          //ignore jslint
                  RecentlyVisitedService.removeFromList('arss', gdprdata.gdprrowid);                     //ignore jslint
                  RecentlyVisitedService.removeFromList('aric', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'carrier':                                                                           //ignore jslint
                  MruService.removeFromList('TWLCarrier', gdprdata.gdprrowid);                           //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'cmsp':                                                                              //ignore jslint
                  MruService.removeFromList('Prospect', gdprdata.gdprrowid);                             //ignore jslint
                  RecentlyVisitedService.removeFromList('oesp', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'contacts':                                                                          //ignore jslint
                  MruService.removeFromList('Contact', gdprdata.gdprrowpointer);                         //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'empmst':                                                                            //ignore jslint
                  MruService.removeFromList('TWLEmployee', gdprdata.gdprrowid);                          //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'pv_user':                                                                           //ignore jslint
                  MruService.removeFromList('Operator', gdprdata.gdprrowid);                             //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'sasta':                                                                             //ignore jslint
                  MruService.removeFromList('Buyer', gdprdata.gdprrowpointer);                           //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'smsn':                                                                              //ignore jslint
                  MruService.removeFromList('SalesRep', gdprdata.gdprrowid);                             //ignore jslint
                  RecentlyVisitedService.removeFromList('oess', gdprdata.gdprrowid);                     //ignore jslint
                  break;                                                                                 //ignore jslint
               case 'venmst':                                                                            //ignore jslint
                  MruService.removeFromList('TWLVendor', gdprdata.gdprrowid);                            //ignore jslint
                  break;                                                                                 //ignore jslint
               default:                                                                                  //ignore jslint
                  break;                                                                                 //ignore jslint
            }
         });
      }
   };

   self.submit = function () {
      var crit = {
         ttblgdprcomplianceaction: base.recordsToActOn,
         actiontype: cmst.actionType,
         expiredate: self.expireDate
      };

      DataService.post('/web/api/shared/GdprComplianceAction', { data: crit, busy: true }, function (data) {
         if (data) {

            if (cmst.actionType === 'd') {
               // Create a history record indicating when results were disabled
               base.createHistory('disable');
            } else {
               // Create a history record indicating when results were forgotten
               base.createHistory('forget');
            }

            self.clearStoredData();

            base.csearch();

            $state.go('^');
            cmst.getExpirationDateModal.destroy();
         }
      });

   };

   self.cancel = function () {
      $state.go('^');
      cmst.getExpirationDateModal.destroy();
   };
});

app.controller('SaagGetPrintTypeCtrl', function ($scope, $state, DataService, MessageService, PvUser) {
   var self = this;
   var base = $scope.base;
   var cmst = $scope.cmst;

   self.PvUser = PvUser;
   self.emailaddr = self.PvUser.email;
   self.outputty = 'e';
   self.outputFileOptions = [];
   self.filename = 'GDPR-Find-Results.txt';

   self.buildOutputFileDropdown = function () {
      var fldListBuilt = [];
      var obj2 = {
         label: MessageService.get('global.sent.to.email'),
         value: 'e'
      };
      fldListBuilt.push(obj2);
      if (base.isDropboxEnabled()) {
         var obj3 = {
            label: MessageService.get('global.sent.to.dropbox'),
            value: 'd'
         };
         fldListBuilt.push(obj3);
      }
      self.outputFileOptions = fldListBuilt;
   };

   self.submit = function () {
      var crit = {
         searchname: base.criteria.QueryText,
         ttblgdprcomplianceaction: base.recordsToPrint,
         ttblgdprcomplianceprint: [
            {
               outputty: self.outputty,
               emailaddr: self.emailaddr,
               filename: self.filename
            }
         ]
      };

      DataService.post('/web/api/shared/GdprCompliancePrint', { data: crit, busy: true }, function (data) {
         if (data) {

            // Create a history record indicating when results were printed
            base.createHistory('print');

            $state.go('^');
            cmst.getPrintTypeModal.destroy();
         }
      });

   };

   self.cancel = function () {
      $state.go('^');
      cmst.getPrintTypeModal.destroy();
   };

   self.buildOutputFileDropdown();
});

