'use strict';

/**
 * Directive for form-wide readonly statement.
 */
app.directive('formReadonly', function formReadonly() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $form = $(element);

         scope.$watch(attrs.formReadonly, function (value) {

            //change all the form selects readonly attribute
            $form.find('select').each(function () {
               var $select = $(this);
               var isReadonlySet = $select.attr('data-is-readonly');

               if (!isReadonlySet) {
                  var dropDown = $select.data('dropdown');
                  //set it
                  // If the underlying SoHo control hasn't been initialized yet, make changes to the native select
                  if (!dropDown) {
                     if (value) {
                        $select.attr('readonly', 'readonly');
                        $select.prop('readonly', true);
                     } else {
                        $select.removeAttr('readonly');
                        $select.prop('readonly', false);
                     }
                  } else {
                     if (value) {
                        // The SoHo 'readonly' function can conflict with disabled conditions that may be on the dropdown,
                        // so when making readonly, we update things manually
                        $select.attr('readonly', 'readonly');
                        $select.prop('readonly', true);
                        dropDown.pseudoElem.addClass('is-readonly').prop('readonly', true);
                        dropDown.closeList();
                     } else {
                        // The SoHo 'enable' function can conflict with disabled conditions that may be on the dropdown,
                        // so when making non-readonly, we update things manually
                        $select.removeAttr('readonly');
                        $select.prop('readonly', false);
                        dropDown.pseudoElem.removeClass('is-readonly').prop('readonly', false);
                     }
                  }
               }
            });

            //change all the inputs and textareas
            // Note: SoHo drop downs have their own input element, so we need to make sure not to touch those
            //       SoHo has some inputs in their grids (toolbar search, page number), so don't touch those
            $form.find('input:not(.dropdown), textarea').not('.grid-container input').each(function () {
               var $input = $(this);

               //change all the form checkboxes and radios disabled attribute
               if ($input.is(':checkbox, :radio')) {
                  var isDisabledSet = $input.attr('ng-disabled');

                  if (!isDisabledSet) {
                     //set it
                     if (value) {
                        $input.attr('disabled', 'disabled');
                     } else {
                        $input.removeAttr('disabled');
                     }
                  }
               }
               //change all the form inputs and textarea readonly attribute
               else {
                  var isReadonlySet = $input.attr('ng-readonly');

                  if (!isReadonlySet) {
                     //set it
                     if (value) {
                        $input.attr('readonly', 'readonly');
                     } else {
                        $input.removeAttr('readonly');
                     }
                  }
               }
            });

            //change all the grids
            $form.find('.datagrid-container').each(function () {
               var $grid = $(this);
               var grid = $grid.data('datagrid');
               var hasOwnCondition = $grid.attr('data-is-editable');

               // Only proceed if this grid does not have a custom editable condition
               if (grid && !hasOwnCondition) {

                  // If form is readonly...
                  if (value) {
                     // If the current grid state is editable, then switch it to readonly
                     if (grid.settings.editable) {
                        grid.settings.editable = false;

                        // TODO: once SoHo has a public api to refresh grid row display,
                        // then use it and toggle the readonly/editable color properly
                     }
                  }
                  // ...else form is editable
                  else {
                     var allowEdit = $grid.attr('data-allow-edit');

                     // If it's an editable grid and the current grid state is non-editable, then switch it to editable
                     if (allowEdit && !grid.settings.editable) {
                        grid.settings.editable = true;

                        // TODO: once SoHo has a public api to refresh grid row display,
                        // then use it and toggle the readonly/editable color properly
                     }
                  }
               }
            });
         });
      }
   };

});
