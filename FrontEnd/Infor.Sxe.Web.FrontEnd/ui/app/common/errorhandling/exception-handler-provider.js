'use strict';

app.provider(
   '$exceptionHandler',
   {
      $get: function (errorLogService) {
         return (errorLogService);
      }
   }
);