/*
    Basic steps for adding new table setups to SASTT (not all of these steps may be required):

       1. Modify serviceinterface\server\AppserverLogic\sa\sasttloadtablecodes.p (SI logic to build the Table List drop down, etc.)
          **This is no longer needed as this is stored in the SASTTCODES table in SX.e (this call will pull from there).  Still need to add it to the SASTTCODES table.
          Add any new labels and descriptions you add in that SI call to the language en-US.json file so they can be properly translated if missing
          (there is logic in sastt.js to handle the translation on the fly).
       2. Modify serviceinterface\server\AppserverLogic\sa\sasttloadtabledata.p (SI logic to build the Main grid) if there is any specific logic needed to
          load the table data to the grid
       3. If there is extended data, you will have to create a subview for that and save the .json to the modules/sa/sastt/detail directory. The file name should be
          the new codeid followed by -detail.json so it will be dynamically picked up when SASTT drilldowns to Detail.  See existing ones for general models.
       4. Modify serviceinterface\server\AppserverLogic\sa\sasttcreate.p to run any specific create logic.
       5. Modify serviceinterface\server\AppserverLogic\sa\sasttmodify.p for any special logic when modifying the General data (usually the user can only modify
          the description)
       6. If there is extended data you will have to modify the appropriate SI calls to load and save extended data such as
          serviceinterface\server\AppserverLogic\sa\sasttloadsasta.p and serviceinterface\server\AppserverLogic\sa\sasttsavesasta.p
       7. Modify serviceinterface\server\AppserverLogic\sa\sasttdelete.p to run any specific delete logic.

       It should not be necessary to modify much of the sastt.js logic unless you are adding a new filename in the database for the new SASTT Table setup.

 */

'use strict';

app.config(function (StateProvider, MultiLanguageStateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sastt',
      searchMethod: 'POST',
      searchPath: '',
      resultsRowIdField: 'rec',
      recordName: 'sastt',
      recentlyVisited: null,
      primaryKeyParams: [],
      passGridRecord: true,
      createStateView: 'sa/sastt/detail.json',
      postCreateState: '^.detail.edit'
   });
   MultiLanguageStateProvider.addStates('sa', 'sastt', 'sastt.detail');
});

