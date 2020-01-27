'use strict';

/**
 * Directive for including JSON views.
 */
app.directive('includeView', function includeView($compile, DataService, JsonViewService) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var viewPath = attrs.includeView;
         var viewType = attrs.type;
         var lazyLoad = attrs.lazyLoad === 'true';
         var included = false;
         var $expandableArea = $element.closest('.expandable-area');
         var $tabs = $element.closest('.tab-container');
         var tabsApi = $tabs.data('tabs');
         var tabId = null;
         var tabHasBeenActivated = false;

         // Case #1 - View in Expandable Area
         if (lazyLoad && $expandableArea.length > 0) {

            // If initially open then load the view, otherwise wait
            if ($expandableArea.is('.is-expanded')) {
               included = true;
               getView($element, scope, viewType, viewPath, attrs.controller);
            } else {
               // Listen once to the open event (called if initially open or when user opens), and include the view
               $expandableArea.one('expand', function () {
                  included = true;
                  getView($element, scope, viewType, viewPath, attrs.controller);
               });
            }
         }

         // Case #2 - View in Tab
         else if (lazyLoad && $tabs.length > 0) {
            tabId = $element.closest('.tab-panel').attr('id');

            // Check if view is in a tab that has already been activated
            if (tabsApi) {
               var $tab = tabsApi.getTab(null, tabId);

               // Check the flag that gets set on a tab when it first becomes activated
               if ($tab.children('a').data('hasBeenActivated')) {
                  tabHasBeenActivated = true;
               }
            }

            // If tab has been activated then load the view, otherwise wait until has been activated/clicked (for better performance)
            if (tabHasBeenActivated) {
               included = true;
               getView($element, scope, viewType, viewPath, attrs.controller);
            } else {
               // Listen to activated event
               $tabs.on('activated', function (e, anchor) {
                  var activatedTabId = anchor.attr('href').replace('#', '');

                  // If not already included and activated tab is this view's tab, then include the view
                  if (!included && activatedTabId === tabId) {
                     included = true;
                     getView($element, scope, viewType, viewPath, attrs.controller);
                  }
               });
            }
         }

         // Case #3 - Neither - load right away
         else {
            included = true;
            getView($element, scope, viewType, viewPath, attrs.controller);
         }
      }
   };

   /**
    * Fetch the view and include it
    */
   function getView($element, scope, viewType, viewPath, controller) {
      var path;

      // Remove single quotes (denoting constant path)
      if (viewPath.charAt(0) === '\'') {
         path = viewPath.substring(1, viewPath.length - 1);
      } else {
         // Remove one-time binding syntax
         if (viewPath.indexOf('::') === 0) {
            viewPath = viewPath.substring(2, viewPath.length);
         }

         // Variable path
         path = scope.$eval(viewPath);
      }

      // Do not proceed if no view path
      if (!path) {
         return;
      }

      // HTML or JSON
      if (viewType === 'HTML') {
         // Remove absolute '/' before getting html file
         if (path.startsWith('/')) {
            path = path.replace('/', '');
         } else {
            // Add base path for relative paths
            path = 'ui/app/modules/' + path;
         }

         DataService.get(path, function (html) {
            addView($element, scope, html, controller);
         });
      } else {
         // Get JSON view and insert compiled html into element
         JsonViewService.getView(path).then(function (html) {
            addView($element, scope, html, controller);
         });
      }
   }

   /**
    * Add view to DOM and compile it
    */
   function addView($element, scope, html, controller) {

      // Add controller to run if given
      if (controller) {
         html = '<div ng-controller="' + controller + '" style="height: 100%;">' + html + '</div>';
      }

      // Add html to DOM
      // Note: it is important that we add the html before compiling it because some directives
      // may need to reach up to elements in the parent view
      $element.html(html);

      // Tell Angular to compile it
      $compile($element.contents())(scope.$new());
   }
});
