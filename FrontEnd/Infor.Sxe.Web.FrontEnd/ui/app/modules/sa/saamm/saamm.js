'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saamm', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saamm');

   $stateProvider.state('saamm.export', {
      url: '/export',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/export.json');
            },
            controller: 'SaammExportCtrl as exp'
         }
      }
   });

   $stateProvider.state('saamm.import', {
      url: '/import',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/import.json');
            },
            controller: 'SaammImportCtrl as imp'
         }
      }
   });

   $stateProvider.state('saamm.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/detail.json');
            },
            controller: 'SaammDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('saamm.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/create/create.json');
            },
            controller: 'SaammCreateCtrl as create'
         }
      }
   });

   $stateProvider.state('saamm.finalupdate', {
      url: '/final-update',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/finalupdate.json');
            },
            controller: 'SaammFinalUpdateCtrl as fin'
         }
      }
   });

   $stateProvider.state('saamm.deleteset', {
      url: '/delete-set',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/deleteset.json');
            },
            controller: 'SaammDeleteSetCtrl as del'
         }
      }
   });

   $stateProvider.state('saamm.columnupdate', {
      url: '/column-update',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/columnupdate.json');
            },
            controller: 'SaammColumnUpdateCtrl as colupd'
         }
      }
   });

   $stateProvider.state('saamm.inquiry', {
      url: '/inquiry',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saamm/inquiry.json');
            },
            controller: 'SaammInquiryCtrl as inq'
         }
      }
   });
});

