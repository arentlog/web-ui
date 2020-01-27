'use strict';

/**
 * Converters for the EDI module
 */
app.factory('EdiConverters', function EdiConverters($translate) {

   return {

      EDIPOType: { 
         convert: function (value) {
            switch (value.toLowerCase()) {
               case 'a':
                  return $translate.instant('global.non.vmi.acknowledgement');
               case 'v':
                  return $translate.instant('global.vmi.acknowledgement');
               default:
                  return value;
            }
         }
      },

      ETCCApproveType: { 
         convert: function (value) {
            switch (value.toLowerCase()) {
               case 'y':
                  return $translate.instant('global.yes');
               case 'n':
                  return $translate.instant('global.no');
               case 'c':
                  return $translate.instant('global.cancel');
               default:
                  return value;
            }
         }
      },

      ETCCDataSource: { 
         convert: function (value) {
            switch (value.toLowerCase()) {
               case 'orig':
                  return $translate.instant('global.original');
               case 'hist':
                  return $translate.instant('global.historical.data');
               case 'rcvd':
                  return $translate.instant('global.received');
               case 'ovrd':
                  return $translate.instant('global.override.data');
               default:
                  return value;
            }
         }
      },

      ETCCDocStatus: {
         convert: function (value) {
            switch (value.toLowerCase()) {
               case 'prc':
                  return $translate.instant('global.processed');
               case 'err':
                  return $translate.instant('global.error');
               case 'wip':
                  return $translate.instant('global.wip');
               default:
                  return value;
            }
         }
      },
           
      ETCCErrorType: { 
         convert: function (value) {
            switch (value.toLowerCase()) {
               case 'e':
                  return $translate.instant('global.error');
               case 'x':
                  return $translate.instant('global.exception');
               case 'i':
                  return $translate.instant('global.informational');
               default:
                  return value;
            }
         }
      },

      ETCCStage: { 
         convert: function (value) {
            switch (value.toLowerCase()) {
               case 'rcvd':
                  return $translate.instant('global.received');
               case 'wip':
                  return $translate.instant('global.wip');
               case 'pass':
                  return $translate.instant('global.pass');
               case 'cmplt':
                  return $translate.instant('global.complete');
               case 'canc':
                  return $translate.instant('global.cancelled');
               default:
                  return value;
            }
         }
      },

      ETCCUpdateStatus: { 
         convert: function (value) {
            switch (value.toLowerCase()) {              
               case 'err':
                  return $translate.instant('global.error');
               case 'exc':
                  return $translate.instant('global.exception');
               case 'wip':
                  return $translate.instant('global.wip');
               case 'can':
                  return $translate.instant('global.cancelled');
               case 'upd':
                  return $translate.instant('global.updated');
               case 'cmp':
                  return $translate.instant('global.complete');
               default:
                  return value;
            }
         }
      },

      TransSetPurposeCd: {
         convert: function (value) {
            switch (value.toLowerCase()) {
               case '00':
                  return $translate.instant('global.original');
               case '04':
                  return $translate.instant('global.subsequent');               
               default:
                  return value;
            }
         }
      },

      VendorUserTypeToName: {
         convert: function (value) {
            switch (value) {
               case 'cl':
                  return $translate.instant('global.customer.list');
               case 'cr':
                  return $translate.instant('global.customer.rebate');
               case 'ct':
                  return $translate.instant('global.customer.type');
               case 'w':
                  return $translate.instant('global.warehouse');
               default:
                  return value;
            }
         }
      }
   };
});
