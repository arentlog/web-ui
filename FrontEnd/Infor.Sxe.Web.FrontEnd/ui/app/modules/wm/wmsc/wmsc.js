'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'wm',
      menuFn: 'wmsc',
      recordName: 'wmsc',
      dataPath: 'api/wm/wmsc',
      searchMethod: 'POST',
      searchPath: 'api/wm/aswmentry/wmscsearch',
      searchResultsField: '',
      searchDefaultWarehouseField: 'whse',
      passGridRecord: true,
      resultsRowIdField: 'rowidWmsc',
      primaryKeyParams: ['whse', 'sizetype', 'prod'],
      detailSubTitle: [
         { label: null, value: 'whse' },
         { label: null, value: 'sizetype' },
         { label: null, value: 'prod' }
      ],
      recentlyVisited: null
   });
});

app.service('WmscService', function ($translate, $state, DataService) {

   this.extendDetailController = function (self, base, sasc, scope, stateParams) {

      self.unitstock = stateParams.object ? stateParams.object.unitstock : '';

      self.changeProduct = function (e) {
         if (e.value) {
            var params = {
               prod: e.value,
               fldlist: 'unitstock'
            };
            DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
               if (icsp && icsp.unitstock) {
                  self.unitstock = icsp.unitstock;
               }
            });
         }
      };

   };

   this.extendCreateController = function (self) {

      self.unitstock = '';

      self.changeProduct = function (e) {
         if (e.value) {
            var params = {
               prod: e.value,
               fldlist: 'unitstock'
            };
            DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
               if (icsp && icsp.unitstock) {
                  self.unitstock = icsp.unitstock;
               }
            });
         }
      };

   };

});