app.controller('SaammBaseCtrl', function ($state, AodataService, ConfigService, DataService, GridService, MessageService, PvUser, SecurityService, TabService) {
   var self = this;
   self.PvUser = PvUser;
   self.MENU_FUNCTION_SAAMM = 'saamm';
   self.subTitle = '';
   self.saammNewSet = {
      setname: '',
      tablename: '',
      descrip: '',
      outputty: 'n',
      copysetname: '',
      emailaddr: self.PvUser.email,
      recordcountlimit: 0
   };

   self.securityLevelSAAMM = SecurityService.getSecurityLevel(self.MENU_FUNCTION_SAAMM);
   self.dropboxtaxInterface = AodataService.getValue('sa', 'DropboxInterfaceFl').toLowerCase();
   self.saammNewSetCriteria = [];
   self.saammNewSetColumn = [];
   self.tableNameSecurity = [];
   self.setColumnData = [];
   self.tableSecurityLevel = 0;
   self.finalUpdateDelete = false;
   self.drillDownRecord = {};
   self.searchSetName = '';
   self.clearSoftLockSetName = '';
   self.key1Label = 'key';
   self.key2Label = '';
   self.key3Label = '';
   self.key4Label = '';
   self.key5Label = '';
   self.key2Included = false;
   self.key3Included = false;
   self.key4Included = false;
   self.key5Included = false;

   self.col01Label = 'column';
   self.col02Label = '';
   self.col03Label = '';
   self.col04Label = '';
   self.col05Label = '';
   self.col06Label = '';
   self.col07Label = '';
   self.col08Label = '';
   self.col09Label = '';
   self.col10Label = '';
   self.col02Included = false;
   self.col03Included = false;
   self.col04Included = false;
   self.col05Included = false;
   self.col06Included = false;
   self.col07Included = false;
   self.col08Included = false;
   self.col09Included = false;
   self.col10Included = false;

   self.criteria = {
      tablename: '',     
      setname: '',
      descrip: '',
      copysetname: '',
      begseqno: 0,
      endseqno: 0,
      statusoperation: '',
      statustype: '',
      recordcountlimit: 0
   };

   self.isMaster = function () {
      return $state.is('saamm.master');
   };

   self.includesMaster = function () {
      return $state.includes('saamm.master');
   };

   self.isDetail = function () {
      return $state.is('saamm.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saamm.detail');
   };

   self.isStep1 = function () {
      return $state.is('saamm.step1');
   };

   self.includesStep1 = function () {
      return $state.includes('saamm.step1');
   };

   self.isStep2 = function () {
      return $state.is('saamm.step2');
   };

   self.includesStep2 = function () {
      return $state.includes('saamm.step2');
   };

   self.isStep3 = function () {
      return $state.is('saamm.step3');
   };

   self.includesStep3 = function () {
      return $state.includes('saamm.step3');
   };

   self.isStep4 = function () {
      return $state.is('saamm.step4');
   };

   self.includesStep4 = function () {
      return $state.includes('saamm.step4');
   };

   self.isDropboxEnabled = function () {
      var retn = false;
      if (self.dropboxtaxInterface === 'yes' && self.PvUser.dropboxauthkey) {
         retn = true;
      }
      return retn;
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.begseqno = 0;
      self.criteria.endseqno = 0;
      self.criteria.statusoperation = '';
      self.criteria.statustype = '';
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.clearKeyColumns();
      self.clearColumns();
      self.setColumnData = [];
      self.tableSecurityLevel = 0;
  
      var crit = {
         ttblmmmaingridcriteria: self.criteria
      };
      DataService.post('/web/api/shared/mmmaingridretrievelaunch', { data: crit, busy: true}, function (data) {
         if (data) {           
            self.searchSetName = self.criteria.setname;
            self.subTitle = MessageService.get('global.set.name') + ': ' + self.searchSetName;
            self.dataset = data.ttblmmmaingridresults;
            if (data.ttblmmprimarykeys) {              
               self.setKeyColumns(data.ttblmmprimarykeys);
            }
            if (data.ttblmmmaingridcolumns) {
               self.setColumnData = data.ttblmmmaingridcolumns;
               self.setColumns(data.ttblmmmaingridcolumns);
            }
            if (data.ttblmmmaingridcriteria) {
               if (data.ttblmmmaingridcriteria.tablename && self.tableNameSecurity) {
                  self.tableNameSecurity.forEach(function (record) {
                     if (record.tablename.toLowerCase() === data.ttblmmmaingridcriteria.tablename.toLowerCase()) {
                        self.tableSecurityLevel  = record.functionsecurity;
                     }
                  });
               }
            }
            if (self.clearSoftLockSetName && self.clearSoftLockSetName !== self.searchSetName) {
               self.clearSoftLock(self.clearSoftLockSetName);
               self.clearSoftLockSetName = self.searchSetName;
            } else {
               self.clearSoftLockSetName = self.searchSetName;
            }
         }
      });
   };

   self.refreshSingleExtraction = function (single) {
      if (single) {
         var lineItemMatchIndex = self.dataset.findIndex(function (line) {
            if (line.seqno === single.seqno) {             
               return true;
            }
         });
         self.dataset.splice(lineItemMatchIndex, 1, single);
      }
   };

   self.clearKeyColumns = function () {
      self.key1Label = '';
      self.key2Label = '';
      self.key3Label = '';
      self.key4Label = '';
      self.key5Label = '';
      self.key2Included = false;
      self.key3Included = false;
      self.key4Included = false;
      self.key5Included = false;
   };

   self.setKeyColumns = function (keys) {

      keys.forEach(function (record) {
         if (record.keynumber === 1) {
            self.key1Label = record.fieldname;
         } else if (record.keynumber === 2) {
            self.key2Label = record.fieldname;
            self.key2Included = true;
         } else if (record.keynumber === 3) {
            self.key3Label = record.fieldname;
            self.key3Included = true;
         } else if (record.keynumber === 4) {
            self.key4Label = record.fieldname;
            self.key4Included = true;
         } else if (record.keynumber === 5) {
            self.key5Label = record.fieldname;
            self.key5Included = true;
         }
      });
   };

   self.clearColumns = function () {
      self.col01Label = '';
      self.col02Label = '';
      self.col03Label = '';
      self.col04Label = '';
      self.col05Label = '';
      self.col06Label = '';
      self.col07Label = '';
      self.col08Label = '';
      self.col09Label = '';
      self.col10Label = '';
      self.col02Included = false;
      self.col03Included = false;
      self.col04Included = false;
      self.col05Included = false;
      self.col06Included = false;
      self.col07Included = false;
      self.col08Included = false;
      self.col09Included = false;
      self.col10Included = false;
   };

   self.setColumns = function (cols) {

      cols.forEach(function (record) {
         if (record.colseqno === 1) {
            self.col01Label = record.fieldname;
         } else if (record.colseqno === 2) {
            self.col02Label = record.fieldname;
            self.col02Included = true;
         } else if (record.colseqno === 3) {
            self.col03Label = record.fieldname;
            self.col03Included = true;
         } else if (record.colseqno === 4) {
            self.col04Label = record.fieldname;
            self.col04Included = true;
         } else if (record.colseqno === 5) {
            self.col05Label = record.fieldname;
            self.col05Included = true;
         } else if (record.colseqno === 6) {
            self.col06Label = record.fieldname;
            self.col06Included = true;
         } else if (record.colseqno === 7) {
            self.col07Label = record.fieldname;
            self.col07Included = true;
         } else if (record.colseqno === 8) {
            self.col08Label = record.fieldname;
            self.col08Included = true;
         } else if (record.colseqno === 9) {
            self.col09Label = record.fieldname;
            self.col09Included = true;
         } else if (record.colseqno === 10) {
            self.col10Label = record.fieldname;
            self.col10Included = true;
         }
      });
   };

   self.createEnabled = function () {
      var retn = false;
      if (self.securityLevelSAAMM >= 3) {
         retn = true;
      }
      return retn;
   };

   self.finalUpdateEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName) {
         if (self.securityLevelSAAMM >= 3) {
            retn = true;
         }
      }
      return retn;
   };

   self.deleteSetEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName) {
         if (self.securityLevelSAAMM >= 5) {
            retn = true;
         }
      }
      return retn;
   };

   self.columnUpdateEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName) {
         if (self.securityLevelSAAMM >= 3 && self.tableSecurityLevel >= 3) {
            retn = true;
         }
      }
      return retn;
   };

   self.exportEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName) {
         if (self.securityLevelSAAMM >= 3 && self.tableSecurityLevel >= 3) {
            retn = true;
         }
      }
      return retn;
   };

   self.importEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName) {
         if (self.securityLevelSAAMM >= 3 && self.tableSecurityLevel >= 3) {
            retn = true;
         }
      }
      return retn;
   };

   self.criteriaInquiryEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName) {
         retn = true;
      }
      return retn;
   };

   self.deleteExtractEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName && !self.grid.isNoRowSelected()) {
         if (self.securityLevelSAAMM >= 5) {
            retn = true;
         }
      }
      return retn;
   };

   self.deleteSourceEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName && !self.grid.isNoRowSelected()) {
         if (self.securityLevelSAAMM >= 5 && self.tableSecurityLevel >= 5) {
            retn = true;
         }
      }
      return retn;
   };

   self.resetErrorStatusEnabled = function () {
      var retn = false;
      if (self.criteria && self.searchSetName && !self.grid.isNoRowSelected()) {
         if (self.securityLevelSAAMM >= 3) {
            retn = true;
         }
      }
      return retn;
   };

   self.retrieveTableNameSecurity = function () {
      self.tableNameSecurity = [];
      DataService.get('/web/api/shared/MMRetrieveTableList', { data: self.criteria, busy: true}, function (data) {
         if (data) {
            if (data.ttblmmtablelist) {
               self.tableNameSecurity = data.ttblmmtablelist;
            }
         }
      });
   };

   self.deleteExtractRecords = function () {   
      var records = GridService.getSelectedRecords(self.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var extractRecordsToDelete = [];

            records.forEach(function (record) {
               extractRecordsToDelete.push(
                  {
                     seqno: record.seqno,
                     mmextractrowid: record.mmextractrowid
                  });
            });
          
            var header = {
               setname: self.searchSetName
            };
            var crit = {
               ttblmmsingleheader: header,
               ttblmmextractdelete: extractRecordsToDelete
            };
            DataService.post('/web/api/shared/MMExtractDelete', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  self.search();
               }
            });
         }
      });
   };

   self.deleteSourceRecords = function () {
      var records = GridService.getSelectedRecords(self.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var extractRecordsToDelete = [];

            records.forEach(function (record) {
               extractRecordsToDelete.push(
                  {
                     seqno: record.seqno,
                     mmextractrowid: record.mmextractrowid
                  });
            });

            var header = {
               setname: self.searchSetName
            };
            var crit = {
               ttblmmsingleheader: header,
               ttblmmextractdelete: extractRecordsToDelete
            };
            DataService.post('/web/api/shared/MMSourceDelete', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  self.search();
               }
            });
         }
      });
   };

   self.resetErrorStatus = function () {
      var records = GridService.getSelectedRecords(self.grid);    
      var resetRecords = [];

      records.forEach(function (record) {
         resetRecords.push(
            {
               seqno: record.seqno,
               mmextractrowid: record.mmextractrowid
            });
      });

      var header = {
         setname: self.searchSetName
      };
      var crit = {
         ttblmmsingleheader: header,
         ttblmmmaingridresults: resetRecords
      };
      DataService.post('/web/api/shared/MMResetErrorStatus', { data: crit, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            if (data.StaleWarning) {
               MessageService.info('global.information', 'message.warning.extraction.records.reset');
            }
            self.search();
         }
      });
   };

   self.clearSoftLock = function (softLockSetName) {
      var header = {
         setname: softLockSetName
      };
      var crit = {
         ttblmmsingleheader: header
      };
      DataService.post('/web/api/shared/MMRemoveSoftLock', { data: crit, busy: true }, function () {       
      });    
   };

   TabService.canUserCloseTab('saamm.master', function () {
      if (self.searchSetName) {
         self.clearSoftLock(self.searchSetName);
      }
      return true;
   });

   // Perform initialization of search criteria
   self.initCriteria();
   self.retrieveTableNameSecurity();
});

