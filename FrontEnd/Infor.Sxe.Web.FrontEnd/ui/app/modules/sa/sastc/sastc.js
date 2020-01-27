'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sastc',
      dataPath: 'api/sa/sastc',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/sastcfetch',
      searchResultsField: '',
      resultsRowIdField: 'rowidSastc',
      primaryKeyParams: ['currencyty'],
      detailSubTitle: [
         { label: 'global.currency', value: 'currencyty'  },
         { label: 'global.description', value: 'descrip' }
      ],
      recentlyVisited: {
         title: { label: 'global.currency', value: 'currencyty' },
         description: { label: 'global.description', value: 'descrip' }
      }
   });
   $stateProvider.state('sastc.master.currencyhistory', {
      url: '/currency-history',
      params: {
         detailRecord: null
      },
      views: {
         currencyHistory: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/sastc/currency-history.json');
            },
            controller: 'CurrencyHistoryCtrl as chist'
         }
      }
   });
});

app.service('SastcService', function ($state, DataService, GridService, MessageService, ModalService, UserService, UtilsData) {

   var isBankChanged = false;
   var isOkUpdCrsb = false;

   this.extendMasterController = function (self, base) {
      self.isHistoryEnabled = function () {
         if (!base.grid.isOneRowSelected()) {
            return false;
         } else {
            var record = GridService.getSelectedRecord(base.grid);
            if (record) {
               return record.historyfl;
            }
         }
      };
      self.launchCurrencyHistory = function () {
         $state.go('sastc.master.currencyhistory');
      };
   };

   this.extendBaseController = function (self) {

      self.DRAFT = 'CP';
      self.GAIN_LOSS = 'GA';
      self.REVAL_GL = 'RA';
      self.VOUCH = 'VC';
      self.PURCH = 'PO';
      self.SALES = 'SL';
      self.AR = 'AR';
      self.REVAL_EX = 'RV';
      self.RATE_SOURCE = 'RS';
      self.banknoDropDownOptions = [];

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      self.updateSastc = function (sastc, notesList, callback) {
         var updateRecord = {
            addmode: self.isCreate(),
            changebank: isOkUpdCrsb,
            currencyty: sastc.currencyty,
            glno: sastc.glno,
            rvglno: sastc.rvglno,
            shortdesc: sastc.shortdesc,
            descrip: sastc.descrip,
            bankno: sastc.bankno,
            draftfl: sastc.draftfl,
            vouchexrate: sastc.vouchexrate,
            purchexrate: sastc.purchexrate,
            salesexrate: sastc.salesexrate,
            arexrate: sastc.arexrate,
            rvglexchrate: sastc.rvglexchrate,
            ratesource: sastc.ratesource,
            edicurrency: sastc.edicurrency,
            currsymbol: sastc.currsymbol,
            stndcurrcd: sastc.stndcurrcd
         };
         DataService.post('api/sa/assasetup/sastcupdate', {
            data: {
               sastcnotes: notesList,
               sastcresults: updateRecord
            },
            busy: true
         }, function (data) {
            callback(data);
         });
      };

      // If the user selects a bank with a blank currency code and the draft flag is no,
      // present the user with the question and update if user selects yes
      self.checkSastcBank = function (ctrl, sastc) {
         if (isBankChanged && !sastc.draftfl) {
            var params = {
               bankno: sastc.bankno
            };
            DataService.get('api/shared/crsb/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  if (!data.currencyty) {
                     MessageService.okCancel('global.confirm', 'question.currency.type', function () {
                        isOkUpdCrsb = true;
                        if (self.isCreate()) {
                           ctrl.submit();
                        } else {
                           ctrl.checkNotes();
                        }
                     });
                  } else {
                     if (self.isCreate()) {
                        ctrl.submit();
                     } else {
                        ctrl.checkNotes();
                     }
                  }
               }
            });
         } else {
            if (self.isCreate()) {
               ctrl.submit();
            } else {
               ctrl.checkNotes();
            }
         }
      };
   };

   this.extendCreateController = function (self, base, sastc) {
      self.notesList = [];
      sastc.draftfl = false;
      sastc.vouchexrate = 1;
      sastc.purchexrate = 1;
      sastc.salesexrate = 1;
      sastc.arexrate = 1;
      sastc.rvglexchrate = 1;
      isBankChanged = true;
      isOkUpdCrsb = false;

      self.customSubmit = function () {
         base.checkSastcBank(self, sastc);
      };
   };

   this.extendDetailController = function (self, base, sastc, scope) {

      var isRvExRateChanged = false;

      self.notesList = [];

      isBankChanged = false;
      isOkUpdCrsb = false;

      sastc.$promise.then(function () {
         var glCriteria = {
            currencyty: sastc.currencyty
         };
         DataService.post('api/sa/assasetup/sastcglfetch', { data: glCriteria, busy: true }, function (data) {
            if (data) {
               sastc.glno = data.glno;
               sastc.rvglno = data.rvglno;
            }
         });
      });

      self.updateNotesList = function (ctype, val, newrate, oldrate) {
         var isFound = false;
         for (var i = 0; i < self.notesList.length; i++) {
            if (self.notesList[i].changetype === ctype) {
               isFound = true;
               // if this field already changed and changing back to the old value, delete the record as
               // we won't need a note for this change (rates only, don't have old value for other fields)
               if (newrate && self.notesList[i].oldexrate === newrate) {
                  self.notesList.splice(i, 1);
                  break;
               }
               // otherwise, save off the new value
               self.notesList[i].newval = val;
               self.notesList[i].newexrate = newrate;
               break;
            }
         }
         if (!isFound) {
            self.notesList.push({
               changetype: ctype,
               newval: val,
               newexrate: newrate,
               oldexrate: oldrate,
               oper: UserService.getUserName()
            });
         }
      };
      self.bankChanged = function () {
         isBankChanged = true;
      };
      self.glNoChanged = function () {
         self.updateNotesList(base.GAIN_LOSS, sastc.glno, 0, 0);
      };
      self.rvGlNoChanged = function () {
         self.updateNotesList(base.REVAL_GL, sastc.rvglno, 0, 0);
      };
      self.draftFlChanged = function () {
         self.updateNotesList(base.DRAFT, sastc.draftfl.toString(), 0, 0);
      };
      self.rateSourceChanged = function () {
         self.updateNotesList(base.RATE_SOURCE, sastc.ratesource, 0, 0);
      };
      self.rateSourceAllowed = function () {
         return isRvExRateChanged;
      };

      scope.$watch('dtl.sastc.vouchexrate', function (newValue, oldValue) {
         if (newValue !== oldValue && oldValue) {
            self.updateNotesList(base.VOUCH, newValue.toFixed(7), newValue, oldValue);
         }
      });
      scope.$watch('dtl.sastc.purchexrate', function (newValue, oldValue) {
         if (newValue !== oldValue && oldValue) {
            self.updateNotesList(base.PURCH, newValue.toFixed(7), newValue, oldValue);
         }
      });
      scope.$watch('dtl.sastc.salesexrate', function (newValue, oldValue) {
         if (newValue !== oldValue && oldValue) {
            self.updateNotesList(base.SALES, newValue.toFixed(7), newValue, oldValue);
         }
      });
      scope.$watch('dtl.sastc.arexrate', function (newValue, oldValue) {
         if (newValue !== oldValue && oldValue) {
            self.updateNotesList(base.AR, newValue.toFixed(7), newValue, oldValue);
         }
      });
      scope.$watch('dtl.sastc.rvglexchrate', function (newValue, oldValue) {
         if (newValue !== oldValue && oldValue) {
            isRvExRateChanged = true;
            self.updateNotesList(base.REVAL_EX, newValue.toFixed(7), newValue, oldValue);
         }
      });

      self.customSubmit = function () {
         base.checkSastcBank(self, sastc);
      };

      self.checkNotes = function () {

         if (self.notesList.length !== 0) {
            ModalService.showModal('sa/sastc/change-note.json', 'ChangeNoteCtrl as cnote', scope, function (modal) {
               self.changeNotes = modal;
            });
         } else {
            self.submit();
         }
      };
   };

   // Custom Update of Detail Data
   this.updateRecord = function (self, base, sastc, scope, callback) {
      base.updateSastc(sastc, self.notesList, callback);
   };

   // Custom Create
   this.createRecord = function (self, base, sastc, scope, callback) {
      base.updateSastc(sastc, self.notesList, callback);
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, sastc, $scope, deleteCallback) {
      DataService.post('api/sa/assasetup/sastcdelete', { data: sastc }, function () {
         deleteCallback();
      });
   };

   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {
      records.forEach(function (record) {
         DataService.post('api/sa/assasetup/sastcdelete', { data: record, busy: true }, function () {
            deleteCallback();
         });
      });
   };
});

