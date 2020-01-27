'use strict';

/**
 * Directive for menu funciton search.
 */
app.directive('menuFunctionSearch', function menuFunctionSearch($state, DataService, MenuStateMap, MessageService, ReportService, StateService) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $input = $(element);

         // Enter key within the field quickly goes to menu function
         // TODO: ap - enable after figure out how to prevent when selecting from list via enter
         //$input.on('keyup', function (e) {
         //   if (e.which === 13) {
         //      var value = $input.val();
         //
         //      // Normalize user's input to lower case and check if is a report
         //      if (value) {
         //         value = value.toLowerCase();
         //
         //         var isReport = ReportService.isReportFunction(value);
         //
         //         goToMenuFunction(value, isReport);
         //      }
         //   }
         //});

         // Get menu functions for this user
         DataService.get('api/shared/megamenu/buildmenufunctionlist', function (jsonResult) {
            var autoCompleteDictionary = [];
            var i, currentFunction, titleKey, functionName, menuTitle, functionLabel;
            var length = jsonResult.length;

            // Add menu functions - Try to match in the Resource file, otherwise get the menutitle
            // from the MenuTitle on the Menu definition set up in AO.  Records may not be found
            // in the resource file for menu functions that were created through extensibility.
            for (i = 0; i < length; i++) {
               currentFunction = jsonResult[i];
               functionName = currentFunction.FunctionName;
               menuTitle = currentFunction.MenuTitle;
               titleKey = 'title.' + functionName;

               if (MessageService.has(titleKey)) {
                  functionLabel = functionName + ' - ' + MessageService.get(titleKey);
               } else if (menuTitle) {
                  functionLabel = functionName + ' - ' + menuTitle;
               } else {
                  functionLabel = functionName;
               }

               autoCompleteDictionary.push({
                  label: functionLabel,
                  value: functionName
               });
            }

            // Add report functions
            var reportFunctions = ReportService.getReportFunctions();
            length = reportFunctions.length;
            for (i = 0; i < length; i++) {
               currentFunction = reportFunctions[i];
               autoCompleteDictionary.push({
                  label: currentFunction.functionname + ' - ' + currentFunction.menutitle,
                  value: currentFunction.functionname,
                  isReport: true
               });
            }

            // Set up auto-complete and selected event
            $input.autocomplete({ source: autoCompleteDictionary, autoSelectFirstItem: true });

            $input.on('selected', function (e, a, item) {
               goToMenuFunction(item.value, item.isReport);
            });
         });

         function goToMenuFunction(menuFn, isReport) {
            var toState, params;

            // Clear search input
            $input.val('');

            // Check custom map first
            var customState = MenuStateMap[menuFn];

            // State may be...
            // 1. custom mapping from MenuStateMap
            // 2. report function (arra, arrjp, etc.)
            // 3. reports group (arr-reports, etc.)
            // 4. convention of menuFn = name of base state (let DSR handle which child state to navigate to
            // 5. under construction (if state doesn't exist yet)
            if (customState) {
               toState = customState;
            } else if (isReport) {
               toState = menuFn;
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
         }
      }
   };

});
