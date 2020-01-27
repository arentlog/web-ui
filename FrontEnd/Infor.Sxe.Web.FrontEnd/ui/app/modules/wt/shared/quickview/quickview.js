'use strict';

app.controller('WtQuickViewCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService, Utils) {
   var self = this;
   self.wtno = $stateParams.wtno;
   self.wtsuf = $stateParams.wtsuf;
   self.cono = $stateParams.cono;
   self.cono2 = $stateParams.cono2;
   self.prevState = $stateParams.prevState;
   self.subTitle = $translate.instant('global.warehouse.transfer.number') + ":" + self.wtno + '-' + Utils.pad(self.wtsuf, 2);
   self.FIELD_KEY_DELIMITER = ' = ';
   self.FIELD_SET_DELIMITER = ' | ';
   self.PARAM_TABLE_NAME_WTEH = 'wteh';
   self.PARAM_PRIMARY_KEY_COMPANY = 'cono';
   self.PARAM_PRIMARY_KEY_TRANSFER_ORDER = 'wtno';
   self.PARAM_SECONDARY_KEY_TRANSFER_ORDER_SUFFIX = 'wtsuf';

   self.loadwtquickviewsingle = {
      isLate: false,
      isReceiving: false,
      custholdtxt: ''
   };

   self.getTiedOrderNumber = function () {
      if (self.loadwtquickviewsingle) {
         return self.loadwtquickviewsingle.orderaltno + '-' + Utils.pad(self.loadwtquickviewsingle.orderaltsuf, 2);
      } else {
         return '';
      }
   };

   //Only after the controls are initialized, can we set the key data to it so it can build out
   //the data in the Address Contact Controls.
   self.fromCompanyContactsControlReady = function () {
      if (self.fromCompanyContactsControl) {
         self.fromCompanyContactsControl.initialize(self.PARAM_PRIMARY_KEY_COMPANY + self.FIELD_KEY_DELIMITER + self.cono.toString());
      }
   };

   self.toCompanyContactsControlReady = function () {
      if (self.toCompanyContactsControl) {
         self.toCompanyContactsControl.initialize(self.PARAM_PRIMARY_KEY_COMPANY + self.FIELD_KEY_DELIMITER + self.cono2.toString());
      }
   };

   self.shipFromContactsControlReady = function () {
      if (self.shipFromContactsControl) {
         self.shipFromContactsControl.initialize(self.PARAM_PRIMARY_KEY_TRANSFER_ORDER + self.FIELD_KEY_DELIMITER + self.wtno.toString() + self.FIELD_SET_DELIMITER +
                     self.PARAM_SECONDARY_KEY_TRANSFER_ORDER_SUFFIX + self.FIELD_KEY_DELIMITER + self.wtsuf.toString());
      }
   };

   self.shipToContactsControlReady = function () {
      if (self.shipToContactsControl) {
         self.shipToContactsControl.initialize(self.PARAM_PRIMARY_KEY_TRANSFER_ORDER + self.FIELD_KEY_DELIMITER + self.wtno.toString() + self.FIELD_SET_DELIMITER +
                     self.PARAM_SECONDARY_KEY_TRANSFER_ORDER_SUFFIX + self.FIELD_KEY_DELIMITER + self.wtsuf.toString());
      }
   };

   self.navBack = function () {
      $state.go(self.prevState, { wtno: (self.wtno + '-' + Utils.pad(self.wtsuf, 2)) });
   };

   self.getHeaderAndLines = function () {
      DataService.post('api/wt/aswtinquiry/loadwtquickview', { data: { wtno: self.wtno, wtsuf: self.wtsuf }, busy: true }, function (data) {
         if (data) {
            self.loadwtquickviewresults = data.loadwtquickviewresults;
            self.loadwtquickviewsingle = data.loadwtquickviewsingle;
         }
      });
   };

   self.initialize = function () {
      self.getHeaderAndLines();
   };

   self.initialize();
});

app.controller('WtQuickViewTiesCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var quickview = $scope.quickview;
   self.wtno = $stateParams.wtehRecord ? $stateParams.wtehRecord.wtno : $stateParams.wtno;
   self.wtsuf = $stateParams.wtehRecord ? $stateParams.wtehRecord.wtsuf : $stateParams.wtsuf;

   self.init = function () {
      DataService.post('api/wt/aswtinquiry/loadwtquickviewties', { data: { wtno: self.wtno, wtsuf: self.wtsuf, lineno: quickview.rowParams.item.lineno }, busy: true }, function (data) {
         if (data) {
            self.loadwtquickviewtiesresults = data.loadwtquickviewtiesresults;
            self.loadwtquickviewtiessingle = data.loadwtquickviewtiessingle;
         }
      });
   };

   self.init();

});