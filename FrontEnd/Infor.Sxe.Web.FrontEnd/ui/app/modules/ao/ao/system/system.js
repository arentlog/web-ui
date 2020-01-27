'use strict';

app.controller('AoSystemCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, ModalService, UserService) { //as sysdtl
   var self = this;
   var base = $scope.base;
   var subject = 'System';
   var dictionary = {
      activefl: 'Active',
      sAAllowExpandedNameAddress: 'Allow Expanded Name/Address Length',
      cmupdarfl: 'Interface to Accounts Receivable from CM Prospects',
      disableWildCardFilters: 'Disable Auto Wildcard Usage for Keyword Lookup Search Fields With a Lookup Button',
      iccommcatfl: 'Interface To Commerce Catalog',
      iccommcaticscfl: 'Interface ICSC Records',
      interval: 'Interval',
      lbold: 'Bold',
      llandscape: 'Landscape',
      lookupwildfl: 'Disable Auto Wildcard Usage for Keyword Lookup Keys Field and Search Fields',
      lpdf: 'PDF Conversion for View and E-Mail',
      mIMEEmail: 'MIME Email for Unix',
      maxRecordCount: 'Maximum Record Count for Keyword Lookups',
      maxsysjobs10: '09:00 - 10:00',
      maxsysjobs11: '10:00 - 11:00',
      maxsysjobs12: '11:00 - 12:00',
      maxsysjobs13: '12:00 - 13:00',
      maxsysjobs14: '13:00 - 14:00',
      maxsysjobs15: '14:00 - 15:00',
      maxsysjobs16: '15:00 - 16:00',
      maxsysjobs17: '16:00 - 17:00',
      maxsysjobs18: '17:00 - 18:00',
      maxsysjobs19: '18:00 - 19:00',
      maxsysjobs1: '00:00 - 01:00',
      maxsysjobs20: '19:00 - 20:00',
      maxsysjobs21: '20:00 - 21:00',
      maxsysjobs22: '21:00 - 22:00',
      maxsysjobs23: '22:00 - 23:00',
      maxsysjobs24: '23:00 - 24:00',
      maxsysjobs2: '01:00 - 02:00',
      maxsysjobs3: '02:00 - 03:00',
      maxsysjobs4: '03:00 - 04:00',
      maxsysjobs5: '04:00 - 05:00',
      maxsysjobs6: '05:00 - 06:00',
      maxsysjobs7: '06:00 - 07:00',
      maxsysjobs8: '07:00 - 08:00',
      maxsysjobs9: '08:00 - 09:00',
      oASActivitiesFl: 'Create CAM Activities (Instead of CM Activities)',
      phonemask: 'Phone # Format',
      pwmaxattempt: 'Number of Invalid Login Attempts Before User Account Disabled',
      pwmaxdays: 'Maximum Days Before Password Expires',
      pwmaxlength: 'Maximum Password Length',
      pwminalpha: 'Minimum Number of Alpha Characters',
      pwmindays: 'Minimum Days Until Password can be Changed',
      pwminlength: 'Minimum Password Length',
      pwminnumeric: 'Minimum Number of Numeric Characters',
      pwminprev: 'Number of Previous Passwords That Cannot be Used',
      pwminspecial: 'Minimum Number of Special Characters',
      rsminutes: 'Timeout (Minutes)',
      rspasswd: 'Password',
      rsseconds: 'Timeout (Seconds)',
      securityLogDir: 'Directory',
      syncmddarscfl: 'Synchronize Customers',
      syncmddarssfl: 'Synchronize Shipto\'s',
      syncmddcontactsfl: 'Synchronize CAM Contacts',
      syncmddicscfl: 'Synchronize Catalog Products',
      syncmddicspfl: 'Synchronize Products',
      syncmddoeehfl: 'Synchronize Orders',
      sysadminuser: 'System Admin User',
      url: 'URL',
      usercando1: 'User Field 1 - Validation',
      usercando2: 'User Field 2 - Validation',
      usercando3: 'User Field 3 - Validation',
      usercando4: 'User Field 4 - Validation',
      usercando5: 'User Field 5 - Validation',
      usercando10: 'User Field 10 - Validation',
      usercando11: 'User Field 11 - Validation',
      usercando12: 'User Field 12 - Validation',
      usercando13: 'User Field 13 - Validation',
      usercando14: 'User Field 14 - Validation',
      usercando15: 'User Field 15 - Validation',
      usercando16: 'User Field 16 - Validation',
      usercando17: 'User Field 17 - Validation',
      usercando18: 'User Field 18 - Validation',
      usercando19: 'User Field 19 - Validation',
      usercando20: 'User Field 20 - Validation',
      usercando21: 'User Field 21 - Validation',
      usercando22: 'User Field 22 - Validation',
      usercando23: 'User Field 23 - Validation',
      usercando24: 'User Field 24 - Validation',
      userdatemax8: 'User Field 8 - Max',
      userdatemax9: 'User Field 9 - Max',
      userdatemin8: 'User Field 8 - Min',
      userdatemin9: 'User Field 9 - Min',
      userinuse1: 'User Field 1 - In Use',
      userinuse2: 'User Field 2 - In Use',
      userinuse3: 'User Field 3 - In Use',
      userinuse4: 'User Field 4 - In Use',
      userinuse5: 'User Field 5 - In Use',
      userinuse6: 'User Field 6 - In Use',
      userinuse7: 'User Field 7 - In Use',
      userinuse8: 'User Field 8 - In Use',
      userinuse9: 'User Field 9 - In Use',
      userinuse10: 'User Field 10 - In Use',
      userinuse11: 'User Field 11 - In Use',
      userinuse12: 'User Field 12 - In Use',
      userinuse13: 'User Field 13 - In Use',
      userinuse14: 'User Field 14 - In Use',
      userinuse15: 'User Field 15 - In Use',
      userinuse16: 'User Field 16 - In Use',
      userinuse17: 'User Field 17 - In Use',
      userinuse18: 'User Field 18 - In Use',
      userinuse19: 'User Field 19 - In Use',
      userinuse20: 'User Field 20 - In Use',
      userinuse21: 'User Field 21 - In Use',
      userinuse22: 'User Field 22 - In Use',
      userinuse23: 'User Field 23 - In Use',
      userinuse24: 'User Field 24 - In Use',
      userlabel1: 'User Field 1 - Label',
      userlabel2: 'User Field 2 - Label',
      userlabel3: 'User Field 3 - Label',
      userlabel4: 'User Field 4 - Label',
      userlabel5: 'User Field 5 - Label',
      userlabel6: 'User Field 6 - Label',
      userlabel7: 'User Field 7 - Label',
      userlabel8: 'User Field 8 - Label',
      userlabel9: 'User Field 9 - Label',
      userlabel10: 'User Field 10 - Label',
      userlabel11: 'User Field 11 - Label',
      userlabel12: 'User Field 12 - Label',
      userlabel13: 'User Field 13 - Label',
      userlabel14: 'User Field 14 - Label',
      userlabel15: 'User Field 15 - Label',
      userlabel16: 'User Field 16 - Label',
      userlabel17: 'User Field 17 - Label',
      userlabel18: 'User Field 18 - Label',
      userlabel19: 'User Field 19 - Label',
      userlabel20: 'User Field 20 - Label',
      userlabel21: 'User Field 21 - Label',
      userlabel22: 'User Field 22 - Label',
      userlabel23: 'User Field 23 - Label',
      userlabel24: 'User Field 24 - Label',
      usermax1: 'User Field 1 - Length',
      usermax2: 'User Field 2 - Length',
      usermax3: 'User Field 3 - Length',
      usermax4: 'User Field 4 - Length',
      usermax5: 'User Field 5 - Length',
      usermax6: 'User Field 6 - Max',
      usermax7: 'User Field 7 - Max',
      usermin6: 'User Field 6 - Min',
      usermin7: 'User Field 7 - Min',
      usermax10: 'User Field 10 - Length',
      usermax11: 'User Field 11 - Length',
      usermax12: 'User Field 12 - Length',
      usermax13: 'User Field 13 - Length',
      usermax14: 'User Field 14 - Length',
      usermax15: 'User Field 15 - Length',
      usermax16: 'User Field 16 - Length',
      usermax17: 'User Field 17 - Length',
      usermax18: 'User Field 18 - Length',
      usermax19: 'User Field 19 - Length',
      usermax20: 'User Field 20 - Length',
      usermax21: 'User Field 21 - Length',
      usermax22: 'User Field 22 - Length',
      usermax23: 'User Field 23 - Length',
      usermax24: 'User Field 24 - Length',
      xMLEmailCommand: 'E-mail Command', 
      genIDMEmailAddr: 'IDM From Email Address',
      genIDMEmailName: 'IDM From Email Name',
      lIDMCopySaveFl: 'Save Print/Email Report Copies to IDM',
      lIDMFileFl: 'Save File Reports to IDM',
      lIDMEmailFl: 'Email Reports to IDM',
      lDSTEnableFl: 'Cloud Server Enable Daylight Saving Time'
   };

   self.hasExtendedUserFields = false;

   self.text = $translate.instant('global.text');
   self.number = $translate.instant('global.number');
   self.date = $translate.instant('global.date');
   self.tablesWithExtendedUserFields = ['arsc', 'arss', 'apss', 'apsv', 'icsc', 'icsd', 'icsp', 'icsw', 'oeeh', 'oeel', 'poeh', 'poel', 'wteh', 'wtel'];

   self.aoSystem = {};

   self.zeroForNoMax = $translate.instant('message.enter.zero.0.for.no.maximum.record.count');
   self.logDirMessage = $translate.instant('message.writes.security.specific.error.message.to.a.file.c');
   self.xmlEmailMessage = $translate.instant('global.command.line.script.for.xml.report.e.mail.output');

   base.getConfigurationData(subject);

   // Load System data
   DataService.get('api/shared/assharedentry/aosystemload', { busy: true }, function (data) {
      if (data) {
         self.aoSystem = data;
         self.original = angular.copy(self.aoSystem);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoSystem, self.original).length);
   };

   // Load User Fields data
   self.load = function () {

      self.aoSystemUserFields = { tablename: self.userFieldTable };

      self.hasExtendedUserFields = self.tablesWithExtendedUserFields.includes(self.userFieldTable);

      DataService.post('api/shared/assharedentry/aosystemuserfldsload', { data: self.aoSystemUserFields, busy: true }, function (data) {
         if (data) {
            self.aoSystemUserFields = data;
            self.originalUserFields = angular.copy(self.aoSystemUserFields);
         }
      });
   };

   //load the drop down for the user fields (instead of dynamic option)
   DataService.get('api/shared/assharedentry/aosystemusertableload', { busy: true }, function (data) {
      self.userFieldTypes = data; //using this in place of dynamic options from meta because we need to set the value to the first record
      self.userFieldTypes = self.userFieldTypes.sort(function (a, b) {
         var x = a.descrip.trim().toLowerCase();
         var y = b.descrip.trim().toLowerCase();
         return x < y ? -1 : x > y ? 1 : 0;
      });
      self.userFieldTable = self.userFieldTypes[0].tablename; //sets selection to first record
      self.load(); //initial data load (must be based on selection)
   });

   self.dropDownChanged = function () {
      if (base.hasChanges(self.aoSystemUserFields, self.originalUserFields).length) {
         MessageService.okCancel('global.alert', 'question.there.might.be.unsaved.changes.do.you.still.wish.', function () {
            self.load(false);
         }, function () {
            self.userFieldTable = self.aoSystemUserFields.tablename;
         });
      } else {
         self.load(false);
      }
   };

   self.lpdfChanged = function () {
      if (!self.aoSystem.lpdf) {
         self.aoSystem.llandscape = false;
         self.aoSystem.lbold = false;
      }
   };

   self.checkField = function (field) {
      var max = 0;
      switch (field) {
         case 1:                                            //ignore jslint - correct indentation
         case 2:                                            //ignore jslint - correct indentation
            max = 8;                                        //ignore jslint - correct indentation
            break;                                          //ignore jslint - correct indentation
         case 3:                                            //ignore jslint - correct indentation
         case 4:                                            //ignore jslint - correct indentation
         case 5:                                            //ignore jslint - correct indentation
            max = 78;                                       //ignore jslint - correct indentation
            break;                                          //ignore jslint - correct indentation
      }
      if (self.aoSystemUserFields['usermax' + field] > max) {
         self.aoSystemUserFields['usermax' + field] = self.originalUserFields['usermax' + field];
         MessageService.error('global.error', 'message.invalid.value');
      }
   };

   self.maxSizeLabel = function (size) {
      return $translate.instant('global.maximum') + ' ' + size;
   };

   self.validatePhoneMask = function () {
      var mask = '';
      if (self.aoSystem.phonemask) {
         if (self.aoSystem.phonemask === mask) {
            return false;
         } else {
            self.aoSystem.phonemask.forEach(function (letter) {
               switch (letter.toLowerCase()) {
                  case 'x':                                          //ignore jslint - correct indentation
                     mask += 'x';                                    //ignore jslint - correct indentation
                     break;                                          //ignore jslint - correct indentation
                  case ' ':                                          //ignore jslint - correct indentation
                  case '-':                                          //ignore jslint - correct indentation
                  case '/':                                          //ignore jslint - correct indentation
                  case '[':                                          //ignore jslint - correct indentation
                  case ']':                                          //ignore jslint - correct indentation
                  case '(':                                          //ignore jslint - correct indentation
                  case ')':                                          //ignore jslint - correct indentation
                     mask += letter;                                 //ignore jslint - correct indentation
                     break;                                          //ignore jslint - correct indentation
                  default:                                           //ignore jslint - correct indentation
                     return false;                                   //ignore jslint - correct indentation
               }
            });
            self.aoSystem.phonemask = mask;
            return true;
         }
      } else {
         return false;
      }
   };

   self.fillNotes = function () { //using in place of base because we need to do UserFields as well as System
      var list = [];
      var results = base.hasChanges(self.aoSystem, self.original, []);
      var countChanges = results.length;
      if (results.length) {
         results.forEach(function (diff) {
            //SL code had a list of unsaved notes, but there should never be unsaved notes, so that code is omitted here
            if (dictionary[diff]) {
               list.push({
                  Function: dictionary[diff],
                  Value: base.getConvertedValue(diff, self.aoSystem, self.aoSystem[diff]),
                  Oper: UserService.getUserName(),
                  Note: '' // would put unsaved note here, if any (see above comment)
               });
            }
         });
      }
      results = base.hasChanges(self.aoSystemUserFields, self.originalUserFields, []);
      countChanges += results.length;
      if (results.length) {
         results.forEach(function (diff) {
            //SL code had a list of unsaved notes, but there should never be unsaved notes, so that code is omitted here
            if (dictionary[diff]) {
               list.push({
                  Function: self.userFieldTable + ' : ' + dictionary[diff],
                  Value: base.getConvertedValue(diff, self.aoSystemUserFields, self.aoSystemUserFields[diff]),
                  Oper: UserService.getUserName(),
                  Note: '' // would put unsaved note here, if any (see above comment)
               });
            }
         });
      }
      if (countChanges) {
         base.notesPopup = {
            list: list,
            callback: self.submit
         };
         ModalService.showModal('ao/ao/shared/notes-popup.json', 'AoNotesPopupModalCtrl as mod', $scope, function (modal) {
            base.notesPopup.modal = modal;
         });
      }
      return results.length;
   };

   self.reset = function () {
      self.aoSystem = angular.copy(self.original);
      self.aoSystemUserFields = angular.copy(self.originalUserFields);
      base.reset();
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aosystemuserfldssave', { data: self.aoSystemUserFields, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.originalUserFields = angular.copy(self.aoSystemUserFields);
            var submitFinal = function () {
               DataService.post('api/shared/assharedentry/aosystemsave', { data: self.aoSystem, busy: true }, function (data) {
                  if (!MessageService.processMessaging(data)) {
                     self.original = angular.copy(self.aoSystem);
                     base.saveLog(subject);
                  }
               });
            };
            submitFinal();
         }
      });
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoSystem, self.original).length || base.hasChanges(self.aoSystemUserFields, self.originalUserFields).length) {
            self.fillNotes();
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.validate = function () {
      if (!self.validatePhoneMask) {
         MessageService.error('global.error', 'message.must.be.x.dash.slash.open.bracket.closed.bracket.open.paren.closed.parenand.blank');
         $state.go('ao.system.options');
         return false;
      }
      return true;
   };

   self.independent = function () {
      switch ($state.current.name) {
         case 'ao.system.function-types':                                  //ignore jslint - correct indentation
         case 'ao.system.menu-items':                                      //ignore jslint - correct indentation
         case 'ao.system.report-items':                                    //ignore jslint - correct indentation
         case 'ao.system.function-types.detail':                           //ignore jslint - correct indentation
         case 'ao.system.menu-items.edit':                                 //ignore jslint - correct indentation
         case 'ao.system.report-items.edit':                               //ignore jslint - correct indentation
            return true;                                                   //ignore jslint - correct indentation
         default:                                                          //ignore jslint - correct indentation
            return false;                                                  //ignore jslint - correct indentation
      }
   };
}); //end sysdtl

