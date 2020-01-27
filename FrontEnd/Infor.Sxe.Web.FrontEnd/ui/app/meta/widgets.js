'use strict';

/**
 * Definitions of all our global sidebar widgets
 */
app.factory('Widgets', function Widgets() {

   return {
      JOURNAL: {
         title: 'global.journal',
         icon: '#icon-notes',
         expanded: true,
         contentClass: 'no-padding',
         templateUrl: 'ui/app/modules/shared/journal/journal.html'
      },
      RECENTLY_VISITED: {
         title: 'global.recently.visited',
         icon: '#icon-number-list',
         expanded: true,
         contentClass: 'no-padding',
         templateUrl: 'ui/app/modules/shared/recently-visited/recently-visited.html'
      },
      SEARCH: {
         title: 'global.search',
         icon: '#icon-search',
         expanded: true,
         personalize: true,
         contentClass: 'top-padding',
         uiView: 'search'
      }
   };
});
