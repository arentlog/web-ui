'use strict';

app.provider('ValueAddReceivingState', function ValueAddReceivingStateProvider($stateProvider, BinAllocationStateProvider) {
   var self = this;

   this.$get = [function () {
      return self;
   }];

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this is called.
   this.addStates = function (module, menuFn, parentState) {

      $stateProvider.state(parentState + '.valueaddreceiving-surplus', {
         url: '/value-add-surplus',
         params: {
            callingState: null,
            menuFunction: null,
            currentCount: null,
            maximumCount: null,
            vaReceiptCreateIiSectionRequestCriteria: null,
            acceptCallback: null,
            cancelCallback: null
         },
         views: {
            valueAddSurplus: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/value-add-receiving/surplus.json');
               },
               controller: 'ValueAddReceivingSurplusCtrl as vars'
            }
         }
      });

      //This is a subview under the Surplus screen.
      $stateProvider.state(parentState + '.valueaddreceiving-surplus.finished-product', {
         url: '/finished-product',
         params: {
            menuFunction: null,
            vaLineListCriteria: null
         },
         views: {
            valueAddFinishedProduct: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/value-add-receiving/finished-product.json');
               },
               controller: 'ValueAddReceivingFinishedProductCtrl as varfp'
            }
         }
      });

      //This is a subview under the Finished Product screen.
      $stateProvider.state(parentState + '.valueaddreceiving-surplus.finished-product.add-line', {
         url: '/add-line',
         params: {
            menuFunction: null,
            vaLineAddChange: null,
            vaLineListCriteria: null
         },
         views: {
            addLine: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/value-add-receiving/finished-product-add-line.json');
               },
               controller: 'ValueAddReceivingFinishedProductAddLineCtrl as varfpa'
            }
         }
      });

      //This is a subview under the Finished Product screen.
      $stateProvider.state(parentState + '.valueaddreceiving-surplus.finished-product.details', {
         url: '/details',
         params: {
            menuFunction: null,
            vaLineAddChange: null,
            vaLineListResultsRow: null,
            criteria: null
         },
         views: {
            details: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/value-add-receiving/finished-product-details.json');
               },
               controller: 'ValueAddReceivingFinishedProductDetailsCtrl as varfpd'
            }
         }
      });

      //The Bin Allocation Control is launced from a button sitting on the Detail screen.
      BinAllocationStateProvider.addStates(module, menuFn, parentState + '.valueaddreceiving-surplus.finished-product.details');
   };
});

