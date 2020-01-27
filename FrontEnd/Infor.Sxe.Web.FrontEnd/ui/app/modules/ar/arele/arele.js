'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ar', 'arele', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ar', 'arele');

   $stateProvider.state('arele.detail', {
      url: '/detail?pk&pk2&pk3',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arele/detail.json');
            },
            controller: 'AreleDetailCtrl as dtl'
         }
      }
   });

   // Detail Child States
   $stateProvider.state('arele.detail.addInvoice', {
      url: '/add-invoice?transCode&type&callback',

      params: { record: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arele/add-invoice.json');
            },
            controller: 'AreleAddInvoiceCtrl as ai'
         }
      }
   });

   $stateProvider.state('arele.detail.addDebitMemo', {
      url: '/add-debit-memo',
      params: { object: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arele/add-debit-memo.json');
            },
            controller: 'AreleAddDebitMemoCtrl as adm'
         }
      }
   });

   $stateProvider.state('arele.detail.writeOff', {
      url: '/write-off?callback',
      params: { requestObject: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/shared/write-off/write-off.json');
            },
            controller: 'ArWriteOffCtrl as wo'
         }
      }
   });

   $stateProvider.state('arele.chargebackreason', {
      url: '/charge-back-reason',
      params: { object: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arele/charge-back-reason.json');
            },
            controller: 'AreleChargeBackReasonCtrl as cbr'
         }
      }
   });

});

app.controller('AreleBaseCtrl', function ($state) {
   var self = this;
   self.proof = 0;
   self.wototal = 0;
   self.criteria = {};
   self.writeOffLaunched = false;

   // array to keep track of write-off changes
   self.writeOff = [];

   self.isMaster = function () {
      return $state.is('arele.master');
   };

   self.includesMaster = function () {
      return $state.includes('arele.master');
   };

   self.isDetail = function () {
      return $state.is('arele.detail');
   };
});

app.controller('AreleSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var criteria = $scope.base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      $state.go('arele.detail', { pk: criteria.cBatch, pk2: criteria.dCustno, pk3: criteria.iCheckNo });
   };

   self.onBatchSelected = function (args) {
      if (args.rowId) {
         DataService.get('api/ar/arbch/getbyrowid/' + args.rowId + '?fldlist=custno,checkno', function (data) {
            criteria.dCustno = data.custno;
            criteria.iCheckNo = data.checkno;
         });
      }
   };
});

app.controller('AreleMasterCtrl', function () {

});