app.service('SasttService', function ($state, $translate, $filter, ContextService, DataService, GridService, AodataService, MessageService, Sasoo, UtilsData) {

   this.getRecord = function (self, base, stateParams) {

      // If we are updating a record from the main grid use the object passed from the main grid.
      // If we had just created a new record and jumped to update then base.sasttdata will already contain the correct data and stateParams.object will be null.
      if (stateParams.object) {
         base.sasttdata = stateParams.object;
      }

      var params = {};

      // This code will return the basic record - we will load the appropriate detail and extended data in the extendDetailController
      switch (base.sasttcodes.filename) {
         case 'a':                                                                                                                                 //ignore jslint - correct indentation
            if (base.criteria.codeid.toUpperCase === 'WG') {                                                                                       //ignore jslint - correct indentation
               return DataService.getResource('api/sa/sastae/getbyrowid/' + base.sasttdata.rec, { busy: true });                                   //ignore jslint - correct indentation
            } else {                                                                                                                               //ignore jslint - correct indentation
               if (stateParams.pk) {
                  params.codeiden = stateParams.pk;
                  params.codeval = stateParams.pk2;
                  return DataService.getResource('api/sa/sasta/getbypk', { params:params, busy: true });                                           //ignore jslint - correct indentation
               } else {
                  return DataService.getResource('api/sa/sasta/getbyrowid/' + base.sasttdata.rec, { busy: true });                                 //ignore jslint - correct indentation
               }
            }                                                                                                                                      //ignore jslint - correct indentation
         case 'cmst':                                                                                                                              //ignore jslint - correct indentation
            return DataService.getResource('api/cm/cmst/getbyrowid/' + base.sasttdata.rec, { busy: true });                                        //ignore jslint - correct indentation
         case 'cts':                                                                                                                               //ignore jslint - correct indentation
            if (stateParams.pk) {
               params.codeiden = stateParams.pk;
               params.primarykey = stateParams.pk2;
               params.secondarykey = stateParams.pk3;
               return DataService.getResource('api/sa/sastaz/getbypk', { params: params, busy: true });                                           //ignore jslint - correct indentation
            } else {
               return DataService.getResource('api/sa/sastaz/getbyrowid/' + base.sasttdata.rec, { busy: true });                                      //ignore jslint - correct indentation
            }
         case 'n':                                                                                                                                 //ignore jslint - correct indentation
            return DataService.getResource('api/sa/sastn/getbyrowid/' + base.sasttdata.rec, { busy: true });                    //ignore jslint - correct indentation
         case 'pdst':                                                                                                                              //ignore jslint - correct indentation
            return DataService.getResource('api/pd/pdst/getbyrowid/' + base.sasttdata.rec, { busy: true });                     //ignore jslint - correct indentation
         case 'slst':                                                                                                                              //ignore jslint - correct indentation
            return DataService.getResource('api/sl/slst/getbyrowid/' + base.sasttdata.rec, { busy: true });                     //ignore jslint - correct indentation
         case 'vast':                                                                                                                              //ignore jslint - correct indentation
            return DataService.getResource('api/va/vast/getbyrowid/' + base.sasttdata.rec, { busy: true });                     //ignore jslint - correct indentation
         case 'wmst':                                                                                                                              //ignore jslint - correct indentation
            return DataService.getResource('api/wm/wmst/getbyrowid/' + base.sasttdata.rec, { busy: true });                     //ignore jslint - correct indentation
      } // switch

   }; // getRecord

   this.extendBaseController = function (self) {

      var currentindex = 0;
      var lastindex = -1;

      // array of codeids for each table entry
      var codeidlist = [];

      // current selection sasttcodes values
      self.sasttcodes = {};

      // criteria
      self.criteria = {
         id: '',
         codeid: '',
         descrip: '',

         // entry values
         codeval: '',
         codeval2: '',
         codeint: 0,
         codeint2: 0,
         codelog: false,
         codelog2: false
      };

      self.allowAPCreditACH = AodataService.getValue('AP', 'AllowAPCreditACH');

      // Create a dynamic mask (to fix issues with Integer_text fields)
      self.buildMask = function (type, size) {
         return type.repeat(size);
      };

      //User Hook (do not rename)
      //NOTE:  We need this on the Base, otherwise the timing won't be right for the extension.
      //Do not move the location of this hook to a different controller.
      self.saveModifiedExtendDataCheckAnotherATypes = function () {
         //If extended, the extension would return true for this to enable this check.
         return false;
      };

      //User Hook (do not rename)
      //NOTE:  We need this on the Base, otherwise the timing won't be right for the extension.
      //Do not move the location of this hook to a different controller.
      self.loadExtendDataCheckAnotherATypes = function () {
         //If extended, the extension would return true for this to enable this check.
         return false;
      };

      //User Hook (do not rename)
      //NOTE:  We need this on the Base, otherwise the timing won't be right for the extension.
      //Do not move the location of this hook to a different controller.
      self.saveModifiedExtendDataCheckAnotherNTypes = function () {
         //If extended, the extension would return true for this to enable this check.
         return false;
      };

      //User Hook (do not rename)
      //NOTE:  We need this on the Base, otherwise the timing won't be right for the extension.
      //Do not move the location of this hook to a different controller.
      self.loadExtendDataCheckAnotherNTypes = function () {
         //If extended, the extension would return true for this to enable this check.
         return false;
      };

      // Translate string on the fly - the string to be translated must be setup in the language .json file as a global string
      // example: 'Drop Down Option 1 (new)' becomes global.drop.down.option.1.new and should be setup as such in the .json file
      self.translateLabel = function (origstr) {
         if (!origstr) {
            return '';
         }
         // format to global. and replace all blanks and '/' slashes with a '.', remove '(' and ')'
         var str = 'global.' + origstr.toLowerCase().replace(/ /g, '.').replace(/\//g, '.').replace(/\(/g, '').replace(/\)/g, '').replace(/:/g, '');

         // account for exceptions
         switch (str) {
            case 'global.dept':                                                     //ignore jslint - correct indentation
               str = 'global.department';                                           //ignore jslint - correct indentation
               break;                                                               //ignore jslint - correct indentation
            case 'global.frt.code':                                                 //ignore jslint - correct indentation
               str = 'global.freight.code';                                         //ignore jslint - correct indentation
               break;                                                               //ignore jslint - correct indentation
            case 'global.ion.uom':                                                  //ignore jslint - correct indentation
               str = 'global.ion.unit.of.measure';                                  //ignore jslint - correct indentation
               break;                                                               //ignore jslint - correct indentation
            case 'global.po.addons':                                                //ignore jslint - correct indentation
               str = 'global.purchase.order.addons';                                //ignore jslint - correct indentation
               break;                                                               //ignore jslint - correct indentation
            case 'global.sf.corp.group':                                            //ignore jslint - correct indentation
               str = 'global.storefront.corporate.group';                           //ignore jslint - correct indentation
               break;                                                               //ignore jslint - correct indentation
         }

         return $translate.instant(str);

      }; // translateString

      // Reset the search criteria object
      self.resetCriteria = function () {
         self.criteria = {};
         self.criteria.idx = currentindex;
         self.criteria.codeid = self.sasttTableData[self.criteria.idx].codeid;
         self.changeTableData();
      };

      // Build an array of available codeids in the TableData
      self.buildCodeIdList = function () { //TODO: is this only for lookup?  Could be a better way...
         var index;
         var arraylength = self.sasttTableData.length;
         for (index = 0; index < arraylength; index++) {
            codeidlist.push(self.sasttTableData[index].codeid);
         }

         self.resetCriteria();
      };

      // Translate Drop Down Verbage
      self.translateDropDown = function () {
         var index;
         var arraylength = self.sasttTableData.length;
         for (index = 0; index < arraylength; index++) { //replace with forEach on self.sasttTableData?
            self.sasttTableData[index].descrip = self.translateLabel(self.sasttTableData[index].descrip);
         }
         // Sort criteria drop down list by display value (descrip) AFTER it has been translated
         self.sasttTableData = $filter('orderBy')(self.sasttTableData, 'descrip');

         self.buildCodeIdList();
      };

      //User Hook (do not rename)
      self.changeTableDataContinue = function (currentindex) {
         // Perform search automatically to ensure the correct grid and data is displayed for the newly selected table
         if (currentindex !== lastindex) {
            self.search();
            lastindex = currentindex;
         }
      };

      // Called at the change of Table Data dropdown to a new SASTT table setup
      self.changeTableData = function () {
         currentindex = codeidlist.indexOf(self.criteria.codeid);

         self.criteria.codeid = self.sasttTableData[currentindex].codeid; //TODO: Why are we setting this if it's what we're using to get the values? like x = y = x
         self.criteria.id = self.criteria.codeid.toUpperCase();
         self.criteria.descrip = self.sasttTableData[currentindex].descrip;
         self.sasttcodes = angular.copy(self.sasttTableData[currentindex]);

         // Clear the Search entry fields
         self.criteria.codeval = '';
         self.criteria.codeval2 = '';
         self.criteria.codeint = 0;
         self.criteria.codeint2 = 0;
         self.criteria.codelog = false;
         self.criteria.codelog2 = false;
         self.criteria.slsrep = Sasoo.slsrep;
         self.criteria.desc = '';
         self.criteria.vendno = 0;
         self.criteria.userfield = '';

         //User Hook (do not rename)
         self.changeTableDataContinue(currentindex);

      }; // changeTableData

      self.showSalesRep = function () {
         if (self.criteria.codelog2 === true) {
            switch (self.criteria.codeid.toLowerCase()) {
               case 'cmac':
               case 'cmar':
               case 'cmcs':
               case 'cmpr':
               case 'cmsc':
               case 'cmps':
               case 'cmu1':
               case 'cmu2':
                  return true;
                  break;

               default:
                  return false;
            }
         }
         return false;
      }; // showSalesRep

      self.search = function () {

         // current search criteria
         var sasttsearchcriteria = {
            codechar: self.criteria.codeval,
            codeint: self.criteria.codeint,
            vendno: self.criteria.vendno,
            codechar2: self.criteria.codeval2,
            codelog2: self.criteria.codelog2,
            descrip: self.criteria.desc,
            userfield: self.criteria.userfield
         };

         // Load the main grid
         DataService.post('api/sa/assasetup/sasttloadtabledata', {
            data: {
               sasttcodes: self.sasttcodes,
               sasttsearchcriteria: sasttsearchcriteria
            },
            busy: true
         }, function (data) {
            if (data) {
               self.dataset = data;
            }
         });

      }; // search

   }; // extendBaseController

   this.extendSearchController = function (self, base) {

      // Load the Table List dropdown
      DataService.get('api/sa/assasetup/sasttloadtablecodes', { busy: true }, function (data) {
         if (data) {
            base.sasttTableData = data;
            base.translateDropDown();
         }
      });

      // Clear form
      self.clear = function () {
         // Reset criteria
         base.resetCriteria();
      };

      // Triggers when Table List Drop Down changes
      self.changeTableList = function () {
         base.changeTableData();
      };

   }; // extendSearchController

   this.extendDetailController = function (self, base, sastt, scope, stateParams) {
      var codesWithBank = ['p', 'pct'];      

      // dynamically bring in the appropriate View base on the selected Table codeid for extended data
      self.detailSubView = 'sa/sastt/detail/' + base.criteria.codeid.toLowerCase() + '-detail.json';
      self.banknoDropDownOptions = [];

      self.checkBankNoDropDownBuild = function () {

         if (codesWithBank.indexOf(base.criteria.codeid.toLowerCase()) > -1) {
            // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
            UtilsData.getBankNoDropDown(function (dropDownList) {
               self.banknoDropDownOptions = dropDownList;
            });
         }
      };

      self.checkBankNoDropDownBuild();

      // Set screen id suffix for context messages since documentation wants sastt doc to be separated by the table
      ContextService.setScreenIdSuffix(base.criteria.codeid.toLowerCase(), $state.current.name);

      self.sasttcodes = {
         filename: base.sasttcodes.filename,
         extendedfl: base.sasttcodes.extendedfl
      };

      self.availableWarehouses = [];
      self.selectedWarehouses = [];
      self.whsegrp = '';

      // Load Sub Title with the description and primary key value
      self.getSubTitle = function () {
         if (base.sasttcodes.vendfl.toLowerCase() === 'y') {
            return base.sasttcodes.descrip + ' | ' + self.detail.vendno + ' | ' + self.detail.codechar2;
         } else {
            return base.sasttcodes.descrip + ' | ' + self.detail.codeval;
         }
      };

      self.paymentTypeCCChanged = function () {
         if (self.extend.addtaxfl.toLowerCase() === 'yes') {
            self.extend.chkauth = 'no';
            self.extend.ehffl = false;
         }
      };

      self.paymentTypeACHChanged = function () {
         if (self.extend.chkauth.toLowerCase() === 'yes') {
            self.extend.addtaxfl = 'no';
         }
      };

      self.paymentTypeCreditACHChanged = function () {
         if (self.extend.ehffl) {
            self.extend.chkauth = 'yes';
            self.extend.addtaxfl = 'no';
         }
      };
   

      // Load the displayed Business Rule Extended Description (some business rule templates exceed the max allowable width for a Text Area)
      self.getExtendedDescrip = function (extdescrip) {
         return (extdescrip) ? extdescrip.replace(/[\r]/g, '<br/>').replace(/[\n]/g, '<br/>') : '';
      }; // getExtendedDescrip

      // Load the Refund Payment Types - this cannot be Dynamic Codes (database, cached) since the user may have just created a new Payment Type and would like refunds in the same
      self.buildRefundPaymentTypes = function () {
         self.refundPaymentTypes = [];

         var params = {
            codeiden: 'p',
            fldlist: 'codeval,descrip'
         };

         DataService.post('api/sa/sastn/getsastnlist', { data: params, busy: true }, function (data) {                                                      //ignore jslint - correct indentation
            if (data) {
               var index;
               var arraylength = data.length;
               for (index = 0; index < arraylength; index++) {
                  var paymentType = {
                     descrip: data[index].descrip,
                     codeval: data[index].codeval
                  };
                  self.refundPaymentTypes.push(paymentType);
               }
            }
         });

      }; // buildRefundPaymentTypes

      // Build the SD link lists
      self.buildLinkLists = function (sasttsastae) {
         var linkValues = [];
         self.availableLinks = [];
         self.selectedLinks = [];

         // Build easy lookup list of link values
         for (var i = 0; i < sasttsastae.length; i++) {
            linkValues.push(sasttsastae[i].codedata);
         }

         var criteria = {
            sasttcodes: { codeid: 'SC', filename: 'a' },
            sasttsearchcriteria: {}
         };

         // Get all available links from SC
         DataService.post('api/sa/assasetup/sasttloadtabledata', { data: criteria, busy: true }, function (links) {
            for (var i = 0; i < links.length; i++) {
               var link = links[i];
               var opt = {
                  label: link.codeval + ' (' + link.descrip + ')',
                  value: link.codeval
               };

               // Push to appropriate list
               if (linkValues.indexOf(opt.value) < 0) {
                  self.availableLinks.push(opt);
               } else {
                  self.selectedLinks.push(opt);
               }
            }
         });
      };

      // Build the warehouse lists
      self.buildWhseLists = function (sasttsastae) {
         self.whsegrp = [];
         self.availableWarehouses = [];
         self.selectedWarehouses = [];

         // Build easy lookup list of warehouse values
         for (var i = 0; i < sasttsastae.length; i++) {
            self.whsegrp.push(sasttsastae[i].codedata);
         }

         var params = {
            fldlist: 'whse,name'
         };

         // get all available warehouses
         DataService.get('api/ic/icsd', { params: params, busy: true }, function (whses) {
            if (whses) {
               var index;
               var arraylength = whses.length;
               for (index = 0; index < arraylength; index++) {
                  var whse = {
                     label: whses[index].whse + ' (' + whses[index].name + ')',
                     value: whses[index].whse
                  };
                  // push to appropriate list based on the current warehouse group
                  if (self.whsegrp.indexOf(whse.value) < 0) {
                     self.availableWarehouses.push(whse);
                  } else {
                     self.selectedWarehouses.push(whse);
                  }
               }
            } // if whses
         });
      };

      // Build the link data records for saving to the db
      self.createLinkData = function () {
         var links = [];

         for (var i = 0; i < self.selectedLinks.length; i++) {
            links.push({ codedata: self.selectedLinks[i].value, userfield: '' });
         }

         return links;
      };

      // Build the warehouse group data records for saving to the db
      self.createWhseGroupData = function () {

         self.whsegrp = [];

         var index;
         var arraylength = self.selectedWarehouses.length;
         for (index = 0; index < arraylength; index++) {
            var whse = {
               codedata: self.selectedWarehouses[index].value,
               userfield: ''
            };
            self.whsegrp.push(whse);
         }

         return self.whsegrp;
      };

      // Called when Discount Type dropdown is changed on the Terms setup (T)
      self.termsChgDiscTy = function () {
         var sastttermschg = {
            cFieldName: 'discty',
            sasttterms: self.extend
         };

         DataService.post('api/sa/assasetup/sastttermschgfield', { data: sastttermschg, busy: true }, function (data) {                                                      //ignore jslint - correct indentation
            if (data) {
               self.extend = data;
            }
         });
      };

      // Called when Due Type dropdown is changed on the Terms setup (T)
      self.termsChgDueTy = function () {
         var sastttermschg = {};
         sastttermschg = {
            cFieldName: 'duety',
            sasttterms: self.extend
         };

         DataService.post('api/sa/assasetup/sastttermschgfield', { data: sastttermschg, busy: true }, function (data) {                                                      //ignore jslint - correct indentation
            if (data) {
               self.extend = data;
            }
         });
      };

      // Called when Split Pay dropdown is changed on the Terms setup (T)
      self.termsChgSplitFl = function () {
         var sastttermschg = {};
         sastttermschg = {
            cFieldName: 'splitfl',
            sasttterms: self.extend
         };

         DataService.post('api/sa/assasetup/sastttermschgfield', { data: sastttermschg, busy: true }, function (data) {                                                      //ignore jslint - correct indentation
            if (data) {
               self.extend = data;
            }
         });
      };

      // called when the user clicks on the MultiLanguage button
      self.multiLangClick = function () {
         $state.go('sastt.detail.multilanguage', {
            codeiden: self.detail.codeid,
            codeval: self.detail.codeval,
            descrip1: self.detail.descrip,
            descrip2: '',
            extended: '',
            returnState: $state.current.name
         });
      }; // multiLangClick

      // Vendor hyperlink
      self.vendHyperlink = function () {
         if (self.extend.vendno) {
            $state.go('apiv.detail', { pk: self.extend.vendno });
         }
      };

      // Ship From hyperlink
      self.shipfmHyperlink = function () {
         if (self.extend.vendno && self.extend.shipfmno) {
            $state.go('apiv.detail', { pk: self.extend.vendno, pk2: self.extend.shipfmno });
         }
      };

      // External Vendor hyperlink
      self.extrvendHyperlink = function () {
         if (self.extend.extrvendno) {
            $state.go('apiv.detail', { pk: self.extend.extrvendno });
         }
      };

      // External Ship From hyperlink
      self.extrshipfmHyperlink = function () {
         if (self.extend.extrvendno && self.extend.extrshipfmno) {
            $state.go('apiv.detail', { pk: self.extend.extrvendno, pk2: self.extend.extrshipfmno });
         }
      };

      // Destination Vendor hyperlink
      self.destvendHyperlink = function () {
         if (self.extend.destvendno) {
            $state.go('apiv.detail', { pk: self.extend.destvendno });
         }
      };

      // Destination Ship From hyperlink
      self.destshipfmHyperlink = function () {
         if (self.extend.destvendno && self.extend.destshipfmno) {
            $state.go('apiv.detail', { pk: self.extend.destvendno, pk2: self.extend.destshipfmno });
         }
      };

      // called from the Unit Conversion (U) setup
      self.reCalcUnitConv = function (showmessages) {
         var unitconvcalc = 1;
         if (self.extend.unitdec === 0) { self.extend.unitdec = 1; }

         if (self.extend.unittype.toUpperCase() === 'F') {
            self.extend.unitlabel = $translate.instant('global.units.in.a.stocking.unit');
            unitconvcalc = (1 / self.extend.unitdec);
         } else {
            self.extend.unitlabel = $translate.instant('global.stocking.units.in.this.unit');
            unitconvcalc = self.extend.unitdec;
         }
         self.extend.unitconv = unitconvcalc.toPrecision(5);
         if ((showmessages) && (self.extend.unittype.toUpperCase() === 'F') && (self.extend.unitdec < 1)) {
            MessageService.info('global.information', 'message.you.have.entered.a.decimal.value.in.a.fractional.u');
         }
      };

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;

         // Validate the address control (address control will only exist if it is on the screen)
         if (self.addressControl) {
            isValid = self.addressControl.validate();
         }

         return isValid;
      };

      // customSubmit is called instead of submit when not in Create mode which allows validation of the extended data
      self.customSubmit = function () {

         // Ensure the Unit Conversion is correct
         if (base.criteria.codeid.toUpperCase() === 'U') {
            self.reCalcUnitConv(false);
         }

         if (self.validateForm()) {
            self.submit();
         }
      };

      // load the extended data on the detail screens based on the filename and codeid
      self.loadExtendData = function () {
         var codeId = base.criteria.codeid;
         var dateToday = new Date();
         base.sasttdata.timezoneclient = dateToday.getTimezoneOffset() * -1;
         switch (base.sasttcodes.filename) {
            case 'a':                                                                                                                                                   //ignore jslint - correct indentation
               if (base.criteria.codeid === 'T') {                                                                                                                      //ignore jslint - correct indentation
                  DataService.post('api/sa/assasetup/sasttloadterms', { data: base.sasttdata, busy: true }, function (sasttterms) {                                                      //ignore jslint - correct indentation
                     if (sasttterms) {
                        // load the extended screen data so it will display, we need to copy the returned data from the SI call to a new data set called dtl.extend
                        self.extend = sasttterms;
                     }
                  });
               }                                                                                                                                                        //ignore jslint - correct indentation
               else if (codeId === 'SC' || codeId === 'SD' || codeId === 'WG') {
                  // load the sastae records (which can be used by any sastt type that wants to use it)
                  DataService.post('api/sa/assasetup/sasttloadsastae', { data: base.sasttdata, busy: true }, function (sasttsastae) {                                                    //ignore jslint - correct indentation
                     self.sastaeRecords = sasttsastae;

                     // build the link lists for SD
                     if (codeId === 'SD') {
                        self.buildLinkLists(sasttsastae);
                     } else if (codeId === 'WG') {
                        // build the warehouse lists for WG
                        self.buildWhseLists(sasttsastae);
                     }
                  });
               }
               //User Hook (do not rename)
               //NOTE: It's important that this hook is placed on base, otherwise it won't consistently
               //fire due to timing issues.
               else if (base.loadExtendDataCheckAnotherATypes()) {                                                                                                       //ignore jslint - correct indentation
                  //User Hook (do not rename)
                  if (self.loadExtendDataAnotherATypes) {                                                                //ignore jslint - correct indentation
                     self.loadExtendDataAnotherATypes();                                                                 //ignore jslint - correct indentation
                  }                                                                                                              //ignore jslint - correct indentation
               }
               else {                                                                                                                                                //ignore jslint - correct indentation
                  DataService.post('api/sa/assasetup/sasttloadsasta', { data: base.sasttdata, busy: true }, function (sasttsasta) {                                                      //ignore jslint - correct indentation
                     if (sasttsasta) {
                        // load the extended screen data so it will display, we need to copy the returned data from the SI call to a new data set called dtl.extend
                        self.extend = sasttsasta;

                        // Display midnight as 86400 and not 0 so it displays properly
                        if (self.extend.starttm === 0) {
                           self.extend.starttm = 86400;
                        }
                        if (self.extend.stoptm === 0) {
                           self.extend.stoptm = 86400;
                        }
                     }
                  });
               }                                                                                                                                                        //ignore jslint - correct indentation
               break;                                                                                                                                                   //ignore jslint - correct indentation

            case 'cmst':                                                                                                                                                //ignore jslint - correct indentation
               // only send the last 2 characters of the codeid
               if (base.sasttdata.codeid.length === 4) {
                  base.sasttdata.codeid = base.sasttdata.codeid.slice(-2);
               }                                                                    //ignore jslint - correct indentation

               DataService.post('api/sa/assasetup/sasttloadcmst', { data: base.sasttdata, busy: true }, function (sasttcmst) {                                                           //ignore jslint - correct indentation
                  if (sasttcmst) {
                     // load the extended screen data so it will display, we need to copy the returned data from the SI call to a new data set called dtl.extend
                     self.extend = sasttcmst;
                  }
               });
               break;                                                                                                                                                   //ignore jslint - correct indentation

            case 'cts':                                                                                                                                                 //ignore jslint - correct indentation
               DataService.post('api/sa/assasetup/sasttloadsastaz', { data: base.sasttdata, busy: true }, function (sasttsastaz) {                                                       //ignore jslint - correct indentation
                  if (sasttsastaz) {
                     // load the extended screen data so it will display, we need to copy the returned data from the SI call to a new data set called dtl.extend
                     self.extend = sasttsastaz;
                  }
               });
               break;                                                                                                                                                   //ignore jslint - correct indentation

            case 'n':
               //User Hook (do not rename)
               //NOTE: It's important that this hook is placed on base, otherwise it won't consistently
               //fire due to timing issues.
               if (base.loadExtendDataCheckAnotherNTypes()) {                                                                                                       //ignore jslint - correct indentation
                  //User Hook (do not rename)
                  if (self.loadExtendDataAnotherNTypes) {                                                                //ignore jslint - correct indentation
                     self.loadExtendDataAnotherNTypes();                                                                 //ignore jslint - correct indentation
                  }                                                                                                              //ignore jslint - correct indentation
               }
               else {                                                                                                                                                //ignore jslint - correct indentation
                  //ignore jslint - correct indentation
                  DataService.post('api/sa/assasetup/sasttloadsastn/', { data: base.sasttdata, busy: true }, function (sasttsastn) {                                                        //ignore jslint - correct indentation
                     if (sasttsastn) {
                        // Note: drop-down uses processno which is a numberic value because it builds the drop down from from sastp
                        sasttsastn.processno = Number(sasttsastn.processor);

                        // load the extended screen data so it will display, we need to copy the returned data from the SI call to dtl.extend data set
                        self.extend = sasttsastn;

                        if (base.sasttdata.codeid.toLowerCase() === 'p') {
                           self.buildRefundPaymentTypes();
                        }
                     }
                  });
               }
               break;                                                                                                                                                   //ignore jslint - correct indentation

            case 'pdst':                                                                                                                                                //ignore jslint - correct indentation
               // only send the last 2 characters of the codeid
               if (base.sasttdata.codeid.length === 4) { base.sasttdata.codeid = base.sasttdata.codeid.slice(-2); }                                                                    //ignore jslint - correct indentation

               DataService.post('api/sa/assasetup/sasttloadpdst', { data: base.sasttdata, busy: true }, function (sasttpdst) {                                                           //ignore jslint - correct indentation
                  if (sasttpdst) {
                     // load the extended screen data so it will display, we need to copy the returned data from the SI call to dtl.extend data set
                     self.extend = sasttpdst;
                  }
               });
               break;                                                                                                                                                   //ignore jslint - correct indentation

            case 'slst':                                                                                                                                                //ignore jslint - correct indentation
               DataService.post('api/sa/assasetup/sasttloadslst', { data: base.sasttdata, busy: true }, function (sasttslst) {                                                           //ignore jslint - correct indentation
                  if (sasttslst) {
                     // load the extended screen data so it will display, we need to copy the returned data from the SI call to dtl.extend data set
                     self.extend = sasttslst;
                  }
               });
               break;                                                                                                                                                   //ignore jslint - correct indentation

            case 'vast':                                                                                                                                                //ignore jslint - correct indentation
               DataService.post('api/sa/assasetup/sasttloadvast', { data: base.sasttdata, busy: true }, function (sasttvast) {                                                           //ignore jslint - correct indentation
                  if (sasttvast) {
                     // load the extended screen data so it will display, we need to copy the returned data from the SI call to dtl.extend data set
                     self.extend = sasttvast;
                  }
               });
               break;                                                                                                                                                   //ignore jslint - correct indentation

         } // switch

      }; // self.loadExtendData

      self.creditRebillChecked = function () {
         if (self.extend.creditrebillfl.toLowerCase() === 'yes') {
            self.extend.reqinvcrfl = 'Yes';
         }
      };

      self.requireInvoiceUnChecked = function () { //TODO: Never used? Checked entire solution...
         if (self.extend.reqinvcrfl.toLowerCase() === 'no') {
            self.extend.creditrebillfl = 'No';
         }
      };

      // Add sastae row
      self.addSastaeRow = function () {
         self.sastaeRecords.push({});
      };

      // Remove selected sastae rows
      self.removeSastaeRow = function () {
         self.sastaeGrid.removeSelected();
      };

      // Load the Key Detail data from base.sasttdata to the dtl.detail data set
      // sastt will not always have have the appropriate key values loaded such as in the case where the filename = 'CTS' which loads from sastaz
      // this will be displayed in the General expandable area at the top of each Detail screen
      self.detail = base.sasttdata;

      // Note - after a new record is created we will show the extended Detail if there is any and allow update. The user can then either enter the extended
      // Detail or just select Cancel to accept the defaults loaded from the Create call and database schema defaults */

      // Load the extended data returned from the appropriate SI call to the dtl.extend dataset
      // this will be displayed in the Extended expandable area or any possibly other named expandable areas that are below the Key data in the Detail screen
      if (base.sasttcodes.extendedfl === 'y') {
         self.loadExtendData();
      } else {
         // New record was created and there is no extended detail so no other fields to update. If the stateParams.id is populated the user drilled down an
         // existing record from the main grid. If stateParams.id is null we jumped from Create.
         if (!stateParams.id) {
            // Nothing to update so go back to Master
            $state.go('sastt.master');
         }
      }

   }; // extendDetailController

   this.extendCreateController = function (self, base, sastt, scope, stateParams) {

      // Set screen id suffix for context messages since documentation wants sastt doc to be separated by the table
      ContextService.setScreenIdSuffix(base.criteria.codeid.toLowerCase(), $state.current.name);

      // customSubmit is required in create controller or avoid a duplicate screen
      self.customSubmit = function () {
            self.submit();
      };
   }; //extendCreateController

   this.updateRecord = function (self, base, sastt, scope, callback) {

      self.sasttcodes = {
         filename: base.sasttcodes.filename,
         extendedfl: base.sasttcodes.extendedfl
      };

      function noHardErrors(datacheck) {
         var noharderrors = (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
         return noharderrors;
      }

      function saveModifiedDetailData() {

         // Note - Vendor Product Group (VG) has nothing to modify in sasttmodify and will return an error if the SI call is made
         // descrip is updated automatically in the extended screen based on the Vendor Product Group Type selected by the user
         if (base.criteria.codeid === 'vg') {
            callback(self.detail);
            return;
         }

         DataService.post('api/sa/assasetup/sasttmodify', { data: { sasttcodes: self.sasttcodes, sasttdata: self.detail }, busy: true }, function (data) {
            if (data) {
               if (noHardErrors(data)) {
                  base.sasttdata = data.sasttdata;
                  callback(base.sasttdata);
               }
            }
         });

      } // saveModifiedDetailData()

      function saveModifiedExtendData() {
         var codeId = base.criteria.codeid;
         var dateToday = new Date();
         if (self.extend) {
            self.extend.timezoneclient = dateToday.getTimezoneOffset() * -1;
         }
         switch (self.sasttcodes.filename) {
            case 'a':                                                                                                                                                //ignore jslint - correct indentation
               if (base.criteria.codeid === 'T') {                                                                                                                   //ignore jslint - correct indentation
                  DataService.post('api/sa/assasetup/sasttsaveterms', { data: { sasttdata: base.sasttdata, sasttterms: self.extend }, busy: true }, function (data) {     //ignore jslint - correct indentation
                     if (data) {
                        if (noHardErrors(data)) {
                           saveModifiedDetailData();                                                                                                                 //ignore jslint - correct indentation

                           //User Hook (do not rename)
                           if (self.sasttsavetermsContinue) {
                              self.sasttsavetermsContinue(data);
                           }
                        }
                     }
                  });
               }                                                                                                                                                     //ignore jslint - correct indentation
               else if (codeId === 'SC' || codeId === 'SD' || codeId === 'WG') {
                  // Save sastae data
                  var sasttsastae;                                                                                                                                  //ignore jslint - correct indentation

                  if (codeId === 'SC') {
                     sasttsastae = self.sastaeRecords;
                  } else if (codeId === 'SD') {
                     sasttsastae = self.createLinkData();
                  } else if (codeId === 'WG') {
                     sasttsastae = self.createWhseGroupData();
                  }

                  DataService.post('api/sa/assasetup/sasttsavesastae', { data: { sasttdata: base.sasttdata, sasttsastae: sasttsastae }, busy: true }, function (data) {    //ignore jslint - correct indentation
                     if (data) {
                        if (noHardErrors(data)) {
                           saveModifiedDetailData();

                           //User Hook (do not rename)
                           if (self.sasttsavesastaeContinue) {
                              self.sasttsavesastaeContinue(data);
                           }
                        }
                     }
                  });
               }
               //User Hook (do not rename)
               //NOTE: It's important that this hook is placed on base, otherwise it won't consistently
               //fire due to timing issues.
               else if (base.saveModifiedExtendDataCheckAnotherATypes()) {                                                                                                       //ignore jslint - correct indentation
                  //User Hook (do not rename)
                  if (self.saveModifiedExtendDataAnotherATypes) {                                                                //ignore jslint - correct indentation
                     self.saveModifiedExtendDataAnotherATypes();                                                                 //ignore jslint - correct indentation
                  }                                                                                                              //ignore jslint - correct indentation
               }                                                                                                                                                    //ignore jslint - correct indentation
               else {
                  if (codeId === 'H') {
                     // Correct midnight, time display saves as 86400, need 0 on Database
                     if (self.extend.starttm === 86400) {
                        self.extend.starttm = 0;
                     }
                     if (self.extend.stoptm === 86400) {
                        self.extend.stoptm = 0;
                     }
                  }

                  DataService.post('api/sa/assasetup/sasttsavesasta', { data: { sasttdata: base.sasttdata, sasttsasta: self.extend }, busy: true }, function (data) {     //ignore jslint - correct indentation
                     if (data) {
                        if (noHardErrors(data)) {
                           saveModifiedDetailData();

                           //User Hook (do not rename)
                           if (self.sasttsavesastaContinue) {
                              self.sasttsavesastaContinue(data);
                           }
                        }
                     }
                  });
               }                                                                                                                                                  //ignore jslint - correct indentation
               break;                                                                                                                                             //ignore jslint - correct indentation

            case 'cmst':                                                                                                                                          //ignore jslint - correct indentation
               // only send the last 2 characters of the codeid
               if (base.sasttdata.codeid.length === 4) { base.sasttdata.codeid = base.sasttdata.codeid.slice(-2); }                                                              //ignore jslint - correct indentation

               DataService.post('api/sa/assasetup/sasttsavecmst', { data: { sasttdata: base.sasttdata, sasttcmst: self.extend }, busy: true }, function (data) {       //ignore jslint - correct indentation
                  if (data) {
                     if (noHardErrors(data)) {
                        saveModifiedDetailData();

                        //User Hook (do not rename)
                        if (self.sasttsavecmstContinue) {
                           self.sasttsavecmstContinue(data);
                        }
                     }
                  }
               });
               break;                                                                                                                                             //ignore jslint - correct indentation

            case 'cts':                                                                                                                                           //ignore jslint - correct indentation
               var sasttsastazchg = {};                                                                                                                           //ignore jslint - correct indentation
               sasttsastazchg = {                                                                                                                                 //ignore jslint - correct indentation
                  sasttdata: base.sasttdata,
                  sasttsastaz: self.extend
               };

               DataService.post('api/sa/assasetup/sasttsavesastaz', { data: sasttsastazchg, busy: true }, function (data) {                                       //ignore jslint - correct indentation
                  if (data) {
                     if (noHardErrors(data)) {
                        saveModifiedDetailData();

                        //User Hook (do not rename)
                        if (self.sasttsavesastazContinue) {
                           self.sasttsavesastazContinue(data);
                        }
                     }
                  } else {
                     saveModifiedDetailData();
                  }
               });
               break;                                                                                                                                             //ignore jslint - correct indentation

            case 'n':
               if (base.saveModifiedExtendDataCheckAnotherNTypes()) {                                                                                                       //ignore jslint - correct indentation
                  //User Hook (do not rename)
                  if (self.saveModifiedExtendDataAnotherNTypes) {                                                                //ignore jslint - correct indentation
                     self.saveModifiedExtendDataAnotherNTypes();                                                                 //ignore jslint - correct indentation
                  }                                                                                                              //ignore jslint - correct indentation
               }                                                                                                                                                    //ignore jslint - correct indentation
               else {
                  //ignore jslint - correct indentation
                  // Note: dropdown uses processno which is a numeric value because it builds the drop down from from sastp
                  self.extend.processor = (!self.extend.processno) ? '0' : self.extend.processno.toString();                                                    //ignore jslint - correct indentation

                  DataService.post('api/sa/assasetup/sasttsavesastn', { data: { sasttdata: base.sasttdata, sasttsastn: self.extend }, busy: true }, function (data) {     //ignore jslint - correct indentation
                     if (data) {
                        if (noHardErrors(data)) {
                           saveModifiedDetailData();

                           //User Hook (do not rename)
                           if (self.sasttsavesastnContinue) {
                              self.sasttsavesastnContinue(data);
                           }
                        }
                     }
                  });
               }
               break;                                                                                                                                             //ignore jslint - correct indentation

            case 'pdst':                                                                                                                                          //ignore jslint - correct indentation
               // only send the last 2 characters of the codeid
               if (base.sasttdata.codeid.length === 4) { base.sasttdata.codeid = base.sasttdata.codeid.slice(-2); }                                                              //ignore jslint - correct indentation

               DataService.post('api/sa/assasetup/sasttsavepdst', { data: { sasttdata: base.sasttdata, sasttpdst: self.extend }, busy: true }, function (data) {       //ignore jslint - correct indentation
                  if (data) {
                     if (noHardErrors(data)) {
                        saveModifiedDetailData();

                        //User Hook (do not rename)
                        if (self.sasttsavepdstContinue) {
                           self.sasttsavepdstContinue(data);
                        }
                     }
                  }
               });
               break;                                                                                                                                             //ignore jslint - correct indentation

            case 'slst':                                                                                                                                          //ignore jslint - correct indentation
               DataService.post('api/sa/assasetup/sasttsaveslst', { data: { sasttdata: base.sasttdata, sasttslst: self.extend }, busy: true }, function (data) {       //ignore jslint - correct indentation
                  if (data) {
                     if (noHardErrors(data)) {
                        saveModifiedDetailData();

                        //User Hook (do not rename)
                        if (self.sasttsaveslstContinue) {
                           self.sasttsaveslstContinue(data);
                        }
                     }
                  }
               });
               break;                                                                                                                                             //ignore jslint - correct indentation

            case 'vast':                                                                                                                                          //ignore jslint - correct indentation
               DataService.post('api/sa/assasetup/sasttsavevast', { data: { sasttdata: base.sasttdata, sasttvast: self.extend }, busy: true }, function (data) {       //ignore jslint - correct indentation
                  if (data) {
                     if (noHardErrors(data)) {
                        saveModifiedDetailData();

                        //User Hook (do not rename)
                        if (self.sasttsavevastContinue) {
                           self.sasttsavevastContinue(data);
                        }
                     }
                  }
               });
               break;                                                                                                                                             //ignore jslint - correct indentation

         } // switch

      } // saveModifiedExtendedData();

      if (self.sasttcodes.extendedfl === 'y') {
         // Save Extend first then if no errors save Detail by calling saveModifiedDetailData
         saveModifiedExtendData();
      } // if extended
      else {
         // only modify Detail
         saveModifiedDetailData();
      }

   }; // updateRecord

   this.createRecord = function (self, base, sasttdata, scope, callback) {

      self.sasttcodes = {
         codeid: base.criteria.codeid,
         descrip: base.sasttcodes.descrip,
         fieldtype: base.sasttcodes.fieldtype,
         filename: base.sasttcodes.filename,
         fieldlabel: base.sasttcodes.fieldlabel,
         fieldlabel2: base.sasttcodes.fieldlabel2,
         fieldtype2: base.sasttcodes.fieldtype2,
         fieldsize2: base.sasttcodes.fieldsize2,
         fieldsize: base.sasttcodes.fieldsize,
         descsize: base.sasttcodes.descsize,
         extendedfl: base.sasttcodes.extendedfl,
         multlangfl: base.sasttcodes.multlangfl,
         codeval2fl: base.sasttcodes.codeval2fl,
         vendfl: base.sasttcodes.vendfl,
         pricefl: base.sasttcodes.pricefl,
         desclabel: base.sasttcodes.desclabel,
         userfield: base.sasttcodes.userfield
      };

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      // ensure the proper key data is passed to the create SI call, this should be called prior to creating a new record
      function setKeyData() {

         self.detail.codeid = base.criteria.codeid;

         switch (self.sasttcodes.filename) {
            case 'a':                                                                                    //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
            case 'cmst':                                                                                 //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
            case 'cts':                                                                                  //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               self.detail.codechar2 = self.detail.codeval2;                                             //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
            case 'n':                                                                                    //ignore jslint - correct indentation
               // uses self.detail.codeint
               break;                                                                                    //ignore jslint - correct indentation
            case 'pdst':                                                                                 //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
            case 'slst':                                                                                 //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
            case 'vast':                                                                                 //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
            case 'wmst':                                                                                 //ignore jslint - correct indentation
               self.detail.codechar = self.detail.codeval;                                               //ignore jslint - correct indentation
               break;                                                                                    //ignore jslint - correct indentation
         } // switch

      } // setKeyData

      self.createDetailData = function () {

         setKeyData();

         DataService.post('api/sa/assasetup/sasttcreate', { data: { sasttcodes: self.sasttcodes, sasttdata: self.detail }, busy: true }, function (data) {
            if (data) {
               if (noHardErrors(data)) {
                  base.sasttdata = data.sasttdata;
                  callback(base.sasttdata);
               }
            }
         });
      };

      self.createDetailData();

   }; // createRecord

   this.deleteRecord = function (self, base, sastt, scope, callback) {

      self.sasttcodes = {
         filename: base.sasttcodes.filename
      };

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.post('api/sa/assasetup/sasttdelete', { data: { sasttcodes: self.sasttcodes, sasttdata: base.sasttdata }, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               callback(data);
            }
         }
      });

   }; // deleteRecord

   this.deleteMultiple = function (self, base, records, scope, callback) {

      self.sasttcodes = {
         filename: base.sasttcodes.filename
      };

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      records.forEach(function (record) {
         DataService.post('api/sa/assasetup/sasttdelete', { data: { sasttcodes: self.sasttcodes, sasttdata: record }, busy: true }, function (data) {
            if (data) {
               if (noHardErrors(data)) {
                  callback(data);
               }
            }
         });
      });

   }; // deleteMultiple

}); // SasttService