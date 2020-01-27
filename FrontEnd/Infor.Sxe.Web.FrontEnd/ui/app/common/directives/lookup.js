'use strict';

/**
 * Directive for lookup fields.
 */
app.directive('lookup', function lookup(ConfigService, DataService, LookupService, MessageService, MruService, Utils, Constants, ImageService) {

   return {
      restrict: 'A',
      scope: true, // Needed for controller
      priority: 100, // Need to lower the priority so that field-format runs first
      controllerAs: 'lkup',
      controller: function ($scope) {
         var self = this;
         self.input = null; // jQuery input element
         self.lookup = null; // SoHo lookup plugin
         self.grid = null; // lookup grid
         self.modal = null; // lookup modal
         self.options = null; // lookup options (calculated from default, metadata profile, and custom options)
         self.isGridCell = false; // is inside grid cell
         self.isIES = false; // is IES lookup
         self.status = {
            isTyping: false, // is user typing in a value in order to search via the lookup
            isSelecting: false // is in process of applying the selection of a record from lookup or auto-complete
         };

         self.criteriaList = [];

         self.criteraValues = {};

         self.selectedCriteria = {};

         self.overrideCriteria = {};

         self.dataUri = '';

         self.storageKey = '';

         // Function to get search term value to use in initial search (if user is typing one in)
         self.getInitialSearchValue = null;

         // Perform search with given criteria and update grid
         // Note: the 3rd 'options' parameter is optional
         self.search = function (criteria, searchValue, optionsOrCallback, callbackOrBlank) {
            var opts = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
            var callback = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callbackOrBlank;
            var params = {};
            criteria = angular.copy(criteria); // make a copy since this function alters the criteria object

            // Default busy option is true if that option is not passed
            var busy = opts.busy === undefined ? true : opts.busy;

            // Non-IES search
            if (!self.isIES) {
               // If the searchMethod is a 'GET' then perform an http get instead of a post
               if (self.options.searchMethod === 'GET') {
                  var searchPath = self.options.searchPath;
                  var pathParam;

                  // Apply criteria to path/params
                  for (var prop in criteria) {
                     pathParam = '{' + prop + '}';

                     // If searchPath has the param defined on its path (e.g. .../arsl/{custno}), then apply to path
                     if (searchPath.includes(pathParam)) {
                        searchPath = searchPath.replace(pathParam, encodeURIComponent(criteria[prop]));
                     } else {
                        // Otherwise, apply as a url/query param
                        params[prop] = criteria[prop];
                     }
                  }

                  // Apply value to search path (determined by 'searchParamValueField'), or use empty string
                  if (self.options.searchParamValueField && !self.options.searchCriteriaFunction) {
                     pathParam = '{' + self.options.searchParamValueField + '}';

                     // Handle null/undefined values as empty string for url purposes
                     // If not using a search value, the path param placeholder needs to be replaced with blank
                     var queryValue = searchValue || searchValue === 0 ? searchValue : '';

                     // Apply queryValue to path or as a param
                     if (searchPath.includes(pathParam)) {
                        searchPath = searchPath.replace(pathParam, encodeURIComponent(queryValue));
                     } else {
                        params[self.options.searchParamValueField] = queryValue;
                     }
                  }

                  // Make call
                  DataService.get(searchPath, { params: params, busy: busy }, function (data) {
                     var results = self.getResultsFromResponse(data);
                     callback(results);
                  });
               } else {

                  // If using a search value, assign value to the criteria field dictated in the lookup-meta (but not if using a custom searchCriteriaFunction)
                  if (self.options.searchParamValueField && (searchValue || searchValue === 0) && !self.options.searchCriteriaFunction) {
                     criteria[self.options.searchParamValueField] = searchValue;
                  }

                  // Make call
                  DataService.post(self.options.searchPath, { data: criteria, busy: busy }, function (data) {
                     var results = self.getResultsFromResponse(data);
                     callback(results);
                  });
               }
            } else {
               criteria.QueryText = '';
               if (searchValue || searchValue === 0) {
                  criteria.QueryText = searchValue;
               }

               self.storageKey = criteria.LookupParameter;

               var fq = null;
               if (criteria.FacetQuery) {
                  fq = criteria.FacetQuery;
               }

               // Process Facets

               if (!self.overrideCriteria) {
                  if (self.criteriaList && self.criteriaList.length > 0) {
                     self.criteriaList.forEach(function (singleCriteria) {
                        if (self.selectedCriteria && self.selectedCriteria[singleCriteria.value] && self.selectedCriteria[singleCriteria.value].length > 0) {
                           if (!fq) {
                              fq = {};
                           }
                           fq[singleCriteria.value] = [];
                           self.selectedCriteria[singleCriteria.value].forEach(function (selected) {
                              var fqPartArray = self.criteriaValues[singleCriteria.value].filter(function (v) {
                                 if (typeof v.value === 'string') {
                                    return v.value.toLowerCase() === selected.toLowerCase();
                                 } else {
                                    return v.value === selected;
                                 }
                              });
                              if (fqPartArray.length > 0) {
                                 fq[singleCriteria.value].push(fqPartArray[0].value);
                              }
                           });
                        }
                     });
                  }
               }

               if (self.overrideCriteria) {
                  if (!fq) {
                     fq = {};
                  }
                  for (var p in self.overrideCriteria) {
                     if (self.overrideCriteria.hasOwnProperty(p) && !fq.hasOwnProperty(p)) {
                        var arr = Utils.checkForUpperOrLower(p, self.overrideCriteria[p]);
                        fq[p] = arr;
                     }
                  } 
               }

               if (fq) {
                  criteria.FacetQuery = Utils.cleanseFacetCriteria(fq);
               }

               DataService.post(Constants.SEARCH_PATH, { data: criteria, busy: busy, errorFunction: 'lookup' }, function (data) {
                  self.criteriaList = [];
                  self.criteriaValues = {};

                  data = Utils.processData(criteria, data);

                  var criteriaWasSet = typeof criteria.FacetQuery !== 'undefined' && criteria.FacetQuery !== '';
                  if (!criteriaWasSet) {
                     self.selectedCriteria = {};
                  }

                  var advancedCriteria = {};
                  self.dataUri = '';
                  if (data && data.facets && data.facets.length > 0) {

                     advancedCriteria.viewId = 'lookup-advancedcriteria';
                     advancedCriteria.id = 1;
                     advancedCriteria.type = 'VIEW';
                     advancedCriteria.subtype = '';
                     advancedCriteria.children = [];

                     var subChildren = {};
                     subChildren.id = 2;
                     subChildren.type = 'COMP_FLD';
                     subChildren.children = [];

                     var i = 2;

                     data.facets = Utils.processFacets(criteria.LookupParameter, data.facets);

                     data.facets.forEach(function (facet) {
                        if (facet.label && facet.FacetNodes.length > 0) {

                           // Create the list of facets
                           self.criteriaList.push({ label: facet.label, value: facet.id });

                           // Create a json object to hold arrays of values for facets.
                           var criteriaValue = [];
                           facet.FacetNodes.forEach(function (facetnode) {
                              criteriaValue.push({ label: facetnode.label, value: facetnode.value });
                           });
                           self.criteriaValues[facet.id] = criteriaValue;

                           if (!criteriaWasSet) {
                              self.selectedCriteria[facet.id] = '';
                           }

                           i++;

                           var facetChildren = {};
                           facetChildren.id = i;
                           facetChildren.type = 'FIELD';
                           facetChildren.subType = 'MULTI_SELECT';
                           facetChildren.type3 = 'MANUAL';
                           facetChildren.label = facet.label;
                           facetChildren.conditionShow = "advsrch.isSelected('" + facet.id + "')";
                           facetChildren.optionsModel = "lkupmdl.criteriaValues('" + facet.id + "')";
                           facetChildren.model = "lkupmdl.selectedCriteria['" + facet.id + "']";
                           subChildren.children.push(facetChildren);
                        }
                     });
                     advancedCriteria.children.push(subChildren);
                     self.dataUri = 'generatedjson,' + JSON.stringify(advancedCriteria);
                  }

                  ImageService.getImages(data.hits, criteria.LookupParameter, '', '', 'Thumbnail', false, function (returnData) {
                     callback(returnData);
                  });
               });
            }
         };

         // Extract the results array from the responseData of a search call
         self.getResultsFromResponse = function (responseData) {
            var results;

            if (self.options.transformResults) {
               results = self.options.transformResults(responseData);
            } else if (self.options.responseField) {
               results = Utils.getNestedValue(responseData, self.options.responseField);
            } else {
               results = responseData;
            }

            return results;
         };

         // Function to supply the search params defined on the lookup field to the lookup modal
         self.getSearchCriteria = function () {
            return self.evaluateSearchParams('lookup');
         };

         // Build and return the current search criteria to use for an api call (lookup search, autocomplete, etc.)
         self.getLatestCriteria = function (searchValue, source) {
            var criteria;

            // Evaluate searchParams to get latest values
            var searchParamsEvaluated = self.evaluateSearchParams(source);

            // Build request criteria from a custom function, or from defined search params
            if (self.options.searchCriteriaFunction) {
               criteria = self.getSearchCriteriaFromFunction(searchParamsEvaluated, searchValue, source);
            } else {
               criteria = searchParamsEvaluated;
            }

            return criteria;
         };

         // Build search request criteria from a custom function
         self.getSearchCriteriaFromFunction = function (currentCriteria, searchValue, source) {
            var buildCriteriaFn;

            // If it's a string reference, then get requested function from scope
            if (typeof self.options.searchCriteriaFunction === 'string') {
               buildCriteriaFn = Utils.getNestedValue($scope, self.options.searchCriteriaFunction.replace('()', ''));

               // If can't find it, log an error to help developers
               if (!buildCriteriaFn) {
                  console.log('Error: The function "' + self.options.searchCriteriaFunction + '" could not be found within scope. Please check if it exists and is accessible in this lookup\'s scope.');
                  return {};
               }
            } else {
               buildCriteriaFn = self.options.searchCriteriaFunction;
            }

            // Build context info object
            var context = {
               criteria: currentCriteria, // send in current search param values (merge of default params with custom params)
               searchValue: searchValue,
               source: source,
               parentGridColumn: self.options.parentGridColumn,
               parentGridItem: self.options.parentGridItem
            };

            // Call function to get final criteria (passing important context info)
            return buildCriteriaFn(context);
         };

         // Get current search params (default merged with custom params) as an object with dynamic references evaluated
         self.evaluateSearchParams = function (source) {
            var searchParamsEvaluated = {};
            var searchParams = self.options.searchParams;

            if (self.isIES) {
               // Evaluate each param

               for (var opt in searchParams) {
                  if (searchParams.hasOwnProperty(opt)) {
                     switch (opt) {
                     case 'LookupParameter':
                     case 'ProductType':
                     case 'UnitType':
                     case 'QueryText':
                     case 'MaxResults':
                     case 'MustNot':
                        searchParamsEvaluated[opt] = self.getParamValue(searchParams[opt]);
                        break;
                     default:
                        var valueToStore = self.getParamValue(searchParams[opt]);
                        switch (opt) {
                        case 'custno':
                        case 'vendno':
                        case 'invno':
                        case 'invsuf':
                        case 'cono':
                           if (valueToStore && Number(valueToStore)) {
                              valueToStore = Number(valueToStore);
                           } else {
                              valueToStore = 0;
                           }
                           break;
                        }
                        if (valueToStore) {
                           if (!searchParamsEvaluated.FacetQuery) {
                              searchParamsEvaluated.FacetQuery = {};
                           }
                           if (!Array.isArray(valueToStore)) {
                              searchParamsEvaluated.FacetQuery[opt] = [];
                              searchParamsEvaluated.FacetQuery[opt].push(valueToStore);
                           } else {
                              searchParamsEvaluated.FacetQuery[opt] = valueToStore;
                           }
                        }
                     }
                  }
               }
            } else {
               for (var optNonIes in searchParams) {
                  if (searchParams.hasOwnProperty(optNonIes)) {
                     searchParamsEvaluated[optNonIes] = self.getParamValue(searchParams[optNonIes]);
                  }
               }
            }


            // Add max results # also (as specified by the metadata)
            if (self.options.maxResultsField) {
               if (source === 'lookup') {
                  Utils.setNestedValue(searchParamsEvaluated, self.options.maxResultsField, ConfigService.getLookupMaxResults());
               } else if (source === 'autocomplete') {
                  Utils.setNestedValue(searchParamsEvaluated, self.options.maxResultsField, ConfigService.getAutoCompleteMaxResults());
               }
            }

            return searchParamsEvaluated;
         };

         // Return the up-to-date value of the given param (may be a static or dynamic value)
         self.getParamValue = function (param) {
            if (typeof param === 'function') {
               return param();
            } else if (typeof param === 'object' && param !== null) {
               // Parameter references are retrieved from the scope of the lookup
               if (param.type === 'REF') {
                  return Utils.getNestedValue($scope, param.value);
               } else if (param.type === 'ITEM') {
                  return Utils.getNestedValue(self.options.parentGridItem, param.value);
               } else {
                  return param; // static object or array
               }
            } else {
               return param;
            }
         };

         // Get full display label from the given record and source of record ('getRecordByValue', etc.)
         self.getDisplayLabel = function (record, source) {
            var label;
            var labelField = self.options.labelField;

            // Label field may be a function (for complex labels) or a string
            if (typeof labelField === 'function') {
               label = labelField(record, source);
            } else {
               label = Utils.getNestedValue(record, labelField);
            }

            return label;
         };

         // Insert full display label inside the input field from the given record and source of record ('getRecordByValue', etc.)
         self.insertDisplayLabel = function (record, source) {
            var label = self.getDisplayLabel(record, source);

            if (label || label === 0) {
               self.input.val(label);
            }
         };

         // Update the notes indicator icon on this lookup field
         self.updateNotesIndicator = function (notesFlag) {
            var $field = self.input.closest('.field');
            var markup;

            // Remove old indicator
            $field.find('.notes-indicator').remove();

            // Build html based on flag
            if (notesFlag === '*') {
               markup = '<div class="notes-indicator">' +
                  '<svg class="icon icon-info"><use xlink:href="#icon-notes"></use></svg>' +
                  '<p class="message-text">' + MessageService.get('special.notes.indicator') + '</p>' +
                  '</div>';
            } else if (notesFlag === '!') {
               markup = '<div class="notes-indicator">' +
                  '<svg class="icon icon-error"><use xlink:href="#icon-notes"></use></svg>' +
                  '<p class="message-text">' + MessageService.get('special.notes.indicator.required') + '</p>' +
                  '</div>';
            }

            // Add new
            if (markup) {
               $field.append(markup);
            }
         };

         // Convenient public api to apply a selected lookup value
         self.applySelection = function (value) {
            self.applyChange({
               value: value
            });
         };

         // Convenient public api to apply a clear of the lookup value
         self.applyClear = function () {
            self.applyChange({
               value: '',
               clear: true
            });
         };

         // Apply change (selection or clear) to the model
         self.applyChange = function (args, event) {
            var model = self.input.attr('data-model');
            var parentObject = self.isGridCell ? self.options.parentGridItem : $scope;
            var onChange = self.options.onChange;
            var oldValue;

            // Update model value
            if (model) {
               var ngModelOptions = self.input.attr('ng-model-options');
               var isGetterSetter = ngModelOptions && JSON.parse(ngModelOptions).getterSetter;

               // TODO: move this getterSetter check so only done once for better performance

               // Remember old value
               if (isGetterSetter) {
                  var getterFn = Utils.getNestedValue(parentObject, model);

                  oldValue = getterFn();
               } else {
                  oldValue = Utils.getNestedValue(parentObject, model);
               }

               var lookupParameter = self.options.searchParams.LookupParameter ? self.options.searchParams.LookupParameter.toLowerCase() : '';
               var valueToSet = args.value;
               switch (lookupParameter) {
               case 'aret':
               case 'kpet':
               case 'oeeh':
               case 'poeh':
               case 'wteh':
               case 'vaeh':
                  if (args.value2 || args.value2 === 0) {
                     valueToSet = args.value + '-' + Utils.pad(args.value2, 2);
                  };
                  break;
               };

               // Set new value
               if (isGetterSetter) {
                  var setterFn = Utils.getNestedValue(parentObject, model);
                  setterFn(valueToSet);
               } else {
                  Utils.setNestedValue(parentObject, model, valueToSet);
               }
            }

            // Need to clear input field if no value because watch may not fire (null initially and remaining null)
            if (!args.value && args.value !== 0) {
               self.input.val('');
            }

            // Update MRU list (if not a clear and not from manual entry)
            if (self.options.mruListKey && (args.value || args.value === 0) && args.source !== 'entry') {
               var rowPointerOrId = args.rowPointer || args.rowId;
               MruService.addToList(self.options.mruListKey, rowPointerOrId, args.label, args.value, args.value2, args.value3, args.value4, args.value5);
            }

            // Update notes indicator
            self.updateNotesIndicator(args.notesFlag);

            // Remove notesFlag from args (so no one codes against it since won't have a value when selecting from MRU)
            delete args.notesFlag;

            // Add old value to args
            args.oldValue = oldValue;

            // Add grid cell info to args
            if (self.isGridCell) {
               args.row = self.options.parentGridRow;
               args.cell = self.options.parentGridCell;
               args.column = self.options.parentGridColumn;
            }

            // Call change event (if passed in)
            if (onChange) {
               onChange = onChange.endsWith('()') ? onChange : onChange + '()';

               // Prepare function call to take parameters (grid cells get event 1st to be consistent with SoHo)
               if (self.isGridCell) {
                  onChange = onChange.replace('()', '(e, args)');
               } else {
                  onChange = onChange.replace('()', '(args)');
               }

               // Evaluate the expression (passing params)
               $scope.$eval(onChange, { e: event, args: args });
            }

            // Apply scope since a model has changed (and potentially other things in onChange)
            if (!$scope.$$phase) {
               $scope.$apply();
            }

            // Reset isTyping flag (delay slightly since allowEntry will run this function before lookup beforeShow runs)
            setTimeout(function () {
               self.status.isTyping = false;
            }, 200);
         };

         // Add auto complete functionality
         self.addAutoComplete = function () {
            self.isAutoCompleteSearchRunning = false;
            self.nextAutoCompleteCall = null;

            // Grid cell auto-completes required these position adjustments (see SoHo's Autocomplete grid editor)
            var width = self.options.autoCompleteWidth || (self.isGridCell ? self.input.parent().parent().width() : null);
            var offset = { left: 0, top: self.isGridCell ? 11 : 0 };

            // Create Soho autocomplete
            self.input.autocomplete({
               width: width,
               offset: offset,
               filterMode: null, // turn off SoHo filtering because our filtering is done sever-side via IES
               delay: Constants.AUTOCOMPLETE_DELAY, // we increase the delay to reduce unnecessary search calls (this is delay between stop typing and source fn)
               // Soho calls this source function after user types a value and stops typing for the 'delay' length
               source: function (value, done) {

                  // Don't proceed if:
                  // 1. input no longer has focus (user may type and tab out), or
                  // 2. user finished typing by pressing enter (pressing the enter key means they know the value they want and don't want to see search results)
                  if (!self.input.is(':focus') || !self.status.isTyping) {
                     return;
                  }

                  // Do not proceed if a previous search is still running. Instead set this value as the next search to be made.
                  // Important!!! We purposefully only allow one search call to be running at a time in order to
                  //              greatly reduce unnecessary calls and strain on the server and Elastic engine.
                  if (self.isAutoCompleteSearchRunning) {
                     self.nextAutoCompleteCall = { value: value, done: done };
                     return;
                  }

                  // Perform search
                  self.performAutoCompleteSearch(value, done);
               }
            });
         };

         // Perform search call for auto complete
         self.performAutoCompleteSearch = function (value, done) {
            self.isAutoCompleteSearchRunning = true;

            // Build latest and greatest criteria
            var criteria = self.getLatestCriteria(value, 'autocomplete');

            // Set path and options (IES or inline lookup)
            if (self.isIES) {
               criteria.QueryText = value;
               criteria.IsAutoComplete = true;
               criteria.FacetQuery = Utils.cleanseFacetCriteria(criteria.FacetQuery);

               DataService.post(Constants.SEARCH_PATH, { data: criteria, errorFunction: 'autocomplete' }, function (data) {
                  self.isAutoCompleteSearchRunning = false;
                  data = Utils.processData(criteria, data);
                  self.handleAutoCompleteResponse(value, done, data.hits);
               }, function error() {
                  self.isAutoCompleteSearchRunning = false;
                  self.nextAutoCompleteCall = null;
               });
            } else {
               // Add some flags expected by some calls
               if (self.options.IsAutoComplete) {
                  criteria.IsAutoComplete = true;
                  criteria.term = value;
               }

               // Perform search (using same logic as lookup search)
               self.search(criteria, value, { busy: false }, function (results) {
                  self.isAutoCompleteSearchRunning = false;
                  self.handleAutoCompleteResponse(value, done, results);
               });
            }
         };

         // Handle response from auto complete search and decide what to do next
         self.handleAutoCompleteResponse = function (value, done, results) {
            var lookupOptions = self.options;

            // Don't proceed if:
            // 1. input no longer has focus (user may type and tab out), or
            // 2. user finished typing by pressing enter (pressing the enter key means they know the value they want and don't want to see search results)
            if (!self.input.is(':focus') || !self.status.isTyping) {
               return;
            }

            // If another call is waiting then perform new search, otherwise display results to user
            if (self.nextAutoCompleteCall) {
               self.performAutoCompleteSearch(self.nextAutoCompleteCall.value, self.nextAutoCompleteCall.done);
               self.nextAutoCompleteCall = null;
            } else {
               // Massage non-IES data (Soho requires the data objects to have a 'label' and 'value')
               if (!self.isIES) {
                  for (var i = 0; i < results.length; i++) {
                     var record = results[i];

                     // Make the objects similar to IES auto-complete results objects
                     record.label = self.getDisplayLabel(record, 'autocomplete');
                     record.value = Utils.getNestedValue(record, lookupOptions.valueField);
                     record.key2 = lookupOptions.value2Field ? Utils.getNestedValue(record, lookupOptions.value2Field) : undefined;
                     record.key3 = lookupOptions.value3Field ? Utils.getNestedValue(record, lookupOptions.value3Field) : undefined;
                     record.key4 = lookupOptions.value4Field ? Utils.getNestedValue(record, lookupOptions.value4Field) : undefined;
                     record.key5 = lookupOptions.value5Field ? Utils.getNestedValue(record, lookupOptions.value5Field) : undefined;
                     record.rowpointer = lookupOptions.rowPointerField ? Utils.getNestedValue(record, lookupOptions.rowPointerField) : undefined;
                     record.rowId = lookupOptions.rowIdField ? Utils.getNestedValue(record, lookupOptions.rowIdField) : undefined;
                     record.notesfl = lookupOptions.notesField ? Utils.getNestedValue(record, lookupOptions.notesField) : undefined;
                  }
               }

               // Recalculate the list position before showing results (since the input width can change by various factors)
               self.adjustAutoCompletePosition();

               // Send results for Soho to display
               done(value, results);
            }
         };

         // Function to calculate the current offset needed by the auto complete, which is dependant on the current width
         // of the input. The input width can change at various times (screen space changes, hidden lookups (no width)
         // becoming visible, etc.), so we need to recalculate before displaying the auto complete list.
         self.adjustAutoCompletePosition = function () {
            var width = self.options.autoCompleteWidth;
            var autoCompControl = self.autoCompleteControl;

            // Only needed if lookup has an autoCompleteWidth specified
            if (width) {
               // Get current input width to know threshold
               var inputWidth = self.isGridCell ? self.input.parent().parent().width() : self.input.outerWidth();

               // If the list width is greater than the input width, then Soho requires the proper offset to be set (otherwise the list displays off to the side)
               if (width > inputWidth) {
                  // A calculation of the width difference divided by 2 makes the list line up properly with the input
                  autoCompControl.settings.offset.left = Math.ceil((width - inputWidth) / 2);
                  autoCompControl.settings.width = width; // reapply width
               } else {
                  // Otherwise reset left offset (and reset width so that the list never displays shorter than the input)
                  autoCompControl.settings.offset.left = 0;
                  autoCompControl.settings.width = self.isGridCell ? self.input.parent().parent().width() : null;
               }
            }
         };
      },
      link: function (scope, element, attrs, ctrl) {
         var $input = $(element);
         var options = {};
         var lookupKey = attrs.lookup;

         // Grab any custom options passed via the data-lookup-options attribute
         if (attrs.lookupOptions) {
            options = JSON.parse(attrs.lookupOptions);
         }

         // Grab on change event if passed in
         if (attrs.onChange) {
            options.onChange = attrs.onChange;
         }

         // Grab parent grid info (if is grid cell)
         if (attrs.isGridCell !== undefined) {
            ctrl.isGridCell = true;
            options.parentGrid = $input.closest('.datagrid-container').data('datagrid');
            options.parentGridRow = parseInt(attrs.parentGridRow, 10);
            options.parentGridCell = parseInt(attrs.parentGridCell, 10);
            options.parentGridColumn = options.parentGrid.settings.columns[options.parentGridCell];
            options.parentGridItem = options.parentGrid.settings.dataset[options.parentGridRow];
         }

         // Add a maxlength for security reasons if one isn't specified (since lookup value sent to search api call)
         if (!$input.attr('maxlength')) {
            $input.attr('maxlength', '250');
         }

         // Make lookup
         LookupService.make(scope, $input, ctrl, lookupKey, options);
      }
   };
});