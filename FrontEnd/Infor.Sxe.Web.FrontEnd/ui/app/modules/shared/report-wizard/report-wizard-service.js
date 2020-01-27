'use strict';

/**
 * Service for Report Wizard functionality
 */
app.service('ReportWizardService', function ReportWizardService() {

   /**
    * Build Reptwizardfinishranges array from current model values and definitions
    */
   this.getFinishRanges = function (rangesObject, rangesDefinitions) {
      var finishRanges = [];

      for (var i = 0; i < rangesDefinitions.length; i++) {
         var rangeData = rangesDefinitions[i];

         if (rangesObject['fieldBeg' + rangeData.rangenumber] === 0) {
            rangesObject['fieldBeg' + rangeData.rangenumber] = '0';
         }

         finishRanges.push({
            rangenumber: rangeData.rangenumber,
            rangename: rangeData.rangename,
            rangebegvalue: rangesObject['fieldBeg' + rangeData.rangenumber] ? rangesObject['fieldBeg' + rangeData.rangenumber] : '',               // do not allow null
            rangeendvalue: rangesObject['fieldEnd' + rangeData.rangenumber] ? rangesObject['fieldEnd' + rangeData.rangenumber] : ''                // do not allow null
         });
      }

      return finishRanges;
   };

   /**
    * Build Reptwizardfinishoptions array from current model values and definitions
    */
   this.getFinishOptions = function (optionsObject, optionsDefinitions) {
      var finishOptions = [];

      for (var i = 0; i < optionsDefinitions.length; i++) {
         var optData = optionsDefinitions[i];

         finishOptions.push({
            optionnumber: optData.optionnumber,
            optionname: optData.optionname,
            optionvalue: optionsObject['field' + optData.optionnumber]
         });
      }

      return finishOptions;
   };

   /**
    * Create a json field control from backend metadata (for Ranges and Options screen)
    */
   this.createJsonControl = function (id, type, name, length, required) {
      var control = {
         id: id,
         type: 'FIELD',
         label: name ? name.replace(/\s/g, '&nbsp;') : '',
         required: required
      };

      // Add properties based on type
      switch (type.toLowerCase()) {
         case 'a':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.maxLength = length;                                                                                                               //ignore jslint - correct indentation
            if (length < 5) {                                                                                                                         //ignore jslint - correct indentation
               control.size = 'SM';                                                                                                                   //ignore jslint - correct indentation
            }                                                                                                                                         //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'b':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.dataFormat = 'BinLoc';                                                                                                            //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'c':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'LOOKUP';                                                                                                               //ignore jslint - correct indentation
            control.meta = 'Customer';                                                                                                                //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'd':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.maxLength = 8;                                                                                                                    //ignore jslint - correct indentation
            control.size = 'SM';                                                                                                                      //ignore jslint - correct indentation
            control.mask = '??/??/??';
            //control.dataFormat = 'DATE';  //This is removed because the field needs to accept special date formats, such as **/**/**
            //control.subFormat = 'MM/dd/yy'; // The report wizard backend uses this model format for dates
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'i':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.dataFormat = 'INTEGER_TEXT';                                                                                                      //ignore jslint - correct indentation
            control.digits = length;                                                                                                                  //ignore jslint - correct indentation
            control.sign = '+';                                                                                                                       //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'n':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.dataFormat = null; //cannot be decimal because the format must be text and we cannot define the mask                              //ignore jslint - correct indentation
            control.maxLength = length;                                                                                                               //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'p':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.dataFormat = 'PeriodReport';                                                                                                      //ignore jslint - correct indentation
            control.size = 'SM';                                                                                                                      //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'q':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'DROP_DOWN';                                                                                                            //ignore jslint - correct indentation
            control.type3 = 'MANUAL';                                                                                                                 //ignore jslint - correct indentation
            control.optionsModel = 'opts.yesNoOptions';                                                                                               //ignore jslint - correct indentation
            control.optionLabelField = 'label';                                                                                                       //ignore jslint - correct indentation
            control.optionValueField = 'value';                                                                                                       //ignore jslint - correct indentation
            control.blankOption = false;                                                                                                              //ignore jslint - correct indentation
            control.size = 'SM';                                                                                                                      //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'r':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.conditionDisabled = true;                                                                                                         //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'w':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'LOOKUP';                                                                                                               //ignore jslint - correct indentation
            control.meta = 'Warehouse';                                                                                                               //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'x':                                                                                                                                    //ignore jslint - correct indentation
            // TODO: Does not look good.  Consider holding and adding to description of next?                                                         //ignore jslint - correct indentation
            control.subType = 'INFO';                                                                                                                 //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
         case 'y':                                                                                                                                    //ignore jslint - correct indentation
            control.subType = 'TEXT_BOX';                                                                                                             //ignore jslint - correct indentation
            control.dataFormat = 'YEAR';                                                                                                              //ignore jslint - correct indentation
            control.subFormat = length === 2 ? '2Digit' : '4Digit';                                                                                   //ignore jslint - correct indentation
            control.size = 'SM';                                                                                                                      //ignore jslint - correct indentation
            break;                                                                                                                                    //ignore jslint - correct indentation
      }

      return control;
   };

});
