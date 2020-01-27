'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ao', 'ao', {
      widgets: [{
         title: 'global.options',
         icon: '#icon-parameter',
         expanded: true,
         contentClass: 'no-padding',
         templateUrl: 'ui/app/modules/ao/ao/tree-widget.html'
      }]
   });
   StateProvider.addMasterState('ao', 'ao');

   //Begin Parent states

   $stateProvider.state('ao.customers', {
      url: '/customers',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/customers/customers.json');
            },
            controller: 'AoCustomerCtrl as custdtl'
         }
      }
   });

   $stateProvider.state('ao.vendors', {
      url: '/vendors',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/vendors/vendors.json');
            },
            controller: 'AoVendorCtrl as venddtl'
         }
      }
   });

   $stateProvider.state('ao.products', {
      url: '/products',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/products.json');
            },
            controller: 'AoProductsCtrl as proddtl'
         }
      }
   });

   $stateProvider.state('ao.documents', {
      url: '/documents',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/documents.json');
            }
         }
      }
   });

   $stateProvider.state('ao.financials', {
      url: '/financials',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/financials/financials.json');
            },
            controller: 'AoFinancialsCtrl as findtl'
         }
      }
   });

   $stateProvider.state('ao.sales-history', {
      url: '/sales-history',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/sales-history/sales-history.json');
            },
            controller: 'AoSalesHistoryCtrl as shdtl'
         }
      }
   });

   $stateProvider.state('ao.system', {
      url: '/system',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/system.json');
            },
            controller: 'AoSystemCtrl as sysdtl'
         }
      }
   });

   $stateProvider.state('ao.logistics', {
      url: '/logistics',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/logistics/logistics.json');
            },
            controller: 'AoLogisticsCtrl as logdtl'
         }
      }
   });

   $stateProvider.state('ao.integrations', {
      url: '/integrations',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/integrations.json');
            },
            controller: 'AoIntegrationsCtrl as intdtl'
         }
      }
   });

   //End Parent states

   //Begin Customers sub-states

   $stateProvider.state('ao.customers.defaults', {
      url: '/defaults',
      views: {
         customerSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/customers/defaults.json');
            }
         }
      }
   });

   $stateProvider.state('ao.customers.balances', {
      url: '/balances',
      views: {
         customerSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/customers/balances.json');
            }
         }
      }
   });

   $stateProvider.state('ao.customers.cash-receipts', {
      url: '/cash-receipts',
      views: {
         customerSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/customers/cash-receipts.json');
            }
         }
      }
   });

   $stateProvider.state('ao.customers.service-charges', {
      url: '/service-charges',
      views: {
         customerSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/customers/service-charges.json');
            }
         }
      }
   });

   $stateProvider.state('ao.customers.statements', {
      url: '/statements',
      views: {
         customerSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/customers/statements.json');
            }
         }
      }
   });

   //End Customers sub-states

   //Begin Vendors sub-states

   $stateProvider.state('ao.vendors.print-formats', {
      url: '/print-formats',
      views: {
         vendorSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/vendors/print-formats.json');
            }
         }
      }
   });

   $stateProvider.state('ao.vendors.invoice-defaults', {
      url: '/invoice-defaults',
      views: {
         vendorSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/vendors/invoice-defaults.json');
            }
         }
      }
   });

   $stateProvider.state('ao.vendors.analysis', {
      url: '/analysis',
      views: {
         vendorSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/vendors/analysis.json');
            }
         }
      }
   });

   $stateProvider.state('ao.vendors.receiving', {
      url: '/receiving',
      views: {
         vendorSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/vendors/receiving.json');
            }
         }
      }
   });

   $stateProvider.state('ao.vendors.balances', {
      url: '/balances',
      views: {
         vendorSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/vendors/balances.json');
            }
         }
      }
   });

   //End Vendors sub-states

   //Begin Products sub-states

   $stateProvider.state('ao.products.defaults', {
      url: '/defaults',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/defaults.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.alternates-upc', {
      url: '/alternates-upc',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/alternates-upc.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.costs', {
      url: '/costs',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/costs.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.replenishment', {
      url: '/replenishment',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/replenishment.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.pricing', {
      url: '/pricing',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/pricing.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.multiple-level', {
      url: '/multiple-level',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/multiple-level.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.rebates', {
      url: '/rebates',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/rebates.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.alternate-rebate-methods', {
      url: '/alternate-rebate-methods',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/alternate-rebate-methods.json');
            },
            controller: 'AoProductsAltRebatesCtrl as altrbt'
         }
      }
   });

   $stateProvider.state('ao.products.alternate-rebate-methods.detail', {
      url: '/detail',
      params: {
         record: null
      },
      views: {
         'detail@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/alternate-rebate-methods-detail.json');
            },
            controller: 'AoProductsAltRebatesDetailCtrl as armdtl'
         }
      }
   });

   $stateProvider.state('ao.products.cores', {
      url: '/cores',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/cores.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.product-restrictions', {
      url: '/product-restrictions',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/product-restrictions.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.warehouse-manager', {
      url: '/warehouse-manager',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/warehouse-manager.json');
            }
         }
      }
   });

   $stateProvider.state('ao.products.national-program', {
      url: '/national-program',
      views: {
         productSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/products/national-program.json');
            }
         }
      }
   });

   //End Products sub-states

   //Begin Documents sub-states

   $stateProvider.state('ao.documents.kit-production', {
      url: '/kit-production',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/kit-production/kit-production.json');
            },
            controller: 'AoKitProductionCtrl as ktprdtl'
         }
      }
   });

   //Begin Kit Production sub-states

   $stateProvider.state('ao.documents.kit-production.processing', {
      url: '/processing',
      views: {
         kitProductionSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/kit-production/processing.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.kit-production.printing', {
      url: '/printing',
      views: {
         kitProductionSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/kit-production/printing.json');
            }
         }
      }
   });

   //End Kit Production sub-states

   $stateProvider.state('ao.documents.sales-orders', {
      url: '/sales-orders',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/sales-orders.json');
            },
            controller: 'AoSalesOrdersCtrl as sodtl'
         }
      }
   });

   //Begin Sales Orders sub-states

   $stateProvider.state('ao.documents.sales-orders.entry-settings', {
      url: '/entry-settings',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/entry-settings.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.sales-orders.processing', {
      url: '/processing',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/processing.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.sales-orders.approval-process', {
      url: '/approval-process',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/approval-process.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.sales-orders.back-orders', {
      url: '/back-orders',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/back-orders.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.sales-orders.printing', {
      url: '/printing',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/printing.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.sales-orders.quote-orders', {
      url: '/quote-orders',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/quote-orders.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.sales-orders.highest-price', {
      url: '/highest-price',
      views: {
         salesOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/sales-orders/highest-price.json');
            }
         }
      }
   });

   //End Sales Orders sub-states

   $stateProvider.state('ao.documents.purchase-orders', {
      url: '/purchase-orders',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/purchase-orders/purchase-orders.json');
            },
            controller: 'AoPurchaseOrdersCtrl as podtl'
         }
      }
   });

   //Begin Purchase Orders sub-states

   $stateProvider.state('ao.documents.purchase-orders.entry-defaults', {
      url: '/entry-defaults',
      views: {
         purchaseOrderSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/purchase-orders/entry-defaults.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.purchase-orders.replenishment', {
      url: '/replenishment',
      views: {
         purchaseOrderSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/purchase-orders/replenishment.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.purchase-orders.accounting', {
      url: '/accounting',
      views: {
         purchaseOrderSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/purchase-orders/accounting.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.purchase-orders.printing', {
      url: '/printing',
      views: {
         purchaseOrderSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/purchase-orders/printing.json');
            }
         }
      }
   });

   //End Purchase Orders sub-states

   $stateProvider.state('ao.documents.job-management', {
      url: '/job-management',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/job-management/job-management.json');
            },
            controller: 'AoJobManagementCtrl as jmdtl'
         }
      }
   });

   //Begin Job Management sub-states

   $stateProvider.state('ao.documents.job-management.printing', {
      url: '/printing',
      views: {
         jobManagementSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/job-management/printing.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.job-management.processing', {
      url: '/processing',
      views: {
         jobManagementSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/job-management/processing.json');
            }
         }
      }
   });

   //End Job Management sub-states

   $stateProvider.state('ao.documents.transfer-orders', {
      url: '/transfer-orders',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/transfer-orders/transfer-orders.json');
            },
            controller: 'AoTransferOrdersCtrl as todtl'
         }
      }
   });

   //Begin Transfer Orders sub-states

   $stateProvider.state('ao.documents.transfer-orders.processing', {
      url: '/processing',
      views: {
         transferOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/transfer-orders/processing.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.transfer-orders.replenishment', {
      url: '/replenishment',
      views: {
         transferOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/transfer-orders/replenishment.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.transfer-orders.printing', {
      url: '/printing',
      views: {
         transferOrdersSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/transfer-orders/printing.json');
            }
         }
      }
   });

   //End Transfer Orders sub-states

   $stateProvider.state('ao.documents.service-warranty', {
      url: '/service-warranty',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/service-warranty/service-warranty.json');
            },
            controller: 'AoServiceWarrantyCtrl as swdtl'
         }
      }
   });

   //Begin Service Warranty sub-states

   $stateProvider.state('ao.documents.service-warranty.entry-settings', {
      url: '/entry-settings',
      views: {
         serviceWarrantySubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/service-warranty/entry-settings.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.service-warranty.printing', {
      url: '/printing',
      views: {
         serviceWarrantySubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/service-warranty/printing.json');
            }
         }
      }
   });

   //End Service Warranty sub-states

   $stateProvider.state('ao.documents.value-add', {
      url: '/value-add',
      views: {
         'master@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/value-add/value-add.json');
            },
            controller: 'AoValueAddCtrl as vadtl'
         }
      }
   });

   //Begin Value Add sub-states

   $stateProvider.state('ao.documents.value-add.entry-settings', {
      url: '/entry-settings',
      views: {
         valueAddSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/value-add/entry-settings.json');
            }
         }
      }
   });

   $stateProvider.state('ao.documents.value-add.printing', {
      url: '/printing',
      views: {
         valueAddSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/documents/value-add/printing.json');
            }
         }
      }
   });

   //End Value Add sub-states

   //End Documents sub-states

   //Begin Financials sub-states

   $stateProvider.state('ao.financials.account-structure', {
      url: '/account-structure',
      views: {
         financialSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/financials/account-structure.json');
            }
         }
      }
   });

   $stateProvider.state('ao.financials.period-structure', {
      url: '/period-structure',
      views: {
         financialSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/financials/period-structure.json');
            }
         }
      }
   });

   $stateProvider.state('ao.financials.fiscal-year', {
      url: '/fiscal-year',
      views: {
         financialSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/financials/fiscal-year.json');
            }
         }
      }
   });

   $stateProvider.state('ao.financials.profit-distribution', {
      url: '/profit-distribution',
      views: {
         financialSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/financials/profit-distribution.json');
            }
         }
      }
   });

   $stateProvider.state('ao.financials.check-reconciliation', {
      url: '/check-reconciliation',
      views: {
         financialSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/financials/check-reconciliation.json');
            }
         }
      }
   });

   //End Financials sub-states

   //Begin Sales History sub-states

   $stateProvider.state('ao.sales-history.levels', {
      url: '/levels',
      views: {
         salesHistorySubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/sales-history/levels.json');
            }
         }
      }
   });

   $stateProvider.state('ao.sales-history.rebates-basis', {
      url: '/rebates-basis',
      views: {
         salesHistorySubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/sales-history/rebates-basis.json');
            }
         }
      }
   });

   $stateProvider.state('ao.sales-history.customer', {
      url: '/customer',
      views: {
         salesHistorySubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/sales-history/customer.json');
            }
         }
      }
   });

   //End Sales History sub-states

   //Begin System sub-states

   $stateProvider.state('ao.system.general', {
      url: '/general',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/general.json');
            }
         }
      }
   });

   $stateProvider.state('ao.system.options', {
      url: '/options',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.system.user-fields', {
      url: '/user-fields',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/user-fields.json');
            }
         }
      }
   });

   $stateProvider.state('ao.system.function-types', {
      url: '/function-types',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/function-types.json');
            },
            controller: 'AoSystemFunctionTypeCtrl as functype'
         }
      }
   });

   $stateProvider.state('ao.system.function-types.detail', {
      url: '/detail',
      params: {
         record: null
      },
      views: {
         'detail@ao': {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/functiontype-detail.json');
            },
            controller: 'AoSystemFunctionTypeDetailCtrl as funcdtl'
         }
      }
   });

   $stateProvider.state('ao.system.menu-items', {
      url: '/menu-items',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/menu-items.json');
            },
            controller: 'AoSystemMenuItemsCtrl as menuitem'
         }
      }
   });

   $stateProvider.state('ao.system.menu-items.edit', {
      url: '/edit'
   });

   $stateProvider.state('ao.system.report-items', {
      url: '/report-items',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/report-items.json');
            },
            controller: 'AoSystemReportItemsCtrl as reportitem'
         }
      }
   });

   $stateProvider.state('ao.system.report-items.edit', {
      url: '/edit'
   });

   $stateProvider.state('ao.system.login-security', {
      url: '/login-security',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/login-security.json');
            }
         }
      }
   });

   $stateProvider.state('ao.system.report-scheduler', {
      url: '/report-scheduler',
      views: {
         systemSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/system/report-scheduler.json');
            }
         }
      }
   });

   //End System sub-states

   //Begin Logistics sub-states

   $stateProvider.state('ao.logistics.ibc-options', {
      url: '/ibc-options',
      views: {
         logisticsSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/logistics/ibc-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.logistics.wl-options', {
      url: '/wl-options',
      views: {
         logisticsSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/logistics/wl-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.logistics.wl-locations', {
      url: '/wl-locations',
      views: {
         logisticsSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/logistics/wl-locations.json');
            },
            controller: 'AoLogisticsLocationCtrl as logwlloc'
         }
      }
   });

   //End Logistics sub-states

   //Begin Integrations sub-states

   $stateProvider.state('ao.integrations.configurator-options', {
      url: '/configurator-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/configurator-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.tax-interface-options', {
      url: '/tax-interface-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/tax-interface-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.financial-interface-options', {
      url: '/financial-interface-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/financial-interface-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.ion-interface-options', {
      url: '/ion-interface-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/ion-interface-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.billtrust-options', {
      url: '/billtrust-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/billtrust-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.dnbi-integration-options', {
      url: '/dnbi-integration-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/dnbi-integration-options.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.service-management', {
      url: '/service-management',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/service-management.json');
            }
         }
      }
   });

   $stateProvider.state('ao.integrations.lsp-interface-options', {
      url: '/lsp-interface-options',
      views: {
         integrationSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ao/ao/integrations/lsp-interface-options.json');
            }
         }
      }
   });
   //End Integrations sub-states
}); //End config (for states)