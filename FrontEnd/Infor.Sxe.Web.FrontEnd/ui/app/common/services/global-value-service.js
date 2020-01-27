'use strict';

/**
 * Service for storing session values that are modifyable by the user but should only be
 * available while they are logged in. (i.e. key: "Global.AutoPrint" value: true).
 * Naming Convention: Please use a prefix as to where this is used.  In this example, this particular
 * option is used across the document entries.  If another option was function specific, you would
 * reference the function name (i.e. "Arsc.Something").
 * NOTE:  This is a Singleton, so the lifetime is for the session while the user is logged in.  It
 * will clear when they log out.
 * WARNING:  Do not use this for other catch-all purposes.  ConfigService and Constants may be
 * better suited for other purposes.  This GlobalValueService is the exception, not the rule.
 * TIP:  We'll generally store particular values on 'base' within a specific function.  This is used when
 * we want a value to be available even after the specific function has closed (i.e. OEET, POET, WTET
 * has an example.)
 * Note to Customization/Extensions: If using this pattern for Extensions, make sure to reference your
 * Key value as "Custom.Something" or "Z.Something" so it doesn't conflict with future standard
 * features.
 */
app.service('GlobalValueService', function GlobalValueService() {
   var self = this;

   //Map to hold the Global Values.
   var valueMap = {};

   /* Public methods */
   self.get = function (key) {
      return valueMap[key];
   };

   self.set = function (key, value) {
      valueMap[key] = value;
   };

});
