'use-strict';

app.controller('OeSourcingCtrl', function ($state, $scope, $stateParams, $translate, GridService, DataService, UserService) {
   var self = this;

   self.title = $translate.instant($stateParams.title);
   self.subTitle = $stateParams.subTitle ? $translate.instant($stateParams.subTitle) : '';
   self.currentOehdr = $stateParams.oehdr;
   self.currentOeline = $stateParams.oeline;
   self.oelineComponent = $stateParams.oelineComponent;
   self.isWhseAvailGridVisible = $stateParams.isWhseAvailGridVisible;
   self.supplierAccessData = $stateParams.supplierAccessData;
   self.conoForIcWhseAvailCriteria = $stateParams.conoForIcWhseAvailCriteria; //User Hook (do not rename)
   self.whseTypeForIcWhseAvailCriteria = $stateParams.whseTypeForIcWhseAvailCriteria; //User Hook (do not rename)
   self.showDocDisposition = $stateParams.showDocDisposition;

   if (typeof $stateParams.tie === 'string') {
      $scope.$watch($stateParams.tie, function (newValue) {
         self.currentTie = newValue;
      });
   } else {
      self.currentTie = $stateParams.tie;
   }

   $scope.$watch($stateParams.isLimitShipVia, function (newValue) {
       self.isLimitShipVia = newValue;
   });

   $scope.$watch($stateParams.orderTypes, function (newValue) {
      self.orderTypes = newValue;
   });

   $scope.$watch($stateParams.tieOrderAltNoRef, function (newValue) {
      if (newValue) {
         self.orderAltNo = newValue + '-00';
      } else {
         self.orderAltNo = '';
      }
   });

   self.warehouseAvailabilityGrid = {};
   self.warehouseAvailabilityCollection = [];
   self.poStageCriteria = [1, 2];

   //if there is no oeline, then we can't get available warehouses correctly, so dont show them
   if (!self.currentOeline && self.isWhseAvailGridVisible) {
      self.isWhseAvailGridVisible = false;
   }

   if (self.isWhseAvailGridVisible) {
      var whseAvailCriteria = {
         //Sourcing can be called from either Lines or Components (For Kits), so depending on
         //which path, pull the right product for the warehouse availability call.
         prod: self.oelineComponent ? self.oelineComponent.shipprod : self.currentOeline.prod,
         unit: self.oelineComponent ? self.oelineComponent.unit : self.currentOeline.unit,
         cono: self.conoForIcWhseAvailCriteria,  //User Hook (do not rename)
         whsetype: self.whseTypeForIcWhseAvailCriteria //User Hook (do not rename)
      };

      DataService.post('api/ic/asicinquiry/icwhseavail', { data: whseAvailCriteria, busy: true }, function (data) {
         if (data) {
            self.warehouseAvailabilityCollection = data;
         }
      });
   }
   self.isWhseAvailGridVisible = (self.currentTie && (!self.currentTie.ordertype || self.currentTie.ordertype === 'n' || self.currentTie.ordertype === 'p' || self.currentTie.ordertype === 'w')) ? false : true;

   self.orderTypeChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('ordertype');
      }
      self.isWhseAvailGridVisible = (!self.currentTie.ordertype || self.currentTie.ordertype === 'n' || self.currentTie.ordertype === 'p' || self.currentTie.ordertype === 'w') ? false : true;
      if (self.currentTie.ordertype !== 't') {
         self.clearWarehouseAvailablitySelections();
      }
      if (self.currentTie.ordertype.toLowerCase() !== 'p') {
         self.clearPurchaseOrderSelections();
      }
   };

   self.orderAltNumberChanged = function (orderType) {
      var orderParts = self.orderAltNo.split('-');
      if (orderParts.length === 2) {
         self.currentTie.orderaltno = orderParts[0];
      }

      if (orderType === self.currentTie.ordertype) {
         if ($stateParams.sourceFieldChangedCallback) {
            $stateParams.sourceFieldChangedCallback('orderaltno');
         }
      }
   };

   self.dispositionChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('botype');
      }
   };

   self.versionChanged = function (orderType) {
      if (orderType === self.currentTie.ordertype) {
         if ($stateParams.sourceFieldChangedCallback) {
            $stateParams.sourceFieldChangedCallback('verno');
         }
      }
   };

   self.isSourcingToWarehouseTranfer = function () {
      return self.currentTie.ordertype === 't';
   };

   self.clearWarehouseAvailablitySelections = function () {
      self.warehouseAvailabilityCollection.forEach(function (warehouse, index) {
         warehouse.selected = false;
         self.warehouseAvailabilityGrid.updateRow(index);
      });
   };

   self.clearPurchaseOrderSelections = function () {
      self.currentTie.vendno = '';
   };

   if (self.supplierAccessData) {
      if (self.supplierAccessData.vendno && self.currentTie.ordertype === 'n') {
         self.currentTie.ordertype = 'p';
         self.orderTypeChanged();
      }
   };

   self.warehouseAvailabilityGridRowSelected = function (e, args) {
      if (self.currentTie.ordertype === 't') {
         //clear all selected records
         self.clearWarehouseAvailablitySelections();
         //then set the one that was selected
         var row = args.row;
         var record = self.warehouseAvailabilityCollection[row];
         if (record) {
            record.selected = true;
            self.warehouseAvailabilityGrid.updateRow(row);
            //Clear the existing value so that the value can come from the selected Warehouse.
            self.currentTie.wtshipvia = '';
            self.currentTie.wtwhse = record.cWhse;
            self.wtWarehouseChanged();
         }
      }
   };

   self.poVendorChanged = function () {
      if (self.currentTie.vendno) {
         //TODO: sas-12/3 implement notes \/ from SL \/
         //workspaceClient.PublishNotes(NoteCriteria.FromFields( new[] { NoteEntity.FromFields("Apsv", BoundOelineTie.vendno.ToString(), String.Empty) }));
         if ($stateParams.sourceFieldChangedCallback) {
            $stateParams.sourceFieldChangedCallback('vendno');

            //User Hook (do not rename)
            if (self.poVendorChangedCallbackContinue) {
               self.poVendorChangedCallbackContinue(self.currentTie);
            }
         }
      }
      else {
         //User Hook (do not rename)
         if (self.poVendorChangedNoneContinue) {
            self.poVendorChangedNoneContinue();
         }
      }
   };

   self.poShipFromChanged = function () {
      //TODO: sas-12/3 implement notes \/ from SL \/
      //workspaceClient.PublishNotes(NoteCriteria.FromFields( new[] { NoteEntity.FromFields("Apss", BoundOelineTie.shipfmno.ToString(), String.Empty) }));
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('shipfmno');

         //User Hook (do not rename)
         if (self.poShipFromChangedCallbackContinue) {
            self.poShipFromChangedCallbackContinue(self.currentTie);
         }
      }
   };

   self.poShipViaChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('shipviaty');
      }
   };

   self.wtShipViaChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('shipviaty');
      }
   };
   
   self.poFreightTermsCodeChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('frttermscd');
      }
   };

   self.wtWarehouseChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('wtwhse');
      }
   };

   self.vaWarehouseChanged = function () {
      if ($stateParams.sourceFieldChangedCallback) {
         $stateParams.sourceFieldChangedCallback('vawhse');
      }
   };

   self.submit = function () {
      if ($stateParams.finishCallback) {
         $stateParams.finishCallback();
      }
   };

   self.cancel = function () {
      if ($stateParams.cancelCallback) {
         $stateParams.cancelCallback();
      }
   };

   self.back = function () {
      if ($stateParams.backCallback) {
         $stateParams.backCallback();
      }
   };
});