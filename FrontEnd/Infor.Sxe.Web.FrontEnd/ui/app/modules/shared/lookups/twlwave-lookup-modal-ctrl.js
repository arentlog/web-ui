'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('TWLWaveLookupModalCtrl', function ($scope, DataService, GridService, MessageService, Utils) {
   var self = this;
   var lkup = $scope.lkup;

   self.comparisonTypes = [
      { label: MessageService.get('>='), value: '>=' },
      { label: MessageService.get('='), value: '=' }
   ];

   self.waveStatusTypes = [
      { label: MessageService.get('global.all'), value: '' },
      { label: MessageService.get('global.open'), value: 'Open' },
      { label: MessageService.get('global.active'), value: 'Active' },
      { label: MessageService.get('global.not.finished'), value: 'Unfinished' },
      { label: MessageService.get('global.complete'), value: 'Complete' }
   ];

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();

      //self.criteria.dropDateToDisplay = new Date();
      //self.criteria.dropDateFromDisplay = self.criteria.dropDateToDisplay - 7;

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

      var completeString = MessageService.get('global.complete');
      var activeString = MessageService.get('global.active');
      var openString = MessageService.get('global.open');
      var dateTo = new Date(self.criteria.dropDateToDisplay);
      var dateFrom = new Date(self.criteria.dropDateFromDisplay);

      // drop_date is YYYYMMDDHHMM format in TWL
      self.criteria.dropDateFrom = self.criteria.dropDateFromDisplay ?
         dateFrom.getFullYear() +
         ('0' + dateFrom.getMonth()).slice(-2) +
         ('0' + dateFrom.getDate()).slice(-2) + '9999' :
         '';
      self.criteria.dropDateTo = self.criteria.dropDateToDisplay ?
         dateTo.getFullYear() +
         ('0' + dateTo.getMonth()).slice(-2) +
         ('0' + dateTo.getDate()).slice(-2) + '0000' :
         '';
      lkup.search(self.criteria, self.searchTerm, function (results) {
         results.forEach(function (result) {
            result.calculatedStatus = result.shipDateTime ? completeString : (result.activeDateTime ? activeString : openString);
         });
         self.dataset = results;
      });
   };

   // Initialize
   self.initializeCriteria(false);
});
