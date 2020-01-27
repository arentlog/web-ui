'use strict';

/**
 * Directive for a Swap List control.
 */
app.directive('swaplist', function swaplist($timeout, Utils) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $swapList = $(element);
         var status = {
            isUpdatePending: false
         };

         // Set watch on readonly condition so can disable/enable items and notify SoHo control to update
         if (attrs.isReadonly) {
            scope.$watch(attrs.isReadonly, function (value) {
               var swapListApi = $swapList.data('swaplist');

               if (value) {
                  $swapList.find('li').addClass('is-disabled');
               } else {
                  $swapList.find('li').removeClass('is-disabled');
               }

               // Need to update if control has been initialized (and update not already pending)
               if (swapListApi && !status.isUpdatePending) {
                  status.isUpdatePending = true;
                  swapListApi.updated();
                  status.isUpdatePending = false;
               }
            });
         }

         // Set watches on each list model so we can notify the SoHo control when the models change
         $swapList.find('.listview').each(function () {
            var $listView = $(this);
            var modelExp = $listView.attr('data-model');

            if (modelExp) {
               scope.$watchCollection(modelExp, function (list) {
                  var swapListApi = $swapList.data('swaplist');

                  // Only need to update if...
                  // - list has been defined
                  // - control has been initialized
                  // - update not already pending
                  if (list !== undefined && swapListApi && !status.isUpdatePending) {
                     status.isUpdatePending = true;

                     // Wait to update until we know scope has finished apply (ensure DOM li elements up-to-date)
                     $timeout(function () {
                        swapListApi.updated();
                        status.isUpdatePending = false;
                     });
                  }
               });
            }
         });

         // Listen for event that is triggered anytime user makes a change to any list
         $swapList.on('swapupdate', function () {

            // Hash map (from value to item) to hold all available items
            // Note: storage and lookup will work for both strings and numbers because object keys
            // and data-value will always be converted to strings
            var allItems = {};

            // Collect all items and clear lists
            $swapList.find('.listview').each(function () {
               var $listView = $(this);
               var valueField = $listView.attr('data-value-field');
               var list = Utils.getNestedValue(scope, $listView.attr('data-model'));

               // Put list's items in allItems map
               for (var i = 0; i < list.length; i++) {
                  var item = list[i];

                  // Get value from object (unless list of primitives)
                  var key = valueField ? Utils.getNestedValue(item, valueField) : item;

                  // Important! Because of a problem with ng-repeat on these swap lists, we manually remove angular's
                  //            $$hashKey property so that the lists are completely re-rendered.
                  if (item.$$hashKey) {
                     delete item.$$hashKey;
                  }

                  // Put by key (converted to string automatically)
                  allItems[key] = item;
               }

               // Clear list
               Utils.clearArray(list);
            });

            // Update lists according to the updated DOM elements
            $swapList.find('.listview').each(function () {
               var $listView = $(this);
               var list = Utils.getNestedValue(scope, $listView.attr('data-model'));

               // For each <li>, add item to list
               $listView.find('li').each(function () {
                  var value = $(this).attr('data-value');

                  // Get item by value
                  var item = allItems[value];

                  // Push to end of current list
                  list.push(item);
               });
            });

            // Evaluate change event expression
            if (attrs.onChange) {
               scope.$eval(attrs.onChange);
            }

            // Apply scope since a model has changed (and possibly other things in change event)
            if (!scope.$$phase) {
               scope.$apply();
            }
         });
      }
   };

});
