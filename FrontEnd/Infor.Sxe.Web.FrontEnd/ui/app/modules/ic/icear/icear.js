'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icear', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icear');
});

app.controller('IcearBaseCtrl', function ($state, DataService, SecurityService) {
   var self = this;
   self.criteria = {};
   self.criteria.usestockuom = 'true';
   self.securityLevel = SecurityService.getSecurityLevel('icear');
   self.kpewSecurityLevel = SecurityService.getSecurityLevel('kpew');
   self.oeetSecurityLevel = SecurityService.getSecurityLevel('oeet');
   self.wtetSecurityLevel = SecurityService.getSecurityLevel('wtet');
   self.isUpdateSecure = self.securityLevel >= 3 ? true : false;

   self.isMaster = function () {
      return $state.is('icear.master');
   };

   self.includesMaster = function () {
      return $state.includes('icear.master');
   };

   self.search = function () {
      DataService.post('api/ic/asicentry/icearbuildlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.icearbuildlistresults;
         }
      });
   };
});

app.controller('IcearSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.usestockuom = 'true';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icear.master');
      }

      base.search();
   };

   self.productSelected = function () {
      var params = {
         prod: criteria.prod,
         whse: criteria.whse
      };

      DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            base.criteria.qtyonhand = data.qtyonhand;
         }
      });
   };
});

