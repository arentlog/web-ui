'use strict';

app.controller('AoKitProductionCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as ktprdtl
   var self = this;
   var base = $scope.base;

   var subject = 'Kit Production';
   var dictionary = {
      kpprtfmt: 'Print Format for Work Orders',
      kpbostage: 'Create KP Back Orders At Stage',
      kpprevvertol: 'Previous Version Tolerance',
      kpprevvertolty: 'Previous Version Tolerance Type'
   };

   self.aoKitProduction = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aokitproductionload', { busy: true }, function (data) {
      if (data) {
         self.aoKitProduction = data;
         self.original = angular.copy(self.aoKitProduction);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoKitProduction, self.original).length);
   };

   self.reset = function () {
      self.aoKitProduction = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoKitProduction, self.original).length) {
            base.fillNotes(self.aoKitProduction, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aokitproductionsave', { data: self.aoKitProduction, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoKitProduction);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end ktprdtl

app.controller('AoSalesOrdersCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, ModalService) {
   //as sodtl
   var self = this;
   var base = $scope.base;

   // Subject and Dictionary are used for the Notes entry of the field change
   var subject = 'Sales Orders';
   var dictionary = {
      holdforauthdefault: 'Hold for Authorization',
      blockcardcreate: 'Block ALL Card Creation',
      oedlvformat: 'Print Format for Delivery',
      oedlvheadfl: 'Print Delivery Headings',
      oebocredchkfl: 'Perform Credit Check After BO Fill',
      oemvdelty: 'Move To On Hand/Delete Receipt Entries',
      oeautometh: 'Method for Automatic Fill',
      oebilldirpoaddonfl: 'Bill Direct PO Addons To Sales Orders',
      oebofillfl: 'Support Running Fill from Navigator',
      oedomovefl: 'BO Fill - Move Filled Drop Lines to New Suffix',
      oealtfillfl: 'BO Fill Alternate Warehouse Orders',
      oeautosubfl: 'BO_Fill_Substitute_Supersede_Products',
      oepctfillqty: 'BO Pick Print Threshold',
      oecommitfl: 'Reserve Inventory Before Printing Pick Tickets',
      oepkbofl: 'Pick OE BO and S/T Orders Only',
      oepctfillty: 'Threshold Criteria Type',
      oepickfl: 'Print Pick Tickets After BO Fill',
      oEAltWhseFl: 'View Alternate Warehouse Levels if Stockout During Entry',
      oeforcefl: 'Force Lot/Serial Input During Entry',
      lostbusreasonfl: 'Require Lost Business Reason',
      tenderfl: 'Force My Counter Sale Tendering',
      shiptender: 'Ship Fully Tendered SO Order',
      promoprcdflt: 'Promo Price Default',
      oeslentryty1: 'Serial Number Entry Method',
      oeslentryty2: 'Lot Number Entry Method',
      oEDupCustPo: 'Duplicate Customer Pos',
      qUCancelDtDays: '# Days to Calculate Default Cancel Date for Quotes',
      lndtentfl: 'Allow Entry of Requested Ship Date and Promised Date On Lines for Non JIT Orders',
      oereqdays: 'Additional Days for Calculating Requested Ship Date',
      oedivfl: 'During Entry, Default the Division # from',
      oeassnty: 'Get Order # from Whse or Cono Level',
      begordno: 'First OE Order Number for the Company',
      endordno: 'Highest OE Order Number for the Company',
      nextordno: 'Next OE Order Number for the Company',
      incval: 'Next OE Number Skip Value',
      oESystemPrice: 'Calculate and Save System Price at Order Entry',
      oEPOFl: 'Interface to Purchase Orders',
      oEWTFL: 'Interface to Warehouse Transfers',
      oeesrcnsfl: 'Interface to eSource for NS Items',
      dnrwttiety: 'Allow Do Not Reorder Whse Transfer Tie by',
      oEvrebcalcty: 'Point To Calculate Vendor Rebate',
      oEfrzrebty: 'Recalc Rebate Through',
      oECostSale: 'When Calculating Margin %, Divide by Cost or Net Amount',
      emoemarginty: 'Event Manager Trigger: Calculate OE Header Margin Based on Order or System',
      oewriteamt: 'Downpayment Write-Off Amount',
      oefutdays: 'Extra Conversion Days for Changing Future and Blanket Orders',
      httpservername: 'Supplier Access Host Name',
      httpserverportnumber: 'Supplier Access Port Number',
      pauseseconds: 'Supplier Access Seconds to Pause for Response',
      pausetimes: 'Supplier Access Number of Times to Pause for Response',
      pDCalcPBKitRebSale: 'Roll Rebated Price on Pre-Built Kits',
      keepreqrecords: 'Keep Supplier Access Request Records',
      oeapprty: 'Default Order Approval Type',
      oeretapprty: 'Default Order Approval Type for Returns',
      oeexpapprty: 'Default Order Approval Type for Exports',
      oedolholdty: 'Approval Type For Amount Hold',
      oemrgholdty: 'Margin Hold',
      quoteMarginHold: 'Apply Margin Hold to Quotes',
      oEMinChgAmt: 'Minimum Order Change to Force Order Reapproval for Credit Holds',
      credalertty: 'Order on Hold; Notify Credit Manager',
      authdefaultfl: 'Hold For Authorization Default Setting',
      promptcreatecardfl: 'Prompt for Creating Cards in OE',
      ccholdauthcd: 'Authorization',
      ccseconds: 'Wait Seconds',
      ccretries: '# of Retries',
      ccholdfailcd: 'Failure',
      ccsecondsbp: 'Wait Seconds (Batch',
      ccholdaddrcd: 'Address',
      ccretriesbp: '# of Retries (Batch)',
      ccbatchsize: 'Batch Size',
      oebostage: 'Create OE Back Orders At Stage',
      oeautofity: 'Action to Take on Completion of Receiving',
      oeprtfrmt1: 'Print Format for Acknowledgements',
      oeedifrmt1: 'EDI Format for Acknowledgements',
      oefaxfrmt1: 'Fax Format for Acknowledgements',
      oeackheadfl: 'Print Acknowledgement Headings',
      oeprtfrmt2: 'Print Format for Pick Tickets',
      oepckheadfl: 'Print Pick Ticket Headings',
      oeprtfrmt3: 'Print Format for Bill of Lading',
      oebolheadfl: 'Print Bill of Lading Headings',
      oeprtfrmt4: 'Print Format for Invoices',
      oeedifrmt4: 'EDI Format for Invoices',
      oefaxfrmt4: 'Fax Format for Invoices',
      oeinvheadfl: 'Print Invoice Headings',
      oeprtfrmt5: 'Print Format for Counter Reciepts',
      manifestprintformat: 'Print Format for Manifests',
      oepickordty: 'Pick Ticket/Transfer Print Order',
      oedlvordty: 'Delivery',
      oemninvamt: 'Minimum Invoice Amount for the Invoice to be Printed',
      glprtdetail: 'GL Detail Print',
      oebulkpickfl: 'Print Bulk Pick Ticket Cover Sheet',
      oelinefl: 'Print Zero-Ship Lines on Pick Ticket',
      oercpttop1: 'Receipt Header/Footer',
      oercpttop2: 'Receipt Header/Footer',
      oercpttop3: 'Receipt Header/Footer',
      oercptbot1: 'Receipt Header/Footer',
      oercptbot2: 'Receipt Header/Footer',
      originreqfl: 'Require Order Origin Code',
      deforigincd: 'Default Order Origin Code',
      ccforcesale: 'Force Sale Management Processing',
      oEAutoApplyCreditInvoiceFl: 'Allow Override of Auto-Apply Credit in OE',
      oehighpricemonths: 'HighPriceMonthsHistory',
      oehighpricelevel2: 'HighPriceExcludeLevel2',
      oECombinedShipment: 'Combined Shipment',
      csbofl: 'Back Order Counter Sales',
      oeintlholdty: 'International Sales Approval',
      ccauthoverride: 'Allow Override of Additional Auth',
      ccauthtolerance: 'Force Sale Auth Tolerance',
      ccauthtolerancetype: 'Force Sale Auth Tolerance Type',
      pickTicketOutputType: 'Pick Ticket Output Type',
      pickTicketExtraDataLevel1: 'Pick Ticket Level 1 Extra Fields',
      pickTicketExtraDataLevel2: 'Pick Ticket Level 2 Extra Fields',
      acknowledgementOutputType: 'Acknowledgement Output Type',
      acknowledgementExtraDataLevel1: 'Acknowledgement Level 1 Extra Fields',
      acknowledgementExtraDataLevel2: 'Acknowledgement Level 2 Extra Fields',
      invoiceOutputType: 'Invoice Output Type',
      invoiceExtraDataLevel1: 'Invoice Level 1 Extra Fields',
      invoiceExtraDataLevel2: 'Invoice Level 2 Extra Fields',
      saleswhsefl: 'Use Sales Warehouse',
      saleswhseinvfl: 'Override Division in Invoice Processing',
      saleswhsesmfl: 'Store in Sales Manager Data',
      saleswhsetiedfl: 'Load Sales Warehouse on Tied Fulfillment Orders',
      deflineslsrep: "Default Line Level Sales Rep",
      billOfLadingOutputType: 'Bill of Lading Output Type',
      billOfLadingExtraDataLevel1: 'Bill of Lading Level 1 Extra Fields',
      billOfLadingExtraDataLevel2: 'Bill of Lading Level 2 Extra Fields',
      deliveryOutputType: 'Delivery Output Type',
      deliveryExtraDataLevel1: 'Delivery Level 1 Extra Fields',
      deliveryExtraDataLevel2: 'Delivery Level 2 Extra Fields',
      fulfillmentfl: 'Use Order Fulfillment',
      useslsrepexceptionfl: 'Use Sales Rep Exceptions',
      fulfillmentbillingfl: 'Use Consolidated Invoicing for Billing',
      fulfillmenttranspos: 'Default Order Type Position in Order Entry',
      oeescodaddonfl: 'Use COD Addon in OEES',
      acknowledgementIDMDocTypeID: 'Acknowledgement IDM Document Type ID',
      acknowledgementIDMTemplateName: 'Acknowledgement IDM Template Name',
      acknowledgementIDMFromEmailAddr: 'Acknowledgement IDM From Email Address',
      acknowledgementIDMFromEmailName: 'Acknowledgement IDM From Email Name',
      invoiceIDMDocTypeID: 'Invoice IDM Document Type ID',
      invoiceIDMTemplateName: 'Invoice IDM Template Name',
      invoiceIDMFromEmailAddr: 'Invoice IDM From Email Address',
      invoiceIDMFromEmailName: 'Invoice IDM From Email Name',
      pickTicketIDMDocTypeID: 'Pick Ticket IDM Document Type ID',
      pickTicketIDMTemplateName: 'Pick Ticket IDM Template Name',
      pickTicketIDMFromEmailAddr: 'Pick Ticket IDM From Email Address',
      pickTicketIDMFromEmailName: 'Pick Ticket IDM From Email Name',
      bulkPickTicketIDMDocTypeID: 'Bulk Pick Ticket IDM Document Type ID',
      bulkPickTicketIDMTemplateName: 'Bulk Pick Ticket IDM Template Name',
      deliveryIDMDocTypeID: 'Delivery IDM Document Type ID',
      deliveryIDMTemplateName: 'Delivery IDM Template Name',
      deliveryIDMFromEmailAddr: 'Delivery IDM From Email Address',
      deliveryIDMFromEmailName: 'Delivery IDM From Email Name',
      commercialInvoiceIDMDocTypeID: 'Commercial Invoice IDM Document Type ID',
      commercialInvoiceIDMTemplateName: 'Commercial Invoice IDM Template Name',
      billOfLadingIDMDocTypeID: 'Bill of Lading IDM Document Type ID',
      billOfLadingIDMTemplateName: 'Bill of Lading IDM Template Name',
      billOfLadingIDMFromEmailAddr: 'Bill of Lading IDM From Email Address',
      billOfLadingIDMFromEmailName: 'Bill of Lading IDM From Email Name',
      consolInvoiceIDMDocTypeID: 'Consolidated Invoice IDM Document Type ID',
      consolInvoiceIDMTemplateName: 'Consolidated Invoice IDM Template Name',
      quoteIDMDocTypeID: 'Quote IDM Document Type ID',
      quoteIDMTemplateName: 'Quote IDM Template Name'
   };

   self.rebillOptions = [ //if renamed/reordered, verify that the load call still pulls the correct default value (will only apply if field is not set)
      {
         label: $translate.instant('global.allow.serial.tracking'),
         value: 'Serial'
      },
      {
         label: $translate.instant('global.allow.rebate.tracking'),
         value: 'Rebate'
      },
      {
         label: $translate.instant('global.allow.both.serial.and.rebate.tracking'),
         value: 'Both'
      },
      {
         label: $translate.instant('global.do.not.allow.serial.or.rebate.tracking'),
         value: 'No'
      }
   ];

   self.aoSalesOrder = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aosalesordersload', { busy: true }, function (data) {
      if (data) {
         self.aoSalesOrder = data;
         if (!self.aoSalesOrder.oECreditRebillSerRebFl) { //if this field is not set yet, use the default
            self.aoSalesOrder.oECreditRebillSerRebFl = self.rebillOptions[self.rebillOptions.length - 1].value; //pulls from the hard coded array above (used dynamically instead of staticly for extendability)
         }
         self.original = angular.copy(self.aoSalesOrder);

         //User Hook (do not rename)
         if (self.aoSalesOrdersLoadContinue) {
            self.aoSalesOrdersLoadContinue(data);
         }
      }
   });

   self.loadArscl = function () {
      DataService.get('api/shared/assharedentry/aoarsclload', { busy: true }, function (data) {
         if (data) {
            self.misceCustomersdataset = data;
         }
      });
   };

   self.loadArscl();

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoSalesOrder, self.original).length);
   };

   self.ccforcesaleChanged = function () {
      if (!self.aoSalesOrder.ccforcesale) {
         self.aoSalesOrder.ccauthtolerance = 0;
         self.aoSalesOrder.ccauthtolerancetype = '';
      }
   };

   self.defaultLineSalesRepChange = function () {
      if (!self.aoSalesOrder.deflineslsrep) {
         // if we ever add another record type we'll probably want a new call to check for any oessre records
         var oessresearchCriteria = {
            recordtype: 'pc'
         };
         DataService.post('api/oe/asoeinquiry/oessresearch', { data: oessresearchCriteria, busy: true }, function (data) {
            if (data) {
               MessageService.alertOk('global.oessre.records.exist', 'message.cannot.change.default.sales.rep.while.exceptions.exist');
               self.aoSalesOrder.deflineslsrep = 'pc';
            }
         });
      }
   };

   self.reset = function () {
      self.aoSalesOrder = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoSalesOrder, self.original).length) {
            base.fillNotes(self.aoSalesOrder, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aosalesorderssave', { data: self.aoSalesOrder, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoSalesOrder);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };

   self.addArscl = function () {
      ModalService.showModal('ao/ao/documents/sales-orders/new-arscl.json', 'AoSalesOrdersAddArsclModalCtrl as mod', $scope, function (modal) {
         self.modal = modal;
      });
   };

   self.deleteArscl = function () {
      var record = GridService.getSelectedRecord(self.misceCustomersgrid);
      if (record) {
         DataService.get('api/shared/assharedentry/aoarscldelete/' + record.custno, { busy: true }, function () {
            self.loadArscl();
         });
      }
   };

   self.setSalesWhse = function () {
      if (!self.aoSalesOrder.saleswhsefl) {
         self.aoSalesOrder.saleswhseinvfl = false;
         self.aoSalesOrder.saleswhsesmfl = false;
         self.aoSalesOrder.saleswhsetiedfl = false;
      }
   };

   self.setFulfillment = function () {
      if (!self.aoSalesOrder.fulfillmentfl) {
         self.aoSalesOrder.fulfillmentbillingfl = false;
         self.aoSalesOrder.saleswhsetiedfl = false;
         self.aoSalesOrder.fulfillmenttranspos = '0';
      }
   };

}); //end sodtl

