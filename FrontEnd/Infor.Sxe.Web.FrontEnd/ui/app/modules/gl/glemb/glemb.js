'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('gl', 'glemb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('gl', 'glemb');
});

app.controller('GlembBaseCtrl', function ($state, DataService, MessageService) {
   var self = this;
   self.criteria = {};

   self.searchLaunched = false;

   self.isMaster = function () {
      return $state.is('glemb.master');
   };

   self.includesMaster = function () {
      return $state.includes('glemb.master');
   };

   self.search = function () {
      DataService.post('api/gl/asglentry/glembsearch', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.glembresults;
         self.searchLaunched = true;
         var messageCriteria = {
             glyear: self.criteria.yr,
             glno: self.criteria.acct
         };
         DataService.post('api/gl/asglinquiry/glsacheckfornull', { data: messageCriteria, busy: true }, function (dataSecond) {
             if (dataSecond) {
                 if (dataSecond.warningmess) {
                     MessageService.info('global.warning', dataSecond.warningmess);
                 }
             }
         });
      });
   };
});

app.controller('GlembSearchCtrl', function ($scope, $state, DataService, Utils, MessageService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   base.newValue = 0;
   base.oldValue = 0;

   self.initializeCriteria = function () {
      var d = new Date();
      criteria.yr = d.getFullYear();
      criteria.acct = '';
      criteria.changeby = 'n';
      criteria.fieldchanged = MessageService.get('global.period.1');
      criteria.changeamt = 0;
   };

   self.submit = function () {
      if (!$scope.base.isMaster()) {
         $state.go('glemb.master');
      }

      DataService.post('api/gl/asglentry/glembvalue', { data: criteria, busy: true }, function (data) {
         base.newValue = data.dNewValue;
         base.oldValue = data.dOldValue;
      });

      base.search();
   };

   self.initializeCriteria();
});

app.controller('GlembMasterCtrl', function ($scope, $state, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.update = function () {
      if (criteria.changeby === 'c') {
         if (criteria.changeamt === 0) {
            MessageService.error('global.error', 'message.quantity.must.not.be.zero');
         }
         else {
            self.saveRecord();
         }
      }
      else {
         self.saveRecord();
      }
   };

   self.saveRecord = function () {
      DataService.post('api/gl/asglentry/glembupdate', { data: criteria, busy: true }, function (data) {
         base.dataset = data.glembresults;

         DataService.post('api/gl/asglentry/glembvalue', { data: criteria, busy: true }, function (data) {
            base.newValue = 0;
            base.oldValue = data.dOldValue;

            self.reset();

            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      });
   };

   self.changenewvalue = function () {
      if (criteria.changeby === 'c') {
         base.newValue = base.oldValue + criteria.changeamt;
      }
      else {
         base.newValue = criteria.changeamt;
      }
   };

   self.cancel = function () {
      self.reset();
   };

   self.reset = function () {
      criteria.changeamt = 0;
      criteria.reason = '';
   };
});