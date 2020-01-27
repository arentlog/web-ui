'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('JobGroupLookupModalCtrl', function ($scope, $translate, Utils) {
   var self = this;
   var lkup = $scope.lkup;
   self.dateToday = new Date();

   // Initialize modal criteria
   self.initializeCriteria = function () {
      self.criteria = {
         groupnm: '',
         runty: 'Z',
         fromhour: 12,
         fromminute: 0,
         fromampm: 'AM',
         tohour: 11,
         tominute: 59,
         toampm: 'PM',
         fromtime: '00:00',
         totime: '23:59'
      };
   };

   // Perform reset/clear
   self.clear = function () {
      self.initializeCriteria(true);
   };

   // Perform search
   self.search = function () {
      var startTime = Utils.getTimePieces(self.criteria.fromtime);
      var endTime = Utils.getTimePieces(self.criteria.totime);

      self.criteria.fromhour = startTime.hour;
      self.criteria.fromminute = startTime.min;
      self.criteria.fromampm = startTime.ampm.toUpperCase();

      self.criteria.tohour = endTime.hour;
      self.criteria.tominute = endTime.min;
      self.criteria.toampm = endTime.ampm.toUpperCase();

      lkup.search(self.criteria, self.searchTerm, function (results) {
         self.dataset = results;
      });
   };

   // Initialize
   self.initializeCriteria(false);
});
