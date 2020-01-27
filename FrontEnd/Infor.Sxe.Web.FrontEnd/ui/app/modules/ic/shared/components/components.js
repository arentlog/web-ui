'use-strict';
/**
 * Control for displaying IC Components data.  Used in ICIA, ICIP Components tabs.
 * Alias: cmp
 */
app.controller('IcComponentsCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, Sasoo) {
   var self = this;
   var base = $scope.base;
   self.vaspHeaderVersionNo = 0;
   self.isVATypeProduct = false;
   self.buildCompTTCriteria = { whse: base.whse, prod: base.prod, qty: 1, expgrpoptfl: true };
   self.canSeeCost = function () {
      return Sasoo.seecostfl;
   };

   self.getComponents = function () {
      if (self.isVATypeProduct) {
         // create function
         var vaspRecord = {
            whse: self.buildCompTTCriteria.whse,
            shipprod: self.buildCompTTCriteria.prod,
            version: self.vaspHeaderVersionNo,
            qtyord: self.buildCompTTCriteria.qty,
            unit: self.buildCompTTCriteria.unit
         };
         DataService.post('api/va/asvasetup/vaspheadercompload', { data: vaspRecord, busy: true }, function (data) {
            if (data) {
               if (self.buildCompTTCriteria.shortonlyfl) {
                  self.vaHeaderAllComponents = [];
                  data.forEach(function (record) {
                     if (record.qtyshort < 0) {
                        self.vaHeaderAllComponents.push(record);
                     }
                  });
               } else {
                  self.vaHeaderAllComponents = data;
               }
            }
         });
      } else {
         DataService.post('api/ic/asicwhseprod/buildcomponenttemptable', { data: self.buildCompTTCriteria, busy: true }, function (data) {
            if (data.buildcompttresults) {
               self.componentResults = data.buildcompttresults;
               self.buildcompttsingle = data.buildcompttsingle;
               if (!self.isKitTypeProduct) {
                  self.buildcompttsingle.qtyavail = 0;
               }
            }
         });
      }
   };

   self.validateProduct = function () {
      self.isVATypeProduct = false;
      self.isKitTypeProduct = false;
      var params = {
         prod: base.prod,
         fldlist: 'kittype'
      };
      DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.isKitTypeProduct = data.kittype === '' ? false : true;
            if (!self.isKitTypeProduct) {
               var vaspheaderlistcriteria = { whse: self.buildCompTTCriteria.whse, prod: self.buildCompTTCriteria.prod, verno: 0 };
               DataService.post('api/va/asvasetup/vaspheaderlookup', { data: vaspheaderlistcriteria, busy: true }, function (data) {
                  if (data.vaspheaderlistresults && data.vaspheaderlistresults.length) {
                     var maxVersionNo = JSLINQ(data.vaspheaderlistresults).OrderByDescending(function (max) {
                        return max.verno;
                     }).FirstOrDefault(function (ver) {
                        return ver.verno;
                     });
                     self.vaspHeaderVersionNo = maxVersionNo.verno;
                     if (maxVersionNo) {
                        //by default no unit for vasp search
                        self.buildCompTTCriteria.unit = '';
                        self.isVATypeProduct = true;
                        self.getComponents();
                     } else {
                        self.showWarningMessage();
                     }
                  } else {
                     self.showWarningMessage();
                  }
               });
            } else {
               self.getComponents();
            }
         }
      });
   };

   self.showWarningMessage = function () {
      MessageService.info('global.error', 'message.product.not.setup.as.a.kit.in.icsp.or.a.va.in.vasp');
   };

   if (base.prod && base.whse) {
      self.validateProduct();
   }

   self.componentsFilter = function () {
      if (base.prod && base.whse) {
         self.getComponents();
      }
   };
});