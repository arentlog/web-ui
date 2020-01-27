'use strict';

app.controller('OrderFulfillmentCtrl', function ($scope, $state, $stateParams, $translate, AodataService, Constants, DataService, MessageService, ModalService, GridService, Utils) {
   // alias => oful
   var self = this;
   var base = $scope.base;
   self.oelines = [];
   var oeData = {};

   self.isFulfillmentBillingOn = AodataService.getValue("OE", "OEFulfillmentBilling").toLowerCase() === 'yes';

   self.ofAddWarehouseModal = null;
   self.ofOverrideRuleModal = null;
   self.ofSubmitListModal = null;
   self.overrideRuleList = [];

   // Initially Load Values from Calling Program
   self.orderno = $stateParams.ofOrderNo;
   self.ordersuf = $stateParams.ofOrderSuf;
   self.lineno = $stateParams.ofLineNo;
   self.functionname = $stateParams.ofFunctionName;
   self.submitenabled = false;
   self.chgqtyenabled = false;
   self.repricefl = true;
   self.nspricefl = true;
   self.resetaddonfl = true;
   self.recalccostfl = true;

   if (!self.lineno) {
      self.lineno = '0';
   }

   if (self.orderno) {
      self.ordernumber = self.orderno + '-' + Utils.pad(self.ordersuf, 2);
   }

   // OEET Header Access - taken back to 'Create' screen like all other
   // header level access screens - receive on account, WT Billing, Customer PO, etc
   self.navBack = '^.';
   if (self.functionname.toLowerCase() === 'oeet-hdr') {
      self.navBack = '^.initiate';
   }

   // Parse out the order number
   self.loadOrderNo = function () {

      if (self.ordernumber) {
         var orderParts = self.ordernumber.split('-');
         if (orderParts.length === 2) {
            self.orderno = orderParts[0];
            self.ordersuf = orderParts[1];
            var orderNo = orderParts[0];
            if (!orderNo) {
               self.orderno = 0;
               self.ordersuf = 0;
            }
         }
      } else {
         self.orderno = 0;
         self.ordersuf = 0;
      }
   };

   // Load Line (lineNo loaded) or fill Order Data (lineNo is 0)
   self.loadRecords = function () {
      var overrideRuleArray = [];
      var dropDownLabel;
      var ruleType;

      self.loadOrderNo();

      var orderFulfillmentData = {
         functionname: $stateParams.ofFunctionName,
         orderno: self.orderno,
         ordersuf: self.ordersuf,
         lineno: self.lineno
      };

      DataService.post('api/oe/asoeentry/oefulfillmentload', { data: orderFulfillmentData, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {

               // Criteria/Banner level data
               self.totqtyord = data.oefulfillmentcriteria.totqtyord;
               self.totqtyship = data.oefulfillmentcriteria.totqtyship;
               self.whse = data.oefulfillmentcriteria.whse;
               self.unit = data.oefulfillmentcriteria.unit;
               self.shipprod = data.oefulfillmentcriteria.shipprod;
               self.fulfillmentbillcd = data.oefulfillmentcriteria.fulfillmentbillcd;
               self.fulfillmentstgcd = data.oefulfillmentcriteria.fulfillmentstgcd;
               self.origruleused = data.oefulfillmentcriteria.origruleused;
               self.submitenabled = data.oefulfillmentcriteria.submitenabled;
               self.chgqtyenabled = data.oefulfillmentcriteria.chgqtyenabled;
               self.shortstockfl = data.oefulfillmentcriteria.shortstockfl;

               // Grid/Line Data
               self.oelines = data.oefulfillmentresults;
               self.overrideRuleList = [];

               // Only Allow Add Whse once the Load is successful
               if (!self.lineno || self.lineno === '0') {
                  self.totalOrdLabel = MessageService.get('global.stock.quantity.ordered');
               } else {
                  self.totalOrdLabel = MessageService.get('global.total.ordered');
               }

               // Parse out the comma delimited field value for the drop down rules list
               overrideRuleArray = data.oefulfillmentcriteria.overruleused.split(',');
               self.overruleused = '';

               // Build the Drop Down data
               for (var i = 0; i <= overrideRuleArray.length; i++) {

                  ruleType = overrideRuleArray[i];

                  if (ruleType) {
                     switch (ruleType.toUpperCase()) {
                        case 'BLANK':                                                              //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.blank');                     //ignore jslint - correct indentation
                           ruleType = '';                                                          //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                        case 'PW':                                                                 //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.preferred.warehouse.list');  //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                        case 'MI':                                                                 //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.most.available.inventory');  //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                        case 'QD':                                                                 //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.quickest.delivery.date');    //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                        case 'GR':                                                                 //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.group.by.region');           //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                        case 'ML':                                                                 //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.max.number.lines.filled.complete');  //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                        default:                                                                   //ignore jslint - correct indentation
                           dropDownLabel = MessageService.get('global.invalid');                   //ignore jslint - correct indentation
                           break;                                                                  //ignore jslint - correct indentation
                     }

                     self.overrideRuleList.push({ value: ruleType, label: dropDownLabel });

                  }
               }
            }
          }
      });
   };

   // If the Order is pre-loaded, run the initial 'Search'
   if (self.ordernumber !== '') {
      self.loadRecords();
   }

   self.getSubTitle = function () {
      if (!self.lineno || self.lineno === '0') {
         return MessageService.get('global.sales.order.fulfillment');
      } else {
         return MessageService.get('global.line.fulfillment');
      }
   };

   // Back Arrow - Nothing Updates
   self.back = function () {
      $state.go(self.navBack);
   };

   // Edit/Commit the Changes
   self.save = function () {

      var oeFulfillmentCriteria = {};
      var oeFulfillmentResults = [];
      self.loadOrderNo();

      oeFulfillmentCriteria = {
         orderno: self.orderno,
         ordersuf: self.ordersuf,
         lineno: self.lineno,
         unit: '',
         overruleused: ''
      };

      oeFulfillmentResults = self.oelines;

      oeData = {
         oefulfillmentcriteria: oeFulfillmentCriteria,
         oefulfillmentresults: oeFulfillmentResults
      };

      DataService.post('api/oe/asoeentry/oefulfillmentsave', {data: oeData, busy: true}, function (data) {
         if (data) {

            self.shortstockfl = data.oefulfillmentcriteria.shortstockfl;

            if (!MessageService.processMessaging(data.messaging)) {

               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               // Close out of the Whse List screen
               self.back();
            }
         }
      });
   };

   self.search = function () {
      self.loadRecords();
   };

   self.navigateToIcia = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: '' }, { reload: 'icia.detail' });
      }
   };

   self.addWarehouse = function () {
      ModalService.showModal('shared/order-fulfillment/add-whse.json', 'ofAddWarehouseCtrl as awtl', $scope, function (modal) {
         self.ofAddWarehouseModal = modal;
      });
   };

   self.overrideRule = function () {
      ModalService.showModal('shared/order-fulfillment/override-rule.json', 'ofOverrideRuleCtrl as orul', $scope, function (modal) {
         self.ofOverrideRuleModal = modal;
      });
   };

   self.submitList = function () {
      ModalService.showModal('shared/order-fulfillment/submit-list.json', 'ofSubmitListCtrl as slst', $scope, function (modal) {
         self.ofSubmitListModal = modal;
      });
   };

   self.selectedFlagChange = function (e, args) {

      var record = self.oelines[args.row];
      var shortStockFl = false;

      if (record) {

         if (record.selectedfl) {

            // Load the Full Qty Ord as a Default if Qty Allocated is Zero
            if (record.sourcedqty <= 0) {
               record.sourcedqty = record.qtyord;
            }

            if (record.netavail <= 0 || record.sourcedqty > record.netavail) {
               shortStockFl = true;
            }
         }

         if (record && !record.selectedfl) {
            record.sourcedqty = '0';
         }

         // Update row
         self.oelines[args.row].sourcedqty = record.sourcedqty;
         self.oelines[args.row].shortstockfl = shortStockFl;
         self.grid.updateRow(args.row);

         // Update Banner
         self.resetBannerFields();
      }
   };

   self.sourcedQtyChange = function (e, args) {

      var record = self.oelines[args.row];
      var shortStockFl = false;

      if (record) {

         if (record.selectedfl &&
            (record.netavail <= 0 || record.sourcedqty > record.netavail)) {
            shortStockFl = true;
         }

         // Update row
         self.oelines[args.row].sourcedqty = record.sourcedqty;
         self.oelines[args.row].shortstockfl = shortStockFl;
         self.grid.updateRow(args.row);

         // Update Banner
         self.resetBannerFields();
      }
   };

   // Reset Banner fields
   self.resetBannerFields = function () {

      var records = self.oelines;
      self.shortstockfl = false;
      self.totqtyship = 0;
 
      records.forEach(function (record) {

         if (record.shortstockfl) {
            self.shortstockfl = true;
         }
         self.totqtyship += record.sourcedqty * record.unitconv;
      });
   };

});


