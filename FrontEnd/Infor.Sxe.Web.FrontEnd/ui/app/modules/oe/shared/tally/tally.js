'use-strict';

/**
 * Steps to implement this Tally Control:
 *
 * 1) This is only to be used in the Order Entry module.
 * 2) In the calling view with WYSIWYG, create Sub View and point to the Custom Control: "OE Tally"
 * 3) In the calling view controller:
 *    a) If you need to have the Tally control call back when the Save is performed, create a function
 *       in the caller:  (i.e. child-states.js OeetAdvancedLineEntryTalliesCtrl has 'acceptTallyUpdate' that accepts some payload).
 * 4) If you need the callback, in WYSIWYG, assign this function name in the "Save Callback Function" option field.
 *    NOTE:  Be aware where you are calling from because if this Tally Control is sitting on the Bundles Control,
 *           the callback and Control Reference is the Bundle Detail Controller instead of the main function's controller.
 */

/**
 * Control for displaying OE Tally data.  Used in OEET and OEIO.
 * Alias: tally
 */
app.controller('OeTallyCtrl', function ($scope, $state, $translate, Utils, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.FUNCTIONNAME_OEIO = 'oeio';
   self.FUNCTIONNAME_OEET = 'oeet';
   self.TALLY_COMPONENTS_DELETED = 'd';
   self.COMPONENT_MODE_ADD = 'add';
   self.COMPONENT_MODE_UPDATE = 'upd';
   self.TALLY_MEMO_PRODUCT = "** Memo Tally Component **";
   self.functionName = '';
   self.orderNumber = 0;
   self.orderSuffix = 0;
   self.lineNumber = 0;
   self.prod = '';
   self.units = '';
   self.quantityOrdered = 0;
   self.whse = '';
   self.custno = '';
   self.shipto = '';
   self.menuSecurityLevel = 0;
   self.isTallyOnBundle = false;
   self.saveCallbackFunction = null;
   self.isTallyDetailsVisible = false;
   self.inquiryMode = false;

   self.oeTallyCriteria = {};
   self.oeTallySingle = {};
   self.oeTallyResults = [];
   self.oeTallyResultsFiltered = [];
   self.oeTallyResultsRow = null;
   self.oeTallyComponent = null;

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

   if (options.inquiryModeModel) {
      self.inquiryMode = options.inquiryModeModel;
   }

   if (options.saveCallbackModel) {
      self.saveCallbackFunction = Utils.getNestedValue($scope, options.saveCallbackModel);
   }

   if (options.orderNumberModel) {
      self.orderNumber = Utils.getNestedValue($scope, options.orderNumberModel);
   }

   if (options.orderSuffixModel) {
      self.orderSuffix = Utils.getNestedValue($scope, options.orderSuffixModel);
   }

   if (options.warehouseModel) {
      self.whse = Utils.getNestedValue($scope, options.warehouseModel);
   }

   if (options.customerModel) {
      self.custno = Utils.getNestedValue($scope, options.customerModel);
   }

   if (options.shipToModel) {
      self.shipto = Utils.getNestedValue($scope, options.shipToModel);
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

   if (options.quantityOrderedModel) {
      self.quantityOrdered = Utils.getNestedValue($scope, options.quantityOrderedModel);
   }

   if (options.menuSecurityModel) {
      self.menuSecurityLevel = Utils.getNestedValue($scope, options.menuSecurityModel);
   }

   self.setIsTallyDetailsVisible = function () {
      self.isTallyDetailsVisible = false;
      if (self.oeTallyCriteria && self.oeTallySingle) {
         if (!self.oeTallyCriteria.inquirefl && (self.oeTallySingle.lRandomMix || self.oeTallySingle.lBundleFl || self.oeTallySingle.lMemoMix)) {
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
      self.oeTallyCriteria = {
         functionname: self.functionName,
         getbundlefl: self.isTallyOnBundle,
         inquirefl: self.inquiryMode,
         iSecurity: self.menuSecurityLevel,
         lineno: self.lineNumber,
         ordertype: 'o',
         price: self.price,
         prod: self.prod,
         orderno: self.orderNumber,
         ordersuf: self.orderSuffix,
         qtyreq: self.quantityOrdered,
         units: self.units,
         whse: self.whse,
         custno: self.custno,
         shipto: self.shipto
      };

      DataService.post('api/oe/asoeline/loadoetally', { data: self.oeTallyCriteria, busy: true }, function (data) {
         if (data) {
            self.oeTallyResults = data.loadoetallyresults;
            self.oeTallySingle = data.loadoetallysingle;

            //Build out the grid that only shows non-deleted rows.  Anytime we get a new copy of this collection,
            //we build this out.
            self.oeTallyResultsFiltered = data.loadoetallyresults.filter(function (row) {
               return row.statustype !== self.TALLY_COMPONENTS_DELETED;
            });

            self.setIsTallyDetailsVisible();
         }
      });
   };

   self.leaveTallyUnit = function () {
      var oeTallyLeaveUnitCriteria = {
         loadoetallyresults: self.oeTallyResults,
         loadoetallysingle: self.oeTallySingle
      };

      DataService.post('api/oe/asoeline/oetallyleaveunit', { data: oeTallyLeaveUnitCriteria, busy: true }, function (data) {
         if (data) {
            self.oeTallySingle = data.loadoetallysingle;
         }
      });
   };

   self.save = function () {
      var loadOeTallyCriteria = {
         loadoetallyresults: self.oeTallyResults,
         loadoetallycriteria: self.oeTallyCriteria,
         loadoetallysingle: self.oeTallySingle
      };

      DataService.post('api/oe/asoeline/oetallyupdate', { data: loadOeTallyCriteria, busy: true }, function (data) {
         if (data) {
            self.oeTallyCriteria = data;

            //This is defined at design time and is only required in some places, those that require additional processing
            //to occur after a Save is complete. (i.e. to update more data on the Order Line.)
            if (self.saveCallbackFunction) {
               var payload = {
                  qty: self.oeTallyCriteria.qtyreq,
                  unit: self.oeTallyCriteria.units
               };

               self.saveCallbackFunction(payload);
            }
         }
      });
   };

   self.calculateNewMix = function () {
      var oeTallyCalcNewMixCriteria = {
         loadoetallyresults: self.oeTallyResults,
         loadoetallycriteria: self.oeTallyCriteria,
         loadoetallysingle: self.oeTallySingle
      };

      // User Hook (do not rename)
      if (self.tallyCalcNewMixCriteria) {
         self.tallyCalcNewMixCriteria(oeTallyCalcNewMixCriteria);
      }

      DataService.post('api/oe/asoeline/oetallycalcnewmix', { data: oeTallyCalcNewMixCriteria, busy: true }, function (data) {
         if (data) {
            self.oeTallyResults = data.loadoetallyresults;
            self.oeTallySingle = data.loadoetallysingle;

            self.oeTallyResultsFiltered = data.loadoetallyresults.filter(function (row) {
               return row.statustype !== self.TALLY_COMPONENTS_DELETED;
            });
         }
      });
   };

   self.launchDetail = function () {
      ModalService.showActionPanel('oe/shared/tally/tally-detail.json', 'OeTallyDetailCtrl as td', $scope, function (modal) {
         self.tallyDetailModal = modal;
      });
   };

   self.editSequence = function () {
      self.oeTallyResultsRow = GridService.getSelectedRecord(self.tallyGrid);
      if (self.oeTallyResultsRow) {
         self.buildTallyComponent();
         self.launchDetail();
      }
   };

   self.drillDown = function (e, args) {
      self.oeTallyResultsRow = args[0].item;
      if (self.isTallyDetailsVisible) {
         if (self.oeTallyResultsRow) {
            self.buildTallyComponent();
            self.launchDetail();
         }
      } else {
         MessageService.info('global.information', 'message.drill.down.not.available.for.this.type.of.line');
      }
   };

   self.buildTallyComponent = function () {
      self.oeTallyComponent = {
         lRandomMix: self.oeTallySingle.lRandomMix,
         cMode: self.COMPONENT_MODE_UPDATE,
         cProd: self.oeTallyResultsRow.shipprod,
         proddesc: self.oeTallyResultsRow.descrip1,
         iQtyOrd: self.oeTallyResultsRow.qtyord,
         cWhse: self.oeTallyCriteria.whse,
         cTallyProd: self.oeTallyCriteria.prod,
         lMemoMix: self.oeTallySingle.lMemoMix,
         iLength: self.oeTallyResultsRow.length,
         lDelayResrvFl: self.oeTallyResultsRow.delayresvfl,
         compseqno: self.oeTallyResultsRow.compseqno,
         qtyavail: self.oeTallyResultsRow.qtyavail,
         countryoforigin: self.oeTallyResultsRow.countryoforigin,
         tariffcd: self.oeTallyResultsRow.tariffcd
      };
   };

   self.newTallyComponent = function () {
      self.oeTallyComponent = {
         lRandomMix: self.oeTallySingle.lRandomMix,
         cMode: self.COMPONENT_MODE_ADD,
         cProd: '',
         iQtyOrd: 1,
         proddesc: '',
         cWhse: self.oeTallyCriteria.whse,
         cTallyProd: self.oeTallyCriteria.prod,
         lMemoMix: self.oeTallySingle.lMemoMix,
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

            var oeTallyDeleteComponentCriteria = {
               loadoetallyresults: self.oeTallyResults,
               loadoetallysingle: self.oeTallySingle
            };

            DataService.post('api/oe/asoeline/oetallydeletecomponent', { data: oeTallyDeleteComponentCriteria, busy: true }, function (data) {
               if (data) {
                  self.oeTallySingle = data;

                  //Simply rebuild the Filtered list without the Deleted rows.  We don't get the updated list from this call.
                  self.oeTallyResultsFiltered = self.oeTallyResults.filter(function (row) {
                     return row.statustype !== self.TALLY_COMPONENTS_DELETED;
                  });
               }
            });
         });
      }
   };

   //Callbacks
   self.tallyDetailsOkCallback = function (oeTallyResults, oeTallySingle) {
      self.oeTallyResults = oeTallyResults;
      self.oeTallySingle = oeTallySingle;

      self.oeTallyResultsFiltered = self.oeTallyResults.filter(function (row) {
         return row.statustype !== self.TALLY_COMPONENTS_DELETED;
      });
   };

   self.initialize();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

//This is used when the user Edits or drills into a Tally.  It's also used when they create aa new one.
//Alias: td
app.controller('OeTallyDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var tally = $scope.tally;
   self.tallyMemoProduct = {};
   self.oeTallyResultsRow = tally.oeTallyResultsRow;
   self.oeTallyComponent = tally.oeTallyComponent;
   self.oeTallySingle = tally.oeTallySingle;
   self.tallyMemoProduct = tally.TALLY_MEMO_PRODUCT;

   self.getTitle = function () {
      if (self.oeTallyComponent && self.oeTallyComponent.cMode === tally.COMPONENT_MODE_ADD) {
         return $translate.instant('global.add.tally');
      } else {
         return $translate.instant('global.tally.details');
      }
   };

   self.tallyCompLeaveProd = function () {
      var compLeaveProdRequest = {
         loadoetallycriteria: tally.oeTallyCriteria,
         loadoetallysingle: tally.oeTallySingle,
         oetallycomponent: self.oeTallyComponent
      };
      DataService.post('api/oe/asoeline/oetallycompleaveprod', { data: compLeaveProdRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.oeTallyComponent = data.oetallycomponent;
            }
         }
      });
   };

   self.cancel = function () {
      tally.tallyDetailModal.destroy();
   };

   self.submit = function () {
      var oeTallyAddChangeComponentCriteria = {
         loadoetallyresults: tally.oeTallyResults,
         loadoetallycriteria: tally.oeTallyCriteria,
         loadoetallysingle: tally.oeTallySingle,
         oetallycomponent: self.oeTallyComponent
      };

      DataService.post('api/oe/asoeline/oetallyaddchangecomponent', { data: oeTallyAddChangeComponentCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.oeTallyResults = data.loadoetallyresults;
               self.oeTallySingle = data.loadoetallysingle;
               self.oeTallyComponent = data.oetallycomponent;

               //Send the payload back so we can update the calling grid.
               if (tally.tallyDetailsOkCallback) {
                  tally.tallyDetailsOkCallback(self.oeTallyResults, self.oeTallySingle);
               }

               // Close modal
               tally.tallyDetailModal.destroy();
            }
         }
      });

      tally.isDetailEditMode = false;
   };
});
