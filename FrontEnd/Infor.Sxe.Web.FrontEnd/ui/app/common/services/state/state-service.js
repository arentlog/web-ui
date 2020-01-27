'use strict';

/**
 * Service for handling the interaction between states and the main navigation tabs (module tabs),
 * as well as other complex state-related functionality.
 */
app.service('StateService', function StateService($compile, $deepStateRedirect, $rootScope, $state, $stickyState, Constants,
                                                  ContextService, MessageService, UserActivityService, UserService) {
   /* Properties */

   // Status variable to help how we manage state transitions and tabs
   var status = {
      ignoreTabActivated: false,
      existingTabRequested: false,
      newTabRequested: false,
      respondingToTabActivated: false
   };

   // Reference to SessionService (since Angular doesn't allow circular dependency injection)
   var SessionService = null;


   /* Public methods */

   /**
    * Initialize this service (state transition handling, etc.)
    */
   this.initialize = function (sessionService) {
      SessionService = sessionService;
      $rootScope.$on('$stateChangeStart', onStateChangeStart);
      $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
   };

   /**
    * Handle when a main navigation tab is activated
    */
   this.onTabActivated = function (baseState) {
      // When the active tab is switched by the user, go to that tab's base state and let DSR redirect to most recent child state
      // Note: We ignore the activated event when the tab switch is caused by a state change
      if (!status.ignoreTabActivated) {
         status.respondingToTabActivated = true;
         ContextService.respondingToTabActivated = true;
         $state.go(baseState);
         status.respondingToTabActivated = false;
      }
   };

   /**
    * Handle when a main navigation tab is successfully closed
    */
   this.onTabClosed = function (baseState) {
      // Clear the context of every state in the closed tab
      ContextService.clearStateTree(baseState);

      // Reset the base state for the closed tab so that we can get back into it properly next time the function is opened
      // Need to delay reset until state has transitioned away
      setTimeout(function () {
         $stickyState.reset(baseState);
         $deepStateRedirect.reset(baseState);
      }, 100);
   };

   /**
    * Special api for going to a state in an existing tab (if that state already has a tab open), otherwise open a new tab.
    * Note: this will be rarely used since the standard logic handles most cases properly.
    */
   this.goToStateInExistingTab = function (stateName, params, options) {
      status.existingTabRequested = true;
      $state.go(stateName, params, options);
      status.existingTabRequested = false;
   };

   /**
    * Special api for going to a state and forcing open a new tab (if that state allows multiple) instead of using the existing tab.
    */
   this.goToStateInNewTab = function (stateName, params) {
      var toState = $state.get(stateName);
      var allowMultiple = (toState && toState.data && toState.data.allowMultiple) ? true : false;

      // If state allows multiple, we need to go to the state in a special way to make sure 'onStateChangeStart' fires and a new tab is opened
      if (allowMultiple) {
         var defaultState = toState.deepStateRedirect ? toState.deepStateRedirect.default : '';

         // Have to go to default state instead of base in order to get event to fire
         if (defaultState) {
            stateName = defaultState;
         }

         status.newTabRequested = true;
         $state.go(stateName, params, { reload: true });
         status.newTabRequested = false;
      } else {
         $state.go(stateName, params);
      }
   };


   /* Private methods */

   /**
    * Handle when a state change is requested (login interceptor, module tabs, etc.)
    */
   function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
      var toStateName = toState.name;
      var fromStateName = fromState ? fromState.name : '';

      // Sometimes a prevented base state comes through here because of DSR (ignore it)
      if (event.defaultPrevented) {
         return;
      }

      // Catch if not authenticated
      if (!SessionService.isAuthenticated()) {

         // If going to login and we've already loaded pre-login data
         if (toStateName === 'login' && SessionService.isPreLoginDataLoaded()) {
            // Let the state transition proceed
         } else {
            // Prevent state transition
            event.preventDefault();

            // Load the pre-login data before proceeding with authentication check
            if (!SessionService.isPreLoginDataLoaded()) {
               SessionService.loadPreLoginData(function () {
                  SessionService.authenticate(toState, toParams);
               });
            } else {
               SessionService.authenticate(toState, toParams);
            }
         }

         // Handle transition to 'empty' state (don't want to open a tab)
      } else if (toStateName === 'empty') {
         ContextService.clearContext(); // Notify that context should be cleared

         // Validate user has permission to enter the state
      } else if (!UserService.isStateAllowed(toState, toParams)) {
         event.preventDefault();
         MessageService.error('special.user.access.denied.title', 'special.user.access.denied.message');

         // Handle state change
      } else {
         var title = MessageService.get(toState.data ? toState.data.tabTitle : '');
         var $tabs = $("#nav-tab-container");
         var tabsApi = $tabs.data('tabs');
         var $tabLis = $tabs.find('#nav-tab-list li:not(.application-menu-trigger)');

         // Get base state names (i.e. arsl, oeet, oeet2)
         var stateNameSplits = toStateName.split('.');
         var toStateBase = stateNameSplits[0];
         var toStateChild;
         if (stateNameSplits.length > 1) {
            toStateChild = stateNameSplits[1];
         }
         var fromStateBase = fromStateName.split('.')[0];

         // Tab identifier is base of state name
         var tabId = toStateBase;

         // Check if there is already a tab for this state
         var stateTabExists = $tabLis.find('a[href="#' + tabId + '"]').length > 0;
         var allowMultiple = (toState.data && toState.data.allowMultiple) ? true : false;

         // Check if the first state (immediately after login or refresh)
         var isEntryState = !fromStateName;

         // Check if navigating within same tab (same menu function instance...same base state)
         var isNavWithinTab = fromStateBase === toStateBase;

         // Add new tab (flagging ignore of activated event)
         if (isEntryState || !stateTabExists) {
            status.ignoreTabActivated = true;
            tabsApi.add(tabId, {name: title, isDismissible: true});

            // Activate the new tab (if not already activated by SoHo which happens when it's the only tab)
            if (!tabsApi.isActive(tabId)) {
               tabsApi.activate('#' + tabId);
            }
            status.ignoreTabActivated = false;

            // Add view container and module tab directive
            // Note: It is important to create a new scope here since we are managing the add/remove of
            //       tabs and view containers. We must destroy the scope when the tab closes.
            var $tabPanel = $("#" + tabId);
            $tabPanel.append('<div ui-view="' + tabId + '"></div>');
            $tabPanel.attr('module-tab', tabId);
            $compile($tabPanel)($tabPanel.scope().$new());

            // Open another tab of same state
         } else if (stateTabExists && allowMultiple && !status.existingTabRequested && !status.respondingToTabActivated &&
                   (status.newTabRequested || !isNavWithinTab)) {

            // Determine which numbered state to go to (oeet, oeet2, oeet3, etc.)
            var nextState = getNextAvailableState(toStateBase, $tabLis);

            //if the passed in state had a child, add it back here
            if (toStateChild) {
               nextState += '.' + toStateChild;
            }

            // Go to numbered state instead (and let this state change tab code run again)
            if (nextState) {
               event.preventDefault();
               $state.go(nextState, toParams, { notify: true });
            } else {
               // We exceeded the max. Stop and show an error.
               event.preventDefault();
               MessageService.error('global.error', 'error.maximum.multiple.function.tabs');
            }

            // Activate existing tab if not already active (flagging ignore of activated event)
         } else if (stateTabExists) {
            if (!tabsApi.isActive(tabId)) {
               status.ignoreTabActivated = true;
               tabsApi.activate('#' + tabId);
               status.ignoreTabActivated = false;
            }
         }

         // Notify that context should be cleared if navigating to a new/different tab
         if (isEntryState || !isNavWithinTab) {
            ContextService.clearContext();
         }
      }
   }

   /**
    * Handle when a state change successfully completes (context switching, user activity, etc.)
    */
   function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      var isEntryState = !fromState.name;

      // Clear the fromState's context if...
      // - it is 'exited' (removed from DOM)
      // - it is 'entered' (from can be 'entered' when we reload the current state; need to clear since will re-add entities when view is re-added)
      // Note: 'inactive' means it is still in the DOM but not the active state; 'active' happens when it is the parent of the toState
      if (!isEntryState && (fromState.status === 'exited' || fromState.status === 'entered')) {
         ContextService.clearState(fromState);

         // We also need to clear the parent of a view-less ".edit" state if we are exiting the edit state and not going back to
         // the inactive parent state (without reload). Otherwise old context hangs around on the setup detail states (arsc.detail, etc.).
         var fromParent = $state.get('^', fromState);
         if (!fromState.views && fromState.name.endsWith('.edit') && !(fromParent === toState && toState.status === 'active')) {
            ContextService.clearState(fromParent);
         }
      }

      // Switch to toState's context
      ContextService.switchToState(toState);

      // Record user activity for session handling
      UserActivityService.recordActivity();
   }

   /**
    * Get the next available state name of an 'allowMultiple' set of states
    */
   function getNextAvailableState(baseState, $tabLis) {
      var availableState = null;
      var stateName = null;

      // Make sure base state has no number (oeet not oeet2)
      var baseStateNoNumber = baseState.replace(/[0-9]/g, '');

      // Check tab availability (oeet, oeet2, oeet3, etc.) until find available or reach the max
      for (var i = 1; i <= Constants.MAX_MULTIPLE_FUNCTION_TABS; i++) {
         stateName = i > 1 ? baseStateNoNumber + i : baseStateNoNumber;

         // If tab is available, use it. Otherwise try the next.
         if ($tabLis.find('a[href="#' + stateName + '"]').length === 0) {
            availableState = stateName;
            break;
         }
      }

      return availableState;
   }

});