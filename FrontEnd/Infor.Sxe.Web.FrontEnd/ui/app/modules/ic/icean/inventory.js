'use strict';

app.controller('IceanInventoryCtrl', function ($scope, $stateParams, DataService, MessageService) {
   var self = this;

   self.isFirstLoad = true;
   self.iceanMaintMassUpdateSingle = {};

   self.iceanTransactionsResult = $stateParams.iceanTransactionsResult;
   self.operation = $stateParams.operation;
   self.iceanMaintMassUpdateSingle.icenhRowid = self.iceanTransactionsResult.icenhRowid;

   self.iceanMaintenanceMassUpdate = function () {
      DataService.post('api/ic/asicentry/iceanmaintenancemassupdate', { data: self.iceanMaintMassUpdateSingle, busy: true }, function (data) {
         self.iceanMaintMassUpdateSingle = data;
      });
   };

   self.iceanMaintenanceMassUpdate();

   self.productSelected = function () {
      if (!self.isFirstLoad && self.iceanMaintMassUpdateSingle.prod !== '') {
         self.iceanMaintMassUpdateSingle.icenhRowid = self.iceanTransactionsResult.icenhRowid;
         self.iceanMaintenanceMassUpdate();
      } else {
         self.isFirstLoad = false;
      }
   };

   self.statusChanged = function () {
      if (self.iceanMaintMassUpdateSingle.statustype !== '' && self.iceanMaintMassUpdateSingle.statustype === 's') {
         self.iceanMaintMassUpdateSingle.altprodgrpenabled = true;
      } else {
         self.iceanMaintMassUpdateSingle.altprodgrpenabled = false;
      }
   };

   self.submit = function () {
      var msg = self.isValidInventoryDefaults();
      if (msg !== '') {
         MessageService.info('global.validation.list', msg);
      } else {
         self.iceanMaintUpdateOperation =
         {
            invprod: self.iceanMaintMassUpdateSingle.prod,
            invacquiredt: self.iceanMaintMassUpdateSingle.acquiredt,
            invdescrip1: self.iceanMaintMassUpdateSingle.descrip1,
            invdescrip2: self.iceanMaintMassUpdateSingle.descrip2,
            invextdescrip: self.iceanMaintMassUpdateSingle.extdesc,
            invprodcat: self.iceanMaintMassUpdateSingle.prodcat,
            invprodline: self.iceanMaintMassUpdateSingle.prodline,
            invvendno: self.iceanMaintMassUpdateSingle.vendno,
            invstatus: self.iceanMaintMassUpdateSingle.statustype,
            invncnr: self.iceanMaintMassUpdateSingle.ncnr,
            invaltprodgrp: self.iceanMaintMassUpdateSingle.altprodgrp
         };

         var updateTrans = { icenhRowid: self.iceanTransactionsResult.icenhRowid };
         var checkRestrictionsRequest = { iceanmaintupdateoperation: self.iceanMaintUpdateOperation, iceanmaintupdatetrans: updateTrans };

         DataService.post('api/ic/asicentry/iceaninvcheckrestrictions', { data: checkRestrictionsRequest, busy: true }, function (data) {
            self.iceanMaintUpdateOperation = data;
            var callbackFn = $scope.mst[$stateParams.okCallback];
            callbackFn(self.iceanMaintUpdateOperation);
         });
      }
   };

   self.isValidInventoryDefaults = function () {
      var valMsg = '';
      if (self.iceanMaintMassUpdateSingle) {
         if (self.iceanMaintMassUpdateSingle.statustypeenabled && (self.iceanMaintMassUpdateSingle.statustype === '' || self.iceanMaintMassUpdateSingle.statustype === null)) {
            valMsg = valMsg + MessageService.get('message.status.is.required') + '<br />';
         }
         if (self.iceanMaintMassUpdateSingle.prodcatenabled && (self.iceanMaintMassUpdateSingle.prodcat === '' || self.iceanMaintMassUpdateSingle.prodcat === null)) {
            valMsg = valMsg + MessageService.get('message.product.category.is.required') + '<br />';
         }
         if (self.iceanMaintMassUpdateSingle.prodenabled && (self.iceanMaintMassUpdateSingle.prod === '' || self.iceanMaintMassUpdateSingle.prod === null)) {
            valMsg = valMsg + MessageService.get('message.product.is.required') + '<br />';
         }
         if (self.iceanMaintMassUpdateSingle.vendnoenabled && (self.iceanMaintMassUpdateSingle.vendno <= 0 || self.iceanMaintMassUpdateSingle.vendno === null)) {
            valMsg = valMsg + MessageService.get('message.vendor.is.required') + '<br />';
         }
         if (self.iceanMaintMassUpdateSingle.prodlineenabled && (self.iceanMaintMassUpdateSingle.prodline === '' || self.iceanMaintMassUpdateSingle.prodline === null)) {
            valMsg = valMsg + MessageService.get('message.product.line.is.a.required.field');
         }
      }
      return valMsg;
   };

   self.cancel = function () {
      var callbackFn = $scope.mst[$stateParams.cancelCallback];
      callbackFn();
   };
});