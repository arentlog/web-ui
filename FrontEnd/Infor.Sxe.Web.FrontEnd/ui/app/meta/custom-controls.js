'use strict';

/**
 * Definitions of all our custom controls (used in wysiwyg)
 */
app.factory('CustomControls', function CustomControls() {

   return {
      AddressForm: {
         displayName: 'Address Form',
         jsonView: 'shared/address-form/address-form.json',
         controller: 'AddressFormCtrl as addr',
         optionsView: 'shared/address-form/address-form-options.html',
         initialOptions: {
            countryCdVisible: true,
            addr2Visible: true,
            addr3Visible: true
         }
      },
      AddressInfo: {
         displayName: 'Address Info',
         displayLabelFromInstance: 'options.addressLabel',
         directive: 'address-info',
         optionsView: 'shared/address-info/address-info-options.html',
         initialOptions: {
            countryCdVisible: true
         }
      },
      AddressContactsInfo: {
         displayName: 'Address Contacts Info',
         jsonView: 'shared/address-contacts-info/address-contacts-info.json',
         controller: 'AddressContactsInfoCtrl as addrcont',
         optionsView: 'shared/address-contacts-info/address-contacts-info-options.html'
      },
      AdvancedSearch: {
         displayName: 'Advanced Search',
         jsonView: 'shared/advanced-search/advanced-search.json',
         controller: 'AdvancedSearchCtrl as advsrch',
         optionsView: 'shared/advanced-search/advanced-search-options.html',
         initialOptions: {
            criteria: 'mst.advCriteria',
            criteriaList: 'mst.criteriaList',
            criteriaView: 'xx/xxxx/advanced-criteria.json',
            defaultSelectedCriteria: 'mst.defaultSelectedCriteria',
            searchFunction: 'mst.search'
         }
      },
      Cartons: {
         displayName: 'Cartons',
         jsonView: 'shared/cartons/cartons.json',
         controller: 'WlCartonsCtrl as ctns',
         optionsView: 'shared/cartons/cartons-options.html'
      },
      CustomerInquiryGeneral: {
         displayName: 'Customer Inquiry General',
         jsonView: 'shared/customer-inquiry-general/customer-inquiry-general.json',
         controller: 'CustomerInquiryGeneralCtrl as custgnrl',
         optionsView: 'shared/customer-inquiry-general/customer-inquiry-general-options.html'
      },
      CustomerInquiryHistory: {
         displayName: 'Customer Inquiry History',
         jsonView: 'shared/customer-inquiry-history/customer-inquiry-history.json',
         controller: 'CustomerInquiryHistoryCtrl as custhist',
         optionsView: 'shared/customer-inquiry-history/customer-inquiry-history-options.html'
      },
      CustomerInquiryDnbi: {
         displayName: 'Customer Inquiry Dnbi',
         jsonView: 'shared/customer-inquiry-dnbi/customer-inquiry-dnbi.json',
         controller: 'CustomerInquiryDNBiCtrl as custdnbi',
         optionsView: 'shared/customer-inquiry-dnbi/customer-inquiry-dnbi-options.html'
      },
      CustomerInquiryTransactions: {
         displayName: 'Customer Inquiry Transactions',
         jsonView: 'shared/customer-inquiry-transactions/customer-inquiry-transactions.json',
         controller: 'CustomerInquiryTransactionsCtrl as custtrans',
         optionsView: 'shared/customer-inquiry-transactions/customer-inquiry-transactions-options.html'
      },
      ExtendedDetailsValueAdd: {
         displayName: 'Extended Details (Value Add)',
         jsonView: 'shared/extended-details-value-add/extended-details-value-add.json',
         controller: 'ExtendedDetailsValueAddCtrl as extendedDetailsValueAdd',
         optionsView: 'shared/extended-details-value-add/extended-details-value-add-options.html'
      },
      GeneralLedgerDistribution: {
         displayName: 'General Ledger Distribution',
         jsonView: 'shared/general-ledger-distribution/general-ledger-distribution.json',
         controller: 'GeneralLedgerDistributionCtrl as gldc',
         optionsView: 'shared/general-ledger-distribution/general-ledger-distribution-options.html'
      },
      Kits: {
         displayName: 'OE Line Kits',
         jsonView: 'shared/kits/kit.json',
         controller: 'KitCtrl as kit',
         optionsView: 'shared/kits/kit-options.html'
      },
      LineComments: {
         displayName: 'LineComments',
         jsonView: 'shared/line-comments/line-comments.json',
         controller: 'LineCommentsCtrl as ctns',
         optionsView: 'shared/line-comments/line-comments-options.html'
      },
      Lots: {
         displayName: 'Lots',
         jsonView: 'shared/lots/shared-lots-view.json',
         controller: 'LotsCtrl as lot',
         optionsView: 'shared/lots/lots-options.html'
      },
      LotsInquiry: {
         displayName: 'Lots Inquiry',
         jsonView: 'shared/lots-inquiry/lots-inquiry.json',
         controller: 'LotsInquiryCtrl as lotinq',
         optionsView: 'shared/lots-inquiry/lots-inquiry-options.html'
      },
      NonStockCostCalculator: {
         displayName: 'Non-Stock Cost Calculator',
         jsonView: 'shared/non-stock-cost-calc/non-stock-cost-calc.json',
         controller: 'NonStockCostCalcCtrl as nscc',
         optionsView: 'shared/non-stock-cost-calc/non-stock-cost-calc-options.html'
      },
      NonStockDetailsValueAdd: {
         displayName: 'Non-Stock Details (Value Add)',
         jsonView: 'shared/non-stock-details-value-add/non-stock-details-value-add.json',
         controller: 'NonstockDetailsValueAddCtrl as nonstockDetailsValueAdd',
         optionsView: 'shared/non-stock-details-value-add/non-stock-details-value-add-options.html'
      },
      OEBundles: {
          displayName: 'OE Bundles',
          jsonView: 'oe/shared/bundles/bundles.json',
          controller: 'OeBundlesCtrl as bundles',
          optionsView: 'oe/shared/bundles/bundles-options.html'
      },
      OECreditCardDetails: {
          displayName: 'OE Credit Card Details',
          jsonView: 'oe/shared/credit-card-details/credit-card-details.json',
          controller: 'OeCreditCardDetailsCtrl as cards',
          optionsView: 'oe/shared/credit-card-details/credit-card-details-options.html'
      },
      OEFulfillment: {
          displayName: 'OE Fulfillment',
          jsonView: 'shared/order-fulfillment/order-fulfillment.json',
          controller: 'OrderFulfillmentCtrl as oful',
          optionsView: 'shared/order-fulfillment/order-fulfillment.html'
      },
      OELineDetails: {
          displayName: 'OE Line Details',
          jsonView: 'oe/shared/line-details/line-details.json',
          controller: 'OeLineDetailsCtrl as lines',
          optionsView: 'oe/shared/line-details/line-details-options.html'
      },
      OETally: {
          displayName: 'OE Tally',
          jsonView: 'oe/shared/tally/tally.json',
          controller: 'OeTallyCtrl as tally',
          optionsView: 'oe/shared/tally/tally-options.html'
      },
      Packages: {
         // TODO: remove 'not ready' after ready
         displayName: 'Packages (not ready)',
         jsonView: 'shared/packages/packages.json',
         controller: 'PackagesCtrl as pkg',
         optionsView: 'shared/packages/packages.html'
      },
      Printer: {
         displayName: 'Printer',
         jsonView: 'shared/printer/printer-view.json',
         controller: 'PrinterCtrl as pc',
         optionsView: 'shared/printer/printer-options.html'
      },
      Serials: {
         displayName: 'Serials',
         jsonView: 'shared/serials/shared-serials-view.json',
         controller: 'SerialsCtrl as ser',
         optionsView: 'shared/serials/serials-options.html'
      },
      SerialsInquiry: {
         displayName: 'Serials Inquiry',
         jsonView: 'shared/serials-inquiry/serials-inquiry.json',
         controller: 'SerialsInquiryCtrl as serinq',
         optionsView: 'shared/serials-inquiry/serials-inquiry-options.html'
      },
      PurchaseOrderAddons: {
         displayName: 'PO Addons',
         jsonView: 'po/shared/additional-addons/additional-addons.json',
         controller: 'PoAdditionalAddonsCtrl as paac',
         optionsView: 'po/shared/additional-addons/additional-addons-options.html'
      },
      PurchaseOrderBundles: {
         displayName: 'PO Bundles',
         jsonView: 'po/shared/bundles/bundles.json',
         controller: 'PoBundlesCtrl as bundles',
         optionsView: 'po/shared/bundles/bundles-options.html'
      },
      PurchaseOrderCoreReturnAllocation: {
         displayName: 'PO Core Return Allocation',
         jsonView: 'po/shared/core-return-allocation/core-return-allocations.json',
         controller: 'PoCoreReturnAllocationsCtrl as poCra',
         optionsView: 'po/shared/core-return-allocation/core-return-allocations-options.html'
      },
      PurchaseOrderTally: {
         displayName: 'PO Tally',
         jsonView: 'po/shared/tally/tally.json',
         controller: 'PoTallyCtrl as tally',
         optionsView: 'po/shared/tally/tally-options.html'
      },
      Ties: {
         displayName: 'Ties',
         jsonView: 'shared/ties/ties.json',
         controller: 'TiesCtrl as ties',
         optionsView: 'shared/ties/ties-options.html'
      },
      TWLNotesComments: {
         displayName: 'TWL Notes Comments',
         jsonView: 'twl/shared/notes-comments/notes-comments.json',
         controller: 'TwlNotesCommentsCtrl as twlnc',
         optionsView: 'twl/shared/notes-comments/notes-comments-options.html'
      },
      UserFields: {
         displayName: 'User Fields',
         directive: 'user-fields',
         optionsView: 'shared/user-fields/user-fields-options.html'
      }
   };

});
