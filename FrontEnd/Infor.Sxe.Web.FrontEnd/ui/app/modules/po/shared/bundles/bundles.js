'use-strict';

/**
 * Steps to implement this PO Bundles Control:
 *
 * 1) This is only to be used in Purchase Order module.
 * 2) In the calling view with WYSIWYG, create Sub View and point to the Custom Control: "PO Bundles"
 * 3) In the calling view controller:
 *    a) If you need to have the Bundle control call back when the Save is performed, create a function
 *       in the caller:  (i.e. poei.js has 'acceptTallyUpdate' that accepts some payload).
 * 4) If you need the callback, in WYSIWYG, assign this function name in the "Save Callback Function" option field.
 */

/**
 * Control for displaying PO Bundles data.  Used in POEI, POIP, and POET.
 * Alias: bundles
 */
app.controller('PoBundlesCtrl', function ($scope, $state, $translate, Utils, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.FUNCTIONNAME_POEI = 'poei';
   self.FUNCTIONNAME_POIP = 'poip';
   self.FUNCTIONNAME_POET = 'poet';
   self.ORDERTYPE = 'p';
   self.TALLY_COMPONENTS_DELETED = 'd';
   self.COMPONENT_MODE_ADD = 'add';
   self.COMPONENT_MODE_UPDATE = 'upd';
   self.BUNDLE_MODE_ADD = 'add';
   self.BUNDLE_MODE_LOAD = 'load';
   self.BUNDLE_MODE_DETAIL = 'detail';
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
   self.getBundlesFlag = false;
   self.saveCallbackFunction = null;
   self.isLoadBundleEnabled = false;
   self.initComplete = false;

   self.poBundlesCriteria = {};
   self.poBundlesControl = {};
   self.poBundlesResults = [];
   self.poBundlesResultsRow = null;

   //This is used to determine what we should hide.  Since this is a control, it can't have it's own states or states for related screens.
   //Depending on the mode, we may hide entire sections of the view.
   self.isDetailEditMode = false;

   //In these modes, we have the ability to enter a Bundle Id.
   self.isDetailAddMode = false;
   self.isDetailLoadMode = false;

   if (options.functionNameModel) {
      self.functionName = options.functionNameModel;
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

   self.isLoadBundleEnabled = function () {
      var isEnabled = false;
      if (self.bundlesGrid.isOneRowSelected) {
         self.poBundlesResultsRow = GridService.getSelectedRecord(self.bundlesGrid);
         //The "** Loose Inventory **" item will have a blank bundle.  That is the only time the
         //Load ID feature is available.
         if (self.poBundlesResultsRow && self.poBundlesResultsRow.bundleid.length === 0) {
            isEnabled = true;
         }
      }
      return isEnabled;
   };

   self.initialize = function () {
      self.poBundlesCriteria = {
         eachfl: self.functionName === self.FUNCTIONNAME_POEI ? true : false,
         functionname: self.functionName,
         getbundlefl: true,
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

      DataService.post('api/po/aspoinquiry/pobundlesload', { data: self.poBundlesCriteria, busy: true }, function (data) {
         if (data) {
            self.poBundlesResults = data.pobundlesresults;
            self.poBundlesControl = data.pobundlescontrol;

            //Helps avoid the screen flash on Grid Columns.
            self.initComplete = true;
         }
      });
   };

   self.leavePriceField = function () {
      var poBundlesCalcAdjustCriteria = {
         pobundlescontrol: self.poBundlesControl,
         pobundlescriteria: self.poBundlesCriteria
      };

      DataService.post('api/po/aspoentry/pobundlescalcadjust', { data: poBundlesCalcAdjustCriteria, busy: true }, function (data) {
         if (data) {
            self.poBundlesControl = data;
         }
      });
   };

   self.save = function () {
      if (self.poBundlesCriteria.functionname === self.FUNCTIONNAME_POEI) {

         self.poBundlesCriteria.qtyreq = self.poBundlesControl.qtyact;

         var poeiBundlesDoneCriteria = {
            pobundlescontrol: self.poBundlesControl,
            pobundlescriteria: self.poBundlesCriteria
         };

         DataService.post('api/po/aspoentry/poeibundlesdone', { data: poeiBundlesDoneCriteria, busy: true }, function (data) {
            if (data) {
               self.poBundlesCriteria = data;

               //This is defined at design time and is only required in some places, those that require additional processing
               //to occur after a Save is complete. (i.e. to update more data on the Purchase Order Line.)
               if (self.saveCallbackFunction) {
                  var payload = {
                     functionName: self.functionName,
                     pono: self.purchaseOrderNumber,
                     posuf: self.purchaseOrderSuffix,
                     lineno: self.lineNumber,
                     qty: self.poBundlesControl.qtyact,
                     price: self.poBundlesCriteria.price,
                     unit: self.poBundlesCriteria.units
                  };

                  self.saveCallbackFunction(payload);
               }
            }
         });
      } else {
         //TODO: something else
      }
   };

   self.calculateAdjustmentFactor = function () {
      var poBundlesCalcaAjustCriteria = {
         pobundlescontrol: self.poBundlesControl,
         pobundlescriteria: self.poBundlesCriteria
      };

      DataService.post('api/po/aspoentry/pobundlescalcadjust', { data: poBundlesCalcaAjustCriteria, busy: true }, function (data) {
         if (data) {
            self.poBundlesControl = data;
         }
      });
   };

   self.launchDetail = function () {
      ModalService.showActionPanel('po/shared/bundles/bundles-detail.json', 'PoBundlesDetailCtrl as bd', $scope, function (modal) {
         self.bundlesDetailModal = modal;
      });
   };

   self.editBundle = function () {
      self.poBundlesResultsRow = GridService.getSelectedRecord(self.bundlesGrid);
      if (self.poBundlesResultsRow) {
         self.launchDetail();
      }
   };

   self.drillDown = function (e, args) {
      self.poBundlesResultsRow = args[0].item;
      if (self.poBundlesResultsRow) {
         self.launchDetail();
      }
   };

   self.addBundle = function () {
      ModalService.showModal('po/shared/bundles/bundles-add-load.json', 'PoBundlesAddCtrl as bal', $scope, function (modal) {
         self.addBundleModal = modal;
      });
   };

   self.loadBundle = function () {
      ModalService.showModal('po/shared/bundles/bundles-add-load.json', 'PoBundlesLoadCtrl as bal', $scope, function (modal) {
         self.loadBundleModal = modal;
      });
   };

   self.deleteBundle = function () {
      //Backend call only handles one delete at a time.
      var selectedRow = GridService.getSelectedRecord(self.bundlesGrid);
      if (selectedRow && selectedRow.bundleid) {
         MessageService.yesNo('global.question', 'question.confirm.delete.of.selected.sequences',
         function () {
            var poBundlesDeleteCriteria = {
               pobundlescontrol: self.poBundlesControl,
               pobundlescriteria: self.poBundlesCriteria,
               cBundleID: selectedRow.bundleid
            };

            DataService.post('api/po/aspoentry/pobundlesdelete', { data: poBundlesDeleteCriteria, busy: true }, function (data) {
               if (data) {
                  self.poBundlesControl = data.pobundlescontrol;
                  self.poBundlesResults = data.pobundlesresults;
               }
            });
         });
      }
   };

   //Callbacks
   self.addBundleOkCallback = function (bundleId, poBundlesControl, poBundlesResults) {
      self.poBundlesControl = poBundlesControl;
      self.poBundlesResults = poBundlesResults;

      //Take us into the Detail, which shows Tally List.
      self.launchDetail();
   };

   self.loadBundleOkCallback = function (bundleId, poBundlesControl, poBundlesResults) {
      self.poBundlesControl = poBundlesControl;
      self.poBundlesResults = poBundlesResults;
   };

   self.bundlesDetailsOkCallback = function (poBundlesControl, poBundlesResults) {
      self.poBundlesControl = poBundlesControl;
      self.poBundlesResults = poBundlesResults;
   };

   self.initialize();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

//This controller is used to show Details for the Bundle.  This is to show Tally Components and the ability to
//access the CRUD for those.
//Alias: bd
app.controller('PoBundlesDetailCtrl', function ($scope, $state, $stateParams, $translate) {
   var self = this;
   var bundles = $scope.bundles;
   self.poBundlesCriteria = bundles.poBundlesCriteria;
   self.poBundlesControl = bundles.poBundlesControl;
   self.poBundlesResults = bundles.poBundlesResults;
   self.poBundlesResultsRow = bundles.poBundlesResultsRow;

   self.getTitle = function () {
      if (self.poBundlesResultsRow && self.poBundlesResultsRow.dispbundleid) {
         return $translate.instant('global.bundle.details') +  bundles.LABEL_DELIMITER + self.poBundlesResultsRow.dispbundleid;
      } else {
         return $translate.instant('global.bundle.details');
      }
   };

   self.cancel = function () {
      // Close modal
      bundles.bundlesDetailModal.destroy();
   };

   self.submitContinue = function () {
      //Send the payload back to the calling place so we can update the calling grid.
      if (bundles.bundlesDetailsOkCallback) {
         bundles.bundlesDetailsOkCallback(self.poBundlesControl, self.poBundlesResults);
      }

      // Close modal
      bundles.bundlesDetailModal.destroy();
   };

   self.submit = function () {
      //Pressing OK from the Bundles Details popup requires us to reach into the Tally Control
      //to save those details first.  Once that finishes, it will call the 'acceptTallyUpdate'
      //callback.
      if (self.tallyControl) {
         self.tallyControl.save();
      } else {
         self.submitContinue();
      }
   };

   //Callbacks
   self.acceptTallyUpdate = function () {
      self.submitContinue();
   };
});

//This controller is used to create a new Bundle.  This is a Modal popup.
//Alias: bal (Same alias as the Load ID, since it uses the same view)
app.controller('PoBundlesAddCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var bundles = $scope.bundles;
   self.poBundlesCriteria = bundles.poBundlesCriteria;
   self.poBundlesControl = bundles.poBundlesControl;
   self.poBundlesResults = bundles.poBundlesResults;
   self.bundleId = '';

   self.getTitle = function () {
      return $translate.instant('global.add.bundle');
   };

   self.cancel = function () {
      bundles.addBundleModal.destroy();
   };

   self.submit = function () {
      var poBundlesAddCriteria = {
         pobundlescontrol: self.poBundlesControl,
         pobundlescriteria: self.poBundlesCriteria,
         cBundleID: self.bundleId
      };

      DataService.post('api/po/aspoentry/pobundlesadd', { data: poBundlesAddCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.poBundlesResults = data.pobundlesresults;
               self.poBundlesControl = data.pobundlescontrol;

               //Send the payload back so we can do more, like update the calling grid and go into Tally entry.
               if (bundles.addBundleOkCallback) {
                  bundles.addBundleOkCallback(self.bundleId, self.poBundlesControl, self.poBundlesResults);
               }

               // Close modal
               bundles.addBundleModal.destroy();
            }
         }
      });
   };
});

//This controller is used to load a Bundle.  This is a Modal popup.
//Alias: bal (Same alias as the Add, since it uses the same view)
app.controller('PoBundlesLoadCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   var self = this;
   var bundles = $scope.bundles;
   self.poBundlesCriteria = bundles.poBundlesCriteria;
   self.poBundlesControl = bundles.poBundlesControl;
   self.poBundlesResults = bundles.poBundlesResults;
   self.bundleId = '';

   self.getTitle = function () {
      return $translate.instant('global.load.bundle.id');
   };

   self.cancel = function () {
      bundles.loadBundleModal.destroy();
   };

   self.submit = function () {
      var poBundlesAddCriteria = {
         pobundlescontrol: self.poBundlesControl,
         pobundlescriteria: self.poBundlesCriteria,
         cBundleID: self.bundleId
      };

      DataService.post('api/po/aspoentry/pobundleidload', { data: poBundlesAddCriteria, busy: true }, function (data) {
         if (data) {
            self.poBundlesResults = data.pobundlesresults;
            self.poBundlesControl = data.pobundlescontrol;

            //Send the payload back so we can update the calling grid.
            if (bundles.loadBundleOkCallback) {
               bundles.loadBundleOkCallback(self.bundleId, self.poBundlesControl, self.poBundlesResults);
            }

            // Close modal
            bundles.loadBundleModal.destroy();
         }
      });
   };
});
