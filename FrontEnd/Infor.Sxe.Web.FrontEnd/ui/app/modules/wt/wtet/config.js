'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider, Constants) {
   var module = 'wt';
   var menuFn = 'wtet';
   var menuFnCapitalized = menuFn.charAt(0).toUpperCase() + menuFn.slice(1);

   // Create set of wtet states up to the max open wtet tabs that we want to allow
   for (var i = 1; i <= Constants.MAX_MULTIPLE_FUNCTION_TABS; i++) {
      var baseState = 'wtet';
      var baseUrl = '/wtet';

      // Append a number for additional states
      if (i > 1) {
         baseState = baseState + i;
         baseUrl = baseUrl + i;
      }

      var data = {};
      var views = {};

      // Tab title reference is by convention
      data.tabTitle = 'title.wtet';

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
            jsonView: 'wt/wtet/shared/header-info.json'
         },
         {
            title: 'global.header.totals',
            icon: '#icon-payment-request',
            expanded: true,
            personalize: true,
            contentClass: 'top-padding',
            jsonView: 'wt/wtet/shared/header-totals.json'
         }
      ];

      // Set up template view
      views[baseState + '@'] = {
         templateUrl: 'ui/app/modules/wt/wtet/layout.html',
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
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/initiate/initiate.json');
               },
               controller: 'WtetInitiateCtrl as inp'
            }
         }
      });

      // Order Status > Initiate state
      $stateProvider.state(baseState + '.initiate.orderStatus', {
         url: '/order-status',
         params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null },
         views: {
            orderStatus: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/order-status/order-status.json');
               },
               controller: 'OrderStatusCtrl as ordStat'
            }
         }
      });

      // Entry Defaults state
      $stateProvider.state(baseState + '.entryDefaults', {
         url: '/entry-defaults',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/initiate/entry-defaults.json');
               },
               controller: 'WtetEntryDefaultsCtrl as wted'
            }
         }
      });

      // Maintain state
      $stateProvider.state(baseState + '.maintain', {
         url: '/maintain',
         params: { isRecovery: null, recoveryId: null, recoverySuffix: null, recoveryJournal: null, recoveryData: null },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/initiate/maintain.json');
               },
               controller: 'WtetMaintainCtrl as mp'
            }
         }
      });

      // Order Status > Maintain state
      $stateProvider.state(baseState + '.maintain.orderStatus', {
         url: '/order-status',
         params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null },
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
                  return JsonViewService.getView('wt/wtet/initiate/delete.json');
               },
               controller: 'WtetDeleteCtrl as del'
            }
         }
      });

      // Order Status > Delete state
      $stateProvider.state(baseState + '.delete.orderStatus', {
         url: '/order-status',
         params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null },
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
                  return JsonViewService.getView('wt/wtet/initiate/copy.json');
               },
               controller: 'WtetCopyCtrl as copy'
            }
         }
      });

      // Print state
      $stateProvider.state(baseState + '.print', {
         url: '/print',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/initiate/print.json');
               },
               controller: 'WtetPrintCtrl as wtPrint'
            }
         }
      });

      // Import From Excel state
      $stateProvider.state(baseState + '.importFromExcel', {
         url: '/import-from-excel',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/initiate/import-from-excel.json');
               },
               controller: 'WtetImportFromExcelCtrl as ife'
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
                  return JsonViewService.getView('wt/wtet/initiate/import-from-excel-details.json');
               },
               controller: 'WtetImportFromExcelDetailsCtrl as ifeD'
            }
         }
      });

      // Select Products state
      $stateProvider.state(baseState + '.selectProducts', {
         url: '/select-products',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/select-products.json');
               },
               controller: 'WtetSelectProductsCtrl as sp'
            }
         }
      });

      // Transfer Order Settings state
      $stateProvider.state(baseState + '.selectProducts.transferOrderSettings', {
         url: '/transfer-order-settings',
         params: {
             callingState: null
         },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/transfer-order-settings.json');
               },
               controller: 'WtetTransferOrderSettingsCtrl as pos'
            }
         }
      });

      // Advanced Line Entry state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry', {
         url: '/advanced-line-entry',
         params: { product: null, lineNo: null, qtyord: null, unit: null, price: null, fromEditLines: null, activePage: null },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/advanced-line-entry.json');
               },
               controller: 'WtetAdvancedLineEntryCtrl as ale'
            }
         }
      });

      // Line Entry - Non-Stock state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.nonStock', {
         url: '/non-stock',
         params: {
            isProductLoaded: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/line-entry-child-states/non-stocks/non-stock.json');
               },
               controller: 'WtetAdvancedLineEntryNonStockCtrl as aleNs'
            }
         }
      });

      // Line Entry - Ties state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.ties', {
         url: '/ties',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/line-entry-child-states/ties.json');
               },
               controller: 'WtetAdvancedLineEntryTiesCtrl as aleTie'
            }
         }
      });

      // Line Entry - Comments state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.comments', {
         url: '/comments',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/line-entry-child-states/comments.json');
               }
            }
         }
      });

      // Line Entry - Warehouse Manager Bin Allocation state
      BinAllocationStateProvider.addStates(module, menuFn, baseState + '.selectProducts.advancedLineEntry');

      // Line Entry - Serials state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.serials', {
         url: '/serials',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/line-entry-child-states/serials.json');
               },
               controller: 'WtetAdvancedLineEntrySerialsCtrl as aleSer'
            }
         }
      });

      // Line Entry - Lots state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.lots', {
         url: '/lots',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/line-entry-child-states/lots.json');
               },
               controller: 'WtetAdvancedLineEntryLotsCtrl as aleLot'
            }
         }
      });

      // Line Entry - Cross Reference state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.crossReference', {
         url: '/cross-reference',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/line-entry-child-states/cross-reference.json');
               },
               controller: 'WtetAdvancedLineEntryCrossReferenceCtrl as aleCr'
            }
         }
      });

      // Detailed Grid state
      $stateProvider.state(baseState + '.selectProducts.detailedGrid', {
         url: '/edit-lines',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/select-products/detailed-grid.json');
               },
               controller: 'WtetDetailedGridCtrl as dg'
            }
         }
      });

      // Review and Totals state
      $stateProvider.state(baseState + '.reviewAndTotals', {
         url: '/review-and-totals',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('wt/wtet/review-and-totals/review-and-totals.json');
               },
               controller: 'WtetReviewAndTotalsCtrl as rat'
            }
         }
      });
   }
});