app.controller('ofAddWarehouseCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   // awtl - Add Whse To List
   var self = this;
   var oful = $scope.oful;
   var oeData = {};

   self.cancel = function () {
      oful.ofAddWarehouseModal.destroy();
   };

   self.submit = function () {

      // Send Order#, Line and Add Whse in Criteria
      oeData = {
         orderno: oful.orderno,
         ordersuf: oful.ordersuf,
         lineno: oful.lineno,
         addwhse: self.addwhse,
         selectedfl: self.selectedfl
      };

      DataService.post('api/oe/asoeentry/oefulfillmentaddwhse', { data: oeData, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging)) {

            MessageService.info('global.information', 'message.operation.completed.successfully');

            // Refresh Grid/Line Data
            oful.loadRecords();
         }
         self.cancel();
      });
   };
});


app.controller('ofOverrideRuleCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   // orul - Override Rule
   var self = this;
   var oful = $scope.oful;
   var oeData = {};

   self.overruleused = '';
   self.origruleused = oful.origruleused;

   self.cancel = function () {
      oful.ofOverrideRuleModal.destroy();
   };

   self.submit = function () {

      var oeFulfillmentCriteria = {};
      var oeFulfillmentResults = [];

      oeFulfillmentCriteria = {
         orderno: oful.orderno,
         ordersuf: oful.ordersuf,
         lineno: oful.lineno,
         unit: 'ApplyRuleChange',
         overruleused: self.overruleused
      };

      oeFulfillmentResults = oful.oelines;

      oeData = {
         oefulfillmentcriteria: oeFulfillmentCriteria,
         oefulfillmentresults: oeFulfillmentResults
      };

      DataService.post('api/oe/asoeentry/oefulfillmentsave', { data: oeData, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {

               // Refresh Grid/Line Data
               oful.oelines = data.oefulfillmentresults;
            }
            self.cancel();
         }
      });
   };
});


