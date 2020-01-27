'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('QueuesLookupModalCtrl', function ($scope, Utils, DataService) {
   var self = this;
   var lkup = $scope.lkup;

   // Initialize modal criteria
   self.initializeCriteria = function () {
      self.criteria = {
         cfmam: 'AM',
         ctoam: 'PM',
         ifmhour: 12,
         ifmmin: 0,
         itohour: 23,
         itomin: 59,
         priority: 0,
         qstatus: '1',
         queuenm: '',
         starttm: '00:00',
         endtm: '23:59'
      };
   };
   DataService.get('/web/api/shared/TZRetrieveServer', { data: self, busy: true }, function (data) {
      if (data) {
         self.servertz = data.TimeZone * -1;         
      }
   });

   // Load System data
   DataService.get('api/shared/assharedentry/aosystemload', { busy: true }, function (data) {
      if (data) {
         self.enableDST = data.lDSTEnableFl;
      }
   });

   // Perform search
   self.search = function () {
      var startTime = Utils.getTimePieces(self.criteria.starttm);
      var endTime = Utils.getTimePieces(self.criteria.endtm);

      self.criteria.ifmhour = startTime.hour;
      self.criteria.ifmmin = startTime.min;
      self.criteria.cfmam = startTime.ampm.toUpperCase();

      self.criteria.itohour = endTime.hour;
      self.criteria.itomin = endTime.min;
      self.criteria.ctoam = endTime.ampm.toUpperCase();

      self.dateToday = new Date();
      self.clienttz = self.dateToday.getTimezoneOffset();

      if (self.clienttz !== self.servertz &&
         (self.criteria.ifmhour !== 12 || self.criteria.itohour !== 11 || self.criteria.cfmam !== 'AM' || self.criteria.ctoam !== 'PM')) {
         var offsetChange = (self.clienttz - self.servertz) / 60;
         if (self.enableDST) {
            offsetChange = offsetChange - 1;
         }
         self.criteria.ifmhour = self.criteria.ifmhour + offsetChange;
         self.criteria.itohour = self.criteria.itohour + offsetChange;
         if (self.criteria.ifmhour < 0) {
            self.criteria.ifmhour = self.criteria.ifmhour + 12;
            self.criteria.cfmam = 'PM';
         }
         if (self.criteria.itohour < 0) {
            self.criteria.itohour = self.criteria.itohour + 12;
            self.criteria.ctoam = 'PM';
         }
         if (self.criteria.ifmhour > 12) {
            self.criteria.ifmhour = self.criteria.ifmhour - 12;
            if (self.criteria.cfmam === 'AM') {
               self.criteria.cfmam = 'PM';
            } else {
               self.criteria.cfmam = 'AM';
            }
         }
         if (self.criteria.itohour > 12) {
            self.criteria.itohour = self.criteria.itohour - 12;
            if (self.criteria.ctoam === 'AM') {
               self.criteria.ctoam = 'PM';
            } else {
               self.criteria.ctoam = 'AM';
            }
         }
      }

      lkup.search(self.criteria, self.searchTerm, function (results) {

         // adjust time display based on client/server timezone differences
         if (self.clienttz !== self.servertz) {
            var offsetChange = (self.servertz - self.clienttz) / 60;
            if (self.enableDST) {
               offsetChange = offsetChange - 1;
            }
            results.forEach(function (row) {

               var tmpHour = row.begintm.substr(0, 2);
               if (tmpHour.substr(2, 1) === ":") {
                  tmpHour = tmpHour.substr(1, 1);
               }

               var decHour = parseFloat(tmpHour);
               decHour = decHour + offsetChange;
               if (decHour > 24) {
                  decHour = decHour - 24;
               }
               if (decHour < 0) {
                  decHour = decHour + 24;
               }
               tmpHour = decHour.toString();
               tmpHour = Utils.pad(tmpHour, 2);
               row.begintm = tmpHour + row.begintm.substr(2);

               tmpHour = row.endtm.substr(0, 2);
               if (tmpHour.substr(2, 1) === ":") {
                  tmpHour = tmpHour.substr(1, 1);
               }

               decHour = parseFloat(tmpHour);
               decHour = decHour + offsetChange;
               if (decHour > 24) {
                  decHour = decHour - 24;
               }
               if (decHour < 0) {
                  decHour = decHour + 24;
               }
               tmpHour = decHour.toString();
               tmpHour = Utils.pad(tmpHour, 2);
               row.endtm = tmpHour + row.endtm.substr(2);
            });

            self.dataset = results;
         } else {
            self.dataset = results;
         }
      });
      
   };

   // Perform reset/clear
   self.clear = function () {
      self.initializeCriteria();
   };

   self.initializeCriteria();

});