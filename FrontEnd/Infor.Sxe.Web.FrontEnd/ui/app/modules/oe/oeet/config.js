'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider, KitStateProvider, Constants) {
   var module = 'oe';
   var menuFn = 'oeet';
   var menuFnCapitalized = menuFn.charAt(0).toUpperCase() + menuFn.slice(1);

   // Create set of oeet states up to the max open oeet tabs that we want to allow
   for (var i = 1; i <= Constants.MAX_MULTIPLE_FUNCTION_TABS; i++) {
      var baseState = 'oeet';
      var baseUrl = '/oeet';

      // Append a number for additional states
      if (i > 1) {
         baseState = baseState + i;
         baseUrl = baseUrl + i;
      }

      var data = {};
      var views = {};

      // Tab title reference is by convention
      data.tabTitle = 'title.oeet';

      // Flag as a function that can be opened in multiple tabs
      data.allowMultiple = true;

      // Attach module, menuFn, and widgets to base state for easy access
      data.module = module;
      data.menuFn = menuFn;
      data.widgets = [
         {
            title: 'global.header.information',
            icon: '#icon-bullet-list',
            expanded: true,
            personalize: true,
            contentClass: 'top-padding',
            jsonView: 'oe/oeet/shared/header-info.json'
         },
         {
            title: 'global.header.totals',
            icon: '#icon-payment-request',
            expanded: false,
            personalize: true,
            contentClass: 'top-padding',
            jsonView: 'oe/oeet/shared/header-totals.json'
         }, 'JOURNAL'];

      // Set up template view
      views[baseState + '@'] = {
         templateUrl: 'ui/app/modules/oe/oeet/layout.html',
         controller: menuFnCapitalized + 'BaseCtrl as base'
      };

      // Base state
      $stateProvider.state(baseState, {
         url: baseUrl,
         deepStateRedirect: { default: baseState + '.initiate' },
         sticky: true,
         views: views,
         data: data
      });

      // Initiate state
      $stateProvider.state(baseState + '.initiate', {
         url: '/initiate',
         params: { custno: null },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/initiate.json');
               },
               controller: 'OeetInitiateCtrl as ino'
            }
         }
      });

      // Taken By state
      $stateProvider.state(baseState + '.initiate.takenBy', {
         url: '/taken-by',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/taken-by.json');
               },
               controller: 'OeetTakenByCtrl as tb'
            }
         }
      });

      // Direct Order (sourcing) state
      $stateProvider.state(baseState + '.initiate.directOrder', {
         url: '/direct-order',
         params: {
            title: 'global.order.entry',
            subTitle: 'global.direct.order',
            oehdr: null,
            tie: null,
            oeline: null,
            orderTypes: null,
            oelineComponent: null,
            isWhseAvailGridVisible: false,
            isLimitShipVia: false,
            sourceFieldChangedCallback: null,
            cancelCallback: null,
            finishCallback: null,
            backCallback: null,
            conoForIcWhseAvailCriteria: null,
            whseTypeForIcWhseAvailCriteria: null,
            showDocDisposition: false
         },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/sourcing/sourcing.json');
               },
               controller: 'OeSourcingCtrl as src'
            }
         }
      });

      // Return state
      $stateProvider.state(baseState + '.initiate.correctionReturn', {
         url: '/correction-return',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/correction-return.json');
               },
               controller: 'OeetCorrectionReturnCtrl as incrrm'
            }
         }
      });

      // Quote state
      $stateProvider.state(baseState + '.initiate.quote', {
         url: '/quote',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/quote.json');
               },
               controller: 'OeetQuoteCtrl as inqu'
            }
         }
      });

      // Blanket state
      $stateProvider.state(baseState + '.initiate.blanket', {
         url: '/blanket',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/blanket.json');
               },
               controller: 'OeetBlanketCtrl as inbl'
            }
         }
      });

      // Standing state
      $stateProvider.state(baseState + '.initiate.standing', {
         url: '/standing',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/standing.json');
               },
               controller: 'OeetStandingCtrl as inst'
            }
         }
      });

      // Future state
      $stateProvider.state(baseState + '.initiate.future', {
         url: '/future',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/future.json');
               },
               controller: 'OeetFutureCtrl as inft'
            }
         }
      });

      // Floorplan state
      $stateProvider.state(baseState + '.initiate.floorplan', {
         url: '/floorplan',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/create/floorplan.json');
               },
               controller: 'OeetFloorplanCtrl as infp'
            }
         }
      });

      // Order Entry Defaults state
      $stateProvider.state(baseState + '.initiate.orderEntryDefaults', {
         url: '/order-entry-defaults',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/order-entry-defaults.json');
               },
               controller: 'OeetOrderEntryDefaultsCtrl as oed'
            }
         }
      });

      // Maintain state
      $stateProvider.state(baseState + '.maintain', {
         url: '/maintain',
         params: {
            isRecovery: null,
            recoveryId: null,
            recoverySuffix: null,
            recoveryJournal: null,
            recoveryData: null,
            orderno: null,
            ordersuf: null,
            navState: null
         },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/maintain.json');
               },
               controller: 'OeetMaintainCtrl as mo'
            }
         }
      });

      // Order Status > Maintain state
      $stateProvider.state(baseState + '.maintain.orderStatus', {
         url: '/order-status',
         params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null, setFailCallback: null },
         views: {
            orderStatus: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/order-status/order-status.json');
               },
               controller: 'OrderStatusCtrl as ordStat'
            }
         }
      });

      // Delete state
      $stateProvider.state(baseState + '.delete', {
         url: '/delete',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/delete.json');
               },
               controller: 'OeetDeleteCtrl as del'
            }
         }
      });

      // Order Status > Delete state
      $stateProvider.state(baseState + '.delete.orderStatus', {
         url: '/order-status',
         params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null, setFailCallback: null },
         views: {
            orderStatus: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/order-status/order-status.json');
               },
               controller: 'OrderStatusCtrl as ordStat'
            }
         }
      });

      // Copy state
      $stateProvider.state(baseState + '.copy', {
         url: '/copy',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/copy/copy.json');
               },
               controller: 'OeetCopyCtrl as copy'
            }
         }
      });

      // Copy - Pricing/Discounting Quote state
      $stateProvider.state(baseState + '.copy.pdQuote', {
         url: '/pricing-discounting-quote',
         views: {
            copyChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/copy/pricing-discounting-quote.json');
               },
               controller: 'OeetCopyPricingDicsountingQuoteCtrl as copyPdq'
            }
         }
      });

      // Copy - New Order Info state
      $stateProvider.state(baseState + '.copy.newOrderInfo', {
         url: '/new-order-info',
         views: {
            copyChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/copy/new-order-info.json');
               },
               controller: 'OeetCopyNewOrderInfoCtrl as copyNoi'
            }
         }
      });

      // Copy - New Order Info - Select Lines state
      $stateProvider.state(baseState + '.copy.newOrderInfo.selectLines', {
         url: '/select-lines',
         views: {
            copyNewOrderInfoChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/copy/select-lines.json');
               },
               controller: 'OeetCopyNewOrderInfoSelectLinesCtrl as noiSl'
            }
         }
      });

      // Copy - New Order Info - Sourcing state
      $stateProvider.state(baseState + '.copy.newOrderInfo.sourcing', {
         url: '/sourcing',
         params: {
            title: 'global.copy.direct.order',
            subTitle: 'global.sourcing',
            oehdr: null,
            tie: null,
            oeline: null,
            orderTypes: null,
            oelineComponent: null,
            isWhseAvailGridVisible: true,
            isLimitShipVia: false,
            sourceFieldChangedCallback: null,
            cancelCallback: null,
            finishCallback: null,
            backCallback: null,
            conoForIcWhseAvailCriteria: null,
            whseTypeForIcWhseAvailCriteria: null,
            showDocDisposition: false
         },
         views: {
            copyNewOrderInfoChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/sourcing/sourcing.json');
               },
               controller: 'OeSourcingCtrl as src'
            }
         }
      });

      // Copy - New Order Info - Fabrication Warehouse state
      $stateProvider.state(baseState + '.copy.newOrderInfo.fabWhse', {
         url: '/fabrication-warehouse',
         params: { fabWhse: null },
         views: {
            copyNewOrderInfoChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/copy/fab-whse.json');
               },
               controller: 'OeetCopyNewOrderInfoFabWarehouseCtrl as noiFw'
            }
         }
      });

      // Print state
      $stateProvider.state(baseState + '.print', {
         url: '/print',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/print.json');
               },
               controller: 'OeetPrintCtrl as oePrint'
            }
         }
      });

      // Receive On Account state
      $stateProvider.state(baseState + '.receiveOnAccount', {
         url: '/receive-on-account',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/receive-on-account.json');
               },
               controller: 'OeetReceiveOnAccountCtrl as roa'
            }
         }
      });

      // Counter Sales Shipping state
      $stateProvider.state(baseState + '.counterSalesShipping', {
         url: '/counter-sales-shipping',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/counter-sales-shipping.json');
               },
               controller: 'OeetCounterSalesShippingCtrl as css'
            }
         }
      });

      // Maintain PO state
      $stateProvider.state(baseState + '.maintainPO', {
         url: '/maintain-po',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/maintain-po.json');
               },
               controller: 'OeetMaintainPOCtrl as mpo'
            }
         }
      });

      // Billing Orders state
      $stateProvider.state(baseState + '.billingOrders', {
         url: '/billing-orders',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/billing-orders.json');
               },
               controller: 'OeetBillingOrdersCtrl as wtbo'
            }
         }
      });

      // Import From Excel state
      $stateProvider.state(baseState + '.importFromExcel', {
         url: '/import-from-excel',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/import-from-excel.json');
               },
               controller: 'OeetImportFromExcelCtrl as ife'
            }
         }
      });

      // Import From Excel - Line Details state
      $stateProvider.state(baseState + '.importFromExcel.lineDetails', {
         url: '/line-details',
         params: { selectedLine: null, row: null },
         views: {
            importFromExcelChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/import-from-excel-details.json');
               },
               controller: 'OeetImportFromExcelDetailsCtrl as ifeD'
            }
         }
      });

      // Order Entry Edit Customer/Ship To state
      $stateProvider.state(baseState + '.editCustomerShipTo', {
         url: '/edit-customer-ship-to',
         params: { oehdr: null, returnScreen: null },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/initiate/edit-customer-ship-to.json');
               },
               controller: 'OeetEditCustomerShipToCtrl as ecst'
            }
         }
      });

      // Select Products state
      $stateProvider.state(baseState + '.selectProducts', {
         url: '/select-products',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/select-products.json');
               },
               controller: 'OeetSelectProductsCtrl as sp'
            }
         }
      });

      // Customer Order Settings state
      $stateProvider.state(baseState + '.selectProducts.customerOrderSettings', {
         url: '/customer-order-settings',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/customer-order-settings.json');
               },
               controller: 'OeetCustomerOrderSettingsCtrl as cos'
            }
         }
      });

      // Customer Order Settings - EDI Errors state
      $stateProvider.state(baseState + '.selectProducts.customerOrderSettings.ediErrors', {
         url: '/edi-errors',
         views: {
            cosChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/edi-errors.json');
               },
               controller: 'OeetCustomerOrderSettingsEdiErrorsCtrl as cosedi'
            }
         }
      });

      // Select Products - Force Serials state
      $stateProvider.state(baseState + '.selectProducts.forceSerial', {
         url: '/force-serials',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/force-serials.json');
               }
               //controller: all controls are on base (oeet.js)
            }
         }
      });

      // Select Products - Force Lots state
      $stateProvider.state(baseState + '.selectProducts.forceLot', {
         url: '/force-lots',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/force-lots.json');
               }
               //controller: all controls are on base (oeet.js)
            }
         }
      });

      // Select Products - Shopping List state
      $stateProvider.state(baseState + '.selectProducts.shoppingList', {
         url: '/shopping-list',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/shopping-list/shopping-list.json');
               },
               controller: 'OeetShoppingListCtrl as sl'
            }
         }
      });

      // Select Products - Shopping List - Customer Reservations state
      $stateProvider.state(baseState + '.selectProducts.shoppingList.customerReservations', {
         url: '/customer-reservations',
         params: { selectedRecord: null },
         views: {
            shoppingListChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/shopping-list/customer-reservations.json');
               },
               controller: 'OeetShoppingListCustomerReservationsCtrl as slCr'
            }
         }
      });

      // Select Products - Shopping List - Promotional Products state
      $stateProvider.state(baseState + '.selectProducts.shoppingList.promotionalProducts', {
         url: '/promotional-products',
         views: {
            shoppingListChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/shopping-list/promotional-products.json');
               },
               controller: 'OeetShoppingListPromotionalProductsCtrl as slPp'
            }
         }
      });

      // Select Products - Shopping List - Past Sales state
      $stateProvider.state(baseState + '.selectProducts.shoppingList.pastSales', {
         url: '/past-sales',
         views: {
            shoppingListChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/shopping-list/past-sales.json');
               },
               controller: 'OeetShoppingListPastSalesCtrl as slPs'
            }
         }
      });

      // Select Products - Shopping List - Previous Orders state
      $stateProvider.state(baseState + '.selectProducts.shoppingList.previousOrders', {
         url: '/previous-orders',
         views: {
            shoppingListChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/shopping-list/previous-orders.json');
               },
               controller: 'OeetShoppingListPreviousOrdersCtrl as slPo'
            }
         }
      });

      // Select Products - Shopping List - Product List state
      $stateProvider.state(baseState + '.selectProducts.shoppingList.productList', {
         url: '/product-list',
         views: {
            shoppingListChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/shopping-list/product-list.json');
               },
               controller: 'OeetShoppingListProductListCtrl as slPl'
            }
         }
      });

      // Advanced Line Entry state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry', {
         url: '/advanced-line-entry',
         params: {
            product: null,
            lineNo: null,
            fromEasy: null,
            fromEditLines: null,
            activePage: null
         },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/advanced-line-entry.json');
               },
               controller: 'OeetAdvancedLineEntryCtrl as ale'
            }
         }
      });

      // Line Entry - Serials state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.serials', {
         url: '/serials',
         params: {
            fromReturns: null,
            returnOrderNumber: null,
            returnOrderSuffix: null,
            returnOrderLineNumber: null,
            returnObject: null,
            returnSerialLot: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/serials.json');
               },
               controller: 'OeetAdvancedLineEntrySerialsCtrl as aleSer'
            }
         }
      });

      // Line Entry - Lots state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.lots', {
         url: '/lots',
         params: {
            fromReturns: null,
            returnOrderNumber: null,
            returnOrderSuffix: null,
            returnOrderLineNumber: null,
            returnObject: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/lots.json');
               },
               controller: 'OeetAdvancedLineEntryLotsCtrl as aleLot'
            }
         }
      });

      // Line Entry - EDI Errors/Exceptions state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.ediErrExc', {
         url: '/edi-errors-exceptions',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/edi-err-exc.json');
               }
            }
         }
      });

      // Line Entry - Fabricated Kit Information state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.fabKitInfo', {
         url: '/fabricated-kit-info',
         params: { fromSerials: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/kits/fab-kit-info.json');
               },
               controller: 'OeetAdvancedLineEntryFabKitInfoCtrl as aleFki'
            }
         }
      });

      // Line Entry - Product Configuration Manager state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.productConfigManager', {
         url: '/product-config-manager',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/kits/product-config-manager.json');
               },
               controller: 'OeetAdvancedLineEntryProductConfigManagerCtrl as alePcm'
            }
         }
      });

      // Line Entry - Kit Split state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.productConfigManager.kitSplit', {
         url: '/kit-split',
         views: {
            alePcmChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/kits/kit-split.json');
               },
               controller: 'OeetAdvancedLineEntryKitSplitCtrl as alePcmKs'
            }
         }
      });

      // Line Entry - Non-Stock state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.nonStock', {
         url: '/non-stock',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/non-stocks/non-stock.json');
               },
               controller: 'OeetAdvancedLineEntryNonStockCtrl as aleNs'
            }
         }
      });

      // Line Entry - Non-Stock - Defaults state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.nonStock.defaults', {
         url: '/defaults',
         views: {
            nonStockChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/non-stocks/defaults.json');
               },
               controller: 'OeetAdvancedLineEntryNonStockDefaultsCtrl as aleNsD'
            }
         }
      });

      // Line Entry - Returns state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.returns', {
         url: '/returns',
         params: {
            returnOrderNumber: null,
            returnOrderSuffix: null,
            returnOrderLineNumber: null,
            fromSourcing: null,
            fromSerialLot: null,
            returnObject: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/returns/returns.json');
               },
               controller: 'OeetAdvancedLineEntryReturnsCtrl as aleRet'
            }
         }
      });

      // Line Entry - Returns - Find Invoice state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.returns.findInvoice', {
         url: '/find-invoice',
         params: { isCorrectionTab: false },
         views: {
            aleReturnsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/find-invoice.json');
               },
               controller: 'OeetAdvancedLineEntryReturnsFindInvoiceCtrl as aleFi'
            }
         }
      });

      // Line Entry - Returns - Return Core state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.returns.coreReturn', {
         url: '/core-return',
         params: { coreReturnType: null },
         views: {
            aleReturnsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/returns/core-return.json');
               },
               controller: 'OeetAdvancedLineEntryReturnsCoreCtrl as aleRc'
            }
         }
      });

      // Line Entry - Returns - Core Allocation state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation', {
         url: '/core-allocation',
         params: {
            coreReturnType: null,
            isSubstitute: null
         },
         views: {
            aleReturnsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/returns/core-allocation.json');
               },
               controller: 'OeetAdvancedLineEntryReturnsCoreAllocationCtrl as aleRca'
            }
         }
      });

      // Line Entry - Returns - Core Allocation - Force Serials state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation.forceSerials', {
         url: '/force-serials',
         params: { coreSerialsCriteria: null },
         views: {
            aleReturnsCoreAllocationChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/returns/force-serials.json');
               },
               controller: 'OeetAdvancedLineEntryReturnsCoreAllocationForceSerialsCtrl as aleRcaFs'
            }
         }
      });

      // Line Entry - Sourcing state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.sourcing', {
         url: '/sourcing',
         params: {
            title: 'global.advanced.line.entry',
            subTitle: 'global.sourcing',
            oehdr: null,
            tie: null,
            tieOrderAltNoRef: null,
            oeline: null,
            orderTypes: null,
            oelineComponent: null,
            isWhseAvailGridVisible: true,
            isLimitShipVia: false,
            sourceFieldChangedCallback: null,
            cancelCallback: null,
            finishCallback: null,
            backCallback: null,
            supplierAccessData: null,
            conoForIcWhseAvailCriteria: null,
            whseTypeForIcWhseAvailCriteria: null,
            showDocDisposition: false
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/sourcing/sourcing.json');
               },
               controller: 'OeSourcingCtrl as src'
            }
         }
      });

      // Line Entry - Warehouses Availability state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.warehouseAvailability', {
         url: '/warehouse-availability',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/warehouse-availability.json');
               },
               controller: 'OeetAdvancedLineEntryWarehouseAvailbilityCtrl as aleWa'
            }
         }
      });

      // Line Entry - Cross Reference state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.crossReference', {
         url: '/cross-reference',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/cross-reference.json');
               },
               controller: 'OeetAdvancedLineEntryCrossReferenceCtrl as aleCr'
            }
         }
      });

      // Line Entry - Create Catalog In Inventory state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.createCatalogInInventory', {
         url: '/create-catalog-in-inventory',
         params: {
            productType: null,
            statusType: null,
            hsCode: null,
            countryCode: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/create-catalog-in-inventory.json');
               },
               controller: 'OeetAdvancedLineEntryCreateCatalogInInventoryCtrl as aleCci'
            }
         }
      });

      // Line Entry - Assembly state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.assembly', {
         url: '/assembly',
         params: { icspRecord: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/assembly.json');
               },
               controller: 'OeetAdvancedLineEntryAssemblyCtrl as aleA'
            }
         }
      });

      // Line Entry - Supersedes state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.supersedes', {
         url: '/supersedes',
         params: { criteria: null, results: null, navigationFrom: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/supersedes.json');
               },
               controller: 'OeetAdvancedLineEntrySupersedesCtrl as aleSup'
            }
         }
      });

      // Line Entry - Substitutes state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.substitutes', {
         url: '/substitute',
         params: { criteria: null, results: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/substitutes.json');
               },
               controller: 'OeetAdvancedLineEntrySubstitutesCtrl as aleSubs'
            }
         }
      });

      // Line Entry - Optional Products state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.optionalProducts', {
         url: '/optional-products',
         params: { optionalProduct: null, optionalProductResults: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/optional-products.json');
               },
               controller: 'OeetAdvancedLineEntryOptionalProductsCtrl as aleOp'
            }
         }
      });

      // Line Entry - Warehouse Manager Bin Allocation state
      BinAllocationStateProvider.addStates(module, menuFn, baseState + '.selectProducts.advancedLineEntry');

      // Line Entry - Tax Jurisdiction state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.taxJurisdiction', {
         url: '/tax-jurisdiction',
         params: { optionalProduct: null, optionalProductResults: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/tax-jurisdiction.json');
               },
               controller: 'OeetAdvancedLineEntryTaxJurisdictionCtrl as aleTj'
            }
         }
      });

      // Line Entry - Comments state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.comments', {
         url: '/comments',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/comments.json');
               }
            }
         }
      });

      // Line Entry - Rebate state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.rebate', {
         url: '/rebate',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/rebate.json');
               },
               controller: 'OeetAdvancedLineEntryRebatesCtrl as aleReb'
            }
         }
      });

      // Line Entry - Correction state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.correction', {
         url: '/correction',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/correction.json');
               },
               controller: 'OeetAdvancedLineEntryCorrectionCtrl as aleCorr'
            }
         }
      });

      // Line Entry - Correction - Find Invoice state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.correction.findInvoice', {
         url: '/find-invoice',
         params: { isCorrectionTab: true },
         views: {
            aleCorrectionsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/find-invoice.json');
               },
               controller: 'OeetAdvancedLineEntryCorrectionFindInvoiceCtrl as aleFi'
            }
         }
      });

      // Line Entry - Customer Product state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.customerproduct', {
         url: '/customer-product',
         params: { results: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/customer-product.json');
               },
               controller: 'OeetAdvancedLineEntryCustProdCtrl as aleCustProd'
            }
         }
      });

      // Line Entry - Pricing state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.pricing', {
         url: '/pricing',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/pricing.json');
               },
               controller: 'OeetAdvancedLineEntryPricingCtrl as aleP'
            }
         }
      });

      // Line Entry - Kit state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.kit', {
         url: '/kit',
         params: { updateFromKitCallback: null },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/kits/kit.json');
               }
            }
         }
      });

      // Line Entry - Kit sub-states
      KitStateProvider.addStates(module, menuFn, baseState + '.selectProducts.advancedLineEntry.kit');

      // Line Entry - Tallies state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.tallies', {
         url: '/tallies',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/tallies.json');
               },
               controller: 'OeetAdvancedLineEntryTalliesBundlesCtrl as aleTly'
            }
         }
      });

      // Line Entry - Bundles state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.bundles', {
         url: '/bundles',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/bundles.json');
               },
               controller: 'OeetAdvancedLineEntryTalliesBundlesCtrl as aleBdl'
            }
         }
      });

      // Line Entry - One Time Rebate state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.oneTimeRebate', {
         url: '/one-time-rebate',
         params: {
            oeline: null,
            isInquiry: null,
            okCallback: null,
            cancelCallback: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/one-time-rebate/one-time-rebate.json');
               },
               controller: 'OrderEntryOneTimeRebateCtrl as oeOtr'
            }
         }
      });

      // Line Entry - One Time Cost state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.oneTimeCost', {
         url: '/one-time-cost',
         params: {
            oeline: null,
            isInquiry: null,
            okCallback: null,
            cancelCallback: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/one-time-cost/one-time-cost.json');
               },
               controller: 'OrderEntryOneTimeCostCtrl as oeOtc'
            }
         }
      });

      // Line Entry - Customer Reservations state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.customerReservations', {
         url: '/customer-reservations',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/customer-reservations.json');
               },
               controller: 'OeetAdvancedLineEntryCustomerReservationsCtrl as aleCstRsv'
            }
         }
      });

      // Line Entry - Manual Rebate state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.manualRebate', {
         url: '/manual-rebate',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/manual-rebate/manual-rebate.json');
               },
               controller: 'OeetAdvancedLineEntryManualRebateCtrl as aleMr'
            }
         }
      });

      // Line Entry - Manual Rebate - Details state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.manualRebate.details', {
         url: '/details',
         params: { detailsParams: null },
         views: {
            manualRebateChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/line-entry-child-states/manual-rebate/manual-rebate-details.json');
               },
               controller: 'OeetAdvancedLineEntryManualRebateDetailsCtrl as aleMrD'
            }
         }
      });

      // Line Entry - Manual Rebate - Details - Price Sheet state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.manualRebate.details.priceSheet', {
         url: '/price-sheet',
         params: { stateObject: null },
         views: {
            priceSheet: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/price-sheet/price-sheet.json');
               },
               controller: 'PdspPriceSheetCtrl as psht'
            }
         }
      });

      // Line Entry - Manual Rebate - Details - To Price Sheet state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.manualRebate.details.toPriceSheet', {
         url: '/to-price-sheet',
         params: { stateObject: null },
         views: {
            priceSheet: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/price-sheet/price-sheet.json');
               },
               controller: 'PdspPriceSheetCtrl as psht'
            }
         }
      });

      // Return Multiple Lines state
      $stateProvider.state(baseState + '.selectProducts.returnMultipleLines', {
         url: '/return-multiple-lines',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/multi-line-return/return-multiple-lines.json');
               },
               controller: 'OeetReturnMultipleLinesCtrl as rml'
            }
         }
      });

      // Return Multiple Lines - Details state
      $stateProvider.state(baseState + '.selectProducts.returnMultipleLines.lineDetails', {
         url: '/line-details',
         params: { selectedReturnLine: null },
         views: {
            returnMultipleLinesChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/multi-line-return/return-detail.json');
               },
               controller: 'OeetReturnMultipleLinesDetailCtrl as rmlD'
            }
         }
      });

      // Multiple Line Entry state
      $stateProvider.state(baseState + '.selectProducts.quickLineEntry', {
         url: '/quick-line-entry',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/quick-line-entry.json');
               },
               controller: 'OeetQuickLineEntryCtrl as qle'
            }
         }
      });

      // Lines Grid state
      $stateProvider.state(baseState + '.selectProducts.linesGrid', {
         url: '/edit-lines',
         params: { activePage: null },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/lines-grid/lines-grid.json');
               },
               controller: 'OeetLinesGridCtrl as lg'
            }
         }
      });

      // Lines Grid - Multi-Line Sourcing state
      $stateProvider.state(baseState + '.selectProducts.linesGrid.sourcing', {
         url: '/sourcing',
         params: {
            title: 'global.multi.line.sourcing',
            subTitle: null,
            oehdr: null,
            tie: null,
            oeline: null,
            orderTypes: null,
            oelineComponent: null,
            isWhseAvailGridVisible: false,
            isLimitShipVia: false,
            sourceFieldChangedCallback: null,
            cancelCallback: null,
            finishCallback: null,
            backCallback: null,
            conoForIcWhseAvailCriteria: null,
            whseTypeForIcWhseAvailCriteria: null,
            showDocDisposition: false
         },
         views: {
            linesGridChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/sourcing/sourcing.json');
               },
               controller: 'OeSourcingCtrl as src'
            }
         }
      });

      // Lines Grid - Pricing/Costing Worksheet state
      $stateProvider.state(baseState + '.selectProducts.linesGrid.pricingCostingWorksheet', {
         url: '/pricing-costing-worksheet',
         params: { worksheetType: null, selectedLines: null },
         views: {
            linesGridChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/lines-grid/pricing-costing-worksheet.json');
               },
               controller: 'OeetLinesGridPricingCostingWorksheetCtrl as lgPcw'
            }
         }
      });

      // Lines Grid - Multi-Line Move state
      $stateProvider.state(baseState + '.selectProducts.linesGrid.multiLineMove', {
         url: '/multi-line-move',
         views: {
            linesGridChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/lines-grid/multi-line-move.json');
               },
               controller: 'OeetLinesGridMultiLineMoveCtrl as lgMlm'
            }
         }
      });

      // Lines Grid - Multi-Line Move - Sub Line state
      $stateProvider.state(baseState + '.selectProducts.linesGrid.multiLineMove.subLine', {
         url: '/sub-line',
         params: { selectedSubLine: null, isInAddMode: null },
         views: {
            multiLineMoveChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/select-products/lines-grid/sub-line-detail.json');
               },
               controller: 'OeetLinesGridMultiLineMoveSubLineCtrl as lgMlmSl'
            }
         }
      });

      // Taxes and Totals state
      $stateProvider.state(baseState + '.taxesAndTotals', {
         url: '/taxes-and-totals',
         params: { navFromState: null, drilldownState: null },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/taxes-and-totals/taxes-and-totals.json');
               },
               controller: 'OeetTaxesAndTotalsCtrl as tat'
            }
         }
      });

      // Tax Detail state
      $stateProvider.state(baseState + '.taxesAndTotals.taxDetail', {
         url: '/tax-detail',
         params: { selectedTaxDetail: null },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/taxes-and-totals/tax-detail.json');
               },
               controller: 'OeetTaxDetailCtrl as tattd'
            }
         }
      });

      // Addons state
      $stateProvider.state(baseState + '.taxesAndTotals.addons', {
         url: '/addons',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/taxes-and-totals/addons/addons.json');
               },
               controller: 'OeetAddonsCtrl as add'
            }
         }
      });

      // Discounts state
      $stateProvider.state(baseState + '.taxesAndTotals.discounts', {
         url: '/discounts',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/taxes-and-totals/discounts.json');
               },
               controller: 'OeetDiscountsCtrl as disc'
            }
         }
      });

      // Freight Rate Shop state
      $stateProvider.state(baseState + '.taxesAndTotals.freightRateShop', {
         url: '/freight-rate-shop',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/taxes-and-totals/freight-rate-shop.json');
               },
               controller: 'OeetFreightRateShopCtrl as frs'
            }
         }
      });

      // Collect Payment state
      $stateProvider.state(baseState + '.collectPayment', {
         url: '/collect-payment',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/collect-payment/collect-payment.json');
               },
               controller: 'OeetCollectPaymentCtrl as cp'
            }
         }
      });

      // Signature state
      $stateProvider.state(baseState + '.signature', {
         url: '/signature',
         params: { navBackState: null },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/oeet/shared/signature.json');
               },
               controller: 'OeetSignatureCtrl as sig'
            }
         }
      });

      // Line Entry Level - Order Fulfillment - Lines Grid
      $stateProvider.state(baseState + '.selectProducts.linesGrid.lineFulfillment', {
         url: '/order-fulfillment',
         params: {
            ofFunctionName: null,
            ofOrderNo: null,
            ofOrderSuf: null,
            ofLineNo: null
         },
         views: {
             linesGridChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/order-fulfillment/order-fulfillment.json');
               },
               controller: 'OrderFulfillmentCtrl as oful'
            }
         }
      });

      // Header Level - Order Fulfillment - Maintain
      $stateProvider.state(baseState + '.orderFulfillment', {
          url: '/order-fulfillment',
          params: {
              ofFunctionName: null,
              ofOrderNo: null,
              ofOrderSuf: null,
              ofLineNo: null
          },
          views: {
              main: {
                  templateProvider: function (JsonViewService) {
                      return JsonViewService.getView('shared/order-fulfillment/order-fulfillment.json');
                  },
                  controller: 'OrderFulfillmentCtrl as oful'
              }
          }
      });

   }
});