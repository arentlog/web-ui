'use strict';

/**
 * Steps to implement this Trend Information shared control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of: 'trendInfo'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject:  TrendInformationStateProvider
 *        ii) Wire in: TrendInformationStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'ic', 'icsp', 'icsp.detail')
 *           $state.go('icsw.detail.trendInformation', { prod: icsw.prod, whse: icsw.whse, returnState: $state.current.name });
 **/

app.provider('TrendInformationState', function TrendInformationStateProvider($stateProvider) {
   var self = this;

   this.$get = function () {
      return self;
   };

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.trendInformation', {
         url: '/trend-information',
         params: {
            prod: null,
            whse: null,
            returnState: null
         },
         views: {
            usage: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/trend-information/trend-information.json');
               },
               controller: 'TrendInformationCtrl as tri'
            }
         }
      });
   };
});

app.controller('TrendInformationCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;

   self.loadTrend = function () {

      var criteria = {
         prod: $stateParams.prod,
         whse: $stateParams.whse
      };

      DataService.post('api/ic/asicwhseprod/icipfetchtrend', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.trendinfo = data;
         }
      });
   };

   self.loadUsage = function () {

      var criteria = {
         prod: $stateParams.prod,
         whse: $stateParams.whse
      };

      DataService.post('api/ic/asicadmin/loadusagehistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.usagesingle = data.loadusagehistorysingle;
            self.usageresults = data.loadusagehistoryresults;

         }
      });
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + $stateParams.whse + ' | ' +
         MessageService.get('global.product') + ': ' + $stateParams.prod;
   };

   self.back = function () {
      $state.go($stateParams.returnState);
   };

   self.loadTrend();
   self.loadUsage();
});