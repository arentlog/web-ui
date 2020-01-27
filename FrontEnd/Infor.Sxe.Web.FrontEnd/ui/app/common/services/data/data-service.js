'use strict';

/**
 * Service to communicate with RESTful web servers, as well as perform common UI operations associated with data calls.
 * All data calls should use this service.
 */
app.service('DataService', function DataService($http, $q, $sanitize, $timeout, $translate, ConfigService, Constants,
      LoggingService, MessageService, UserActivityService, UserService, Utils) {
   var self = this;

   // Current number of pending data calls that requested the busy indicator
   // This is used to know when the start and stop the indicator (only stop when there are no more pending requests)
   self.busyRequests = 0;

   // Flag to know if an "Unexpected Error" message is currently on the screen (we want to limit so user sees only 1)
   self.isUnexpectedErrorDisplayed = false;

   /* Public methods */

   /**
    * Get single resource/record
    *
    * This call has the benefit of immediately returning an object (including the $promise)
    * that will become the fully populated object once the data response returns.
    */
   self.getResource = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;
      var busyIndicator = null;
      var retryCount = 0;

      // Start busy indicator
      if (options.busy) {
         busyIndicator = self.startBusy(options.busy);
      }

      // Set up hand-crafted promise (handling the promise manually because of our auto-retry self-healing feature)
      var deferred = $q.defer();

      // Create the object to be returned that will be populated upon success
      var object = {
         $promise: deferred.promise, // Provide a reference to the promise
         $resolved: false
      };

      // Recursive function to make api call (in case it fails we can auto-retry for self-healing)
      var performCall = function () {
         // Make api call
         $http({
            method: options.method || 'GET',
            url: self.getURL(path, options),
            params: self.getParams(options.params),
            data: options.data,
            headers: self.getHeaders(path, options),
            timeout: options.timeout !== undefined ? options.timeout : Constants.DEFAULT_HTTP_TIMEOUT
         }).then(function success(response) {
            var returnObject;

            // Populate the empty object with the data in the returned object
            Utils.replaceObject(object, response.data);

            // Handle null response object properly by passing null (instead of an object with no properties)
            returnObject = response.data ? object : null;

            // Add promise properties back onto object (for anyone wanting to check promise resolution)
            object.$promise = deferred.promise;
            object.$resolved = response.data ? true : false;

            self.stopBusy(busyIndicator);

            // Invoke success callback
            if (onSuccess) {
               onSuccess(returnObject, response);
            }

            // Resolve the promise (for anyone listening for ".then" success)
            deferred.resolve(response);
         }, function error(response) {
            retryCount++;

            // Check if should retry the call (it may be that a cloud server went down so attempt to self-heal)
            if (self.isRetryWarranted(response, retryCount)) {
               MessageService.alert('special.request.retry.title', 'special.request.retry.message');

               // Retry after a delay
               setTimeout(performCall, ConfigService.getCallRetryDelay());
            } else {
               self.stopBusy(busyIndicator);
               self.handleServerError(response, options);

               // Invoke error callback
               if (onError) {
                  onError(response.data, response);
               }

               // Silence Angular's "Possibly unhandled rejection" console error by adding a "noop" error function
               deferred.promise.then(undefined, angular.noop);

               // Reject the promise (for anyone listening for ".then" error function)
               deferred.reject(response);
            }
         });
      };

      // Record user activity for session handling
      if (!options.bypassActivity) {
         UserActivityService.recordActivity();
      }

      // First attempt of api call
      performCall();

      return object;
   };

   /**
    * Get list of resources/records
    *
    * This call has the benefit of immediately returning an array (including the $promise)
    * that will become the fully populated array once the data response returns.
    */
   self.getList = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;
      var busyIndicator = null;
      var retryCount = 0;

      // Start busy indicator
      if (options.busy) {
         busyIndicator = self.startBusy(options.busy);
      }

      // Set up hand-crafted promise (handling the promise manually because of our auto-retry self-healing feature)
      var deferred = $q.defer();

      // Create the array to be returned that will be populated upon success
      var array = [];

      // Provide a reference to the promise
      array.$promise = deferred.promise;
      array.$resolved = false;

      // Recursive function to make api call (in case it fails we can auto-retry for self-healing)
      var performCall = function () {

         // Make api call
         $http({
            method: options.method || 'GET',
            url: self.getURL(path, options),
            params: self.getParams(options.params),
            data: options.data,
            headers: self.getHeaders(path, options),
            timeout: options.timeout !== undefined ? options.timeout : Constants.DEFAULT_HTTP_TIMEOUT
         }).then(function success(response) {

            // Populate the empty array with the objects in the returned data array
            Utils.replaceArray(array, response.data);

            // Add promise properties back onto array (for anyone wanting to check promise resolution)
            array.$promise = deferred.promise;
            array.$resolved = true;

            self.stopBusy(busyIndicator);

            // Invoke success callback
            if (onSuccess) {
               onSuccess(array, response);
            }

            // Resolve the promise (for anyone listening for ".then" success)
            deferred.resolve(response);
         }, function error(response){
            retryCount++;

            // Check if should retry the call (it may be that a cloud server went down so attempt to self-heal)
            if (self.isRetryWarranted(response, retryCount)) {
               MessageService.alert('special.request.retry.title', 'special.request.retry.message');

               // Retry after a delay
               setTimeout(performCall, ConfigService.getCallRetryDelay());
            } else {
               self.stopBusy(busyIndicator);
               self.handleServerError(response, options);

               // Invoke error callback
               if (onError) {
                  onError(response.data, response);
               }

               // Silence Angular's "Possibly unhandled rejection" console error by adding a "noop" error function
               deferred.promise.then(undefined, angular.noop);

               // Reject the promise (for anyone listening for ".then" error function)
               deferred.reject(response);
            }
         });
      };

      // Record user activity for session handling
      if (!options.bypassActivity) {
         UserActivityService.recordActivity();
      }

      // First attempt of api call
      performCall();

      return array;
   };

   /**
    * Create/save new record data call (uses http POST)
    */
   self.create = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;

      // Set method to POST (which does creates)
      options.method = 'POST';

      return self.send(path, options, onSuccess, onError);
   };

   /**
    * Updating existing record data call (uses http PUT)
    */
   self.update = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;

      // Set method to PUT (which does updates)
      options.method = 'PUT';

      return self.send(path, options, onSuccess, onError);
   };

   /**
    * Generic HTTP 'DELETE' data call
    */
   self.delete = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;

      // Set method to DELETE
      options.method = 'DELETE';

      return self.send(path, options, onSuccess, onError);
   };

   /**
    * Generic HTTP 'POST' data call
    */
   self.post = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;

      // Set method to POST
      options.method = 'POST';

      return self.send(path, options, onSuccess, onError);
   };

   /**
    * Generic HTTP 'PUT' data call
    */
   self.put = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;

      // Set method to PUT
      options.method = 'PUT';

      return self.send(path, options, onSuccess, onError);
   };

   /**
    * Generic HTTP 'GET' data call
    */
   self.get = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;

      // Set method to GET
      options.method = 'GET';

      return self.send(path, options, onSuccess, onError);
   };

   /**
    * Generic HTTP data call; must specify options.method ('GET', 'POST', etc.)
    * Calling this directly is only useful when conditionally doing a POST/PUT based on creating or updating
    */
   self.send = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;
      var busyIndicator = null;
      var retryCount = 0;

      // Log error for developers if no http method
      if (!options.method) {
         console.log('The "method" must be specified when using DataService.send()');
         return;
      }

      // Start busy indicator
      if (options.busy) {
         busyIndicator = self.startBusy(options.busy);
      }

      // Set up hand-crafted promise (handling the promise manually because of our auto-retry self-healing feature)
      var deferred = $q.defer();

      // Recursive function to make api call (in case it fails we can auto-retry for self-healing)
      var performCall = function () {

         // Make api call
         $http({
            transformRequest: options.transformRequest || $http.defaults.transformRequest,
            method: options.method,
            url: self.getURL(path, options),
            params: self.getParams(options.params),
            data: options.data,
            responseType: options.responseType,
            headers: self.getHeaders(path, options),
            timeout: options.timeout !== undefined ? options.timeout : Constants.DEFAULT_HTTP_TIMEOUT
         }).then(function success(response) {
            self.stopBusy(busyIndicator);

            // Invoke success callback
            if (onSuccess) {
               onSuccess(response.data, response);
            }

            // Resolve the promise (for anyone listening for ".then" success)
            deferred.resolve(response);
         }, function error(response){
            retryCount++;

            // Check if should retry the call (it may be that a cloud server went down so attempt to self-heal)
            if (self.isRetryWarranted(response, retryCount)) {
               MessageService.alert('special.request.retry.title', 'special.request.retry.message');

               // Retry after a delay
               setTimeout(performCall, ConfigService.getCallRetryDelay());
            } else {
               self.stopBusy(busyIndicator);
               self.handleServerError(response, options);

               // Invoke error callback
               if (onError) {
                  onError(response.data, response);
               }

               // Silence Angular's "Possibly unhandled rejection" console error by adding a "noop" error function
               deferred.promise.then(undefined, angular.noop);

               // Reject the promise (for anyone listening for ".then" error function)
               deferred.reject(response);
            }
         });
      };

      // Record user activity for session handling (renew call needs to bypass this)
      if (!options.bypassActivity) {
         UserActivityService.recordActivity();
      }

      // First attempt of api call
      performCall();

      return deferred.promise;
   };

   /**
    * Generic HTTP data call; must specify options.method ('GET', 'POST', etc.)
    * Calling this is only useful when canceling requests is needed
    */
   self.sendWithCancel = function (path, optionsOrCallback, callback, errorCallback) {
      var options = (typeof optionsOrCallback === 'object') ? optionsOrCallback : {};
      var onSuccess = (typeof optionsOrCallback === 'function') ? optionsOrCallback : callback;
      var onError = (typeof optionsOrCallback === 'function') ? callback : errorCallback;
      var busyIndicator = null;

      // Log error for developers if no http method
      if (!options.method) {
         console.log('The "method" must be specified when using DataService.send()');
         return;
      }

      var httpTimeout = $q.defer();

      //aborts the request when timed out
      var timeoutPromise = $timeout(function () {
         httpTimeout.resolve("user cancelled");
      }, options.timeout !== undefined ? options.timeout : Constants.DEFAULT_HTTP_TIMEOUT);

      // Make data call
      var promise = $http({
         transformRequest: options.transformRequest || $http.defaults.transformRequest,
         method: options.method,
         url: self.getURL(path, options),
         params: self.getParams(options.params),
         data: options.data,
         headers: self.getHeaders(path, options),
         responseType: options.responseType,
         timeout: httpTimeout.promise
      }).then(function success(response) {
         $timeout.cancel(timeoutPromise);
         self.stopBusy(busyIndicator);
         if (onSuccess) {
            return onSuccess(response.data, response);
         }
      }, function error(response) {
         self.stopBusy(busyIndicator);
         if (response.status > 0) {
            self.handleServerError(response, options);
         }
         if (onError) {
            return onError(response.data, response);
         }
      });

      var cancel = function () {
         httpTimeout.resolve("user cancelled");
      };

      return {
         promise: promise,
         cancel: cancel
      };
   };


   /* Helper methods */

   /**
    * Build URL to be used (add prefix to path, add and encode path parameters, etc.)
    */
   self.getURL = function (path, options) {
      var pathParams = options.pathParams;

      // Replace any variable pieces on the path with values from pathParams
      // Encode the params for security
      if (pathParams) {
         for (var prop in pathParams) {
            if (pathParams.hasOwnProperty(prop)) {
               path = path.replace('{' + prop + '}', encodeURIComponent(pathParams[prop]));
            }
         }
      }

      // Add base url for Progress REST calls
      // 3 Options:
      //    1. path starts with '/' which means it is meant for the Progress REST api
      //    2. path is relative to the web page which will hit our .NET REST api
      //    3. path is a full url (starting with 'http...')
      if (path.charAt(0) === '/') {
         path = ConfigService.getRestUrl() + path;
      }

      return path;
   };

   self.getHeaders = function (path, options) {
      var headers = options.headers || {};

      if (options.method === 'DELETE') {
         // DELETE calls to the .NET REST server need this header to handle json content properly
         headers['Content-Type'] = 'application/json; charset=UTF-8';
      }

      options.CallGuid = Utils.uuidFast();
      if (!options.errorFunction) {

         // Progress REST calls can't handle the CallGuid header right now, so instead we set errorFunction to the path
         if (path.charAt(0) === '/') {
            options.errorFunction = path;
         } else {
            headers['CallGuid'] = options.CallGuid;
            headers['BearerToken'] = sessionStorage[Constants.BEARER_TOKEN];
         }
      }

      return headers;
   };

   /**
    * Get URL params to be used for the call. The params consist of incoming params plus any default params we add.
    */
   self.getParams = function (incomingParams) {
      var params = incomingParams || {};
      var tenant = UserService.getTenant();

      // Add the tenant id as a param on all calls so that we can see tenant in the client access logs when researching cloud issues.
      // Note: This tenant value is only populated in a multi-tenant environment, which is nice because the browser network log
      //       won't be cluttered with this param value in our development environments.
      if (tenant) {
         params.tenantid = tenant;
      }

      return params;
   };

   self.startBusy = function (selectorOrOptions) {
      var $body = $('body');

      if (typeof selectorOrOptions === 'string') {
         return $(selectorOrOptions).trigger('start.busyindicator').data('busyindicator');
      } else if (typeof selectorOrOptions === 'object') {

         // TODO: handle custom busy via options object

      } else {
         var $busyContainer;

         // If modal is currently engaged, apply busy to the active modal
         if ($body.is('.modal-engaged')) {
            $busyContainer = $body.children('.modal-page-container:visible:last').find('.modal-content.busy');
         }

         // Otherwise apply to body (it's possible a modal is engaged but doesn't have a busy control like error messages)
         if (!$busyContainer || $busyContainer.length === 0) {
            $busyContainer = $body;
         }

         // Activate busy indicator (unless already active)
         if (self.busyRequests <= 0) {
            $busyContainer.trigger('start.busyindicator');
         }

         // Increment current number of busy requests
         self.busyRequests++;

         return $busyContainer.data('busyindicator');
      }
   };

   self.stopBusy = function (busyIndicator) {
      if (busyIndicator) {
         // Note: Perform check after a slight delay because another call with a busy request may happen
         //       immediately after this one ends, and we don't want to stop the indicator then immediately start it
         //       again since Soho couldn't handle that well for more than 2 times (the 3rd indicator was not showing).
         setTimeout(function () {
            // Decrement current number of busy requests
            self.busyRequests--;

            // If no outstanding requests, then stop busy indicator
            if (self.busyRequests <= 0) {
               busyIndicator.element.trigger('complete.busyindicator');
            }
         }, 5);
      }
   };

   /**
    * Determine if we should retry the failed api call.
    * If get a 500+ error, then it may be that a cloud server went down so we should attempt to self-heal.
    * But don't retry when in dev mode because it can be annoying for developers.
    */
   self.isRetryWarranted = function (response, retryCount) {
      if (response.status >= 500 && retryCount <= ConfigService.getCallRetryLimit() && !ConfigService.isDevMode()) {
         return true;
      } else {
         return false;
      }
   };

   /**
    * Handle different server errors (401, 420, 421, 500, etc.).
    */
   self.handleServerError = function (response, options) {
      var data = response.data || {};
      var status = response.status;
      var msg = data.Message;
      var errorDetails = '';
      var unexpectedError = false;

      // In rare cases we can suppress the default error handling if needed. Right now it is only used when we fetch
      // a language file that may or may not exist.
      if (options.suppressErrors) {
         return;
      }

      switch (status) {
         case 401:
            // IMPORTANT! Commented out the below code that sends user back to login screen because of a progress bug.
            //            Chris W. said Progress is currently sending a 401 error when they should be sending a 400 error
            //            in their base code, and it causes users to get booted out of the app when they shouldn't have to.
            //            After Progress fixes this bug we can uncomment the below code. (SXWEB-25250)
            //
            // Session is no longer valid. Clear local session data and send user back to login screen.
            // delete sessionStorage[Constants.SESSION_ID_KEY];
            // delete sessionStorage[Constants.SESSION_LOGIN_RESULTS_KEY];
            // sessionStorage[Constants.SIGN_OUT_INFO_KEY] = JSON.stringify({ errorMessage: 'special.session.invalid.error' });
            // infor.companyon.client.sendMessage('SxeH5Logout');
            // location.hash = '/empty';
            // location.reload();
            break;
         case 403:
            // Simply display the message - if it exists
            if (msg) {
               msg = $translate.instant(msg);
            } else {
               msg = $translate.instant('global.error.server.message');
            }
            break;
         case 420:
            // Simply display the message
            break;
         case 421:
            // 421 errors have string keys that need translated
            msg = $translate.instant(msg);
            break;
         default:
            // Other errors (404, 500, etc.) display a generic 'unexpected error...' message
            unexpectedError = true;

            // Log the error if will be helpful
            if (status === 404 || options.errorFunction) {
               if (!options.errorFunction) {
                  options.errorFunction = 'data-service';
               }
               var errorMessage = 'URL-{' + (response.config.url ? response.config.url : 'Unknown')  + '} Status-{' + status + '} Msg-{' + (msg ? msg : 'Error') + '}';
               if (response.config.data) {
                  errorMessage += ' Data-{' + JSON.stringify(response.config.data) + '}';
               }
               if (response.config.params) {
                  errorMessage += ' Params-{' + JSON.stringify(response.config.params) + '}';
               }
               LoggingService.logError(errorMessage, options.errorFunction, options.CallGuid);
            }

            msg = $translate.instant('global.error.server.message');

            // These errors may have extra info if running in debug mode
            if (typeof data === 'object') {
               for (var prop in data) {
                  if (data.hasOwnProperty(prop) && prop !== 'Message') {
                     errorDetails += data[prop] + '<br />';
                  }
               }
            } else {
               errorDetails = data;
            }

            if (options.CallGuid) {
               errorDetails += 'Error ID: ' + ConfigService.getClientIdentifier() + options.CallGuid;
            }

            if (errorDetails) {
               msg += '<div class="serverError">' + errorDetails + '</div>';
            }
      }

      // For unexpected errors, don't show more if one is currently displayed to the user
      if (unexpectedError && self.isUnexpectedErrorDisplayed) {
         return;
      } else if (unexpectedError) {
         self.isUnexpectedErrorDisplayed = true;
      }

      // Display error message
      $('body').message({
         title: $sanitize($translate.instant('global.error')),
         message: $sanitize(msg),
         isError: true,
         buttons: [{
            text: $sanitize($translate.instant('global.ok')),
            isDefault: true,
            click: function (e, modal) {
               modal.close();

               // Reset flag if closing an unexpected error
               if (unexpectedError) {
                  self.isUnexpectedErrorDisplayed = false;
               }
            }
         }]
      });
   };

});
