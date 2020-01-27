'use-strict';

/**
 * Steps to implement this OE Bundles Control:
 *
 * 1) This is only to be used in the Order Entry module.
 * 2) In the calling view with WYSIWYG, create Sub View and point to the Custom Control: "OE Bundles"
 * 3) In the calling view controller:
 *    a) If you need to have the Bundle control call back when the Save is performed, create a function
 *       in the caller:  (i.e. child-states.js has a acceptBundleUpdate funciton in OeetAdvancedLineEntryBundlesCtrl that accepts some payload).
 * 4) If you need the callback, in WYSIWYG, assign this function name in the "Save Callback Function" option field.
 */

/**
 * Control for displaying OE Bundles data.  Used in OEET, OEIO, and OEES.
 * Alias: bundles
 */
app.controller('OeBundlesCtrl', function ($scope, $state, $translate, Utils, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.TALLY_COMPONENTS_DELETED = 'd';
   self.COMPONENT_MODE_ADD = 'add';
   self.COMPONENT_MODE_UPDATE = 'upd';
   self.BUNDLE_MODE_ADD = 'add';
   self.BUNDLE_MODE_LOAD = 'load';
   self.BUNDLE_MODE_DETAIL = 'detail';
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
   self.getBundlesFlag = false;
   self.saveCallbackFunction = null;
   self.isLoadBundleEnabled = false;
   self.initComplete = false;
   self.inquiryMode = false;

   self.oeBundlesCriteria = {};
   self.oeBundlesControl = {};
   self.oeBundlesResults = [];
   self.oeBundlesResultsRow = null;

   //This is used to determine what we should hide.  Since this is a control, it can't have it's own states or states for related screens.
   //Depending on the mode, we may hide entire sections of the view.
   self.isDetailEditMode = false;

   //In these modes, we have the ability to enter a Bundle Id.
   self.isDetailAddMode = false;
   self.isDetailLoadMode = false;

   if (options.functionNameModel) {
      self.functionName = options.functionNameModel;
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

   self.isLoadBundleEnabled = function () {
      var isEnabled = false;
      if (self.bundlesGrid.isOneRowSelected) {
         self.oeBundlesResultsRow = GridService.getSelectedRecord(self.bundlesGrid);
         //The "** Loose Inventory **" item will have a blank bundle.  That is the only time the
         //Load ID feature is available.
         if (self.oeBundlesResultsRow && self.oeBundlesResultsRow.bundleid.length === 0) {
            isEnabled = true;
         }
      }
      return isEnabled;
   };

   self.initialize = function () {
      self.oeBundlesCriteria = {
         functionname: self.functionName,
         getbundlefl: true,
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

      DataService.post('api/oe/asoeline/oebundlesload', { data: self.oeBundlesCriteria, busy: true }, function (data) {
         if (data) {
            self.oeBundlesResults = data.oebundlesresults;
            self.oeBundlesControl = data.oebundlescontrol;

            //Helps avoid the screen flash on Grid Columns.
            self.initComplete = true;
         }
      });
   };

   self.save = function () {
      self.oeBundlesCriteria.qtyreq = self.oeBundlesControl.qtyact;

      //This is defined at design time and is only required in some places, those that require additional processing
      //to occur after a Save is complete. (i.e. to update more data on the Order Entry Line.)
      if (self.saveCallbackFunction) {
         var payload = {
            qty: self.oeBundlesControl.qtyact,
            unit: self.oeBundlesCriteria.units
         };

         self.saveCallbackFunction(payload);
      }
   };

   self.launchDetail = function () {
      ModalService.showActionPanel('oe/shared/bundles/bundles-detail.json', 'OeBundlesDetailCtrl as bd', $scope, function (modal) {
         self.bundlesDetailModal = modal;
      });
   };

   self.editBundle = function () {
      self.oeBundlesResultsRow = GridService.getSelectedRecord(self.bundlesGrid);
      if (self.oeBundlesResultsRow) {
         self.launchDetail();
      }
   };

   self.drillDown = function (e, args) {
      self.oeBundlesResultsRow = args[0].item;
      if (self.oeBundlesResultsRow) {
         self.launchDetail();
      }
   };

   self.addBundle = function () {
      ModalService.showModal('oe/shared/bundles/bundles-add-load.json', 'OeBundlesAddCtrl as bal', $scope, function (modal) {
         self.addBundleModal = modal;
      });
   };

   self.loadBundle = function () {
      ModalService.showModal('oe/shared/bundles/bundles-add-load.json', 'OeBundlesLoadCtrl as bal', $scope, function (modal) {
         self.loadBundleModal = modal;
      });
   };

   self.deleteBundle = function () {
      //Backend call only handles one delete at a time.
      var selectedRow = GridService.getSelectedRecord(self.bundlesGrid);
      if (selectedRow && selectedRow.bundleid) {
         MessageService.yesNo('global.question', 'question.confirm.delete.of.selected.sequences',
         function () {
            var oeBundlesDeleteCriteria = {
               oebundlescontrol: self.oeBundlesControl,
               oebundlescriteria: self.oeBundlesCriteria,
               cBundleID: selectedRow.bundleid
            };

            DataService.post('api/oe/asoeline/oebundlesdelete', { data: oeBundlesDeleteCriteria, busy: true }, function (data) {
               if (data) {
                  self.oeBundlesControl = data.oebundlescontrol;
                  //self.oeBundlesResults = data.pobundlesresults;
                  //TODO might have to remove the deleted line manually, call doesn't pass back the results
               }
            });
         });
      }
   };

   //Callbacks
   self.addBundleOkCallback = function (bundleId, oeBundlesControl, oeBundlesResults) {
      self.oeBundlesControl = oeBundlesControl;
      self.oeBundlesResults = oeBundlesResults;

      //Take us into the Detail, which shows Tally List.
      self.launchDetail();
   };

   self.loadBundleOkCallback = function (bundleId, oeBundlesControl, oeBundlesResults) {
      self.oeBundlesControl = oeBundlesControl;
      self.oeBundlesResults = oeBundlesResults;
   };

   self.bundlesDetailsOkCallback = function (oeBundlesControl, oeBundlesResults) {
      self.oeBundlesControl = oeBundlesControl;
      self.oeBundlesResults = oeBundlesResults;
   };

   self.initialize();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

//This controller is used to show Details for the Bundle.  This is to show Tally Components and the ability to
//access the CRUD for those.
//Alias: bd
app.controller('OeBundlesDetailCtrl', function ($scope, $state, $stateParams, $translate) {
   var self = this;
   var bundles = $scope.bundles;
   self.oeBundlesCriteria = bundles.oeBundlesCriteria;
   self.oeBundlesControl = bundles.oeBundlesControl;
   self.oeBundlesResults = bundles.oeBundlesResults;
   self.oeBundlesResultsRow = bundles.oeBundlesResultsRow;

   self.getTitle = function () {
      if (self.oeBundlesResultsRow && self.oeBundlesResultsRow.dispbundleid) {
         return $translate.instant('global.bundle.details') +  bundles.LABEL_DELIMITER + self.oeBundlesResultsRow.dispbundleid;
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
         bundles.bundlesDetailsOkCallback(self.oeBundlesControl, self.oeBundlesResults);
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
app.controller('OeBundlesAddCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var bundles = $scope.bundles;
   self.oeBundlesCriteria = bundles.oeBundlesCriteria;
   self.oeBundlesControl = bundles.oeBundlesControl;
   self.oeBundlesResults = bundles.oeBundlesResults;
   self.bundleId = '';

   self.getTitle = function () {
      return $translate.instant('global.add.bundle');
   };

   self.cancel = function () {
      bundles.addBundleModal.destroy();
   };

   self.submit = function () {
      var oeBundlesAddCriteria = {
         oebundlescontrol: self.oeBundlesControl,
         oebundlescriteria: self.oeBundlesCriteria,
         cBundleID: self.bundleId
      };

      DataService.post('api/oe/asoeline/oebundlesadd', { data: oeBundlesAddCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.oeBundlesResults = data.oebundlesresults;
               self.oeBundlesControl = data.oebundlescontrol;

               //Send the payload back so we can do more, like update the calling grid and go into Tally entry.
               if (bundles.addBundleOkCallback) {
                  bundles.addBundleOkCallback(self.bundleId, self.oeBundlesControl, self.oeBundlesResults);
               }

               // Close modal
               bundles.addBundleModal.destroy();
            }
         }
      });
   };
});
