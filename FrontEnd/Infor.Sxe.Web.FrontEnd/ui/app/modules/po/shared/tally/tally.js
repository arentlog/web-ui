'use-strict';

/**
 * Steps to implement this Tally Control:
 *
 * 1) This is only to be used in Purchase Order module.
 * 2) In the calling view with WYSIWYG, create Sub View and point to the Custom Control: "PO Tally"
 * 3) In the calling view controller:
 *    a) If you need to have the Tally control call back when the Save is performed, create a function
 *       in the caller:  (i.e. poei.js has 'acceptTallyUpdate' that accepts some payload).
 * 4) If you need the callback, in WYSIWYG, assign this function name in the "Save Callback Function" option field.
 *    NOTE:  Be aware where you are calling from because if this Tally Control is sitting on the Bundles Control,
 *           the callback and Control Reference is the Bundle Detail Controller instead of the main function's controller.
 */

/**
 * Control for displaying PO Tally data.  Used in POEI, POIP, and POET.
 * Alias: tally
 */
app.controller('PoTallyCtrl', function ($scope, $state, $translate, Utils, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.FUNCTIONNAME_POEI = 'poei';
   self.FUNCTIONNAME_POIP = 'poip';
   self.FUNCTIONNAME_POET = 'poet';
   self.ORDERTYPE = 'p';
   self.TALLY_COMPONENTS_DELETED = 'd';
   self.COMPONENT_MODE_ADD = 'add';
   self.COMPONENT_MODE_UPDATE = 'upd';
   self.TALLY_MEMO_PRODUCT = "** Memo Tally Component **";
   self.functionName = '';
   self.purchaseOrderNumber = 0;
   self.purchaseOrderSuffix = 0;
   self.lineNumber = 0;
   self.prod = '';
   self.units = '';
   self.quantityReceived = 0;
   self.price = '';
   self.whse = '';
   self.menuSecurityLevel = 0;
   self.isTallyOnBundle = false;
   self.saveCallbackFunction = null;
   self.isTallyDetailsVisible = false;

   self.poTallyCriteria = {};
   self.poTallySingle = {};
   self.poTallyResults = [];
   self.poTallyResultsFiltered = [];
   self.poTallyResultsRow = null;
   self.poTallyComponent = null;

   //This is used to determine if we should hide or show the Tally Grid or show the Edit section.  Since this is a control,
   //it can't have it's own states or states for related screens.  Depending on the mode, we may hide entire sections of the
   //view.
   self.isDetailEditMode = false;

   //NOTE:  This needs to be called first.  We need the flag for later processing.
   if (options.getBundlesFlagModel) {
      self.isTallyOnBundle = options.getBundlesFlagModel;
   }

   if (options.functionNameModel) {
      //If this is a Tally on a bundle, then the functionName is in a instance variable.
      if (self.isTallyOnBundle) {
         self.functionName = Utils.getNestedValue($scope, options.functionNameModel);
      } else {
         //If this is a Tally, not on a bundle, then the functionName is hardcoded value at design time.
         self.functionName = options.functionNameModel;
      }
   }

   if (options.saveCallbackModel) {
      self.saveCallbackFunction = Utils.getNestedValue($scope, options.saveCallbackModel);
   }

   if (options.purchaseOrderNumberModel) {
      self.purchaseOrderNumber = Utils.getNestedValue($scope, options.purchaseOrderNumberModel);
   }

   if (options.purchaseOrderSuffixModel) {
      self.purchaseOrderSuffix = Utils.getNestedValue($scope, options.purchaseOrderSuffixModel);
   }

   if (options.lineNumberModel) {
      self.lineNumber = Utils.getNestedValue($scope, options.lineNumberModel);
   }

   if (options.productModel) {
      self.prod = Utils.getNestedValue($scope, options.productModel);
   }

   if (options.unitModel) {
      self.units = Utils.getNestedValue($scope, options.unitModel);
   }

   if (options.quantityReceivedModel) {
      self.quantityReceived = Utils.getNestedValue($scope, options.quantityReceivedModel);
   }

   if (options.priceModel) {
      self.price = Utils.getNestedValue($scope, options.priceModel);
   }

   if (options.warehouseModel) {
      self.whse = Utils.getNestedValue($scope, options.warehouseModel);
   }

   if (options.menuSecurityModel) {
      self.menuSecurityLevel = Utils.getNestedValue($scope, options.menuSecurityModel);
   }

   self.setIsTallyDetailsVisible = function () {
      self.isTallyDetailsVisible = false;
      if (self.poTallyCriteria && self.poTallySingle) {
         if (!self.poTallyCriteria.inquirefl && (this.poTallySingle.lRandomMix || this.poTallySingle.lBundleFl)) {
            self.isTallyDetailsVisible = true;
         }
      }
   };

   self.navigateToProduct = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };

   self.initialize = function () {
      self.poTallyCriteria = {
         eachfl: self.functionName === self.FUNCTIONNAME_POEI ? true : false,
         functionname: self.functionName,
         getbundlefl: self.isTallyOnBundle,
         inquirefl: self.functionName === self.FUNCTIONNAME_POIP ? true : false,
         iSecurity: self.menuSecurityLevel,
         lineno: self.lineNumber,
         ordertype: self.ORDERTYPE,
         price: self.price,
         prod: self.prod,
         pono: self.purchaseOrderNumber,
         posuf: self.purchaseOrderSuffix,
         qtyreq: self.quantityReceived,
         units: self.units,
         whse: self.whse
      };

      DataService.post('api/po/aspoinquiry/loadpotally', { data: self.poTallyCriteria, busy: true }, function (data) {
         if (data) {
            self.poTallyResults = data.loadpotallyresults;
            self.poTallySingle = data.loadpotallysingle;

            //Build out the grid that only shows non-deleted rows.  Anytime we get a new copy of this collection,
            //we build this out.
            self.poTallyResultsFiltered = data.loadpotallyresults.filter(function (row) {
               return row.statustype !== self.TALLY_COMPONENTS_DELETED;
            });

            self.setIsTallyDetailsVisible();
         }
      });
   };

   self.leaveTallyField = function (fieldName) {
      var poTallyLeaveFieldCriteria = {
         loadpotallyresults: self.poTallyResults,
         loadpotallycriteria: self.poTallyCriteria,
         loadpotallysingle: self.poTallySingle,
         cField: fieldName
      };

      DataService.post('api/po/aspoentry/potallyleavefield', { data: poTallyLeaveFieldCriteria, busy: true }, function (data) {
         if (data) {
            self.poTallyResults = data.loadpotallyresults;
            self.poTallySingle = data.loadpotallysingle;

            self.poTallyResultsFiltered = data.loadpotallyresults.filter(function (row) {
               return row.statustype !== self.TALLY_COMPONENTS_DELETED;
            });
         }
      });
   };

   self.save = function () {
      var loadPoTallyCriteria = {
         loadpotallyresults: self.poTallyResults,
         loadpotallycriteria: self.poTallyCriteria,
         loadpotallysingle: self.poTallySingle
      };

      DataService.post('api/po/aspoentry/potallyupdate', { data: loadPoTallyCriteria, busy: true }, function (data) {
         if (data) {
            self.poTallyCriteria = data;

            //This is defined at design time and is only required in some places, those that require additional processing
            //to occur after a Save is complete. (i.e. to update more data on the Purchase Order Line.)
            if (self.saveCallbackFunction) {
               var payload = {
                  functionName: self.functionName,
                  pono: self.purchaseOrderNumber,
                  posuf: self.purchaseOrderSuffix,
                  lineno: self.lineNumber,
                  qty: self.poTallyCriteria.qtyreq,
                  price: self.poTallyCriteria.price,
                  unit: self.poTallyCriteria.units,
                  isTallyOnBundle: self.isTallyOnBundle
               };

               self.saveCallbackFunction(payload);
            }
         }
      });
   };

   self.calculateNewMix = function () {
      var poTallyCalcNewMixCriteria = {
         loadpotallyresults: self.poTallyResults,
         loadpotallycriteria: self.poTallyCriteria,
         loadpotallysingle: self.poTallySingle
      };

      // User Hook (do not rename)
      if (self.tallyCalcNewMixCriteria) {
         self.tallyCalcNewMixCriteria(poTallyCalcNewMixCriteria);
      }

      DataService.post('api/po/aspoentry/potallycalcnewmix', { data: poTallyCalcNewMixCriteria, busy: true }, function (data) {
         if (data) {
            self.poTallyResults = data.loadpotallyresults;
            self.poTallySingle = data.loadpotallysingle;

            self.poTallyResultsFiltered = data.loadpotallyresults.filter(function (row) {
               return row.statustype !== self.TALLY_COMPONENTS_DELETED;
            });
         }
      });
   };

   self.launchDetail = function () {
      ModalService.showActionPanel('po/shared/tally/tally-detail.json', 'PoTallyDetailCtrl as td', $scope, function (modal) {
         self.tallyDetailModal = modal;
      });
   };

   self.editSequence = function () {
      self.poTallyResultsRow = GridService.getSelectedRecord(self.tallyGrid);
      if (self.poTallyResultsRow) {
         self.buildTallyComponent();
         self.launchDetail();
      }
   };

   self.drillDown = function (e, args) {
      self.poTallyResultsRow = args[0].item;
      if (self.isTallyDetailsVisible) {
         if (self.poTallyResultsRow) {
            self.buildTallyComponent();
            self.launchDetail();
         }
      } else {
         MessageService.info('global.information', 'message.drill.down.not.available.for.this.type.of.line');
      }
   };

   self.buildTallyComponent = function () {
      self.poTallyComponent = {
         lRandomMix: self.poTallySingle.lRandomMix,
         cMode: self.COMPONENT_MODE_UPDATE,
         cProd: self.poTallyResultsRow.shipprod,
         proddesc: self.poTallyResultsRow.descrip1,
         iQtyOrd: self.poTallyResultsRow.qtyord,
         cWhse: self.poTallyCriteria.whse,
         cTallyProd: self.poTallyCriteria.prod,
         lMemoMix: self.poTallySingle.lMemoMix,
         iLength: self.poTallyResultsRow.length,
         lDelayResrvFl: self.poTallyResultsRow.delayresvfl,
         compseqno: self.poTallyResultsRow.compseqno,
         qtyavail: self.poTallyResultsRow.qtyavail,
         countryoforigin: self.poTallyResultsRow.countryoforigin,
         tariffcd: self.poTallyResultsRow.tariffcd
      };
   };

   self.newTallyComponent = function () {
      self.poTallyComponent = {
         lRandomMix: self.poTallySingle.lRandomMix,
         cMode: self.COMPONENT_MODE_ADD,
         cProd: '',
         iQtyOrd: 1,
         proddesc: '',
         cWhse: self.poTallyCriteria.whse,
         cTallyProd: self.poTallyCriteria.prod,
         lMemoMix: self.poTallySingle.lMemoMix,
         lLength: 1,
         lDelayResrvFl: false,
         compseqno: 0,
         countryoforigin: '',
         tarrifcd: ''
      };

      self.launchDetail(true);
   };

   self.deleteTallyComponent = function () {
      //Backend call only handles one delete at a time.
      var selectedRow = GridService.getSelectedRecord(self.tallyGrid);
      if (selectedRow) {
         MessageService.yesNo('global.question', 'question.confirm.delete.of.selected.sequences',
         function () {
            //We mark the row to be deleted for the backend call.
            selectedRow.statustype = self.TALLY_COMPONENTS_DELETED;

            var poTallyDeleteComponentCriteria = {
               loadpotallyresults: self.poTallyResults,
               loadpotallycriteria: self.poTallyCriteria,
               loadpotallysingle: self.poTallySingle
            };

            DataService.post('api/po/aspoentry/potallydeletecomponent', { data: poTallyDeleteComponentCriteria, busy: true }, function (data) {
               if (data) {
                  self.poTallySingle = data;

                  //Simply rebuild the Filtered list without the Deleted rows.  We don't get the updated list from this call.
                  self.poTallyResultsFiltered = self.poTallyResults.filter(function (row) {
                     return row.statustype !== self.TALLY_COMPONENTS_DELETED;
                  });
               }
            });
         });
      }
   };

   //Callbacks
   self.tallyDetailsOkCallback = function (poTallyResults, poTallySingle) {
      self.poTallyResults = poTallyResults;
      self.poTallySingle = poTallySingle;

      self.poTallyResultsFiltered = self.poTallyResults.filter(function (row) {
         return row.statustype !== self.TALLY_COMPONENTS_DELETED;
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

   self.initialize();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

//This is used when the user Edits or drills into a Tally.  It's also used when they create aa new one.
//Alias: td
app.controller('PoTallyDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var tally = $scope.tally;
   self.tallyMemoProduct = {};
   self.poTallyResultsRow = tally.poTallyResultsRow;
   self.poTallyComponent = tally.poTallyComponent;
   self.tallyMemoProduct = tally.TALLY_MEMO_PRODUCT;

   self.getTitle = function () {
      if (self.poTallyComponent && self.poTallyComponent.cMode === tally.COMPONENT_MODE_ADD) {
         return $translate.instant('global.add.tally');
      } else {
         return $translate.instant('global.tally.details');
      }
   };

   self.cancel = function () {
      tally.tallyDetailModal.destroy();
   };

   self.submit = function () {
      var poTallyAddChangeComponentCriteria = {
         loadpotallyresults: tally.poTallyResults,
         loadpotallycriteria: tally.poTallyCriteria,
         loadpotallysingle: tally.poTallySingle,
         potallycomponent: self.poTallyComponent
      };

      DataService.post('api/po/aspoentry/potallyaddchangecomponent', { data: poTallyAddChangeComponentCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.poTallyResults = data.loadpotallyresults;
               self.poTallySingle = data.loadpotallysingle;
               self.poTallyComponent = data.potallycomponent;

               //Send the payload back so we can update the calling grid.
               if (tally.tallyDetailsOkCallback) {
                  tally.tallyDetailsOkCallback(self.poTallyResults, self.poTallySingle);
               }

               // Close modal
               tally.tallyDetailModal.destroy();
            }
         }
      });

      tally.isDetailEditMode = false;
   };
});
