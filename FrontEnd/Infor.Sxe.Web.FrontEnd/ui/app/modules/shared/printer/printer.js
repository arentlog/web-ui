'use strict';

app.controller('PrinterCtrl', function ($scope, $state, $translate, DataService, MessageService, Sasoo, Utils, Sasc) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.printTypeOptions = [];
   self.ackPrinterlabel = '';
   self.sasc = Sasc;
   self.defaultPrinter = '';

   // If option is set to use printer from a warehouse, then watch the warehouse reference and update the printer when value changes
   self.watchPrintWarehouse = function () {
      if (options.printWarehouse) {
         $scope.$watch(options.printWarehouse, function (newValue, oldValue) {
            if (newValue) {
               if (self.printerSettings.printtype.toLowerCase() === 'p') {
                  self.getDefaultIcsdPrinter();
               }
            }
         });
      }
   };

   //set the default printer from SASO or from ICSD if available
   self.getDefaultIcsdPrinter = function () {
      var printer = Sasoo.printernm;

      // For POET menu the default printer name should pick from SASO -> DefaultFormPrinter value
      if (options && options.functionName.toLowerCase() === 'poet') {
         printer = Sasoo.formprinternm;
      }
      if (self.printerSettings && self.printerSettings.defaultPrinter && self.printerSettings.defaultPrinter.trim() !== '') {
         printer = self.printerSettings.defaultPrinter;
      }
      if (options.printWarehouse) {
         var printerWhse = Utils.getNestedValue($scope, options.printWarehouse);
         DataService.get('api/ic/icsd/getbypk', { params: { whse: printerWhse } }, function (data) {
            if (data) {
               if (options.functionName.toLowerCase() === 'wtia' && data.printernm1.trim() !== '') {
                  printer = data.printernm1;
               } else if (options.functionName.toLowerCase() === 'wtet' && data.printernm1.trim() !== '') {
                  printer = data.printernm1;
               } else {
                  if (options.functionName.toLowerCase() === 'poet' && data.printernm4.trim() !== '') {
                     printer = data.printernm4;
                  }
                  if (options.subFunctionName.toLowerCase() === 'acknowledgement' && data.printernm3.trim() !== '') {
                     printer = data.printernm3;
                  }
                  if (options.subFunctionName.toLowerCase() === 'pick ticket' && data.printernm1.trim() !== '') {
                     printer = data.printernm1;
                  }
                  if (options.subFunctionName.toLowerCase() === 'invoice' && data.printernm2.trim() !== '') {
                     printer = data.printernm2;
                  }
                  if (options.subFunctionName.toLowerCase() === 'delivery document' && data.dlvprinternm.trim() !== '') {
                     printer = data.dlvprinternm;
                  }
               }

               //User Hook (do not rename)
               if (self.getDefaultIcsdPrinterContinue) {
                  printer = self.getDefaultIcsdPrinterContinue(printer);
               }
            }
            self.printerSettings.printernm = printer;
         });
      } else {
         self.printerSettings.printernm = printer;
      }

   };

   self.setPrintOptionsFlagVisibility = function () {
      if (options.functionName.toLowerCase() === 'oeet' || options.functionName.toLowerCase() === 'poet' || options.functionName.toLowerCase() === 'wtet') {
         self.isPrinterOptionsFlagVisible = false;
      } else {
         self.isPrinterOptionsFlagVisible = true;
      }
   };

   self.printerTypeChange = function (selectedValue) {
      // On a stored report switch back to the original printer if the type is changed back to the original type
      if (self.printerSettings.storedReportName && self.printerSettings.defaultStoredType.toLowerCase() === selectedValue.toLowerCase()) {
         self.printerSettings.printernm = self.printerSettings.defaultStoredPrinter;
      }
      else if (selectedValue.toLowerCase() === 'p') {
         self.getDefaultIcsdPrinter(); //set the default printer from SASO or ICSD
      }
      else if (selectedValue.toLowerCase() === 'r' || selectedValue.toLowerCase() === 'd') {
         self.printerSettings.printernm = '';
      }
      else if (selectedValue.toLowerCase() === 'e') {
         self.printerSettings.printernm = 'E-MAIL';
      }
      else if (selectedValue.toLowerCase() === 'f') {
         if (!self.printerSettings.faxpriority) {
            self.printerSettings.faxpriority = 'n';
         }
         if (options.functionName.toLowerCase() === 'poet') {
            self.printerSettings.printernm = self.sasc.oifaxdev1;
         } else if (options.functionName.toLowerCase() === 'oeet' && self.printerSettings.printerinstance) {
            if (self.printerSettings.printerinstance.toLowerCase() === 'acknowledgement') {
               self.printerSettings.printernm = self.sasc.oifaxdev2;
            } else if (self.printerSettings.printerinstance.toLowerCase() === 'invoice') {
               self.printerSettings.printernm = self.sasc.oifaxdev3;
            } else if (self.printerSettings.printerinstance.toLowerCase() === 'receipt') {
               self.printerSettings.printernm = self.dataset[0].printernm;
            }
         }
         else {
            self.printerSettings.printernm = self.dataset ? self.dataset[0].printernm : null;
         }
      }

      switch (selectedValue) {
         case 'f':
            self.ackPrinterlabel = $translate.instant('global.fax');
            break;
         case 'o':
            self.ackPrinterlabel = $translate.instant('global.file.name');
            break;
         case 'e':
            self.ackPrinterlabel = $translate.instant('global.email.address');
            break;
         case 'r':
            self.ackPrinterlabel = $translate.instant('global.receipt');
            break;
         case 'd':
            self.ackPrinterlabel = $translate.instant('global.device');
            break;
         default:
            self.ackPrinterlabel = $translate.instant('global.printer.name');
      }

   };

   // First, try to get printerSettings from model reference
   // Note: the 'printerSettingsModel' option can be used when we need to allow the user to edit printer settings,
   //       navigate to other screens, and come back without re-initializing and stomping on the settings changes
   if (options.printerSettingsModel) {
      self.printerSettings = Utils.getNestedValue($scope, options.printerSettingsModel);

      self.setPrintOptionsFlagVisibility();
   }

   self.buildPrintTypeDropDown = function (types) {
      self.printTypeOptions = [];
      var fldListBuilt = [];
      var dropDownChoices = types.split(',');
      var fldListLen = dropDownChoices.length;
      for (var i = 0; i < fldListLen; i++) {
         if (dropDownChoices[i]) {
            var singleChoice = dropDownChoices[i];
            var singleChoiceDesc = '';

            if (singleChoice.toLowerCase() === 'p') {
               singleChoiceDesc = MessageService.get('global.print')
            } else if (singleChoice.toLowerCase() === 'f') {
               singleChoiceDesc = MessageService.get('global.fax')
            } else if (singleChoice.toLowerCase() === 'o') {
               singleChoiceDesc = MessageService.get('global.file')
            } else if (singleChoice.toLowerCase() === 'e') {
               singleChoiceDesc = MessageService.get('global.email')
            } else if (singleChoice.toLowerCase() === 'r') {
               singleChoiceDesc = MessageService.get('global.receipt')
            } else if (singleChoice.toLowerCase() === 'd') {
               singleChoiceDesc = MessageService.get('global.device')
            } else if (singleChoice.toLowerCase() === 'v') {
               singleChoiceDesc = MessageService.get('global.view')
            } else if (singleChoice.toLowerCase() === 'i') {
               singleChoiceDesc = MessageService.get('global.ion')
            } else if (singleChoice.toLowerCase() === 'b') {
               singleChoiceDesc = MessageService.get('global.dropbox')
            }

            var obj = {
               label: singleChoiceDesc,
               type: 'OPT',
               value: singleChoice
            };
            fldListBuilt.push(obj);
         }
      }
      self.printTypeOptions = fldListBuilt;
   };

   // If no existing settings, then initialize new settings
   if (!self.printerSettings) {

      // For stored reports, we need to get a default printer values for changes to the printtype.  If not a stored report, the defaults will load from the next call and we don't need to run twice 
      if (options.reportName) {
         var defaultPrinterCriteria = { cFunctionName: options.functionName, cSubFunction: options.subFunctionName, cReportName: "" };
         DataService.post('api/shared/assharedentry/printerinitialize', { data: defaultPrinterCriteria, busy: true }, function (defaultdata) {
            if (defaultdata) {
               self.defaultPrinter = defaultdata.printernm;
            }
         });
      }

      // Printer Initialize call.
      // TO DO: need to refactor as print type dropdown bind, types should conditional bind , printer inline need more refactor as it should filter based on the print type selection
      var printerCriteria = { cFunctionName: options.functionName, cSubFunction: options.subFunctionName, cReportName: options.reportName };

      DataService.post('api/shared/assharedentry/printerinitialize', { data: printerCriteria, busy: true }, function (data) {
         if (data) {
            self.printerSettings = data;

            // Only assign default printer here if not a stored report so as to not overwrite the default loaded above.
            if (!options.reportName) {
               self.printerSettings.defaultPrinter = data.printernm;
            }
            else {
               self.printerSettings.defaultPrinter = self.defaultPrinter;
            }

            // Save off stored report values for later use
            self.printerSettings.defaultStoredType = data.printtype;
            self.printerSettings.defaultStoredPrinter = data.printernm;
            self.printerSettings.storedReportName = options.reportName;

            if (data.outputover && data.outputover.toLowerCase() === 'text') {
               self.printerSettings.outputover = true;
            } else {
               self.printerSettings.outputover = false;
            }

            self.setPrintOptionsFlagVisibility();

            if (self.printerSettings && self.printerSettings.printtype) {
               self.printerTypeChange(self.printerSettings.printtype);
            }

            // A stored report needs to use the printer saved to it rather than any default
            if (options.reportName && self.printerSettings) {
               self.printerSettings.printernm = self.printerSettings.defaultStoredPrinter;
            }

            // If Back End loads initial setting for Flat File - use the Printer Name (flag file name not in prodataset)
            if (data.filefl && data.printtype.toLowerCase() === 'o' && data.printernm) {
               self.printerSettings.flatfilenm = data.printernm;
            }

            if (options.subFunctionName) {
               self.printerSettings.printerinstance = options.subFunctionName;
            }
            //Menu function based default values for printer
            if (options.defaultPrintType) {
               self.printerSettings.printtype = options.defaultPrintType;
            }

            //To Get the first fax name from Sasp results for Fax Type
            self.getDefaultSaspFaxPrinter();

            if (self.printerSettings.printtypes) {
               self.buildPrintTypeDropDown(self.printerSettings.printtypes);
            }

            // TO DO: need to fix printer options dropdownlist bind, as of now binding all options. Need a scenario to check the O/P values
            //if (data.printtypes !== 'all') {

            //}

            self.watchPrintWarehouse();

            // Set the printerSettings object on the client's model reference (if requested)
            if (options.printerSettingsModel) {
               Utils.setNestedValue($scope, options.printerSettingsModel, self.printerSettings);
            }
         }
      });
   } else {
      self.buildPrintTypeDropDown(self.printerSettings.printtypes);
      self.watchPrintWarehouse();
   }

   self.getDefaultSaspFaxPrinter = function () {
      var criteria = {
         ptype: 'f',
         printernm: '',
         saspgroup: '',
         blankgroup: false,
         wideonly: false,
         recordlimit: 0
      };

      DataService.post('api/sa/sasp/lookup', { data: criteria, busy: true }, function (data) {
         self.dataset = data.saprinterlookupresults;
      });
   };

   // Validate the printer settings call before save settings
   self.validatePrinterSettings = function (callbackFn) {
      var validPrinterSettings = self.getPrinterSettingsData();
      DataService.post('api/shared/assharedentry/printervalidate', { data: validPrinterSettings, busy: true }, function (data) {
         if (data.length === 0) {
            var callBackData = { printerDetails: validPrinterSettings, isPrinterValid: true };
            callbackFn(callBackData);  // if data is valid , it will return true to parent control to save the printer settings
         }
         else if (data.length >= 1) {
            MessageService.info('Printer Validation', data[0].messagetxt); // Later it might required to change as display multiple messages if any.
         }
      });
   };

   //this will prepare the printer data along with screen data(some information we are not displaying screen like functionName, subFunName etc..)
   self.getPrinterSettingsData = function () {
      var printerData = {};

      printerData.email = self.printerSettings.emailaddr; // we need email property to validate printer data, as PV object property is email.
      printerData.emailaddr = self.printerSettings.emailaddr;
      printerData.faxcom = self.printerSettings.faxcom;
      printerData.faxfrom = self.printerSettings.faxfrom;
      printerData.faxphoneno = self.printerSettings.faxphoneno;
      printerData.faxpriority = self.printerSettings.faxpriorityfl;
      printerData.faxto1 = self.printerSettings.faxto1;
      printerData.faxto2 = self.printerSettings.faxto2;
      printerData.functionname = options.functionName;
      printerData.printoptfl = self.printerSettings.printoptfl;
      printerData.printtype = self.printerSettings.printtype;
      printerData.printernm = self.printerSettings.printernm;
      printerData.printtypes = self.printerSettings.printtypes;
      printerData.outputover = self.printerSettings.outputover;
      // TO DO: need to test more cases for print type as  file

      if (printerData.printtype.toLowerCase() === 'o') {
         printerData.printernm = self.printerSettings.flatfilenm || self.printerSettings.printernm;
         printerData.flatfilenm = printerData.printernm;
      } else {
         printerData.flatfilenm = self.printerSettings.flatfilenm;
      }

      printerData.queue = self.printerSettings.queue;
      printerData.subfunction = options.subFunctionName;

      // options printing requires printerinstance be populated, was lost in some cases
      if (options.subFunctionName) {
         printerData.printerinstance = options.subFunctionName;
      }

      // If any additional fields required based on menu, add conditionally.

      return printerData;
   };

   // Validate the comment
   self.validateCommentValue = function () {
      var comment = self.printerSettings.faxcom;

      if (comment) {

         // count how many newlines are in the comment
         var newlineCount = 0;
         if (comment.includes('\n')) {
            for (var i = 0; i < comment.length; i++) {
               if (comment[i] === '\n') {
                  newlineCount++;
               }
            }
         }

         if (comment.length > 410) {
            newlineCount = 10;
         }

         if (newlineCount > 9) {
            return MessageService.get('global.comment.is.too.long.it.must.be.10.or.fewer.lines.long');
         }
      }

      return true;
   };

   customCtrl.ready(self);

});