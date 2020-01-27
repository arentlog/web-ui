'use strict';

/**
 * Directive for main navigation tabs.
 */
app.directive('navigationTabs', function navigationTabs($state, StateService) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {

         // Set up state handling for when a tab is activated
         element.on('activated', function (e, anchor) {
            var baseState = anchor.attr('href').replace('#', '');
            StateService.onTabActivated(baseState);
         });

         // Set up state handling for when a tab is closed
         element.on('close', function (e, li) {
            var baseState = li.children('a').attr('href').replace('#', '');
            StateService.onTabClosed(baseState);
         });

         // Set up tab closing logic (before close handling)
         element.on('beforeclose', function (e, li) {
            var tabs = element.data('tabs');
            var tabId = li.children('a').attr('href');
            var $tabLiAs = $('#nav-tab-list').children('li:not(.application-menu-trigger)').children('a');
            var numTabs = $tabLiAs.length;
            var $tabPanel = tabs.getPanel(tabId);

            // Check if any listeners want to prevent the tab from closing (as long as we're not forcing the tab closed)
            var canCloseList = li.data('canCloseListeners');
            if (canCloseList && !li.data('forceClose')) {
               for (var i = 0; i < canCloseList.length; i++) {
                  var allow = canCloseList[i]();

                  // If any listener is not allowing close, then do not proceed with close
                  if (!allow) {
                     return false;
                  }
               }
            }

            // Notify any listeners that the tab is closing
            // Note: Checking 'close' listeners here because the tab element gets removed before the 'close' event which removes functions from data
            var onCloseList = li.data('onCloseListeners');
            if (onCloseList) {
               for (var i = 0; i < onCloseList.length; i++) {
                  onCloseList[i]();
               }
            }

            // If closing the last tab, need to transition to the 'empty' state since we don't want to remain
            // in the state of a closed tab (would cause issues)
            if (numTabs === 1) {
               $state.go('empty');
            } else {
               var lastTab = $tabLiAs[numTabs - 1];
               var lastTabHrefIndex = lastTab.href.indexOf('#');
               var lastTabHref = lastTab.href.slice(lastTabHrefIndex);
               if (lastTabHref === tabId) {
                  var moreTab = $('.tab-more');
                  if (moreTab && moreTab[0].tabIndex !== -1) {
                     //automatically navigate to a new state
                     var nextToLastTab = $tabLiAs[numTabs - 2];
                     var nextToLastTabHrefIndex = nextToLastTab.href.indexOf('#');
                     var nextToLastTabHref = nextToLastTab.href.slice(nextToLastTabHrefIndex + 1);
                     StateService.goToStateInExistingTab(nextToLastTabHref);
                  }
               }
            }

            // Need to destroy the scope of the closed tab panel since we created the scope manually when adding the tab.
            // Otherwise the scope hangs around indefinitely, and there are major controller and view issues when opening that tab again.
            // Note: Performing destroy here because the tab gets removed from DOM before the 'close' event which removes element data
            if ($tabPanel.scope()) {
               $tabPanel.scope().$destroy();
            }

            // Proceed with close
            return true;
         });
      }
   };

});
