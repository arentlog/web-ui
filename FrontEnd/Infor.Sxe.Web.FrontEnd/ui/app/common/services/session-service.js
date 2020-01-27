'use strict';

app.service('SessionService', function SessionService($http, $q, $rootScope, $state, $translate, AppInfoService,
      Constants, CenPosService, ConfigService, DataService, MessageService, MruService, OptionApiService, UserService,
      UserActivityService, RecentlyVisitedService, RecoveryService, ReportService, Sasa, PvUser, Sasoo, Sasc, AodataService, CacheService,
      StateService, TranslationService, Utils) {
   var self = this;

   // Flag to know if user is logged in
   var authenticated = false;

   // Flag to know if we've loaded the pre-login data (data required before showing the login screen)
   var preLoginDataLoaded = false;

   // Saved pre-login data
   var preLoginResults = {};

   // Session timeout properties
   var sessionLengthMinutes = null; // length of session in minutes
   var warningDuration = 30; // seconds to show the timeout warning message
   var timeoutTimer = null;
   var signOutTimer = null;

   var affirmativeValues = ['true', 'yes', 'on'];

   // Default state to go to after successful login
   var postLoginState = 'search';

   /* Public methods */

   /**
    * get/set postLoginState
    */
   this.setPostLoginState = function (state) {
      postLoginState = state;
   };

   this.getPostLoginState = function () {
      return postLoginState;
   };

   /**
    * Flag to know if the user if logged in
    */
   this.isAuthenticated = function () {
      return authenticated;
   };

   /**
    * Get number of logged in sxe browser windows for this user.
    */
   self.getActiveWindows = function () {
      var key = AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_ACTIVE_WINDOWS;
      var number = localStorage[key];
      return number ? parseInt(number) : 0;
   };

   /**
    * Set number of logged in sxe browser windows for this user.
    */
   self.setActiveWindows = function (number) {
      var key = AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_ACTIVE_WINDOWS;
      localStorage[key] = number;
   };

   /**
    * Clear the number of logged in sxe browser windows for this user from localStorage.
    */
   self.resetActiveWindows = function () {
      var key = AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_ACTIVE_WINDOWS;
      delete localStorage[key];
   };

   /**
    * Is this window the the only logged in sxe browser window for this user.
    */
   self.isOnlyActiveWindow = function () {
      return self.getActiveWindows() <= 1;
   };

   /**
    * Increment active windows by 1.
    */
   self.incrementActiveWindows = function () {
      self.setActiveWindows(self.getActiveWindows() + 1);
   };

   /**
    * Decrement active windows by 1.
    */
   self.decrementActiveWindows = function () {
      var number = self.getActiveWindows();

      // Decrement or clear out if closing last window (so localStorage data doesn't hang around)
      if (number > 1) {
         self.setActiveWindows(number - 1);
      } else {
         self.resetActiveWindows();
      }
   };

   /**
    * Flag to know if the user if logged in
   */
   this.loadedPreLoginResults = function () {
      return preLoginResults;
   };

   /**
    * Flag to know if we've loaded the pre-login data
    */
   this.isPreLoginDataLoaded = function () {
      return preLoginDataLoaded;
   };

   /**
    * Load the pre-login data (data required before showing the login screen)
    */
   this.loadPreLoginData = function (callback) {
      var locale;

      // Carry out a pre-login call to return what sort of login we are going to carry out.
      DataService.post('api/shared/login/prelogin', function (preLoginResultsReturned) {
         // Set pre-login loaded flag
         preLoginResults = preLoginResultsReturned;
         preLoginDataLoaded = true;

         // Determine locale to use
         locale = getLocale();

         // Attempt to load translation file for the user's locale
         $translate.use(locale).then(function success() {
            UserService.setLocale(locale);

            // Set English as the "fallback" language (so English strings will display in the case of missing strings)
            $translate.fallbackLanguage('en-US');

            callback();
         }, function error() {
            // If we don't have a translation file for the user's language, then resort to the default
            $translate.use('en-US').then(function success() {

               // Allow the en-GB locale (even though we don't have lang file) so dates/times format properly for the UK
               if (locale === 'en-GB') {
                  UserService.setLocale(locale);
               } else {
                  UserService.setLocale('en-US');
               }

               callback();
            });
         });
      });
   };

   /**
    * Get user's active session and proceed into the application, or go to the login screen
    */
   this.authenticate = function (toState, toParams) {
      var sessionToken = sessionStorage[Constants.SESSION_ID_KEY];

      // If the session token exists, activate session and proceed to state that was requested.
      // This happens in dev environments only when clicking the browser reload button
      if (sessionToken) {
         // Get stored login results object
         var loginResults = JSON.parse(sessionStorage[Constants.SESSION_LOGIN_RESULTS_KEY]);

         // Need to set this here in order for following renew call to access session
         $http.defaults.headers.common.Token = sessionToken;

         // Renew session
         self.renewSession(function (numberOfMinutes, bearerToken) {

            // Use updated number of minutes (left until session expires)
            loginResults.NumberOfMinutes = numberOfMinutes;

            // Activate and initialize session
            self.activateSession(sessionToken, loginResults, false, bearerToken);

            // Proceed to state once app is fully loaded
            $('body').on('initialized', function () {
               $state.go(toState, toParams);

               // Check for recovery records (unless user is opening an additional window for himself)
               if (self.isOnlyActiveWindow()) {
                  RecoveryService.checkRecoveryRecords();
               }
            });
         });
      } else {
         $state.go('login');
      }
   };

   /**
    * Activate the user's session
    */
   this.activateSession = function (sessionToken, loginResults, isFromLogin, bearerToken) {
      if (loginResults.Oper.indexOf(String.fromCharCode(92)) > 0) {
         loginResults.Oper = loginResults.Oper.substring(0, loginResults.Oper.indexOf(String.fromCharCode(92)));
      }
      if (loginResults.Oper.indexOf(String.fromCharCode(47)) > 0) {
         loginResults.Oper = loginResults.Oper.substring(0, loginResults.Oper.indexOf(String.fromCharCode(47)));
      }

      // Store login info in browser's session storage so can retrieve when developers click browser refresh button
      sessionStorage[Constants.SESSION_ID_KEY] = sessionToken;
      sessionStorage[Constants.SESSION_LOGIN_RESULTS_KEY] = JSON.stringify(loginResults);

      if (bearerToken) {
         sessionStorage[Constants.BEARER_TOKEN] = bearerToken;
      }

      // Set the session token as a default header on every Angular AJAX request
      $http.defaults.headers.common.Token = sessionToken;

      // Set initial timeout timer (for warning and auto-logout)
      self.setTimeoutTimer(loginResults.NumberOfMinutes);

      // Set initial renew timer (if coming from login, otherwise was already set)
      if (isFromLogin) {
         self.setRenewTimer(loginResults.NumberOfMinutes);
         if (loginResults.NumberOfMinutesBearer > 0) {
            self.setRenewTimerBearer(loginResults.NumberOfMinutesBearer);
         }
      }

      // Initialize config values
      ConfigService.initConfig(loginResults);

      // Load post-login initial data (i.e. globally-used options) before activating the UI
      loadPostLoginData(loginResults).then(function () {

         // Activate Pendo integration
         activatePendo(loginResults);

         // Initialize user values
         UserService.initUser(loginResults);

         // Initialize user activity
         UserActivityService.initialize(self);

         // Clear our caching mechanism.
         CacheService.clearCompleteCache();

         // Set a timed clear of expired cache entries.
         setInterval(function () { CacheService.clearAllExpired(); }, 900000);

         // Initialize CenPOS service
         CenPosService.initialize();

         // If had to perform a login to get here, then we know this is the only active window for the user,
         // so make sure we reset the active window number because it's possible that an unwanted old number can hang
         // around in localStorage (browser closes unexpectedly, machine turns off abruptly, etc.)
         if (isFromLogin) {
            self.resetActiveWindows();
         }

         // Increment active window number (but not when dev mode because closing browser in dev mode doesn't decrement)
         if (!ConfigService.isDevMode()) {
            self.incrementActiveWindows();
         }

         // Clean up local storage data (old MRUs, etc.)
         cleanUpLocalStorage();

         // Clean up recently visited and MRU if under GDPR restriction
         cleanUpGdprRestictedData();

         // Send login message to web parts
         var msgData = {
            sessionId: loginResults.SessionID,
            tenant: loginResults.Tenant,
            cono: loginResults.Cono,
            operinit: loginResults.Oper,
            restAccessUrl: loginResults.RestAccessUrl,
            token: sessionStorage[Constants.SESSION_ID_KEY],
            phoneFormat: ConfigService.getPhoneFormat()
         };
         infor.companyon.client.sendMessage('SxeH5Login', JSON.stringify(msgData));

         // Activate css extensions
         activateCSSExtensions(function () {

            // Activate javascript extensions
            activateJavaScriptExtensions(function () {

               // If any custom strings were added by an extension, then refresh our translation data.
               // This re-fires our TranslationLoader which has the logic to include the custom strings.
               if (TranslationService.hasCustomStrings()) {
                  $translate.refresh().then(function () {
                     activateUI(loginResults);
                  });
               } else {
                  activateUI(loginResults);
               }
            });
         });
      });
   };

   /**
    * Schedule the next auto-renew call.
    *
    * The auto-renew calls will continue to be made (10 seconds before session expiration)
    * until the timeout timer runs out which performs auto-logout (see setTimeoutTimer function).
    */
   this.setRenewTimer = function (minutes) {
      var milliseconds = minutes * 60000 - 10000;

      setTimeout(self.renewSession, milliseconds);
   };


   /**
    * Renew the user's session and schedule the next auto-renew call
    */
   this.renewSession = function (callback) {
      var options = {
         bypassActivity: true // skip recordActivity for this call (since it happens despite user activity)
      };

      // Send renew call
      DataService.post('api/shared/login/renew', options, function (numberOfMinutes, response) {
         if (numberOfMinutes) {
            // Schedule the next auto-renew call
            self.setRenewTimer(numberOfMinutes);

            if (callback) {
               callback(numberOfMinutes, response.headers('BearerToken'));
            } else {
               // Set the session token as a default header on every Angular AJAX request
               if (response.headers('BearerToken')) {
                  sessionStorage[Constants.BEARER_TOKEN] = response.headers('BearerToken');
               }
            }
         } else {
            // If we get 0 minutes returned from the renew call, force the user out of the application since their session got invalidated
            finishSignOut(false);
         }
      });
   };


   this.setRenewTimerBearer = function (minutes) {
      var milliseconds = minutes * 60000 - 10000;
      setTimeout(self.renewSessionBearer, milliseconds);
   };

   this.renewSessionBearer = function () {
      DataService.post('api/shared/login/renewbearertoken', { bypassActivity: true, busy: false }, function (numberOfMinutes, response) {
         if (numberOfMinutes && numberOfMinutes > 0) {
            self.setRenewTimerBearer(numberOfMinutes);
            if (response.headers('BearerToken')) {
               sessionStorage[Constants.BEARER_TOKEN] = response.headers('BearerToken');
            }
         }
      });
   };


   /**
    * Set (or reset) the timer for when the session should expire and perform auto-logout.
    * This gets reset every time there is user activity (see UserActivityService).
    */
   this.setTimeoutTimer = function (minutes) {

      // Remember number of minutes (if passed) for subsequent reset calls
      if (minutes) {
         sessionLengthMinutes = minutes;
      }

      // Time until show timeout warning is 1 minute before session expiration (converted to ms)
      var timeUntilWarning = (sessionLengthMinutes - 1) * 60000;

      // Clear any pending timeout timer
      clearTimeout(timeoutTimer);

      // Schedule timeout warning
      timeoutTimer = setTimeout(function () {
         var message = MessageService.get('special.session.timeout.warning', { seconds: warningDuration });

         MessageService.yesNo('global.warning', message, function yes() {
            // Clear pending sign out timer
            clearTimeout(signOutTimer);

            // Reset timeout timer
            self.setTimeoutTimer();
         }, function no() {
            // Clear pending sign out timer
            clearTimeout(signOutTimer);

            // Perform sign out as requested by user
            self.signOut(false, true);
         });

         // If warning duration expires before user makes a choice, perform sign out
         signOutTimer = setTimeout(function () {
            self.signOut(false, true);
         }, warningDuration * 1000);

      }, timeUntilWarning);
   };

   /**
    * Perform sign out (invalidate session and redirect to login page)
    */
   this.signOut = function (isFromWindowClose, isFromSessionTimeout) {
      var delaySignOut = false;

      // Check each open tab before sign out (can close, on close, etc.)
      if (!isFromWindowClose) {
         var results = processOpenTabs(isFromSessionTimeout);

         // Do not proceed with sign out if hit a tab that can't close
         if (results.stopSignOut) {
            $(document).trigger('close-applicationmenu'); // close the app menu
            return;
         }
         delaySignOut = results.delaySignOut;
      }

      // Pass info to the login screen that will come up after reload web page
      if (!isFromWindowClose) {
         sessionStorage[Constants.SIGN_OUT_INFO_KEY] = JSON.stringify({
            errorMessage: isFromSessionTimeout ? 'special.session.timeout.error' : undefined
         });
      }

      // Need to manually set busy since not using DataService
      $('body').trigger('start.busyindicator');

      // Delay the logout SI call if any tabs had onClose logic and sign out is not from window close.
      // Note: This is because we want to make sure any api calls made in onClose functions are processed by the backend
      //       before the logout call is processed.
      if (delaySignOut) {
         setTimeout(function () {
            finishSignOut(isFromWindowClose);
         }, 500);
      } else {
         finishSignOut(isFromWindowClose);
      }
   };


   /* Private methods */

   /**
    * Process all open tabs before sign out (check if can close, etc.)
    */
   function processOpenTabs (isFromSessionTimeout) {
      var $tabs = $('#nav-tab-list').children('li:not(.application-menu-trigger)');
      var i, j, $tab, canCloseList, onCloseList, allow, baseState;
      var delaySignOut = false;

      // Check each open tab
      for (i = 0; i < $tabs.length; i++) {
         $tab = $($tabs[i]);
         canCloseList = $tab.data('canCloseListeners');
         onCloseList = $tab.data('onCloseListeners');

         // If any open tab can't be closed, then prevent sign out (unless from session timeout)
         // Note: The 'canUserCloseTab' function that returns false will be showing an error message to the user
         // so they know they need to do something.
         if (canCloseList && !isFromSessionTimeout) {
            for (j = 0; j < canCloseList.length; j++) {
               allow = canCloseList[j]();

               // If any listener is not allowing close, then do not proceed, and switch to that tab
               // by going to its base state (which is the tab id)
               if (!allow) {
                  baseState = $tab.children('a').attr('href').replace('#', '');
                  StateService.goToStateInExistingTab(baseState);
                  return { stopSignOut: true };
               }
            }
         }

         // Invoke all 'onCloseTab' functions of open tabs before signing out
         // Note: We don't actually close the tabs because that may do odd things right before sign out/reload.
         //       We just run the onClose logic.
         if (onCloseList) {
            delaySignOut = true;
            for (j = 0; j < onCloseList.length; j++) {
               onCloseList[j]();
            }
         }
      }

      return { delaySignOut: delaySignOut };
   }

   /**
    * Finish the sign out process
    */
   function finishSignOut (isFromWindowClose) {
      var sessionToken = sessionStorage[Constants.SESSION_ID_KEY];

      // Clear session info from browser's storage
      delete sessionStorage[Constants.SESSION_ID_KEY];
      delete sessionStorage[Constants.SESSION_LOGIN_RESULTS_KEY];

      // Decrement active windows number
      self.decrementActiveWindows();

      // Clear external webparts
      infor.companyon.client.sendMessage('SxeH5Logout', {});

      // Run logout SI call
      // Note: Not using Angular (DataService) because need to do this synchronously for it to work during window close
      $.ajax({
         type: 'POST',
         url: 'api/shared/login/logout',
         // Important! This async flag must be false if from window close, otherwise browsers may not allow the ajax call
         async: !isFromWindowClose,
         headers: {
            // Need to set the session token expected by the server
            Token: sessionToken
         },
         success: function (data) {
            if (data && data.ErrorMessage) {
               MessageService.error('global.error', data.ErrorMessage);
            }

            // Refresh whole page to make sure things are cleared (even if there is a logout error)
            if (!isFromWindowClose) {
               authenticated = false;
               preLoginResults = {};
               location.hash = '/empty'; // set hash to empty state so ensure will redirect to login (report states are unknown until later)
               location.reload();
            }
         },
         error: function () {
            // If the logout call fails for some reason, still reload the page so we kick them out back to the login screen
            if (!isFromWindowClose) {
               authenticated = false;
               preLoginResults = {};
               location.hash = '/empty'; // set hash to empty state so ensure will redirect to login (report states are unknown until later)
               location.reload();
            }
         }
      });
   }

   /**
    * Load initial data that we need upon successful login (i.e. globally-used options)
     */
   function loadPostLoginData(loginResults) {
      var userId = loginResults.Oper;
      var promises = [];

      // Get PvUser data
      promises.push((function (userId) {
         var deferred = $q.defer();
         DataService.get('api/pv/pvuser/getbypk', { params: { oper2: userId } }, function (data) {
            Utils.replaceObject(PvUser, data);
            Object.freeze(PvUser);
            deferred.resolve();
         });
         return deferred.promise;
      })(userId));

      // Get SASOO data
      promises.push((function (userId) {
         var deferred = $q.defer();

         DataService.get('api/sa/sasoo/getbypk', { params: { oper2: userId } }, function (data) {
            Utils.replaceObject(Sasoo, data);
            Object.freeze(Sasoo);
            deferred.resolve();
         });
         return deferred.promise;
      })(userId));

      // get SASC (company options)
      promises.push((function () {
         var deferred = $q.defer();

         DataService.get('api/sa/sasc/getbypk', function (data) {
            Utils.replaceObject(Sasc, data);
            Object.freeze(Sasc);

            // Set phone format (change x to # since is what Soho mask expects)
            ConfigService.setPhoneFormat(Sasc.phonemask.replace(/x/g, '#'));

            deferred.resolve();
         });

         return deferred.promise;
      })());

      // get SASA (all company options)
      promises.push((function () {
         var deferred = $q.defer();

         DataService.get('api/sa/assasetup/sasaretrieve', function (data) {
            Utils.replaceObject(Sasa, data);
            Object.freeze(Sasa);
            deferred.resolve();
         });

         return deferred.promise;
      })());

      // Get Aodata
      promises.push((function () {
         var deferred = $q.defer();

         DataService.get('api/shared/aodata?batchsize=5000', function (data) {
            AodataService.initialize(data);
            deferred.resolve();
         });
         return deferred.promise;
      })());

      // Get GL default periods
      promises.push((function () {
         var deferred = $q.defer();

         // Get GL default periods
         DataService.get('api/gl/asglentry/setdefaultperiods', function (data) {
            ConfigService.setGLDefaultPeriods(data);
            deferred.resolve();
         });
         return deferred.promise;
      })());

      // Get report menu function security and info (for all report types by passing blank parentMenu)
      promises.push((function () {
         var deferred = $q.defer();
         var criteria = { cParentMenu: '' };

         DataService.post('api/shared/assharedentry/reportsecuritysettings', { data: criteria }, function (reportSecurityList) {
            ReportService.initialize(reportSecurityList);
            deferred.resolve();
         });
         return deferred.promise;
      })());

      // Pre-load list of Country options (because CountryCodeToName converter requires list to already be cached)
      promises.push((function () {
         var deferred = $q.defer();

         OptionApiService.get('Country', function () {
            deferred.resolve();
         });
         return deferred.promise;
      })());

      return $q.all(promises);
   }

   /**
    * Clean up localStorage data (i.e. old MRU data).
    */
   function cleanUpLocalStorage() {
      // Add tenant to local storage keys if not already done so
      if (localStorage['SXE_ADDED_TENANT'] !== 'true') {
         addTenantToLocalStorageData();
      }

      // Remove old, invalid MRU data
      if (Constants.MRU_INVALIDATE_DATE) {
         removeInvalidMRUs();
      }
   }

   /**
    * Add tenant to local storage keys if not already done so
    *
    * Note: In SXWEB-28141 we added tenant to the keys because customers sometimes have test and prod tenants,
    * and they said their MRUs were being used across both which caused broken MRUs.
    */
   function addTenantToLocalStorageData() {
      var keys = Object.keys(localStorage);

      // Scan all localStorage keys
      for (var i = 0; i < keys.length; i++) {
         var key = keys[i];

         // Only process our SXE_ keys, skipping global keys (ones that are not separated by cono/user)
         if (key.startsWith('SXE_') && key !== 'SXE_ENABLE_EXTENSIONS' && key !== 'SXE_ENABLE_PERSONALIZATION' && key !== 'SXE_MOCK_BASE_URL') {
            var value = localStorage.getItem(key);
            var tenant = UserService.getTenant() || 'DEFAULT'; // we use DEFAULT for a single tenant env

            // Form new key with tenant
            var newKey = 'SXE_' + tenant.toUpperCase() + '_' + key.replace('SXE_', '');

            // Add new
            localStorage.setItem(newKey, value);

            // Delete old
            localStorage.removeItem(key);
         }
      }

      // Remember that we've performed this conversion
      localStorage.setItem('SXE_ADDED_TENANT', 'true');
   }

   /**
    * Remove old, invalid MRU data
    *
    * Note: This is a mechanism where we can remove MRU and Recently Visited data that has become invalid.
    *       If we change how MRUs are handled and needed to invalidate all existing MRUs, then we can set an
    *       invalidate date to know which MRUs are invalid and need cleared.
    */
   function removeInvalidMRUs() {
      var prefix = AppInfoService.getLocalStoragePrefix();
      var lastClearPrefix = prefix + Constants.STORAGE_KEY_LAST_MRU_CLEAR;
      var mruPrefix = prefix + Constants.STORAGE_KEY_MRU + '_';
      var rvPrefix = prefix + Constants.STORAGE_KEY_RECENTLY_VISITED + '_';

      // Get last MRU clear date
      var lastClear = localStorage[lastClearPrefix];
      var clearDate = lastClear ? new Date(lastClear) : null;

      // Get invalidate date (all MRU data stored before this date will be removed as invalid)
      var invalidateDate = new Date(Constants.MRU_INVALIDATE_DATE);

      // Perform the clear if clear date doesn't exist or if last clear is older than invalidate date
      if (!clearDate || clearDate.getTime() < invalidateDate.getTime()) {
         for (var key in localStorage) {
            if (localStorage.hasOwnProperty(key) && (key.startsWith(mruPrefix) || key.startsWith(rvPrefix))) {
               localStorage.removeItem(key);
            }
         }

         // Remember the new clear date
         localStorage[lastClearPrefix] = new Date().toISOString();
      }
   }

   // Remove any recently visited data that may be under GDPR restriction
   // Remove any most recently used data that may be under GDPR restriction
   // Doing this here instead of SAAG because recently visited data is stored on the client
   // This needs to run for anyone logged into SX.e to clear their specific data
   function cleanUpGdprRestictedData() {
      var companyNumber = UserService.getCono();
      var crit = {
         expSources: 'al',
         expTime: '20000',
         expStatus: 'b'
      };
      DataService.post('/web/api/shared/GdprExpireSearch', { data: crit, busy: false }, function (data) {
         if (data.ttblgdprexpireresults) {

            data.ttblgdprexpireresults.forEach(function (gdprdata) {

               if (gdprdata.cono === companyNumber) {
                  switch (gdprdata.recordnm.toLowerCase()) {
                     case 'apsf':                                                                              //ignore jslint
                        RecentlyVisitedService.removeFromList('apsf', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'apsv':                                                                              //ignore jslint
                        // For MRUs, pass the rowpointer for elastic lookups and the rowid for other lookups
                        MruService.removeFromList('Vendor', gdprdata.rowpointer);                              //ignore jslint
                        RecentlyVisitedService.removeFromList('apsv', gdprdata.gdprrowid);                     //ignore jslint
                        RecentlyVisitedService.removeFromList('apiv', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'apss':                                                                              //ignore jslint
                        MruService.removeFromList('ShipFrom', gdprdata.rowpointer);                            //ignore jslint
                        RecentlyVisitedService.removeFromList('apss', gdprdata.gdprrowid);                     //ignore jslint
                        RecentlyVisitedService.removeFromList('apiv', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'arsc':                                                                              //ignore jslint
                        MruService.removeFromList('Customer', gdprdata.rowpointer);                            //ignore jslint
                        RecentlyVisitedService.removeFromList('arsc', gdprdata.gdprrowid);                     //ignore jslint
                        RecentlyVisitedService.removeFromList('aric', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'arsg':                                                                              //ignore jslint
                        MruService.removeFromList('Group', gdprdata.gdprrowid);                                //ignore jslint
                        RecentlyVisitedService.removeFromList('arsg', gdprdata.gdprrowid);                     //ignore jslint
                        RecentlyVisitedService.removeFromList('aric', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'arss':                                                                              //ignore jslint
                        MruService.removeFromList('ShipTo', gdprdata.rowpointer);                              //ignore jslint
                        RecentlyVisitedService.removeFromList('arss', gdprdata.gdprrowid);                     //ignore jslint
                        RecentlyVisitedService.removeFromList('aric', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'carrier':                                                                           //ignore jslint
                        MruService.removeFromList('TWLCarrier', gdprdata.gdprrowid);                           //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'cmsp':                                                                              //ignore jslint
                        MruService.removeFromList('Prospect', gdprdata.gdprrowid);                             //ignore jslint
                        RecentlyVisitedService.removeFromList('oesp', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'contacts':                                                                          //ignore jslint
                        MruService.removeFromList('Contact', gdprdata.rowpointer);                             //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'empmst':                                                                            //ignore jslint
                        MruService.removeFromList('TWLEmployee', gdprdata.gdprrowid);                          //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'pv_user':                                                                           //ignore jslint
                        MruService.removeFromList('Operator', gdprdata.gdprrowid);                             //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'sasta':                                                                             //ignore jslint
                        MruService.removeFromList('Buyer', gdprdata.rowpointer);                               //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'smsn':                                                                              //ignore jslint
                        MruService.removeFromList('SalesRep', gdprdata.gdprrowid);                             //ignore jslint
                        RecentlyVisitedService.removeFromList('oess', gdprdata.gdprrowid);                     //ignore jslint
                        break;                                                                                 //ignore jslint
                     case 'venmst':                                                                            //ignore jslint
                        MruService.removeFromList('TWLVendor', gdprdata.gdprrowid);                            //ignore jslint
                        break;                                                                                 //ignore jslint
                     default:                                                                                  //ignore jslint
                        break;                                                                                 //ignore jslint
                  }
               }
            });
         }
      });

   }

   /**
    * Load and initialize Pendo integration
    */
   function activatePendo(loginResults) {
      if (loginResults.PendoApiKey) {
         var apiKey = loginResults.PendoApiKey;
         var tenant = loginResults.Tenant ? loginResults.Tenant : loginResults.Cono;
         var visitor = tenant + '|' + loginResults.Cono + '|' + loginResults.Oper;
         var tenantType = (affirmativeValues.indexOf(loginResults.TryAndBuy.toLowerCase()) > -1) ? "TestDrive" : "Production";

         (function (p, e, n, d, o) {
            if (!p[d]) {
               var v, w, x, y, z; o = p[d] = p[d] || {}; o._q = [];
               v = ['initialize', 'identify', 'updateOptions', 'pageLoad']; for (w = 0, x = v.length; w < x; ++w) (function (m) {
                  o[m] = o[m] || function () { o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0))); };
               })(v[w]);
               y = e.createElement(n); y.async = !0; y.src = 'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';
               z = e.getElementsByTagName(n)[0]; z.parentNode.insertBefore(y, z);
            }
         })(window, document, 'script', 'pendo');

         pendo.initialize({
            apiKey: apiKey,
            visitor: { id: visitor },
            account: { id: tenant, tenantType: tenantType }
         });
      }
   }

   /**
    * Load and apply CSS extensions
    */
   function activateCSSExtensions(callback) {

      // Don't proceed if extensions are turned off
      if (!ConfigService.isExtensionsEnabled()) {
         callback();
         return;
      }

      // Fetch all css extensions that should be applied for this user
      // Note: We reuse the 'getactivejavascriptwebextension' call because it does exactly what we need as long as we pass 'css'
      DataService.post('api/shared/assharedinquiry/getactivejavascriptwebextension', { data: { extensiontype: 'css' } }, function (records) {
         var css = '';

         // Concatenate all css
         for (var i = 0; i < records.length; i++) {
            var record = records[i];
            css += '/* ' + record.screenname + ' */' + '\n\n';
            css += (record.settingvalue || '') + '\n\n\n';
         }

         // Inject css to DOM
         if (css) {
            var styleTag = document.createElement('style');
            styleTag.appendChild(document.createTextNode(css));
            document.head.appendChild(styleTag);
         }

         callback();
      });
   }

   /**
    * Load and apply JavaScript code extensions
    */
   function activateJavaScriptExtensions(callback) {

      // Don't proceed if extensions are turned off
      if (!ConfigService.isExtensionsEnabled()) {
         callback();
         return;
      }

      // Fetch all javascript extensions that should be applied for this user
      DataService.post('api/shared/assharedinquiry/getactivejavascriptwebextension', { data: { extensiontype: 'javascript' } }, function (records) {
         var allScript = '';

         // Concatenate all scripts
         for (var i = 0; i < records.length; i++) {
            allScript += (records[i].settingvalue || '') + '\n\n';
         }

         // Inject javascript to DOM so that it executes
         if (allScript) {
            var scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.text = '"use strict";\n\n' + allScript; // ensure strict mode for whole script
            document.head.appendChild(scriptTag);

            // Invoke "config" functions and then "run" functions
            // Note: These functions must be invoked after all the extension javascript code is executed so that new
            //       components (factories, services, etc.) exist and can be injected for use in these functions.
            //       Need to wrap this in a try catch (otherwise an error in their functions would prevent them from
            //       getting into the app).
            try {
               app.invokeConfigFunctions();
               app.invokeRunFunctions();
            } catch (error) {
               console.error(error);
            }
         }

         callback();
      });
   }

   /**
    * Determine the locale to use for this user. The $translate package has a nice api to grab it from the browser.
    * Most browsers honor their language setting in the browser's options. But IE honors the Windows language setting.
    */
   function getLocale() {
      var locale = $translate.resolveClientLocale() || '';

      // If value is only the language part (first half), and it's a language we support, then add the 2nd half
      // so that we attempt to use their preferred language instead of resorting to English.
      switch (locale.toLowerCase()) {
         case 'fr':
            locale = 'fr-CA';
            break;
         case 'es':
            locale = 'es-MX';
            break;
         case 'en':
            locale = 'en-US';
            break;
         default:
            break;
      }

      return locale;
   }

   function activateUI(loginResults) {
      authenticated = true;
      $rootScope.userName = loginResults.Oper;
      $rootScope.company = loginResults.Cono;
   }

});