app.controller('SaammSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saamm.master');
      }

      base.search();
   };
});

app.controller('SaammMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.create = function () {
      $state.go('^.create');
   };

   self.export = function () {
      $state.go('saamm.export');
   };

   self.import = function () {
      $state.go('saamm.import');
   };

   self.finalUpdate = function () {
      $state.go('^.finalupdate');
   };

   self.deleteSet = function () {
      $state.go('^.deleteset');
   };

   self.columnUpdate = function () {
      $state.go('^.columnupdate');
   };

   self.criteriaInquiry = function () {
      $state.go('^.inquiry');
   };

   self.detail = function (e, args) {
      var record = args[0].item;
      if (record && record.seqno) {
         base.drillDownRecord = record;
         $state.go('^.detail');
      }
   };
});

app.controller('SaammExportCtrl', function ($scope, $state, $stateParams, DataService, MessageService, PvUser) {
   var self = this;
   var base = $scope.base;
   self.PvUser = PvUser;
   self.outputFileOptions = [];

   self.criteria = {
      setname: base.searchSetName,
      allrowsfl: true,
      begseqno: 0,
      endseqno: 0,
      outputty: 'e',
      emailaddr: self.PvUser.email,
      createfl: false
   };

   self.buildOutputFileDropdown = function () {
      var fldListBuilt = [];     
      var obj2 = {
         label: MessageService.get('global.sent.to.email'),
         value: 'e'
      };
      fldListBuilt.push(obj2);
      if (base.isDropboxEnabled()) {
         var obj3 = {
            label: MessageService.get('global.sent.to.dropbox'),
            value: 'd'
         };
         fldListBuilt.push(obj3);
      }
      self.outputFileOptions = fldListBuilt;
   };

   // Save
   self.submit = function () {    
      base.exportPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.exportPrinterSettings = data.printerDetails;         
            var crit = {
               ttblmmexport: self.criteria,
               ttblprintersettings: base.exportPrinterSettings
            };
            DataService.post('/web/api/shared/MMExportLaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('saamm.master');
               }
            });
         }
      });
   };

   self.buildOutputFileDropdown();
});

