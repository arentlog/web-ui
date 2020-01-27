'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlops', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlops');


   $stateProvider.state('twlops.master.defaultsequence', {
      url: '/default-sequence',
      params: {
      },
      views: {
         subMasterViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlops/tabs/defaultsequence.json');
            },
            controller: 'TwlopsDefaultSequenceCtrl as dtlds'
         }
      }
   });
});

app.controller('TwlopsBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};
   self.criteriaUsed = {};
   self.availSequenceArray = [];
   self.assignedSequenceArray = [];
   self.productDefaultSequenceArray = [];
   self.defaultSequenceList = '';

   // Sets defaults in search tab
   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlops.master');
   };

   self.isDefaultSequence = function () {
      return $state.is('twlops.master.defaultsequence');
   };

   self.includesMaster = function () {
      return $state.includes('twlops.master');
   };

   self.getSequenceList = function (array) {
      var sequenceList = '';
      array.forEach(function (object) {
         sequenceList += sequenceList ? ',' + object.value : object.value;
      });
      return sequenceList;
   };

   self.getSequenceArray = function (lists) {
      var sequenceArrayFull = [];
      var sequenceArray = [];
      var excludeArray = [];
      var isFound = [];

      if (lists.excludeList) {
         excludeArray = self.splitSequenceArray(lists.excludeList);
         sequenceArrayFull = self.splitSequenceArray(lists.sequenceCommaList);
         sequenceArrayFull.forEach(function (sequence) {
            isFound = excludeArray.filter(function (data) {
               return data.value === sequence.value;
            });
            if (!isFound.length) {
               // Add sequence object to the end of the array
               sequenceArray.splice(0, 0, sequence);
            }
         });
      } else {
         sequenceArray = self.splitSequenceArray(lists.sequenceCommaList);
      }

      return sequenceArray;
   };

   self.splitSequenceArray = function (sequenceCommaList) {
      var returnArray = [];
      var label = '';
      sequenceCommaList.split(',').forEach(function (option) {
         label = '';
         switch (option) {
            case 'Cross Dock':
               label = MessageService.get('global.cross.dock');
               break;
            case 'Full Pallet':
               label = MessageService.get('global.full.pallet');
               break;
            case 'Pallet Primary':
               label = MessageService.get('global.pallet.primary');
               break;
            case 'Case Primary':
               label = MessageService.get('global.case.primary');
               break;
            case 'Split-Case Primary':
               label = MessageService.get('global.split.case.primary');
               break;
            case 'Zone Pick Sequence':
               label = MessageService.get('global.zone.pick.sequence');
               break;
            case 'FIFO':
               label = MessageService.get('global.fifo');
               break;
            case 'Counter Primary':
               label = MessageService.get('global.counter.primary');
               break;
            case 'Counter Zone':
               label = MessageService.get('global.counter.zone');
               break;
            default:
               label = option;
         }
         returnArray.push({
            label: label,
            value: option
         });
      });
      return returnArray;
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteriaUsed.whNum = self.criteria.whNum;

      var assignedSequenceList = '';

      var criteria = {
         coNum: self.userCoNum,
         whNum: self.criteriaUsed.whNum,
         scType: 'DROP',
         scTable: 'whmst',
         scId: 'default'
      };
      DataService.post('api/twl/astwlsetup/getseqcontrols', { data: criteria, busy: true }, function (data) {
         self.dtlw = data.seqcontrollist;
         if (self.dtlw.length === 1 && data.defaultSequence) {
            self.defaultSequenceList = data.defaultSequence.toString();
            assignedSequenceList = self.dtlw[0].scValue.toString();
            self.availSequenceArray = self.getSequenceArray({ sequenceCommaList: self.defaultSequenceList, excludeList: assignedSequenceList });
            self.assignedSequenceArray = self.getSequenceArray({ sequenceCommaList: assignedSequenceList, excludeList: '' });
            self.productDefaultSequenceArray = self.getSequenceArray({ sequenceCommaList: self.defaultSequenceList, excludeList: '' });
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlopsSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlops.master');
      } else if (base.isMaster()) {
         $state.go('twlops.master', { refreshSearch: true }, { reload: '^.master' });
      }

      base.search();
   };
});

app.controller('TwlopsMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.goToSystemParametersPicking = function () {
      $state.go('twlasp.master', { pk: base.criteriaUsed.whNum, pk2: 4 }); // Auto search for the Order Manager parameters
   };

});

app.controller('TwlopsWarehouseCtrl', function ($filter, $scope, $state, $stateParams, DataService, MessageService) {
   //dtlw
   var self = this;
   var base = $scope.base;

   self.submit = function () {
      base.dtlw[0].scValue = base.getSequenceList(base.assignedSequenceArray);
      base.dtlw[0].scExists = base.dtlw[0].scValue ? true : false;
      DataService.post('api/twl/astwlsetup/updateseqcontrols', { data: base.dtlw, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.search();
      });
   };

});