// The Value Add Receiving Surplus Controller
// Alias: vars
app.controller('ValueAddReceivingSurplusCtrl', function ($scope, $state, $translate, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   self.stateParms = $stateParams;
   self.menuFunction = $stateParams.menuFunction;
   self.currentCount = $stateParams.currentCount;
   self.maximumCount = $stateParams.maximumCount;
   self.vaReceiptCreateIiSectionRequestCriteria = $stateParams.vaReceiptCreateIiSectionRequestCriteria;
   self.DOCUMENT_DELIMITER = '-';
   self.LABEL_DELIMITER = ': ';
   self.MENUFUNCTION_POEI = 'poei';
   self.MENUFUNCTION_VAEI = 'vaei';
   self.SUBMENU_DELIMITER = ' | ';
   self.SECTIONTYPE_INTERNAL = 'ii';
   self.WMALLOC_ORDER_TYPE_VA = 'f';
   self.WMALLOC_OURPROC_VAET = 'vaet';
   self.WMALLOC_VAMODULE = 'va';
   self.WMALLOC_ADJUST_TYPE_SELL = "sell";
   self.sectionCode = '';
   self.completeFl = false;
   self.vaNo = 0;
   self.vaSuf = 0;
   self.seqNo = 0;

   self.getSubTitle = function () {
      if (self.vaReceiptCreateIiSectionRequestCriteria) {

         //If this is called in an iterative nature (i.e. from POEI and there are multiple lines), we will display the current line #.
         if (self.maximumCount > 1) {
            if (self.vaReceiptCreateIiSectionRequestCriteria.pvPasspono > 0) {
               return MessageService.get('global.purchase.order.number') + self.LABEL_DELIMITER +
                  self.vaReceiptCreateIiSectionRequestCriteria.pvPasspono + self.DOCUMENT_DELIMITER + Utils.pad(self.vaReceiptCreateIiSectionRequestCriteria.pvPassposuf, 2) +
                  self.SUBMENU_DELIMITER + MessageService.get('global.line.number') + self.LABEL_DELIMITER + self.vaReceiptCreateIiSectionRequestCriteria.lineNumber;
            } else if (self.vaReceiptCreateIiSectionRequestCriteria.pvVano > 0) {
               return MessageService.get('va.number') + self.LABEL_DELIMITER +
                  self.vaReceiptCreateIiSectionRequestCriteria.pvVano + self.DOCUMENT_DELIMITER + Utils.pad(self.vaReceiptCreateIiSectionRequestCriteria.pvVasuf, 2);
            } else {
               return '';
            }
         } else {
            if (self.vaReceiptCreateIiSectionRequestCriteria.pvPasspono > 0) {
               return MessageService.get('global.purchase.order.number') + self.LABEL_DELIMITER +
                  self.vaReceiptCreateIiSectionRequestCriteria.pvPasspono + self.DOCUMENT_DELIMITER + Utils.pad(self.vaReceiptCreateIiSectionRequestCriteria.pvPassposuf, 2);
            } else if (self.vaReceiptCreateIiSectionRequestCriteria.pvVano > 0) {
               return MessageService.get('va.number') + self.LABEL_DELIMITER +
                  self.vaReceiptCreateIiSectionRequestCriteria.pvVano + self.DOCUMENT_DELIMITER + Utils.pad(self.vaReceiptCreateIiSectionRequestCriteria.pvVasuf, 2);
            } else {
               return '';
            }
         }
      } else {
         return '';
      }
   };

   self.getLineMessage = function () {
      var message = '';
      if (self.maximumCount > 1) {
         message = $translate.instant('global.processing.surplus.line.message1') + (self.currentCount + 1) +
            $translate.instant('global.processing.surplus.line.message2') + self.maximumCount +
            $translate.instant('global.processing.surplus.line.message3');
      }

      return message;
   };

   //This is needed so we can hide other views appropriately.
   self.isValueAddReceivingSurplusMaster = function () {
      return $state.current.name.endsWith('.valueaddreceiving-surplus');
   };

   //NOTE:  No back button should be available here.  It's confusing to have one
   //because this control can be called from so many different places.  They are
   //limited to OK and Cancel for navigation.

   self.launchFinishProductReceiving = function () {
      var vaLineListCriteria = {
         vano: self.vaNo,
         vasuf: self.vaSuf,
         seqno: self.seqNo,
         functionnm: self.menuFunction
      };
      $state.go('.finished-product', { menuFunction: self.menuFunction, vaLineListCriteria: vaLineListCriteria });
   };

   self.validation = function () {
      if (!self.sectionCode || self.sectionCode.length === 0) {
         MessageService.error('global.error', 'message.section.code.is.required');
         return false;
      } else {
         return true;
      }
   };

   self.submit = function () {
      if (self.validation()) {
         var vaReceiptCreateIiSectionCriteria = {
            pvSctncode: self.sectionCode,
            pvCompletefl: self.completeFl,
            pvPasspono: self.menuFunction === self.MENUFUNCTION_POEI ? self.vaReceiptCreateIiSectionRequestCriteria.pvPasspono : 0,
            pvPassposuf: self.menuFunction === self.MENUFUNCTION_POEI ? self.vaReceiptCreateIiSectionRequestCriteria.pvPassposuf : 0,
            pvPasslineno: 0,
            pvVano: self.menuFunction !== self.MENUFUNCTION_POEI ? self.vaReceiptCreateIiSectionRequestCriteria.pvVano : 0,
            pvVasuf: self.menuFunction !== self.MENUFUNCTION_POEI ? self.vaReceiptCreateIiSectionRequestCriteria.pvVasuf : 0
         };

         DataService.post('api/va/asvaentry/vareceiptcreateiisection', { data: vaReceiptCreateIiSectionCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if (vaReceiptCreateIiSectionCriteria.pvCompletefl && self.menuFunction !== self.MENUFUNCTION_POEI) {
                     //TODO: Work for VAEI is required.  Reference: SL-UI - ValueAddSurplusInventoryPopupViewModel.cs ProceedWithIISection method.
                     self.seqNo = data.pvSeqno;
                     self.menuFunction = 'vaei';
                     var vaeiFullReceiptCriteria = { vano: vaReceiptCreateIiSectionCriteria.pvVano, vasuf: vaReceiptCreateIiSectionCriteria.pvVasuf, laborcheckedfl: true, wlwhsechgfl: true };

                     DataService.post('api/va/asvaentry/vaeifullreceipt', { data: vaeiFullReceiptCriteria, busy: true }, function (inner) {
                        if (!MessageService.processMessaging(inner)) {
                           self.vaNo = data.pvVano;
                           self.vaSuf = data.pvVasuf;
                           self.launchFinishProductReceiving();
                        }
                     });
                  } else {
                     self.vaNo = data.pvVano;
                     self.vaSuf = data.pvVasuf;
                     self.seqNo = data.pvSeqno;
                     self.launchFinishProductReceiving();
                  }
               }
            }
         });
      }
   };

   self.navigateBack = function () {
      $state.go(self.stateParms.callingState);
   };

   self.unlockRecordAndNavigate = function (vano, vasuf, navigate, refreshAndReload) {
      if (self.vaReceiptCreateIiSectionRequestCriteria.pvVano) {
         var params = {
            pvVano: self.vaReceiptCreateIiSectionRequestCriteria.pvVano,
            pvVasuf: self.vaReceiptCreateIiSectionRequestCriteria.pvVasuf
         };
         DataService.get('api/va/asvaheader/vaheaderremovesoftlock/{pvVano}/{pvVasuf}', { pathParams: params, busy: true }, function () {
            MessageService.alert('global.warning', 'global.receipt.status.cleared');
            $state.go(self.stateParms.callingState, {refreshSearch: true });
         });
      } else {
         $state.go(self.stateParms.callingState);
      }
   };

   self.skip = function () {
      var cancelFinish = function () {
         //Offer ability to do more work after screen is cancelled from.
         if (self.stateParms.cancelCallback) {
            self.stateParms.cancelCallback();
         }
         //Go to Calling place
         if (self.stateParms.callingState) {
            $state.go(self.stateParms.callingState, { refreshSearch: true });
         }
      }
      //VAEI
      if (self.menuFunction !== self.MENUFUNCTION_POEI) {
         var vaeiFullReceiptCriteria = {
            vano: self.vaReceiptCreateIiSectionRequestCriteria.pvVano,
            vasuf: self.vaReceiptCreateIiSectionRequestCriteria.pvVasuf,
            laborcheckedfl: true,
            wlwhsechgfl: true
         };
         //This is required in order to allow a user to do a full receipt without adding surplus lines.
         DataService.post('api/va/asvaentry/vaeifullreceipt', { data: vaeiFullReceiptCriteria, busy: true }, function (inner) {
            if (!MessageService.processMessaging(inner)) {
               cancelFinish();
            }
         });
      } else { //POEI
         cancelFinish();
      }
   };

   self.initialize = function () {
      if (self.vaReceiptCreateIiSectionRequestCriteria) {
         self.sectionCode = self.vaReceiptCreateIiSectionRequestCriteria.pvSctncode;
         self.completeFl = self.vaReceiptCreateIiSectionRequestCriteria.pvCompletefl;
      } else {
         self.sectionCode = '';
         self.completeFl = false;
      }
   };

   self.initialize();

});

