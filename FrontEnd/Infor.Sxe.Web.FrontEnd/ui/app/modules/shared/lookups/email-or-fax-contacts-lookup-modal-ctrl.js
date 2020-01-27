'use strict';

/**
 * Modal content for the Email or Fax Contacts lookup.
 *
 * Alias: lkupmdl
 */
app.controller('EmailOrFaxContactsLookupModalCtrl', function ($scope, DataService, Utils) {
   var self = this;
   var lkup = $scope.lkup;

   self.SUBJECTTYPE_ALL = '';
   self.SUBJECTTYPE_ARSC = 'arsc';
   self.SUBJECTTYPE_ARSS = 'arss';
   self.SUBJECTTYPE_APSV = 'apsv';
   self.SUBJECTTYPE_APSS = 'apss';

   self.subjectType = '';
   self.custno = 0;
   self.shipto = '';
   self.vendno = 0;
   self.shipfmno = 0;

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();

      if (!isClear) {
         var searchParamValueField = lkup.options.searchParamValueField;
         var value = lkup.getInitialSearchValue();

         // Populate search field with initial value (from user typing into lookup field)
         if (searchParamValueField && (value || value === 0)) {
            Utils.setNestedValue(self.criteria, searchParamValueField, value);
         }
      }
   };

   // Perform reset/clear
   self.clear = function () {
      self.initializeCriteria(true);
   };

   // Perform search
   self.search = function () {

      self.criteria.subjectroletype = self.subjectType;

      switch (self.subjectType) {
         case self.SUBJECTTYPE_ARSC:
            self.criteria.subjectprimarykey = self.custno ? self.custno.toString() : '0';
            self.criteria.subjectsecondarykey = '';
            break;
         case self.SUBJECTTYPE_ARSS:
            self.criteria.subjectprimarykey = self.custno ? self.custno.toString() : '0';
            self.criteria.subjectsecondarykey = self.shipto;
            break;
         case self.SUBJECTTYPE_APSV:
            self.criteria.subjectprimarykey = self.vendno ? self.vendno.toString() : '0';
            self.criteria.subjectsecondarykey = '';
            break;
         case self.SUBJECTTYPE_APSS:
            self.criteria.subjectprimarykey = self.vendno ? self.vendno.toString() : '0';
            self.criteria.subjectsecondarykey = self.shipfmno ? self.shipfmno.toString() : '0';
            break;
         default:
            //Wide-open search
            self.criteria.subjectroletype = '';
            self.criteria.subjectprimarykey = '';
            self.criteria.subjectsecondarykey = '';
      }

      lkup.search(self.criteria, self.searchTerm, function (results) {
         self.dataset = results;
      });
   };

   self.isCustomerVisible = function () {
      var retn = false;
      if (self.subjectType === self.SUBJECTTYPE_ARSC || self.subjectType === self.SUBJECTTYPE_ARSS) {
         retn = true;
      }

      return retn;
   };

   self.isShiptoVisible = function () {
      var retn = false;
      if (self.subjectType === self.SUBJECTTYPE_ARSS) {
         retn = true;
      }

      return retn;
   };

   self.isVendorVisible = function () {
      var retn = false;
      if (self.subjectType === self.SUBJECTTYPE_APSV || self.subjectType === self.SUBJECTTYPE_APSS) {
         retn = true;
      }

      return retn;
   };

   self.isShipfromVisible = function () {
      var retn = false;
      if (self.subjectType === self.SUBJECTTYPE_APSS) {
         retn = true;
      }

      return retn;
   };

   self.subjectTypeChanged = function () {
      self.isCustomerVisible();
      self.isShiptoVisible();
      self.isVendorVisible();
      self.isShipfromVisible();
   };

   // Initialize
   self.initializeCriteria(false);
});
