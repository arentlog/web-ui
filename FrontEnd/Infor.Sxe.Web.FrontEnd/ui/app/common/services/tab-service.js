'use strict';

/**
 * Service for interacting with the main navigation tabs
 */
app.service('TabService', function TabService() {

   /**
    * Get base state object for the module tab for the given scope.
    */
   this.getBaseState = function (scope) {
      return scope.moduleTab ? scope.moduleTab.getBaseState() : null;
   };

   /**
    * Get base state name for the module tab for the given scope.
    */
   this.getBaseStateName = function (scope) {
      return scope.moduleTab ? scope.moduleTab.getBaseStateName() : '';
   };

   /**
    * Get menu function for the module tab for the given scope.
    */
   this.getMenuFunction = function (scope) {
      return scope.moduleTab ? scope.moduleTab.getMenuFunction() : '';
   };

   /**
    * Close the tab of the given state.
    * Note: This will *not* call any 'canUserCloseTab' functions, but it will call any 'onCloseTab' functions
    */
   this.closeTab = function (stateOrName) {
      var $tab = getTabByState(stateOrName);
      var tabId = getTabIdByState(stateOrName);

      // Set flag to force the tab closed (which ignores 'canUserCloseTab' functions)
      $tab.data('forceClose', true);

      // Tell SoHo to remove the tab
      $('#nav-tab-container').data('tabs').remove(tabId);
   };

   /**
    * Register a function to be called (which should return true or false) when the user attempts to close
    * the state's tab to determine whether or not to proceed with closing the tab.
    */
   this.canUserCloseTab = function (stateOrName, fn) {
      var $tab = getTabByState(stateOrName);

      // Attach function to the state's tab element
      addListenerToTab($tab, 'canCloseListeners', fn);
   };

   /**
    * Register a function to be called when state's tab closes (either by the user or by calling TabService.closeTab()).
    */
   this.onCloseTab = function (stateOrName, fn) {
      var $tab = getTabByState(stateOrName);

      // Attach function to the state's tab element
      addListenerToTab($tab, 'onCloseListeners', fn);
   };


   // Private methods

   /**
    * Get tab element (<li>) for given state
    */
   function getTabByState(stateOrName) {
      var tabId = getTabIdByState(stateOrName);

      return $('#nav-tab-container').data('tabs').getTab(null, tabId);
   }

   /**
    * Get tab id for given state
    * Note: tab id is the first state (e.g. 'arsc' in 'arsc.detail') in the state name
    */
   function getTabIdByState(stateOrName) {
      var stateName = typeof stateOrName === 'object' ? stateOrName.name : stateOrName;

      return stateName.split('.')[0];
   }

   /**
    * Attach listener function to the tab element (so it's lifespan is the lifespan of the tab in the DOM)
    */
   function addListenerToTab($tab, listenerType, fn) {
      // Get or create listener list
      var functionList = $tab.data(listenerType) || [];

      // Add function
      functionList.push(fn);

      // Attach list to element
      $tab.data(listenerType, functionList);
   }

});