app.controller('AoSystemFunctionTypeCtrl', function ($scope, $state, $translate, DataService, MessageService, GridService) { //as functype
   var self = this;

   // menu functions load
   DataService.get('api/shared/assharedentry/aosystemfunctypload', { busy: true }, function (data) {
      if (data) {
         self.menufunctionsdataset = data;
      }
   });

   self.drilldown = function (e, args) {
      $state.go('.detail', { record: args[0].item });
   };

   self.delete = function () {
      var record = GridService.getSelectedRecord(self.menufunctionsgrid);
      if (record) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.post('api/shared/assharedentry/aosystemfunctypdelete', { data: record, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               $state.go('.', { reload: '.' });
            });
         });
      }
   };

   self.copy = function () {
      var orig = GridService.getSelectedRecord(self.menufunctionsgrid);
      $state.go('.detail', {
         record: {
            typeCode: orig.typeCode,
            runName: orig.runName,
            keyLabel: orig.keyLabel,
            browseLabel: orig.browseLabel,
            procLabel: orig.procLabel,
            typeDialog: orig.typeDialog,
            name: orig.name,
            paramFlag: orig.paramFlag,
            keyLabelReqFL: orig.keyLabelReqFL,
            browseLabelReqFL: orig.browseLabelReqFL,
            procLabelReqFL: orig.procLabelReqFL,
            standardty: orig.standardty,
            origin: orig.origin
         }
      });
   };
}); //end functype

app.controller('AoSystemFunctionTypeDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as funcdtl
   var self = this;
   var base = $scope.base;
   self.password = '';

   if ($stateParams.record) {
      self.selectedFunctionType = $stateParams.record;
   } else {
      self.selectedFunctionType = {
         paramFlag: true,
         standardty: 'A'
      };
   }
   if (!self.selectedFunctionType.pvSassmTypesRowid) {
      self.newRecord = true;
   } else {
      self.passwordRequired = (self.selectedFunctionType.origin === 'nxt');
   }
   self.original = angular.copy(self.selectedFunctionType);

   self.save = function () {
      self.validate(function (ok) {
         if (ok) {
            DataService.post('api/shared/assharedentry/aosystemfunctypsave', { data: self.selectedFunctionType, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^', { reload: '^' });
            });
         }
      });
   };

   self.reset = function () {
      self.selectedFunctionType = angular.copy(self.original);
   };

   self.delete = function () {
      if (!self.newRecord) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.post('api/shared/assharedentry/aosystemfunctypdelete', { data: self.selectedFunctionType, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               $state.go('^', { reload: '^' });
            });
         });
      }
   };

   self.validate = function (callback) {
      if (!self.passwordRequired) {
         callback(true);
         return;
      };
      var params = {
         password: self.password
      };
      DataService.get('api/shared/authpoints/checkcredentials', { params: params, busy: true }, function (ok) {
         if (!ok) {
            MessageService.error('global.error', 'global.incorrect.password');
         }
         callback(ok);
      });
   };
}); //end funcdtl

