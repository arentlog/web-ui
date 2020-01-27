'use strict';

app.service('JsonViewService', function JsonViewService($q, ConfigService, DataService, ExtensionService, JsonViewConverter, MessageService, PersonalizeService, PvUser, UserService, Utils) {

   // Cache of fetched views with personalization applied. It looks like...
   // 'ar/arsc/create.json': { jsonView: "...", webExtRowId: null, webModRowId: null },
   // 'ar/arsc/detail.json': { ... },
   var cache = {};

   /**
    * Clear all views from cache (so they load the latest next time)
    */
   this.clearViewCache = function () {
      Utils.clearObject(cache);
   };

   /**
    * Clear this view from cache (so it loads the latest next time)
    */
   this.removeViewFromCache = function (viewPath) {
      delete cache[viewPath];
   };

   /**
    * Get a view for live mode
    */
   this.getView = function (viewPath) {
      var cachedView, converter, html;

      // Special case for IES lookup Facet Search json view
      if (viewPath.includes('generatedjson,')) {
         converter = new JsonViewConverter('lookups', 'live');
         cachedView = {
            jsonView: JSON.parse(viewPath.replace('generatedjson,', ''))
         };
      } else {
         converter = new JsonViewConverter(viewPath, 'live');
         cachedView = cache[viewPath];
      }

      // Use cached view if have it
      // Note: But we are always performing json-to-html conversion because some controls have timestamp-generated
      //       html ids which need to be unique in the DOM (and some views may be in the DOM more than once).
      if (cachedView) {
         html = converter.getHtml(cachedView.jsonView, cachedView.webExtRowId, cachedView.webModRowId);

         // Return html as a promise just like the normal return of the DataService promise
         var deferred = $q.defer();
         deferred.resolve(html);
         return deferred.promise;
      }

      // Build criteria for view and personalization data to use
      var params = {
         path: viewPath,
         profile: PvUser.webprofilename,
         user: UserService.getUserName(),
         disableExtensions: !ConfigService.isExtensionsEnabled(),
         disablePersonalization: !ConfigService.isPersonalizationEnabled()
      };

      // Get view and modifications
      return DataService.get('api/shared/jsonview/getview', { params: params }).then(function (response) {
         var data = response.data;
         var jsonView = data.view ? JSON.parse(data.view) : null;
         var extensionData = (data.webextendrecord && data.webextendrecord.settingvalue) ? JSON.parse(data.webextendrecord.settingvalue) : null;
         var personalData = (data.webmodrecord && data.webmodrecord.settingvalue) ? JSON.parse(data.webmodrecord.settingvalue) : null;
         var webExtRowId = data.webextendrecord ? data.webextendrecord.webextendRowID : null;
         var webModRowId = data.webmodrecord ? data.webmodrecord.webmodRowID : null;

         // Apply extension to the json view
         if (extensionData) {
            // If there's no default view then the extension data is the full json view
            if (!jsonView) {
               jsonView = extensionData;
            } else {
               ExtensionService.applyExtensionChanges(jsonView, extensionData);
            }
         }

         // Apply personalization changes to the json view
         if (personalData && jsonView) {
            PersonalizeService.applyPersonalizationChanges(jsonView, personalData);
         }

         // Cache json view (with applied changes)
         cache[viewPath] = {
            jsonView: jsonView,
            webExtRowId: webExtRowId,
            webModRowId: webModRowId
         };

         // Convert to html
         return jsonView ? converter.getHtml(jsonView, webExtRowId, webModRowId) : '';
      });
   };

   /**
    * Get a view for user personalize mode
    */
   this.getViewForPersonalize = function (viewPath, level, user, profile, callback) {
      var params = {
         path: viewPath,
         disableExtensions: !ConfigService.isExtensionsEnabled(), // include active extension if enabled
         disablePersonalization: true // not needed since we'll fetch a specific personalization record later
      };

      // Get default view (along with active extension)
      DataService.get('api/shared/jsonview/getview', { params: params, busy: true }, function (data) {
         var jsonView = data.view ? JSON.parse(data.view) : null;
         var extensionData = (data.webextendrecord && data.webextendrecord.settingvalue) ? JSON.parse(data.webextendrecord.settingvalue) : null;

         // Apply extension to the json view
         if (extensionData) {
            // If there's no default view then the extension data is the full json view
            if (!jsonView) {
               jsonView = extensionData;
            } else {
               ExtensionService.applyExtensionChanges(jsonView, extensionData);
            }
         }

         // Store off copy of the jsonView (with any extension changes) which acts as the default view for this user
         var defaultJsonView = angular.copy(jsonView);

         // Get specific personalization record from database (not necessarily the active one)
         var criteria = {
            level: level,
            profile: profile,
            operator: user,
            screenname: jsonView.viewId
         };
         DataService.post('api/shared/assharedentry/getwebmodificationlist', { data: criteria, busy: true }, function (data) {
            var records = data.webmodlistresults;
            var webModRecord, personalData;

            // Use found record or initialize new
            if (records.length > 0) {
               webModRecord = records[0];
               personalData = webModRecord.settingvalue ? JSON.parse(webModRecord.settingvalue) : { changes: [] };
            } else {
               webModRecord = {
                  cono: UserService.getCono(),
                  profile: profile,
                  operator: user,
                  functionname: getFunctionName(viewPath),
                  screenname: jsonView.viewId
               };
               personalData = { changes: [] };
            }

            // Apply personalization changes to the json view
            PersonalizeService.applyPersonalizationChanges(jsonView, personalData);

            callback(defaultJsonView, jsonView, personalData, webModRecord);
         });
      });
   };

   /**
    * Get a view for editing in extension mode
    */
   this.getViewForExtend = function (viewPath, cono, extensionRowId, callback) {
      var params = {
         path: viewPath
      };

      // Get default view
      DataService.get('api/shared/jsonview/getdefaultview', { params: params, busy: true }, function (data) {
         var jsonView = JSON.parse(data);
         var defaultJsonView = angular.copy(jsonView);

         // Get extension from database
         // If have row id then fetch the specific record (may be editing a particular revision)
         if (extensionRowId) {
            DataService.post('api/shared/assharedinquiry/webextensionretrieve', { data: { webextensionrowid: extensionRowId }, busy: true }, function (webExtRecord) {
               var extensionData = webExtRecord.settingvalue ? JSON.parse(webExtRecord.settingvalue) : {};

               // Apply extension to the json view
               ExtensionService.applyExtensionChanges(jsonView, extensionData);

               callback(defaultJsonView, jsonView, extensionData, webExtRecord);
            });
         } else {
            var criteria = {
               level: cono ? 'c' : 's',
               screenname: jsonView.viewId,
               statustype: 'b',
               latestrevisiononly: true
            };
            DataService.post('api/shared/assharedinquiry/getwebextensionlist', { data: criteria, busy: true }, function (data) {
               var records = data.webextendrecord;
               var webExtRecord, extensionData;

               // Use found record or initialize new
               if (records.length > 0) {
                  webExtRecord = records[0];
                  extensionData = webExtRecord.settingvalue ? JSON.parse(webExtRecord.settingvalue) : {};
               } else {
                  webExtRecord = {
                     cono: cono,
                     functionname: getFunctionName(viewPath),
                     extensiontype: 'extendedview',
                     screenname: jsonView.viewId,
                     activefl: true
                  };
                  extensionData = {
                     additions: [],
                     changes: [],
                     deletions: []
                  };
               }

               // Apply extension to the json view
               ExtensionService.applyExtensionChanges(jsonView, extensionData);

               callback(defaultJsonView, jsonView, extensionData, webExtRecord);
            });
         }
      });
   };

   /**
    * Get a view for editing a new view in extension mode
    */
   this.getNewViewForExtend = function (viewPath, cono, extensionRowId, callback) {

      // Get extension data from database (there is no default view to get)
      // If have row id then fetch the specific record (may be editing a particular revision)
      if (extensionRowId) {
         DataService.post('api/shared/assharedinquiry/webextensionretrieve', { data: { webextensionrowid: extensionRowId }, busy: true }, function (webExtRecord) {
            var jsonView = webExtRecord.settingvalue ? JSON.parse(webExtRecord.settingvalue) : { viewId: webExtRecord.screenname, id: 1, type: 'VIEW', children: [] };
            callback(jsonView, webExtRecord);
         });
      } else {
         var criteria = {
            level: cono ? 'c' : 's',
            screenname: viewPath,
            statustype: 'b',
            latestrevisiononly: true
         };
         DataService.post('api/shared/assharedinquiry/getwebextensionlist', { data: criteria, busy: true }, function (data) {
            var records = data.webextendrecord;
            var webExtRecord, jsonView;

            // Use found record
            if (records.length > 0) {
               webExtRecord = records[0];
               jsonView = webExtRecord.settingvalue ? JSON.parse(webExtRecord.settingvalue) : { viewId: webExtRecord.screenname, id: 1, type: 'VIEW', children: [] };
            }

            callback(jsonView, webExtRecord);
         });
      }
   };

   /**
    * Get a view for development build mode
    */
   this.getViewForDevelopment = function (viewPath, callback) {
      var params = {
         path: viewPath
      };

      DataService.get('api/shared/jsonview/getdefaultview', { params: params }, function (jsonView) {
         callback(JSON.parse(jsonView));
      });
   };

   /**
    * Save personalization record
    */
   this.savePersonalizationRecord = function (viewPath, personalData, webModRecord, callback) {
      var path = webModRecord.webmodRowID ? 'api/shared/assharedentry/webmodificationupdate' : 'api/shared/assharedentry/webmodificationcreate';

      // Apply the current personalization data (in string format)
      webModRecord.settingvalue = JSON.stringify(personalData);

      // Save the existing or new webModRecord
      DataService.post(path, { data: webModRecord, busy: true }, function (data) {

         // Remove jsonView from cache so user will see latest view next time that screen is loaded
         delete cache[viewPath];

         // Callback with the newly created record or the existing one
         callback(data || webModRecord);
      });
   };

   /**
    * Save extension record
    */
   this.saveExtensionRecord = function (viewPath, extensionData, webExtRecord, callback) {
      var isCreate = !webExtRecord.webextendRowID;

      // Apply the current extension data (in string format)
      webExtRecord.settingvalue = JSON.stringify(extensionData);

      // Create or update
      if (isCreate) {
         DataService.post('api/shared/assharedinquiry/webextensioncreate', { data: webExtRecord, busy: true }, function (newRecord) {
            delete cache[viewPath];
            callback(newRecord);
         });
      } else {
         var doUpdate = function (recordToUpdate) {
            DataService.post('api/shared/assharedinquiry/webextensionupdate', { data: recordToUpdate, busy: true }, function () {
               delete cache[viewPath];
               callback(recordToUpdate);
            });
         };

         // Create new revision or overwrite current
         MessageService.yesNo('global.new.revision', 'question.would.you.like.to.create.new.revision', function yes() {
            var criteria = { webextensionrowid: webExtRecord.webextendRowID };
            DataService.post('api/shared/assharedinquiry/webextensioncreaterevision', { data: criteria, busy: true }, function (newRecord) {
               // Apply changes to the revision and proceed with update
               newRecord.activefl = webExtRecord.activefl;
               newRecord.cono = webExtRecord.cono;
               newRecord.descrip = webExtRecord.descrip;
               newRecord.functionname = webExtRecord.functionname;
               newRecord.screenname = webExtRecord.screenname;
               newRecord.settingvalue = webExtRecord.settingvalue;
               newRecord.tag = webExtRecord.tag;
               doUpdate(newRecord);
            });
         }, function no() {
            doUpdate(webExtRecord);
         });
      }
   };

   /**
    * Delete personalization record
    */
   this.deletePersonalizationRecord = function (viewPath, webModRecord, callback) {
      if (webModRecord.webmodRowID) {
         var criteria = [
            { webmodRowID: webModRecord.webmodRowID }
         ];
         DataService.post('api/shared/assharedentry/webmodificationdelete', { data: criteria, busy: true }, function () {
            callback();
         });

         // Remove jsonView from cache
         delete cache[viewPath];
      } else {
         callback();
      }
   };

   /**
    * Delete extension record
    */
   this.deleteExtensionRecord = function (viewPath, webExtRecord, callback) {
      if (webExtRecord.webextendRowID) {
         var criteria = [ webExtRecord ];
         DataService.post('api/shared/assharedinquiry/webextensiondelete', { data: criteria, busy: true }, function () {
            callback();
         });

         // Remove jsonView from cache
         delete cache[viewPath];
      } else {
         callback();
      }
   };

   /**
    * Convert the given json view object to html
    */
   this.convertToHtml = function (jsonView) {
      var converter = new JsonViewConverter(null, 'live');

      // Convert to html
      return converter.getHtml(jsonView);
   };


   /* Private methods */

   /**
    * Determine the menu function name from the json view path.
    * Our directories and files use a consistent convention, so we can deduce this.
    * Convention = module/function/...
     */
   function getFunctionName(viewPath) {
      var functionName;

      // If viewPath is a new extension view, then the function name we use is "extension"
      if (viewPath.startsWith('extension-')) {
         functionName = 'extension';
      } else {
         var pieces = viewPath.split('/');
         var module = pieces[0];
         var menuFn = pieces[1];

         // The functionName will be one of these:
         // - reports (if in reports or report-wizard directory)
         // - shared (if in the shared module)
         // - <module>-shared (if in the <module>/shared directory)
         // - <function> (otherwise)
         if (module === 'shared') {
            if (menuFn === 'reports' || menuFn === 'report-wizard') {
               functionName = 'reports';
            } else {
               functionName = 'shared';
            }
         } else {
            if (menuFn === 'shared') {
               functionName = module + '-shared';
            } else {
               functionName = menuFn;
            }
         }
      }

      return functionName;
   }

});