app.controller('IcearMasterCtrl', function ($scope, $state,  $translate, MessageService, AuthService, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var icearUpdateList = [];

   self.isUpdateAllowed = function () {
      return base.isUpdateSecure;
   };

   self.orderNumberClicked = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         switch (currentRow.orderty.toUpperCase()) { //ignore jslint - correct indentation
            case $translate.instant('global.oe'): //ignore jslint - correct indentation
               $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.wt'): //ignore jslint - correct indentation
               $state.go('wtit.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.po'): //ignore jslint - correct indentation
               $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.kp'): //ignore jslint - correct indentation
               $state.go('kpiw.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.va'): //ignore jslint - correct indentation
               $state.go('vaif.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };

   self.quantityShippedChanged = function (e, args) {
      var record = base.dataset[args.row];
      var icearrowcriteria = {
         kpewsecure: base.kpewSecurityLevel,
         oeetsecure: base.oeetSecurityLevel,
         wtetsecure: base.wtetSecurityLevel
      };
      var entryParams = { icearrowcriteria: icearrowcriteria, icearsingle: record };

      //Before we apply the row leave we need to check the row entry validation.  SoHo does not provide a row entry trigger point
      //so here we check if the value can be changed first and revert back the change with error if row entry is not allowed.
      DataService.post('api/ic/asicentry/icearrowentry', { data: entryParams, busy: true },
         function (data) {
            if (data) {
               if (data.qtyshipupdatefl) {
                  var leaveParams = { icearbuildlistcriteria: base.criteria, icearsingle: record };

                  //OK to change quantity - Fire the row leave call
                  DataService.post('api/ic/asicentry/icearrowleave', { data: leaveParams, busy: true },
                     function (resp) {
                        if (resp) {
                           // Display any warning message
                           if (resp.cWarningMessage) {
                              MessageService.info('global.alert', resp.cWarningMessage);
                           }

                           base.criteria = resp.icearbuildlistcriteria;
                           resp.icearsingle.balance = record.balance;
                           Utils.replaceObject(record, resp.icearsingle);
                           base.grid.updateRow(args.row);
                        } else {
                           record.qtyshpdisp = args.oldValue;
                           base.grid.updateRow(args.row);
                        }
                     },
                     // Error returned in cErrorMessage - back out change
                     function () {
                        record.qtyshpdisp = args.oldValue;
                        base.grid.updateRow(args.row);
                     });

               } else {
                  record.qtyshpdisp = args.oldValue;
                  base.grid.updateRow(args.row);
                  MessageService.info('global.information', 'error.cannot.change.the.quantity.shipped.for.this.record');
               }
            }
         },
         // Error returned in cErrorMessage - back out change
         function () {
            record.qtyshpdisp = args.oldValue;
            base.grid.updateRow(args.row);
         });
   };

   self.finalUpdate = function () {
      icearUpdateList = [];
      base.dataset.forEach(function (record) {
         if (record.lchangefl) {
            icearUpdateList.push(record);
         }
      });

      if (icearUpdateList.length > 0) {
         if (base.criteria.calcendqty < 0) {
            MessageService.okCancel('global.an.alert.occurred', 'question.exceptions.season.demand.trending.min.max.perc',
                 function () {
                    //Ok
                    updateList(); //ignore jslint - correct indentation
                 }, //ignore jslint - correct indentation
                 function () {
                    //Cancel
                 }); //ignore jslint - correct indentation
         }
         else {
            var record = { icearupdate: icearUpdateList, icearbuildlistcriteria: base.criteria };

            DataService.post('api/ic/asicentry/icearreviewbalance', { data: record, busy: true }, function (data) {
               if (data) {
                  MessageService.okCancel('global.an.alert.occurred', 'question.inventory.balance.goes.negative.at.a.pointintime',
                     function () {
                        //Ok
                        updateList(); //ignore jslint - correct indentation
                     },
                     function () {
                        //Cancel
                     }); //ignore jslint - correct indentation
               }
               else {
                  updateList();
               }
            });
         }
      }
   };

   function updateList() {
      var record = { icearupdate: icearUpdateList, icearbuildlistcriteria: base.criteria };

      DataService.post('api/ic/asicentry/icearupdate', { data: record, busy: true }, function (data) {
         if (data) {
            if (data.messaging && data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               icearUpdateList = [];
               base.dataset = [];
            }
         }
      });
   }

   self.transTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toString().toUpperCase()) { //ignore jslint - correct indentation
            case 'PO': //ignore jslint - correct indentation
               return $translate.instant('global.purchase.order'); //ignore jslint - correct indentation
            case 'RM':  //ignore jslint - correct indentation
               return $translate.instant('global.return.merchandise'); //ignore jslint - correct indentation
            case 'DO':  //ignore jslint - correct indentation
               return $translate.instant('global.direct.order'); //ignore jslint - correct indentation
            case 'QU':  //ignore jslint - correct indentation
               return $translate.instant('global.quote.order'); //ignore jslint - correct indentation
            case 'BL':  //ignore jslint - correct indentation
               return $translate.instant('global.blanket.order'); //ignore jslint - correct indentation
            case 'BR':  //ignore jslint - correct indentation
               return $translate.instant('global.blanket.release'); //ignore jslint - correct indentation
            case 'AC':  //ignore jslint - correct indentation
               return $translate.instant('global.accumulative'); //ignore jslint - correct indentation
            case 'WT':  //ignore jslint - correct indentation
               return $translate.instant('global.warehouse.transfer'); //ignore jslint - correct indentation
            case 'SP':  //ignore jslint - correct indentation
               return $translate.instant('global.special.order'); //ignore jslint - correct indentation
            case 'VA':  //ignore jslint - correct indentation
               return $translate.instant('global.value.add'); //ignore jslint - correct indentation
            case 'SO':  //ignore jslint - correct indentation
               return $translate.instant('global.stock.order'); //ignore jslint - correct indentation
            case 'CS':  //ignore jslint - correct indentation
               return $translate.instant('global.counter.sale'); //ignore jslint - correct indentation
            case 'FO':  //ignore jslint - correct indentation
               return $translate.instant('global.future.order'); //ignore jslint - correct indentation
            case 'ST':  //ignore jslint - correct indentation
               return $translate.instant('global.standing.order'); //ignore jslint - correct indentation
            case 'CR':  //ignore jslint - correct indentation
               return $translate.instant('global.correction'); //ignore jslint - correct indentation
            case 'WO':  //ignore jslint - correct indentation
               return $translate.instant('global.work.order'); //ignore jslint - correct indentation
            case 'SP':  //ignore jslint - correct indentation
               return $translate.instant('global.specifications.instructions'); //ignore jslint - correct indentation
            case 'IN':  //ignore jslint - correct indentation
               return $translate.instant('global.inventory.component'); //ignore jslint - correct indentation
            case 'EX':  //ignore jslint - correct indentation
               return $translate.instant('global.external.process'); //ignore jslint - correct indentation
            case 'IT':  //ignore jslint - correct indentation
               return $translate.instant('global.internal.process'); //ignore jslint - correct indentation
            case 'IS':  //ignore jslint - correct indentation
               return $translate.instant('global.inspection'); //ignore jslint - correct indentation
            case 'II':  //ignore jslint - correct indentation
               return $translate.instant('global.inventory.in'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      }
      else {
         return value;
      }
   };

   self.stageFormatter = function (row, cell, value) {
      if (value) {
         switch (value) { //ignore jslint - correct indentation
            case 'Ack':  //ignore jslint - correct indentation
               return $translate.instant('global.acknowledged'); //ignore jslint - correct indentation
            case 'Blt':  //ignore jslint - correct indentation
               return $translate.instant('global.built'); //ignore jslint - correct indentation
            case 'Can':  //ignore jslint - correct indentation
               return $translate.instant('global.cancelled'); //ignore jslint - correct indentation
            case 'Cst':  //ignore jslint - correct indentation
               return $translate.instant('global.costed'); //ignore jslint - correct indentation
            case 'Cls':  //ignore jslint - correct indentation
               return $translate.instant('global.closed'); //ignore jslint - correct indentation
            case 'Ent':  //ignore jslint - correct indentation
               return $translate.instant('global.entered'); //ignore jslint - correct indentation
            case 'Exp':  //ignore jslint - correct indentation
               return $translate.instant('global.exception'); //ignore jslint - correct indentation
            case 'Inv':  //ignore jslint - correct indentation
               return $translate.instant('global.invoiced'); //ignore jslint - correct indentation
            case 'Ord':  //ignore jslint - correct indentation
               return $translate.instant('global.ordered'); //ignore jslint - correct indentation
            case 'Pck':  //ignore jslint - correct indentation
               return $translate.instant('global.picked'); //ignore jslint - correct indentation
            case 'Pd':  //ignore jslint - correct indentation
               return $translate.instant('global.paid'); //ignore jslint - correct indentation
            case 'Pre':  //ignore jslint - correct indentation
               return $translate.instant('global.pre.received'); //ignore jslint - correct indentation
            case 'Prt':  //ignore jslint - correct indentation
               return $translate.instant('global.printed'); //ignore jslint - correct indentation
            case 'Req':  //ignore jslint - correct indentation
               return $translate.instant('global.requested'); //ignore jslint - correct indentation
            case 'Rcv':  //ignore jslint - correct indentation
               return $translate.instant('global.received'); //ignore jslint - correct indentation
            case 'Shp':  //ignore jslint - correct indentation
               return $translate.instant('global.shipped'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      }
      else {
         return value;
      }
   };
});