app.controller('CurrencyHistoryCtrl', function ($scope, $state, ConfigService, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   var record = GridService.getSelectedRecord(base.grid);

   self.changety = 'al';
   self.recordcountlimit = ConfigService.getDefaultRecordLimit();

   self.searchHistory = function () {
      var currencyHistoryCriteria = {
         currencyty: record.currencyty,
         changety: self.changety,
         recordcountlimit: self.recordcountlimit
      };
      DataService.post('api/sa/assasetup/sastchistorygetlist', { data: currencyHistoryCriteria, busy: true }, function (data) {
         self.historyGrid = data.sastchistoryresults;
      });
   };

   if (record) {
      self.searchHistory();
   }

});

app.controller('ChangeNoteCtrl', function ($scope, $state, $stateParams, MessageService, Utils) {
   var self = this;
   var dtl = $scope.dtl;
   var sastc = dtl.sastc;

   // Cancel action
   self.cancel = function () {
      dtl.changeNotes.destroy();
   };

   self.submit = function () {
      if (self.validateNotes()) {
         self.notesOK();
         dtl.changeNotes.destroy();
      }
   };

   self.validateNotes = function () {
      var cnt = 0;
      for (var i = 0; i < dtl.notesList.length; i++) {
         if (!dtl.notesList[i].changenote) {
            cnt++;
            break;
         }
      }
      if (cnt === 0) {
         return true;
      } else {
         MessageService.error('global.error', 'message.notes.are.required');
         return false;
      }
   };

   self.notesOK = function () {
      var transDt = Utils.getCurrentDate();
      var transDate = new Date();
      // for changed time - need HHMMSS format for SI call
      var transTm = ((transDate.getHours() === 0) ? '00' : (transDate.getHours() < 10) ? ('0' + transDate.getHours()) : transDate.getHours()) +
                    ((transDate.getMinutes() === 0) ? '00' : (transDate.getMinutes() < 10) ? ('0' + transDate.getMinutes()) : transDate.getMinutes()) +
                    ((transDate.getSeconds() === 0) ? '00' : (transDate.getSeconds() < 10) ? ('0' + transDate.getSeconds()) : transDate.getSeconds());

      dtl.notesList.forEach(function (record) {
         record.currencyty = sastc.currencyty;
         record.changedt = transDt;
         record.changetm = transTm;
         record.glno = sastc.glno;
         record.rvglno = sastc.rvglno;
         record.draftfl = sastc.draftfl;
         record.ratesource = sastc.ratesource;
      });
      dtl.submit();
   };
});
