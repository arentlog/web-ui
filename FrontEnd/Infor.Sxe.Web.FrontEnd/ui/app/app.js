'use strict';

// Reference to main Angular module (this is the only global variable we should have in our code)
var app;

/**
 * Main module of the application.
 */
app = angular.module('sxeApp', [
   'ngCookies',
   'ngRoute',
   'ngSanitize',
   'ui.router',
   'ct.ui.router.extras.core',
   'ct.ui.router.extras.sticky',
   'ct.ui.router.extras.dsr',
   'pascalprecht.translate',
   'focus-if'
]);

// Prepare angular provider references for extensibility code injection
//
// After the AngularJS has been bootstrapped, you can no longer use the normal module methods (ex, app.controller) to
// add components to the dependency-injection container. Instead, you have to use the relevant providers. Since those
// are only available during the config() method at initialization time, we have to keep a reference to them.
//
// NOTE: This general idea is based on excellent article by Ifeanyi Isitor: http://ify.io/lazy-loading-in-angularjs/
app.config(function ($injector, $compileProvider, $controllerProvider, $provide, $filterProvider) {
   var configFunctions = [];

   // Since the "shorthand" methods for component definitions are no longer valid (once config phase has started),
   // we can just override them to use the providers for post-bootstrap loading.

   // Let's keep the older references in case they're needed.
   app._controller = app.controller;
   app._service = app.service;
   app._factory = app.factory;
   app._provider = app.provider;
   app._directive = app.directive;
   app._filter = app.filter;
   app._constant = app.constant;
   app._value = app.value;
   app._config = app.config;
   app._run = app.run;

   // Provider-based controller.
   app.controller = function (name, controller) {
      $controllerProvider.register(name, controller);
      return( this );
   };
   // Provider-based service.
   app.service = function (name, service) {
      $provide.service(name, service);
      return( this );
   };
   // Provider-based factory.
   app.factory = function (name, factory) {
      $provide.factory(name, factory);
      return( this );
   };
   // Provider-based provider.
   app.provider = function (name, provider) {
      $provide.provider(name, provider);
      return( this );
   };
   // Provider-based directive.
   app.directive = function (name, directive) {
      $compileProvider.directive(name, directive);
      return( this );
   };
   // Provider-based filter.
   app.filter = function (name, filter) {
      $filterProvider.register(name, filter);
      return( this );
   };
   // Provider-based constant.
   app.constant = function (name, constant) {
      $provide.constant(name, constant);
      return( this );
   };
   // Provider-based value.
   app.value = function (name, value) {
      $provide.value(name, value);
      return( this );
   };
   // Injector-based config function that stores extension config functions to invoke slightly later
   app.config = function (configFunction) {
      configFunctions.push(configFunction);
      return( this );
   };

   // API to invoke all extension config functions and pass injected dependencies (called by SessionService)
   app.invokeConfigFunctions = function () {
      for (var i = 0; i < configFunctions.length; i++) {
         $injector.invoke(configFunctions[i]);
      }
   };
});

// Note: we have to set this up in the run phase in order for the $injector to be able to inject dependencies that are
// available during the run phase.
app.run(function ($injector) {
   var runFunctions = [];

   // Injector-based run function that stores extension run functions to invoke slightly later
   app.run = function (runFunction) {
      runFunctions.push(runFunction);
      return( this );
   };

   // API to invoke all extension config functions and pass injected dependencies (called by SessionService)
   app.invokeRunFunctions = function () {
      for (var i = 0; i < runFunctions.length; i++) {
         $injector.invoke(runFunctions[i]);
      }
   };
});

// Configure AJAX requests to always send session id cookie credentials to the server
app.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.defaults.withCredentials = true;
}]);

