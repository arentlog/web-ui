'use strict';

/**
 * Steps to implement this Product warehouse usage control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of: 'multiLanguage'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: MultiLanguageStateProvider
 *        ii) Wire in: MultiLanguageStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'ic', 'icsp', 'icsp.detail')
 */

app.provider('ProductWarehouseUsageState', function ProductWarehouseUsageStateProvider($stateProvider) {
   var self = this;

   this.$get = function () {
      return self;
   };

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.productWarehouseUsage', {
         url: '/product-warehouse-usage',
         params: {
            enabled: false,
            prod: null,
            whse: null,
            unit: null,
            recalcEnabled: false,
            returnState: null
         },
         views: {
            usage: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/product-warehouse-usage/product-warehouse-usage.json');
               },
               controller: 'ProductWarehouseUsageCtrl as pwu'

            }
         }
      });

   };
});
app.controller('ProductWarehouseUsageCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.screenlastmergedate = null;
   self.screenfirstmergedate = null;
   self.recalcEnabled = $stateParams.recalcEnabled;

   self.loadUsage = function (unit) {

      var criteria = {
         enabled: $stateParams.enabled,
         prod: $stateParams.prod,
         whse: $stateParams.whse,
         unit: unit,
         recalcEnabled: $stateParams.recalcEnabled
      };

      DataService.post('api/ic/asicadmin/loadusagehistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.usagesingle = data.loadusagehistorysingle;
            self.usageresults = data.loadusagehistoryresults;
            if (!self.screenlastmergedate) {
               self.screenlastmergedate = data.loadusagehistorysingle.lastmergedate;
            }
            if (self.screenlastmergedate !== data.loadusagehistorysingle.lastmergedate) {
               data.loadusagehistorysingle.lastmergedate = self.screenlastmergedate;
            }
            if (!self.screenfirstmergedate) {
               self.screenfirstmergedate = data.loadusagehistorysingle.firstmergedate;
            }
            if (self.screenfirstmergedate !== data.loadusagehistorysingle.firstmergedate) {
               data.loadusagehistorysingle.firstmergedate = self.screenfirstmergedate;
            }

            var initData = {
               loadusagecriteria: {
                  enabled: $stateParams.enabled,
                  prod: $stateParams.prod,
                  whse: $stateParams.whse,
                  unit: self.usagesingle.unit
               },

               loadusagehistorysingle: data.loadusagehistorysingle,
               loadusagehistoryresults: data.loadusagehistoryresults
            };

            DataService.post('api/ic/asicadmin/rebuildusagehistorydates', { data: initData, busy: true }, function (data) {
               if (data) {
                  self.usageresults = data;
               }
            });
         }
      });
   };

   self.loadUsage($stateParams.unit);

   self.updateICSWU = function () {
      var initData = {
         loadusagecriteria: {
            enabled: $stateParams.enabled,
            prod: $stateParams.prod,
            whse: $stateParams.whse,
            unit: self.usagesingle.unit
         },

         loadusagehistorysingle: self.usagesingle,
         loadusagehistoryresults: self.usageresults
      };

      DataService.post('api/ic/asicadmin/icamrupdateicswurecord', { data: initData, busy: true }, function (data) {
         if (data) {
            self.loadUsage(self.usagesingle.unit);
         }
      });
   };

   self.recalcOrderingControls = function () {
      var criteria = [];
      var initData = {
         prod: $stateParams.prod,
         whse: $stateParams.whse,
         unit: self.usagesingle.unit
      };

      criteria.push(initData);
      DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criteria, busy: true }, function (data) {
      });
   };

   self.isScreenEditable = function () {

      if ($stateParams.enabled) {
         return true;
      } else {
         return false;
      }
   };

   self.unitChanged = function () {
      self.loadUsage(self.usagesingle.unit, self.screenlastmergedate);
   };

   self.clickUpdateButton = function () {
      self.updateICSWU(self.usagesingle.unit);
   };

   self.clickUpdateRecalcButton = function () {
      self.updateICSWU(self.usagesingle.unit);
      self.recalcOrderingControls(self.usagesingle.unit);
   };

   self.dateChanged = function () {
      self.usagesingle.lastmergedate = self.screenlastmergedate;
      self.usagesingle.firstmergedate = self.screenfirstmergedate;
      self.loadUsage(self.usagesingle.unit);
   };

   self.getSubTitle = function () {
      return MessageService.get('global.product') + ': ' + $stateParams.prod + ' | ' +
         MessageService.get('global.warehouse') + ': ' + $stateParams.whse;
   };

   self.back = function () {
      $state.go($stateParams.returnState);
   };
});