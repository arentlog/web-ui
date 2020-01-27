'use strict';

/**
 * Directive for the main application menu
 */
app.directive('appMenu', function appMenu($state, $timeout, DataService, MenuStateMap, MessageService, ReportService, SecurityService, StateService, UserService) {

   return {
      restrict: 'A',
      scope: true,
      templateUrl: 'ui/app/common/components/app-menu/app-menu.html',
      link: function (scope, element, attrs) {
         var reportFunctionList = ReportService.getReportFunctions();

         // Get menu items for this user
         DataService.get('api/shared/megamenu/buildmegamenu', function (topLevelList) {
            scope.topLevelList = topLevelList;

            // Pass in the menu data to be parsed for use in the SecurityService
            SecurityService.initialize(topLevelList, reportFunctionList);

            // After scope applies, tell SoHo to initialize whole body
            $timeout(function () {
               $('body').initialize({ locale: UserService.getLocale() });
            });
         });

         // Get display label for a menu item
         scope.getLabel = function (item) {
            var conventionKey = 'menu.' + item.functionname;

            // Use translated string, otherwise fallback to 'menutitle' value from the database
            if (MessageService.has(conventionKey)) {
               return MessageService.get(conventionKey);
            } else {
               return item.menutitle;
            }
         };

         // Handle click of a menu item (may be top level, 2nd level, etc.)
         scope.menuItemClick = function (item, subItemList) {
            var hasChildren = subItemList && subItemList.length > 0;

            // If has no children, interpret the click as navigating to the function
            if (!hasChildren) {
               var toState, params;
               var menuFn = item.functionname;
               var customState = MenuStateMap[menuFn];

               // State may be...
               // 1. custom mapping from MenuStateMap
               // 3. reports group (arr-reports, etc.)
               // 4. convention of menuFn = name of base state (let DSR handle which child state to navigate to
               // 5. under construction (if state doesn't exist yet)
               if (customState) {
                  toState = customState;
               } else if (menuFn.endsWith('-reports')) {
                  var reportType = menuFn.split('-')[0];
                  toState = 'reports.master';
                  params = { type: reportType };
               } else if ($state.get(menuFn)) {
                  toState = menuFn;
               } else {
                  toState = 'underConstruction';
               }

               // Go to the function's state (requesting that a new tab always be opened if state allows multiple)
               StateService.goToStateInNewTab(toState, params);

               // Close the app menu
               $(document).trigger('close-applicationmenu');
            }
         };
      }
   };

});
