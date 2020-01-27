'use strict';

/**
 * Directive for API of a View control.
 */
app.directive('view', function view(Utils) {

   return {
      restrict: 'A',
      scope: true, // Needed for controller
      controllerAs: 'view', // We are using the directive's controller as the View control
      controller: function () {
         var self = this;

         self.element = null;
         self.controlIds = null;

         // API to get an array of all the "in-use" control ids in this view
         self.getControlIds = function () {
            return self.controlIds;
         };

         // API to check if a particular control is currently "in-use" in this view
         // Note: "in-use" means the control exists and is not excluded via personalization settings
         self.hasControl = function (id) {
            return self.controlIds.indexOf(id) >= 0;
         };

         // API to reset auto-focus for this view (only needed for re-applying focus, not for initial auto-focus)
         self.applyAutoFocus = function () {
            // Note: the 'auto-focus-custom' attribute takes priority (exists when autoFocus is set via personalization)
            var customFocusElement = self.element.find('[auto-focus-custom]:first');
            var focusElement = customFocusElement.length ? customFocusElement : self.element.find('[auto-focus]:first');

            // Delay slightly before setting focus since field may be becoming visible in same angular digest
            // and HTML doesn't allow focus on hidden elements
            setTimeout(function () {
               // Set focus (drop downs and radios have a special way to focus them)
               if (focusElement.is('.dropdown')) {
                  var dropDown = focusElement.data('dropdown');

                  if (dropDown) {
                     dropDown.pseudoElem.focus();
                  } else {
                     focusElement.focus();
                  }
               } else if (focusElement.is('.radio-group')) {
                  focusElement.find('input:radio:first').focus();
               } else {
                  focusElement.focus();
               }
            }, 100);
         };
      },
      link: function (scope, element, attrs, ctrl) {
         var $element = element;
         var controlRef = attrs.controlRef;
         var onReady = attrs.onReady;
         var controlIds = attrs.controlIds;

         // Add element to ctrl
         ctrl.element = $element;

         // Add control ids to ctrl
         ctrl.controlIds = controlIds ? JSON.parse(controlIds) : [];

         // Wait for the view to be initialized before making the control ready (for consistency and future considerations)
         $element.on('initialized', function () {

            // Set control somewhere within scope, if requested
            if (controlRef) {
               Utils.setNestedValue(scope, controlRef, ctrl);
            }

            // Notify that control is ready, if requested
            if (onReady) {
               // Remove invoke parenthesis if present since we simply want to get the reference to the function
               onReady = onReady.replace('()', '');

               // Get function from scope
               var fn = Utils.getNestedValue(scope, onReady);

               // Call function and pass control
               if (fn) {
                  fn(ctrl);

                  // Apply scope (if not already being applied)
                  if (!scope.$$phase) {
                     scope.$apply();
                  }
               }
            }
         });
      }
   };

});
