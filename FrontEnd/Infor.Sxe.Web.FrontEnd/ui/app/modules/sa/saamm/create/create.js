'use strict';

app.controller('SaammCreateCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.isDisabled = true;

   self.isStep1 = true;
   self.isStep2 = false;
   self.isStep3 = false;
   self.isStep4 = false;
   self.currentTableName = '';
   self.currentCopySetName = '';
   self.tableNameDropDownOptions = [];
   self.outputFileOptions = [];

   self.buildTableNameDropdown = function () {
      DataService.get('/web/api/shared/MMRetrieveTableList', { data: self.criteria, busy: true}, function (data) {
         if (data) {
            if (data.ttblmmtablelist) {
               self.tableNameDropDownOptions = [];
               var firstChoice = true;
               var fldListBuilt = [];
               data.ttblmmtablelist.forEach(function (record) {
                  if (record.functionsecurity >= 3) {
                     var obj = {
                        label: record.tablename.toUpperCase() + '-' + record.tabledesc,                       
                        value: record.tablename
                     };
                     fldListBuilt.push(obj);
                     if (firstChoice) {
                        firstChoice = false;
                        if (!base.saammNewSet.tablename) {
                           base.saammNewSet.tablename = record.tablename;
                        }
                     }
                  }
               });
               self.tableNameDropDownOptions = fldListBuilt;
            }
         }
      });
   };

   self.buildOutputFileDropdown = function () {
      var fldListBuilt = [];
      var obj1 = {
         label: MessageService.get('global.no'),       
         value: 'n'
      };
      fldListBuilt.push(obj1);
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

   self.copySetNameChange = function () {
      if (base.saammNewSet.copysetname) {        
         var crit = {
            ttblmmextracthdr: base.saammNewSet
         };         
         DataService.post('/web/api/shared/MMCopySetNameChanged', { data: crit, busy: true }, function (data) {
            if (data) {
               if (data.ttblmmextracthdr) {
                  if (data.ttblmmextracthdr.tablename && data.ttblmmextracthdr.tablename !== base.saammNewSet.tablename) {
                     base.saammNewSet.tablename = data.ttblmmextracthdr.tablename;
                  }
               }
            }
         });
      }
   };

   self.previous = function () {
      if (self.isStep2) {
         self.isStep1 = true;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
      }
      else if (self.isStep3) {       
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep3 = false;
         self.isStep4 = false;
      }
      else if (self.isStep4) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
      }
   };

   self.next = function () {
      if (self.isStep1) {
         if ((base.saammNewSet.tablename   !== self.currentTableName) ||
              (base.saammNewSet.copysetname !== self.currentCopySetName)) {
            var crit = {
               ttblmmextracthdr: base.saammNewSet
            };
            base.saammNewSetCriteria = [];
            base.saammNewSetColumn = [];
            DataService.post('/web/api/shared/mmgetextractschemalaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  self.currentTableName = base.saammNewSet.tablename;
                  self.currentCopySetName = base.saammNewSet.copysetname;
                  if (data.ttblmmextractcriteria) {
                     base.saammNewSetCriteria = data.ttblmmextractcriteria;
                  }
                  if (data.ttblmmextractcolumn) {
                     base.saammNewSetColumn = data.ttblmmextractcolumn;
                  }
                  self.navigateToNext();
               }
            });
         }
         else {
            self.navigateToNext();
         }
      }
      else {
         self.navigateToNext();
      }
   };

   self.save = function () {
      base.newSetPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.newSetPrinterSettings = data.printerDetails;

            var crit = {
               ttblmmextracthdr: base.saammNewSet,
               ttblprintersettings: base.newSetPrinterSettings,
               ttblmmextractcriteria: base.saammNewSetCriteria,
               ttblmmextractcolumn: base.saammNewSetColumn
            };
            DataService.post('/web/api/shared/mmextractinitlaunch', { data: crit, busy: true}, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('saamm.master');
               }
            });
         }
      });
   };

   self.selectDeselect = function () {
      var records = GridService.getSelectedRecords(base.saammNewSetColumnGrid);
      if (records) {
         records.forEach(function (record) {
            var selectedFlag = true;
            if (record.selectedfl) {
               selectedFlag = false;
            }
            record.selectedfl = selectedFlag;
            var indx = base.saammNewSetColumn.indexOf(record);
            base.saammNewSetColumnGrid.updateRow(indx);
         });
         base.saammNewSetColumnGrid.unSelectAllRows();
      }
   };

   self.navigateToNext = function () {
      if (self.isStep1) {       
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep3 = false;
         self.isStep4 = false;
      }
      else if (self.isStep2) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
      }
      else if (self.isStep3) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = true;
      }
   };

   self.navigateToPrevious = function () {
      if (self.isStep2) {
         self.isStep1 = true;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
      }
      else if (self.isStep3) {
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep3 = false;
         self.isStep4 = false;
      }
      else if (self.isStep4) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
      }
   };

   self.initializeStep2 = function () {


   };

   self.buildTableNameDropdown();
   self.buildOutputFileDropdown();
});

app.controller('SaammCreateStep1Ctrl', function ($scope) {  
   var base = $scope.base;

});

app.controller('SaammCreateStep2Ctrl', function ($scope) {
   var base = $scope.base;
});

app.controller('SaammCreateStep3Ctrl', function ($scope) {
   var base = $scope.base;
});

app.controller('SaammCreateStep4Ctrl', function ($scope) {
   var base = $scope.base;
});