// The Value Add Receiving Finished Product Controller
// Alias: varfp
app.controller('ValueAddReceivingFinishedProductCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, Sasoo) {
   var self = this;
   var vars = $scope.vars;
   self.menuFunction = $stateParams.menuFunction;
   self.vaLineListCriteria = $stateParams.vaLineListCriteria;
   self.TYPE_PRODUCT = 2;
   self.TYPE_GROUP = 1;
   self.NONSTOCKTYPE_STOCKED = '';
   self.NONSTOCKTYPE_NONSTOCK = 'n';
   self.SERIAL_LOT_TYPE_SERIAL = 's';
   self.SERIAL_LOT_TYPE_LOT = 'l';
   self.SERIAL_METHOD_STOCKED = 's';
   self.sectionTypes = ["in", "ii", "it"];
   self.sectionTypesForNonstock = ["in", "ii"];
   self.vaLineListResults = [];
   self.vaLineAddChange = {};

   self.isSeeCostFl = function () {
      return Sasoo.seecostfl;
   };

   //This is needed so we can hide other views appropriately.
   self.isValueAddReceivingFinishedProduct = function () {
      return $state.current.name.endsWith('.valueaddreceiving-surplus.finished-product');
   };

   self.getSubTitle = function () {
      if (self.vaLineListCriteria) {
         if (self.vaLineListCriteria.vano > 0) {
            return MessageService.get('va.number') + vars.LABEL_DELIMITER +
               self.vaLineListCriteria.vano + vars.DOCUMENT_DELIMITER + Utils.pad(self.vaLineListCriteria.vasuf, 2) +
               vars.SUBMENU_DELIMITER + MessageService.get('global.section.number') + vars.LABEL_DELIMITER + self.vaLineListCriteria.seqno;
         } else {
            return '';
         }
      } else {
         return '';
      }
   };

   //NOTE:  No back button should be available here.  It's confusing to have one
   //because this control can be called from so many different places.  They are
   //limited to OK and Cancel for navigation.

   self.search = function () {
      if (self.vaLineListCriteria) {
         DataService.post('api/va/asvaline/valineretrieve', { data: self.vaLineListCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.vaLineListResults = data.valinelistresults;
               }
            }
         });
      }
   };

   self.addLine = function () {
      var vaLineInitializeAddCriteria = {
         pvFunctionnm: vars.MENUFUNCTION_VAEI,
         pvVano: self.vaLineListCriteria.vano,
         pvVasuf: self.vaLineListCriteria.vasuf,
         pvSeqno: self.vaLineListCriteria.seqno
      };

      DataService.post('api/va/asvaline/valineinitializeadd', { data: vaLineInitializeAddCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.vaLineAddChange = data.valineaddchg;
               //Subview
               $state.go('.add-line', { menuFunction: self.menuFunction, vaLineAddChange: self.vaLineAddChange, vaLineListCriteria: self.vaLineListCriteria });
            }
         }
      });
   };

   self.deleteLine = function () {
      var selectedRow = GridService.getSelectedRecord(self.itemsGrid);

      MessageService.yesNo('global.question', 'question.confirm.delete.of.design',
      function () {
         DataService.post('api/va/asvaline/valinedelete', { data: selectedRow, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data)) {
                  self.search();
               }
            }
         });
      });
   };

   self.launchDetail = function (selectedRow) {

      var vaLineInitializeUpdateCriteria = {
         pvFunctionnm: vars.MENUFUNCTION_VAEI,
         pvVano: selectedRow.vano,
         pvVasuf: selectedRow.vasuf,
         pvSeqno: selectedRow.seqno,
         pvLineno: selectedRow.lineno
      };

      DataService.post('api/va/asvaline/valineinitializeupdate', { data: vaLineInitializeUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.vaLineAddChange = data.valineaddchg;
               //Subview
               $state.go('.details', { menuFunction: self.menuFunction, vaLineAddChange: self.vaLineAddChange, criteria: vaLineInitializeUpdateCriteria, vaLineListResultsRow: selectedRow });
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         self.launchDetail(record);
      }
   };

   self.save = function () {
      DataService.get('api/va/asvaentry/vareceiptcheckiisection/' + self.vaLineListCriteria.vano + '/' + self.vaLineListCriteria.vasuf + '/' + self.vaLineListCriteria.seqno, { busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            //Offer ability to do more work after screen is accepted from.
            if (vars.stateParms.acceptCallback) {
               vars.stateParms.acceptCallback();
            }
            //Go to Calling place
            if (vars.stateParms.callingState) {
               $state.go(vars.stateParms.callingState);
            }
         }
      });
   };

   self.cancel = function () {
      DataService.get('api/va/asvaentry/vareceiptcheckiisection/' + self.vaLineListCriteria.vano + '/' + self.vaLineListCriteria.vasuf + '/' + self.vaLineListCriteria.seqno, { busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            //Offer ability to do more work after screen is cancelled from.
            if (vars.stateParms.cancelCallback) {
               vars.stateParms.cancelCallback();
            }
            //Go to Calling place
            if (vars.stateParms.callingState) {
               $state.go(vars.stateParms.callingState);
            }
         }
      });
   };

   self.search();
});

