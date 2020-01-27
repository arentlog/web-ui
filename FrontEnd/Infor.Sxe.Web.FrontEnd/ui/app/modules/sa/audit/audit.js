'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('sa', 'audit', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'audit');
});

app.controller('AuditBaseCtrl', function ($state, $stateParams, ConfigService, DataService, MessageService) {
   var self = this;
   self.criteria = {};
   self.tableNames = [];

   self.isMaster = function () {
      return $state.is('audit.master');
   };

   self.includesMaster = function () {
      return $state.includes('audit.master');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   function bindTableNames() {
      DataService.get('api/sa/assainquiry/auditinquirytablelistget', { busy: true }, function (data) {
         if (data && data.length > 0) {
            data.forEach(function (table) {
               var item = { tablenm: table.tablenm, tabledesc: table.tabledesc };
               self.tableNames.push(item);
            });
         }
      });
   }

   function retrieveTableKeyData() {
      DataService.get('api/sa/assainquiry/auditinquiryprimarykey/' + self.criteria.tablenm, { busy: true }, function (data) {
         self.primaryKeyList = [];

         if (data) {
            self.primaryKeyList = data;
         }
      });
   }

   bindTableNames();

   self.onTableNameChanged = function () {
      if (self.criteria.tablenm) {
         retrieveTableKeyData();
      }
   };

   function initiateSearch() {
      var param = {
         auditinqprimarykey: self.primaryKeyList,
         auditinqauditcriteria: self.criteria
      };

      DataService.post('api/sa/assainquiry/auditinquiryauditretrieve', { data: param, busy: true }, function (data) {
         self.dataset = data;
      });
   }

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/sa/assainquiry/auditinquiryvalidateprikey', { data: self.primaryKeyList, busy: true }, function (data) {
         if (data) {
            if (data.messaging && data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               initiateSearch();
            }
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('AuditSearchCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('audit.master');
      }

      // Get data
      base.search();
   };
});

app.controller('AuditMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, MessageService, GridService, ModalService) {
   var self = this;
   var base = $scope.base;
   self.changedFields = '';
   self.referenceNotes = '';

   if ($stateParams.pk) {
      base.criteria.tablenm = $stateParams.pk;
      base.retrieveTableKeyData();
   }

   self.changedFieldsClicked = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);

      if (selectedRecord) {
         DataService.post('api/sa/assainquiry/auditinquirychangelist', { data: selectedRecord, busy: true }, function (data) {
            self.changedFields = data;

            ModalService.showModal('sa/audit/changed-fields.json', null, $scope, function (modal) {
               self.changedFieldsModal = modal;
            });
         });
      }
   };

   self.changedFieldsOkClicked = function () {
      self.changedFieldsModal.destroy();
   };

   self.referenceNotesClicked = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      var param = { auditinqauditresults: selectedRecord, lRetrieve: true, cReferenceIn: '' };

      if (selectedRecord) {
         DataService.post('api/sa/assainquiry/auditinquiryreferencenote', { data: param, busy: true }, function (data) {
            self.referenceNotes = data;

            ModalService.showModal('sa/audit/reference-note.json', null, $scope, function (modal) {
               self.referenceNotesModal = modal;
            });
         });
      }
   };

   self.referenceNotesOkClicked = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      var param = { auditinqauditresults: selectedRecord, lRetrieve: false, cReferenceIn: self.referenceNotes };

      DataService.post('api/sa/assainquiry/auditinquiryreferencenote', { data: param, busy: true }, function () {
         self.referenceNotesModal.destroy();
      });
   };

   self.referenceNotesCancelClicked = function () {
      self.referenceNotesModal.destroy();
   };
});