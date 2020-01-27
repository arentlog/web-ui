'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('login', {
      url: '/login',
      views: {
         'login@': {
            templateUrl: 'ui/app/modules/login/index.html',
            controller: 'LoginCtrl'
         }
      }
   });
});

app.controller('LoginCtrl', function ($scope, $state, Constants, DataService, MessageService, SessionService, RecoveryService, UserService) {
   $scope.login = {};

   $scope.changePasswordBody = {};

   // LoginMode can be
   //    1 - Standard Login
   //    2 - Standard Login with Tenant
   //    3 - SSO Login from List
   //    4 - Unauthorized
   $scope.loginMode = SessionService.loadedPreLoginResults().LoginMode;

   $scope.availableTenants = SessionService.loadedPreLoginResults().AvailableTenants;

   $scope.availableLogin = SessionService.loadedPreLoginResults().AvailableLogin;

   $scope.defaultLogin = SessionService.loadedPreLoginResults().DefaultLogin;

   $scope.changePassword = false;

   // Handle info from sign out (if just came from sign out)
   handleFromSignOut();

   $scope.showTenant = function() {
      return ($scope.loginMode === 2 && !$scope.changePassword);
   };

   $scope.showStandardLogin = function () {
      return (($scope.loginMode === 1 || $scope.loginMode === 2) && !$scope.changePassword);
   };

   $scope.showSsoDropdown = function () {
      return ($scope.loginMode === 3 && !$scope.changePassword);
   };

   $scope.showChangePassword = function () {
      return ($scope.changePassword);
   };

   if ($scope.loginMode === 2) {
      if ($scope.availableTenants.length > 0) {
         $scope.login.Tenant = $scope.availableTenants[0];
      }
   }

   $scope.doAutoLogin = false;

   if ($scope.loginMode === 3 && !$scope.changePassword && $scope.availableLogin.length === 1) {
      $scope.doAutoLogin = true;
   }

   if ($scope.loginMode === 3) {
      if ($scope.availableLogin.length === 1) {
         $scope.login.ConoUser = $scope.availableLogin[0];
      } else {
         if ($scope.defaultLogin == null) {
            if ($scope.availableLogin.length > 0) {
               $scope.login.ConoUser = $scope.availableLogin[0];
            }
         } else {
            $scope.login.ConoUser = $.grep($scope.availableLogin, function (e) { return e.DisplayValue === $scope.defaultLogin; })[0];
         }
      }
   }

   $scope.cancelChangePassword = function () {
      $scope.changePassword = false;
   };

   $scope.gotFocus = function () {
      if ($scope.doAutoLogin) {
         $scope.doAutoLogin = false;
         $scope.attemptLogin();
      };
   };

   $scope.attemptLogin = function() {
      startBusy();

      if ($scope.changePassword) {
         var changePasswordRequestModel  = {
            OldPassword: $scope.changePasswordBody.OldPassword,
            NewPassword: $scope.changePasswordBody.NewPassword,
            ConfirmPassword: $scope.changePasswordBody.ConfirmPassword,
            Oper: $scope.loginMode === 3 ? $scope.login.ConoUser.availuser : $scope.login.Oper,
            Cono: $scope.loginMode === 3 ? $scope.login.ConoUser.availcono : $scope.login.Company
         };

         DataService.post('api/shared/login/changepassword',
            { data: changePasswordRequestModel },
            function (changePasswordResults) {
               stopBusy();
               if (changePasswordResults === '') {
                  if ($scope.showStandardLogin) {
                     $scope.login.Password = $scope.changePasswordBody.NewPassword;
                  }
                  $scope.changePassword = false;
               } else {
                  MessageService.error('global.error', changePasswordResults);
               }
            }, function() {
               stopBusy();
            });
      } else {
         var loginRequestObject = {
            Oper: $scope.loginMode === 3 ? $scope.login.ConoUser.availuser : $scope.login.Oper,
            Password: $scope.loginMode === 3 ? '' : $scope.login.Password,
            Tenant: $scope.loginMode === 3 ? '' : $scope.login.Tenant,
            Locale: UserService.getLocale(),
            Cono: $scope.loginMode === 3 ? $scope.login.ConoUser.availcono : $scope.login.Company,
            OffsetTime: new Date().getTimezoneOffset() * -1
         };

         DataService.post('api/shared/login/login', { data: loginRequestObject }, function (loginResults, response) {
            if (loginResults) {

               //this means we validated and we should send them to the Customer page
               if (loginResults.UserRequiresClearing) {
                  stopBusy();
                  openClearOperatorModal(loginRequestObject);
               } else if (loginResults.ChangePassword) {
                  stopBusy();
                  MessageService.info('global.information', 'global.login.mustchangepassword');
                  $scope.changePasswordBody = {};
                  $scope.changePassword = true;
               } else if (!loginResults.Success) {
                  stopBusy();
                  MessageService.error('global.error', 'global.login.failed');
               } else {
                  // Activate session
                  SessionService.activateSession(response.headers('Token'), loginResults, true, response.headers('BearerToken'));

                  // Proceed to home state once app is fully loaded
                  $('body').on('initialized', function () {
                     stopBusy();
                     $state.go(SessionService.getPostLoginState());

                     // Check for recovery records
                     RecoveryService.checkRecoveryRecords();
                  });
               }
            } else {
               // This means we had some kind of error and should be getting back a string
               MessageService.error('global.error', 'global.login.failed');
            }
         }, function() {
            stopBusy();
         });
      }
   };

   function openClearOperatorModal(loginRequestObject) {
      MessageService.okCancel('global.login.clear.user', 'question.clear.operators.session', function () {
         clearOperator(loginRequestObject);
      });
   }

   function clearOperator(loginRequestObject) {
      // Show Busy Indicator
      startBusy();

      // Make a call to the api
      DataService.post('api/shared/login/clearoper?runLogin=false', { data: loginRequestObject }, function (jsonResult) {
         // Attempt login again
         if (jsonResult.Success) {
            $scope.attemptLogin();
         } else {
            stopBusy();
         }
      }, function () {
         stopBusy();
      });
   }

   // Handle info from sign out
   function handleFromSignOut() {
      var signOutInfo = sessionStorage[Constants.SIGN_OUT_INFO_KEY];

      // If the signOutInfo object exists, we know we just came from sign out
      if (signOutInfo) {
         signOutInfo = JSON.parse(signOutInfo);
         $scope.isFromSignOut = true;

         // Show message if it's passed from sign out
         if (signOutInfo.errorMessage) {
            MessageService.error('global.error', signOutInfo.errorMessage);
         }

         // Clear sign out info
         delete sessionStorage[Constants.SIGN_OUT_INFO_KEY];
      }
   }

   function startBusy() {
      $('#sign-in-view').trigger('start.busyindicator');
   }

   function stopBusy() {
      $('#sign-in-view').trigger('complete.busyindicator');
   }
});