app.controller('SaammImportCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.API_CALL_TIMEOUT_MILLESECONDS_3HRS = 180 * 60000;

   self.criteria = {
      setname: base.searchSetName,
      targettype: 't',   // SASC PrintDir 
      filename: ''
   };

   self.readAsBinaryString = function (file, onLoadCallback) {
      var reader = new FileReader();

      var binStringCallback = function (e) {
         onLoadCallback(e.target.result);
      };

      var arrBufferCallback = function (e) {
         var binary = '';
         var bytes = new Uint8Array(e.target.result);
         var length = bytes.byteLength;
         for (var j = 0; j < length; j++) {
            binary += String.fromCharCode(bytes[j]);
         }
         onLoadCallback(binary);
      };

      reader.onerror = reader.onabort = function () {
         MessageService.error('global.error', 'message.there.was.a.problem.reading.the imported.file');
      };

      if (typeof reader.readAsBinaryString !== 'undefined') {
         reader.onload = binStringCallback;
         reader.readAsBinaryString(file);
      } else {
         reader.onload = arrBufferCallback;
         reader.readAsArrayBuffer(file);
      }
   };

   self.fileReaderOnLoadCallback = function (data) {
      var reportTransfer = { rptclob: '' };

      reportTransfer.rptclob = data;

      var inputData = { reporttransfer: reportTransfer, cFileName: self.criteria.filename.name, cTargetType: self.criteria.targettype };
      DataService.post('api/shared/assharedentry/filetransfer', { timeout: self.API_CALL_TIMEOUT_MILLESECONDS_3HRS, data: inputData, busy: true }, function (data) {
         if (!data) {
            self.launchImportCall();
         }
      });
   };

   self.launchImportCall = function () {    
      base.importPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.importPrinterSettings = data.printerDetails;
            var header = {
               setname: base.searchSetName,
               filename: self.criteria.filename.name
            };
            var crit = {
               ttblmmextracthdr: header,
               ttblprintersettings: base.importPrinterSettings
            };
            DataService.post('/web/api/shared/MMImportLaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('saamm.master');
               }
            });
         }
      });
   };

   // Save
   self.submit = function () {    
      self.readAsBinaryString(self.criteria.filename, self.fileReaderOnLoadCallback);
   };   
});

