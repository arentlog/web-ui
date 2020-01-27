'use strict';

/**
 * Directive for grids.
 */
app.directive('grid', function grid(GridService, Utils) {

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'grid',
      controller: function () {
         var self = this;

         self.isModelChangeFromGridSort = false;
      },
      link: function (scope, element, attrs, ctrl) {
         var $element = $(element);
         var optionsAttr = attrs.options;
         var options = {};

         // Grab custom options passed via the data-options attribute
         // Option 1 - stringified JSON
         // Option 2 - reference to object within scope
         if (optionsAttr) {
            if (optionsAttr.charAt(0) === '{') {
               // Switch {| and |} back to standard expression bindings
               options = JSON.parse(optionsAttr.replace(/{\|/g, '{{').replace(/\|}/g, '}}'));
            } else {
               options = scope.$eval(optionsAttr);
            }
         }

         // Make grid
         var grid = GridService.make(scope, $element, ctrl, options);

         // Set grid control somewhere within scope if requested
         if (attrs.controlRef) {
            Utils.setNestedValue(scope, attrs.controlRef, grid);
         }

         // If requested, bind the grid to a data set on scope (by reloading the grid's data when data set changes)
         if (attrs.model) {
            scope.$watchCollection(attrs.model, function (dataset) {

               // Ignore the change if was the result of user sorting the grid (so don't conflict with sort feature)
               if (ctrl.isModelChangeFromGridSort) {
                  ctrl.isModelChangeFromGridSort = false;
                  return;
               }

               if (dataset) {
                  // Clear out search filter when dataset changes (otherwise grid row rendering gets messed up)
                  if (grid.toolbar) {
                     grid.filterExpr = [];
                     grid.toolbar.find('.searchfield').val('');
                  }

                  var sortId = grid.sortColumn.sortId;
                  var sortAsc = grid.sortColumn.sortAsc;

                  // If grid currently has a sort column set, then preserve that sort order before loading into grid
                  if (sortId) {
                     // Perform the sort using Soho's built-in "sortFunction"
                     dataset.sort(grid.sortFunction(sortId, sortAsc));

                     // Load the new data
                     grid.loadData(dataset);

                     // Set the visual indicator
                     grid.setSortIndicator(sortId, sortAsc);

                     // Since sorting will re-fire this watch function, set the flag so we know.
                     ctrl.isModelChangeFromGridSort = true;

                     // However, it is possible that the dataset will be unchanged by the sorting, so make sure the flag
                     // gets reset back to false after a slight delay.
                     setTimeout(function () {
                        ctrl.isModelChangeFromGridSort = false;
                     }, 200);
                  } else {
                     grid.loadData(dataset);
                  }
               }
            });
         }

         // Editable condition
         if (attrs.isEditable) {
            scope.$watch(attrs.isEditable, function (value) {
               if (value) {
                  // If the current grid state is non-editable, then switch it to editable
                  if (!grid.settings.editable) {
                     grid.settings.editable = true;

                     // TODO: once SoHo has a public api to refresh grid row display,
                     // then use it and toggle the readonly/editable color properly
                  }
               } else {
                  // If the current grid state is editable, then switch it to readonly
                  if (grid.settings.editable) {
                     grid.settings.editable = false;

                     // TODO: once SoHo has a public api to refresh grid row display,
                     // then use it and toggle the readonly/editable color properly
                  }
               }
            });
         }

         // Notify any listeners to the 'ready' event
         $element.trigger('ready', grid);
      }
   };

});
