'use strict';

/**
 * Control for displaying address contacts information fields.
 *
 * This control relies on the calling controller to build out the 'paramData' and pass it into here
 * via the Initialize function.  This only gets called after the control itself is initialized and "ready".
 *
 * At design time, if you are displaying multiple Address Contact information (ie. Vendor, ShipTo, etc),
 * make sure they are named uniquely (i.e. vendorContactsControl, shipToContactsControl, etc. for example).
 *
 * This should be used anywhere in the software we make a backend call to: 'getaddresscontact' to getdata.
 * Every place should funnel to this one control.
 */
app.controller('AddressContactsInfoCtrl', function ($scope, $translate, Utils, DataService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.options = options;
   self.type = options.type;
   self.tableName = options.tableName;
   self.addressContacts = {};

   //This gets called from the calling Controller only after the Control has been Initialized (i.e. 'Ready').
   self.initialize = function (paramData) {
      var getAddressContactCriteria = {
         paramdata: paramData,
         tablename: self.tableName,
         type: self.type,
         updatefl: false
      };
      DataService.post('api/shared/assharedinquiry/getaddresscontact', { data: getAddressContactCriteria, busy: true }, function (data) {
         if (data) {
            self.addressContacts = data;
         }
      });
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});