// The Value Add Receiving Finished Product Add Line Controller
// Alias: varfpa
app.controller('ValueAddReceivingFinishedProductAddLineCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var vars = $scope.vars;
   var varfp = $scope.varfp;
   self.menuFunction = $stateParams.menuFunction;
   self.vaLineAddChange = $stateParams.vaLineAddChange;
   self.vaLineListCriteria = $stateParams.vaLineListCriteria;
   self.vaLineListResults = [];

   self.getSubTitle = function () {
      if (self.vaLineAddChange) {
         if (self.vaLineAddChange.vano > 0) {
            return MessageService.get('va.number') + vars.LABEL_DELIMITER +
               self.vaLineAddChange.vano + vars.DOCUMENT_DELIMITER + Utils.pad(self.vaLineAddChange.vasuf, 2) +
               vars.SUBMENU_DELIMITER + MessageService.get('global.section.number') + vars.LABEL_DELIMITER + self.vaLineAddChange.seqno;
         } else {
            return '';
         }
      } else {
         return '';
      }
   };

   self.save = function () {
      var vaLineAddCriteria = {
         valineaddchg: self.vaLineAddChange,
         pvFunctionnm: self.menuFunction,
         pvVano: self.vaLineListCriteria.vano,
         pvVasuf: self.vaLineListCriteria.vasuf,
         pvSeqno: self.vaLineListCriteria.seqno
      };

      DataService.post('api/va/asvaline/valineadd', { data: vaLineAddCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               varfp.vaLineListResults = data.valinelistresults;
               self.vaLineAddChange = data.valineaddchg;
               //self.vaLineListCriteria = data.valinelistcriteria;

               $state.go('^');
            }
         }
      });
   };

   self.cancel = function () {
      $state.go('^');
   };
});

