'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('xx', 'xxxx', {
      widgets: ['JOURNAL']
   });
   StateProvider.addMasterState('xx', 'xxxx');
});

app.controller('XxxxBaseCtrl', function ($state, Utils) {
   var self = this;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'xxxx',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'xx',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('xxxx.master');
   };

   self.includesMaster = function () {
      return $state.includes('xxxx.master');
   };
});

app.controller('XxxxMasterCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;

   // New record to enter
   self.xxxx = {};

   // Clear form
   self.clear = function () {
      self.xxxx = {};
   };

   // Submit an entry
   self.submit = function () {

      // If no open journal, first direct user to open a journal, then proceed with submit
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            self.submit();
         });
      } else {
         alert('TODO: implement this function');
      }
   };

});
