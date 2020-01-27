'use-strict';

/**
 * Control for displaying Ties.  Depending on where this is called, it might be Inquiry Only (POEI, OEIO),
 * Editable (VAEI), or Editable and Add Mode (VAET), or Editable Add and Delete Mode (POET, WTET).
 * Alias: ties
 */
app.controller('TiesCtrl', function ($scope, $state, $translate, Utils, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.DOCUMENT_DELIMITER = '-';
   self.LOOKUPDATASOURCE_ENTRY = 'entry';
   self.TIETYPE_ORD = 'order';
   self.TIETYPE_ORDER = 'o';            // The TieOrderType converter will change what the User sees.
   self.TIETYPE_PURCHASEORDER = 'p';
   self.TIETYPE_PURCHASE_ORDER = 'purchase order';
   self.TIETYPE_TRANSFER = 't';
   self.TIETYPE_WAREHOUSETRANSFER = 'warehouse transfer';
   self.TRANSFER = 'transfer';
   self.TIETYPE_WORKORDER = 'w';
   self.TIETYPE_WORK_ORDER = 'work order';
   self.TIETYPE_VALUE_ADD = "value add";
   self.TIETYPE_VALUEADD = 'f';
   self.TIETYPE_FABVA = 'fab va';
   self.TIETYPE_KP = 'w';
   self.TIETYPE_OE = 'o';
   self.TIETYPE_PO = 'p';
   self.TIETYPE_VA = 'f';
   self.TIETYPE_WT = 't';
   self.lineTies = [];
   self.companyNumber = 0;
   self.orderNumber = 0;
   self.orderSuffix = 0;
   self.lineNumber = 0;
   self.sequenceNumber = 0;
   self.prod = '';
   self.nonStockType = '';
   self.transType = '';
   self.productCategory = '';
   self.warehouse = '';

   //Values for Design Time.  Do not modify these.  The bindings in the ties-options and design time rely on them.
   var tieTypePurchasing = 'Purchase Order';
   var tieTypeTransfer = 'Warehouse Transfer';
   var tieTypeOrderEntry = 'Order Entry';
   var tieTypeValueAdd = 'Value Add';
   var modeInquiry = 'Inquiry Only';
   var modeInquiryEdit = 'Inquiry and Edit';
   var modeInquiryEditAdd = 'Inquiry, Edit, and Add';
   var modeInquiryEditAddDelete = 'Inquiry, Edit, Add, and Delete';

   var mode = $translate.instant(options.modeModel);
   var tieTypeDescription = $translate.instant(options.tieTypeModel);

   //This option is used when the calling Controller is responsible for building out the
   //list of Ties.  Some functions have that pattern and some functions have the pattern
   //where this Control is responsible for building the collection.
   if (options.resultsCollection) {
      self.lineTies = Utils.getNestedValue($scope, options.resultsCollection);
   }

   if (options.companyNumberModel) {
      self.companyNumber = Utils.getNestedValue($scope, options.companyNumberModel);
   }

   if (options.orderNumberModel) {
      self.orderNumber = Utils.getNestedValue($scope, options.orderNumberModel);
   }

   if (options.orderSuffixModel) {
      self.orderSuffix = Utils.getNestedValue($scope, options.orderSuffixModel);
   }

   if (options.lineNumberModel) {
      self.lineNumber = Utils.getNestedValue($scope, options.lineNumberModel);
   }

   if (options.sequenceNumberModel) {
      self.sequenceNumber = Utils.getNestedValue($scope, options.sequenceNumberModel);
   }

   if (options.prodModel) {
      self.prod = Utils.getNestedValue($scope, options.prodModel);
   }

   if (options.nonStockTypeModel) {
      self.nonStockType = Utils.getNestedValue($scope, options.nonStockTypeModel);
   }

   if (options.transTypeModel) {
      self.transType = Utils.getNestedValue($scope, options.transTypeModel);
   }

   if (options.productCategoryModel) {
      self.productCategory = Utils.getNestedValue($scope, options.productCategoryModel);
   }

   if (options.warehouseModel) {
      self.warehouse = Utils.getNestedValue($scope, options.warehouseModel);
   }

   //Both of these Grid Results Collections are of the type: Tiecreatetiettresults
   self.tieInquiryResults = [];
   self.tieEditableResults = [];

   self.isInquiryGridVisible = false;
   self.isEditGridVisible = false;
   self.isNewButtonVisible = false;
   self.isDeleteButtonVisible = false;

   self.tieType = '';

   self.setGridVisibility = function () {
      if (mode === modeInquiry) {
         self.isInquiryGridVisible = true;
         self.isEditGridVisible = false;
         self.isNewButtonVisible = false;
         self.isDeleteButtonVisible = false;
      } else if (mode === modeInquiryEdit) {
         self.isInquiryGridVisible = false;
         self.isEditGridVisible = true;
         self.isNewButtonVisible = false;
         self.isDeleteButtonVisible = false;
      } else if (mode === modeInquiryEditAdd) {
         self.isInquiryGridVisible = false;
         self.isEditGridVisible = true;
         self.isNewButtonVisible = true;
         self.isDeleteButtonVisible = false;
      } else if (mode === modeInquiryEditAddDelete) {
         self.isInquiryGridVisible = false;
         self.isEditGridVisible = true;
         self.isNewButtonVisible = true;
         self.isDeleteButtonVisible = true;
      }
   };

   // Order hyperlink
   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         switch (currentRow.ordertype.toLowerCase()) {
            case self.TIETYPE_ORD:
            case self.TIETYPE_ORDER:
               $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case self.TIETYPE_PURCHASEORDER:
            case self.TIETYPE_PURCHASE_ORDER:
               $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case self.TIETYPE_TRANSFER:
            case self.TRANSFER:
            case self.TIETYPE_WAREHOUSETRANSFER:
               $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case self.TIETYPE_VALUE_ADD:
            case self.TIETYPE_FABVA:
            case self.TIETYPE_VALUEADD:
               $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case self.TIETYPE_WORK_ORDER:
            case self.TIETYPE_WORKORDER:
               $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;
         }
      }
   };

   self.initialize = function () {
      self.tieType = '';
      switch (tieTypeDescription) {
         case tieTypePurchasing:
            self.tieType = self.TIETYPE_PO;
            break;
         case tieTypeTransfer:
            self.tieType = self.TIETYPE_WT;
            break;
         case tieTypeOrderEntry:
            self.tieType = self.TIETYPE_OE;
            break;
         case tieTypeValueAdd:
            self.tieType = self.TIETYPE_VA;
            break;
      }

      if (self.tieType.length > 0) {
         if (self.isInquiryGridVisible) {
            var tieCreateTieTempTableCriteria = {
               cono2: self.companyNumber,
               tietype: self.tieType,
               docorderno: self.orderNumber,
               docordersuf: self.orderSuffix,
               doclineno: self.lineNumber,
               docseqno: (self.sequenceNumber ? self.sequenceNumber : 0)
            };

            DataService.post('api/oe/asoeinquiry/tiecreatetietemptable', { data: tieCreateTieTempTableCriteria, busy: true }, function (data) {
               if (data) {
                  self.tieInquiryResults = data;
               }
            });
         }
         if (self.isEditGridVisible) {

            // Value Add editable grid - VAES, VAET
            if (self.tieType === self.TIETYPE_VA) {
               var vaHeaderTiesCriteria = {
                  cono2: self.companyNumber,
                  tietype: self.tieType,
                  docorderno: self.orderNumber,
                  docordersuf: self.orderSuffix,
                  doclineno: self.lineNumber,
                  docseqno: self.sequenceNumber,
                  prod: self.prod,
                  nonstockty: self.nonStockType
               };

               DataService.post('api/va/asvaheader/vaheaderties', { data: vaHeaderTiesCriteria, busy: true }, function (data) {
                  if (data) {
                     //Datatype: Tiecreatetiettresults
                     self.tieEditableResults = data;
                  }
               });
            } else if (self.tieType === self.TIETYPE_PO) {
               //These get built as part of the PO Line Retrieve call and are built outside of this control.
               Utils.replaceObject(self.tieEditableResults, self.lineTies);
            } else if (self.tieType === self.TIETYPE_WT) {
               //These get built as part of the WT Line Retrieve call and are built outside of this control.
               Utils.replaceObject(self.tieEditableResults, self.lineTies);
            } else {
               // Other modules
            }
         }
      }
   };

   self.deleteTie = function () {
      var selectedRows = GridService.getSelectedRecords(self.editableTiesGrid);
      if (selectedRows) {
         MessageService.yesNo('global.question', 'question.confirm.clearing.line.ties.that.have.been.selected', function () {
            //Clear row from the Grid.  Count on the 'Save' to be called to persist the changes.
            selectedRows.forEach(function (row) {
               var index = self.tieEditableResults.indexOf(row);
               self.tieEditableResults.splice(index, 1);
            });
         });
      }
   };

   self.newTie = function () {
      ModalService.showModal('shared/ties/new-tie.json', 'NewTieModalCtrl as tieN', $scope, function (modal) {
         self.newTieModal = modal;
      });
   };

   if (options.conditionReadonly) {
      $scope.$watch(options.conditionReadonly, function (newValue) {
         if (newValue) {
            self.isReadOnly = true;
         } else {
            self.isReadOnly = false;
         }
      });
   }

   self.setGridVisibility();
   self.initialize();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