app.controller('TwlopsCarrierCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   //dtlc
   var self = this;
   var base = $scope.base;

   self.search = function () {
      var criteria = {
         coNum: base.userCoNum,
         whNum: base.criteriaUsed.whNum,
         scType: 'DROP',
         scTable: 'carrier',
         scId: ''
      };
      DataService.post('api/twl/astwlsetup/getseqcontrols', { data: criteria, busy: true }, function (data) {
         self.dataset = data.seqcontrollist;
         self.dataset.forEach(function (carrier) {
            carrier.message = '';
            if (carrier.scExists && !carrier.scValue) {
               carrier.message = MessageService.get('global.sequence.has.no.values');
            }
         });
      });
   };

   self.remove = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         records.forEach(function (sequence) {
            sequence.scExists = false;
         });
         DataService.post('api/twl/astwlsetup/updateseqcontrols', { data: records, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.search();
         });
      }
   };

   self.search();
});

app.controller('TwlopsCarrierSequenceCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   //dtlcrow  - stealing ideas on how to do the expand from ties/ties.js
   var self = this;
   var base = $scope.base;
   var dtlc = $scope.dtlc;
   self.item = dtlc.rowParams.item;
   self.row = dtlc.rowParams.row;

   self.initialize = function () {
      var assignedSequenceList = '';
      self.availSequenceArray = [];
      self.assignedSequenceArray = [];
      assignedSequenceList = self.item.scValue.toString();
      self.availSequenceArray = base.getSequenceArray({ sequenceCommaList: base.defaultSequenceList, excludeList: assignedSequenceList });
      self.assignedSequenceArray = base.getSequenceArray({ sequenceCommaList: assignedSequenceList, excludeList: '' });
   };


   self.submit = function () {
      var object = [];
      self.item.scValue = base.getSequenceList(self.assignedSequenceArray);
      self.item.scExists = self.item.scValue ? true : false;
      self.item.message = '';
      if (self.item.scExists && !self.item.scValue) {
         self.item.message = MessageService.get('global.sequence.has.no.values');
      }
      object.push(self.item);
      DataService.post('api/twl/astwlsetup/updateseqcontrols', { data: object, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         // Refresh the data in the grid - don't remove this comment
         // I would use Utils.replaceObject if I got data back from the call (like a single row)
         dtlc.grid.renderRows();
         self.initialize();
      });
   };

   self.initialize();
});

app.controller('TwlopsOrderClassCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   //dtloc
   var self = this;
   var base = $scope.base;

   self.search = function () {
      var criteria = {
         coNum: base.userCoNum,
         whNum: base.criteriaUsed.whNum,
         scType: 'DROP',
         scTable: 'order class',
         scId: ''
      };
      DataService.post('api/twl/astwlsetup/getseqcontrols', { data: criteria, busy: true }, function (data) {
         self.dataset = data.seqcontrollist;
         self.dataset.forEach(function (status) {
            status.message = '';
            if (status.scExists && !status.scValue) {
               status.message = MessageService.get('global.sequence.has.no.values');
            }
         });
      });
   };

   self.remove = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         records.forEach(function (sequence) {
            sequence.scExists = false;
         });
         DataService.post('api/twl/astwlsetup/updateseqcontrols', { data: records, busy: true }, function () {
            self.search();
         });
      }
   };

   self.search();

});


app.controller('TwlopsOrderClassSequenceCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   //dtlocrow  - stealing ideas on how to do the expand from ties/ties.js
   var self = this;
   var base = $scope.base;
   var dtloc = $scope.dtloc;
   self.item = dtloc.rowParams.item;
   self.row = dtloc.rowParams.row;

   self.initialize = function () {
      base.lastExpandedOrderClassRow = self.row;
      var assignedSequenceList = '';

      self.availSequenceArray = [];
      self.assignedSequenceArray = [];
      assignedSequenceList = self.item.scValue.toString();
      self.availSequenceArray = base.getSequenceArray({ sequenceCommaList: base.defaultSequenceList, excludeList: assignedSequenceList });
      self.assignedSequenceArray = base.getSequenceArray({ sequenceCommaList: assignedSequenceList, excludeList: '' });
   };

   self.submit = function () {
      var object = [];
      self.item.scValue = base.getSequenceList(self.assignedSequenceArray);
      self.item.scExists = self.item.scValue ? true : false;
      self.item.message = '';
      if (self.item.scExists && !self.item.scValue) {
         self.item.message = MessageService.get('global.sequence.has.no.values');
      }
      object.push(self.item);
      DataService.post('api/twl/astwlsetup/updateseqcontrols', { data: object, busy: true }, function () {
         // Refresh the data in the grid - don't remove this comment
         dtloc.grid.renderRows();
         self.initialize();
      });
   };
   self.initialize();
});


app.controller('TwlopsDefaultSequenceCtrl', function () {
   //dtlds
});