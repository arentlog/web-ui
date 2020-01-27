'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider, Constants) {
   var module = 'po';
   var menuFn = 'poet';
   var menuFnCapitalized = menuFn.charAt(0).toUpperCase() + menuFn.slice(1);

   // Create set of poet states up to the max open poet tabs that we want to allow
   for (var i = 1; i <= Constants.MAX_MULTIPLE_FUNCTION_TABS; i++) {
      var baseState = 'poet';
      var baseUrl = '/poet';

      // Append a number for additional states
      if (i > 1) {
         baseState = baseState + i;
         baseUrl = baseUrl + i;
      }

      var data = {};
      var views = {};

      // Tab title reference is by convention
      data.tabTitle = 'title.poet';

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
            jsonView: 'po/poet/shared/header-info.json'
         },
         {
            title: 'global.header.totals',
            icon: '#icon-payment-request',
            expanded: true,
            personalize: true,
            contentClass: 'top-padding',
            jsonView: 'po/poet/shared/header-totals.json'
         }
      ];

      // Set up template view
      views[baseState + '@'] = {
         templateUrl: 'ui/app/modules/po/poet/layout.html',
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
                  return JsonViewService.getView('po/poet/initiate/initiate.json');
               },
               controller: 'PoetInitiateCtrl as inp'
            }
         }
      });

      // Order Status > Initiate state
      $stateProvider.state(baseState + '.initiate.orderStatus', {
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

      // Return state
      $stateProvider.state(baseState + '.initiate.return', {
         url: '/return',
         params: {submitCallback: null},
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/initiate/create/return.json');
               },
               controller: 'PoetReturnCtrl as incrrm'
            }
         }
      });

      // Vendor Claims
      $stateProvider.state(baseState + '.initiate.vendorClaims', {
         url: '/vendor-claims',
         params: {
            submitCallback: null,
            cancelCallback: null
         },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/shared/vendor-claims.json');
               },
               controller: 'PoetVendorClaimsCtrl as vc'
            }
         }
      });

      // Purchase Order Entry Defaults state
      $stateProvider.state(baseState + '.initiate.entryDefaults', {
         url: '/entry-defaults',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/initiate/entry-defaults.json');
               },
               controller: 'PoetEntryDefaultsCtrl as poed'
            }
         }
      });

      // Purchase Order Entry Defaults state
      $stateProvider.state(baseState + '.maintain.entryDefaults', {
         url: '/entry-defaults',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/initiate/entry-defaults.json');
               },
               controller: 'PoetEntryDefaultsCtrl as poed'
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
                  return JsonViewService.getView('po/poet/initiate/maintain.json');
               },
               controller: 'PoetMaintainCtrl as mp'
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
                  return JsonViewService.getView('po/poet/initiate/delete.json');
               },
               controller: 'PoetDeleteCtrl as del'
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
                  return JsonViewService.getView('po/poet/initiate/copy.json');
               },
               controller: 'PoetCopyCtrl as copy'
            }
         }
      });

      // Print state
      $stateProvider.state(baseState + '.print', {
         url: '/print',
         params: { callingState: null },
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/initiate/print.json');
               },
               controller: 'PoetPrintCtrl as poPrint'
            }
         }
      });

      // Import From Excel state
      $stateProvider.state(baseState + '.importFromExcel', {
         url: '/import-from-excel',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/initiate/import-from-excel.json');
               },
               controller: 'PoetImportFromExcelCtrl as ife'
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
                  return JsonViewService.getView('po/poet/initiate/import-from-excel-details.json');
               },
               controller: 'PoetImportFromExcelDetailsCtrl as ifeD'
            }
         }
      });

      // Select Products state
      $stateProvider.state(baseState + '.selectProducts', {
         url: '/select-products',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/select-products.json');
               },
               controller: 'PoetSelectProductsCtrl as sp'
            }
         }
      });

      // Purchase Order Settings state
      $stateProvider.state(baseState + '.selectProducts.purchaseOrderSettings', {
         url: '/purchase-order-settings',
         params: {
            callingState: null
         },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/purchase-order-settings.json');
               },
               controller: 'PoetPurchaseOrderSettingsCtrl as pos'
            }
         }
      });

      // Purchase Order Settings - Vendor Claims
      $stateProvider.state(baseState + '.selectProducts.purchaseOrderSettings.vendorClaims', {
         url: '/vendor-claims',
         params: { submitCallback: null },
         views: {
            posChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/shared/vendor-claims.json');
               },
               controller: 'PoetVendorClaimsCtrl as vc'
            }
         }
      });

      // Advanced Line Entry state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry', {
         url: '/advanced-line-entry',
         params: { product: null, lineNo: null, qtyord: null, unit: null, price: null },
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/advanced-line-entry.json');
               },
               controller: 'PoetAdvancedLineEntryCtrl as ale'
            }
         }
      });

      // Line Entry - Bundles state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.bundles', {
         url: '/bundles',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/bundles.json');
               },
               controller: 'PoetAdvancedLineEntryTalliesBundlesCtrl as aleBdl'
            }
         }
      });

      // Line Entry - Comments state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.comments', {
         url: '/comments',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/comments.json');
               }
            }
         }
      });

      // Line Entry - Core Return Allocations state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.coreReturnAllocations', {
         url: '/core-return-allocations',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/core-return-allocations.json');
               }
            }
         }
      });

      // Line Entry - Lots state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.lots', {
         url: '/lots',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/lots.json');
               },
               controller: 'PoetAdvancedLineEntryLotsCtrl as aleLot'
            }
         }
      });

      // Line Entry - Non-Stock state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.nonStock', {
         url: '/non-stock',
         params: {
            isNonstockMode: null,
            isProductLoaded: null
         },
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/non-stocks/non-stock.json');
               },
               controller: 'PoetAdvancedLineEntryNonStockCtrl as aleNs'
            }
         }
      });

      // Line Entry - Non-Stock - Defaults state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.nonStock.defaults', {
         url: '/defaults',
         views: {
            nonStockChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/non-stocks/defaults.json');
               },
               controller: 'PoetAdvancedLineEntryNonStockDefaultsCtrl as aleNsD'
            }
         }
      });

      // Line Entry - Pricing state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.pricing', {
         url: '/pricing',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/pricing.json');
               },
               controller: 'PoetAdvancedLineEntryPricingCtrl as aleP'
            }
         }
      });

      // Line Entry - Serials state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.serials', {
         url: '/serials',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/serials.json');
               },
               controller: 'PoetAdvancedLineEntrySerialsCtrl as aleSer'
            }
         }
      });

      // Line Entry - Tallies state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.tallies', {
         url: '/tallies',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/tallies.json');
               },
               controller: 'PoetAdvancedLineEntryTalliesBundlesCtrl as aleTly'
            }
         }
      });

      // Line Entry - Ties state
      $stateProvider.state(baseState + '.selectProducts.advancedLineEntry.ties', {
         url: '/ties',
         views: {
            aleChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/line-entry-child-states/ties.json');
               },
               controller: 'PoetAdvancedLineEntryTiesCtrl as aleTie'
            }
         }
      });

      // Detailed Grid state
      $stateProvider.state(baseState + '.selectProducts.detailedGrid', {
         url: '/edit-lines',
         views: {
            childView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/select-products/detailed-grid.json');
               },
               controller: 'PoetDetailedGridCtrl as dg'
            }
         }
      });

      // Review and Totals state
      $stateProvider.state(baseState + '.reviewAndTotals', {
         url: '/review-and-totals',
         views: {
            main: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('po/poet/review-and-totals/review-and-totals.json');
               },
               controller: 'PoetReviewAndTotalsCtrl as rat'
            }
         }
      });
   }
});