/**
 * Controller for extended line on a Tie.
 * Alias: row
 */
app.controller('TiesRowDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var ties = $scope.ties;
   var item = ties.rowParams.item;
   var grid = ties.rowParams.grid;
   var row = ties.rowParams.row;

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);
   self.fullOrderNo = self.rowDetail.orderaltno + ties.DOCUMENT_DELIMITER + Utils.pad(self.rowDetail.orderaltsuf, 2);

   self.getConvertedOrderType = function () {
      if (self.rowDetail) {
         switch (self.rowDetail.ordertype.toLowerCase()) {
         case ties.TIETYPE_ORDER:
            return self.rowDetail.ordertype = ties.TIETYPE_OE;
         case ties.TIETYPE_TRANSFER:
            return self.rowDetail.ordertype = ties.TIETYPE_WT;
         case ties.TIETYPE_VA:
            return self.rowDetail.ordertype = ties.TIETYPE_VA;
         case ties.TIETYPE_WORKORDER:
            return self.rowDetail.ordertype = ties.TIETYPE_KP;
         default:
            return '';
         }
      }
   };

   self.getConvertedOrderType();

   self.loadTies = function () {
      if (self.tieType === self.TIETYPE_VA) {
         //TODO: Clean up
//         var vaHeaderTiesCriteria = {
//            cono2: self.companyNumber,
//            tietype: self.tieType,
//            docorderno: self.orderNumber,
//            docordersuf: self.orderSuffix,
//            doclineno: self.lineNumber,
//            docseqno: self.sequenceNumber,
//            prod: self.prod,
//            nonstockty: self.nonStockType
 //        };
//         DataService.post('api/va/asvaheader/vaheaderties', { data: tieCreateCriteria, busy: true }, function(data) {
//            if (data) {
//               self.tieEditableResults = data;
//            }
//         });
      } else {
         //TODO: PO, WT, and other places
      }
   };

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {

      var arr = self.fullOrderNo.split(ties.DOCUMENT_DELIMITER);

      if (ties.tieType === ties.TIETYPE_VA) {

         var tieCriteria = {
            cono2: base.vaet.cono,
            tietype: base.vaet.ordertype,
            docorderno: base.vaet.vano,
            docordersuf: base.vaet.vasuf,
            doclineno: 0,
            docseqno: 0,
            prod: base.vaet.shipprod,
            nonstockty: base.vaet.nonstockty
         };

         var validateTie = {
            seqaltno: self.rowDetail.seqaltno,
            orderaltno: arr[0],
            orderaltsuf: arr[1],
            linealtno: self.rowDetail.linealtno,
            cleartiefl: self.rowDetail.cleartiefl,
            ordertype: self.rowDetail.ordertype,
            tietype: ties.TIETYPE_VA,
            tierecid: self.rowDetail.tierecid,
            transtype: self.rowDetail.transtype,
            seqno: self.rowDetail.seqno,
            cono2: self.rowDetail.wtcono,
            oordertype: item.oordertype,
            oorderaltno: item.orderaltno,
            oorderaltsuf: item.orderaltsuf,
            olinealtno: item.linealtno,
            oseqaltno: item.seqaltno,
            modified: true
         };

         // Validate the tie information
         // If it passes validation, then save the tie information
         DataService.post('api/va/asvaheader/vaheadertieeditvalidate', { data: { tiecreatetiettcriteria: tieCriteria, tiecreatetiettresults: validateTie }, busy: true }, function (data) {
            if (data) {
               if (data.messaging && data.messaging.length > 0) {
                  MessageService.processMessaging(data.messaging);
               } else {
                  var returnTieResults = [];
                  returnTieResults.push(data.tiecreatetiettresults);
                  var vaHeaderFinalUpdateCriteria = { tiecreatetiettresults: returnTieResults, tiecreatetiettcriteria: tieCriteria };
                  DataService.post('api/va/asvaheader/vaheadertiefinalupdate', { data: vaHeaderFinalUpdateCriteria, busy: true }, function (data) {
                     if (data.messaging) {
                        // check errors and display
                        MessageService.processMessaging(data.messaging);
                     } else {
                        MessageService.info('global.information', 'message.save.operation.completed.successfully');
                        grid.toggleRowDetail(row);
                        ties.initialize();
                     }
                  });
               }
            }
         });
      } else if (ties.tieType === ties.TIETYPE_PO) {

         //This is a poline object, with the properties required for Ties processing.
         var validatePoLine = {
            pono: ties.orderNumber,
            posuf: ties.orderSuffix,
            lineno: ties.lineNumber,
            prod: ties.prod,
            nonstockty: ties.nonStockType,
            transtype: ties.transType,
            prodcat: ties.productCategory
         };

         var validatePoTie = {
            seqaltno: self.rowDetail.seqaltno,
            orderaltno: arr[0],
            orderaltsuf: arr[1],
            linealtno: self.rowDetail.linealtno,
            cleartiefl: self.rowDetail.cleartiefl,
            ordertype: self.rowDetail.ordertype,
            tietype: ties.TIETYPE_PO,
            tierecid: self.rowDetail.tierecid,
            transtype: self.rowDetail.transtype,
            seqno: self.rowDetail.seqno,
            cono2: self.rowDetail.wtcono,
            oordertype: item.oordertype,
            oorderaltno: item.orderaltno,
            oorderaltsuf: item.orderaltsuf,
            olinealtno: item.linealtno,
            oseqaltno: item.seqaltno,
            modified: true
         };

         var polinetievalidateCriteria = {
            poline: validatePoLine,
            polineties: validatePoTie
         };

         DataService.post('api/po/aspoline/polinetievalidate', { data: polinetievalidateCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  grid.toggleRowDetail(row);
                  ties.initialize();
               }
            }
         });
      } else if (ties.tieType === ties.TIETYPE_WT) {

         //This is a wtline object, with the properties required for Ties processing.
         var validateWtLine = {
            wtno: ties.orderNumber,
            wtsuf: ties.orderSuffix,
            lineno: ties.lineNumber,
            prod: ties.prod,
            nonstockty: ties.nonStockType,
            prodcati: ties.productCategory
         };

         var validateWtTie = {
            seqaltno: self.rowDetail.seqaltno,
            orderaltno: arr[0],
            orderaltsuf: arr[1],
            linealtno: self.rowDetail.linealtno,
            cleartiefl: self.rowDetail.cleartiefl,
            ordertype: self.rowDetail.ordertype,
            tietype: ties.TIETYPE_WT,
            tierecid: self.rowDetail.tierecid,
            transtype: self.rowDetail.transtype,
            seqno: self.rowDetail.seqno,
            cono2: self.rowDetail.wtcono,
            owtcono: self.rowDetail.wtcono,
            oordertype: item.oordertype,
            oorderaltno: item.orderaltno,
            oorderaltsuf: item.orderaltsuf,
            olinealtno: item.linealtno,
            oseqaltno: item.seqaltno,
            modified: true
         };

         var wtlinetievalidateCriteria = {
            wtline: validateWtLine,
            wtlnties: validateWtTie,
            wtlinecriteria: {}  // SI call does not use.
         };

         DataService.post('api/wt/aswtline/wtlinetievalidate', { data: wtlinetievalidateCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  grid.toggleRowDetail(row);
                  ties.initialize();
               }
            }
         });
      } else {
         // Other modules
      }
   };
});