// Set up i18n translation
app.config(['$translateProvider', function ($translateProvider) {

   // Use BCP 47 locale syntax (for when client locale is determined)
   $translateProvider.uniformLanguageTag('bcp47');

   // We use a custom loader called "TranslationLoader" in order to handle adding strings through extensibility
   $translateProvider.useLoader('TranslationLoader');

   // Set security for translated messages (only escape html in message parameters)
   // - Note: parameters are like {{name}} in en-US.json
   // - Note: We are not sanitizing all messages via translation because it's unnecessary, it's a performance hit,
   //         and it is safer for each control to do it's own sanitization (some strings are passed to controls without going through translation)
   $translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);

// Set the default hash prefix to empty string (since angular 1.6 changed the default to '!' which altered our urls)
app.config(['$locationProvider', function ($locationProvider) {
   $locationProvider.hashPrefix('');
}]);

// When there is an empty route (i.e. no hash), redirect to home state
app.config(['$urlRouterProvider', function($urlRouterProvider){
   $urlRouterProvider.when('', '/search');
}]);

// Create 'empty' state to be used when all tabs are closed
app.config(function ($stateProvider) {
   $stateProvider.state('empty', {
      url: '/empty'
   });
});

// Prevent backspace key from navigating back to previous angular state
// (which is annoying and happens by the browser when backspace is pressed when not editing a form field)
app.config(function () {
   $(document).on('keydown', function (e) {
      if (e.which === 8 && !$(e.target).is('input:not([readonly]):not([type=radio]):not([type=checkbox]), textarea, [contentEditable], [contentEditable=true]')) {
         e.preventDefault();
      }
   });
});

// Prevent double clicking from firing duplicate code by decorating the ng-click directive with a disabling timer.
// See https://stackoverflow.com/a/30587172
app.config(['$provide', function ($provide) {
   $provide.decorator('ngClickDirective', ['$delegate', 'Constants', function ($delegate, Constants) {
      var original = $delegate[0].compile;

      $delegate[0].compile = function (element, attrs, transclude) {
         var disabled = false;

         // If button is set to allow multiple clicks then don't add prevention (desired in some rare cases like paging)
         if (attrs.multipleClicks !== 'true') {
            element.on('click', function onClick(evt) {
               if (disabled) {
                  evt.preventDefault();
                  evt.stopImmediatePropagation();
               } else {
                  disabled = true;
                  setTimeout(function () { disabled = false; }, Constants.DOUBLE_CLICK_PREVENTION_DELAY);
               }
            });
         }

         return original(element, attrs, transclude);
      };

      return $delegate;
   }]);
}]);

// TODO: asp - it is a bad practice in angular to use $rootScope, so these should be cleaned up and removed
app.run(['$rootScope', '$state', function ($rootScope, $state) {
   $rootScope.$state = $state; // TODO: asp - remove after references in html templates are changed
}]);

// Bind session functions
app.run(['$rootScope', 'ConfigService', 'SessionService', function ($rootScope, ConfigService, SessionService) {
   $rootScope.signOut = SessionService.signOut;
   $rootScope.isAuthenticated = SessionService.isAuthenticated;

   // Auto-logout when browser window gets closed if we are...
   // 1. currently logged in, and
   // 2. no other open browser windows logged into sxe, and
   // 3. not running in dev mode (developers need to be able to refresh the browser window without having to re-login)
   window.addEventListener('beforeunload', function (e) {
      if (SessionService.isAuthenticated() && !ConfigService.isDevMode()) {

         // If it's the only active window then sign out, otherwise decrement the window number
         if (SessionService.isOnlyActiveWindow()) {
            SessionService.signOut(true);
         } else {
            SessionService.decrementActiveWindows();
         }

         // Note: If want to confirm before closing browser, can return this... (handles most browsers)
         //var confirmationMessage = 'Some message to display';
         //e.returnValue = confirmationMessage;
         //return confirmationMessage;
      }
   });
}]);

// Handler for open/close of expanded web parts
app.run([function () {
   var currentModal = null;

   infor.companyon.client.registerMessageHandler('SxeOpenModal', function (message) {
      var url = message.url;

      // Don't proceed if user tries to expand two apps before closing the first
      if (currentModal) {
         return;
      }

      if (url) {
         var modalWidth = '1000';
         if (window.innerWidth < 1000) { // in small browser windows, create a smaller modal popup
            modalWidth = '800';
         }
         var content = $('<iframe src="' + url + '" name="web-part-modal" style="width: ' + modalWidth + 'px; height: 600px;" frameborder="0"></iframe>');

         currentModal = $('body').contextualactionpanel({
            title: null,
            content: content,
            initializeContent: false,
            trigger: 'immediate'
         }).data('contextualactionpanel');
      }
   });

   // Listen for modal close message in order to destroy SoHo CAP modal
   infor.companyon.client.registerMessageHandler('SxeCloseModal', function () {

      if (currentModal) {
         currentModal.destroy();
         currentModal = null;
      }
   });
}]);


// Handler for application drillbacks.
app.run(['$state', 'SessionService', 'UserService', 'StateService', function ($state, SessionService, UserService, StateService) {
   function getParameterByName(name, url) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
   }

   infor.companyon.client.registerMessageHandler('applicationDrillback', function (drillback) {
      if (drillback.applicationDrillback) {
         var myurl = drillback.applicationDrillback;
         var accountingEntity = getParameterByName('accountingEntity', myurl);
         if (accountingEntity && accountingEntity === UserService.getAccountingEntity()) {
            var newUrl = getParameterByName('ViewId', myurl);
            var params = {};
            if (newUrl) {
               var keyword = getParameterByName('keyword', myurl);
               if (keyword) {
                  params['keyword'] = keyword;
               }
               var pkval = getParameterByName('pk', myurl);
               if (pkval) {
                  params['pk'] = pkval;
                  for (var i = 2; i < 10; i++) {
                     var param = getParameterByName('pk' + i, myurl);
                     if (param) {
                        params['pk' + i] = param;
                     } else {
                        break;
                     }
                  }
               }
            }
            if (newUrl) {
               $state.go(newUrl, params);
            }
         }
      }
   });

   infor.companyon.client.registerMessageHandler('showFavoriteContext', function (bookmark) {
      if (SessionService.isAuthenticated()) {
         StateService.goToStateInNewTab(bookmark.favoriteContext, {});
      } else {
         SessionService.setPostLoginState(bookmark.favoriteContext);
      }
   });
}]);

// Handler for generic incoming messages from Web Parts
app.run(['$state', 'DataService', 'Utils', function ($state, DataService, Utils) {
   infor.companyon.client.registerMessageHandler('IncomingContextMessage', function (request) {

      // State navigation
      if (request.navigate) {
         $state.go(request.navigate, request.params);
      }
      // Invoke api call
      else if (request.invokeApi) {
         var method = request.apiMethod || 'POST';
         DataService.send(request.invokeApi, { method: method, data: request.payload, params: request.apiParams });
      }
      else {
         var moduleTab, scope;

         // Get the module tab (either the requested one or the current visible one)
         if (request.module) {
            moduleTab = $('#' + request.module);
         } else {
            moduleTab = $('#nav-tab-panel-container').children('.tab-panel:visible');
         }

         // Get the requested scope (by section or jquery selector)
         if (request.section) {
            scope = moduleTab.find('div[ui-view="' + request.section + '"]').scope();
         } else if (request.selector) {
            scope = moduleTab.find(request.selector).scope();
         }

         // Log helpful error if can't find it
         if (!scope) {
            console.error('Unable to find scope for these parameters:\n' +
                           'module: ' + request.module + '\n' +
                           'section: ' + request.section + '\n' +
                           'selector: ' + request.selector);
            return;
         }

         // Update a model value within scope
         if (request.model && request.fieldData) {
            angular.forEach(request.fieldData, function (value, key) {
               Utils.setNestedValue(scope, request.model + '.' + key, value);
            });
         }
         // Invoke an action (function on a controller within scope)
         else if (request.action) {
            var fn = Utils.getNestedValue(scope, request.action);

            // If any action params are passed, invoke the function passing those params; otherwise just invoke the function
            if (fn && request.actionParams) {
               fn.apply(null, request.actionParams);
            } else if (fn) {
               fn();
            } else {
               console.error('Unable to find function: "' + request.action + '" within the requested scope');
            }
         }

         // Apply scope (if not already being applied)
         if (!scope.$$phase) {
            scope.$apply();
         }
      }
   });
}]);

// Handler for Lookup message from Web Parts (WebUI provides the lookup dialog for web part lookup fields)
app.run(['$compile', function ($compile) {
   infor.companyon.client.registerMessageHandler('SxeLookupOpen', function (request) {
      var $body = $('body');
      var scope = $body.scope().$new();
      var lookupKey = request.lookup;
      var uniqueId = request.uniqueId;
      var lookupOptions = request.options ? 'data-lookup-options=\'' + JSON.stringify(request.options) + '\'' : '';

      // Manufacture a ghost lookup object to act as controller
      scope.ghostLookup = {
         value: '',
         onChange: null
      };

      // Manufacture a ghost lookup field in order to invoke its lookup dialog (field will be hidden in DOM and removed)
      var html = '<div class="field" style="display: none">' +
                    '<label class="inline inline-lookup">' +
                       '<span class="label-text"></span>' +
                       '<input type="text" class="lookup" data-model="ghostLookup.value" lookup="' + lookupKey + '" ' + lookupOptions + ' data-on-change="ghostLookup.onChange()" data-init="false" />' +
                    '</label>' +
                 '</div>';
      var $field = $(html);
      var $input = $field.find('input');

      // Add hidden field to DOM
      $body.append($field);

      // Tell Angular to compile it
      $compile($field)(scope);

      // Get handle on Soho lookup api
      var lookup = $input.data('lookup');

      // Get handle on modal
      $input.on('open', function (e, modal) {

         // Remove field and kill scope upon close of the dialog (delay slightly so onchange processing can finish)
         modal.element.on('close', function () {
            setTimeout(function () {
               $field.remove();
               scope.$destroy();
            }, 100);

            // Tell web part that lookup has closed (either by cancel or by selection); delay so the change message goes first
            setTimeout(function () {
               // Send message directly to web part modal (ming.le only forwards messages to small web parts)
               window.frames['web-part-modal'].postMessage(JSON.stringify({ type: 'SxeLookupClose', data: { uniqueId: uniqueId } }), '*');
            }, 250);
         });
      });

      // Open lookup dialog
      lookup.openDialog();

      // Change function to send change message back to web part for it to apply the change
      scope.ghostLookup.onChange = function (args) {
         var msg = {
            args: args,
            modelValue: scope.ghostLookup.value, // send model value to apply to model (different from args.value in few cases)
            uniqueId: uniqueId
         };

         // Send message directly to web part modal (ming.le only forwards messages to small web parts)
         window.frames['web-part-modal'].postMessage(JSON.stringify({ type: 'SxeLookupChange', data: msg }), '*');
      };
   });
}]);

// Set up generic custom validation rule that is able to call validation functions on scope
app.run(['MessageService', function (MessageService) {

   var customFieldValidation = function (value, $input) {
      var isValid;
      var scope = $input.scope();
      var validationExpr = $input.attr('data-custom-validation');

      // Evaluate the custom expression (i.e. a function call that returns a result)
      var result = scope.$eval(validationExpr);

      // A string result is the error message to display; otherwise expect a boolean
      if (typeof result === 'string') {
         isValid = false;

         // Set the error message for Soho to apply to the field
         $.fn.validation.rules['custom-rule'].message = result;
      } else {
         isValid = result;

         // Use generic message if result is a simple boolean
         $.fn.validation.rules['custom-rule'].message = MessageService.get('message.invalid.value');
      }

      // Apply scope since the validation code may make model changes
      if (!scope.$$phase) {
         scope.$apply();
      }

      return isValid;
   };

   $.fn.validation.rules['custom-rule'] = {
      check: customFieldValidation,
      message: '', // added dynamically
      async: false
   };
}]);

// Set up a custom email validation rule that allows multiple email addresses separated by a , or ;
app.run([function () {
   $.fn.validation.rules['email-multiple'] = {
      check: function (value) {
         this.message = Locale.translate('EmailValidation');
         var regex = /^(([a-zA-Z0-9_&\-\.]+)@([a-zA-Z0-9_+\-\.]+)\.([a-zA-Z]{2,5}){1,25})+(\s*[\s;,.]\s*(([a-zA-Z0-9_&\-\.]+)@([a-zA-Z0-9_+\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
         return (value.length) ? regex.test(value) : true;
      },
      message: 'EmailValidation',
      async: false
   };
}]);

// Initialize state handling
app.run(['SessionService', 'StateService', function (SessionService, StateService) {
   StateService.initialize(SessionService);
}]);
