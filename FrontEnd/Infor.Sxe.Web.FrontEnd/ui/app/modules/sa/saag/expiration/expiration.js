'use strict';

app.controller('SaagExpirationSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.ecriteria.sourcecd = ['al'];
      base.ecriteria.timeWindow = '7';
      base.ecriteria.statuscd = 'd';

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saag.expirationMaster');
      }

      base.esearch();
   };
});

app.controller('SaagExpirationMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.esearch();
   }

   self.enable = function () {
      var records = GridService.getSelectedRecords(base.egrid);
      if (records) {

         base.recordsToActOn = [];

         records.forEach(function (record) {
            base.recordsToActOn.push(
               {
                  gdprrowpointer: record.rowpointer,
                  recordty: record.recordnm,
                  fieldnm: record.fieldnm
               });
         });

         if (base.recordsToActOn.length) {

            var crit = {
               ttblgdprcomplianceaction: base.recordsToActOn,
               actiontype: 'e'
            };

            DataService.post('/web/api/shared/GdprComplianceAction', { data: crit, busy: true }, function (data) {
               if (data) {

                  // Create a history record indicating when results were enabled
                  base.createHistory('enable');

                  base.esearch();

               }
            });

         } else {
            MessageService.info('global.information', 'message.no.records.have.been.selected');
         }

      }
   };

});
