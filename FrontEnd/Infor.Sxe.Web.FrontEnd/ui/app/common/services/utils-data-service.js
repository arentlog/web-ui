'use strict';

// This is a catch all service for data base utilities.
// Primary use is to facilitate code re-use and optimization

app.service('UtilsData', function UtilsData(DataService, MessageService, UserService, AodataService) {
   var self = this;

   self.getSastnDescriptionSpecial = function (codeIden, toSearchFor, callback) {

      var firstChar = toSearchFor.substring(0, 1);

      // If the user entered a '.' or '#', execute the shortcut to the SASTT reference
      if (firstChar === '.' || firstChar === '#') {

         var referenceValue = toSearchFor.substring(1);
         referenceValue = referenceValue.trim();
         var intValue = parseInt(referenceValue, 10);
         if (intValue > 0) {
            self.getSastnDescripSingle(codeIden, intValue, function(descrip) {
               callback(descrip);
            });
         } else {
            // Value is not numeric
            MessageService.error('global.error', 'error.reference.must.be.numeric');
         }
      }
   };

   self.getSastnDescripSingle = function (codeIden, toSearchFor, callback) {

      var lookupCriteria = {
         codeiden: codeIden,
         codeval: toSearchFor,
         fldlist: 'descrip',
         batchsize: 1
      };

      DataService.post('api/sa/sastn/getsastnlist', { data: lookupCriteria, busy: true }, function (data) {
         if (data.length > 0) {
            callback(data[0].descrip);
         } else {
            // Did not find reference
            MessageService.error('global.error', 'error.reference.not.set.up.in.system.table');
         }
      });
   };

   self.getDivNoDropDown = function (module, callback) {

      var crit = {
         module: module
      };

      DataService.post('/web/api/shared/getdivnolist', { data: crit, busy: true }, function (data) {
         if (data) {
            var divnoDropDownOptions = [];

            if (data.ttbltablecodenumeric) {
               divnoDropDownOptions = [];              
               var fldListBuilt = [];
               data.ttbltablecodenumeric.forEach(function (record) {
                  var obj = {
                     label: record.descrip,
                     type: 'OPT',
                     value: record.codeval
                  };
                  fldListBuilt.push(obj);                 
               });
               divnoDropDownOptions = fldListBuilt;

               callback(divnoDropDownOptions);
            }
         }
      });
   };

   self.getBankNoDropDown = function (callback) {

      var crit = {
         module: "cr"
      };

      DataService.post('/web/api/shared/getbanknolist', { data: crit, busy: true }, function (data) {
         if (data) {
            var divnoDropDownOptions = [];

            if (data.ttbltablecodenumeric) {
               divnoDropDownOptions = [];
               var fldListBuilt = [];
               data.ttbltablecodenumeric.forEach(function (record) {
                  var obj = {
                     label: record.descrip,
                     type: 'OPT',
                     value: record.codeval
                  };
                  fldListBuilt.push(obj);
               });
               divnoDropDownOptions = fldListBuilt;

               callback(divnoDropDownOptions);
            }
         }
      });
   };

   self.getPettyCashTypesDropDown = function (callback) {

      var crit = {
         iCodeVal: 0
      };

      DataService.post('/web/api/sa/sastnlookuppettycash', { data: crit, busy: true }, function (data) {
         if (data) {
            var pettyCashDropDownOptions = [];
            var pettyCashTypesDefinedAsIncoming = [];

            if (data.ttbllookuppettycashresults) {
               pettyCashDropDownOptions = [];
               var fldListBuilt = [];
               var fldListOfIncomingTypes = [];
               data.ttbllookuppettycashresults.forEach(function (record) {
                  var obj = {
                     label: record.descrip,
                     type: 'OPT',
                     value: record.codeval
                  };
                  fldListBuilt.push(obj);

                  //Build a collection of the Petty Cash Types that are marked as a direction of "In".
                  //The UI can then present additional information if the user selects this type (vs
                  //an "Out" type.  (i.e. a Deposit is an "In" but an expense would be an "Out")).
                  if (record.inoutfl) {
                     fldListOfIncomingTypes.push(record.codeval);
                  }
               });
               pettyCashDropDownOptions = fldListBuilt;
               pettyCashTypesDefinedAsIncoming = fldListOfIncomingTypes;

               callback(pettyCashDropDownOptions, pettyCashTypesDefinedAsIncoming);
            }
         }
      });
   };

   //Get the SASSE Error message from the database.  These error messages are
   //used throughout the GUI and the appserver calls.  Based on the locale,
   //this will also return the message in the right language, be it:
   //English, Spanish, or French.
   //The user can call this and use the message in a popup or toaster
   //message by combining this with calls in the MessageService.
   self.getSasseErrorMessage = function (errorno, callback) {
      var locale = UserService.getLocale();
      var trmgrlang = '';
      switch (locale) {
         case 'en-US':
         case 'en-GB':
            trmgrlang = '';
            break;
         case 'es-MX':
            trmgrlang = 'es';
            break;
         case 'fr-CA':
            trmgrlang = 'french';
            break;
      }

      if (errorno) {
         var params = {
            errorno: errorno,
            trmgrlang: trmgrlang,
            fldlist: 'errormsg'
         };
         DataService.get('api/sa/sasse/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               callback(data.errormsg);
            }
         });
      }
   };

   self.getNameAddressMaxLength = function () {
      var maxLength = 30;

      var aoTurnedOn = AodataService.getValue("SA", "SAAllowExpandedNameAddress").toLowerCase() === 'yes';
      if (aoTurnedOn) {
         maxLength = 60;
      }

      return maxLength;
   };
});