//Alias: menuitem
app.controller('AoSystemMenuItemsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService) { //as menuitem
   var self = this;

   self.aosystemmenuitem = {};
   self.languageTypes = [];
   self.languageTypes.push({
      codeval: '',
      descrip: 'Default-Language',
      trmgrlang: '',
      userfield: ''
   });
   // Manually build Language Drop Down
   DataService.get('api/shared/assharedentry/aosystemlanguageload', { busy: true }, function (data) {
      if (data && data.aosystemlanguage && data.aosystemlanguage.length) {
         self.languageTypes = data.aosystemlanguage;
      }
   });

   DataService.post('api/pv/pvsassmtypes/getallpvsassmtypeslist', { data: {}, busy: true }, function (typeList) {
      self.recordTypeList = typeList;
   });

   self.validate = function () {
      if (!self.selectedMenuItem.functionname) {
         MessageService.error('functionname', 'message.this.is.a.required.field');
         return false;
      }
      if (!self.newRecord && !self.selectedMenuItem.menutitle) {
         MessageService.error('menutitle', 'message.this.is.a.required.field');
         return false;
      }
      if (!self.newRecord && !self.selectedMenuItem.buttontitle) {
         MessageService.error('buttontitle', 'message.this.is.a.required.field');
         return false;
      }
      if (!self.selectedMenuItem.windowtitle) {
         MessageService.error('windowtitle', 'message.this.is.a.required.field');
         return false;
      }
      if (!self.selectedMenuItem.menuset) {
         MessageService.error('menuset', 'message.this.is.a.required.field');
         return false;
      }
      if (self.dataset.length) {
         self.dataset.forEach(function (row) {
            if (self.dataset.indexOf(row) !== self.dataset.lastIndexOf(row)) {
               MessageService.error('global.error', 'message.duplicate.label.not.allowed');
               return false;
            }
         });
      }
      return true;
   };

   self.menuItemRecTypeChange = function () {
      if (self.selectedMenuItem) {
         DataService.post('api/shared/assharedentry/aosystemmenuitemrectypload', { data: { typeCode: self.selectedMenuItem.recordtype }, busy: true }, function (recType) {
            self.aoSystemMenuItemRecordType = recType;
         });
      }
   };

   self.menuItemLoad = function () {
      if (!self.selectedMenuSet) {
         self.selectedMenuSet = 'pv';
      }

      self.aosystemmenuitem = { functionname: self.selectedMenuFunction, trmgrlang: self.selectedMenuItemLanguage, menuset: self.selectedMenuSet };

      DataService.post('api/shared/assharedentry/aosystemmenuitemload', { data: self.aosystemmenuitem, busy: true }, function (data) {
         if (data) {
            if (data.aosystemmenuitem) {
               self.selectedMenuItem = data.aosystemmenuitem;
               self.originalMenuItem = angular.copy(self.selectedMenuItem);
               DataService.post('api/shared/assharedentry/aosystemmenuitemrectypload', { data: { typeCode: self.selectedMenuItem.recordtype }, busy: true }, function (recType) {
                  self.aoSystemMenuItemRecordType = recType;
               });
            }
            if (data.aosystemmenuitemext) {
               self.dataset = data.aosystemmenuitemext;
               self.originalDataset = angular.copy(self.dataset);
            }
         }
      }, function () {
         self.selectedMenuItem = null;
         self.originalMenuItem = null;
         self.dataset = [];
         self.originalDataset = [];
      });
   };

   self.editMode = function () {
      return ($state.current.url === '/edit');
   };

   self.edit = function () {
      self.newRecord = false;
      $state.go('.edit');
   };

   self.create = function () {
      self.selectedMenuFunction = '';
      self.selectedMenuSet = '';
      self.selectedMenuItem = {
         standardty: 'A' //based on "StandardType" option in "options-static-common.json"
      };
      self.originalMenuItem = angular.copy(self.selectedMenuItem);
      self.dataset = [];
      self.newRecord = true;
      $state.go('.edit');
   };

   self.copy = function () {
      self.selectedMenuItem = {
         copymenuset: self.selectedMenuItem.menuset,
         copyfunctionname: self.selectedMenuItem.functionname
      };
      self.originalMenuItem = angular.copy(self.selectedManuItem);
      self.dataset = [];
      self.newRecord = true;
      $state.go('.edit');
   };

   self.cancel = function () {
      self.reset();
      self.newRecord = false;
      $state.go('^');
   };

   self.reset = function () {
      self.selectedMenuItem = angular.copy(self.originalMenuItem);
      self.dataset = angular.copy(self.originalDataset);
   };

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.post('api/shared/assharedentry/aosystemmenuitemdelete', { data: { aosystemmenuitem: self.selectedMenuItem, aosystemmenuitemext: self.dataset }, busy: true }, function () {
            self.selectedMenuFunction = '';
            self.selectedMenuSet = '';
            self.selectedMenuItem = null;
            self.originalMenuItem = null;
            self.dataset = [];
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
         });
      });
   };

   self.save = function () {
      if (self.newRecord) {
         var params = {
            menuSet: self.selectedMenuItem.menuset,
            functionName: self.selectedMenuItem.functionname,
            trmgrlang: self.selectedMenuItemLanguage
         };
         DataService.get('api/pv/pvsassm/existsbypk', { params: params, busy: true }, function (data) {
            if (!data) {
               if (self.validate()) {
                  var newMenuItem = {
                     copymenuset: self.selectedMenuItem.copymenuset,
                     copyfunctionname: self.selectedMenuItem.copyfunctionname,
                     trmgrlang: self.selectedMenuItemLanguage,
                     menuset: self.selectedMenuItem.menuset,
                     functionname: self.selectedMenuItem.functionname,
                     windowtitle: self.selectedMenuItem.windowtitle
                  };
                  DataService.post('api/shared/assharedentry/aosystemmenuitemnewsave', { data: newMenuItem, busy: true }, function () {
                     self.selectedMenuFunction = newMenuItem.functionname;
                     self.selectedMenuSet = newMenuItem.menuset;
                     self.selectedMenuItemLanguage = newMenuItem.trmgrlang;
                     self.menuItemLoad();
                     MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     $state.go('^');
                     self.newRecord = false;
                  });
               }
            } else {
               MessageService.error('global.error', 'global.record.already.exists');
            }
         });
      } else {
         if (self.validate()) {
            var position = 1;
            self.dataset.forEach(function (row) {
               row.position = position++;
            });
            DataService.post('api/shared/assharedentry/aosystemmenuitemsave', { data: { aosystemmenuitem: self.selectedMenuItem, aosystemmenuitemext: self.dataset, aosystemmenuitemrectyp: self.aoSystemMenuItemRecordType }, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  self.selectedMenuFunction = self.selectedMenuItem.functionname;
                  self.selectedMenuSet = self.selectedMenuItem.menuset;
                  self.selectedMenuItemLanguage = self.selectedMenuItem.trmgrlang;
                  self.menuItemLoad();
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^');
               }
            });
         }
      }
   };

   self.addSubItem = function (place) { //place is 0 if before and 1 if after
      var record = GridService.getSelectedRecord(self.grid);
      var index = self.dataset.length;
      if (record) {
         index = self.dataset.indexOf(record) + place;
      }
      self.dataset.splice(index, 0, {});
   };

   self.deleteSubItems = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var records = GridService.getSelectedRecords(self.grid);
         if (records && records.length) {
            records.forEach(function (row) {
               self.dataset.splice(self.dataset.indexOf(row), 1);
            });
         }
      });
   };
}); //end menuitem

