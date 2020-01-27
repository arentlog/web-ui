'use strict';

app.controller('OeetInitiateCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, MruService, GridService, RecoveryService, AodataService, ModalService, Sasc, Utils, Constants) {
   // alias => ino
   var self = this;
   var base = $scope.base;

   base.sidebarCollapsed = true;
   base.isAddOrderMode = true;

   self.duplicateCustomerPoOrders = [];

   self.setVisibleFields = function () {
      var visibleFields = self.view.getControlIds();
      self.isApprovalInUse = visibleFields.indexOf(31) > -1;
      self.isSalesRepInInUse = visibleFields.indexOf(55) > -1;
      self.isSalesRepOutInUse = visibleFields.indexOf(56) > -1;

      //Reset back to original value when coming into OEET.  Otherwise we'll get duplicates added on each order.
      base.oehdrAddVisibleList = base.saveOehdrAddVisibleList;

      if (self.isApprovalInUse) {
         base.oehdrAddVisibleList += base.DELIMITER_COMMA + 'approvty';
      }
      if (self.isSalesRepInInUse) {
         base.oehdrAddVisibleList += base.DELIMITER_COMMA + 'slsrepin';
      }
      if (self.isSalesRepOutInUse) {
         base.oehdrAddVisibleList += base.DELIMITER_COMMA + 'slsrepout';
      }
   };

   //state checks
   self.isTakenBy = function () {
      return $state.is(base.baseState + '.initiate.takenBy');
   };

   self.isDirectOrder = function () {
      return $state.is(base.baseState + '.initiate.directOrder');
   };

   self.maintain = function () {
      $state.go(base.baseState + '.maintain');
   };

   self.delete = function () {
      $state.go(base.baseState + '.delete');
   };

   self.print = function () {
      $state.go(base.baseState + '.print');
   };

   self.copy = function () {
      $state.go(base.baseState + '.copy');
   };

   self.receiveOnAccount = function () {
      $state.go(base.baseState + '.receiveOnAccount');
   };

   self.counterSalesShipping = function () {
      $state.go(base.baseState + '.counterSalesShipping');
   };

   self.maintainPo = function () {
      $state.go(base.baseState + '.maintainPO');
   };

   self.maintCustShipTo = function() {
      $state.go(base.baseState + '.editCustomerShipTo');
   };

   self.billingOrders = function () {
      $state.go(base.baseState + '.billingOrders');
   };

   self.orderEntryDefaultsClicked = function () {
      $state.go('.orderEntryDefaults');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.continue = function () {
      var isValidOrderOriginCode = (!base.oehdr.origincdenabled || base.oehdr.origincd);
      var isOriginCodeInUse = self.view.hasControl(42);
      var isOriginCodeRequired = AodataService.getValue('origin', 'required');

      if (!isValidOrderOriginCode && (isOriginCodeRequired === 'yes') && isOriginCodeInUse) {
         MessageService.error('global.error', 'message.please.enter.a.valid.origin.code');
         return;
      }

      //This piece of code added to set the canFinishWithoutTendering flag when Order type in Orderentrydefaults is set to Counter sale
      base.setCanFinishWithoutTendering();

      if (base.oehdr.custpo && Sasc.oedupfl) {
         if (base.oehdr.oetype !== 'rm' && base.oehdr.oetype !== 'cr') {
            var duplicateCustPoRequired = AodataService.getValue('OE', 'OEDupCustPo');
            if (duplicateCustPoRequired) {
               if (!self.duplicatePoModal) {
                  self.getDuplicateCustPoList(duplicateCustPoRequired);
                  return;
               }
            } else {
               self.takenByRequiredCheck();
            }
         }
      }

      self.takenByRequiredCheck();
   };

   self.customerSelected = function (args, custno, leaveShipTo) {
      if (!leaveShipTo) {
         base.oehdr.shipto = '';
      }
      var custnoValue = args ? args.value : custno;

      if (custnoValue) {
         var arscparams = {
            custno: custnoValue
         };
         DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (data) {
            if (data) {
               //set the customer in base for access throughout OEET
               base.arsc = data;

               // Determine if that customer requires customer product on each OE line
               if (data.custprodreqfl) {
                  base.isRequireCustomerProd = true;
               }
               else {
                  base.isRequireCustomerProd = false;
               }

               base.oehdr.name = data.name;
               base.oehdr.addr1 = data.addr1;
               base.oehdr.addr2 = data.addr2;
               base.oehdr.addr3 = data.addr3;
               base.oehdr.city = data.city;
               base.oehdr.state = data.state;
               base.oehdr.zipcd = data.zipcd;
               base.oehdr.geocode = data.geocode;
               base.oehdr.billtocountrycd = data.countrycd; //'billtocountrycd' is not a domain property for oeeh

               if (!leaveShipTo && data.shipviaty) {
                  base.oehdr.shipviaty = data.shipviaty;
               }

               if (data.termstype && !base.oehdr.shipto) {
                  base.oehdr.termstype = data.termstype;
                  base.origTerms = data.termstype;
               }
               if (!base.oehdr.shipto) {
                  base.oehdr.shipto = data.shipto;
                  self.shipToSelected(null, data.shipto);
               }
               if (data.custpo) {
                  base.oehdr.custpo = data.custpo;
               }
               else {
                  base.oehdr.custpo = '';
               }
               if (!leaveShipTo && data.shipinstr) {
                  base.oehdr.shipinstr = data.shipinstr;
               }

               if (data.slsrepout) {
                  base.oehdr.slsrepout = data.slsrepout;
               }
               if (data.slsrepin) {
                  base.oehdr.slsrepin = data.slsrepin;
               }

               //User Hook (do not rename)
               if (self.customerSelectedContinue) {
                  self.customerSelectedContinue(data);
               }

               self.assignDefaultWarehouse();
            }
         });
      } else {
         base.oehdr.name = '';
         base.oehdr.addr1 = '';
         base.oehdr.addr2 = '';
         base.oehdr.addr3 = '';
         base.oehdr.city = '';
         base.oehdr.state = '';
         base.oehdr.zipcd = '';
         base.oehdr.geocode = 0;
         base.oehdr.shipinstr = '';
         base.oehdr.custpo = '';
         base.oehdr.billtocountrycd = '';

         //User Hook (do not rename)
         if (self.customerSelectedNoneContinue) {
            self.customerSelectedNoneContinue();
         }

         self.assignDefaultWarehouse();
      }
   };

   if ($stateParams.custno) {
      //Set Parameter on base, so that it can be used and set on the base.oehdr object
      //during normal processing as the screen is instantiated.
      base.parameterCustno = $stateParams.custno;

      self.customerSelected(null, $stateParams.custno);
   }

   self.warehouseSelected = function (args, warehouse) {
      var whse = args ? args.value : warehouse;
      if (whse) {
         var params = { whse: whse };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               //set the warehouse in base for access throughout OEET
               base.icsd = data;
            }
         });
      } else {
         base.icsd = {};
      }
   };

   self.orderTypeChanged = function () {
      base.oehdr.approvty = base.oehdr.oetype === 'rm' ? Sasc.oeretapprty : Sasc.oeapprty;
      base.setCanFinishWithoutTendering();
   };

   self.shipToSelected = function (args, shipto) {
      if (args && args.value) {
         DataService.get('api/ar/arss/getbyrowpointer/' + args.rowPointer, { busy: true }, self.shipToSelectedCallback);
      } else if (shipto) {
         var arssparams = {
            custno: base.oehdr.custno,
            shipto: shipto
         };
         DataService.get('api/ar/arss/getbypk', { params: arssparams, busy: true }, self.shipToSelectedCallback);
      } else {
         base.arss = {};

         base.oehdr.shiptoaddr1 = '';
         base.oehdr.shiptoaddr2 = '';
         base.oehdr.shiptoaddr3 = '';
         base.oehdr.shiptocity = '';
         base.oehdr.shiptost = '';
         base.oehdr.shiptozip = '';
         base.oehdr.shipviaty = '';
         base.oehdr.shipinstr = '';
         if (base.arsc && base.arsc.slsrepout) {
            base.oehdr.slsrepout = base.arsc.slsrepout;
         }
         if (base.arsc && base.arsc.slsrepin) {
            base.oehdr.slsrepin = base.arsc.slsrepin;
         }

         if (base.arsc) {
            base.oehdr.shipinstr = base.arsc.shipinstr;
            base.oehdr.shipviaty = base.arsc.shipviaty;
         }

         self.assignDefaultWarehouse();
      }
   };

   //User Hook (do not rename)
   self.shipToSelectedCallbackContinue = function (data) {

      //If shipto's are selected, we need to pull it from the ShipTo instead of the Customer.
      if (data.slsrepin) {
         base.oehdr.slsrepin = data.slsrepin;
      }

      if (data.slsrepout) {
         base.oehdr.slsrepout = data.slsrepout;
      }

      if (base.defaultWarehouseSetting === 'Ship To' || !base.oehdr.whse) {
         self.assignDefaultWarehouse();
      }
   };

   self.shipToSelectedCallback = function (data) {
      if (data) {
         //set the ship to in base for access throughout OEET

         base.arss = data;

         base.oehdr.shiptonm = data.name;
         base.oehdr.shiptoaddr1 = data.addr1;
         base.oehdr.shiptoaddr2 = data.addr2;
         base.oehdr.shiptoaddr3 = data.addr3;
         base.oehdr.shiptocity = data.city;
         base.oehdr.shiptost = data.state;
         base.oehdr.shiptozip = data.zipcd;
         base.oehdr.countrycd = data.countrycd;
         base.oehdr.geocd = data.geocd;
         base.oehdr.outofcityfl = data.outofcityfl;
         base.oehdr.termstype = data.termstype;
         base.oehdr.shipviaty = data.shipviaty;
         base.oehdr.shipinstr = data.shipinstr;

         base.origTerms = data.termstype;
         //call to customerselected again in shipto selection overriding values from shipto.
         //so added condition when customer is different from shipto record then loading customer details
         if (base.oehdr.custno !== data.custno) {

            if (base.oehdr.custno && base.oehdr.custno !== data.custno) {
               MessageService.error('global.warning', 'message.selecting.this.shipto.changed.the.customer');
            }

            base.oehdr.custno = data.custno;
            self.customerSelected(null, data.custno, true);
         }

         //If the Shipto's CustPO is not set, then fall back to the Customer's CustPO
         if (data.custpo) {
            base.oehdr.custpo = data.custpo;
         } else if (base.arsc) {
            base.oehdr.custpo = base.arsc.custpo;
         } else {
            base.oehdr.custpo = '';
         }

         //User Hook (do not rename)
         self.shipToSelectedCallbackContinue(data);
      }
   };

   self.headerVisibleFieldChanged = function (fieldName) {
      if (fieldName === 'orderdisp') {
         if (!base.oehdrAddVisibleList.includes(fieldName)) {
            if (base.oehdrAddVisibleList) {
               base.oehdrAddVisibleList += base.DELIMITER_COMMA;
            }
            base.oehdrAddVisibleList += fieldName;
         }
      } else {
         //slsrepin and slsrepout get removed from the list when modified
         base.oehdrAddVisibleList = base.oehdrAddVisibleList.replace(fieldName, '');
      }
   };

   self.originalPromiseDateChanged = function () {
      base.oehdr.promisedt = base.oehdr.origpromisedt;
   };

   self.assignDefaultWarehouse = function () {
      if (base.oehdr.custno) {
         var params = {
            custno: base.oehdr.custno,
            shipto: base.oehdr.shipto || 0
         };
         DataService.get('api/oe/asoeheader/loadoebannerwarehouse/{custno}/{shipto}', { pathParams: params }, function (data) {
            if (data.cWhse) {
               if (base.oehdr.whse !== data.cWhse) {
                  base.oehdr.whse = data.cWhse;
                  self.warehouseSelected(null, base.oehdr.whse);
               }
            }

            if (base.defaultWarehouseSetting === 'Ship To') {
               base.oehdr.custpo = data.cCustPo;
            } else {
               if (data.cCustPo) {
                  base.oehdr.custpo = data.cCustPo;
               }
            }
         });
      } else {
         base.oehdr.whse = '';
      }
   };

   self.getDuplicateCustPoList = function (duplicateCustPoRequired) {
      if (duplicateCustPoRequired === 'w') {
         var dupCustPoCriteria = {
            custno: base.oehdr.custno,
            custpo: base.oehdr.custpo,
            transtype: base.oehdr.oetype,
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf
         };
         DataService.post('api/oe/asoeentry/oeetdupcustpogetlist', { data: dupCustPoCriteria, busy: true }, function (data) {
            if (data && data.length) {
               Utils.replaceArray(self.duplicateCustomerPoOrders, data);
               ModalService.showModal('oe/oeet/initiate/create/duplicate-customer-po-create.json', 'OeetDuplicatePoCreateModalCtrl as dcpo', $scope, function (modal) {
                  self.duplicatePoModal = modal;
               });
            } else {
               self.takenByRequiredCheck();
            }
         });
      } else {
         self.takenByRequiredCheck();
      }
   };

   self.takenByRequiredCheck = function () {
      if (base.sasoo.reqtakenfl) {
         $state.go(base.baseState + '.initiate.takenBy');
      } else {
         self.orderTypeValidation();
      }
   };

   self.orderTypeArray = ['rm', 'do', 'qu', 'bl', 'st', 'fo', 'cr'];
   self.orderTypeValidation = function () {
      if (self.orderTypeArray.indexOf(base.oehdr.oetype) !== -1) {
         var defaultOrderMode = JSLINQ(base.defaultWebSettings).Where(function (webSetting) { return webSetting.settingname === 'DefaultOrderMode'; }) || [];
         if (defaultOrderMode.items.length > 0) {
            self.defaultOrderMode = defaultOrderMode.items[0].settingvalue;
         }
         base.oehdr.lumppricefl = self.defaultOrderMode !== 'e';
      }
      switch (base.oehdr.oetype.toLowerCase()) {
         case 'rm': //return
         case 'cr': //correction
            self.invoiceNumberCheck();
            self.autoApplyCreditCheck();

            $state.go(base.baseState + '.initiate.correctionReturn');
            break;
         case 'do': //direct
            self.setupAndNavToDirectOrderSourcing();
            break;
         case 'qu': //quote
            if (base.lostBusinessQuote) {
               $state.go(base.baseState + '.initiate.quote');
            } else {
               self.checkFloorplanning();
            }
            break;
         case 'bl': //blanket
            $state.go(base.baseState + '.initiate.blanket');
            break;
         case 'st': //standing
            $state.go(base.baseState + '.initiate.standing');
            break;
         case 'fo': //future
            $state.go(base.baseState + '.initiate.future');
            break;
         default:
            self.checkFloorplanning();
            break;
      }
   };

   self.setupAndNavToDirectOrderSourcing = function () {
      var lineTieTypeCriteria = {
         runmode: 'banner',
         ourproc: Constants.MENU_FUNCTION_OEET,
         whse: base.oehdr.whse,
         transtype: base.oehdr.oetype
      };
      DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
         if (data) {
            self.orderTypes = base.getOrderTypesFromTieDropdownData(data);

            base.orderTieHeader = {
               orderdisp: base.oehdr.orderdisp,
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               ourproc: Constants.MENU_FUNCTION_OEET,
               runmode: 'banner',
               transtype: base.oehdr.oetype,
               whse: base.oehdr.whse
            };
            var lineTieRetrieveRequest = {
               oeline: {},
               oelinelinetiehdr: base.orderTieHeader
            };
            DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
               if (data) {
                  self.currentOrderTie = data[0];
                  $state.go(base.baseState + '.initiate.directOrder', {
                     oehdr: base.oehdr,
                     tie: 'ino.currentOrderTie',
                     orderTypes: 'ino.orderTypes',
                     sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
                     cancelCallback: self.sourcingCancelCallback,
                     finishCallback: self.sourcingFinishCallback,
                     backCallback: self.sourcingBackCallback,
                     conoForIcWhseAvailCriteria: base.conoForIcWhseAvailCriteria,
                     whseTypeForIcWhseAvailCriteria: base.whseTypeForIcWhseAvailCriteria
                  });
               }
            });
         }
      });
   };

   self.checkFloorplanning = function () {
      //floorplanning
      if (base.oehdr.shipto) {
         var params = {
            custno: base.oehdr.custno,
            shipto: base.oehdr.shipto,
            fldlist: 'fpcustno'
         };

         DataService.get('api/ar/arss/getbypk', { params: params }, function (data) {
            if (data) {
               if (data.fpcustno) {
                  if (base.oehdr.oetype !== 'cs') {
                     base.oehdr.fpcustno = data.fpcustno;
                  }
                  self.floorplanPopupCheck();
               } else {
                  self.createOrder();
               }
            }
         });
      } else if (base.arsc.fpcustno) {
         if (base.oehdr.oetype !== 'cs') {
            base.oehdr.fpcustno = base.arsc.fpcustno;
         }
         self.floorplanPopupCheck();
      } else if (base.oehdr.fpcustno) {
         self.floorplanPopupCheck();
      } else {
         self.createOrder();
      }
   };

   self.floorplanPopupCheck = function () {
      if (base.oehdr.oetype !== 'cs') {
         $state.go(base.baseState + '.initiate.floorplan');
      } else {
         self.createOrder();
      }
   };

   self.sourcingFieldChangedCallback = function (fieldName) {
      var tieLeaveFieldRequest = {
         oeline: {},
         oelinelinetie: self.currentOrderTie,
         oelinelinetiehdr: base.orderTieHeader,
         cFieldName: fieldName
      };
      DataService.post('api/oe/asoeline/oelinelinetieleavefield', { data: tieLeaveFieldRequest, busy: true }, function (data) {
         if (data) {
            if (fieldName !== 'vendno' && (fieldName === 'shipviaty' || fieldName === 'frttermscd') &&
               (self.currentOrderTie.pofrtbillacct !== data.oelinelinetie.pofrtbillacct)) {
               var message = '';
               message += $translate.instant('message.the.freight.bill.account.is.changing.from') + ' ';
               if (self.currentOrderTie.pofrtbillacct) {
                  message += self.currentOrderTie.pofrtbillacct + ' ';
               } else {
                  message += $translate.instant('global.blank.in.parenthesis') + ' ';
               }
               message += $translate.instant('global.to') + ' ';
               if (data.oelinelinetie.pofrtbillacct) {
                  message += data.oelinelinetie.pofrbillacct + '. ';
               } else {
                  message += $translate.instant('global.blank.in.parenthesis') + '. ';
               }
               message += $translate.instant('question.do.you.wish.to.continue');

               MessageService.yesNo('', message,
                  function () {
                     //Yes completed
                     Utils.replaceObject(self.currentOrderTie, data.oelinelinetie);
                  }, null);
            } else {
               Utils.replaceObject(self.currentOrderTie, data.oelinelinetie);
            }
            MessageService.processMessaging(data.messaging);
         }
      });
   };

   self.sourcingCancelCallback = function () {
      //this is by design, we still create the order if they cancel
      $state.go('^');
      self.createOrder();
   };

   self.sourcingBackCallback = function () {
      $state.go('^');
   };

   //User Hook (do not rename)
   self.sourcingFinishCallbackContinue = function (data) {
      $state.go('^');
      self.checkFloorplanning();
   };

   self.sourcingFinishCallback = function () {
      var lineTieValidateRequest = {
         oeline: {},
         oelinelinetie: self.currentOrderTie,
         oelinelinetiehdr: base.orderTieHeader
      };
      DataService.post('api/oe/asoeline/oelinelinetievalidate', { data: lineTieValidateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               base.oehdr.docono = self.currentOrderTie.wtcono;
               base.oehdr.doshipfmno = self.currentOrderTie.shipfmno;
               base.oehdr.dovendno = self.currentOrderTie.vendno;
               base.oehdr.dowhse = self.currentOrderTie.wtwhse;

               base.currentOrderTie = self.currentOrderTie;

               //User Hook (do not rename)
               self.sourcingFinishCallbackContinue(data);
            }
         }
      });
   };

   self.invoiceNumberCheck = function () {
      if (base.oehdr.invno) {
         DataService.get('oeehexistsforcustnoordernumberminimumstage/' + base.oehdr.custno + '/' + base.oehdr.orderno + '/' + base.oehdr.ordersuf + '/3', function (data) {
            if (!data) {
               base.oehdr.invno = 0;
               base.oehdr.invsuf = 0;
            }
         });
      }
   };

   self.autoApplyCreditCheck = function () {
      var autoApplyCredit = AodataService.getValue('OE', 'OEAutoApplyCreditInvoiceFl');
      if (autoApplyCredit) {
         if (autoApplyCredit === "yes") {
            base.oehdr.autoapplycreditfl = true;
         } else {
            base.oehdr.autoapplycreditfl = false;
         }
      } else {
         base.oehdr.autoapplycreditfl = true;
      }
   };

   //User Hook (do not rename)
   self.oeHeaderHandleMessages = function (fulfillmentOrder, data) {

      if (MessageService.processMessaging(data.messaging)) {
         if (fulfillmentOrder) {
            base.oehdr.oetype = 'of';
         }
         if (!$state.is(base.baseState + '.initiate')) {
            $state.go(base.baseState + '.initiate');
         }
         return;
      }
   };

   //User Hook (do not rename)
   self.oeHeaderCreateContinue = function (fulfillmentOrder, data) {

      //User Hook (do not rename)
      self.oeHeaderHandleMessages(fulfillmentOrder, data);

      if (data.iNewOrderNo === 0) {
         if (fulfillmentOrder) {
            base.oehdr.oetype = 'of';
         }

         //If an error came back, it was already presented with the message handler call.  Only if an
         //error message did not get returned, and there wasn't a new Order # should we throw the generic
         //fallback error.
         if (!data.messaging || data.messaging.length === 0) {
            MessageService.error('global.error', 'message.an.error.occurred.while.creating.the.order');
         }
         return;
      } else {
         base.oehdr.orderno = data.iNewOrderNo;
         var params = {
            orderno: base.oehdr.orderno,
            ordersuf: 0,
            fldlist: 'rowpointer,orderno,ordersuf'
         };
         var orderNumber = base.oehdr.orderno.toString() + '-00';
         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true },
            function (data) {
               if (data) {
                  MruService.addToList('OEOrder', data.rowpointer, orderNumber, data.orderno, data.ordersuf);
               }
            });
      }

      RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());

      // Retotal order based on (O)rdered, (S)hipped or (B)oth
      base.calcsob = 'o';
      base.updateLineItems();

      base.inDrillDownOperation = true;

      // for Correction orders OR Direct Orders, only Advanced Line Entry and Return Multiple Line Entry are valid
      if (base.oehdr.oetype === 'cr' || base.oehdr.oetype === 'do' || base.oehdr.oetype === 'rm') {
         if (base.defaultLineEntryState === base.baseState + '.selectProducts' ||
            base.defaultLineEntryState === base.baseState + '.selectProducts.quickLineEntry' ||
            base.defaultLineEntryState === base.baseState + '.selectProducts.shoppingList') {
            base.defaultLineEntryState = base.baseState + '.selectProducts.advancedLineEntry';
         }
      }
      $state.go(base.defaultLineEntryState);
   };

   self.createOrder = function () {
      // Order Fulfillment - fake type of 'OF' in drop down, uses actual type of 'BL' with Fulfullment flag set
      var fulfillmentOrder = false;
      base.oehdr.fulfillmentordfl = false;
      if (base.oehdr.oetype.toLowerCase() === 'of') {
         base.oehdr.fulfillmentordfl = true;
         base.oehdr.oetype = 'bl';
         fulfillmentOrder = true;
      }
      //As like in SL when there is request date entered and promised, originalpromised not entered, replaces these values with requested date.
      if (base.oehdr.reqshipdt) {
         if (!base.oehdr.promisedt) {
            base.oehdr.promisedt = base.oehdr.reqshipdt;
         }
         if (!base.oehdr.origpromisedt) {
            base.oehdr.origpromisedt = base.oehdr.promisedt ? base.oehdr.promisedt : base.oehdr.reqshipdt;
         }
      }

      base.oehdr.visiblelist = base.oehdrAddVisibleList;

      // If the call fails and a 'return' is done - reset the Order Fulfillment 'BL' to 'OF' for the screen display to stay 'OF'
      DataService.post('api/oe/asoeheader/oeheadercreate', { data: base.oehdr, busy: true }, function (data) {
         if (data) {
            //User Hook (do not rename)
            self.oeHeaderCreateContinue(fulfillmentOrder, data);
         }
      });
   };

   self.orderFulfillmentClicked = function () {
      $state.go(base.baseState + '.orderFulfillment', {
         ofFunctionName: 'oeet-hdr',
         ofOrderNo: '',
         ofOrderSuf: '',
         ofLineNo: ''
      });
   };
});

