'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('underConstruction', {
      url: '/underConstruction',
      views: {
         'underConstruction@': {
            templateUrl: 'ui/app/modules/under-construction/index.html'
         }
      },
      data: {
         tabTitle: 'Under Construction'
      }
   });
});