app.controller('AreleDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService, Utils, SecurityService) {
   var self = this;
   var base = $scope.base;

   self.arele = {};
   self.selectedRecord = {};
   self.addCriteria = {};
   self.addAretInv = {};
   self.prevCheckDetail = {};
   self.deletedRecords = [];

   if ($stateParams.pk && $stateParams.pk2 && $stateParams.pk3) {
      var areleCriteria = {
         cBatch: $stateParams.pk,
         dCustno: $stateParams.pk2,
         iCheckNo: $stateParams.pk3,
         iSecure: SecurityService.getSecurityLevel('arele')
      };
      DataService.getResource('api/ar/asarentry/arelecheckload/{cBatch}/{dCustno}/{iCheckNo}/{iSecure}', { pathParams: areleCriteria, busy: true }, function (data) {
         if (data) {
            self.arele = data;

            // Update all rows and fields that have been affected by the write-off process
            if (base.writeOffLaunched) {
               base.writeOff.forEach(function (writeOffAdj) {
                  if (writeOffAdj.applyamt > 0) {
                     var gridRows = self.arele.arelecheckdtl.length;
                     for (var i = 0; i < gridRows; i++) {
                        if (self.arele.arelecheckdtl[i].dtlrowid === writeOffAdj.dtlrowid) {
                           self.arele.arelecheckdtl[i].discamt = writeOffAdj.discamt;
                           self.arele.arelecheckdtl[i].applyamt = writeOffAdj.applyamt;
                           self.arele.arelecheckdtl[i].dWOAmt = writeOffAdj.dWOAmt;
                           self.arele.arelecheckdtl[i].origdiscamt = writeOffAdj.origdiscamt;
                           self.arele.arelecheckdtl[i].origapplyamt = writeOffAdj.origapplyamt;
                           self.arele.arelecheckdtl[i].origWOamt = writeOffAdj.origWOamt;
                           self.arele.arelecheckdtl[i].wOProof = writeOffAdj.wOProof;
                           break;
                        }
                     }
                  }
               });
               base.writeOffLaunched = false;
            }

            base.grid.loadData(self.arele.arelecheckdtl);
            self.calculateProof();
         }
      }, function errorCallback(response) {
         $state.go('arele.master');
      });
   }

   self.onSelected = function () {
      self.rowEntry();
   };

   self.rowEntry = function () {
      var record = GridService.getSelectedRecord(base.grid);   // returns null if more than one record selected

      if (record) {                                            // only one row selected in the grid
         self.selectedRecord = angular.copy(record);

         if (self.selectedRecord) {
            var criteria = {
               arelecheckdtl: self.selectedRecord,
               arelecheckdtlwo: self.arele.arelecheckdtlwo,
               arelecheckhdr: self.arele.arelecheckhdr
            };

            DataService.post('api/ar/asarentry/areledtlrowentry', { data: criteria, busy: true }, function (data) {
               // Assign new values
               if (data) {
                  // Update ARELE data
                  self.arele.arelecheckhdr = data.arelecheckhdr;
                  self.arele.arelecheckdtlwo = data.arelecheckdtlwo;

                  if (data.arelecheckdtl) {
                     Utils.replaceObject(self.selectedRecord, data.arelecheckdtl);
                  }
               }
            });
         }
      }
   };

   // ---- Public Methods ----

   // *** Enable/Disable Buttons ***
   self.isSuspendUnsuspendLineEnabled = function () {
      var records = GridService.getSelectedRecords(base.grid);
      return !(records.length === 1 && self.arele.arelecheckhdr && self.arele.arelecheckhdr.suspendlineenable);
   };

   self.isWriteOffDisabled = function () {
      if (base.grid.isOneRowSelected()) {
         if (self.arele.arelecheckhdr && self.arele.arelecheckhdr.writeoffenable) {
            return false;
         }
         return true;
      } else {
         return true;
      }
   };

   self.isDeleteLineDisabled = function () {
      var records = GridService.getSelectedRecords(base.grid);
      return !(records.length >= 1 && self.arele.arelecheckhdr && self.arele.arelecheckhdr.deletelineenable);
      //return (!base.grid.isAnyRowSelected() && self.arele.arelecheckhdr && !self.arele.arelecheckhdr.deletelineenable);
   };

   self.isDeleteAllDisabled = function () {
      return (self.arele.arelecheckhdr && !self.arele.arelecheckhdr.deleteallenable);
   };

   self.isChargeBackReasonDisabled = function () {
      return (base.grid.isOneRowSelected() && self.arele.arelecheckhdr && !self.arele.arelecheckhdr.chargebackenable);
   };

   self.isRecallInvoiceDiscountDisabled = function () {
      if (base.grid.isOneRowSelected()) {
         if (self.arele.arelecheckhdr && self.arele.arelecheckhdr.recalllinediscenable) {
            return false;
         }
         return true;
      } else {
         return true;
      }
   };

   self.isReplaceDetailDisabled = function () {

      if (base.grid.isOneRowSelected()) {
         if (self.arele.arelecheckhdr && self.arele.arelecheckhdr.replacedetailenable) {
            return false;
         }
         return true;
      } else {
         return true;
      }
   };

   self.isChargeBackDisabled = function () {
      if (base.grid.isOneRowSelected()) {
         if (self.arele.arelecheckhdr && self.arele.arelecheckhdr.chargebackenable) {
            return false;
         }
         return true;
      } else {
         return true;
      }
   };

   self.isUndoChangesDisabled = function () {
      return !(base.grid.isOneRowSelected() && self.arele.arelecheckhdr && self.arele.arelecheckhdr.undochangesenable);
   };

   self.isChangeCustomerDisabled = function () {
      var disabled = true;
      if (self.arele.arelecheckhdr) {
         if (self.arele.arelecheckhdr.changecustenable === true) {
            disabled = false;
         }
      }
      return disabled;
   };

   self.isAddMiscCreditDisabled = function () {
      return (self.arele.arelecheckhdr && !self.arele.arelecheckhdr.addtransenable);
   };

   self.isAddTransDisabled = function () {
      return (self.arele.arelecheckhdr && !self.arele.arelecheckhdr.addtransenable);
   };

   self.isRecallDiscDisabled = function () {
      return (self.arele.arelecheckhdr && !self.arele.arelecheckhdr.recalldiscenable);
   };


   // *** Grid Methods ***
   self.deleteRecord = function () {
      var records = GridService.getSelectedRecords(base.grid);

      if (records && records.length) {
         records.forEach(function (record) {
            record.deletefl = true;
         });
         records.forEach(function (record) {
            var idx = self.arele.arelecheckdtl.indexOf(record);
            if (idx >= 0) {
               var length = base.writeOff.length;
               for (var i = 0; i < length; i++) {
                  if (base.writeOff[i].dtlrowid === record.dtlrowid) {
                     base.writeOff.splice(i, 1);
                  }
               }
               self.deletedRecords.push(record);
               self.arele.arelecheckdtl.splice(idx, 1);
            }
         });
         base.grid.loadData(self.arele.arelecheckdtl);
         self.calculateProof();

      }
   };

   self.deleteAll = function () {
      self.arele.arelecheckdtl.forEach(function (record) {
         record.deletefl = true;
      });
      var recordCount = self.arele.arelecheckdtl.length;
      self.deletedRecords = [];
      //self.deletedRecords.push(self.arele.arelecheckdtl);
      self.deletedRecords = angular.copy(self.arele.arelecheckdtl);
      self.arele.arelecheckdtl.forEach(function (record) {
         var idx = self.arele.arelecheckdtl.indexOf(record);
         if (idx >= 0) {
            var length = base.writeOff.length;
            for (var i = 0; i < length; i++) {
               if (base.writeOff[i].dtlrowid === record.dtlrowid) {
                  base.writeOff.splice(i, 1);
               }
            }
            self.arele.arelecheckdtl.splice(idx, recordCount);
         }
      });
      base.grid.loadData(self.arele.arelecheckdtl);
      self.calculateProof();
   };

   self.susspendUnsusspendLine = function () {
      // Single record only
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         DataService.post('api/ar/asarentry/areledtlsuspendunsuspend', { data: record, busy: true },
            function (data) {
               if (data) {
                  var indx = self.arele.arelecheckdtl.indexOf(record);
                  Utils.replaceObject(record, data);
                  base.grid.updateRow(indx);
                  base.grid.unselectRow(indx);
               }
            });
      }
   };

   self.replaceDetail = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         var transCode = 0;
         switch (record.trancd) {
            case 'i':                                             //ignore jslint - correct indentation
               transCode = 11;                                    //ignore jslint - correct indentation
               break;                                             //ignore jslint - correct indentation
            case 'm':                                             //ignore jslint - correct indentation
               transCode = 5;                                     //ignore jslint - correct indentation
               break;                                             //ignore jslint - correct indentation
            case 'c':                                             //ignore jslint - correct indentation
               transCode = 3;                                     //ignore jslint - correct indentation
               break;                                             //ignore jslint - correct indentation
            default:                                              //ignore jslint - correct indentation
               transCode = 0;                                     //ignore jslint - correct indentation
               break;                                             //ignore jslint - correct indentation
         }

         auditWarning(function () {
            $state.go('.addInvoice', { transCode: transCode, type: 'replace', record: record, callback: 'addInvoiceCallback' });
         });
      }
   };

   self.recallInvoiceDiscount = function () {
      auditWarning(function () {
         var record = GridService.getSelectedRecord(base.grid);
         // data = singleRecord, arelecheckhdr
         if (record) {
            var data = {
               arelecheckdtl: record,
               arelecheckhdr: self.arele.arelecheckhdr
            };
            DataService.post('api/ar/asarentry/areledtlrecalldiscount', { data: data, busy: true },
               function (data) {
                  if (data) {
                     var indx = self.arele.arelecheckdtl.indexOf(record);
                     // Update Arele data
                     Utils.replaceObject(record, data.arelecheckdtl);
                     self.arele.arelecheckhdr = data.arelecheckhdr;
                     // Update Grid
                     base.grid.updateRow(indx);
                     base.grid.unselectRow(indx);
                  }
               });
         }
      });
   };

   self.undoChanges = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         var criteria = {
            arelecheckdtl: record,
            arelecheckhdr: self.arele.arelecheckhdr,
            arelecheckdtlwo: self.arele.arelecheckdtlwo
         };
         DataService.post('api/ar/asarentry/areledtlundochanges', { data: criteria, busy: true },
            function (data) {
               if (data) {
                  var length = base.writeOff.length;
                  for (var j = 0; j < length; j++) {
                     if (base.writeOff[j].dtlrowid === record.dtlrowid) {
                        base.writeOff.splice(j, 1);
                     }
                  }
                  var i = self.arele.arelecheckdtl.indexOf(record);
                  Utils.replaceObject(record, data.arelecheckdtl);
                  self.arele.arelecheckhdr = data.arelecheckhdr;
                  self.arele.arelecheckdtlwo = data.arelecheckdtlwo;
                  base.grid.updateRow(i);
                  self.calculateProof();
               }
            });
      }
   };

   // *** Header Level Methods ***
   self.areleHdrSuspendUnsuspendCheck = function () {
      var data = {
         arelecheckdtl: self.arele.arelecheckdtl,
         arelecheckhdr: self.arele.arelecheckhdr
      };

      DataService.post('api/ar/asarentry/arelehdrsuspendunsuspend', { data: data, busy: true }, function (data) {
         if (data) {
            // Update header data
            self.arele.arelecheckhdr = data;
         }
      });
   };

   self.recallDiscount = function () {
      auditWarning(function () {

         var asarentryARELEHdrRecallDiscountRequestAPIGet = {
            arelecheckdtl: self.arele.arelecheckdtl,
            arelecheckhdr: self.arele.arelecheckhdr,
            cType: 'Get'
         };
         DataService.post('api/ar/asarentry/arelehdrrecalldiscount/', { data: asarentryARELEHdrRecallDiscountRequestAPIGet, busy: true }, //+ 'GET'
            function (dataget) {
               if (dataget) {
                  // Update Arele data
                  var tmpHeader = dataget.arelecheckhdr;
                  if (tmpHeader) {
                     if (tmpHeader.proof === tmpHeader.newproofamt) {
                        var str = MessageService.get('global.current.discount') + ': ' + tmpHeader.newdiscamt + ', ' + MessageService.get('global.no.other.discounts.are.applicable');
                        MessageService.info('global.information', str);
                     } else {
                        MessageService.okCancel('question.apply.discount', MessageService.get('global.current.discount') + ": " + tmpHeader.newdiscamt + '<br />' + MessageService.get('global.current.proof') + ": " + tmpHeader.proof + '<br />' + MessageService.get('global.adjusted.proof') + ": " + tmpHeader.newproofamt + '<br />' + MessageService.get('question.apply.discount'),
                           function () {
                              var asarentryARELEHdrRecallDiscountRequestAPIPut = {
                                 arelecheckdtl: dataget.arelecheckdtl,
                                 arelecheckhdr: dataget.arelecheckhdr,
                                 cType: 'Put'
                              };
                              DataService.post('api/ar/asarentry/arelehdrrecalldiscount/', { data: asarentryARELEHdrRecallDiscountRequestAPIPut, busy: true }, //+ 'PUT'
                                 function (dataput) {
                                    if (dataput) {
                                       // Update Arele data
                                       self.arele.arelecheckhdr = dataput.arelecheckhdr;
                                       self.arele.arelecheckdtl = dataput.arelecheckdtl;
                                       // Update base.grid
                                       base.grid.loadData(self.arele.arelecheckdtl);
                                    }
                                 });
                           });
                     }
                  }
               }
            });

      });
   };

   self.onChargeBackReason = function () {
      ModalService.showModal('ar/arele/charge-back-reason.json', 'AreleChargeBackReasonCtrl as cbr', $scope, function (modal) {
         self.addChargeBackReasonModal = modal;
      });
   };

   self.okChargeBackCallback = function (data) {
      if (data) {
         var record = GridService.getSelectedRecord(base.grid);
         record.refer = data.refer;
         base.grid.updateRow(self.arele.arelecheckdtl.indexOf(record));
      }
   };

   self.save = function () {
      var arelecheckdtltemp = [];
      var unSavedRecords = [];
      if (self.deletedRecords.length > 0) {
         unSavedRecords = unSavedRecords.concat(self.deletedRecords);
      }

      unSavedRecords = unSavedRecords.concat(self.arele.arelecheckdtl);
      arelecheckdtltemp = arelecheckdtltemp.concat(self.arele.arelecheckdtl);
      var saveRequest = {
         arelecheckdtl: unSavedRecords,
         arelecheckhdr: self.arele.arelecheckhdr
      };
      DataService.post('api/ar/asarentry/arelechecksaveverify', { data: saveRequest, busy: true }, function (data) {
         if (data) {
            self.arele.arelecheckhdr = data.arelecheckhdr;
            if (data.lAskQuestion) {
               MessageService.okCancel('global.question', 'question.proof.must.be.0.apply.proof.balance.to.balance',
                  function () {
                     // Ok processing
                     saveCheckDetails(data.arelecheckdtl);
                  }, null);
            } else {
               saveCheckDetails(data.arelecheckdtl);
            }
         }
      });
   };

   // *** Navigation Methods ***
   self.goToAddDebitMemo = function () {
      auditWarning(function () {
         $state.go('.addDebitMemo');
      });
   };

   self.goToAddInvoice = function (transCode) {
      auditWarning(function () {
         $state.go('.addInvoice', { transCode: transCode, callback: 'addInvoiceCallback' });
      });
   };

   // If calling this method from somewhere other then clicking the button then pass true
   self.goToWriteOff = function (notButton, selected) {
      self.isWriteOffButtonPressed = notButton || false;

      if (self.selectedRecord !== selected && selected) {
         self.selectedRecord = selected;
      }

      if (self.selectedRecord) {
         var data = {
            arelecheckdtl: self.selectedRecord,
            arelecheckhdr: self.arele.arelecheckhdr,
            arelecheckdtlwo: self.arele.arelecheckdtlwo,
            cMode: notButton ? 's' : 'w'
         };
         DataService.post('api/ar/asarentry/areledtlwosetup/', { data: data, busy: true },
            function (data) {
               if (data) {
                  var arecewodata = [];
                  var areceworeport = [];

                  arecewodata.push(data.arecewodata);
                  areceworeport.push(data.areceworeport);

                  var initData = {
                     arecewodata: arecewodata,
                     areceworeport: areceworeport
                  };
                  DataService.post('api/ar/asarentry/arecewoinitialize', { data: initData, busy: true },
                     function (data) {
                        //if no errors
                        if (data) {
                           // Create/Apply request data
                           var reqData = {
                              arecewodata: data.arecewodata,
                              areceworeport: data.areceworeport,
                              arecewodisplay: data.arecewodisplay
                           };

                           DataService.post('api/ar/asarentry/arecewoadd', {
                              data: reqData,
                              busy: true
                           },
                              function (data) {
                                 //if no errors
                                 if (data) {
                                    var elem = data.areceworeport.length - 1;

                                    // if there is no default G/L account setup in SASO, etc. then we initialize the WO Display so that the user can enter the appropriate G/L and just click + to Add the write-off record
                                    if (elem >= 0 && data.areceworeport[elem].account === '') {
                                       data.arecewodisplay.account = base.lastwoacct;
                                       data.arecewodisplay.acctname = '';
                                       data.arecewodisplay.amount = data.areceworeport[elem].amount;
                                       data.arecewodisplay.invno = data.areceworeport[elem].invno;
                                       data.arecewodisplay.invsuf = data.areceworeport[elem].invsuf;
                                       data.arecewodisplay.proof = data.areceworeport[elem].amount;
                                       // delete the entry with no G/L default
                                       data.areceworeport.pop();
                                    }

                                    var requestObj = {
                                       arecewodata: data.arecewodata,
                                       arecewodisplay: data.arecewodisplay,
                                       areceworeport: data.areceworeport,
                                       arelecheckdtl: self.selectedRecord,
                                       isInquiry: false
                                    };
                                    $state.go('.writeOff', { requestObject: requestObj, callback: 'dtl.writeOffDoneCallback' });
                                 }
                              });
                        }
                     });
               }

            });
      } else {
         MessageService.alert('message.please.select.a.record');
      }
   };

   self.goToChangeCustomer = function () {
      ModalService.showModal('ar/arele/change-customer.json', 'AreleChangeCustomerCtrl as cc', $scope, function (modal) {
         self.changeCustomerModal = modal;
      });
   };

   // *** Callback Methods ***
   self.addInvoiceCallback = function (data, isFromReplaceDetail) {
      self.arele.arelecheckhdr = data.arelecheckhdr;
      if (isFromReplaceDetail) {
         data.arelecheckdtl[0].forEach(function (record) {
            record.deletefl = true;
         });
         Utils.replaceObject(GridService.getSelectedRecord(base.grid), data.arelecheckdtl[0]);
      } else {
         // add each item in the list returned to the list bound to the main base.grid
         data.arelecheckdtl.forEach(function (item) {
            if (!JSLINQ(self.arele.arelecheckdtl).Any(function (item1) { return item1.aretrowid === item.aretrowid; })) {
               self.arele.arelecheckdtl.push(item);
            }
         });
      }

      // Update Grid
      base.grid.loadData(self.arele.arelecheckdtl);
      self.calculateProof();
   };

   self.writeOffDoneCallback = function (okFlag, arecewodata, areceworeport, woDisplay, mainData, invoicesListSelected, arelecheckdtl) {

      //Only pull the results out if they hit OK from the dialog.
      if (okFlag) {
         self.arele.arecewodata = arecewodata;
         self.arele.areceworeport = areceworeport;

         var saveWriteoffCriteria = {
            areceworeport: areceworeport,
            arecewodata: arecewodata[0],
            arelecheckdtlwo: self.arele.arelecheckdtlwo,
            arelecheckhdr: self.arele.arelecheckhdr || {},
            arelecheckdtl: arelecheckdtl || {}              // single record
         };

         DataService.post('api/ar/asarentry/areledtlwofinal', { data: saveWriteoffCriteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(self.selectedRecord, data.arelecheckdtl);
               self.arele.arelecheckdtlwo = data.arelecheckdtlwo;
               self.arele.arelecheckhdr = data.arelecheckhdr;

               var newWriteOff = {
                  dtlrowid: self.selectedRecord.dtlrowid,
                  discamt: self.selectedRecord.discamt,
                  applyamt: self.selectedRecord.applyamt,
                  dWOAmt: self.selectedRecord.dWOAmt,
                  origdiscamt: self.selectedRecord.origdiscamt,
                  origapplyamt: self.selectedRecord.origapplyamt,
                  origWOamt: self.selectedRecord.origWOamt,
                  wOProof: self.selectedRecord.wOProof
               };

               var writeOffFound = false;
               var length = base.writeOff.length;
               for (var i = 0; i < length; i++) {
                  if (base.writeOff[i].dtlrowid === newWriteOff.dtlrowid) {
                     base.writeOff[i] = newWriteOff;
                     writeOffFound = true;
                  }
               }

               if (!writeOffFound) {
                  base.writeOff.push(newWriteOff);
               }

               self.rowLeaveFinal();
            }
         });
      }
   };

   self.calculateProof = function () {
      var arelecheckdtltemp = [];
      var unSavedRecords = [];
      if (self.deletedRecords.length > 0) {
         unSavedRecords = unSavedRecords.concat(self.deletedRecords);
      }
      unSavedRecords = unSavedRecords.concat(self.arele.arelecheckdtl);
      arelecheckdtltemp = arelecheckdtltemp.concat(self.arele.arelecheckdtl);
      var saveRequest = {
         arelecheckdtl: unSavedRecords,
         arelecheckhdr: self.arele.arelecheckhdr
      };


      var data = {
         arelecheckdtl: self.arele.arelecheckdtl,
         arelecheckhdr: self.arele.arelecheckhdr
      };
      // This call updateds the header information
      DataService.post('api/ar/asarentry/arelecalcproof', { data: data, busy: true },
         function (data) {
            if (data) {
               base.wototal = data.wototal;
               base.proof = data.proof;
               self.arele.arelecheckhdr.wototal = data.wototal;
               self.arele.arelecheckhdr.proof = data.proof;
            }
         });
   };

   self.rowLeaveFinal = function () {
      var criteria = {
         arelecheckdtl: self.selectedRecord,
         arelecheckhdr: self.arele.arelecheckhdr
      };
      DataService.post('api/ar/asarentry/areledtlrowleavefinal', { data: criteria, busy: true }, function (data) {
         // Assign new values
         if (data) {
            self.arele.arelecheckhdr = data.arelecheckhdr;
            Utils.replaceObject(self.selectedRecord, data.arelecheckdtl);
            var length = self.arele.arelecheckdtl.length;
            for (var i = 0; i < length; i++) {
               if (self.arele.arelecheckdtl[i].dtlrowid === data.arelecheckdtl.dtlrowid) {
                  Utils.replaceObject(self.arele.arelecheckdtl[i], data.arelecheckdtl);
                  base.grid.updateRow(self.arele.arelecheckdtl.indexOf(self.arele.arelecheckdtl[i]));
               }
            }
         }
         // Update Grid
         base.grid.loadData(self.arele.arelecheckdtl);
         self.calculateProof();
      });
   };

   // ---- Private Methods ----
   function auditWarning(callback) {
      // Audit warning message displayed by clicking multiple functions
      MessageService.okCancel('global.audit.path.warning', 'question.this.action.will.destroy.any.audit.trail.back.to.t', function () {
         callback();
      });
   }

   function saveCheckDetails(records) {
      if (records) {
         var data = {
            arelecheckdtl: records,
            arelecheckdtlwo: self.arele.arelecheckdtlwo,
            arelecheckhdr: self.arele.arelecheckhdr
         };

         DataService.post('api/ar/asarentry/arelechecksavefinal', { data: data, busy: true },
            function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  // Update Arele data
                  self.arele.arelecheckhdr = data.arelecheckhdr;
                  self.arele.arelecheckdtl = data.arelecheckdtl;
                  // Update Grid
                  base.grid.loadData(self.arele.arelecheckdtl);
                  $state.go('^.master');
               }
            });
      }
   }
});

