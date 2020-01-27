'use strict';

/**
 * Steps to implement this Lead Time History control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of: 'leadtime'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: LeadTimeHistoryStateProvider
 *        ii) Wire in:    LeadTimeHistoryStateProvider.addStates('ic', 'icsw', 'icsw.detail');
 *            $state.go('icsw.detail.leadTimeHistory', { enabled: self.isUpdateSecure, prod: icsw.prod, whse: icsw.whse, frozenty: icsw.frozenltty, leadtimeavg: icsw.leadtmavg, leadtimedt: icsw.avgltdt, callback: self.leadTimeFinished, returnState: $state.current.name });
 *
 **/

app.provider('LeadTimeHistoryState', function LeadTimeHistoryStateProvider($stateProvider) {
   var self = this;

   this.$get = function () {
      return self;
   };

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.leadTimeHistory', {
         url: '/lead-time-history',
         params: {
            enabled: false,
            prod: null,
            whse: null,
            frozenty: null,
            leadtimeavg: 0,
            leadtimedt: null,
            leadtimeupdated: false,
            callback: null,
            returnState: null
         },
         views: {
            leadtime: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/lead-time-history/lead-time-history.json');
               },
               controller: 'LeadTimeHistoryCtrl as lth'
            }
         }
      });

   };
});

