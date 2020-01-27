'use strict';

/**
 * Service for reports
 */
app.service('ReportService', function ReportService($translate) {

   var reportTypeList = null; // List of report types (parent of report functions)
   var reportFunctionList = null; // List of report functions


   /* Public API */

   /**
    * Initialize the report data so it's available for quick, easy access
    */
   this.initialize = function (reportSecurityList) {
      reportFunctionList = reportSecurityList;
   };

   /**
    * Get available report types (that the user can see)
    */
   this.getReportTypes = function () {

      // If not yet done, build list of report types (parent of report functions)
      if (!reportTypeList) {
         buildReportTypeList();
      }

      return reportTypeList;
   };

   /**
    * Get list of report functions (that the user can see)
    */
   this.getReportFunctions = function () {
      return reportFunctionList;
   };

   /**
    * Get a specific report function (only if the user can see)
    */
   this.getReportFunction = function (functionName) {
      var i, report;
      var length = reportFunctionList.length;

      for (i = 0; i < length; i++) {
         report = reportFunctionList[i];

         if (report.functionname.toLowerCase() === functionName.toLowerCase()) {
            return report;
         }
      }

      return null;
   };

   /**
    * Check if the given menu function name is a report function
    */
   this.isReportFunction = function (functionName) {
      return functionName && this.getReportFunction(functionName) ? true : false;
   };

   /**
    * Get report functions by criteria
    */
   this.searchReportFunctions = function (reportType, functionName) {
      var list = [];
      var i, report;
      var length = reportFunctionList.length;

      for (i = 0; i < length; i++) {
         report = reportFunctionList[i];

         // Filter by type (if specified)
         if (!reportType || report.parentmenu === reportType) {

            // Filter by function name (if specified)
            if (!functionName || report.functionname.startsWith(functionName)) {

               // Include if passed all criteria
               list.push(report);
            }
         }
      }

      return list;
   };


   // Private methods

   /**
    * Build list of available report types from list of report functions
    */
   function buildReportTypeList() {
      var i, report, type;
      var length = reportFunctionList.length;
      var tempList = [];
      reportTypeList = [];

      for (i = 0; i < length; i++) {
         report = reportFunctionList[i];
         type = report.parentmenu;

         // Add to list (if type not already added)
         if (tempList.indexOf(type) < 0) {
            tempList.push(type);

            // Add objects with type and name (title translation string is based on convention of title.arr-reports)
            reportTypeList.push({
               type: type,
               title: type + ' - ' + $translate.instant('title.' + type + '-reports')
            });
         }
      }
   }

});
