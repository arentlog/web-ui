'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('ic', 'icew', {
      widgets: ['JOURNAL']
   });
   StateProvider.addMasterState('ic', 'icew');

   $stateProvider.state('icew.master.serial', {
      url: '/serial',
      params: { icew: null, icspecrecno: null },
      views: {
         serialChild: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icew/serials.json');
            },
            controller: 'IcewSerialCtrl as sl'
         }
      }
   });

   $stateProvider.state('icew.master.lot', {
      url: '/lot',
      params: { icew: null, icspecrecno: null },
      views: {
         lotChild: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icew/lots.json');
            },
            controller: 'IcewLotCtrl as lt'
         }
      }
   });

});

app.controller('IcewBaseCtrl', function ($state, DataService, Utils) {
   var self = this;
   self.dataset = [];
   self.icew = {
      stkqtyship: 1,
      gPostdt: Utils.getCurrentDate()
   };
   self.prodInfo = {};
   self.productType = '';
   self.icsw = {};
   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'icew',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ic',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('icew.master');
   };

   self.includesMaster = function () {
      return $state.includes('icew.master');
   };

});

app.controller('IcewMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, AodataService) {
   var self = this;
   var base = $scope.base;

   self.isWtNonDo = AodataService.getValue('IC', 'ICReqWTSerialFl').toUpperCase();

   if (base.icew) {
      self.icew = base.icew;
      self.prodInfo = base.prodInfo;
      self.productType = base.productType;
      self.icsw = base.icsw;
   }

   // Clear form
   self.clear = function () {
      // Reset Defaults
      self.prodInfo = {};
      self.icsw = {};
      self.icew = {
         stkqtyship: 1,
         gPostdt: Utils.getCurrentDate(),
         ordersuf: 99
      };
   };

   self.updateIcew = function() {
      DataService.post('api/ic/asicentry/icewupdate', { data: self.icew, busy: true }, function (data) {
         if (data.messaging && data.messaging.length > 0) {

            data.messaging.forEach(function (mess) {
               if (mess.messagetype === 'e' && mess.messagetxt && mess.messagenum === 8615) {
                  self.icew = data.icewupdate;
                  base.dataset.push(data.icewupdate);
                  self.clear();
                  MessageService.okCancel('global.error', mess.messagetxt, function () {
                  }, function () {
                  });
               }
               else {
                  MessageService.okCancel('global.error', mess.messagetxt);
               }
            });
         }
         else {
            self.icew = data.icewupdate;
            base.dataset.push(data.icewupdate);
            self.clear();
         }
      });
   }

   if ($stateParams.refreshSearch) {
      self.updateIcew();
   }

   self.submit = function () {

      // If no open journal, first direct user to open a journal, then proceed with submit
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            self.submit();
         });
      } else {
         // Make sure we have the current jorunal number before making the checkserlot call
         self.icew.jrnlno = base.journal.gJrnlno;
         // TODO: Review SI

         DataService.post('api/ic/asicentry/icewcheckserlot', { data: self.icew, busy: true }, function (data) {
            if (data.messaging && data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            } else {
               self.icew = data.icewupdate;
               base.icew = self.icew;
               // if Lot
               if (self.icew.serlottype.toLowerCase() === 'l') {
                  getProductInfo(self.icew.serlottype);
               } else {
                  if (self.icew.launchfl || self.isWtNonDo === 'YES') {
                     // if true, check serial lot type for 's'
                     if (self.icew.serlottype.toLowerCase() === 's') {
                        getProductInfo(self.icew.serlottype);
                     } else {
                        self.updateIcew();
                     }
                  } else {
                     self.updateIcew();
                  }
               }
            }
         });
      }
   };

   self.resetExtraIcewFields = function() {
      self.icew.ordersuf = 99;
   }

   function getProductInfo(serlotType) {
      var params = {
         prod: self.icew.prod
      };
      var productRecNo = '';
      DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            if (data.icsses.length > 0) {
               var prod = data.icsses[0];
               // set local
               productRecNo = prod.icspecrecno;
            }
            if (serlotType.toLowerCase() === 's') {
               $state.go('.serial', { icew: self.icew, icspecrecno: productRecNo });
            } else if (serlotType.toLowerCase() === 'l') {
               $state.go('.lot', { icew: self.icew, icspecrecno: productRecNo });
            }
         }
      });
   }

   self.onProdChanged = function (dataIn) {
      if (dataIn) {
         var params = {
            prod: dataIn.value,
            whse: self.icew.fromwhse
         };
         self.prodInfo = {};
         DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.icsw = data;
               base.icsw = self.icsw;
               self.resetExtraIcewFields();
               self.prodInfo.netAvail = data.qtyonhand - data.qtyreservd - data.qtycommit;
               self.productType = data.serlottype.toLowerCase() === 's' ? MessageService.get("global.serial.product") : '';
               base.prodInfo.netAvail = self.prodInfo.netAvail;
               base.productType = self.productType;

               // Get Unit
               var params = { prod: self.icsw.prod };
               DataService.get('api/ic/icsp/getbypk', { params: params }, function (data) {
                  if (data) {
                     self.prodInfo.unit = data.unitstock ? data.unitstock : '';
                     base.prodInfo.unit = self.prodInfo.unit;
                  }
               });

            }
         });
      }
   };
});

