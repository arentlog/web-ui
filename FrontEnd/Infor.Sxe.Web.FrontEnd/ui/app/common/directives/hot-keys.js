'use strict';

/**
 * Directive for hot keys.
 */
app.directive('hotKeys', function hotKeys() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var list = attrs.hotKeys ? JSON.parse(attrs.hotKeys) : [];

         // Function to add keyup listener for each configured hot key (keyup is the best fit since fires once no matter how long it's held down)
         function addListener(hotKey) {
            $element.on('keyup', function (e) {
               // If control keys match up and keyCode matches, then proceed with hot key action
               if (((hotKey.altKey && e.altKey) || (!hotKey.altKey && !e.altKey)) &&
                  ((hotKey.ctrlKey && e.ctrlKey) || (!hotKey.ctrlKey && !e.ctrlKey)) &&
                  ((hotKey.shiftKey && e.shiftKey) || (!hotKey.shiftKey && !e.shiftKey)) &&
                  e.which === hotKey.keyCode) {
                  var $firstChild = $element.children(':first');

                  // There is an issue where hot keys of parent state views can activate even when in the child state
                  // (because child state views are inside of the parent view). If this is the case then do not proceed
                  // because the parent view's content is invisible to the user so firing the action wouldn't make sense.
                  // We know this by checking if the $element's first child is a form or module container that is currently hidden.
                  if ($element.is('.view') && $firstChild.is('form:hidden, .builder-pane:hidden')) {
                     return;
                  }

                  // Prevent the default browser behavior when a hot key is activated
                  // Note: This doesn't always work in browsers, but may help in some cases
                  e.preventDefault();

                  // Stop this event from bubbling up any further in the DOM (a child view and parent view may have the
                  // same hot key and we only want the closest view's hot key to activate)
                  e.stopPropagation();

                  // Run the hot key's action expression
                  scope.$eval(hotKey.action);
               }
            });
         }

         // Add key listener for each configured hot key
         for (var i = 0; i < list.length; i++) {
            addListener(list[i]);
         }
      }
   };

});