app.controller('OeetDuplicatePoCreateModalCtrl', function ($scope, $translate) {
   var self = this;
   var base = $scope.base;
   var ino = $scope.ino;

   self.messageAboveGrid = function () {
      return $translate.instant('message.the.following.orders.with.the.same.customer.po') + base.oehdr.custpo + $translate.instant('message.parenthesis.have.been.found');
   };

   self.messageBelowGrid = function () {
      return $translate.instant('question.proceed.with.duplicate.customer.purchase.order.num');
   };

   self.navigateToOrder = function (e, args) {
      var order = args[0].item;
      base.navToOrderInquiry(order.orderno, order.ordersuf);
      ino.duplicatePoModal.destroy();
   };

   self.ok = function () {
      ino.takenByRequiredCheck();
      ino.duplicatePoModal.destroy();
   };

   self.cancel = function () {
      base.oehdr.custpo = '';
      ino.duplicatePoModal.destroy();
   };
});

app.controller('OeetTakenByCtrl', function ($state, $scope, DataService) {
   var self = this;
   var base = $scope.base;

   self.type = '';

   self.submit = function () {
      var operValidate = {
         cono: base.sasoo.cono,
         operinit: self.operator,
         password: self.password,
         tenderty: self.type
      };
      DataService.post('api/shared/assharedentry/operatorvalidate', { data: operValidate, busy: true }, function () {
         base.selectedTakenByType = self.type; //set taken by type on base for use in particular use cases later in OEET
         $scope.base.oehdr.takenby = self.operator;
         $scope.ino.orderTypeValidation();
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetCorrectionReturnCtrl', function ($state, $scope, $translate, DataService, AuthService, MessageService, Constants, AodataService) {
   var self = this;
   var base = $scope.base;

   self.taxInterfaceType = AodataService.getValue('TAX', 'TaxInterfaceTy');

   //This needs to be a string for the ARET Dynamic Lookups to work.
   self.transCode = 0;
   self.invoiceStatusActive = true;

   if (base.oehdr.autoapplycreditfl) {
      self.isInvoiceLookupVisible = true;
   }
   else {
      self.isInvoiceLookupVisible = false;
      self.stagecd = ["4", "5"];
      self.orderTypes = ['do', 'br', 'so', 'cs'];
   }

   if (base.oehdr.orderno) {
      self.title = $translate.instant('global.maintain.order');
   } else {
      self.title = $translate.instant('global.create.order');
   }

   if (base.oehdr.oetype === 'cr') {
      self.subTitle = $translate.instant('global.correction');
   } else if (base.oehdr.oetype === 'rm') {
      self.subTitle = $translate.instant('global.return.merchandise');
   }

   self.invoiceNumberChanged = function (args) {
      if (args.value > 0) {
         base.oehdr.invno = args.value;
         base.oehdr.invsuf = args.value2;
      } else {
         base.oehdr.invno = '';
         base.oehdr.invsuf = '';
      }
   };

   self.autoApplyFlagChanged = function () {
      if (!base.oehdr.autoapplycreditfl) {
         self.invoiceStatusActive = '';
         self.isInvoiceLookupVisible = false;
         self.stagecd = ["4", "5"];
         self.orderTypes = ['do', 'br', 'so', 'cs'];
      }
      else {
         self.invoiceStatusActive = true;
         self.isInvoiceLookupVisible = true;
      }
   };

   self.submit = function () {
      if (base.oeetAuthInfo && base.oehdr.crreasonty) {
         var reason;
         for (var i = 0; i < base.oeetAuthInfo.length; i++) {
            var currentSastaAuthInfo = base.oeetAuthInfo[i];
            if (currentSastaAuthInfo.codeval === base.oehdr.crreasonty &&
               (currentSastaAuthInfo.reqauthfl === 'yes' || currentSastaAuthInfo.reqinvfl === 'yes') || currentSastaAuthInfo.reqinvcrfl === 'yes') {
               reason = currentSastaAuthInfo;
               break;
            }
         }
         if (reason) {
            if (reason.reqauthfl === 'yes') {
               AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'reqauthfl', 'a', '', null, self.returnAuthPointPassed, self.returnAuthPointFailed);
            } else if (reason.reqinvfl === 'yes' && !base.oehdr.invno && base.oehdr.oetype === 'rm') {
               AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'reqinvfl', 'a', '', null, self.returnAuthPointPassed, self.returnAuthPointFailed);
            } else {
               self.creditRebillCheck();
            }
         } else {
            self.creditRebillCheck();
         }
      } else {
         self.creditRebillCheck();
      }
   };

   self.creditRebillCheck = function () {
      //need to check if the Correction order Return Reason has Credit/Rebill checked, if so, only Advanced Line Entry is available
      if (base.oehdr.oetype === 'cr' && base.oehdr.crreasonty) {
         var criteria = {
            sasttcodes: {
               codeid: 'M',
               codeval2fl: 'n',
               desclabel: 'Description',
               descrip: 'Return Adjust Reason',
               dsecsize: '24',
               extendedfl: 'y',
               fieldlabel: 'Reason',
               fieldlabel2: 'Reason',
               fieldsize: '2',
               feildsize2: '2',
               fieldtype: 'a',
               fieldtype2: 'a',
               filename: 'a',
               multlangfl: 'n',
               pricefl: 'm',
               userfield: '',
               vendfl: 'n'
            },
            sasttsearchcriteria: {
               codechar: '',
               codeint: 0,
               vendno: 0,
               codechar2: '',
               codelog2: false,
               descrip: '',
               userfield: ''
            }
         };
         DataService.post('api/sa/assasetup/sasttloadtabledata', { data: criteria, busy: true }, function (data) {
            if (data) {
               var selectedSasttM;
               data.forEach(function (sasttM) {
                  if (sasttM.codeval === base.oehdr.crreasonty) {
                     selectedSasttM = sasttM;
                  }
               });
               if (selectedSasttM) {
                  DataService.post('api/sa/assasetup/sasttloadsasta', { data: selectedSasttM, busy: true }, function (sasttsasta) {
                     if (sasttsasta) {
                        base.includeSerialsFl = sasttsasta.crserialfl.toLowerCase() === 'yes' ? true : false;
                        var aoSerialValue = AodataService.getValue('OE', 'OECreditRebillSerRebFl');
                        base.aoSerialFlag = aoSerialValue && (aoSerialValue.toLowerCase() === 'both' || aoSerialValue.toLowerCase() === 'serial') ? true : false;
                        if (sasttsasta.creditrebillfl === 'yes') {
                           base.defaultLineEntryState = base.baseState + '.selectProducts.advancedLineEntry';
                           base.isCreditRebillOrder = true;
                        }
                        else {
                           base.isCreditRebillOrder = false;
                        }
                        if (sasttsasta.reqinvcrfl === 'yes') {
                           base.isReqInvCRFl = true;
                           base.hasReqInvCrAuthPass = false;
                           if (!base.oehdr.invno) {
                              AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'correction', 'reqinvcrfl', 'a', '', null, self.returnAuthPointPassedCR, self.returnAuthPointFailed);
                           }
                           else {
                              self.invoiceNumberCheck();
                           }
                        }
                        else {
                           base.isReqInvCRFl = false;
                           self.invoiceNumberCheck();
                        }

                     } else {
                        self.invoiceNumberCheck();
                     }
                  });
               } else {
                  self.invoiceNumberCheck();
               }
            } else {
               self.invoiceNumberCheck();
            }
         });
      } else {
         self.invoiceNumberCheck();
      }
   };

   self.invoiceNumberCheck = function () {
      if (!base.oehdr.invno) {
         MessageService.yesNo('', 'question.invoice.number.is.either.not.active.or.is.zero.wo', self.noInvoiceNumberPopupYes, null);
      } else {
         var crRmPopupRequest = {
            transtype: base.oehdr.oetype,
            custno: base.oehdr.custno,
            shipto: base.oehdr.shipto,
            custpo: base.oehdr.custpo,
            invno: base.oehdr.invno,
            invsuf: base.oehdr.invsuf,
            reason: base.oehdr.crreasonty,
            autoapplycreditfl: base.oehdr.autoapplycreditfl
         };
         DataService.post('api/oe/asoeheader/oeheadercrrmpopupvalidate', {
            data: crRmPopupRequest, busy: true
         }, function (data) {
            if (data) {
               base.oehdr.invsuf = data.invsuf;
               base.oehdr.custpo = data.custpo;

               self.finishedNav();
            }
         });
      }
   };

   self.returnAuthPointPassedCR = function () {
      base.hasReqInvCrAuthPass = true;
      self.returnAuthPointPassed();
   };

   self.returnAuthPointPassed = function () {
      self.invoiceNumberCheck();
   };

   self.returnAuthPointFailed = function () {
      base.oehdr.crreasonty = '';
   };

   self.noInvoiceNumberPopupYes = function () {
      if (base.oehdr.oetype.toLowerCase() === 'cr') {
         var crRmPopupRequest = {
            transtype: base.oehdr.oetype,
            custno: base.oehdr.custno,
            shipto: base.oehdr.shipto,
            custpo: base.oehdr.custpo,
            invno: base.oehdr.invno,
            invsuf: base.oehdr.invsuf,
            reason: base.oehdr.crreasonty,
            autoapplycreditfl: base.oehdr.autoapplycreditfl
         };
         DataService.post('api/oe/asoeheader/oeheadercrrmpopupvalidate', {
            data: crRmPopupRequest, busy: true
         }, function (data) {
            if (data) {
               base.oehdr.invsuf = data.invsuf;
               base.oehdr.custpo = data.custpo;

               self.finishedNav();
            }
         });
      }
      else {
         self.finishedNav();
      }
   };

   self.finishedNav = function () {
      if (base.oehdr.orderno) {
         base.updateOehdr();
         $state.go(base.defaultLineEntryState);
      }
      else {
         $state.go('^');
         $scope.ino.checkFloorplanning();
      }
   };

   self.cancel = function () {
      //this is by design, we still create the order if they cancel
      $state.go('^');
      $scope.ino.checkFloorplanning();
   };

   self.back = function () {
      base.oehdr.invno = '';
      $state.go('^');
   };
});

