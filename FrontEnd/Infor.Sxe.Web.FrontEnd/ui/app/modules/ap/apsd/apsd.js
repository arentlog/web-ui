'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apsd',
      dataPath: 'api/ap/apsd',
      searchMethod: 'POST',
      searchPath: 'api/ap/asapsetup/apsdgetlist',
      createStateView: 'ap/apsd/create.json',
      postCreateState: '^.detail.edit',
      searchResultsField: '',
      resultsRowIdField: 'apsdRowid',
      detailSubTitle: [
         { label: null, value: 'vendno' },
         { label: null, value: 'shipfmno' },
         { label: null, value: 'shipviaty' }
      ],
      primaryKeyParams: ['vendno'],
      recentlyVisited: null
   });
});

app.service('ApsdService', function ($state, DataService) {

   this.extendCreateController = function (self, base, apsp, scope) {
      self.customSubmit = function () {

         scope.base.selectedvendno = self.apsd.vendno;
         scope.base.selectedshipfmno = self.apsd.shipfmno;


         if (!self.apsd.shipfmno) {
            var apsvparams = {
               vendno: self.apsd.vendno
            };

            DataService.get('api/ap/apsv/getbypk', { params: apsvparams }, function (data) {
               if (data) {
                  self.apsd.srcrowpointer = data.rowpointer;
                  self.submit();
               }
            });
         } else {
            var apssparams = {
               vendno: self.apsd.vendno,
               shipfmno: self.apsd.shipfmno
            };

            DataService.get('api/ap/apss/getbypk', { params: apssparams }, function (data) {
               if (data) {
                  self.apsd.srcrowpointer = data.rowpointer;
                  self.submit();
               }
            });

         }
      };
   };

   this.extendDetailController = function (self, base, apsd, scope) {

      // When the full apsd object has been resolved, fetch the corresponding vendor data from the selected line
      apsd.$promise.then(function () {
         // coming from row select, missing vendno/shipfmno
         if (!self.apsd.vendno) {
            apsd.vendno = scope.base.selectedvendno;
            apsd.shipfmno = scope.base.selectedshipfmno;
         }

         //coming from New, missing srcrowpointer
         if (!self.apsd.srcrowpointer) {
            if (!self.apsd.shipfmno) {
               var apsvparams = {
                  vendno: apsd.vendno
               };

               DataService.get('api/ap/apsv/getbypk', { params: apsvparams }, function (data) {
                  if (data) {
                     apsd.srcrowpointer = data.rowpointer;
                  }
               });


            } else {
               var apssparams = {
                  vendno: apsd.vendno,
                  shipfmno: apsd.shipfmno
               };

               DataService.get('api/ap/apss/getbypk', { params: apssparams }, function (data) {
                  if (data) {
                     apsd.srcrowpointer = data.rowpointer;
                  }
               });

            }

         }
         self.getSubTitle = function () {
            if (!apsd.shipfmno) {
               apsd.shipfmno = 0;
            }
            return apsd.vendno + ' | ' + apsd.shipfmno + ' | ' + apsd.shipviaty;
         };

      });

   };

   this.extendMasterController = function (self, base, scope) {
      self.customDrilldown = function (e, args) {
         var selectedRecord = args[0].item;
         scope.base.selectedvendno = selectedRecord.vendno;
         scope.base.selectedshipfmno = selectedRecord.shipfmno;
         self.drilldown(e, args);
      };
   };

});