/**
 * Controller for Adding a new Tie
 * Alias: tieN
 */
app.controller('NewTieModalCtrl', function ($scope, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var ties = $scope.ties;
   self.orderaltno = 0;
   self.orderaltsuf = 0;
   self.linealtno = 0;
   self.seqaltno = 0;

   self.seqno = ties.tieEditableResults.length + 1;
   self.ordertype = ties.TIETYPE_OE;
   self.cleartiefl = false;

   //Break the OE, WT, or KP Workorder apart.
   self.orderSelected = function (args) {
      if (args.value) {
         var argsString = args.value.toString();
         var orderParts = argsString.split(ties.DOCUMENT_DELIMITER);
         if (orderParts.length === 2) {
            self.orderaltno = orderParts[0];
            self.orderaltsuf = orderParts[1];
         } else {
            self.orderaltno = args.value;
            self.orderaltsuf = args.value2;
         }
      } else {
         self.orderaltno = 0;
         self.orderaltsuf = 0;
      }
   };

   //Break the VA Order apart.
   self.vaOrderSelected = function (args) {
      //Some places return a string and some places return separate integers.
      if (args.value) {
         if (args.source === ties.LOOKUPDATASOURCE_ENTRY) {
            var argsString = args.value.toString();
            var orderParts = argsString.split(ties.DOCUMENT_DELIMITER);
            if (orderParts.length === 2) {
               self.orderaltno = orderParts[0];
               self.orderaltsuf = orderParts[1];
            } else {
               self.orderaltno = args.value;
               self.orderaltsuf = 0;
            }
         } else {
            self.orderaltno = args.value;
            self.orderaltsuf = args.value2;
         }
      } else {
         self.orderaltno = 0;
         self.orderaltsuf = 0;
      }
   };

   self.submit = function () {
      if (ties.tieType === ties.TIETYPE_VA) {
         var tieCriteria = {
            cono2: 0,
            tietype: base.vaet.ordertype,
            docorderno: base.vaet.vano,
            docordersuf: base.vaet.vasuf,
            doclineno: 0,
            docseqno: 0,
            prod: base.vaet.shipprod,
            nonstockty: base.vaet.nonstockty
         };

         var validateTie = {
            seqaltno: self.seqaltno,
            orderaltno: self.orderaltno,
            orderaltsuf: self.orderaltsuf,
            linealtno: self.linealtno,
            cleartiefl: self.cleartiefl,
            ordertype: self.ordertype,
            tietype: ties.TIETYPE_VA,
            tierecid: 0,
            transtype: '',
            seqno: self.seqno,
            cono2: 0,
            oordertype: '',
            oorderaltno: 0,
            oorderaltsuf: 0,
            olinealtno: 0,
            oseqaltno: 0,
            modified: true
         };

         // Validate the tie information
         // If it passes validation, then save the tie information
         DataService.post('api/va/asvaheader/vaheadertieeditvalidate', { data: { tiecreatetiettcriteria: tieCriteria, tiecreatetiettresults: validateTie }, busy: true }, function (data) {
            if (data) {
               if (data.messaging && data.messaging.length > 0) {
                  MessageService.processMessaging(data.messaging);
               } else {
                  var returnTieResults = [];
                  returnTieResults.push(data.tiecreatetiettresults);
                  var vaHeaderFinalUpdateCriteria = { tiecreatetiettresults: returnTieResults, tiecreatetiettcriteria: tieCriteria };
                  DataService.post('api/va/asvaheader/vaheadertiefinalupdate', { data: vaHeaderFinalUpdateCriteria, busy: true }, function (data) {
                     if (data.messaging) {
                        // check errors and display
                        MessageService.processMessaging(data.messaging);
                     } else {
                        MessageService.info('global.information', 'message.save.operation.completed.successfully');
                        ties.initialize();
                        ties.newTieModal.destroy();
                     }
                  });
               }
            }
         });
      } else if (ties.tieType === ties.TIETYPE_PO) {
         //This is a partial poline object, with only the properties required for Ties processing.
         var validatePoLine = {
            pono: ties.orderNumber,
            posuf: ties.orderSuffix,
            lineno: ties.lineNumber,
            prod: ties.prod,
            nonstockty: ties.nonStockType,
            transtype: ties.transType,
            prodcat: ties.productCategory
         };

         var validatePoTie = {
            seqaltno: self.seqaltno,
            orderaltno: self.orderaltno,
            orderaltsuf: self.orderaltsuf,
            linealtno: self.linealtno,
            cleartiefl: self.cleartiefl,
            ordertype: self.ordertype,
            tietype: ties.TIETYPE_PO,
            tierecid: 0,
            transtype: '',
            seqno: self.seqno,
            cono2: 0,
            oordertype: '',
            oorderaltno: 0,
            oorderaltsuf: 0,
            olinealtno: 0,
            oseqaltno: 0,
            modified: true
         };

         var polinetievalidateCriteria = {
            poline: validatePoLine,
            polineties: validatePoTie
         };

         DataService.post('api/po/aspoline/polinetievalidate', { data: polinetievalidateCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  ties.tieEditableResults.push(data.polineties);
                  ties.newTieModal.destroy();
               }
            }
         });
      } else if (ties.tieType === ties.TIETYPE_WT) {
         //This is a partial poline object, with only the properties required for Ties processing.
         var validateWtLine = {
            wtno: ties.orderNumber,
            wtsuf: ties.orderSuffix,
            lineno: ties.lineNumber,
            prod: ties.prod,
            nonstockty: ties.nonStockType,
            prodcati: ties.productCategory
         };

         var validateWtTie = {
            wtno: ties.orderNumber,
            wtsuf: ties.orderSuffix,
            lineno: ties.lineNumber,
            seqaltno: self.seqaltno,
            orderaltno: self.orderaltno,
            orderaltsuf: self.orderaltsuf,
            linealtno: self.linealtno,
            cleartiefl: self.cleartiefl,
            ordertype: self.ordertype,
            tietype: ties.TIETYPE_WT,
            tierecid: 0,
            transtype: '',
            seqno: self.seqno,
            wtcono: ties.companyNumber,
            owtcono: ties.companyNumber,
            oordertype: '',
            oorderaltno: 0,
            oorderaltsuf: 0,
            olinealtno: 0,
            oseqaltno: 0,
            modified: true
         };

         var wtlinetievalidateCriteria = {
            wtline: validateWtLine,
            wtlnties: validateWtTie,
            wtlinecriteria: {}  // SI call does not use.
         };

         DataService.post('api/wt/aswtline/wtlinetievalidate', { data: wtlinetievalidateCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  ties.tieEditableResults.push(data.wtlnties);
                  ties.newTieModal.destroy();
               }
            }
         });
      } else {
         // Other modules
      }
   };

   self.cancel = function () {
      ties.newTieModal.destroy();
   };
});
