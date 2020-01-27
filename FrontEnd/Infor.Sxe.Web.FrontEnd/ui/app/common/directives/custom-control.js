'use strict';

/**
 * Directive for custom controls that include sub-views.
 */
app.directive('customControl', function customControl(Utils) {

   return {
      restrict: 'E',
      scope: true,
      // Sub-view html for this control
      template: function (element, attrs) {
         return '<div include-view="\'' + attrs.view + '\'" data-type="' + attrs.viewType + '" data-controller="' + (attrs.controller || '') + '" data-lazy-load="true"></div>';
      },
      link: function (scope, element, attrs) {
         var options = attrs.options ? JSON.parse(attrs.options) : {};

         // TODO: is there a better way to give this directive an accessible API?
         scope.customCtrl = {};

         // Function to provide control options for the controller to access
         scope.customCtrl.getOptions = function () {

            // TODO: decide if we want to resolve dynamic options like this
            // Note: Currently Angular is doing it for us inside the stringified JSON, but this may be an issue

            // First resolve any dynamic option values (i.e. '{{...}}')
            //for (var prop in options) {
            //   if (options.hasOwnProperty(prop)) {
            //      var value = options[prop];
            //
            //      // Check if string with binding syntax
            //      if (value && typeof value === 'string' && value.indexOf('{{') === 0) {
            //         // Remove binding syntax
            //         value = value.replace('{{', '').replace('}}', '');
            //
            //         // Get the value
            //         options[prop] = Utils.getNestedValue(scope, value);
            //      }
            //   }
            //}

            return options;
         };

         // Perform final processing once controller is ready (the custom control calls this after it has initialized)
         scope.customCtrl.ready = function (control) {
            var controlRef = options.controlRef;
            var onReady = options.eventReady;

            // Provide control API to the consumer of this control (if requested via options)
            if (controlRef) {
               Utils.setNestedValue(scope, controlRef, control);
            }

            // Notify consumer that control is ready (if requested via options)
            if (onReady) {
               // Remove invoke parenthesis if present since we simply want to get the reference to the function
               onReady = onReady.replace('()', '');

               // Get function from scope
               var fn = Utils.getNestedValue(scope, onReady);

               // Call function and pass control
               if (fn) {
                  fn(control);

                  // Apply scope (if not already being applied)
                  if (!scope.$$phase) {
                     scope.$apply();
                  }
               }
            }
         };
      }
   };

});
