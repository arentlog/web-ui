'use strict';

//This controller is used when the user clicks "Quick View" from the results toolbar from various places.
//
//When you implement it, make sure you realize that the line-details is a sub-view.   You need to be aware
//to add your particular state to the 'isQuickView' function
//
//Alias: qv
app.controller('PoQuickViewCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   self.callingState = $stateParams.callingState;
   self.poDrillDown = $stateParams.poDrillDown;
   self.DOCUMENT_DELIMITER = '-';
   self.LABEL_DELIMITER = ': ';
   self.FIELD_KEY_DELIMITER = '=';
   self.FIELD_SET_DELIMITER = '|';
   self.PARAM_PRIMARY_KEY_PURCHASE_ORDER = 'pono';
   self.PARAM_SECONDARY_KEY_PURCHASE_ORDER_SUFFIX = 'posuf';
   self.loadPoQuickViewResults = [];
   self.loadPoQuickViewSingle = {
      isLate: false,
      isReceiving: false,
      isValueAdd: false
   };

   //NOTE: If you implement this in other places, you need to add your specific states here.
   self.isQuickView = function () {
      return ($state.is('poei.quick-view') || $state.is('poip.quick-view'));
   };

   self.includesQuickView = function () {
      return ($state.includes('poei.quick-view') || $state.includes('poip.quick-view'));
   };

   self.back = function () {
      $state.go(self.callingState);
   };

   self.getSubTitle = function () {
      return MessageService.get('global.purchase.order.number') + self.LABEL_DELIMITER + self.poDrillDown.pono + self.DOCUMENT_DELIMITER + Utils.pad(self.poDrillDown.posuf, 2);
   };

   self.getTiedOrderNumber = function () {
      if (self.loadPoQuickViewSingle) {
         return self.loadPoQuickViewSingle.orderaltno + '-' + Utils.pad(self.loadPoQuickViewSingle.orderaltsuf, 2);
      } else {
         return '';
      }
   };

   self.launchLineDetails = function (e, args) {
      var record = args[0].item;
      if (record) {
         $state.go('.line-details', { poDrillDown: self.poDrillDown, loadPoQuickViewResult: record });
      }
   };

   self.getHeaderAndLines = function () {
      var loadPoQuickViewCriteria = {
         pono: self.poDrillDown.pono,
         posuf: self.poDrillDown.posuf
      };

      DataService.post('api/po/aspoinquiry/loadpoquickview', { data: loadPoQuickViewCriteria, busy: true }, function (data) {
         if (data) {
            self.loadPoQuickViewResults = data.loadpoquickviewresults;
            self.loadPoQuickViewSingle = data.loadpoquickviewsingle;
         }
      });
   };

   self.initialize = function () {
      self.getHeaderAndLines();
   };

   self.buildContactsParamData = function () {
      var paramData = '';
      if (self.poDrillDown) {
         paramData = self.PARAM_PRIMARY_KEY_PURCHASE_ORDER + self.FIELD_KEY_DELIMITER +
            self.poDrillDown.pono.toString() + self.FIELD_SET_DELIMITER +
            self.PARAM_SECONDARY_KEY_PURCHASE_ORDER_SUFFIX + self.FIELD_KEY_DELIMITER +
            self.poDrillDown.posuf.toString();
      };
      return paramData;
   };

   //Only after the controls are initialized, can we set the key data to it so it can build out
   //the data in the Address Contact Controls.
   self.vendorContactsControlReady = function () {
      if (self.vendorContactsControl) {
         self.vendorContactsControl.initialize(self.buildContactsParamData());
      }
   };
   self.billToContactsControlReady = function () {
      if (self.billToContactsControl) {
         self.billToContactsControl.initialize(self.buildContactsParamData());
      }
   };
   self.shipFromContactsControlReady = function () {
      if (self.shipFromContactsControl) {
         self.shipFromContactsControl.initialize(self.buildContactsParamData());
      }
   };
   self.shipToContactsControlReady = function () {
      if (self.shipToContactsControl) {
         self.shipToContactsControl.initialize(self.buildContactsParamData());
      }
   };

   self.initialize();
});

//This controller is used when the user clicks "More Information" from a line in the Quick View Page.
//Alias: qvld
app.controller('PoQuickViewLineDetailsCtrl', function ($scope, $state, $stateParams, $translate, MessageService, DataService, Utils) {
   var self = this;
   self.poDrillDown = $stateParams.poDrillDown;
   self.loadPoQuickViewResult = $stateParams.loadPoQuickViewResult;
   self.loadPoQuickViewTiesResults = [];
   self.loadPoQuickViewTiesSingle = {};
   self.isInventoryHidden = true;
   self.DOCUMENT_DELIMITER = '-';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';

   self.back = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      var subTitle = MessageService.get('global.purchase.order.number') +
         self.LABEL_DELIMITER + self.poDrillDown.pono + self.DOCUMENT_DELIMITER + Utils.pad(self.poDrillDown.posuf, 2) +
         self.SUBMENU_DELIMITER + $translate.instant('global.line.number') + self.LABEL_DELIMITER + self.loadPoQuickViewResult.lineno;

      return subTitle;
   };

   self.initializeTies = function () {
      var loadPoQuickViewTiesCriteria = {
         pono: self.poDrillDown.pono,
         posuf: self.poDrillDown.posuf,
         lineno: self.loadPoQuickViewResult.lineno
      };

      DataService.post('api/po/aspoinquiry/loadpoquickviewties', { data: loadPoQuickViewTiesCriteria, busy: true }, function (data) {
         if (data) {
            self.loadPoQuickViewTiesResults = data.loadpoquickviewtiesresults;
            self.loadPoQuickViewTiesSingle = data.loadpoquickviewtiessingle;

            //Have a separate property so we don't have flash before initialized.
            self.isInventoryHidden = self.loadPoQuickViewTiesSingle.inventorytxthidden;
         }
      });
   };

   self.initializeTies();
});