app.controller('AoSystemReportItemsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as reportitem
   var self = this;

   self.selectedLanguage = '';
   self.selectedFunction = '';
   self.functionName = '';
   self.widthOption = [
      {
         label: $translate.instant('number.80'),
         value: false
      }, {
         label: $translate.instant('number.132'),
         value: true
      }
   ];

   self.languageTypes = [];
   self.languageTypes.push({
      codeval: '',
      descrip: 'Default-Language',
      trmgrlang: '',
      userfield: ''
   });
   //Manually build Language Drop Down
   DataService.get('api/shared/assharedentry/aosystemlanguageload', { busy: true }, function (data) {
      if (data && data.aosystemlanguage && data.aosystemlanguage.length) {
         self.languageTypes = data.aosystemlanguage;
      }
   });

   //default selection
   self.printParameter = 'isRangeSelected';

   // reportItemsLoad
   self.reportItemsLoad = function () {
      var aosystemrptitem = { currproc: self.selectedFunction, trmgrlang: self.selectedLanguage };

      DataService.post('api/shared/assharedentry/aosystemrptitemload', { data: [aosystemrptitem], busy: true }, function (data) {
         if (data) {
            self.selectedReportItem = data.aosystemrptitem[0];
            self.selectedLanguage = self.selectedReportItem.trmgrlang;
            self.originalReportItem = angular.copy(self.selectedReportItem);
            self.reportItemRangedataset = data.aosystemrptitemr;
            self.originalRangedataset = angular.copy(self.reportItemRangedataset);
            self.displayOptionSet(data.aosystemrptitemo);
            self.originalOptiondataset = angular.copy(self.reportItemOptiondataset);
         }
      }, function () {
         self.selectedReportItem = null;
         self.originalReportItem = null;
         self.reportItemRangedataset = null;
         self.originalRangedataset = null;
         self.reportItemOptiondataset = null;
         self.originalOptiondataset = null;
      });
   };

   self.displayOptionSet = function (rptOptions) {
      self.reportItemOptiondataset = [];
      rptOptions.forEach(function (rptOpt) {
         if (rptOpt.editType2.toLowerCase() === 'q') {
            switch (rptOpt.optdef.toLowerCase()) {
               case 'n':                                 //ignore jslint - correct indentation
               case 'no':                                //ignore jslint - correct indentation
                  rptOpt.optdef = 'no';                  //ignore jslint - correct indentation
                  break;                                 //ignore jslint - correct indentation
               case 'y':                                 //ignore jslint - correct indentation
               case 'yes':                               //ignore jslint - correct indentation
                  rptOpt.optdef = 'yes';                 //ignore jslint - correct indentation
                  break;                                 //ignore jslint - correct indentation
            }
         }
         self.reportItemOptiondataset.push(rptOpt);
      });
   };

   self.editMode = function () {
      return ($state.current.url === '/edit');
   };

   var fillArray = function (item, count) {
      var array = [];
      for (var i = 0; i < count; i++) {
         array.push(angular.copy(item));
         array[i].iNumber = i + 1;
      }
      return array;
   };

   self.new = function () {
      self.selectedReportItem = {};
      self.originalReportItem = angular.copy(self.selectedReportItem);
      self.reportItemRangedataset = fillArray({
         rangeNm: '',
         requireFl: false,
         rfLength: 0,
         editType1: ''
      }, 20);
      self.originalRangedataset = angular.copy(self.reportItemRangedataset);
      self.reportItemOptiondataset = fillArray({
         editType2: '',
         oRequireFl: false,
         ofLength: 0,
         optdef: '',
         optionNm: '',
         optvaluea: '',
         optvalueb: '',
         optvaluec: '',
         optvalued: '',
         optvaluee: ''
      }, 20);
      self.originalOptiondataset = angular.copy(self.reportItemOptiondataset);
      self.newRecord = true;
      $state.go('.edit');
   };

   self.copy = function () {
      self.selectedReportItem = {
         copycurrproc: self.selectedReportItem.currproc,
         reportid: self.selectedReportItem.reportid
      };
      self.selectedLanguage = self.selectedReportItem.trmgrlang;
      self.originalReportItem = angular.copy(self.selectedReportItem);
      self.newRecord = true;
      $state.go('.edit');
   };

   self.edit = function () {
      self.newRecord = false;
      $state.go('.edit');
   };

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var deleteParams = {
            aosystemrptitem: self.selectedReportItem,
            aosystemrptitemo: self.reportItemOptiondataset,
            aosystemrptitemr: self.reportItemRangedataset
         };
         DataService.post('api/shared/assharedentry/aosystemrptitemdelete', { data: deleteParams, busy: true }, function () {
            self.selectedReportItem = null;
            self.originalReportItem = null;
            self.reportItemRangedataset = null;
            self.originalRangedataset = null;
            self.reportItemOptiondataset = null;
            self.originalOptiondataset = null;
            self.selectedFunction = '';
         });
      });
   };

   self.reset = function () {
      self.selectedReportItem = self.originalReportItem;
      self.reportItemRangedataset = self.originalRangedataset;
      self.reportItemOptiondataset = self.originalOptiondataset;
   };

   self.cancel = function () {
      self.reset();
      self.newRecord = false;
      $state.go('^');
   };

   self.save = function () {
      if (self.newRecord) {
         var params = {
            currproc: self.selectedReportItem.currproc,
            trmgrlang: self.selectedLanguage
         };
         DataService.get('api/sa/sassr/existsbypk', { params: params, busy: true }, function (data) {
            if (data) {
               MessageService.error('global.error', 'global.record.already.exists');
            } else {
               if (self.validate()) {
                  var saveParams = {
                     copycurrproc: self.selectedReportItem.copycurrproc,
                     trmgrlang: self.selectedLanguage,
                     currproc: self.selectedReportItem.currproc,
                     rpttitle: self.selectedReportItem.rpttitle
                  };
                  DataService.post('api/shared/assharedentry/aosystemrptitemnewsave', { data: saveParams, busy: true }, function () {
                     self.selectedFunction = saveParams.currproc;
                     self.selectedLanguage = saveParams.trmgrlang;
                     self.reportItemsLoad();
                     MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     $state.go('^');
                     self.newRecord = false;
                  });
               }
            }
         });
      } else {
         if (self.validate()) {
            var saveParams = {
               aosystemrptitem: self.selectedReportItem,
               aosystemrptitemr: self.reportItemRangedataset,
               aosystemrptitemo: self.reportItemOptiondataset
            };
            DataService.post('api/shared/assharedentry/aosystemrptitemsave', { data: saveParams, busy: true }, function () {
               self.selectedFunction = saveParams.aosystemrptitem.currproc;
               self.selectedLanguage = saveParams.aosystemrptitem.trmgrlang;
               self.reportItemsLoad();
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^');
            });
         }
      }
   };

   self.validate = function () {
      if (!self.selectedReportItem.currproc) {
         MessageService.error('currproc', 'message.this.is.a.required.field');
         return false;
      }
      if (!self.selectedReportItem.rpttitle) {
         MessageService.error('rpttitle', 'message.this.is.a.required.field');
         return false;
      }
      if (!self.selectedReportItem.reportid) {
         MessageService.error('reportid', 'message.this.is.a.required.field');
         return false;
      }
      return true;
   };

   self.onRangeTypeChange = function (e, args) {
      if (args.oldValue !== args.value) {
         var record = self.reportItemRangedataset[args.row];

         switch (record.editType1.toLowerCase()) {
            case 'b':                                                                             //ignore jslint - correct indentation
               record.rfLength = 13;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'c':                                                                             //ignore jslint - correct indentation
               record.rfLength = 12;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'd':                                                                             //ignore jslint - correct indentation
               record.rfLength = 8;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'p':                                                                             //ignore jslint - correct indentation
            case 'w':                                                                              //ignore jslint - correct indentation
               record.rfLength = 4;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
         }
         var indNum = self.reportItemRangedataset.indexOf(record);
         self.reportItemRangeGrid.updateRow(indNum);
      }
   };

   self.onRangeLengthChange = function (e, args) {
      if (args.oldValue !== args.value) {
         var record = self.reportItemRangedataset[args.row];
         if (record.editType1 === 'b' || record.editType1 === 'c' || record.editType1 === 'd' || record.editType1 === 'p' || record.editType1 === 'w') {
            record.rfLength = args.oldValue;
         }
         var indNum = self.reportItemRangedataset.indexOf(record);
         self.reportItemRangeGrid.updateRow(indNum);
      }
   };

   self.onOptionsTypeChange = function (e, args) {
      if (args.oldValue !== args.value) {

         var record = self.reportItemOptiondataset[args.row];

         switch (record.editType2.toLowerCase()) {
            case 'b':                                                                             //ignore jslint - correct indentation
               record.ofLength = 13;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'c':                                                                             //ignore jslint - correct indentation
               record.ofLength = 12;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'd':                                                                             //ignore jslint - correct indentation
               record.ofLength = 8;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'p':                                                                              //ignore jslint - correct indentation
            case 'w':                                                                             //ignore jslint - correct indentation
               record.ofLength = 4;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
            case 'q':                                                                             //ignore jslint - correct indentation
               record.ofLength = 3;                                                               //ignore jslint - correct indentation
               break;                                                                              //ignore jslint - correct indentation
         }

         if (record.editType2 !== 'a') {
            record.optvaluea = record.optvalueb = record.optvaluec = record.optvalued = record.optvaluee = '';
         }

         if (record.editType2 === 'd' && record.optdef.length !== 8) {
            record.optdef = '**/**/**';
         } else if (record.editType2 === 'p' && record.optdef.length !== 4) {
            record.optdef = '****';
         } else if (record.editType2 === 'q') {
            switch (record.optdef.toLowerCase()) {                                              //ignore jslint - correct indentation
               case 'y':                                                                        //ignore jslint - correct indentation
               case 'yes':                                                                      //ignore jslint - correct indentation
                  record.optdef = 'yes'                                                         //ignore jslint - correct indentation
                  break;                                                                        //ignore jslint - correct indentation
               case 'n':                                                                        //ignore jslint - correct indentation
               case 'no':                                                                       //ignore jslint - correct indentation
                  record.optdef = 'no'                                                          //ignore jslint - correct indentation
                  break;                                                                        //ignore jslint - correct indentation
            }
         }

         var indNum = self.reportItemOptiondataset.indexOf(record);
         self.reportItemOptionGrid.updateRow(indNum);
      }
   };

   self.onDefaultChange = function (e, args) {
      if (args.oldValue !== args.value) {
         var dateRe = /^\d{1,2}\/\d{1,2}\/\d{2}$/; // regular expression to match required date format
         var periodRe = /^([a-z0-9]){4}$/; // regular expression to match required Period format
         var record = self.reportItemOptiondataset[args.row];
         if (record.editType2 === 'q') {
            switch (record.optdef.toLowerCase()) {                                              //ignore jslint - correct indentation
               case 'y':                                                                        //ignore jslint - correct indentation
               case 'yes':                                                                      //ignore jslint - correct indentation
                  record.optdef = 'yes'                                                         //ignore jslint - correct indentation
                  break;                                                                        //ignore jslint - correct indentation
               case 'n':                                                                        //ignore jslint - correct indentation
               case 'no':                                                                       //ignore jslint - correct indentation
                  record.optdef = 'no'                                                          //ignore jslint - correct indentation
                  break;                                                                        //ignore jslint - correct indentation
            }
         }
         else if (record.editType2 === 'd' && !(record.optdef.match(dateRe))) {
            record.optdef = '**/**/**';
         }
         else if (record.editType2 === 'p' && !(record.optdef.match(periodRe))) {
            record.optdef = '****';
         }
         var indNum = self.reportItemOptiondataset.indexOf(record);
         self.reportItemOptionGrid.updateRow(indNum);
      }
   };

   self.onOptionsLengthChange = function (e, args) {
      if (args.oldValue !== args.value) {
         var record = self.reportItemOptiondataset[args.row];
         if (record.editType2 === 'b' || record.editType2 === 'c' || record.editType2 === 'd' || record.editType2 === 'p' || record.editType2 === 'w' || record.editType2 === 'q') {
            record.ofLength = args.oldValue;
         }
         var indNum = self.reportItemOptiondataset.indexOf(record);
         self.reportItemOptionGrid.updateRow(indNum);
      }
   };

}); //end reportitem