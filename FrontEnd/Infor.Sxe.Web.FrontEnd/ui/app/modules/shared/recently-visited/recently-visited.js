'use strict';

/**
 * The shared recently visited control (in the left sidebar)
 *
 * Available options (from base.recentlyVisitedOptions)
 *
 * controlRef - where to make the recently visited control and its API available
 *    - ex. 'base.recentlyVisitedControl'
 * listKey - a key value for distinguishing the list of records (usually the menu function name)
 *    - ex. 'aric'
 * rowIdField - name of field on the records containing the row id
 *    - ex. 'rowID'
 * stateRef - the state name to navigate to when a record is clicked (leave off the params portion to use the row id)
 *    - ex. 'aric.detail'
 * title - how to display the record title in the list
 *    - ex. {label: 'global.customer.number', value: 'custno'}
 * description - how to display the record description in the list
 *    - ex. [
 *             {label: 'global.customer', value: 'custno'},
 *             {label: 'global.type', valueFunction: 'base.formatCustomerType'}
 *          ]
 *    - Note: If labelFunction or valueFunction is used, it must be a reference to a function on the base controller
 *            that receives the record as a parameter and returns the label or value string to display
 * readyCallback - where to find the callback function to invoke after the recently visited control is ready to be used
 *    - ex. 'base.recentlyVisitedControlReady'
 *    - Note: Must be on the base controller; Only necessary for special cases
 * [storedFields - to be added in the future if needed]
 * [clickCallback - to be added in the future if needed]
 */
app.controller('RecentlyVisitedCtrl', function($scope, $state, RecentlyVisitedService, Utils) {
   var self = this;
   var options = $scope.base.recentlyVisitedOptions;
   var stateRef = options.stateRef || '';

   // Get list
   self.list = RecentlyVisitedService.getList(options.listKey);

   /**
    * API to add a record to the list
    * @param record - the record object to add
    */
   self.addToList = function (record) {
      self.list = RecentlyVisitedService.addToList($scope, record, options.rowIdField, options.listKey, options);
   };

   /**
    * API to remove a record from the list
    * @param rowId - the rowId of the record to remove
    */
   self.removeFromList = function (rowId) {
      self.list = RecentlyVisitedService.removeFromList(options.listKey, rowId);
   };

   /**
    * Private method for view to build the ui-sref.
    * Allowing for option to pass the params portion if needed for special cases.
    */
   self.getStateRef = function (item) {
      if (stateRef.includes('(')) {
         return stateRef;
      } else {
         return stateRef + '({id: item.rowID})';
      }
   };

   // Provide reference to control API to the consumer of this control (if requested via options)
   if (options.controlRef) {
      Utils.setNestedValue($scope, options.controlRef, self);
   }

   // Notify consumer that control is ready (if requested via options)
   if (options.readyCallback) {
      // Get function from scope
      var fn = Utils.getNestedValue($scope, options.readyCallback);

      // Call function and pass control
      fn(self);
   }

});