app.controller('SaammFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Save
   self.submit = function () {
      base.finalUpdatePrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.finalUpdatePrinterSettings = data.printerDetails;

            var header = {
               setname: base.searchSetName,
               finalupdatedelete: base.finalUpdateDelete
            };
            var crit = {
               ttblmmextracthdr: header,
               ttblprintersettings: base.finalUpdatePrinterSettings
            };
            DataService.post('/web/api/shared/MMFinalUpdateLaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('saamm.master');
               }
            });
         }
      });
   };
});

app.controller('SaammDeleteSetCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Save
   self.submit = function () {
      base.deleteSetPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {       
            base.deleteSetPrinterSettings = data.printerDetails;

            var header = {
               setname: base.searchSetName
            };
            var crit = {
               ttblmmextracthdr: header,
               ttblprintersettings: base.deleteSetPrinterSettings
            };
            DataService.post('/web/api/shared/MMSetDeleteLaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('saamm.master');
               }
            });           
         }
      });
   };
});

app.controller('SaammColumnUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.columnDropDownOptions = [];

   self.criteria = {
      setname: base.searchSetName,
      columnname: '',
      allrowsfl: true,
      begseqno: 0,
      endseqno: 0,
      searchreplacefl: false,
      searchvalue: '',
      createfl: false
   };

   self.columnDropdown = function () {
      if (base.setColumnData) {        
         var fldListBuilt = [];
         base.setColumnData.forEach(function (record) {
            var obj = {
               label: record.fieldname + ' Ty: ' + record.datatype + ' Fmt: ' + record.fmt,
               value: record.fieldname
            };
            fldListBuilt.push(obj);          
         });
         self.columnDropDownOptions = fldListBuilt;
      }
   };

   // Save
   self.submit = function () {   
      base.columnUpdatePrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.columnUpdatePrinterSettings = data.printerDetails;

            var crit = {
               ttblmmcolumnupdate: self.criteria,
               ttblprintersettings: base.columnUpdatePrinterSettings
            };
            DataService.post('/web/api/shared/MMColumnUpdateLaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('saamm.master');
               }
            });
         }
      });      
   };

   self.columnDropdown();
});