app.controller('ofSubmitListCtrl', function ($scope, $state, $stateParams, DataService, MessageService, MruService, Utils) {
   // slst - Submit List
   var self = this;
   var oful = $scope.oful;
   var oeData = {};

   // Defaults
   self.repricefl = oful.repricefl;
   self.nspricefl = oful.nspricefl;
   self.resetaddonfl = oful.resetaddonfl;
   self.recalccostfl = oful.recalccostfl;
   self.orderNumber = '';

   self.cancel = function () {
      oful.ofSubmitListModal.destroy();
   };

   // Submit the Fulfillment Order and Create Tied Orders
   self.submit = function () {

      var oeFulfillmentCriteria = {};
      var oeFulfillmentResults = [];

      oeFulfillmentCriteria = {
         orderno: oful.orderno,
         ordersuf: oful.ordersuf,
         lineno: oful.lineno,
         unit: '',
         overruleused: ''
      };

      oeFulfillmentResults = oful.oelines;

      oeData = {
         oefulfillmentcriteria: oeFulfillmentCriteria,
         oefulfillmentresults: oeFulfillmentResults
      };

      // Save Changes if any made

      DataService.post('api/oe/asoeentry/oefulfillmentsave', { data: oeData, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {

               oeData = {
                  orderno: oful.orderno,
                  ordersuf: oful.ordersuf,
                  repricefl: self.repricefl,
                  nspricefl: self.nspricefl,
                  resetaddonfl: self.resetaddonfl,
                  recalccostfl: self.recalccostfl
               };

               // Create the Tied Fulfillment Orders
               DataService.post('api/oe/asoeentry/oefulfillmentsubmit', { data: oeData, busy: true }, function (data) {
                  if (!MessageService.processMessaging(data)) {

                     data.forEach(function (message) {

                        // Orders Created Message - 'Whse: xxxx; Order 12345678-00 Created'
                        if (message.messagetxt.includes('Whse') &&
                           message.messagetxt.includes('Order') &&
                           message.messagetxt.includes('Created') &&
                           !message.messagetxt.includes('Purchase') &&
                           !message.messagetxt.includes('Warehouse') &&
                           !message.messagetxt.includes('Work')) {

                           var array = message.messagetxt.split(';');
                           var match = /\d+/.exec(array[1]);

                           if (match[0]) {

                              self.orderNumber = match[0];

                              // Call Back after SI Call Complete
                              self.loadOrderMRU(function (orderIsLoaded) {
                              });
                           }
                        }
                     });

                     MessageService.info('global.information', 'message.fulfillment.operation.completed.successfully');

                     self.cancel();

                     // Back a Screen
                     oful.back();
                  }
               });
            }
         }
      });
   };

   self.loadOrderMRU = function (callback) {
      var orderNum = '';
      var params = {
         orderno: self.orderNumber,
         ordersuf: 0,
         fldlist: 'rowpointer,orderno,ordersuf'
      };

      orderNum = self.orderNumber + '-00';
      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            MruService.addToList('OEOrder', data.rowpointer, orderNum, data.orderno, data.ordersuf);
            callback(true);
         }
      });
   };

});