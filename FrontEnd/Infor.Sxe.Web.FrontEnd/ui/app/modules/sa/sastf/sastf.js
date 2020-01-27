'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sastf',
      dataPath: 'api/sa/sastf',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/sastfsearch',
      searchResultsField: '',
      resultsRowIdField: 'sastfrowid',
      recentlyVisited: null
   });
});

app.service('SastfService', function ($translate, $state, DataService) {
   this.extendSearchController = function (self, base) {
      // If the Type changes - clear all values
      base.setBillingType = function () {
         base.criteria.whse = '';
      };
   };
   this.extendCreateController = function (self, base, sastf) {
      sastf.billlevelcd = 'a';
      sastf.srcrowpointer = '';

      // If the Type changes - clear all values
      self.setBillingType = function () {
         self.sastf.whse = '';
         self.sastf.srcrowpointer = '';
      };

      self.whseEntered = function () {
         // Get srcrowpointer
         var whseData = {
            billlevelcd: 'w',
            whse: sastf.whse,
            carrierid: ''
         };
         DataService.post('api/sa/assasetup/sastfleavefield', {
            data: {
               cFieldName: 'whse',
               sastfsingle: whseData
            },
            busy: true
         }, function (data) {
            if (data) {
               sastf.srcrowpointer = data.srcrowpointer;
            }
         });
      };

      self.custEntered = function () {
         // Get srcrowpointer
         var custData = {
            billlevelcd: 'c',
            custno: sastf.custno,
            carrierid: ''
         };
         DataService.post('api/sa/assasetup/sastfleavefield', {
            data: {
               cFieldName: 'custno',
               sastfsingle: custData
            },
            busy: true
         }, function (data) {
            if (data) {
               sastf.srcrowpointer = data.srcrowpointer;
            }
         });
      };

      self.shiptoEntered = function () {
         // Get srcrowpointer
         var shiptoData = {
            billlevelcd: 's',
            custno: sastf.custno,
            shipto: sastf.shipto,
            carrierid: ''
         };
         DataService.post('api/sa/assasetup/sastfleavefield', {
            data: {
               cFieldName: 'shipto',
               sastfsingle: shiptoData
            },
            busy: true
         }, function (data) {
            if (data) {
               sastf.srcrowpointer = data.srcrowpointer;
            }
         });
      };
   };

   this.extendDetailController = function (self, base, sastf) {
      sastf.$promise.then(function () {
         //SI call to load the details
         if (sastf.billlevelcd === 'w' || sastf.billlevelcd === 'c' || sastf.billlevelcd === 's') {
            var detailCriteria = {
               sastfrowid: sastf.rowID
            };
            DataService.post('api/sa/assasetup/sastfgetdetail', { data: detailCriteria, busy: true }, function (data) {
               if (data) {
                  sastf.whse = data.whse;
                  sastf.custno = data.custno;
                  sastf.shipto = data.shipto;
               }
            });
         }
      });
      self.getSubTitle = function () {
         var subTitleText;
         if (self.sastf.billlevelcd === 'w') {
            subTitleText = $translate.instant('global.warehouse') + ': ' + self.sastf.whse + ' | ' +
               self.sastf.carrierid;
         }
         else if (self.sastf.billlevelcd === 'c') {
            subTitleText = $translate.instant('global.customer') + ': ' + self.sastf.customer + ' | ' +
               self.sastf.carrierid;
         } 
         else if (self.sastf.billlevelcd === 's') {
               subTitleText = $translate.instant('global.shipto') + ': ' + self.sastf.shipto + ' | ' +
                  self.sastf.carrierid;
            } else {
               subTitleText = $translate.instant('global.all') + ' | ' + self.sastf.carrierid;
            }
            return subTitleText;
         };
      };
   });