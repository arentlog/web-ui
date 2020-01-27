'use strict';

app.provider('State', function StateProvider($stateProvider) {
   var self = this;

   /**
    * Provider access method
    */
   this.$get = [function () {
      return self;
   }];

   /* Public API */

   this.addInquiryBaseState = function (module, menuFn, options) {
      this.addBaseState(module, menuFn, options);
   };

   this.addSimpleEntryBaseState = function (module, menuFn, options) {
      this.addBaseState(module, menuFn, options);
   };

   this.addTransactionBaseState = function (module, menuFn, options) {
      this.addBaseState(module, menuFn, options);
   };

   /**
    * Generic method for adding a base state
    */
   this.addBaseState = function (module, menuFn, options) {
      var menuFnCapitalized = menuFn.charAt(0).toUpperCase() + menuFn.slice(1);
      var opts = options || {};
      var data = opts.data || {};
      var widgets = opts.widgets;
      var views = {};
      var params = opts.params || {};

      // Add the standard recovery params.
      params.isRecovery = undefined;
      params.recoveryJournal = undefined;
      params.recoveryData = undefined;

      // Tab title reference is by convention (if tabTitle option not specified)
      data.tabTitle = opts.tabTitle || 'title.' + menuFn;

      // Attach module, menuFn, and widgets to base state for easy access
      data.module = module;
      data.menuFn = menuFn;
      data.widgets = widgets;

      // Set up template view
      views[menuFn + '@'] = {
         templateUrl: opts.baseView || 'ui/app/common/templates/sidebar-main-contained.html',
         controller: opts.baseController || menuFnCapitalized + 'BaseCtrl as base'
      };

      // Set up search view (if search widget included)
      if (widgets && widgets.indexOf('SEARCH') >= 0) {
         var searchViewPath = opts.searchView || buildViewPath(module, menuFn, 'search.json');

         views['search@' + menuFn] = {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView(searchViewPath);
            },
            controller: opts.searchController || menuFnCapitalized + 'SearchCtrl as srch'
         };
      }

      $stateProvider.state(menuFn, {
         url: opts.url || '/' + menuFn,
         params: params,
         deepStateRedirect: { default: opts.defaultState || menuFn + '.master' },
         sticky: true,
         views: views,
         data: data,
         resolve: opts.resolve
      });
   };

   /**
    * Generic method for adding a master state (for convenience and consistency)
    *
    * The 'refreshSearch' parameter is a flag meant for notifying a MasterCtrl to re-run the search call
    * (i.e. after a save or delete you would do $state.go('^.master', {refreshSearch: true}, {reload: '^.master'}).
    */
   this.addMasterState = function (module, menuFn, options) {
      var opts = options || {};
      var params = opts.params || {};
      var menuFnCapitalized = menuFn.charAt(0).toUpperCase() + menuFn.slice(1);

      // This param is for telling the master state to refresh search results when his controller runs upon reload
      params.refreshSearch = undefined;

      // Optionally override the view (i.e. a shared view instead of xx/xxxx/master.json)
      var viewPath = opts.view || buildViewPath(module, menuFn, 'master.json');

      // Optionally override the controller (i.e. a shared ctrl instead of XxxxMasterCtrl as mst)
      var ctrl = opts.controller || menuFnCapitalized + 'MasterCtrl as mst';

      $stateProvider.state(menuFn + '.master', {
         url: opts.url || '/master',
         params: params,
         sticky: true,
         views: {
            master: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView(viewPath);
               },
               controller: ctrl
            }
         },
         data: opts.data,
         resolve: opts.resolve
      });
   };

   /**
    * API to add a state to $stateProvider. This is used when we need to add states after the Angular config phase.
    */
   this.addState = function (name, options) {
      $stateProvider.state(name, options);
   };

   /**
    * Add all the states needed for a particular menu function via metadata.
    *
    * Metadata options:
    *
    * module - the module name (i.e. 'ar')
    * menuFn - the menu function name (i.e. 'arsc')
    * dataPath - base path for REST data api calls (i.e. 'api/ar/arsc')
    * recordName (optional) - name to use for data binding to the record object (defaults to menu function name)
    * recordRowIdField (optional) - name of field on the detail record containing the row id (i.e. 'rowid') (defaults to 'rowID')
    * searchMethod - http method for the search api call (i.e. 'GET', 'POST')
    * searchPath - path of the search api call (i.e. 'api/ar/asarsetup/arslload')
    * searchCriteria (optional) - the initial criteria object to use for the search component and when user clicks reset (i.e. {modulename: 'ap', billingprimarykey: ''})
    * searchRecordLimitField (optional) - name of the field on the search api criteria object to have the default record limit value (i.e. 'recordcountlimit')
    * searchDefaultWarehouseField (optional) - name of the field on the search api criteria object to initialize with the user's default warehouse (i.e. 'whse')
    * searchResultsField (optional) - name of the field on the search api response object containing the list of results (if compound response object)
    * searchMoreRecordsField (optional) - name of the field on the search api response object containing the more records flag for the record limit warning (i.e. 'morerecords') (defaults to 'lMoreRecords')
    * resultsRowIdField - name of field on search results objects containing the row id (i.e. 'arslrowid')
    * passGridRecord (optional) - boolean flag for whether or not the detail state needs the selected grid record from the master list via state params (should only be used for special cases that truly need)
    * primaryKeyParams - array of param names for the getbypk api call in order for hyperlinks that pass pk, pk2. etc. to work (i.e. ['orderno', 'ordersuf'])
    * fillmode (optional) - set to true if you need fillmode=true on the get record (getbyrowid or getbypk) api call in order to return additional data on the record
    * deleteMultipleMessage (optional) - translation string (or array) to use for the delete multiple confirmation message
    * deleteRecordMessage (optional) - translation string (or array) to use for the delete single confirmation message
    * postCreateState (optional) - state to go to after creating a record; by default we go back to master, but use this if need to go to detail/edit (i.e. '^.detail.edit')
    * postCopyState (optional) - state to go to after copying a record; by default we go to detail.edit to further edit the record, but use this if you need to go elsewhere (i.e. '^.detail')
    * searchView (optional) - file path of the search view if not using xx/xxxx/search.json (i.e. 'shared/something/search.json')
    * masterStateView (optional) - file path of the master view if not using xx/xxxx/master.json (i.e. 'shared/something/master.json')
    * createStateView (optional) - file path of the create view if this state's view is significantly different than detail.json (i.e. 'ar/arsc/create.json')
    * detailStateView (optional) - file path of the detail view if not using xx/xxxx/detail.json (i.e. 'shared/something/detail.json')
    * copyStateView (optional) - file path of the copy view if you want to add copy functionality (i.e. 'ar/arsc/copy.json')
    * copyMethod (optional) - http method for the copy submit api call (i.e. 'GET', 'POST')
    * copyPath (optional) - path of the copy submit api call (i.e. 'api/sl/asslsetup/slimportdefcopy')
    * copyRequest (optional) - custom object (or array) to use as the initial copy request object (i.e. [])
    * copyMultiple (optional) - boolean flag for whether or not the function supports copying multiple records at once
    * copyResponseRowIdField (optional) - name of field on the copy response object containing the row id (i.e. 'arscrowid') (defaults to 'rowid')
    * baseStateParams (optional) - custom params object of state param names to make available for the base state
    * masterStateParams (optional) - custom params object of state param names to make available for the master state
    * createStateParams (optional) - custom params object of state param names to make available for the create state
    * detailStateParams (optional) - custom params object of state param names to make available for the detail state
    * editStateParams (optional) - custom params object of state param names to make available for the edit state
    * copyStateParams (optional) - custom params object of state param names to make available for the copy state
    * baseStateData (optional) - custom data object of key value pairs to attach to the base state (accessible when in base state via $state.current.data)
    * masterStateData (optional) - custom data object of key value pairs to attach to the master state (accessible when in master state via $state.current.data)
    * createStateData (optional) - custom data object of key value pairs to attach to the create state (accessible when in create state via $state.current.data)
    * detailStateData (optional) - custom data object of key value pairs to attach to the detail state (accessible when in detail state via $state.current.data)
    * editStateData (optional) - custom data object of key value pairs to attach to the edit state (accessible when in edit state via $state.current.data)
    * copyStateData (optional) - custom data object of key value pairs to attach to the copy state (accessible when in copy state via $state.current.data)
    * baseStateResolve (optional) - custom resolved dependencies object for the base state
    * masterStateResolve (optional) - custom resolved dependencies object for the master state
    * createStateResolve (optional) - custom resolved dependencies object for the create state
    * detailStateResolve (optional) - custom resolved dependencies object for the detail state
    * editStateResolve (optional) - custom resolved dependencies object for the edit state
    * copyStateResolve (optional) - custom resolved dependencies object for the copy state
    * tabTitle (optional) - the title to display on the function tab (not normally used since the convention is title.menu; only needed for javascript extensions)
    * copySubTitle (optional) - same as detailSubTitle below (but for copy view)
    * detailSubTitle (optional) - metadata (array) defining how to display the sub title when in the detail state (your view's sub title must refer to {{dtl.getSubTitle()}}); i.e.
    *    [
    *       {label: null, value: 'custno'},
    *       {label: 'global.name', value: 'name'}
    *    [
    * recentlyVisited (optional) - metadata defining how to display the recently visited list; i.e.
    *    {
    *       title: {label: 'global.lock.box.number', value: 'lockboxno'},
    *       description: [
    *          {label: 'global.customer', value: 'custno'},
    *          {label: 'global.type', valueFunction: 'base.formatCustomerType'}
    *       ]
    *       // Note: If labelFunction or valueFunction is used, it must be a reference to a function on a controller
    *       // (should be on base) that receives the record as a parameter and returns the label or value string to display
    *    }
    */
   this.addSetupStates = function (menuMeta) {
      var module = menuMeta.module;
      var menuFn = menuMeta.menuFn;

      // Add each state
      addSetupBaseState(module, menuFn, menuMeta);
      addSetupMasterState(module, menuFn, menuMeta);
      addSetupCreateState(module, menuFn, menuMeta);
      addSetupDetailState(module, menuFn, menuMeta);
      addSetupEditState(module, menuFn, menuMeta);

      // Optionally add copy state
      if (menuMeta.copyStateView) {
         addSetupCopyState(module, menuFn, menuMeta);
      }
   };


   /* Private methods */

   function addSetupBaseState(module, menuFn, menuMeta) {
      var data = menuMeta.baseStateData || {};
      var views = {};

      // Tab title reference is by convention (if tabTitle option not specified)
      data.tabTitle = menuMeta.tabTitle || 'title.' + menuFn;

      // Attach module, menuFn, (and view) to base state for easy access
      data.module = module;
      data.menuFn = menuFn;

      // All setup screens have the Search widget
      data.widgets = ['SEARCH'];

      // Almost all setup screens have the Recently Visited widget
      if (menuMeta.recentlyVisited) {
         data.widgets.push('RECENTLY_VISITED');
      }

      // Set up template view
      views[menuFn + '@'] = {
         templateUrl: 'ui/app/common/templates/sidebar-main-contained.html',
         controller: 'SetupBaseCtrl as base'
      };

      // Set up search view (if search widget included)
      if (data.widgets.indexOf('SEARCH') >= 0) {
         // Optionally override the search view (i.e. a shared view instead of xx/xxxx/search.json)
         var searchViewPath = menuMeta.searchView || buildViewPath(module, menuFn, 'search.json');

         views['search@' + menuFn] = {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView(searchViewPath);
            },
            controller: 'SetupSearchCtrl as srch'
         };
      }

      $stateProvider.state(menuFn, {
         url: '/' + menuFn,
         params: menuMeta.baseStateParams,
         deepStateRedirect: { default: menuFn + '.master' },
         sticky: true,
         views: views,
         data: data,
         resolve: getResolvedDependencies(menuFn, menuMeta, menuMeta.baseStateResolve)
      });
   }

   function addSetupMasterState(module, menuFn, menuMeta) {
      var data = menuMeta.masterStateData || {};

      // Optionally override the view for the master state (i.e. a shared view instead of xx/xxxx/master.json)
      var viewPath = menuMeta.masterStateView || buildViewPath(module, menuFn, 'master.json');

      $stateProvider.state(menuFn + '.master', {
         url: '/master',
         params: menuMeta.masterStateParams,
         sticky: true, // sticky flag needed again here, otherwise search results do not remain upon back button
         views: {
            master: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView(viewPath);
               },
               controller: 'SetupMasterCtrl as mst'
            }
         },
         data: data,
         resolve: getResolvedDependencies(menuFn, menuMeta, menuMeta.masterStateResolve)
      });
   }

   function addSetupCreateState(module, menuFn, menuMeta) {
      var data = menuMeta.createStateData || {};

      // Define min securityLevel needed to access this state
      data.securityLevel = 4;

      // Optionally override the view for the create state (i.e. create.json instead of reusing detail.json)
      var viewPath = menuMeta.createStateView || buildViewPath(module, menuFn, 'detail.json');

      $stateProvider.state(menuFn + '.create', {
         url: '/create',
         params: menuMeta.createStateParams,
         views: {
            detail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView(viewPath);
               },
               controller: 'SetupCreateCtrl as dtl'
            }
         },
         data: data,
         resolve: getResolvedDependencies(menuFn, menuMeta, menuMeta.createStateResolve)
      });
   }

   function addSetupDetailState(module, menuFn, menuMeta) {
      var data = menuMeta.detailStateData || {};
      var params = menuMeta.detailStateParams || {};

      // This param is for the grid record that was selected (for those special cases that need it)
      params.object = undefined;

      // Optionally override the view for the detail state (i.e. a shared view instead of xx/xxxx/detail.json)
      var viewPath = menuMeta.detailStateView || buildViewPath(module, menuFn, 'detail.json');

      $stateProvider.state(menuFn + '.detail', {
         // Note: id is for the row id, pk is for a single primary key, and the rest are for a multi-part primary key
         url: '/detail?id&pk&pk2&pk3&pk4&pk5&pk6',
         params: params,
         views: {
            detail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView(viewPath);
               },
               controller: 'SetupDetailCtrl as dtl'
            }
         },
         data: data,
         resolve: getResolvedDependencies(menuFn, menuMeta, menuMeta.detailStateResolve)
      });
   }

   function addSetupEditState(module, menuFn, menuMeta) {
      var data = menuMeta.editStateData || {};

      // Define min securityLevel needed to access this state
      data.securityLevel = 3;

      $stateProvider.state(menuFn + '.detail.edit', {
         url: '/edit', // url is needed for DSR to work properly
         params: menuMeta.editStateParams,
         data: data,
         resolve: getResolvedDependencies(menuFn, menuMeta, menuMeta.editStateResolve)
      });
   }

   function addSetupCopyState(module, menuFn, menuMeta) {
      var data = menuMeta.copyStateData || {};
      var params = menuMeta.copyStateParams || {};

      // Define min securityLevel needed to access this state
      data.securityLevel = 4;

      // This param is the selected record to copy
      params.object = undefined;
      // This param is the selected records to copy (if copyMultiple is true)
      params.records = undefined;
      // This param is to distinguish between copy from master list and copy from detail view
      params.fromMaster = undefined;

      $stateProvider.state(menuFn + '.copy', {
         url: '/copy?id',
         params: params,
         views: {
            detail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView(menuMeta.copyStateView);
               },
               controller: 'SetupCopyCtrl as cpy'
            }
         },
         data: data,
         resolve: getResolvedDependencies(menuFn, menuMeta, menuMeta.copyStateResolve)
      });
   }

   /**
    * This is how we dynamically inject menu-function-specific metadata and services into the standard setup controllers.
    * The naming convention of menu function services is XxxxService where Xxxx is the function name (i.e. ArscService).
    * We allow our customers to mod setup code by injecting a custom service named CustomXxxxService.
    */
   function getResolvedDependencies(menuFn, menuMeta, customResolve) {
      var resolve = customResolve || {};

      // The menu function metadata configuration
      resolve.menuMeta = function () {
         return menuMeta;
      };

      // The menu function service
      resolve.menuService = function ($injector) {
         var menuFnCapitalized = menuFn.charAt(0).toUpperCase() + menuFn.slice(1);
         var menuFnServiceName = menuFnCapitalized + 'Service';
         var service = null;

         // First check for a custom service (i.e. CustomArscService), otherwise inject the standard if exists (i.e. ArscService)
         // Note: this is how we allow infor's customers to override the code of setup screens as a custom mod
         if ($injector.has('Custom' + menuFnServiceName)) {
            service = $injector.get('Custom' + menuFnServiceName);
         } else if ($injector.has(menuFnServiceName)) {
            service = $injector.get(menuFnServiceName);
         }

         return service;
      };

      return resolve;
   }

   function buildViewPath(module, menuFn, viewName) {
      return module + '/' + menuFn + '/' + viewName;
   }

});
