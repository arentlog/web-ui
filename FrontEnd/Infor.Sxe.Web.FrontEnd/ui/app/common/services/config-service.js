'use strict';

/**
 * Service for easy access to pre-loaded application configuration values that are obtained from the server.
 * This should generally be used for settings/options that are configurable by administrators.
 * These values are cached for the duration of the user's session.
 */
app.service('ConfigService', function ConfigService() {

   /* Config variables */
   var defaultRecordLimit = null; // Record limit for search calls (based on a business rule)
   var reportRecordLimit = null; // Record limit for report calls (based on a business rule)  Set to zero so that's the default, which will fall back to the 'defaultRecordLimit'.
   var lookupMaxResults = null; // Record limit specifically for lookup field search calls (based on a business rule)
   var autoCompleteMaxResults = null; // Record limit specifically for auto-complete search calls
   var glDefaultPeriods = null; // GL Default Periods data from api/gl/asglentry/setdefaultperiods
   var phoneFormat = ''; // Phone # format from Sasc record from AO > System > Options
   var devMode = false; // Running in dev or release mode
   var devToolsEnabled = false; // Allow access to dev tools
   var extensionsEnabled = false; // Should extensions be fetched and applied
   var personalizationEnabled = false; // Should personalization be fetched and applied
   var multiTenant = false; // Stores if the environment is multiTenant (true) or not (false)
   var restUrl = ''; // Base url for our Progress REST calls
   var showImages = false; // Show images in the app (based on a business rule)
   var suppressBusinessContext = false; // Suppress business context messages from being sent (based on a business rule)
   var callRetryLimit = 0; // Max number of times to auto-retry a failed api call due to http 500 error
   var callRetryDelay = 0; // Time in milliseconds to wait before retrying a failed api call
   var clientIdentifier = ''; // Identifier sent be the server to uniquely identify this client (to be used to tag server log messages to a user)
   var backendDateFormat = ''; // Startup parameter for the date formats in the backend server session (i.e. mdy or dmy)

   /* Public methods */

   this.getDefaultRecordLimit = function () {
      return defaultRecordLimit;
   };

   this.getReportRecordLimit = function () {
      return reportRecordLimit;
   };

   this.getLookupMaxResults = function () {
      return lookupMaxResults;
   };

   this.getAutoCompleteMaxResults = function () {
      return autoCompleteMaxResults;
   };

   this.getGLDefaultPeriods = function () {
      return glDefaultPeriods;
   };

   this.setGLDefaultPeriods = function (glDftPer) {
      glDefaultPeriods = glDftPer;
   };

   this.getPhoneFormat = function () {
      return phoneFormat;
   };

   this.setPhoneFormat = function (format) {
      phoneFormat = format;
   };

   this.getRestUrl = function () {
      return restUrl;
   };

   this.getCallRetryLimit = function () {
      return callRetryLimit;
   };

   this.getCallRetryDelay = function () {
      return callRetryDelay;
   };

   this.getClientIdentifier = function () {
      return clientIdentifier;
   };

   this.isMultiTenant = function () {
      return multiTenant;
   };

   this.isShowImages = function () {
      return showImages;
   };

   this.isSuppressBusinessContext = function () {
      return suppressBusinessContext;
   };

   /**
    * Check if extensions should be fetched and applied
    */
   this.isExtensionsEnabled = function () {
      return extensionsEnabled;
   };

   this.setExtensionsEnabled = function (isEnable) {
      extensionsEnabled = isEnable;
      localStorage['SXE_ENABLE_EXTENSIONS'] = isEnable;
   };

   /**
    * Check if personalization should be fetched and applied
    */
   this.isPersonalizationEnabled = function () {
      return personalizationEnabled;
   };

   this.setPersonalizationEnabled = function (isEnable) {
      personalizationEnabled = isEnable;
      localStorage['SXE_ENABLE_PERSONALIZATION'] = isEnable;
   };

   /**
    * Check if should allow access to dev tools
     */
   this.isDevToolsEnabled = function () {
      return devToolsEnabled;
   };

   /**
    * Check if this is a development environment
    */
   this.isDevMode = function () {
      return devMode;
   };

   this.getBackendDateFormat = function () {
      return backendDateFormat;
   };

   /**
    * Initialize the config with values from the server.
    */
   this.initConfig = function (loginResults) {
      defaultRecordLimit = loginResults.DefaultRecordLimit;
      reportRecordLimit = loginResults.ReportRecordLimit;
      lookupMaxResults = loginResults.LookupMaxResults;
      autoCompleteMaxResults = 10; // Note: if a business rule is made for this value, we can use it here
      devMode = !loginResults.Release;
      multiTenant = loginResults.Tenant ? true : false;
      restUrl = loginResults.RestAccessUrl;
      showImages = loginResults.ShowImages;
      suppressBusinessContext = loginResults.SuppressBusinessContext;
      callRetryLimit = loginResults.CallRetryLimit;
      callRetryDelay = loginResults.CallRetryDelay;
      clientIdentifier = (multiTenant ? loginResults.Tenant : '') + loginResults.Cono + loginResults.Oper;
      backendDateFormat = loginResults.DateFormat;

      // Init the values that enable/disable extensions and personalization. Developers can turn these off via the
      // Developer menu for performance gains and to ensure they are testing with the default views.
      extensionsEnabled = localStorage['SXE_ENABLE_EXTENSIONS'] !== 'false';
      personalizationEnabled = localStorage['SXE_ENABLE_PERSONALIZATION'] !== 'false';

      // Enable dev tools if devMode or if a particular session storage value is 'true' (for customization purposes)
      // Note: in the future we can populate this from a saso setting
      devToolsEnabled = devMode || sessionStorage['DEVELOPER'] === 'true';
   };
});
