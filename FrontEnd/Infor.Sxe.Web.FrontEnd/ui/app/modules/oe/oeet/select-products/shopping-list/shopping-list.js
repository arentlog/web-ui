app.controller('OeetShoppingListCtrl', function ($scope, $state, ConfigService, DataService, MessageService, UserService, GridService, ImageService) {
   // alias => sl
   var self = this;
   var base = $scope.base;   

   self.isCustomerReservationsVisible = false;   
   self.totalRecommended = 0;
   self.totalOrdered = 0;
   self.shoppingListCollection = [];
   self.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
   self.slProduct = '';
   self.slPdrecno = 0;
   self.noProdsToRecall = self.defaultToRecall = ConfigService.getDefaultRecordLimit();

   //we should not have to go get the oeehrowid this way, it should already be on the oehdr object
   var params = {
      orderno: base.oehdr.orderno,
      ordersuf: base.oehdr.ordersuf,
      fldlist: 'rowID'
   };
   DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
      if (data) {
         self.oeehrowid = data.rowID;
         var shoppingListPrepareRequest = {
            proc: 'oeet',
            hdrrowid: self.oeehrowid,
            clearfl: false
         };
         DataService.post('api/shared/assharedentry/shoppinglistprepare', { data: shoppingListPrepareRequest, busy: true }, function (data) {
            self.totalRecommended = data.totalrecommend;
            self.totalOrdered = data.totalordered;
            self.refreshShoppingList();
            self.checkPvAutoLaunch();
         });
      }
   });

   self.refreshShoppingList = function () {
      var criteria = {
         cono: UserService.getCono(),
         oper2: UserService.getUserName(),
         batchsize: self.noProdsToRecall
      };
      DataService.post('api/pv/pvshoplist/getpvshoplistbyoper', { data: criteria, busy: true }, function (data) {
         if (data) {
            ImageService.getImages(data, 'icsw', 'prod', '', '', false, function () {
               self.shoppingListCollection = data;
            });
         }
      });
   };

   self.checkPvAutoLaunch = function () {
      var pvRegistries = [];
      pvRegistries.push({
         pvfunction: 'oe',
         pvsection: 'oeet',
         pvsubsection: '',
         pvobject: '',
         pvkeyname: 'shoplistautolaunch'
      });
      DataService.post('api/shared/assharedentry/sharedpvregistryload', { data: pvRegistries, busy: true }, function (data) {
         if (data) {
            data.forEach(function (registry) {
               if (registry.pvkeyname === 'shoplistautolaunch') {
                  self.autoLaunch = registry.pvcharvalue;
                  switch (registry.pvcharvalue) {
                     case 'promotional':
                        self.promotionalProducts();
                        break;
                     case 'past sales':
                        self.pastSales();
                        break;
                     case 'previous orders':
                        self.previousOrders();
                        break;
                     case 'product list':
                        self.productList();
                        break;
                  }
               }
            });
         }
      });
   };

   self.isChildState = function () {
      if ($state.is(base.baseState + '.selectProducts.shoppingList.customerReservations') ||
         $state.is(base.baseState + '.selectProducts.shoppingList.promotionalProducts') ||
         $state.is(base.baseState + '.selectProducts.shoppingList.pastSales') ||
         $state.is(base.baseState + '.selectProducts.shoppingList.previousOrders') ||
         $state.is(base.baseState + '.selectProducts.shoppingList.productList')) {
         return true;
      } else {
         return false;
      }
   };

   self.clear = function () {
      self.totalRecommended = 0;
      self.totalOrdered = 0;
      self.shoppingListCollection = [];
      DataService.get('api/shared/assharedentry/clearshoppinglist', { busy: true });
   };

   self.delete = function () {
      if (self.shoppingListGrid) {
         var records = GridService.getSelectedRecords(self.shoppingListGrid);
         if (records && records.length) {
            MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
               var productsToDelete = [];
               var seqNo = 0;

               records.forEach(function (record) {
                  seqNo++;
                  productsToDelete.push(
                     {
                        pvShoplistRowid: record.rowID,
                        seqno: seqNo
                     });
               });
               var totals = {
                  totalordered: self.totalOrdered,
                  totalrecommend: self.totalRecommended
               };
               DataService.post('api/shared/assharedentry/shoppinglistdelete', { data: { shoplistdeleteprods: productsToDelete, shoplistdeletetotals: totals }, busy: true }, function (data) {
                  if (data) {
                     self.totalOrdered = data.totalordered;
                     self.totalRecommended = data.totalrecommend;
                  }
                  self.refreshShoppingList();
               });
            });
         } else {
            MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
         }
      } else {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
      }
   };

   self.addLines = function () {
      if (self.shoppingListGrid) {
         var records = GridService.getSelectedRecords(self.shoppingListGrid);
         if (records && records.length) {
            var linesToUpdate = [];
            var seqNo = 0;
            records.forEach(function (record) {
               seqNo++;
               linesToUpdate.push(
                  {
                     seqno: seqNo,
                     pvShoplistRowid: record.rowID
                  });
            });

            var criteria = {
               proc: 'oeet',
               hdrrowid: self.oeehrowid
            };
            var totals = {
               totalordered: self.totalOrdered,
               totalrecommend: self.totalRecommended
            };

            DataService.post('api/shared/assharedentry/shoppinglistupdatefromlist', { data: { shoplistupdatecriteria: criteria, shoplistupdatetotals: totals, shoplistupdateprods: linesToUpdate }, busy: true }, function (data) {
               if (data) {
                  if (data.cWarningMessage) {
                     MessageService.info('global.warning', data.cWarningMessage);
                  }
                  if (data.shoplistupdatetotals) {
                     self.totalOrdered = data.shoplistupdatetotals.totalordered;
                     self.totalRecommended = data.shoplistupdatetotals.totalrecommend;
                  }
               }
               self.updateShoppingList();
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         }
         else {
            MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
         }
      } else {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
      }
   };

   self.addAllLines = function () {
      if (self.shoppingListGrid && self.shoppingListCollection && self.shoppingListCollection.length) {
         var notNeeded = [];
         var criteria = {
            proc: 'oeet',
            hdrrowid: self.oeehrowid
         };
         var totals = {
            totalordered: self.totalOrdered,
            totalrecommend: self.totalRecommended
         };

         DataService.post('api/shared/assharedentry/shoppinglistupdateall', { data: { shoplistupdatecriteria: criteria, shoplistupdatetotals: totals, shoplistupdateprods: notNeeded }, busy: true }, function (data) {
            if (data) {
               if (data.shoplistupdatetotals) {
                  self.totalOrdered = data.shoplistupdatetotals.totalordered;
                  self.totalRecommended = data.shoplistupdatetotals.totalrecommend;
               }
            }
            self.updateShoppingList();
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
      }
   };

   self.updateShoppingList = function () {
      self.refreshShoppingList();

      var lastLineItemLineNo;
      if (base.lineItems.length > 0) {
         lastLineItemLineNo = base.lineItems[base.lineItems.length - 1].actllineno + 1;
      } else {
         lastLineItemLineNo = 0;
      }

      // If using AvaTax, don't calculate taxes on each line add
      // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
      if (base.taxMethodType.toLowerCase() === 'a') {
         base.calcsob = 'x';
      } else {
         base.calcsob = 'o';
      }

      base.updateLineItems(null, null, 'addMultiple', lastLineItemLineNo);
   };

   self.customerReservations = function () {
      var selectedRow = GridService.getSelectedRecord(self.shoppingListGrid);
      $state.go('.customerReservations', { selectedRecord: selectedRow });
   };

   self.promotionalProducts = function () {
      $state.go('.promotionalProducts');
   };

   self.pastSales = function () {
      $state.go('.pastSales');
   };

   self.previousOrders = function () {
      $state.go('.previousOrders');
   };

   self.productList = function () {
      $state.go('.productList');
   };

   self.populateShoppingList = function (callingView, searchValue, clearList) {
      var populateRequest = {
         shoplistpopulatecriteria: {
            hdrrowid: self.oeehrowid,
            proc: 'oeet',
            style: callingView,
            clearfl: clearList,
            selectioncriteria: searchValue
         },
         shoplistpopulatetotals: {
            totalordered: self.totalOrdered,
            totalrecommend: self.totalRecommended
         }
      };
      DataService.post('api/shared/assharedentry/shoppinglistpopulate', { data: populateRequest, busy: true }, function (data) {
         if (data) {
            self.totalOrdered = data.totalordered;
            self.totalRecommended = data.totalrecommend;

            self.refreshShoppingList();
         }
      });
   };

   self.rowSelected = function () {
      var selectedRecords = GridService.getSelectedRecords(self.shoppingListGrid);
      if (selectedRecords.length === 1) {
         if (selectedRecords[0].custreservefoundfl) {
            self.isCustomerReservationsVisible = true;
         } else {
            self.isCustomerReservationsVisible = false;
         }
      } else {
         self.isCustomerReservationsVisible = false;
      }
   };

   self.rowSelectedSL = function () {
      var selectedRecords = GridService.getSelectedRecords(self.shoppingListGrid);
      if (selectedRecords.length === 1) {
         self.slProduct = selectedRecords[0].prod;
         self.slPdrecno = selectedRecords[0].pdrecno;
      } else {
         self.slProduct = '';
         self.slPdrecno = 0;
      }
   };

   self.qtyOrdChange = function (e, args) {
      var record = self.shoppingListCollection[args.row];
      if (record) {
         var criteria = {
            proc: 'oeet',
            hdrrowid: self.oeehrowid,
            qtyord: args.value,
            unit: record.unit,
            pvShoplistRowid: record.rowID
         };
         var totals = {
            totalordered: self.totalOrdered,
            totalrecommend: self.totalRecommended
         };

         //User Hook (do not rename)
         if (self.qtyOrdChangeCriteria) {
            self.qtyOrdChangeCriteria(criteria, totals);
         }

         DataService.post('api/shared/assharedentry/shoppinglistchange', { data: { shoplistchangecriteria: criteria, shoplistchangetotals: totals }, busy: true }, function (data) {
            if (data) {
               self.totalOrdered = data.totalordered;
               self.totalRecommended = data.totalrecommend;

               //User Hook (do not rename)
               if (self.qtyOrdChangeContinue) {
                  self.qtyOrdChangeContinue(data);
               }
            }
         });
      }
   };

   self.easyLineEntry = function () {
      $state.go('^');

      $scope.sp.view.applyAutoFocus();
   };

   self.addons = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.shoppingList',
         drilldownState: 'addons'
      });
   };

   self.discounts = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.shoppingList',
         drilldownState: 'discounts'
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetShoppingListCustomerReservationsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   // alias => slCr
   var self = this;
   var base = $scope.base;

   self.selectedRecord = $stateParams.selectedRecord;
   self.criteria = {
      whse: self.selectedRecord.whse,
      product: self.selectedRecord.prod,
      custno: base.oehdr.custno,
      shipto: base.oehdr.shipto,
      statuscd: 'A'
   };

   self.shipToChanged = function (args) {
      if (!self.criteris.custno) {
         //self.criteria.custno = shipto;
      }
   };

   self.rowSelected = function () {
      //in SL, we set the selected row and published some notes... not ready yet
      var selectedRow = GridService.getSelectedRecord(self.grid);
   };

   self.search = function () {
      if (self.criteria.whse) {
         DataService.post('api/ic/asicsetup/icspclookup', { data: self.criteria, busy: true }, function (data) {
            if (data) {
               self.dataset = data.icspclookupresults;
            }
         });
      } else {
         MessageService.error('global.error', 'message.no.warehouse.selected');
      }
   };

   self.ok = function () {
      //SL didnt do anything here... incomplete code?? If not, we can remove this button and use back
      $state.go('^');
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetShoppingListPromotionalProductsCtrl', function ($scope, $state, $translate, DataService, MessageService) {
   // alias => slPp
   var self = this;
   var sl = $scope.sl;

   self.noProdsToRecall = sl.defaultToRecall;
   self.clearShoppingList = false;
   self.includeOptionalProds = true;
   self.automaticallyLaunch = sl.autoLaunch === 'promotional';

   self.ok = function () {
      if (self.noProdsToRecall === 0 || self.noProdsToRecall > sl.defaultToRecall) {
         var message = $translate.instant('message.warning.increasing.products') + ' ';
         message += $translate.instant('question.do.you.wish.to.continue');
         MessageService.yesNo('global.question', message, function () {
            // yes callback
            sl.noProdsToRecall = self.noProdsToRecall;
            self.populate();
         }, null);
      }
      else {
         self.populate();
      }
   };

   self.populate = function () {
      if (sl.autoLaunch === 'promotional' || self.automaticallyLaunch) {         // self.automaticallyLaunch (checkbox)
         var pvRegistries = [];
         pvRegistries.push({
            pvfunction: 'oe',
            pvsection: 'oeet',
            pvsubsection: '',
            pvobject: '',
            pvkeyname: 'shoplistautolaunch',
            pvcharvalue: self.automaticallyLaunch ? 'promotional' : ''
         });
         DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: pvRegistries, busy: true });
      }

      var includeOptProds = self.includeOptionalProds ? 'yes' : 'no';
      sl.populateShoppingList('promotional', self.noProdsToRecall + '|' + includeOptProds, self.clearShoppingList);
      $state.go('^');
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetShoppingListPastSalesCtrl', function ($scope, $state, $translate, DataService, MessageService, Utils, AodataService) {
   // alias => slPs
   var self = this;
   var sl = $scope.sl;

   self.noProdsToRecall = sl.defaultToRecall;
   self.clearShoppingList = false;
   self.includeOptionalProds = true;

   var oeShopList = AodataService.getValue('OE', 'OEShopListPastSales');
   self.isAllShiptosVisible = oeShopList && (oeShopList.toLowerCase() === 'b' || oeShopList.toLowerCase() === 's');
   self.isAllWhsesVisible = oeShopList && (oeShopList.toLowerCase() === 'b' || oeShopList.toLowerCase() === 'w');

   self.automaticallyLaunch = sl.autoLaunch === 'past sales';
   self.includeNonStocks = false;
   self.toMonth = Utils.getCurrentMonth();
   self.toYear = Utils.getCurrentYearFour();
   var fromMonth = self.toMonth - 6;
   var fromYear = self.toYear;
   if (fromMonth < 1) {
      fromYear = fromYear - 1;
      fromMonth = fromMonth + 12;
   }
   self.fromMonth = fromMonth;
   self.fromYear = fromYear;

   self.ok = function () {
      if (self.noProdsToRecall === 0 || self.noProdsToRecall > sl.defaultToRecall) {
         var message = $translate.instant('message.warning.increasing.products') + ' ';
         message += $translate.instant('question.do.you.wish.to.continue');
         MessageService.yesNo('global.question', message, function () {
            // yes callback
            sl.noProdsToRecall = self.noProdsToRecall;
            self.populate();
         }, null);
      }
      else {
         self.populate();
      }
   };

   self.populate = function () {
      //check to see if from period is greater than to period and throw error if it is
      var dayDifference = Utils.getDateDayDifference(self.fromPeriod, self.toPeriod);
      if (dayDifference > 0) {
         MessageService.error('global.error', 'message.to.period.must.be.greater.than.or.equal.to.from');
      } else {
         if (sl.autoLaunch === 'past sales' || self.automaticallyLaunch) {         // self.automaticallyLaunch (checkbox)
            var pvRegistries = [];
            pvRegistries.push({
               pvfunction: 'oe',
               pvsection: 'oeet',
               pvsubsection: '',
               pvobject: '',
               pvkeyname: 'shoplistautolaunch',
               pvcharvalue: self.automaticallyLaunch ? 'past sales' : ''
            });
            DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: pvRegistries, busy: true });
         }

         var fromMonth = self.fromMonth;
         var fromYear = self.fromYear;
         var toMonth = self.toMonth;
         var toYear = self.toYear;
         var includeOptProds = self.includeOptionalProds ? 'yes' : 'no';
         var includeNsProds = self.includeNonStocks ? 'yes' : 'no';
         var allWhses = self.allWarehouses ? 'yes' : 'no';
         var allShiptos = self.allShiptos ? 'yes' : 'no';
         var searchString = fromMonth + '|' + fromYear + '|' +
            toMonth + '|' + toYear + '|' +
            self.noProdsToRecall + '|' +
            includeOptProds + '|' + includeNsProds + '|' + allWhses + '|' + allShiptos;

         sl.populateShoppingList('past sales', searchString, self.clearShoppingList);
         $state.go('^');
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetShoppingListPreviousOrdersCtrl', function ($scope, $state, $translate, DataService, MessageService) {
   // alias => slPo
   var self = this;
   var sl = $scope.sl;

   self.noProdsToRecall = sl.defaultToRecall;
   self.clearShoppingList = false;
   self.automaticallyLaunch = sl.autoLaunch === 'previous orders';
   self.keepPricing = 'no';

   self.order1Selected = function (args) {
      self.processOrderSelected(args, 1);
   };
   self.order2Selected = function (args) {
      self.processOrderSelected(args, 2);
   };
   self.order3Selected = function (args) {
      self.processOrderSelected(args, 3);
   };
   self.order4Selected = function (args) {
      self.processOrderSelected(args, 4);
   };
   self.order5Selected = function (args) {
      self.processOrderSelected(args, 5);
   };
   self.order6Selected = function (args) {
      self.processOrderSelected(args, 6);
   };
   self.order7Selected = function (args) {
      self.processOrderSelected(args, 7);
   };
   self.order8Selected = function (args) {
      self.processOrderSelected(args, 8);
   };
   self.order9Selected = function (args) {
      self.processOrderSelected(args, 9);
   };
   self.order10Selected = function (args) {
      self.processOrderSelected(args, 10);
   };

   self.processOrderSelected = function (selectedOrder, lookupNumber) {
      if (selectedOrder.value > 0) {
         var params = {
            orderno: selectedOrder.value,
            ordersuf: selectedOrder.value2,
            fldlist: 'transtype,arsces'
         };
         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  var orderDescrip = '';
                  var orderType = '';
                  switch (data.transtype) {
                     case 'rm': //return
                        orderType = $translate.instant('global.return');
                        break;
                     case 'cr': //correction
                        orderType = $translate.instant('global.correction');
                        break;
                     case 'do': //direct
                        orderType = $translate.instant('global.direct');
                        break;
                     case 'qu': //quote
                        orderType = $translate.instant('global.quote');
                        break;
                     case 'bl': //blanket
                        orderType = $translate.instant('global.blanket');
                        break;
                     case 'st': //standing
                        orderType = $translate.instant('global.standing');
                        break;
                     case 'fo': //future
                        orderType = $translate.instant('global.future');
                        break;
                     case 'so': //stock
                        orderType = $translate.instant('global.stock');
                        break;
                     case 'cs': //counter sale
                        orderType = $translate.instant('global.counter.sale');
                        break;
                  }
                  if (orderType) {
                     orderDescrip = orderType;
                  }
                  if (data.arsces && data.arsces.name) {
                     orderDescrip = orderDescrip + ' (' + data.arsces.name + ')';
                  }
                  switch (lookupNumber) {
                     case 1:
                        self.order1descrip = orderDescrip;
                        break;
                     case 2:
                        self.order2descrip = orderDescrip;
                        break;
                     case 3:
                        self.order3descrip = orderDescrip;
                        break;
                     case 4:
                        self.order4descrip = orderDescrip;
                        break;
                     case 5:
                        self.order5descrip = orderDescrip;
                        break;
                     case 6:
                        self.order6descrip = orderDescrip;
                        break;
                     case 7:
                        self.order7descrip = orderDescrip;
                        break;
                     case 8:
                        self.order8descrip = orderDescrip;
                        break;
                     case 9:
                        self.order9descrip = orderDescrip;
                        break;
                     case 10:
                        self.order10descrip = orderDescrip;
                        break;
                  }
               }
            }
         });
      }
   };

   self.ok = function () {
      if (self.noProdsToRecall === 0 || self.noProdsToRecall > sl.defaultToRecall) {
         var message = $translate.instant('message.warning.increasing.products') + ' ';
         message += $translate.instant('question.do.you.wish.to.continue');
         MessageService.yesNo('global.question', message, function () {
            // yes callback
            sl.noProdsToRecall = self.noProdsToRecall;
            self.populate();
         }, null);
      }
      else {
         self.populate();
      }
   };

   self.populate = function () {
      if (sl.autoLaunch === 'previous orders' || self.automaticallyLaunch) {         // self.automaticallyLaunch (checkbox)
         var pvRegistries = [];
         pvRegistries.push({
            pvfunction: 'oe',
            pvsection: 'oeet',
            pvsubsection: '',
            pvobject: '',
            pvkeyname: 'shoplistautolaunch',
            pvcharvalue: self.automaticallyLaunch ? 'previous orders' : ''
         });
         DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: pvRegistries, busy: true });
      }

      var searchString = self.noProdsToRecall + '|' + self.keepPricing;
      if (self.order1number) {
         searchString += self.addOrderNumberToSearchString(self.order1number);
      }
      if (self.order2number) {
         searchString += self.addOrderNumberToSearchString(self.order2number);
      }
      if (self.order3number) {
         searchString += self.addOrderNumberToSearchString(self.order3number);
      }
      if (self.order4number) {
         searchString += self.addOrderNumberToSearchString(self.order4number);
      }
      if (self.order5number) {
         searchString += self.addOrderNumberToSearchString(self.order5number);
      }
      if (self.order6number) {
         searchString += self.addOrderNumberToSearchString(self.order6number);
      }
      if (self.order7number) {
         searchString += self.addOrderNumberToSearchString(self.order7number);
      }
      if (self.order8number) {
         searchString += self.addOrderNumberToSearchString(self.order8number);
      }
      if (self.order9number) {
         searchString += self.addOrderNumberToSearchString(self.order9number);
      }
      if (self.order10number) {
         searchString += self.addOrderNumberToSearchString(self.order10number);
      }
      sl.populateShoppingList('previous orders', searchString, self.clearShoppingList);
      $state.go('^');
   };

   self.addOrderNumberToSearchString = function (orderNumber) {
      var orderParts = orderNumber.split('-');
      if (orderParts.length === 2) {
         return '|' + orderParts[0] + ',' + orderParts[1];
      } else {
         return '';
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetShoppingListProductListCtrl', function ($scope, $state, $translate, DataService, MessageService) {
   // alias => slPl
   var self = this;
   var sl = $scope.sl;

   self.noProdsToRecall = sl.defaultToRecall;
   self.clearShoppingList = false;
   self.includeOptionalProds = true;
   self.priceEachProd = false;
   self.automaticallyLaunch = sl.autoLaunch === 'product list';

   self.ok = function () {

      if (self.productListType) {
         if (self.noProdsToRecall === 0 || self.noProdsToRecall > sl.defaultToRecall) {
            var message = $translate.instant('message.warning.increasing.products') + ' ';
            message += $translate.instant('question.do.you.wish.to.continue');
            MessageService.yesNo('global.question', message, function () {
               // yes callback
               sl.noProdsToRecall = self.noProdsToRecall;
               self.populate();
            }, null);
         }
         else {
            self.populate();
         }
      } else {
         MessageService.error('global.error', 'message.product.list.type.is.required');
      }
   };

   self.populate = function () {
      if (sl.autoLaunch === 'product list' || self.automaticallyLaunch) {         // self.automaticallyLaunch (checkbox)
         var pvRegistries = [];
         pvRegistries.push({
            pvfunction: 'oe',
            pvsection: 'oeet',
            pvsubsection: '',
            pvobject: '',
            pvkeyname: 'shoplistautolaunch',
            pvcharvalue: self.automaticallyLaunch ? 'product list' : ''
         });
         DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: pvRegistries, busy: true });
      }

      var includeOptProds = self.includeOptionalProds ? 'yes' : 'no';
      var priceEach = self.priceEachProd ? 'yes' : 'no';
      sl.populateShoppingList('product list', self.noProdsToRecall + '|' + self.productListType + '|' + includeOptProds + '|' + priceEach, self.clearShoppingList);
      $state.go('^');
   };

   self.back = function () {
      $state.go('^');
   };
});