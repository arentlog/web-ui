'use strict';

/**
 * Service for user security/permissions
 */
app.service('SecurityService', function SecurityService() {

   // Map of security levels by menu function
   var menuSecurityMap = {};
   var subMenuFunctionSecurityMap = {};

   /* Public API */

   /**
   * Initialize the security data so it's available for quick, easy access
   */
   this.initialize = function (topLevelList, reportSecurityList) {
      // populate menuSecurityMap with data
      menuSecurityMap = getMenuFunctionList(topLevelList, reportSecurityList);
   };

   /**
    * Get the security level of a menu function
    */
   this.getSecurityLevel = function (menuFn) {
      // Get security level based on menu Function passed in,
      // the menuSecurityMap is built from the BuildMegaMenu method
      var securityLevel = menuSecurityMap[menuFn];

      return securityLevel ? securityLevel : 0;
   };

   /**
    * Get the sub security level of a menu function
    */
   this.getSubSecurityLevel = function (menuFn, subMenuFn) {
      // Get security level based on menu Function passed in,
      // the menuSecurityMap is built from the BuildMegaMenu method
      var securityLevel = subMenuFunctionSecurityMap[menuFn + '_' + subMenuFn];

      return securityLevel ? securityLevel : 0;
   };

   /**
    * Get sub function display list for wysiwyg
    */
   this.getSubFunctions = function() {
      var list = [];

      // Create a list of items to be used in auto-complete control in the wysiwyg
      for (var prop in subMenuFunctionSecurityMap) {
         if (subMenuFunctionSecurityMap.hasOwnProperty(prop)) {
            var split = prop.split('_');
            var item = {
               label: split[0] + ': ' + split[1],
               value: split[1]
            };

            list.push(item);
         }
      }

      return list;
   };

   /* Private methods */

   var getMenuFunctionList = function(topLevelList, reportSecurityList) {
      var map = {};
      var i, length;

      // Go through each Module topLevel->secondLevel-> then get each menu function and build a Map
      topLevelList.forEach(function (top) {
         if (top.SecondLevelMenus.length > 0) {
            top.SecondLevelMenus.forEach(function (second) {
               if (second.MenuFunctions.length > 0) {
                  second.MenuFunctions.forEach(function (menuFunction) {
                     // Map Key: Menu Function Name Value: Menu Function Security Level
                     map[menuFunction.functionname] = menuFunction.securitylevel;

                     if (menuFunction.subsecuritylevels) {
                        var subs = menuFunction.subsecuritylevels.split(',');

                        if (subs.length > 0) {
                           subs.forEach(function(sub) {
                              var sublist = sub.split('=');
                              if (sublist.length > 0) {
                                 subMenuFunctionSecurityMap[menuFunction.functionname + '_' + sublist[0]] = parseInt(sublist[1]);
                              }
                           });
                        }
                     }
                  });
               } else if (second.moduleresource.startsWith('Functional')) {
                  map[second.functionname] = second.securitylevel;
                  // No tabs yet
               }
            });
         } else {
            // top levels that don't have 2nd levels (like search) need added
            map[top.functionname] = top.securitylevel;
         }
      });

      // Add all the report menu functions
      length = reportSecurityList.length;
      for (i = 0; i < length; i++) {
         var menuFunction = reportSecurityList[i];
         map[menuFunction.functionname] = menuFunction.securitylevel;
      }

      return map;
   };
});
