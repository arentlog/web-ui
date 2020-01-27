'use strict';

app.controller('PdspPriceSheetCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService) {
   // alias => psht
   var self = this;
   var base = $scope.base;
   self.pdsps = {};

   //Set local pdsr record
   self.loadRecord = function () {

      var priceSheetData = {
         prod: $stateParams.stateObject.prod,
         whse: $stateParams.stateObject.whse,
         pricesheet: $stateParams.stateObject.pricesheet,
         effectivedt: $stateParams.stateObject.effectivedt
      };

      DataService.post('api/pd/aspdsetup/pricesheetdata', { data: priceSheetData, busy: true }, function (data) {
         if (data) {
            self.pdsps = data[0];

            self.columnMatrix = [
               { seqno: MessageService.get('number.1'), custmatrix: self.pdsps.custmatrix1, vendmatrix: self.pdsps.vendmatrix1 },
               { seqno: MessageService.get('number.2'), custmatrix: self.pdsps.custmatrix2, vendmatrix: self.pdsps.vendmatrix2 },
               { seqno: MessageService.get('number.3'), custmatrix: self.pdsps.custmatrix3, vendmatrix: self.pdsps.vendmatrix3 },
               { seqno: MessageService.get('number.4'), custmatrix: self.pdsps.custmatrix4, vendmatrix: self.pdsps.vendmatrix4 },
               { seqno: MessageService.get('number.5'), custmatrix: self.pdsps.custmatrix5, vendmatrix: self.pdsps.vendmatrix5 },
               { seqno: MessageService.get('number.6'), custmatrix: self.pdsps.custmatrix6, vendmatrix: self.pdsps.vendmatrix6 },
               { seqno: MessageService.get('number.7'), custmatrix: self.pdsps.custmatrix7, vendmatrix: self.pdsps.vendmatrix7 },
               { seqno: MessageService.get('number.8'), custmatrix: self.pdsps.custmatrix8, vendmatrix: self.pdsps.vendmatrix8 },
               { seqno: MessageService.get('number.9'), custmatrix: self.pdsps.custmatrix9, vendmatrix: self.pdsps.vendmatrix9 }
            ];
         }
      });

   };

   self.loadRecord();

   self.getSubTitle = function () {
      return self.pdsps.msg;
   };

   self.priceSheetVisibility = function (fieldType) {

      if (fieldType === 'cost') {
         return base.seecostfl;
      } else if (fieldType === 'price') {
         if (base.oepricefl.toLowerCase() === 'n') {
            return false;
         } else {
            return true;
         }
      } else {
         return false;
      }
   };

   self.back = function () {
      $state.go($stateParams.stateObject.returnState);
   };

});