app.controller('LeadTimeHistoryCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, Utils) {
   var self = this;
   self.noreceipts = 4;
   self.leadtimeresults = [];
   self.fromicsr = false;
   self.leadtimeupdated = false;

   self.recalcCriteria = {
      receiptdate: null,
      noreceipts: 5,
      ltmonths: 0,
      calcLTAvg: 1,
      ltSortBy: 'r',
      inclrushfl: false,
      incldirectfl: false,
      inclreleasefl: false
   };

   self.prodWhseInfo = {
      leadtmavg: $stateParams.leadtimeavg,
      leadtmavgdt: $stateParams.leadtimedt,
      frozenltty: $stateParams.frozenty

   };

   self.loadLeadTime = function () {
      var criteria = null;
      if (!self.recalcCriteria.receiptdate && self.recalcCriteria.ltmonths) {
         var itoday = new Date();
         var imonth = itoday.getMonth() + 2;
         var iyear = Utils.getCurrentYearFour();
         var iltmonths = self.recalcCriteria.ltmonths;

         while (iltmonths > 0) {
            if (imonth - 1 !== 0) {
               iltmonths--;
               imonth--;
            } else {
               imonth = 12;
               iyear--;
            }
         }

         self.recalcCriteria.receiptdt = new Date(iyear, imonth, 1);
         self.recalcCriteria.receiptdate = new Date(iyear, imonth, 1);

         criteria = {
            product: $stateParams.prod,
            whse: $stateParams.whse,
            frozenltty: self.prodWhseInfo.frozenltty,
            receiptdt: self.recalcCriteria.receiptdate,
            noreceipts: self.recalcCriteria.noreceipts,
            incldirectfl: self.recalcCriteria.incldirectfl,
            inclrushfl: self.recalcCriteria.inclrushfl,
            inclreleasefl: self.recalcCriteria.inclreleasefl
         };
      } else {

         criteria = {
            product: $stateParams.prod,
            whse: $stateParams.whse,
            frozenltty: self.prodWhseInfo.frozenltty,
            receiptdt: self.recalcCriteria.receiptdate,
            noreceipts: self.recalcCriteria.noreceipts,
            incldirectfl: self.recalcCriteria.incldirectfl,
            inclrushfl: self.recalcCriteria.inclrushfl,
            inclreleasefl: self.recalcCriteria.inclreleasefl
         };
      }

      DataService.post('api/ic/asicadmin/icamuloadleadtimehistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.leadtimeresults = data;
            if (self.fromicsr) {
               self.recalcLeadTime(true, false, false);
               self.fromicsr = false;
            }
         }
      });
   };

   self.recalcLeadTime = function (fromicsr, frombutton, updatebutton) {
      var initData = {
         loadleadtimehistcriteria: {
            product: $stateParams.prod,
            whse: $stateParams.whse,
            receiptdt: self.recalcCriteria.receiptdate,
            noreceipts: self.recalcCriteria.noreceipts,
            incldirectfl: self.recalcCriteria.incldirectfl,
            inclrushfl: self.recalcCriteria.inclrushfl,
            inclreleasefl: self.recalcCriteria.inclreleasefl,
            leadtmavg: self.recalcCriteria.calcLTAvg
         },

         loadleadtimehistresults: self.leadtimeresults
      };

      DataService.post('api/ic/asicadmin/icamurecalcleadtime', { data: initData, busy: true }, function (data) {
         if (data) {
            self.leadtimeresults = data.loadleadtimehistresults;
            self.leadtimecriteria = data.loadleadtimehistcriteria;
            self.promptQuestion = data.cPromptQuestion;

            if (self.leadtimecriteria.calcltavgmsg && !fromicsr) {

               MessageService.yesNo('global.question', self.leadtimecriteria.calcltavgmsg,
                 function () {
                     self.recalcCriteria.calcLTAvg = self.leadtimecriteria.calcltavg;
                     if (updatebutton) {
                        self.updateLeadTime();
                     }
                  },
                 function () {
                     self.loadLeadTime();
                  });
            } else {
               self.recalcCriteria.calcLTAvg = self.leadtimecriteria.calcltavg;
               self.loadLeadTime();
            }
         }
      });
   };

   var params = {
      vendno: 0,
      whse: $stateParams.whse,
      prodline: ''
   };
   DataService.get('api/ic/icsr/getbypk', { params: params, busy: true }, function (data) {
      self.fromicsr = true;
      if (data) {
         self.recalcCriteria.noreceipts = data.ltrcpts;
         self.recalcCriteria.ltmonths = data.ltmths;
         self.loadLeadTime();

      } else {
         var params = {
            vendno: 0,
            whse: '',
            prodline: ''
         };
         DataService.get('api/ic/icsr/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.recalcCriteria.noreceipts = data.ltrcpts;
               self.recalcCriteria.ltmonths = data.ltmths;
               self.loadLeadTime();
            } else {
               self.loadLeadTime();
            }
         });
      }

   });

   self.purchaseOrderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // POIP HyperLink
      if (currentRow && currentRow.pono > 0) {
         $state.go('poip.detail', { pk: currentRow.pono });
      }
   };

   self.isUpdateSecure = function () {
      var retn = false;
      if ($stateParams.enabled) {
         retn = true;
      }
      return retn;
   };

   self.isLineLTEditable = function (row, cell, value, column, item) {
      if ($stateParams.enabled) {
         return true;
      } else {
         return false;
      }
   };

   self.vendorInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // APIV HyperLink
      if (currentRow && currentRow.vendno > 0) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.updateLeadTime = function () {
      var updateData = {
         loadleadtimehistcriteria: self.leadtimecriteria,
         loadleadtimehistresults: self.leadtimeresults
      };
      DataService.post('api/ic/asicadmin/icamuupdateleadtime', { data: updateData, busy: true }, function (data) {
         if (data) {
            self.leadtimeresults = data.loadleadtimehistresults;
            self.leadtimecriteria = data.loadleadtimehistcriteria;
         }
      });
      self.leadtimeavg = self.leadtimecriteria.leadtmavg;
      self.leadtimedt = Utils.getCurrentDate();
      self.leadtimeupdated = true;
   };

   self.getSubTitle = function () {
      return MessageService.get('global.product') + ': ' + $stateParams.prod + ' | ' +
         MessageService.get('global.warehouse') + ': ' + $stateParams.whse;
   };

   self.back = function () {

      $stateParams.callback(self.leadtimeavg, self.leadtimedt, self.leadtimeupdated);
      $state.go($stateParams.returnState);
   };
});