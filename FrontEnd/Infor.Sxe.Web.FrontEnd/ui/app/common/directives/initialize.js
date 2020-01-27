'use strict';

/**
 * Directive for initializing a DOM element via SoHo's .initialize() function.
 */
app.directive('initialize', function initialize(UserService) {

   return {
      restrict: 'A',
      /* Note: this low priority is set in case the element has multiple directives defined on it;
       it should run last. */
      priority: 0,
      scope: false,
      /* Note: initialize must be the last directive to run so that all child directives in the element have finished
       manipulating the DOM before we tell SoHo to initialize the DOM. We achieve this because the 'link' function is
       not called until all children are compiled and linked. */
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Note: we are adding an extra delay before initializing, otherwise tabs and drop downs don't display properly.
         setTimeout(function () {
            // SoHo initialize
            $element.initialize({ locale: UserService.getLocale() });

            // After initializing this view, we need to flag some controls within this view
            // so that they do not initialize twice in the case of nested views that may overlap the initialize call.
            // Without this, the tabs were not honoring the initial selected tab properly.
            // It can get confused if there are multiple sub-views with these types of controls.
            $element.find('.tab-container, .swaplist').attr('data-init', 'false');

            // Apply auto focus
            // Delay slightly before setting focus since field may be becoming visible in same angular digest
            // and HTML doesn't allow focus on hidden elements
            setTimeout(function () {
               // Set focus on the 1st element with the 'auto-focus' attribute
               // Note: the 'auto-focus-custom' attribute takes priority (exists when autoFocus is set via personalization)
               var customFocusElement = $element.find('[auto-focus-custom]:first');
               var focusElement = customFocusElement.length ? customFocusElement : $element.find('[auto-focus]:first');

               // Set focus (drop downs and radios have a special way to focus them)
               if (focusElement.is('.dropdown')) {
                  focusElement.data('dropdown').pseudoElem.focus();
               } else if (focusElement.is('.radio-group')) {
                  focusElement.find('input:radio:first').focus();
               } else {
                  focusElement.focus();
               }
            }, 100);
         }, 1);
      }
   };

});
