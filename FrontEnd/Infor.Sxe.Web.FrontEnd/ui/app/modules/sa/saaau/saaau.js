'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saaau', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saaau');

   $stateProvider.state('saaau.detail', {
      url: '/detail',
      params: { saaautablelistRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saaau/detail.json');
            },
            controller: 'SaaauDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('saaau.generate', {
      url: '/generate',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saaau/generate.json');
            },
            controller: 'SaaauGenerateCtrl as gen'
         }
      }
   });
});

app.controller('SaaauBaseCtrl', function ($state, DataService, SecurityService) {
   var self = this;
   self.criteria = {};
   self.isGenerateEnabled = false;

   // Must have delete security to clear audit metadata
   var securityLevel = SecurityService.getSecurityLevel('saaau');
   self.isClearAuditMetaDataEnabled = securityLevel === 5 ? true : false;

   self.isMaster = function () {
      return $state.is('saaau.master');
   };

   self.includesMaster = function () {
      return $state.includes('saaau.master');
   };

   self.isDetail = function () {
      return $state.is('saaau.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saaau.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      // The 'Generate All' button is only enabled after the first 'Search' has been performed
      self.isGenerateEnabled = true;

      // Get data
      DataService.post('api/sa/assasetup/saaautablelistretrieve', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };
});

app.controller('SaaauSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saaau.master');
      }

      // Get data
      base.search();
   };
});

app.controller('SaaauMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Clear all audit meta data
   self.doClearAuditMetaData = function () {
      MessageService.okCancel('global.clear.audit.data', 'question.this.will.remove.all.table.and.field.level.selecti', function () {
         DataService.get('api/sa/assasetup/saaauclearauditrecords', { busy: true }, function () {
            base.dataset = [];
         });
      });
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { saaautablelistRecord: record });
   };

   self.generateAll = function () {
      $state.go('^.generate');
   };

   // Turn table level audit on/off
   self.setAuditFlag = function (select) {
      var records = GridService.getSelectedRecords(base.grid);

      if (records && records.length) {
         var criteria = {
            saaautablelist: records,
            lSelect: select
         };

         DataService.post('api/sa/assasetup/saaausetauditflag', { data: criteria, busy: true }, function () {
            // Update selectfl in grid for selected rows
            records.forEach(function (record) {
               record.selectfl = select;
            });
            base.grid.loadData(base.dataset);
         });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('SaaauDetailCtrl', function ($state, $stateParams, DataService, GridService) {
   var self = this;
   self.record = $stateParams.saaautablelistRecord;

   self.loadDetail = function () {
      DataService.get('api/sa/assasetup/saaaudetailretrieve/' + self.record.tablename, { busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.setDetailAuditFlag = function (select) {
      var records = GridService.getSelectedRecords(self.grid);

      if (records && records.length) {
         var criteria = {
            saaautabledetail: records,
            lSelect: select
         };
         DataService.post('api/sa/assasetup/saaaudetailsetauditflag', { data: criteria, busy: true }, function () {
            records.forEach(function (record) {
               record.selectfl = select;
            });
            self.grid.loadData(self.dataset);
         });
      }
   };

   if (self.record) {
      // If table has not already been enabled then do so before loading detail
      if (!self.record.selectfl) {
         self.record.selectfl = true;

         var saaauTableList = [];
         saaauTableList.push(self.record);

         var criteria = {
            saaautablelist: saaauTableList,
            lSelect: true
         };

         DataService.post('api/sa/assasetup/saaausetauditflag', { data: criteria, busy: true }, function () {
            self.loadDetail();
         });
      } else {
         self.loadDetail();
      }
   }

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      self.loadDetail();
   }
});

app.controller('SaaauGenerateCtrl', function ($state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   self.generateRDRWPrograms = false;

   self.submit = function () {
      DataService.get('api/sa/assasetup/saaaugenerate/' + self.generateRDRWPrograms, { busy: true }, function (data) {
         if (data) {
            var msg = MessageService.get('message.apply.the.following.delta.file.from.the.progress.d') + ': ';
            if (data.cDeltaFileCreated) {
               msg += data.cDeltaFileCreated;
            }
            msg += '<br>';
            msg += '<br>';
            if (data.cAuditProgramsDir) {
               msg += MessageService.get('message.copy.all.files.generated.audit.programs.part.1') + ' ';
               msg += data.cAuditProgramsDir;
               msg += MessageService.get('message.copy.all.files.generated.audit.programs.part.2');
            }

            MessageService.confirmation('global.information', msg);
            $state.go('^.master', null, { reload: '^.master' });
         }
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      self.loadDetail();
   }
});
