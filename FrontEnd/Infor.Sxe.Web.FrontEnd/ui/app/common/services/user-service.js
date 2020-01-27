'use strict';

/**
 * Service for basic information about the user. More detailed information can be obtained by injecting the
 * PvUser, Sasc, and Sasoo records as dependencies.
 */
app.service('UserService', function UserService(PvUser, SecurityService) {

   /* User information */

   var tenant = '';
   var accountingEntity = '';
   var cono = null;
   var userName = ''; // also known as operator
   var twlUserId = '';
   var twlWarehouse = '';
   var twlRestrictWarehouse = false;
   var twlCompany = '';
   var locale = '';

   /* Public methods */

   this.getTenant = function () {
      return tenant;
   };

   this.getAccountingEntity = function () {
      return accountingEntity;
   };

   this.getCono = function () {
      return cono;
   };

   this.getUserName = function () {
      return userName;
   };

   this.getTwlUserId = function () {
      return twlUserId;
   };

   this.getTwlWarehouse = function () {
      return twlWarehouse;
   };

   this.getTwlRestrictWarehouse = function () {
      return twlRestrictWarehouse;
   };

   this.getTwlCompany = function () {
      return twlCompany;
   };

   this.getLocale = function () {
      return locale;
   };
   this.setLocale = function (loc) {
      locale = loc;
   };

   /**
    * Check if user has permission to the requested state via saso security.
    * Most security is handled in other places, but this is an additional backup.
    * We can secure specific states by defining a 'securityLevel' (and optionally a 'subFunction') on their state data.
     */
   this.isStateAllowed = function (state, stateParams) {
      var menuFn = state.data ? state.data.menuFn : null;
      var subFn = state.data ? state.data.subFunction : null;
      var stateSecurityLevel = state.data ? state.data.securityLevel : null;
      var userSecurityLevel;

      // If state not associated with a menuFn (like wysiwyg) allow to proceed
      if (!menuFn) {
         return true;
      }

      // The 'reports' function is somewhat special; manipulate the function name by which type
      if (menuFn === 'reports') {
         menuFn = stateParams.type + '-reports';
      }

      // If state does not have a securityLevel defined, then just verify they at least have the min access level
      if (!stateSecurityLevel) {
         stateSecurityLevel = 2;
      }

      // Get user's function (or subFunction) security level
      if (subFn) {
         userSecurityLevel = SecurityService.getSubSecurityLevel(menuFn, subFn);
      } else {
         userSecurityLevel = SecurityService.getSecurityLevel(menuFn);
      }

      // Return true if user's security level is >= the min security level of the requested state
      return userSecurityLevel >= stateSecurityLevel;
   };

   this.initUser = function (loginResults) {
      tenant = loginResults.Tenant; // This value is only populated in a multi-tenant env (it's empty string otherwise)
      accountingEntity = loginResults.Cono.toString();
      cono = loginResults.Cono;
      userName = loginResults.Oper;
      twlUserId = userName;
      twlCompany = String(cono);
      twlWarehouse = PvUser.twlwhse ? PvUser.twlwhse : '';
      if (twlWarehouse) {
         twlRestrictWarehouse = PvUser.twlrestrictwhsefl ? PvUser.twlrestrictwhsefl : false;
      } else {
         twlRestrictWarehouse = false;  // Blank warehouse - need to select
      }
   };

});
