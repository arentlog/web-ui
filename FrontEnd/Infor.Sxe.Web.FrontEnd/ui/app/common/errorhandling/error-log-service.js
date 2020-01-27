'use strict';

app.factory(
   'errorLogService',
   function( $log, $window, LoggingService) {
         function log( exception, cause ) {
            $log.error.apply( $log, arguments );
            try {
               var errorMessage = exception.toString();
               var loggingError = 'message={' + errorMessage + '}';
               if (exception.stack) {
                  loggingError += ' stack={' + exception.stack + '}';
               }
               LoggingService.logError(loggingError, 'javascripterror');
            } catch ( loggingError ) {
               // For Developers - log the log-failure.
               $log.warn( 'Error logging failed');
            }
         }
         // Return the logging function.
         return( log );
   }
);