//-------------------------------------------
// ----- Detail Child State Controllers -----
//-------------------------------------------
app.controller('AreleChangeCustomerCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var arele = dtl.arele;
   var grid = base.grid;

   // Bound to view
   self.customercheckdetails = {
      custno: arele.arelecheckhdr.custno
   };

   // Cancel action
   self.cancel = function () {
      dtl.changeCustomerModal.destroy();
   };

   // Submit action
   self.submit = function () {
      var criteria = {
         arelecheckdtl: arele.arelecheckdtl,
         arelecheckdtlwo: arele.arelecheckdtlwo,
         arelecheckhdr: arele.arelecheckhdr,
         dNewCustno: self.customercheckdetails.custno
      };

      DataService.post('api/ar/asarentry/arelecustomerchange/', { data: criteria, busy: true }, function (data) {
         if (data) {
            // Update arele data
            arele.arelecheckhdr = data.arelecheckhdr;
            arele.arelecheckdtl = data.arelecheckdtl;
            arele.arelecheckdtlwo = data.arelecheckdtlwo;
            base.criteria.dCustno = data.arelecheckhdr.custno;
            // Update Grid
            grid.loadData(arele.arelecheckdtl);

            // Close modal
            dtl.changeCustomerModal.destroy();
         }
      });
   };
});

