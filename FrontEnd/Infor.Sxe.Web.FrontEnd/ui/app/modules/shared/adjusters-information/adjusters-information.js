'use strict';

/**
 * Steps to implement this Adjusters Information control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of: 'adjustersinfo'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: AdjustersInformationStateProvider
 *        ii) Wire in: AdjustersInformationStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'ic', 'icsp', 'icsp.detail')
 *        $state.go('icsw.detail.adjustersInformation', { prod: icsw.prod, whse: icsw.whse});
 */

app.provider('AdjustersInformationState', function AdjustersInformationStateProvider($stateProvider) {
   var self = this;

   this.$get = function () {
      return self;
   };

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.adjustersInformation', {
         url: '/adjusters-information',
         params: {
            prod: null,
            whse: null
         },
         views: {
            adjusters: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/adjusters-information/adjusters-information.json');
               },
               controller: 'AdjustersInformationCtrl as aic'
            }
         }
      });

   };
});

app.controller('AdjustersInformationCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, Utils) {
   var self = this;
   self.getSubTitle = function () {
      return MessageService.get('global.product') + ': ' + $stateParams.prod + ' | ' +
         MessageService.get('global.warehouse') + ': ' + $stateParams.whse;
   };

   self.loadAdjusters = function () {
      var criteria = {
         prod: $stateParams.prod,
         whse: $stateParams.whse
      };

      DataService.post('api/ic/asicwhseprod/icipfetchadjusters', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.adjusters = data;
            self.fiveHiDetails = [
                { highsale: self.adjusters.highsale1, highchar: self.adjusters.highchar1, highsaledt: self.adjusters.highsaledt1, highsaleno: self.adjusters.highsaleno1 },
                { highsale: self.adjusters.highsale2, highchar: self.adjusters.highchar2, highsaledt: self.adjusters.highsaledt2, highsaleno: self.adjusters.highsaleno2 },
                { highsale: self.adjusters.highsale3, highchar: self.adjusters.highchar3, highsaledt: self.adjusters.highsaledt3, highsaleno: self.adjusters.highsaleno3 },
                { highsale: self.adjusters.highsale4, highchar: self.adjusters.highchar4, highsaledt: self.adjusters.highsaledt4, highsaleno: self.adjusters.highsaleno4 },
                { highsale: self.adjusters.highsale5, highchar: self.adjusters.highchar5, highsaledt: self.adjusters.highsaledt5, highsaleno: self.adjusters.highsaleno5 }
            ];
         }
      });
   };

   self.loadAdjusters();
});