app.controller('SaammDetailCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.singleextract = [];
   self.extract = {};
   self.key1label = base.key1label;
   self.drillDownRecord = base.drillDownRecord;

   self.retrieveSingleRecord = function () {   
      var header = {
         setname: base.searchSetName,
         seqno: self.drillDownRecord.seqno 
      };
      var crit = {
         ttblmmsingleheader: header
      };
      DataService.post('/web/api/shared/MMSingleExtractRetrieve', { data: crit, busy: true}, function (data) {
         if (data) {          
            if (data.ttblmmsingleextract) {
               self.singleextract = data.ttblmmsingleextract;
            }
            if (data.ttblmmextract) {
               self.extract = data.ttblmmextract;
            }
         }
      });
   };

   self.allowSave = function () {
      var retn = false;
      if (base.securityLevelSAAMM >= 3 && base.tableSecurityLevel >= 3 && self.extract) {
         /* Don't allow updatable grid for:
             a delete (mmextract.statusoperation) or
             completed (mmextract.statustype) or
             stale record (can't reset error status to try final update again).
         */

         if (self.extract.statusoperation === 'd' || self.extract.statustype === 'c' || self.extract.stalefl) {
            retn = false;
         } else {
            retn = true;
         }
      }
      return retn;
   };

   self.isCellEditable = function (row, cell, value, column, item) {
      return self.allowSave();
   };
   
   self.onCellChange = function (e, args) {
      var record = self.singleextract[args.row];
      if (record) {
         record.changedfl = false;
         if (record.ofld !== record.nfld) {
            record.changedfl = true;
         }
         var indx = self.singleextract.indexOf(record);
         self.singleextractgrid.updateRow(indx);
      }
   };

   // Save
   self.submit = function () {
      var header = {
         setname: base.searchSetName,
         seqno: self.drillDownRecord.seqno
      };
      var crit = {
         ttblmmsingleheader: header,
         ttblmmsingleextract: self.singleextract
      };
      DataService.post('/web/api/shared/MMSingleExtractUpdate', { data: crit, busy: true}, function (data) {
         if (data) {
            if (data.ttblwarnings) {
               var warnings = '';
               data.ttblwarnings.forEach(function (record) {
                  if (record.data) {
                     warnings += record.data + '<br>';
                  }
               });

               MessageService.info('global.information', warnings);
            }
            if (data.ttblmmmaingridresults) {
               base.refreshSingleExtraction(data.ttblmmmaingridresults);
            }

            MessageService.info('global.information', 'message.save.operation.completed.successfully');           
            $state.go('saamm.master');           
         }
      });
   };
   self.retrieveSingleRecord();
});

app.controller('SaammInquiryCtrl', function ($state, $scope, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.header = {};
   self.criteria = [];
   self.column = [];

   self.retrieveInquiryData = function () {
      var header = {
         setname: base.searchSetName         
      };
      var crit = {
         ttblmmsingleheader: header
      };
      DataService.post('/web/api/shared/MMCriteriaInquiry', { data: crit, busy: true}, function (data) {
         if (data) {
            if (data.ttblmmhdr) {
               self.header = data.ttblmmhdr;
            }
            if (data.ttblmmcriteria) {
               self.criteria = data.ttblmmcriteria;
            }
            if (data.ttblmmcolumn) {
               self.column = data.ttblmmcolumn;
            }
         }
      });
   };
   self.retrieveInquiryData();
});
