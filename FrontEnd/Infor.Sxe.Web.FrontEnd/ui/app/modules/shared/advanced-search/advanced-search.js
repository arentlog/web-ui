'use strict';

/**
 * Control for advanced search functionality (usually Inquiry screen searches).
 */
app.controller('AdvancedSearchCtrl', function ($filter, $scope, $state, AppInfoService, Constants, MessageService, ModalService, Utils) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   self.isForIES = options.isForIES;

   self.hideSearchButton = options.hideSearchButton;

   self.hideClearButton = options.hideClearButton;

   self.hideSaveSearch = options.hideSaveSearch;

   self.showDefault = options.showDefault;

   // Hold a local reference to the criteria object
   var criteria = Utils.getNestedValue($scope, options.criteria);

   // Make a copy of the initial criteria so we can revert to it when user clicks reset
   var defaultCriteria = angular.copy(criteria);

   // Get current menu function
   var menuFn = $state.current.data.menuFn;

   // Set criteria view path for dynamic inclusion
   self.criteriaViewFile = options.criteriaView.includes('(') ? Utils.getNestedValue($scope, options.criteriaView) : options.criteriaView;

   // Get selected criteria fields and saved searches from local storage
   self.storageKey = '';
   if (typeof options.storageKey !== 'undefined') {
      self.storageKey = AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_ADVANCED_SEARCH + '_SK_' + Utils.getNestedValue($scope, options.storageKey).toUpperCase();
   } else {
      self.storageKey = AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_ADVANCED_SEARCH + '_' + menuFn.toUpperCase();
   }
   var storageJson = localStorage[self.storageKey];
   var storageValue = storageJson ? JSON.parse(storageJson) : null;

   // If no local storage data, then get default selected criteria
   if (!storageJson) {
      storageValue = {
         selectedCriteria: Utils.getNestedValue($scope, options.defaultSelectedCriteria) || [],
         savedSearches: []
      };
   };

   // Set watch on available criteria list and bind it to self.criteriaList (since need the updated array if it changes)
   $scope.$watch(options.criteriaList, function (list) {
      self.criteriaList = list;

      // Sort criteria list by display value (label)
      self.criteriaList = $filter('orderBy')(self.criteriaList, 'label');
   });

   // Set current selected criteria
   self.selectedCriteria = storageValue.selectedCriteria;

   /**
    * Determine if criteria is among those selected for display
    * @param name {string} Name of the property on the criteria object
    * @returns {Boolean} Returns 'true' if the criteria should be displayed
    */
   self.isSelected = function (name) {
      if (name) {
         return self.selectedCriteria && self.selectedCriteria.indexOf(name) >= 0;
      } else {
         return false;
      }
   };

   // Clear/reset criteria
   self.clear = function (dontClearSelectedSearch) {
      // Change the criteria object back to the default criteria (both this reference and the client's get updated)
      // Copy the default again since there may be sub objects or arrays
      Utils.replaceObject(criteria, angular.copy(defaultCriteria));

      // Clear selected search
      if (!dontClearSelectedSearch) {
         self.selectedSearch = '';
      };

      self.selectedCriteria = storageValue.selectedCriteria;

      if (options.clearFunction) {
         var clearFn = Utils.getNestedValue($scope, removeTrailingParens(options.clearFunction));
         clearFn();
      }
   };

   // Perform search
   self.search = function (callBack, wideOpenPopulate) {
      var searchFn = Utils.getNestedValue($scope, removeTrailingParens(options.searchFunction));
      searchFn(function() {
         if (callBack) {
            callBack();
         }
      }, wideOpenPopulate);
   };

   function removeTrailingParens(functionName) {
      return functionName.replace('()', '');
   }

   // Perform search and save current criteria
   self.searchSave = function () {
      ModalService.showModal('shared/advanced-search/advanced-search-save.json', 'AdvancedSearchSaveCtrl as advsrchsv', $scope, function (modal) {
         self.saveSearchModal = modal;
      });
   };

   /**
    * Perform search and save search criteria
    */
   self.searchSaveFinish = function (searchName, isDefault) {
      if (searchName) {

         if (isDefault) {
            for (var i = 0; i < storageValue.savedSearches.length; i++) {
               storageValue.savedSearches[i].isDefault = false;
            }
         };

         var idx = storageValue.savedSearches.findIndex(function (item) {
            return item.name === searchName;
         });

         // Check if item is already in the list

         var saveCriteria = criteria;
         if (self.isForIES && options.returnCriteriaForSave) {
            var criteriaReturnFunction = Utils.getNestedValue($scope, removeTrailingParens(options.returnCriteriaForSave));
            saveCriteria = {};
            if (criteriaReturnFunction) {
               saveCriteria.selectedCriteriaFromModel = criteriaReturnFunction();
            };
            saveCriteria.selectedCriteria = self.selectedCriteria;
            saveCriteria.criteriaList = self.criteriaList;
         };

         // Replace item if it already exists
         if (idx >= 0) {
            storageValue.savedSearches[idx].criteria = angular.copy(saveCriteria);
            storageValue.savedSearches[idx].isDefault = isDefault;
         } else {
            // Otherwise add new item to list
            var newSearch = {
               name: searchName,
               criteria: angular.copy(saveCriteria),
               isDefault: isDefault
            };
            storageValue.savedSearches.push(newSearch);
         }

         writeLocalStorage();

         // Add search to list and select it
         buildSearchList(searchName);

         // Perform the actual search
         self.search();
      }
   };

   /**
    * Delete a saved search
    */
   self.deleteSearch = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (self.selectedSearch) {
            var deleteName = self.selectedSearch;

            // Find the saved search from local storage
            var idx = storageValue.savedSearches.findIndex(function (item) {
               return item.name === deleteName;
            });

            if (idx >= 0) {
               self.selectedSearch = '';

               // Remove search from local storage
               storageValue.savedSearches.splice(idx, 1);
               writeLocalStorage();

               // Find the saved search in dropdown
               idx = self.searchList.findIndex(function (item) {
                  return item.value === deleteName;
               });

               // Remove from search dropdown
               if (idx >= 0) {
                  self.searchList.splice(idx, 1);
               }

               // Clear criteria
               self.clear();
            }
         }
      });
   };

   /**
    * Save selected criteria to local storage when changed
    */
   self.selectedCriteriaChanged = function () {
      // When hiding a criteria reset to default value
      storageValue.selectedCriteria.forEach(function (item) {
         if (!self.isSelected(item)) {
            // Look for default value for this criteria
            if (defaultCriteria && defaultCriteria.hasOwnProperty(item)) {
               criteria[item] = defaultCriteria[item];
            } else {
               // Otherwise just remove criteria property
               delete criteria[item];
            }
         }
      });

      // Update local storage with new list of visible criteria
      storageValue.selectedCriteria = self.selectedCriteria;
      writeLocalStorage();
   };

   /**
    * Load selected search from local storage when changed
    */
   self.selectedSearchChanged = function (dontRunFirstSearch) {
      if (self.selectedSearch) {
         // Check if item is already in the list
         var idx = storageValue.savedSearches.findIndex(function (item) {
            return item.name === self.selectedSearch;
         });

         // Search found
         if (idx >= 0) {
            var storedCriteria = storageValue.savedSearches[idx].criteria;
            if (self.isForIES && options.setCriteriaFromSave) {
               self.clear(true);
               if (dontRunFirstSearch) {
                  self.doInteriorSearch(storedCriteria);
               } else {
                  self.search(function () {
                     self.doInteriorSearch(storedCriteria);
                  }, true);
               }
            } else {
               // Change the criteria object to the stored criteria (both this reference and the client's get updated)
               Utils.replaceObject(criteria, angular.copy(storedCriteria));
            };
         } else {
            // Should never happen but if search not found, clear the search criteria
            self.clear();
         }
      } else {
         // Clearing the search name should clear the search criteria
         self.clear();
      }
   };

   self.doInteriorSearch = function (storedCriteria) {
      var setCriteriaFromSave =
         Utils.getNestedValue($scope, removeTrailingParens(options.setCriteriaFromSave));
      if (setCriteriaFromSave) {
         setCriteriaFromSave(angular.copy(storedCriteria).selectedCriteriaFromModel);
      };
      self.selectedCriteria = angular.copy(storedCriteria).selectedCriteria;
      self.criteriaList = angular.copy(storedCriteria).criteriaList;
      self.search();
   };


   if (self.showDefault) {
      for (var i = 0; i < storageValue.savedSearches.length; i++) {
         if (storageValue.savedSearches[i].isDefault) {
            self.selectedSearch = storageValue.savedSearches[i].name;
            self.selectedSearchChanged(options.isForIES);
            break;
         };
      };
   };

   /**
    * Builds the list of saved searches and optionally selects one of them
    */
   function buildSearchList(selectedItem) {
      // Load list of saved searches
      self.searchList = [];
      storageValue.savedSearches.forEach(function (item) {
         if (item.name) {
            self.searchList.push({ value: item.name, label: item.name });
         }
      });

      // Order searches by name (value)
      self.searchList = $filter('orderBy')(self.searchList, 'value');

      if (selectedItem) {
         self.selectedSearch = selectedItem;
      }
   }

   /**
    * Write to local storage
    */
   function writeLocalStorage() {
      localStorage[self.storageKey] = JSON.stringify(storageValue);
   }

   buildSearchList();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

app.controller('AdvancedSearchSaveCtrl', function ($scope) {
   var self = this;
   var advSrchCtrl = $scope.advsrch;

   // Bound to view
   self.searchName = advSrchCtrl.selectedSearch || '';

   self.showDefault = advSrchCtrl.showDefault;

   self.isDefault = false;

   // Cancel action
   self.cancel = function () {
      advSrchCtrl.saveSearchModal.destroy();
   };

   // Submit action
   self.submit = function () {
      // Close modal
      advSrchCtrl.saveSearchModal.destroy();

      advSrchCtrl.searchSaveFinish(self.searchName, self.isDefault);
   };
});