app.controller('IcewSerialCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var mst = $scope.mst;

   self.createIcEntrySerialsCriteria = function () {
      var criteria = {
         whse: $stateParams.icew.fromwhse,
         prod: $stateParams.icew.prod,
         type: 'ic',
         orderno: $stateParams.icew.orderno,
         ordersuf: 99,
         lineno: 0,
         linenochar: '',
         seqno: 0,
         inquiryfl: false,
         actionty: '',
         returnfl: false,
         origqty: $stateParams.icew.stkqtyship,
         proofqty: $stateParams.icew.stkqtyship,
         ordqty: 0,
         outqty: $stateParams.icew.stkqtyship,
         ictype: 'in',
         cost: 0,
         qtyunavail: $stateParams.icew.unavailfl ? $stateParams.icew.stkqtyship : 0,
         method: 's',
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: '',
         reasunavty: $stateParams.icew.unavailfl ? $stateParams.icew.reasunavty : '',
         custno: 0,
         shipto: '',
         vendno: 0,
         wono: 0,
         wosuf: 0,
         cono2: 0,
         shipfmwhse: '',
         shiptowhse: '',
         jrnlno: $stateParams.icew.jrnlno,
         postdt: $stateParams.icew.gPostdt,
         ourproc: 'icew',
         icspecrecno: $stateParams.icew.productRecNo,
         assignoldest: false,
         currproc: 'icew',
         seqdash: '',
         rettext: '',
         kplabel: '',
         wonosuf: '',
         origqtylabel: '',
         proddesc: $stateParams.icew.icspproddesc,
         prodnotesfl: "no",
         frametitle: '',
         btnoldesthidden: false,
         btnoldestenabled: false,
         btncreateenabled: false,
         selectfieldhidden: false
      };
      return criteria;
   };

   self.serialControlReady = function () {
      // format and add nesseccary criteria to object
      self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria();

      var criteria = {
         icentryserialslist: [],
         icentryserialscriteria: self.icEntrySerialsCriteria
      };

      // Call initialize method on the Shared-Serials-Ctrl
      self.serialsControl.initialize(criteria);
   };

   self.navBack = function () {
      $state.go('^');
   };

   self.serialDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      if (adjustQtyFl) {
         mst.icew.stkqtyship = adjustQtyShip;
      }
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      mst.updateIcew();
   };
});

app.controller('IcewLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var mst = $scope.mst;

   self.createIcEntryLotsCriteria = function () {     
      var criteria = {
         whse: $stateParams.icew.fromwhse,
         prod: $stateParams.icew.prod,
         type: 'ic',
         orderno: $stateParams.icew.orderno,
         ordersuf: $stateParams.icew.ordersuf,
         lineno: 0,
         linenochar: '',
         seqno: 0,
         inquiryfl: false,
         actionty: '',
         returnfl: false,
         origqty: $stateParams.icew.stkqtyship,
         proofqty: $stateParams.icew.stkqtyship,
         ordqty: 0,
         outqty: $stateParams.icew.stkqtyship,
         ictype: 'in',
         cost: 0,
         qtyunavail: $stateParams.icew.unavailfl ? $stateParams.icew.stkqtyship : 0,
         method: 's',
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: '',
         reasunavty: $stateParams.icew.unavailfl ? $stateParams.icew.reasunavty : '',
         custno: 0,
         shipto: '',
         vendno: 0,
         wono: 0,
         wosuf: 0,
         cono2: 0,
         shipfmwhse: '',
         shiptowhse: '',
         jrnlno: $stateParams.icew.jrnlno,
         ourproc: 'icew',
         icspecrecno: $stateParams.icew.productRecNo,
         assignoldest: 'n',
         currproc: 'icew',
         seqdash: '',
         rettext: '',
         kplabel: '',
         wonosuf: '',
         origqtylabel: '',
         proddesc: $stateParams.icew.icspproddesc,
         prodnotesfl: "no",
         frametitle: '',
         btnoldesthidden: false,
         btnoldestenabled: false,
         btncreateenabled: false
      };
      return criteria;
   };

   self.lotEntryNextLineNo = function () {     
      var criteria = {
         fromwhse: $stateParams.icew.fromwhse,
         prod: $stateParams.icew.prod
      };
      var crit = {
         ttblicewupdate: criteria
      };
      DataService.post('/web/api/ic/icewgetnextlotlineno', { data: crit, busy: true }, function (data) {
         if (data) {
            if (data.ttblicewupdate) {
               mst.icew.lineno = data.ttblicewupdate.lineno;
               if (self.icEntryLotsCriteria) {
                  self.icEntryLotsCriteria.lineno = data.ttblicewupdate.lineno;
                  self.lotsControl.initialize(self.icEntryLotsCriteria);
               }
            }
         }
      });    
   };

   self.lotControlReady = function () {
      self.icEntryLotsCriteria = self.createIcEntryLotsCriteria();
      self.lotEntryNextLineNo();

      //var criteria = {
      //   icentrylotslist: [],
      //   icentrylotscriteria: self.icEntryLotsCriteria
      //};

      // Call initialize method on the Shared-Lots-Ctrl
      self.lotsControl.initialize(self.icEntryLotsCriteria);
   };

   self.navBack = function () {
      $state.go('^');
   };

   self.lotDoneCallback = function () {
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      mst.updateIcew();
   };
});