app.controller('AreleAddDebitMemoCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   var arele = $scope.dtl.arele;
   var grid = $scope.base.grid;
   self.checkAmount = arele.arelecheckhdr.checkamt;

   // Bound to view
   self.areledebitadd = {
      custno: arele.arelecheckhdr.custno
   };

   // Add Debit Memo
   self.submit = function () {
      var addCriteria = {
         arelecheckhdr: arele.arelecheckhdr,
         areledebitadd: self.areledebitadd
      };

      DataService.post('api/ar/asarentry/areledebitadd', { data: addCriteria, busy: true }, function (data) {
         if (data) {
            // override header
            arele.arelecheckhdr = data.arelecheckhdr;
            // Add to detail list
            arele.arelecheckdtl.push(data.arelecheckdtl);
            // update grid
            //grid.updateRow(arele.arelecheckdtl.indexOf(data.arelecheckdtl));

            grid.loadData(arele.arelecheckdtl);
            $scope.dtl.calculateProof();

            // Go back to detail state
            $state.go('^');
         }
      });
   };
});

app.controller('AreleAddInvoiceCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;
   var transCode = $stateParams.transCode;
   var arele = $scope.dtl.arele;
   self.checkAmount = arele.arelecheckhdr.checkamt;
   self.title = '';

   if ($stateParams.type === 'replace') {
      self.criteria = {
         type: 'replace',
         originvno: $stateParams.record.invno,
         originvsuf: $stateParams.record.invsuf,
         origapplyamt: $stateParams.record.applyamt,
         custno: $stateParams.record.custno,
         transcd: $stateParams.transCode
      };
   } else {
      self.criteria = {
         transcd: transCode,
         custno: arele.arelecheckhdr.custno
      };
   }

   // Add invoices
   self.add = function () {
      var records = GridService.getSelectedRecords(self.grid);

      if (records && records.length) {
         var addCriteriaInv = {
            arelearetcriteria: self.criteria,
            arelearetresults: records,
            arelecheckhdr: arele.arelecheckhdr
         };

         DataService.post('api/ar/asarentry/arelearetadd', { data: addCriteriaInv, busy: true }, function (data) {
            if (data.cWarningMessage) {
               MessageService.alert(data.cWarningMessage);
            }
            if (data) {
               var callbackFn = $scope.dtl[$stateParams.callback];

               // Invoke the callback from detail controller
               callbackFn(data, $stateParams.type === 'replace');

               // Go back to detail state
               $state.go('^');
            }
         });
      }
   };

   self.getType = function () {
      if (transCode === '5') {
         self.title = $translate.instant('global.add.misc.credits');
         return MessageService.get('global.misc.credit');
      } else if (transCode === '3') {
         self.title = $translate.instant('global.add.unapplied.cash');
         return MessageService.get('global.unapplied.cash');
      } else if (transCode === '11') {
         self.title = $translate.instant('global.add.schedule.payment');
         return MessageService.get('global.payment.record');
      } else {
         return '';
      }
   };

   // Clear form
   self.clear = function () {
      self.criteria = {
         transcd: transCode
      };
   };

   // Perform search
   self.submit = function () {
      DataService.post('api/ar/asarentry/arelearetload', { data: self.criteria, busy: true }, function (data) {
         // Update/assign Grid dataset
         self.grid.loadData(data.arelearetresults);
      });
   };

   // Do initial search
   self.submit();
});