app.controller('AoSalesOrdersAddArsclModalCtrl', function ($scope, DataService) { //as mod
   var self = this;
   var sodtl = $scope.sodtl;

   self.cancel = function () {
      sodtl.modal.destroy();
   };

   self.submit = function () {
      DataService.get('api/shared/assharedentry/aoarsclsave/' + self.custno, { busy: true }, function () {
         sodtl.loadArscl();
         sodtl.modal.destroy();
      });
   };
}); //end mod

app.controller('AoPurchaseOrdersCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as podtl
   var self = this;
   var base = $scope.base;

   var subject = 'Purchase Orders';
   var dictionary = {
      pononstkfl: 'Order or WT Required when Non Stock Entered on PO',
      pocostfl: 'Use Last Or Replacement Cost During Entry',
      podolholdty: 'Approval Type For Amount Hold',
      porcvnofl: 'Force Entry of Receiver# during receiving',
      poqtyrcvfl: 'Force Entry of Quantity Received during receiving',
      poallfl: 'Default to "All" Pricing',
      poavgcspct: 'Percent of Price Variance To Print on the Exception Report',
      pormglcostfl: 'Use Actual Line Price for Inventory Posting of a Return',
      pocrctreason: 'Receipt Correction Return Reason',
      reqpobatchfl: 'Require PO Batch Data to be Set as Received',
      blockpoRmrecb4oeRminvfl: 'Block PO-RM Receiving Before Tied OE-RM Is Invoiced',
      poassgnty: 'Get PO Number from Whse or Cono level',
      begpono: 'First PO Number for the Company',
      nextpono: 'Next PO Number for the Company',
      endpono: 'Highest PO Number for the  Company',
      incval: 'Next PO Number Skip Value',
      porraraccp: 'Recommended Replenishment Action Acceptance Type',
      pomrgpricefl: 'During RRAR Merge, Merge Gross or Net Prices',
      pomrgrptfl: 'Print Surplus not taken on the RRAR Merge Report',
      pocapdiscfl: 'Capitalize Order Discount',
      pocapfl: 'Capitalize at Receiving Or Costing',
      apusecost: 'Value Inventory At',
      powodist: 'Distribute Capitalized Order Discount Method',
      apeichgpartialfl: 'Close Partially Costed Pos',
      popofrmt: 'Print Format for Purchase Orders',
      poedifrmt: 'EDI Format for Purchase Orders',
      pofaxfrmt: 'Fax Format for Purchase Orders',
      popoheadfl: 'Print PO Headings',
      purchaseOrderOutputType: 'Purchase Order Output Type',
      purchaseOrderExtraDataLevel1: 'Purchase Order Level 1 Extra Fields',
      purchaseOrderExtraDataLevel2: 'Purchase Order Level 2 Extra Fields',
      purchaseOrderIDMDocTypeID: 'Purchase Order IDM Document Type ID',
      purchaseOrderIDMTemplateName: 'Purchase Order IDM Template Name',
      purchaseOrderIDMFromEmailAddr: 'Purchase Order IDM From Email Address',
      purchaseOrderIDMFromEmailName: 'Purchase Order IDM From Email Name'
   };

   self.aoPurchaseOrders = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aopurchaseordersload', { busy: true }, function (data) {
      if (data) {
         self.aoPurchaseOrders = data;
         self.original = angular.copy(self.aoPurchaseOrders);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoPurchaseOrders, self.original).length);
   };

   self.reset = function () {
      self.aoPurchaseOrders = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoPurchaseOrders, self.original).length) {
            base.fillNotes(self.aoPurchaseOrders, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aopurchaseorderssave', { data: self.aoPurchaseOrders, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoPurchaseOrders);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end podtl

app.controller('AoJobManagementCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as jmdtl
   var self = this;
   var base = $scope.base;

   var subject = 'Job Management';
   var dictionary = {
      jmapprovfl: 'Print Customer Quote Headings',
      jmcprtfrmt: 'Print Format for Customer Quotes',
      jmcfaxfrmt: 'Fax Format for Customer Quotes',
      jmcheadfl: 'Print Customer Quote Headings',
      jmvprtfrmt: 'Print Format for Vendor Quotes',
      jmvfaxfrmt: 'Fax Format for Vendor Quotes',
      jmvheadfl: 'Print Vendor Quote Headings'
   };

   self.aoJobManagement = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aojobmanagementload', { busy: true }, function (data) {
      if (data) {
         self.aoJobManagement = data;
         self.original = angular.copy(self.aoJobManagement);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoJobManagement, self.original).length);
   };

   self.reset = function () {
      self.aoJobManagement = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoJobManagement, self.original).length) {
            base.fillNotes(self.aoJobManagement, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aojobmanagementsave', { data: self.aoJobManagement, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoJobManagement);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end jmdtl

app.controller('AoTransferOrdersCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as todtl
   var self = this;
   var base = $scope.base;

   var subject = 'Warehouse Transfers';
   var dictionary = {
      wtpickheadfl: 'Print Transfer Pick Ticket Headings',
      wtpickfrmt: 'Print Format for Transfer Pick Tickets',
      wtrraraccp: 'Recommended Replenishment Action Acceptance Type',
      wtpushlev: 'For Push Replenishment, Lowest Acceptable On Hand Level',
      wtmrgrptfl: 'Print Surplus not Taken on the RRAR Merge Report',
      wtuseroqfl: 'If no Product Line, Use ROQ',
      wtqtyrcvfl: 'Force Entry of Quantity Received During Receiving',
      wtnonstkfl: 'Require Order for Non-stock Items',
      wtslentryty1: 'Serial Number Entry Default',
      wtslentryty2: 'Lot Number Entry Default',
      wtleadtm: 'Default Lead Time on Non-ARP Transfer',
      wtbostage: 'Back Order Creation Stage',
      intercofl: 'Allow Intercompany Transfers',
      cAccount: 'Intercompany GL Account',
      wtshipintautofl: 'Ship Integration Automatic Ship Flag',
      pickTicketOutputType: 'Pick Ticket Output Type',
      pickTicketExtraDataLevel1: 'Pick Ticket Level 1 Extra Fields',
      pickTicketExtraDataLevel2: 'Pick Ticket Level 2 Extra Fields',
      wtlinemarkupaddons: "Markup Addons Activate",
      wtlinemarkupcost: "Markup Addons Markup Cost",
      wtlinemarkupproduct: "Markup Addons Product",
      wtlinemarkupprodline: "Markup Addons Product Line",
      wtlinemarkupprodcat: "Markup Addons Product Category",
      wtlinemarkupprodprcty: "Markup Addons Product Price Type",
      wtlinemarkupaltprodgroup: "Markup Addons Alt Product Group",
      wtlinemarkuphierarchycd: "Markup Addons Hierarchy",
      pickTicketIDMDocTypeID: 'Pick Ticket IDM Document Type ID',
      pickTicketIDMTemplateName: 'Pick Ticket IDM Template Name',
      pickTicketIDMFromEmailAddr: 'Pick Ticket IDM From Email Address',
      pickTicketIDMFromEmailName: 'Pick Ticket IDM From Email Name',
      bulkPickTicketIDMDocTypeID: 'Bulk Pick Ticket IDM Document Type ID',
      bulkPickTicketIDMTemplateName: 'Bulk Pick Ticket IDM Template Name'
   };

   self.hierarchyWTOptions = {
       PR: $translate.instant('global.product'),
       PL: $translate.instant('global.product.line'),
       PC: $translate.instant('global.product.category'),
       PT: $translate.instant('global.product.price.type'),
       AG: $translate.instant('global.alternate.product.group')
   };

   self.aoTransferOrders = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aowarehousetransfersload', { busy: true }, function (data) {
      if (data) {
         self.aoTransferOrders = data;
         self.original = angular.copy(self.aoTransferOrders);
         self.loadWTHierarchy();
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoTransferOrders, self.original).length);
   };

   var decatenateWTHierarchy = function (hierarchy) {
       if (!hierarchy) {
           hierarchy = 'PR,PC,PL,PT,AG';
       }
       var result = [];
       hierarchy.split(',').forEach(function (option) {
           result.push({
               label: self.hierarchyWTOptions[option],
               value: option
           });
       });
       return result;
   };

   var concatWTHierarchy = function (hierarchy) {
       var string = '';
       hierarchy.forEach(function (option) {
           string += ',' + option.value;
       });
       return string.substr(1);
   };

   self.loadWTHierarchy = function () {
       self.overrideWTHierarchyList = decatenateWTHierarchy(self.aoTransferOrders.wtlinemarkuphierarchycd);
       self.defaultWTHierarchyList = decatenateWTHierarchy(self.aoTransferOrders.wtlinemarkuphierarchydflt);
   };

   self.reset = function () {
      self.aoTransferOrders = angular.copy(self.original);
      self.loadWTHierarchy();
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
          self.aoTransferOrders.wtlinemarkuphierarchycd = concatWTHierarchy(self.overrideWTHierarchyList);
          self.aoTransferOrders.wtlinemarkuphierarchydflt = concatWTHierarchy(self.defaultWTHierarchyList);
          if (base.hasChanges(self.aoTransferOrders, self.original).length) {
            base.fillNotes(self.aoTransferOrders, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aowarehousetransferssave', { data: self.aoTransferOrders, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoTransferOrders);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end todtl

app.controller('AoServiceWarrantyCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as swdtl
   var self = this;
   var base = $scope.base;

   var subject = 'Service Warranty';
   var dictionary = {
      billtype: 'Billtype',
      jobtype: 'Jobtype for initial setups through OEET',
      bomtype: 'BOM Required Type',
      prodcat: 'Manual claim category',
      claimtype: 'Claim type',
      wolimit: 'Maximum amount to automatically write-off for claims',
      cAccount: 'Write-off account',
      origcustfl: 'Compare original purchaser to service customer',
      promdays: 'Additional days for calculating OEEH promised date',
      reqdays: 'Additional days for calculating OEEH requested date',
      reldate: 'Release date',
      prtfrmt: 'Print Format for Transfer Pick Tickets',
      repairheadfl: 'Print Transfer Pick Ticket Headings',
      printOnOEInvoice: 'Print SW Details on OE Invoice'
   };

   self.aoServiceWarranty = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aoservicewarrantyload', { busy: true }, function (data) {
      if (data) {
         self.aoServiceWarranty = data;
         self.original = angular.copy(self.aoServiceWarranty);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoServiceWarranty, self.original).length);
   };

   self.reset = function () {
      self.aoServiceWarranty = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoServiceWarranty, self.original).length) {
            base.fillNotes(self.aoServiceWarranty, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aoservicewarrantysave', { data: self.aoServiceWarranty, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoServiceWarranty);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end swdtl

app.controller('AoValueAddCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as vadtl
   var self = this;
   var base = $scope.base;

   var subject = 'Value Add';
   var dictionary = {
      vaextrncstty: 'Price/Cost Used For External Labor Line Items',
      vaintrncstty: 'Price/Cost Used For Internal Labor Line Items',
      vainvntcstty: 'Price/Cost Used For Inventory',
      vastkadjty: 'Shipping Stock Adjustment Control',
      vaautoboty: 'Auto-Create Section BO in Shipping',
      vaprcsheetfl: 'Pricing Worksheet Calculation Default',
      vaprevvertol: 'Previous Version Tolerance',
      vaprevvertolty: 'Previous Version Tolerance Type',
      vaconfigprodty: 'Product to Use in Configuration Setup',
      vapckfrmt: 'Print Format for Pick Tickets',
      vapckheadfl: 'Print Pick Ticket Headings',
      vaintrnfrmt: 'Print Format for Internal VA Print',
      vaintrnheadfl: 'Print Internal VA Headings',
      pickTicketOutputType: 'Pick Ticket Output Type',
      pickTicketExtraDataLevel1: 'Pick Ticket Level 1 Extra Fields',
      pickTicketExtraDataLevel2: 'Pick Ticket Level 2 Extra Fields',
      pickTicketIDMDocTypeID: 'Pick Ticket IDM Document Type ID',
      pickTicketIDMTemplateName: 'Pick Ticket IDM Template Name',
      pickTicketIDMFromEmailAddr: 'Pick Ticket IDM From Email Address',
      pickTicketIDMFromEmailName: 'Pick Ticket IDM From Email Name',
      bulkPickTicketIDMDocTypeID: 'Bulk Pick Ticket IDM Document Type ID',
      bulkPickTicketIDMTemplateName: 'Bulk Pick Ticket IDM Template Name'
   };

   self.aoValueAdd = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aovalueaddload', { busy: true }, function (data) {
      if (data) {
         self.aoValueAdd = data;
         self.original = angular.copy(self.aoValueAdd);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoValueAdd, self.original).length);
   };

   self.reset = function () {
      self.aoValueAdd = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoValueAdd, self.original).length) {
            base.fillNotes(self.aoValueAdd, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aovalueaddsave', { data: self.aoValueAdd, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoValueAdd);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end vadtl