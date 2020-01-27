'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsoo',
      dataPath: 'api/ar/arso',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arsosearch',
      resultsRowIdField: 'arsoRowid',
      detailSubTitle: [
         {label: 'global.customer', value: 'custno'},
         {label: 'global.category', value: 'prodcat'},
         {label: 'global.customer.type', value: 'custtype'}
      ],
      recentlyVisited: {
         title: {label: 'global.customer', value: 'custno'},
         description: [{label: 'global.category', value: 'prodcat'}, {label: 'global.customer.type', value: 'custtype'}]
      }
   });
});

app.service('ArsooService', function () {

   this.extendCreateController = function (self, base, arsoo) {

      // This is an optional field, but backend doesn't allow nulls, so initializing to empty string
      arsoo.custtype = '';

   };

});