app.controller('OeetQuoteCtrl', function ($state, $scope) {
   var self = this;

   self.submit = function () {
      $state.go('^');
      $scope.ino.checkFloorplanning();
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetBlanketCtrl', function ($state, $scope, $translate, MessageService) {
   var self = this;
   var base = $scope.base;

   self.submit = function () {
      if (base.oehdr.lumpbillamt && !base.oehdr.lumpbillfl) {
         MessageService.yesNo('', 'question.lump.sum.entered.do.you.wish.to.select.lump.sum.billing', function () {
            //yes callback
            base.oehdr.lumpbillfl = true;
            self.navAndCreate();
         }, function () {
            //no callback
            base.oehdr.lumpbillfl = false;
            self.navAndCreate();
         });
      } else {
         self.navAndCreate();
      }
   };

   self.navAndCreate = function () {
      if (base.oehdr.orderno) {
         base.updateOehdr();
         $state.go(base.defaultLineEntryState);
      } else {
         $state.go('^');
         $scope.ino.checkFloorplanning();
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetStandingCtrl', function ($state, $scope, $translate) {
   // alias => inst
   var self = this;
   var base = $scope.base;

   self.convertToTypes = [{ label: $translate.instant('global.stock.order'), value: false }, { label: $translate.instant('global.direct.order'), value: true }];

   base.oehdr.stordty = false;
   base.oehdr.storddays = 0;

   self.submit = function () {
      $state.go('^');
      if (base.oehdr.stordty) {
         $scope.ino.setupAndNavToDirectOrderSourcing();
      } else {
         $scope.ino.checkFloorplanning();
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetFutureCtrl', function ($state, $scope) {
   var self = this;

   self.submit = function () {
      $state.go('^');
      $scope.ino.checkFloorplanning();
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetFloorplanCtrl', function ($state, $scope, DataService) {
   // alias => infp
   var self = this;
   var base = $scope.base;
   var ino = $scope.ino;

   self.floorplanSelected = false;

   self.floorplanCustomerChanged = function () {
      if (base.oehdr.fpcustno) {
         var floorPlan = {
            fpcustno: base.oehdr.fpcustno,
            invno: base.oehdr.invno,
            invsuf: base.oehdr.invsuf,
            floorplanfl: true
         };

         DataService.post('api/oe/asoeheader/oefloorplanupdate', { data: floorPlan, busy: true }, null, function errorCallback() {
            //if errors, reset the the base.oehdr.fpcustno
            base.oehdr.fpcustno = 0;
         });
      }
   };

   self.submit = function () {
      if (!self.floorplanSelected) {
         base.oehdr.fpcustno = 0;
      } else {
         if (!base.oehdr.fpcustno) {
            //keep the user here because if it's a floorplan order they need to enter a floorplan customer
            return;
         }
      }

      if (base.oehdr.fpcustno) {
         var params = { custno: base.oehdr.fpcustno };
         DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               base.financedThrough = data.custno + ' - ' + data.name;
               if (base.oehdr.termstype === base.origTerms) {
                  // if default terms not overridden - use fpcustno terms
                  base.oehdr.termstype = data.termstype;
               }
               $state.go('^');
               ino.createOrder();
            }
         });
      } else {
         $state.go('^');
         ino.createOrder();
      }
   };

   self.back = function () {
      base.oehdr.fpcustno = 0;
      $state.go('^');
      // Return Merchandise, Correction, and Quote Orders must be created at this point
      if (base.oehdr.oetype === 'rm' || base.oehdr.oetype === 'cr' || base.oehdr.oetype === 'qu') {
         ino.createOrder();
      }
   };
});