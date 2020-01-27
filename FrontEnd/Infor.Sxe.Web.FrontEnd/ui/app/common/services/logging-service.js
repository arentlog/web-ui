'use strict';

app.service('LoggingService', function logging(Constants) {

   this.logFatal = function (message, logFunction, callGuid) {
      this.doLogging(message, logFunction, 'fatal', callGuid);
   };

   this.logError = function (message, logFunction, callGuid) {
      this.doLogging(message, logFunction, 'error', callGuid);
   };

   this.logWarn = function (message, logFunction, callGuid) {
      this.doLogging(message, logFunction, 'warn', callGuid);
   };

   this.logInfo = function (message, logFunction, callGuid) {
      this.doLogging(message, logFunction, 'info', callGuid);
   };

   this.logDebug = function (message, logFunction, callGuid) {
      this.doLogging(message, logFunction, 'debug', callGuid);
   };

   this.logTrace = function (message, logFunction, callGuid) {
      this.doLogging(message, logFunction, 'trace', callGuid);
   };

   this.doLogging = function (message, logFunction, type, callGuid) {
      var url = 'api/utilities/logging/log' + type;
      var payLoad = {
         Message: message,
         Function: logFunction
      };
      $.ajax({
         type: 'POST',
         beforeSend: function (request) {
            request.setRequestHeader('Token', sessionStorage[Constants.SESSION_ID_KEY]);
            if (callGuid) {
               request.setRequestHeader('CallGuid', callGuid);
            };
         },
         url: url,
         contentType: 'application/json',
         data: angular.toJson(payLoad)
      });
   };
});