// ----- Detail Grid Child State Controller -----
app.controller('AreleLineCtrl', function ($scope, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   var arele = $scope.dtl.arele;
   var rowParams = $scope.dtl.rowParams;
   var grid = rowParams.grid;
   var row = rowParams.row;

   // Set a copy of the item on this component (actual data not changed until edit is completed)
   self.transaction = rowParams.itemCopy;

   // Initialize row data
   if (self.transaction) {
      var criteria = {
         arelecheckdtl: self.transaction,
         arelecheckdtlwo: arele.arelecheckdtlwo,
         arelecheckhdr: arele.arelecheckhdr
      };

      DataService.post('api/ar/asarentry/areledtlrowentry', { data: criteria, busy: true }, function (data) {
         // Assign new values
         if (data) {
            // Update ARELE data
            arele.arelecheckhdr = data.arelecheckhdr;
            arele.arelecheckdtlwo = data.arelecheckdtlwo;

            if (data.arelecheckdtl) {
               Utils.replaceObject(self.transaction, data.arelecheckdtl);
               Utils.replaceObject($scope.dtl.selectedRecord, data.arelecheckdtl);
            }
         }
      });
   }

   // Cancel the expanded row
   self.cancel = function () {
      // actual data not changed until edit is completed, just collapse the row
      grid.toggleRowDetail(row);
   };

   self.piffDisabled = function () {
      return !self.transaction.pifflenable;
   };

   // Submit row detail changes
   self.submit = function () {
      var criteria = {
         arelecheckdtl: self.transaction,       // single record
         arelecheckhdr: arele.arelecheckhdr,
         arelecheckdtlwo: arele.arelecheckdtlwo
      };

      DataService.post('api/ar/asarentry/areledtlrowleaveverify', { data: criteria, busy: true }, function (data) {
         // Assign new values
         if (data) {
            if (data.lAskQuestion) {
               // Write off question
               MessageService.yesNo('global.write.off', 'question.apply.amount.plus.discount.plus.existing.write.off',
                  function () {
                     base.writeOffLaunched = true;
                     $scope.dtl.goToWriteOff(false, data.arelecheckdtl);
                  },
                  function () {
                     self.transaction.piffl = false;
                     self.transaction.statfl = false;
                     var length = base.writeOff.length;
                     for (var i = 0; i < length; i++) {
                        if (base.writeOff[i].dtlrowid === self.transaction.dtlrowid) {
                           base.writeOff.splice(i, 1);
                        }
                     }
                     rowLeaveFinal();
                  });
            } else {
               self.transaction = data.arelecheckdtl;
               arele.arelecheckdtlwo = data.arelecheckdtlwo;
               rowLeaveFinal();
            }
         }
      });
   };

   function rowLeaveFinal() {
      var criteria = {
         arelecheckdtl: self.transaction,
         arelecheckhdr: arele.arelecheckhdr
      };

      DataService.post('api/ar/asarentry/areledtlrowleavefinal', { data: criteria, busy: true }, function (data) {
         // Assign new values
         if (data) {
            arele.arelecheckhdr = data.arelecheckhdr;
            Utils.replaceObject(self.transaction, data.arelecheckdtl);
            var length = arele.arelecheckdtl.length;
            for (var i = 0; i < length; i++) {
               if (arele.arelecheckdtl[i].dtlrowid === data.arelecheckdtl.dtlrowid) {
                  Utils.replaceObject(arele.arelecheckdtl[i], data.arelecheckdtl);
                  grid.updateRow(arele.arelecheckdtl.indexOf(arele.arelecheckdtl[i]));
               }
            }
            $scope.dtl.calculateProof();
         }
      });
   }
});

app.controller('AreleChargeBackReasonCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var popup = $scope.dtl;
   self.refer = popup.selectedRecord.refer;
   self.arelecheckdtl = {};

   self.cancel = function () {
      popup.addChargeBackReasonModal.destroy();
   };

   self.submit = function () {
      self.arelecheckdtl = popup.selectedRecord;

      self.arelecheckdtl.refer = self.refer;
      //if (!record) {
      DataService.post('api/ar/asarentry/areledtlchargebackreason', { data: self.arelecheckdtl, busy: true }, function (data) {
         if (data) {
            self.refer = data;
            popup.addChargeBackReasonModal.destroy();
            popup.okChargeBackCallback(data);
         }
      });
   };

});