// The Value Add Receiving Finished Product Details Controller
// Alias: varfpd
app.controller('ValueAddReceivingFinishedProductDetailsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var vars = $scope.vars;
   var varfp = $scope.varfp;
   self.menuFunction = $stateParams.menuFunction;
   self.vaLineAddChange = $stateParams.vaLineAddChange;
   self.criteria = $stateParams.criteria;
   self.vaLineListResultsRow = $stateParams.vaLineListResultsRow;

   //This is needed so we can hide other views appropriately.
   self.isFinishedProductDetail = function () {
      return $state.current.name.endsWith('.valueaddreceiving-surplus.finished-product.details');
   };

   self.isNonstockVisible = function () {
      var isVisible = false;
      if (self.vaLineAddChange && self.vaLineAddChange.sctntype && self.vaLineAddChange.nonstockty) {
         if (varfp.sectionTypesForNonstock.indexOf(self.vaLineAddChange.sctntype.toLowerCase() > -1) &&
            self.vaLineAddChange.nonstockty.toLowerCase() === varfp.NONSTOCKTYPE_NONSTOCK) {
            isVisible = true;
         }
      }
      return isVisible;
   };

   self.isSerialsVisible = function () {
      var isVisible = false;
      if (self.vaLineAddChange && self.vaLineAddChange.sctntype && self.vaLineAddChange.serlottype) {
         if (varfp.sectionTypes.indexOf(self.vaLineAddChange.sctntype.toLowerCase() > -1) &&
            self.vaLineAddChange.serlottype.toLowerCase() === varfp.SERIAL_LOT_TYPE_SERIAL) {
            isVisible = true;
         }
      }
      return isVisible;
   };

   self.isLotsVisible = function () {
      var isVisible = false;
      if (self.vaLineAddChange && self.vaLineAddChange.sctntype && self.vaLineAddChange.serlottype) {
         if (varfp.sectionTypes.indexOf(self.vaLineAddChange.sctntype.toLowerCase() > -1) &&
            self.vaLineAddChange.serlottype.toLowerCase() === varfp.SERIAL_LOT_TYPE_LOT) {
            isVisible = true;
         }
      }
      return isVisible;
   };

   self.isExtendedVisible = function () {
      if (self.vaLineAddChange) {
         return true;
      } else {
         return false;
      }
   };

   self.isBinAllocationVisible = function () {
      var isVisible = false;
      if (self.vaLineAddChange && self.vaLineAddChange.sctntype) {
         if (varfp.sectionTypes.indexOf(self.vaLineAddChange.sctntype.toLowerCase() > -1) &&
            self.vaLineAddChange.wmfl) {
            isVisible = true;
         }
      }
      return isVisible;
   };

   self.getSubTitle = function () {
      if (self.vaLineAddChange) {
         return MessageService.get('global.line.number') + vars.LABEL_DELIMITER + self.vaLineAddChange.lineno +
            vars.SUBMENU_DELIMITER + MessageService.get('global.product') + vars.LABEL_DELIMITER + self.vaLineAddChange.shipprod;
      } else {
         return '';
      }
   };

   self.saveContinueStep3 = function () {
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^');
   };

   self.saveContinueStep2 = function () {
      if (self.vaLineAddChange && self.vaLineAddChange.nonstockty === varfp.NONSTOCKTYPE_NONSTOCK && self.nonstockDetailsValueAddControl) {
         self.nonstockDetailsValueAddControl.save();
      } else {
         self.saveContinueStep3();
      }
   };

   //This Save will call the Saves in Extended and Nonstocks.  When those pass, we continue on for
   //the next step in the process of save.  Asynch calls in place, so that means we rely on Callbacks
   //when those complete successfully.
   self.save = function () {
      if (self.extendedDetailsValueAddControl) {
         self.extendedDetailsValueAddControl.save();
      } else {
         self.saveContinueStep2();
      }
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.createIcEntrySerialsCriteria = function () {
      var criteria = {
         actionty: '',
         //assignoldest: self.vaLineAddChange.assignoldest,
         btncreateenabled: false,
         //cono2: self.vaLineAddChange.cono2,
         cost: self.vaLineAddChange.costoverfl,
         currproc: vars.MENUFUNCTION_VAEI,
         custno: 0,
         ictype: self.vaLineAddChange.transtype,
         icspecrecno: self.vaLineAddChange.icspecrecno,
         inquiryfl: false,
         jrnlno: 0,
         lineno: self.vaLineAddChange.lineno,
         linenochar: self.vaLineAddChange.lineno,
         kplabel: self.vaLineAddChange.kplabel,
         method: varfp.SERIAL_METHOD_STOCKED,
         orderno: self.vaLineAddChange.vano,
         ordersuf: self.vaLineAddChange.vasuf,
         origqty: self.vaLineAddChange.stkqtyship,
         ordqty: self.vaLineAddChange.stkqtyord,
         ourproc: vars.MENUFUNCTION_VAEI,
         outqty: self.vaLineAddChange.stkqtyship,
         //origqtylabel: self.vaLineAddChange.origqtylabel,
         prod: self.vaLineAddChange.shipprod,
         //proddesc: self.vaLineAddChange.proddesc,
         //prodnotesfl: self.vaLineAddChange.prodnotesfl,
         proofqty: self.vaLineAddChange.nosnlots,
         qtyunavail: self.vaLineAddChange.qtyunavail,
         reasunavty: self.vaLineAddChange.reasunavty,
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: '',
         returnfl: true,
         rettext: self.vaLineAddChange.rettext,
         seqdash: "0",
         seqno: self.vaLineAddChange.seqno,
         //seqnochar: '000',
         shipfmwhse: '',
         shipto: '',
         shiptowhse: '',
         type: self.vaLineAddChange.transtype,
         vendno: 0,
         whse: self.vaLineAddChange.whse,
         wono: 0,
         wosuf: 0
         //wonosuf: self.vaLineAddChange.wonosuf
      };

      return criteria;
   };

   self.initializeSerials = function () {
      if (self.vaLineAddChange && self.vaLineAddChange.serlottype && self.vaLineAddChange.serlottype.toLowerCase() === varfp.SERIAL_LOT_TYPE_SERIAL) {
         self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria();

         var criteria = {
            icentryserialslist: [],
            icentryserialscriteria: self.icEntrySerialsCriteria
         };

         //This is a key piece to this. Sending the Criteria to the Serial Control so it can render the data.
         self.serialControl.initialize(criteria);
      }
   };

   self.createIcEntryLotsCriteria = function () {
      var criteria = {
         actionty: '',
         //assignoldest: self.vaLineAddChange.assignoldest,
         btncreateenabled: false,
         cono2: self.vaLineAddChange.cono2,
         cost: self.vaLineAddChange.costoverfl,
         custno: 0,
         currproc: vars.MENUFUNCTION_VAEI,
         ictype: self.vaLineAddChange.transtype,
         icspecrecno: self.vaLineAddChange.icspecrecno,
         inquiryfl: false,
         jrnlno: 0,
         //kplabel: self.vaLineAddChange.kplabel,
         lineno: self.vaLineAddChange.lineno,
         //linenochar: self.vaLineAddChange.lineno,
         ordqty: self.vaLineAddChange.stkqtyord,
         orderno: self.vaLineAddChange.vano,
         ordersuf: self.vaLineAddChange.vasuf,
         origqty: self.vaLineAddChange.stkqtyship,
         //origqtylabel: self.vaLineAddChange.origqtylabel,
         ourproc: vars.MENUFUNCTION_VAEI,
         outqty: self.vaLineAddChange.stkqtyship,
         method: varfp.SERIAL_METHOD_STOCKED,
         prod: self.vaLineAddChange.shipprod,
         //proddesc: self.vaLineAddChange.proddesc,
         //prodnotesfl: self.vaLineAddChange.prodnotesfl,
         proofqty: self.vaLineAddChange.nosnlots,
         qtyunavail: self.vaLineAddChange.qtyunavail,
         reasunavty: self.vaLineAddChange.reasunavty,
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: '',
         returnfl: true,
         //rettext: self.vaLineAddChange.rettext,
         seqno: self.vaLineAddChange.seqno,
         //seqnochar: '000',
         //seqdash: "0",
         shipto: '',
         shipfmwhse: '',
         shiptowhse: '',
         type: self.vaLineAddChange.transtype,
         vendno: 0,
         whse: self.vaLineAddChange.whse,
         wono: 0,
         wosuf: 0
         //wonosuf: vaLineAddChange.wonosuf
      };

      return criteria;
   };

   self.initializeLots = function () {
      if (self.vaLineAddChange && self.vaLineAddChange.serlottype && self.vaLineAddChange.serlottype.toLowerCase() === varfp.SERIAL_LOT_TYPE_LOT) {
         self.icEntryLotsCriteria = self.createIcEntryLotsCriteria();

         //This is a key piece to this. Sending the Criteria to the Lot Control so it can render the data.
         self.lotControl.initialize(self.icEntryLotsCriteria);
      }
   };

   //Callbacks

   //We can only make the call to render the Serial data after the Control is ready thru the framework.
   //This gets called from the framework after that completes.
   self.serialControlReady = function () {
      self.initializeSerials();
   };

   //This gets called from the Serial Control when Save is performed.
   self.serialDoneCallback = function () {
      //Nothing is needed for response
   };

   //We can only make the call to render the Lot data after the Control is ready thru the framework.
   //This gets called from the framework after that completes.
   self.lotControlReady = function () {
      self.initializeLots();
   };

   //This gets called from the Lot Control when Save is performed.
   self.lotDoneCallback = function () {
      //Nothing is needed for response
   };

   //When the Save is performed, we reach into the ExtendedDetailsValueAdd Control and perform the save.
   //After it completes successuflly, this call back is called.  We then continue on to the next step of saving.
   self.extendedDetailsValueAddControlDoneCallback = function () {
      self.saveContinueStep2();
   };

   //When the Save is performed, we reach into the NonstockDetailsValueAdd Control and perform the save.
   //After it completes successuflly, this call back is called.  We then continue on to the next step of saving.
   self.nonstockDetailsValueAddControlDoneCallback = function (data) {
      self.saveContinueStep3();
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSavedCallback = function (wmbinassignment) {
      //By Design, nothing to do when Save is performed from the Bin Allocation Control.
      $state.go('^');
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActionsCallback = function (wmbinassignment) {
      //By Design, nothing to do when Allocate/Deallocate is performed from the Bin Allocation Control.
   };

   self.launchBinAllocation = function () {
      if (self.vaLineListResultsRow) {
         var wmbinassignCriteria = {
            altwhse: '',
            currproc: vars.WMALLOC_OURPROC_VAET,
            jrnlno: 0,
            kitfl: false,
            lineno: self.vaLineListResultsRow.lineno,
            orderno: self.vaLineListResultsRow.vano,
            ordersuf: self.vaLineListResultsRow.vasuf,
            ourproc: vars.WMALLOC_OURPROC_VAET,
            ordertype: vars.WMALLOC_ORDER_TYPE_VA,
            prod: self.vaLineListResultsRow.shipprod,
            potype: '',
            returnfl: self.vaLineListResultsRow.sctntype && self.vaLineListResultsRow.sctntype.toLowerCase() === vars.SECTIONTYPE_INTERNAL ? true : false,
            seqno: self.vaLineListResultsRow.seqno,
            stkqtyship: self.vaLineListResultsRow.stkqtyship,
            skipnonkitlogic: false,
            stkqtyrcv: 0,
            tobinloc: '',
            unit: self.vaLineListResultsRow.unit,
            vamodule: vars.WMALLOC_VAMODULE,
            wmqtyrcv: 0,
            wmadjtype: vars.WMALLOC_ADJUST_TYPE_SELL,
            whse: self.vaLineListResultsRow.whse
         };

         $state.go('.bin-allocation', {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: false,
            submittedCallback: 'varfpd.binAllocationSavedCallback',
            actionsCallback: 'varfpd.binAllocationActionsCallback'
         });
      }
   };

});

// The Value Add Receiving Finished Product Row Controller.  This is used from the main Item List when a row is expanded.  The user can maintain
// a few fields from this section.  There is also the ability for them to flip the Nonstock Type.  Only if they are changing TO a nonstock item, then
// the Nonstock section is presented for data entry, otherwise they are to use the Drilldown detail screen with Nonstock section.  Additionally,
// be aware that the Product Number is hidden if they are entering data for a nonstock since they enter the Nonstock Product in the Nonstock Section.
// Alias: varfpr
app.controller('ValueAddReceivingFinishedProductRowCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var vars = $scope.vars;
   var varfp = $scope.varfp;
   var item = varfp.rowParams.item;
   var grid = varfp.rowParams.grid;
   var row = varfp.rowParams.row;
   self.vaLineAddChange = {};

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);
   self.originalNonstockType = self.rowDetail.nonstockty;

   // We only offer the Nonstock section if they've changed the type from a Stocked type to Nonstock.  Othwerwise, they should use the Nonstock screen
   // from the Detail view.  The reason is:  There's too much data in this section, but in the slight case where they change the type, we offer it.
   self.isNonstockVisible = function () {
      var isVisible = false;
      if (self.originalNonstockType !== varfp.NONSTOCKTYPE_NONSTOCK && self.rowDetail && self.rowDetail.sctntype && self.rowDetail.nonstockty) {
         if (varfp.sectionTypesForNonstock.indexOf(self.rowDetail.sctntype.toLowerCase() > -1) &&
            self.rowDetail.nonstockty.toLowerCase() === varfp.NONSTOCKTYPE_NONSTOCK) {
            isVisible = true;
         }
      }
      return isVisible;
   };

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.saveContinueStep2 = function () {
      //Overwrite the editable fields
      self.vaLineAddChange.nonstockty = self.rowDetail.nonstockty;
      self.vaLineAddChange.shipprod = self.rowDetail.shipprod;
      self.vaLineAddChange.qtyneeded = self.rowDetail.qtyneeded;
      self.vaLineAddChange.unit = self.rowDetail.unit;
      self.vaLineAddChange.qtybasetotfl = self.rowDetail.qtybasetotfl;

      //See if we need to save Nonstock data (and only offer if they are changing from a stocked to a nonstock).
      if (self.originalNonstockType !== varfp.NONSTOCKTYPE_NONSTOCK && self.vaLineAddChange && self.vaLineAddChange.nonstockty === varfp.NONSTOCKTYPE_NONSTOCK && self.nonstockDetailsValueAddControl) {

         //Need to overwrite the Nonstock fields with what they have in the Expandable section.
         self.vaLineAddChange.shipprod = self.rowDetail.shipprod;
         self.vaLineAddChange.proddesc = self.rowDetail.proddesc;
         self.vaLineAddChange.proddesc2 = self.rowDetail.proddesc2;
         self.vaLineAddChange.cubes = self.rowDetail.cubes;
         self.vaLineAddChange.weight = self.rowDetail.weight;
         self.vaLineAddChange.prodcost = self.rowDetail.prodcost;
         self.vaLineAddChange.prodcat = self.rowDetail.prodcat;
         self.vaLineAddChange.arpvendno = self.rowDetail.arpvendno;
         self.vaLineAddChange.arpprodline = self.rowDetail.arpprodline;
         self.vaLineAddChange.arpwhse = self.rowDetail.arpwhse;
         self.vaLineAddChange.whse = self.rowDetail.whse;
         self.vaLineAddChange.rushfl = self.rowDetail.rushfl;
         self.vaLineAddChange.leadtm = self.rowDetail.leadtm;

         self.nonstockDetailsValueAddControl.save();
      } else {
         self.saveContinueStep3(false);
      }
   };

   self.saveContinueStep3 = function (isNonstockInvolved) {
      var vaLineUpdateCriteria = {
         valineaddchg: self.vaLineAddChange,
         pvFunctionnm: vars.MENUFUNCTION_VAEI,
         pvVano: self.rowDetail.vano,
         pvVasuf: self.rowDetail.vasuf,
         pvSeqno: self.rowDetail.seqno
      };

      DataService.post('api/va/asvaline/valineupdate', { data: vaLineUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.vaLineAddChange = data.valineaddchg;

               if (data.valinelistresults && data.valinelistresults.length > 0) {

                  //Just pull out the 1st one from the collection, that's all we sent get back from the update.
                  var valinelistresult = data.valinelistresults[0];

                  //Write changes back to main List so we don't need to re-query to see the latest.
                  varfp.vaLineListResults.forEach(function (vaLineListResult) {
                     if (vaLineListResult.vano === valinelistresult.vano &&
                        vaLineListResult.vasuf === valinelistresult.vasuf &&
                        vaLineListResult.seqno === valinelistresult.seqno &&
                        vaLineListResult.lineno === valinelistresult.lineno) {

                        vaLineListResult.nonstockty = valinelistresult.nonstockty;
                        vaLineListResult.shipprod = valinelistresult.shipprod;
                        vaLineListResult.qtyneeded = valinelistresult.qtyneeded;
                        vaLineListResult.qtybasetotfl = valinelistresult.qtybasetotfl;
                        vaLineListResult.unit = valinelistresult.unit;

                        //Only if the user flipped the Nonstock type to Nonstock during this extended section, do we need to overwrite these values.
                        if (isNonstockInvolved) {
                           vaLineListResult.proddesc = valinelistresult.proddesc;
                           vaLineListResult.proddesc2 = valinelistresult.proddesc2;
                           vaLineListResult.cubes = valinelistresult.cubes;
                           vaLineListResult.weight = valinelistresult.weight;
                           vaLineListResult.prodcost = valinelistresult.prodcost;
                           vaLineListResult.prodcat = valinelistresult.prodcat;
                           vaLineListResult.arpvendno = valinelistresult.arpvendno;
                           vaLineListResult.arpprodline = valinelistresult.arpprodline;
                           vaLineListResult.arpwhse = valinelistresult.arpwhse;
                           vaLineListResult.whse = valinelistresult.whse;
                           vaLineListResult.rushfl = valinelistresult.rushfl;
                           vaLineListResult.leadtm = valinelistresult.leadtm;
                        }

                        var currentIndex = varfp.vaLineListResults.indexOf(vaLineListResult);
                        varfp.itemsGrid.updateRow(currentIndex);
                     }
                  });
               }

               //Collapse the current row.
               self.cancel();

            }
         }
      });
   };

   self.save = function () {
      var vaLineInitializeUpdateCriteria = {
         pvFunctionnm: vars.MENUFUNCTION_VAEI,
         pvVano: self.rowDetail.vano,
         pvVasuf: self.rowDetail.vasuf,
         pvSeqno: self.rowDetail.seqno,
         pvLineno: self.rowDetail.lineno
      };

      DataService.post('api/va/asvaline/valineinitializeupdate', { data: vaLineInitializeUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.vaLineAddChange = data.valineaddchg;
               self.saveContinueStep2();
            }
         }
      });
   };

   //Callbacks

   //When the Save is performed, we reach into the NonstockDetailsValueAdd Control and perform the save.
   //After it completes successuflly, this call back is called.  We then continue on to the next step of saving.
   self.nonstockDetailsValueAddControlDoneCallback = function (data) {
      self.saveContinueStep3(true);
   };

});
