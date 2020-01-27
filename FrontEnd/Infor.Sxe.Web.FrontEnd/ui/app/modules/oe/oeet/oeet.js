'use strict';

app.controller('OeetBaseCtrl', function ($scope, $state, $translate, AodataService, ContextService, DataService, GlobalValueService, MessageService, SecurityService, RecoveryService, ModalService, UserService, ReportService, Utils, Sasoo, Sasc, Sasa, PvUser, Constants, TabService, ImageService, AuthService, UtilsData) {
   //alias => base
   var self = this;
   self.MISC_CUSTOMER = 999999999999;
   self.CONTACTS_CONTACTYPE_CUSTOMER = 'arsc';
   self.DELIMITER_COMMA = ',';

   // Get numbered base state (oeet, oeet2, etc.) and use it within this scope of oeet
   self.baseState = TabService.getBaseStateName($scope);
   self.allowEntryLayout = PvUser.entryLayout;
   self.sasoo = Sasoo;
   self.sasc = Sasc;
   self.sasa = Sasa;
   self.pvUser = PvUser;
   self.menuSecurity = SecurityService.getSecurityLevel('oeet');
   self.subMenuSecurity = SecurityService.getSubSecurityLevel('oeet', 'Collect Payment');
   self.subMenuSecurityTaxesandTotals = SecurityService.getSubSecurityLevel('oeet', 'Review Taxes and Totals');
   self.isTaxesandTotalsEnabled = false;
   self.isAddOrderMode = true;
   self.isCreditRebillFl = false;
   self.substitutesCount = 0;
   self.isMoveLineVisible = true;
   //hydrated after the order is created/retrieved
   self.oehdr = {};
   self.orderTotals = {};
   self.lineItems = [];
   self.itemsList = [];
   self.orderTieHeader = {};
   self.currentOrderTie = {};
   self.lineTypesToShow = 'c,t';
   self.inDrillDownOperation = false;
   self.parameterCustno = 0;
   self.isRequireCustomerProd = false;
   self.calcsob = 'b';

   //User Hook (do not rename) - This variable is used by customizations, do not rename.
   self.conoForIcWhseAvailCriteria = UserService.getCono();

   //User Hook (do not rename) - This variable is used by customizations, do not rename.
   self.whseTypeForIcWhseAvailCriteria = 's';   //'s' is No Consignments.

   // Check if ISM is live
   self.isIsmLive = AodataService.getValue("SM", "ismlive");

   // Check if Order Fulfillment is turned on and operator can use it (na = Not Allowed)
   self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';
   self.isFulfillmentTypeFirst = AodataService.getValue("OE", "OEFulfillmentTransPos").toLowerCase() === '1';
   self.isAOConsolFulfillmentOn = AodataService.getValue("OE", "OEFulfillmentBilling").toLowerCase() === 'yes';
   self.isSASOFulfillmentOn = Sasoo.allowfulfillmentty.toLowerCase() !== 'na';

   // Check if Sales Whse is turned on and operator can use it
   self.isSASOSalesWhseOn = Sasoo.oesaleswhsety.toLowerCase() === 'yes';
   self.isAOSalesWhseOn = AodataService.getValue("OE", "OESalesWarehouse").toLowerCase() === 'yes';

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   //Check if Allow Expanded Name/Address
   self.shipToAddrMaxLength = UtilsData.getNameAddressMaxLength();

   // check which version of Taxware is purchased to determine which Geocode lookup to use
   self.taxMethodType = AodataService.getValue('TAX', 'TaxInterfaceTy');

   //These are a couple of values that need to be 'sticky' while the user is logged in.  The setting is
   //shared between OEET, POET, and WTET.
   self.autoPrintDefault = GlobalValueService.get('Global.AutoPrint') || false;
   self.useWhereAppropriateDefault = GlobalValueService.get('Global.UseWhereAppropriate') || false;

   var retreiveWebSettingRequest = {
      cFunctionName: 'OEET',
      cScreenName: 'DefaultsH5',
      cSettingName: ''
   };
   DataService.post('api/shared/assharedentry/retrievewebsetting', { data: retreiveWebSettingRequest, busy: true }, function (data) {
      if (data) {
         self.defaultWebSettings = data;
         self.setDefaultWebSettings();
         // create order header object
         self.resetOehdr();

         if (self.parameterCustno) {
            self.oehdr.custno = self.parameterCustno;
         }
         self.setCanFinishWithoutTendering();
      }
   });

   self.setDefaultWebSettings = function () {
      //set defualt settings on scope fields that can be accessed by views
      self.defaultWebSettings.forEach(function (webSetting) {
         switch (webSetting.settingname) {
            case 'DefaultWarehouse':
               if (webSetting.settingvalue) {
                  self.defaultWarehouseSetting = webSetting.settingvalue;
               }
               break;
            case 'DefaultOrderMode':
               if (webSetting.settingvalue) {
                  if (webSetting.settingvalue === 'c') { //maintain mode
                     $state.go(self.baseState + '.maintain');
                  } else if (webSetting.settingvalue === 'd') { // cancel mode
                     $state.go(self.baseState + '.delete');
                  }

                  self.defaultOrderMode = webSetting.settingvalue;
               }
               break;
            case 'DefaultOrderType':
               if (webSetting.settingvalue) {
                  self.defaultOrderType = webSetting.settingvalue;

                  if (self.sasc.tenderfl && self.oehdr.oetype === 'cs') {
                     self.canFinishWithoutTendering = false;
                  } else {
                     self.canFinishWithoutTendering = true;
                  }
               } else {
                  if (self.isFulfillmentTypeFirst && self.isOrderFulfillmentOn && self.isSASOFulfillmentOn) {
                     self.defaultOrderType = 'of';
                  } else {
                     self.defaultOrderType = 'so';
                  }
                  self.canFinishWithoutTendering = true;
               }
               break;
            case 'OrderTypeRestricted':
               self.isOrderTypeDisabled = webSetting.settingvalue && webSetting.settingvalue.toLowerCase() === 'yes';
               break;
            case 'HideMarginInTotals':
               self.isMarginVisible = !(!!webSetting.settingvalue && webSetting.settingvalue);
               break;
            case 'AltProdWorkflow':
               if (webSetting.settingvalue) {
                  // Display or Interrupt
                  if (webSetting.settingvalue.toLowerCase() === 'd' ||
                     webSetting.settingvalue.toLowerCase() === 'i') {
                     self.isDisplayWorkFlowAltProd = true;
                  } else {
                     self.isDisplayWorkFlowAltProd = false;
                  }
               } else {
                  self.isDisplayWorkFlowAltProd = false;
               }
               break;
            case 'DefaultLineEntryMode':
               switch (webSetting.settingvalue) {
                  case 'e': //easy - default
                  default:
                     self.defaultLineEntryState = self.baseState + '.selectProducts';
                     break;
                  case 'a': //advanced
                     self.defaultLineEntryState = self.baseState + '.selectProducts.advancedLineEntry';
                     break;
                  case 'q': //quick
                     self.defaultLineEntryState = self.baseState + '.selectProducts.quickLineEntry';
                     break;
                  case 's': //shopping list
                     self.defaultLineEntryState = self.baseState + '.selectProducts.shoppingList';
                     break;
                  case 'r': //return multiple
                     self.defaultLineEntryState = self.baseState + '.selectProducts.returnMultipleLines';
                     break;
               }
               break;
            case 'EasyDefaultQuantity':
               self.easyDefaultQuantity = webSetting.settingvalue ? parseFloat(webSetting.settingvalue).toFixed(2) : 0.00;
               break;
            case 'LostBusinessWithQuote':
               self.lostBusinessQuote = webSetting.settingvalue === 'true';
               break;
            case 'SkipMaintainHeaderFields':
               self.skipMaintainHeader = webSetting.settingvalue === 'true';
               break;
            case 'CheckNonStandProdsInEasyQuick':
               self.checkNonStandProdsInEasyQuick = webSetting.settingvalue === 'true';
               break;
            case 'ShowIntlApproval':
               self.isIntlApprovalVisible = !!webSetting.settingvalue && webSetting.settingvalue;
               break;
            case 'SignatureCaptureEnabled':
               self.isSignatureCaptureVisible = !!webSetting.settingvalue && webSetting.settingvalue;
               break;
            default:
               break;
         }
      });

      //once we've set all the settings that have been returned, set the ones that aren't already set and are required
      if (!self.defaultWarehouseSetting) {
         self.defaultWarehouseSetting = 'Home';
      }
      if (!self.defaultOrderMode) {
         self.defaultOrderMode = 'a';
      }
      if (!self.defaultOrderType) {
         if (self.isFulfillmentTypeFirst && self.isOrderFulfillmentOn && self.isSASOFulfillmentOn) {
            self.defaultOrderType = 'of';
         } else {
            self.defaultOrderType = 'so';
         }
         self.canFinishWithoutTendering = true;
      }
      if (!self.defaultLineEntryState) {
         self.defaultLineEntryState = self.baseState + '.selectProducts';
      }
      if (!self.easyDefaultQuantity) {
         self.easyDefaultQuantity = 0.00;
      }

      //User Hook (do not rename)
      if (self.setDefaultWebSettingsContinue) {
         self.setDefaultWebSettingsContinue();
      }
   };

   //set oehdr.visiblelist change fields
   var baseOehdrVisibleList = 'shipvia' + self.DELIMITER_COMMA + 'terms' + self.DELIMITER_COMMA + 'custpo';
   self.oehdrAddVisibleList = baseOehdrVisibleList;
   self.oehdrAddVisibleList += self.DELIMITER_COMMA + 'promisedt';
   self.oehdrAddVisibleList += self.DELIMITER_COMMA + 'origpromisedt';
   self.oehdrAddVisibleList += self.DELIMITER_COMMA + 'reqshipdt';

   //Save off copy for subsequent Orders, so we can reset the List of base fields.
   self.saveOehdrAddVisibleList = self.oehdrAddVisibleList;

   self.oehdrEditVisibleList = baseOehdrVisibleList;

   //get oeet settings orderEntry(oeao) and oeLine
   DataService.get('api/oe/oeao/getbypk', { busy: false }, function (data) {
      if (data) {
         self.orderEntrySettings = data;
      }
   });
   DataService.get('api/oe/asoelineextra/loadoelinesettings', { busy: false }, function (data) {
      if (data) {
         self.oelineSettings = data;
      }
   });

   //get auth info
   DataService.get('api/sa/assainquiry/sastaauthinfolookup/m', function (data) {
      if (data) {
         self.oeetAuthInfo = data;
      } else {
         self.oeetAuthInfo = [];
      }
   });

   //signature capture verify
   self.signatureCaptureEnabled = true;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      readyCallback: 'base.journalReady',
      criteria: {
         currproc: Constants.MENU_FUNCTION_OEET,
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'oe',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.journalReady = function () {
      if (self.isJournalRecovery) {
         self.recoverJournal();
      }
   };

   self.recoverJournal = function () {
      self.journalControl.recoverJournal(self.journalOptions.criteria.jrnlno);

      self.sidebarCollapsed = false;
   };

   self.resetOehdr = function () {
      var newOehdr = {};
      self.orderTenderedAmount = null;
      self.amountDue = null;
      self.chargeRemainingToAccount = null;
      self.isChargeRemainingToAccountAsked = false;
      self.nonStockStickyData = {};
      newOehdr.oetype = self.defaultOrderType;
      newOehdr.origincdenabled = true;
      newOehdr.approvty = newOehdr.oetype === 'rm' ? Sasc.oeretapprty : Sasc.oeapprty;
      Utils.replaceObject(self.oehdr, newOehdr);

      self.inDrillDownOperation = false;
      //This piece of code added to set the canFinishWithoutTendering flag when Ordet type in Orderentrydefaults is set to Counter sale
      if (self.oehdr.oetype) {
         self.setCanFinishWithoutTendering();
      }
   };

   self.isInitiate = function () {
      return $state.is(self.baseState + '.initiate');
   };

   self.includesInitiate = function () {
      return $state.includes(self.baseState + '.initiate');
   };

   self.isSelectProducts = function () {
      return $state.is(self.baseState + '.selectProducts');
   };

   self.includesSelectProducts = function () {
      return $state.includes(self.baseState + '.selectProducts');
   };

   self.isTaxesAndTotals = function () {
      return $state.is(self.baseState + '.taxesAndTotals');
   };

   self.includesTaxesAndTotals = function () {
      return $state.includes(self.baseState + '.taxesAndTotals');
   };

   self.isCollectPayment = function () {
      return $state.is(self.baseState + '.collectPayment');
   };

   self.includesCollectPayment = function () {
      return $state.includes(self.baseState + '.collectPayment');
   };

   self.delimitedOrderNumber = function () {
      if (self.oehdr.orderno) {
         return self.oehdr.orderno + '-' + Utils.pad(self.oehdr.ordersuf, 2);
      }
      return "";
   };

   self.getCustomerNumberForContact = function () {
      if (self.oehdr && self.oehdr.custno) {
         return self.oehdr.custno;
      } else {
         return 0;
      }
   };

   self.getStage = function () {
      if (self.includesInitiate()) {
         return 1;
      } else if (self.includesSelectProducts()) {
         return 2;
      } else if (self.includesTaxesAndTotals()) {
         return 3;
      } else if (self.includesCollectPayment()) {
         return 4;
      } else {
         return 1;
      }
   };

   self.oetypeDisplay = function () {
      if (self.oehdr.oetype) {
         switch (self.oehdr.oetype.toLowerCase()) {
            case 'rm': //return
               return $translate.instant('global.return');
            case 'cr': //correction
               return $translate.instant('global.correction');
            case 'do': //direct
               return $translate.instant('global.direct');
            case 'qu': //quote
               return $translate.instant('global.quote');
            case 'bl': //blanket
               if (self.oehdr.fulfillmentordfl) {
                  return $translate.instant('global.fulfillment.order');
               } else {
                  return $translate.instant('global.blanket');
               }
            case 'st': //standing
               return $translate.instant('global.standing');
            case 'fo': //future
               return $translate.instant('global.future');
            case 'so': //stock
               if (self.oehdr.fulfillmenttiedfl) {
                  return $translate.instant('global.fulfillment.tied.order');
               } else {
                  return $translate.instant('global.stock');
               }
            case 'cs': //counter sale
               return $translate.instant('global.counter.sale');
         }
      }
   };

   self.isOrderCreated = function () {
      return self.oehdr.orderno !== 0;
   };

   self.getOrderTotals = function (callback) {
      var criteria = {
         maint: self.isAddOrderMode,
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.ordersuf,
         calcsob: "b" // Both ordered and shipped totals
      };
      DataService.post('api/oe/asoeinquiry/oecalculateordshptotals', { data: criteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.orderTotals, data);

            if (callback) {
               callback();
            }
         }
      });
   };

   self.getOehdr = function () {
      var headerRetrieveCriteria = {
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.ordersuf,
         maintmode: self.isAddOrderMode,
         updatetype: 'retrieve-tot'
      };
      DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.oehdr, data.oehdr);
               self.setOriginalValues();
               self.setCanFinishWithoutTendering();
            }

            //User Hook (do not rename)
            if (self.oeHeaderRetrieveContinue) {
               self.oeHeaderRetrieveContinue(data);
            }
         }
      });
   };

   self.updateOehdr = function (callback) {
      var headerUpdateRequest = {
         oehdr: self.oehdr,
         lMaintMode: false
      };
      DataService.post('api/oe/asoeheader/oeheaderupdate', { data: headerUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (callback) {
               callback();
            }
         }
      });
   };

   self.getOrderData = function (callback, secondaryCallback) {
      //build request without lines criteria (backend WILL NOT run line update logic or return line data)
      var getOrderDataRequest = {
         oecalcordshptotcriteria: {
            maint: self.isAddOrderMode,
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            calcsob: self.calcsob // Expected to be (B)oth ordered and shipped totals
         },
         oeheaderretrievecriteria: {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            maintmode: self.isAddOrderMode,
            updatetype: 'retrieve-tot'
         },
         oeiolinescriteria: {}
      };
      self.executeGetOrderData(getOrderDataRequest, false, callback, null, secondaryCallback);
   };

   /*Passed Variables:
   1) Callback: function to call after
   2) debitLineNo: Line to update when doing correction
   3) updateType: addSingle, addMultiple, updateSingle, updateMultiple
   4) fromLineNo: If single, then it's the line to update or add. If mutiple, it's the beginning value to add
   5) toLineNo: Last value in multiple
   6) noComments: Set to true if you do not want comments be returned*/
   self.updateLineItems = function (callback, debitLineNo, updateType, fromLineNo, toLineNo, noComments) {
      //build request including lines criteria (backend WILL run line update logic and return line data)
      var getOrderDataRequest = {
         oecalcordshptotcriteria: {
            maint: self.isAddOrderMode,
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            calcsob: self.calcsob // Expected to be just (O)rdered totals
         },
         oeheaderretrievecriteria: {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            maintmode: self.isAddOrderMode,
            updatetype: 'retrieve-tot'
         },
         oeiolinescriteria: {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            showlines: !noComments ? self.lineTypesToShow : "",
            fromlineno: fromLineNo,
            tolineno: toLineNo,
            updatetype: updateType
         }
      };
      self.executeGetOrderData(getOrderDataRequest, true, callback, debitLineNo);
   };

   self.executeGetOrderData = function (getOrderDataRequest, isUpdatingLines, callback, debitLineNo, secondaryCallback) {
      DataService.post('api/oe/asoelineextra/oegetorderdata', { data: getOrderDataRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               var arscparams = {
                  custno: data.oehdr.custno
               };
               DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (customerData) {
                  self.arsc = customerData;

                  //set new line items ONLY if we're updating them
                  if (isUpdatingLines) {
                     if (getOrderDataRequest.oeiolinescriteria.fromlineno) {
                        switch (getOrderDataRequest.oeiolinescriteria.updatetype) {
                           case 'addSingle':
                           case 'addMultiple':
                              data.oeiolinesresults.forEach(function (line) {
                                 //add line(s) to line items collection
                                 self.lineItems.push(line);
                                 //add line(s) to "cart" collection
                                 if (line.specnstype !== 'i' && line.specnstype !== 'e' && line.specnstype !== 't' && line.specnstype !== 'l') {
                                    self.itemsList.push(line);
                                 }
                              });
                              //get images for new product(s)
                              ImageService.getImages(data.oeiolinesresults, 'icsw', 'shipprod');
                              break;
                           case 'updateSingle':
                              var getImages = false;
                              //add line(s) to line items collection
                              var lineItemMatchIndex = self.lineItems.findIndex(function (line) {
                                 if (line.actllineno === data.oeiolinesresults[0].actllineno) {
                                    getImages = line.shipprod !== data.oeiolinesresults[0].shipprod;
                                    return true;
                                 }
                              });
                              self.lineItems.splice(lineItemMatchIndex, 1, data.oeiolinesresults[0]);
                              //add line(s) to "cart" collection
                              var itemListMatchIndex = self.itemsList.findIndex(function (line) {
                                 return line.actllineno === data.oeiolinesresults[0].actllineno;
                              });
                              self.itemsList.splice(itemListMatchIndex, 1, data.oeiolinesresults[0]);
                              //get images for new product(s)
                              if (getImages) {
                                 ImageService.getImages(data.oeiolinesresults[0], 'icsw', 'shipprod');
                              }
                              break;
                           case 'updateMultiple':
                              //add line(s) to line items collection
                              var firstLineItemMatchIndex = self.lineItems.findIndex(function (line) {
                                 return line.actllineno === getOrderDataRequest.oeiolinescriteria.fromlineno;
                              });
                              //no match found, which means we must be moving the line up one, search for the next actllineno
                              if (firstLineItemMatchIndex === -1) {
                                 firstLineItemMatchIndex = self.lineItems.findIndex(function (line) {
                                    return line.actllineno === getOrderDataRequest.oeiolinescriteria.fromlineno + 1;
                                 });
                              }
                              //if still no match, something is very wrong... get the entire list fresh
                              if (firstLineItemMatchIndex === -1) {
                                 self.calcsob = 'o';
                                 self.updateLineItems(callback);
                                 return;
                              }

                              var reSort = firstLineItemMatchIndex + data.oeiolinesresults.length < self.lineItems.length;
                              var newLineItems = self.lineItems.slice(0, firstLineItemMatchIndex);
                              newLineItems = newLineItems.concat(data.oeiolinesresults);
                              if (reSort) {
                                 var backLineItems = self.lineItems.slice(firstLineItemMatchIndex + data.oeiolinesresults.length);
                                 newLineItems = newLineItems.concat(backLineItems);
                                 newLineItems.sort(function (a, b) {
                                    return a.actllineno - b.actllineno;
                                 });
                              }
                              Utils.replaceArray(self.lineItems, newLineItems);

                              self.setItemsList();
                              break;
                           default:
                              MessageService.error('global.error', 'Invalid UpdateType, unable to update Line Items.');
                              break;
                        }
                        //update "cart" label
                        self.prodSidebarLabel = $translate.instant('global.products') + ' (' + self.itemsList.length + ')';
                     } else {
                        Utils.replaceArray(self.lineItems, data.oeiolinesresults);
                        self.setItemsList();
                     }
                  }
                  //set new order totals
                  Utils.replaceObject(self.orderTotals, data.oecalcordshptotresults);
                  //set new header
                  Utils.replaceObject(self.oehdr, data.oehdr);
                  self.setOriginalValues();

                  //check for force serial/lot popup
                  if (self.forceSerLotLineList) {
                     self.forceSerialLotCheck();
                  }

                  if (callback) {
                     if (debitLineNo > 0) {
                        $state.go(self.baseState + '.selectProducts.advancedLineEntry', { lineNo: debitLineNo }, { reload: self.baseState + '.selectProducts.advancedLineEntry' });
                     }
                     else {
                        callback(secondaryCallback);
                     }
                  }

                  //User Hook (do not rename)
                  if (self.oeGetOrderDataContinue) {
                     self.oeGetOrderDataContinue(data);
                  }

               });
            }
         }
      });
   };

   self.setOriginalValues = function () {
      self.originalPromiseDate = self.oehdr.promisedt;
      self.originalRequiredShipDate = self.oehdr.reqshipdt;
      self.originalOriginalPromiseDate = self.oehdr.origpromisedt;
   };

   self.setCanFinishWithoutTenderingOrderFinish = function () {
      if (self.oehdr && (self.oehdr.oetype && self.oehdr.oetype.toLowerCase() === 'cs') && (self.oehdr.approvty && self.oehdr.approvty.toLowerCase() === 'h')) {
         self.canFinishWithoutTendering = false;
      }
   }

   self.setCanFinishWithoutTendering = function () {
      if (self.sasc.tenderfl && self.oehdr.oetype.toLowerCase() === 'cs') {
         self.canFinishWithoutTendering = false;
      } else {
         self.canFinishWithoutTendering = true;
      }
      if (self.arsc) {
         var arsgParams = {
            groupid: self.arsc.groupid,
            fldlist: 'selltype'
         };
         DataService.get('api/ar/arsg/getbypk', { params: arsgParams }, function (arsg) {
            if (arsg && arsg.selltype === 'c') {
               self.canFinishWithoutTendering = false;
            } else if (self.arsc.selltype === 'c') {
               self.canFinishWithoutTendering = false;
            }
         });
      }

      self.setCanFinishWithoutTenderingOrderFinish();
   };

   self.setItemsList = function () {
      //remove comments/sub-total/lost business lines from items list to be displayed in "cart"
      var newItemsList = [];
      self.lineItems.forEach(function (line) {
         if (line.specnstype !== 'i' && line.specnstype !== 'e' && line.specnstype !== 't' && line.specnstype !== 'l') {
            newItemsList.push(line);
         }
      });
      self.itemsList = newItemsList;
      self.prodSidebarLabel = $translate.instant('global.products') + ' (' + self.itemsList.length + ')';
      ImageService.getImages(self.itemsList, 'icsw', 'shipprod');
   };

   self.customerPoChanged = function () {
      if (self.arsc.poreqfl && !self.oehdr.custpo && self.oehdr.oetype !== 'qu') {
         MessageService.info('global.information', 'message.customer.po.number.required');
      }
   };

   self.forceSerialLotCheck = function () {
      var serLotLines = self.forceSerLotLineList.split(',');
      if (serLotLines && serLotLines.length > 0 && serLotLines[0]) {
         var lineRetrieveCriteria = {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            lineno: serLotLines[0],
            maintmode: self.isAddOrderMode,
            readonlyfl: false
         };
         DataService.post('api/oe/asoeline/oelineretrieve', { data: lineRetrieveCriteria, busy: true }, function (data) {
            if (data) {
               if (data.oeline) {
                  if (data.oeline.serlottype.toLowerCase() === 's') {
                     self.forceSerialLine = data.oeline;

                     var oeesList = [
                        {
                           lineno: data.oeline.lineno,
                           orderno: data.line.orderno,
                           ordersuf: data.oeline.ordersuf,
                           shipprod: data.oeline.prod,
                           corechgfl: data.oeline.corechgfl,
                           kitfl: data.oeline.kitfl,
                           serlottype: data.oeline.serlottype,
                           whse: self.oehdr.whse,
                           altwhse: data.oeline.altwhse,
                           qtyord: data.oeline.qtyord,
                           qtyship: data.oeline.qtyship,
                           stkqtyord: data.oeline.stkqtyord,
                           stkqtyship: data.oeline.stkqtyship
                        }
                     ];

                     self.oeesCriteria = {
                        oeesdetaillinelist: oeesList,
                        oeesdetaillinesingle: {},
                        iLineNo: data.oeline.lineno,
                        lIsFromMenu: true
                     };

                     $state.go(self.baseState + '.selectProducts.forceSerial');
                  } else if (data.oeline.serlottype.toLowerCase() === 'l') {
                     self.forceLotLine = data.oeline;

                     var detailLineList = [
                        {
                           lineno: data.oeline.lineno,
                           orderno: data.oeline.orderno,
                           ordersuf: data.oeline.ordersuf,
                           shipprod: data.oeline.prod,
                           corechgfl: data.oeline.corechgfl,
                           kitfl: data.oeline.kitfl,
                           serlottype: data.oeline.serlottype,
                           whse: self.oehdr.whse,
                           altwhse: data.oeline.altwhse,
                           qtyord: data.oeline.qtyord,
                           qtyship: data.oeline.qtyship,
                           stkqtyord: data.oeline.stkqtyord,
                           stkqtyship: data.oeline.stkqtyship
                        }
                     ];

                     self.checkSerLotCriteria = {
                        oeesdetaillinelist: detailLineList,
                        oeesdetaillinesingle: {},
                        iLineNo: data.oeline.lineno,
                        lIsFromMenu: true
                     };
                  }
               }
            }
         });
      }
   };

   self.forceSerialControlReady = function () {
      DataService.post('api/oe/asoeentry/oeesdetaillinecheckserlot', { data: self.oeesCriteria, busy: true }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(data);

            var criteria = {
               icentryserialslist: [],
               icentryserialscriteria: self.icEntrySerialsCriteria
            };

            // Call initialize method on the Shared-Serials-Ctrl
            self.forceSerialsControl.initialize(criteria);
         }
      });
   };

   self.forceSerialControlBack = function () {
      if (self.forceSerialsControl.adjustQtyShip) {
         self.forceSerialLine.qtyship = self.forceSerialsControl.getSelectedRecordCount();

         self.forceSerLotUpdate(self.forceSerialLine);
      } else {
         self.forceSerLotCancel(self.forceSerialLine.lineno);
      }
   };

   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            whse: self.oehdr.whse,
            prod: self.forceSerialLine.prod,
            type: 'oe',
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            lineno: self.forceSerialLine.lineno,
            linenochar: self.forceSerialLine.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: self.forceSerialLine.returnfl,
            origqty: self.forceSerialLine.stkqtyship,
            proofqty: resp.dNoSNLots,
            ordqty: self.forceSerialLine.stkqtyord,
            outqty: self.forceSerialLine.stkqtyship,
            ictype: self.oehdr.oetype,
            cost: self.forceSerialLine.scrncost,
            qtyunavail: self.forceSerialLine.qtyunavail,
            method: '',
            retorderno: self.forceSerialLine.retorderno,
            retordersuf: self.forceSerialLine.retordersuf,
            retlineno: self.forceSerialLine.retlineno,
            returnty: self.forceSerialLine.returnty,
            reasunavty: self.forceSerialLine.reasunavty,
            custno: self.oehdr.custno,
            shipto: self.oehdr.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oeet',
            icspecrecno: ale.oeline.icspecrecno,
            assignoldest: false,
            currproc: 'oeet',
            seqdash: "0",
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.forceSerialLine.proddesc,
            prodnotesfl: ''
         };

         return criteria;
      }
   };

   self.forceLotControlReady = function () {
      DataService.post('api/oe/asoeentry/oeesdetaillinecheckserlot', { data: checkSerLotCriteria, busy: true }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);

            // Call initialize method on the Shared-Lots-Ctrl
            self.forceLotsControl.initialize(self.icEntryLotsCriteria);
         }
      });
   };

   self.forceLotControlBack = function () {
      if (self.forceLotsControl.adjustQtyShip) {
         self.forceLotLine.qtyship = self.forceLotsControl.getSelectedRecordCount();

         self.forceSerLotUpdate(self.forceLotLine);
      } else {
         self.forceSerLotCancel(self.forceLotLine.lineno);
      }
   };

   self.createIcEntryLotsCriteria = function (data) {
      if (data) {
         var criteria = {
            whse: self.oehdr.whse,
            prod: self.forceLotLine.prod,
            type: 'oe',
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            lineno: self.forceLotLine.lineno,
            linenochar: self.forceLotLine.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: self.forceLotLine.returnfl,
            origqty: self.forceLotLine.stkqtyship,
            proofqty: data.dNoSNLots,
            ordqty: self.forceLotLine.stkqtyord,
            outqty: self.forceLotLine.stkqtyship,
            ictype: self.oehdr.oetype,
            cost: self.forceLotLine.scrncost,
            qtyunavail: self.forceLotLine.qtyunavail,
            method: '',
            retorderno: self.forceLotLine.retorderno,
            retordersuf: self.forceLotLine.retordersuf,
            retlineno: self.forceLotLine.retlineno,
            returnty: self.forceLotLine.returnty,
            reasunavty: self.forceLotLine.reasunavty,
            custno: self.oehdr.custno,
            shipto: self.oehdr.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oeet',
            icspecrecno: self.forceLotLine.icspecrecno,
            assignoldest: false,
            currproc: 'oeet',
            seqdash: "0",
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.forceLotLine.proddesc,
            prodnotesfl: ''
         };

         return criteria;
      }
   };

   self.forceSerLotUpdate = function (serLotLine) {
      var lineUpdateRequest = {
         oeline: serLotLine,
         lMaintMode: self.isAddOrderMode,
         cChangeList: 'qtyship'
      };
      DataService.post('api/oe/asoeline/oelineupdate', { data: lineUpdateRequest, busy: true }, function (data) {
         self.forceSerialLotCheck();
         $state.go(self.baseState + '.selectProducts');
      });
   };

   self.forceSerLotCancel = function (serLotLineNo) {
      var cancelChangeCriteria = {
         maintmode: self.isAddOrderMode,
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.orderno,
         lineno: serLotLineNo
      };
      DataService.post('api/oe/asoeline/oelinecancelchange', { data: cancelChangeCriteria, busy: true }, function (data) {
         self.forceSerialLotCheck();
         $state.go(self.baseState + '.selectProducts');
      });
   };

   self.getOrderTypesFromTieDropdownData = function (data) {
      var orderTypes = [];
      for (var i = 0; i < data.length; i++) {
         var currentObj = data[i];
         switch (currentObj.codeval) {
            case 'p':
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.purchase.order') });
               break;
            case 't':
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.warehouse.transfer') });
               break;
            case 'f':
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.value.add') });
               break;
            case 'w':
               orderTypes
                  .push({ value: currentObj.codeval, label: $translate.instant('global.kit.production.work.order') });
               break;
            case 'n':
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.no.sourcing') });
               break;
            case 'a':
               orderTypes.push({
                  value: currentObj.codeval,
                  label: $translate.instant('global.authorized.replenishment.path')
               });
               break;
            default:
               break;
         }
      }
      return orderTypes;
   };

   self.getPrinterSettingsArray = function () {
      var printerSettings = [];
      if (self.autoPrintData) {
         if (self.autoPrintData.ackSettings) {
            printerSettings.push(self.autoPrintData.ackSettings);
         }
         if (self.autoPrintData.invoiceSettings) {
            printerSettings.push(self.autoPrintData.invoiceSettings);
         }
         if (self.autoPrintData.pickTicketSettings) {
            printerSettings.push(self.autoPrintData.pickTicketSettings);
         }
         if (self.autoPrintData.receiptSettings) {
            printerSettings.push(self.autoPrintData.receiptSettings);
         }
         if (self.autoPrintData.deliverySettings) {
            printerSettings.push(self.autoPrintData.deliverySettings);
         }
      }
      return printerSettings;
   };

   self.checkFlushDates = function () {
      if (self.orderEntrySettings.lndtentfl && self.oehdr.orderdisp.toLowerCase() !== 'j' && self.oehdr.nolineitem > 0 &&
         (self.oehdr.promisedt !== self.originalPromiseDate || self.oehdr.reqshipdt !== self.originalRequiredShipDate || self.oehdr.origpromisedt !== self.originalOriginalPromiseDate)) {
         ModalService.showModal('oe/oeet/select-products/flush-dates-modal.json', 'OeetFlushDatesModalCtrl as fdMo', $scope, function (modal) {
            self.flushDatesModal = modal;
         });
      }
   };

   self.editCustShipTo = function () {
      self.finishOrder(true);
   };

   self.isEditShipToVisible = function () {
      //NOTE: We have to trick the visibility based on seeing the shipto address field
      //because the default shipto Address doesn't come in until after they move forward in the workflow.
      //Also, if this is a Misc Customer, then we always show the button regardless of the operator security.
      return (self.oehdr.shiptoaddr1 || self.oehdr.shiptoaddr2 || self.oehdr.shiptoaddr3 || self.oehdr.shiptocity || self.oehdr.shiptost || self.oehdr.shiptozip ||
         self.oehdr.countrycd || self.oehdr.shiptonm) && (Sasoo && Sasoo.shiptofl || self.oehdr && self.oehdr.custno === self.MISC_CUSTOMER);
   };

   self.editShipToAddress = function () {
      if (self.oehdr) {
         ModalService.showModal('oe/oeet/shared/edit-ship-to-address-modal.json', 'OeetEditShipToAddressModalCtrl as esta', $scope, function (modal) {
            self.editShipToAddrModal = modal;
         });
      }
   };

   self.destroyEditShipToAddressModal = function () {
      self.editShipToAddrModal.destroy();
   };

   self.navToOrderInquiry = function (orderno, ordersuf) {
      //if these aren't passed in, then it's assumed we are navigating to the current order
      if (!orderno) {
         orderno = self.oehdr.orderno;
      }
      if (!ordersuf && ordersuf !== 0) {
         ordersuf = self.oehdr.ordersuf;
      }

      $state.go('oeio.detail', { pk: orderno, pk2: ordersuf });
   };

   self.initiate = function () {
      $state.go(self.baseState + '.initiate');
   };

   self.selectProducts = function () {
      $state.go(self.baseState + '.selectProducts');
   };

   self.taxesAndTotals = function () {
      if (self.subMenuSecurityTaxesandTotals > 1) {
         if (self.subMenuSecurityTaxesandTotals > 2) {
            self.isTaxesandTotalsEnabled = true;
         }
         $state.go(self.baseState + '.taxesAndTotals');
      }
   };

   self.collectPayment = function () {
      if (self.subMenuSecurity > 1) {
         $state.go(self.baseState + '.collectPayment');
      } else {
         MessageService.error('global.error', 'error.you.do.not.have.permission.for.this.sub.function');
      }
   };

   self.stageWizardSelectProducts = function () {
      $state.go(self.defaultLineEntryState);
   };

   self.stageWizardTaxesAndTotals = function () {
      self.taxesAndTotals();
   };

   self.stageWizardCollectPayment = function () {
      self.collectPayment();
   };

   self.suspend = function () {
      var report = ReportService.getReportFunction('oeepp');
      var suspendLoadRequest = {
         oeordersuspendglobals: {
            cono: UserService.getCono(),
            operinit: UserService.getUserName()
         },
         oeordersuspendloadcriteria: {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            oeeppsecure: report ? report.securitylevel : 0
         }
      };
      DataService.post('api/oe/asoeheader/oeordersuspendload', { data: suspendLoadRequest, busy: true }, function (data) {
         if (data) {
            self.suspendSingle = data.oeordersuspendsingle;
            self.suspendGlobals = data.oeordersuspendglobals;

            if (self.oehdr.oetype === 'cs') {
               self.suspendSingle.suspendorderchecked = true;
               self.suspendSingle.suspendorderdisabled = true; //adding onto suspendSingle object
            }

            ModalService.showModal('oe/oeet/shared/suspend-order-modal.json', 'OeetSuspendOrderModalCtrl as soMo', $scope, function (modal) {
               self.suspendOrderModal = modal;
            });
         }
      });
   };

   self.processSuspend = function (firstTime, printerSettings) {
      var suspendProcessRequest = {
         oeordersuspendsingle: self.suspendSingle,
         printersettings: printerSettings
      };
      DataService.post('api/oe/asoeheader/oeordersuspendprocess', { data: suspendProcessRequest, busy: true }, function (suspendData) {
         if (suspendData) {
            self.suspendSingle = suspendData;
         }

         if (firstTime) {
            var headerFinishCriteria = {
               maintmode: self.isAddOrderMode,
               orderno: self.oehdr.orderno,
               ordersuf: self.oehdr.ordersuf
            };
            // busy is false here because the timing between the two calls was causing SoHo errors with the busy indicator
            DataService.post('api/oe/asoeheader/oeheaderfinish', { data: headerFinishCriteria, busy: false }, function (finishData) {
               if (finishData) {
                  self.processSuspend(false, printerSettings);
               }
            });
         } else {
            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, self.delimitedOrderNumber());
            if (self.suspendSingle.suspendorderchecked) { //only show the message if the order was suspended
               MessageService.info('global.order.suspended', $translate.instant('global.order') + ' ' + self.delimitedOrderNumber() + ' ' + $translate.instant('global.has.been.suspended'));
            }
            self.suspendOrderModal.destroy();



            self.navigateAfterFinish();
         }
      });
   };

   self.finishOrder = function (editCustShipTo) {
      // Reset the CanFinishWithoutTendering in case anything has changed that would change the setting such as order approvty
      self.setCanFinishWithoutTenderingOrderFinish();
      if (!self.oehdr.statecd || self.oehdr.statecd === '--') {
         MessageService.error('global.error', 'message.enter.compelte.taxing.information');
      } else {
         self.checkAutoShipOrder(editCustShipTo);
      }
   };

   self.checkAutoShipOrder = function (editCustShipTo) {

      if (!self.oehdr.wlwhsefl && self.oehdr.oetype === 'so' && self.oehdr.stagecd < 3 &&
         (self.orderTotals.orddue > 0 || self.orderTenderedAmount)) {
         var checkAutoShip = {
            maintmode: self.isAddOrderMode,
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            tenderedamt: self.orderTenderedAmount
         };
         DataService.post('api/oe/asoeheader/oeordercheckautoship', { data: checkAutoShip, busy: true }, function (data) {
            if (data) {
               switch (data.cAutoShip.toLowerCase()) {
                  case 'n':
                     self.autoShipOrder = false;
                     break;
                  case 'p':
                     MessageService.yesNo('global.confirm', 'question.do.you.want.to.set.this.order.as.shipped', function () {
                        //yes callback
                        self.autoShipOrder = true;
                        self.checkSignatureRequired(data.cCenPOSSigReqd, editCustShipTo);
                     }, function () {
                        //no callback
                        self.autoShipOrder = false;
                        self.checkSignatureRequired(data.cCenPOSSigReqd);
                     });
                     return;
                  case 'y':
                     self.autoShipOrder = true;
                     break;
               }

               self.checkSignatureRequired(data.cCenPOSSigReqd, editCustShipTo);
            }
         });
      } else {
         if (self.orderTotals.nextlineno < 2 && self.isAddOrderMode) {
            self.forceTender = '';
         }

         // This is a counter sale and an amount due is > 0 so we force tender
         if (!self.forceTender && self.oehdr.oetype.toLowerCase() === 'cs' && self.amountDue > 0) {
            self.forceTender = 'y';
         }

         // Only allow the user to finish the order if it is NOT a counter sale or the counter sale has been fully tendered
         if (self.canFinishWithoutTendering && !self.forceTender) {
            // proceed
         } else {
            if (self.forceTender) {
               if (self.getStage() !== 4) {
                  self.forceTendering(false);
                  return;
               } else {
                  if (!self.isChargeRemainingToAccountAsked) {
                     self.checkChargeRemainingToAccount(function() {
                        self.finish(editCustShipTo);
                     });
                  } else {
                     self.forceTendering(false);
                  }
                  return;
               }
            } else if (self.amountDue === 0 && self.tenderedTotalIsGood()) {
               // This is a counter sale but the amount due is = 0 so we can allow them to finish the order
               // proceed
            } else if (self.shippedLinesTendered()) {
               // This is a counter sale but the shipped amount has been paid
               // Back-ordered products will be moved to a SO suffix and should be paid at shipping
               // proceed
            } else if (self.chargeRemainingToAccount) {
               // User has selected to charge remaining amount to account so we can allow them to finish the order
               // proceed
            } else {
               if (self.oehdr.oetype.toLowerCase() === 'qu') {
                  self.forceTendering(false);
               } else {
                  // This is a counter sale and an amount due is > 0 so we force the user to the tendering screen
                  self.forceTendering(true);
               }
               return;
            }
         }
         var checkAutoShip2 = {
            maintmode: self.isAddOrderMode,
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            tenderedamt: self.orderTenderedAmount
         };
         DataService.post('api/oe/asoeheader/oeordercheckautoship', { data: checkAutoShip2, busy: true }, function (data) {
            if (data) {
               switch (data.cAutoShip.toLowerCase()) {
               case 'n':
                  self.autoShipOrder = false;
                  break;
               case 'p':
                  MessageService.yesNo('global.confirm', 'question.do.you.want.to.set.this.order.as.shipped', function () {
                     //yes callback
                     self.autoShipOrder = true;
                     self.checkSignatureRequired(data.cCenPOSSigReqd, editCustShipTo);
                  }, function () {
                     //no callback
                     self.autoShipOrder = false;
                     self.checkSignatureRequired(data.cCenPOSSigReqd, editCustShipTo);
                  });
                  return;
               case 'y':
                  self.autoShipOrder = true;
                  break;
               }

               self.checkSignatureRequired(data.cCenPOSSigReqd, editCustShipTo);

            } else {
               // call failing to return data, break and do not close order
               return;
            }
         });
      }
   };

   self.checkSignatureRequired = function (cCenPosSigReqd, editCustShipTo) {
      if (cCenPosSigReqd && (self.autoShipOrder === true || self.oehdr.oetype === 'cs')) {
         MessageService.yesNo('global.confirm', 'question.do.you.want.to.skip.required-signature', function () {
            //yes callback
            self.authPointsRunning++;
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'finish', 'signature', '', '', null, function () {
               self.finish(editCustShipTo);
            }, null);
         }, function () {
            //no callback, do not finish order
         });
      } else {
         self.finish(editCustShipTo);
      }
   };

   self.tenderedTotalIsGood = function () {
      //if any of these conditions are met, then we are good
      var totShipAmt = parseFloat((self.orderTotals.shplineamt + self.orderTotals.shptaxamt).toFixed(2));
      var totOrdAmt = parseFloat((self.orderTotals.ordlineamt + self.orderTotals.ordtaxamt).toFixed(2));
      if (totShipAmt === self.orderTenderedAmount || //shipped lines amount paid for (current instance)
         totOrdAmt === self.orderTenderedAmount || //ordered lines amount paid for (current instance)
         self.orderTotals.ordtotalamt === self.orderTenderedAmount || //order total amount paid for (current instance)
         self.orderTotals.ordtotalamt === self.oehdr.tottendamt || //order total amount paid for (total over order lifetime)
         self.orderTotals.ordtotalamt === 0) { //nothing to pay for
         return true;
      } else {
         return false;
      }
   };

   self.shippedLinesTendered = function () {
      //if any of these conditions are met, then we are good
      var totShipAmt = parseFloat((self.orderTotals.shplineamt + self.orderTotals.shptaxamt).toFixed(2));
      if (totShipAmt && // the total shipped amount is not 0
         (totShipAmt === self.orderTenderedAmount || //shipped lines amount paid for (current instance)
            totShipAmt === self.oehdr.tottendamt)) { //shipped lines amount paid for (total over order lifetime)
         return true;
      } else {
         return false;
      }
   };

   self.forceTendering = function (showMessage) {
      if (self.getStage() !== 4) {
         self.collectPayment();
      }

      if (showMessage || self.getStage() === 4) {
         MessageService.info('global.alert', 'message.warning.counter.sale.must.be.tendered.in.full');
      }

      if (self.oehdr.oetype.toLowerCase() !== 'cs') {
         self.forceTender = '';
      }
   };

   self.checkChargeRemainingToAccount = function (callback) {
      if (self.oehdr.oetype.toLowerCase() === 'cs' && self.oehdr.selltype.toLowerCase() === 'c') {
         MessageService.info('global.alert', 'message.warning.counter.sale.must.be.tendered.in.full');
         return;
      }

      if ((self.oehdr.oetype.toLowerCase() === 'cs' || self.oehdr.selltype.toLowerCase() === 'c' || self.oehdr.selltype.toLowerCase() === 'd') &&
         (self.amountDue > 0 && self.oehdr.approvty.toLowerCase() === 'y')) {
         MessageService.yesNo('global.confirm', 'question.charge.remaining.amount.to.account', function () {
            //yes callback
            if (self.oehdr.selltype.toLowerCase() !== 'c' || self.oehdr.selltype.toLowerCase() !== 'd') {
               self.forceTender = '';
               self.chargeRemainingToAccount = true;

               if (callback) {
                  callback();
               }
            }
         }, function () {
            //no callback
            self.chargeRemainingToAccount = false;
         });
         
      } else {
         // tendering still needs to be done when the amount cannot be charged to account (order on hold)
         if (self.oehdr.oetype.toLowerCase() === 'cs' && self.oehdr.approvty.toLowerCase() === 'h' && (self.amountDue > 0 || self.orderTotals.orddue > 0)) {
            MessageService.info('global.alert', 'message.sale.is.on.hold.cant.charge');
         } else if (self.oehdr.oetype.toLowerCase() === 'cs' && !self.canFinishWithoutTendering && (self.amountDue > 0 || self.orderTotals.orddue > 0)) {
            //there is still tendering either due or in the calculator that hasn't been handled, cannot finish
            MessageService.info('global.alert', 'message.warning.counter.sale.must.be.tendered.in.full');
         } else {
            if (callback) {
               callback();
            }
         }
      }
   };

   self.finish = function (editCustShipTo) {
      var oeHeaderFinishCriteria = {
         maintmode: self.isAddOrderMode,
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.ordersuf,
         wlwhsechgfl: (self.whseLogStatus && self.whseLogStatus.wlwhsefl && self.whseLogStatus.wlwhsechgfl)
      };
      DataService.post('api/oe/asoeheader/oeheaderfinish', { data: oeHeaderFinishCriteria }, function (data) {
         if (data) {
            if (data.cWarningMessage && !editCustShipTo) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            if (data.messaging && !editCustShipTo) {
               MessageService.processMessaging(data.messaging);
            }

            var hardStop;
            data.messaging.forEach(function (message) {
               // Product Restriction(s) Found; Unable to Finish/Complete Order (6938) might be sent back as a warning or error but should stop for both.
               // Search for the error number - never the text as the text could get translated.
               // Shipvia not filled error 4030 for WL warehouse would always be returned as an error.  This will then catch future errors.
               if (message.messagetxt.includes('(6938)') || message.messagetype === 'e') {
                  hardStop = true;
               }
            });

            if (!hardStop) {
               var orderno = self.oehdr.orderno;
               var ordersuf = self.oehdr.ordersuf ? self.oehdr.ordersuf : '00';

               RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, self.delimitedOrderNumber());

               if (self.orderTotals.nextlineno < 2 && self.isAddOrderMode && !editCustShipTo) {
                  MessageService.info('global.information', 'message.number.of.line.items.on.order.number.is.zero', { orderNum: self.oehdr.orderno + '-' + Utils.pad(self.oehdr.ordersuf, 2) });
               }

               if (self.autoShipOrder && !editCustShipTo) {
                  //grab the order number because we may have cleared it by the time we get back from this call
                  var orderNumber = self.delimitedOrderNumber();
                  DataService.get('api/oe/asoeentry/oeesshipunshiporder/' + self.oehdr.orderno + '/' + self.oehdr.ordersuf, { busy: false }, function () {
                     MessageService.info('global.order.shipped', $translate.instant('global.order') + ' ' + orderNumber + ' ' + $translate.instant('global.has.been.shipped'));
                  });
               }

               // Clear shopping list records between orders
               DataService.get('api/shared/assharedentry/clearshoppinglist', { busy: false });

               //When TWL order are pulled back from TWL (wlwhsechgfl = yes)
               //and we are not auto printing the orders (autoprint),
               //then the print screen will be presented to the user to remind them
               //that the order needs to be reprinted to get to TWL
               //Need the forceprintfl and pickfl in order to not print zero lines, unapproved, etc.
               if (self.whseLogStatus && self.whseLogStatus.wlwhsefl &&
                  self.whseLogStatus.wlwhsechgfl && data.oeheaderfinishresults.lforceprintfl &&
                  (!data.oeheaderfinishresults.lpickfl || !self.autoPrintData || !self.autoPrintData.autoPrint)) {
                  self.resetOehdr();
                  $state.go(self.baseState + '.print', { orderNumber: orderno + '-' + ordersuf });
               } else {

                  //User Hook (do not rename)
                  if (self.beforeAutoPrintLaunch) {
                     self.beforeAutoPrintLaunch();
                  }

                  if ((self.isAddOrderMode || (self.whseLogStatus && self.whseLogStatus.wlwhsefl && self.whseLogStatus.wlwhsechgfl)) && !editCustShipTo) {
                     var autoPrintCheck = {
                        orderno: orderno,
                        ordersuf: ordersuf
                     };
                     if (self.autoPrintData) {
                        autoPrintCheck.printackfl = self.autoPrintData.isPrintAck;
                        autoPrintCheck.printpckfl = self.autoPrintData.isPrintPickTicket;
                        autoPrintCheck.printinvfl = self.autoPrintData.isPrintInvoice;
                        autoPrintCheck.printdelvfl = self.autoPrintData.isPrintDelivery;
                        autoPrintCheck.printrcptfl = self.autoPrintData.isPrintReceipt;
                     } else {
                        autoPrintCheck.printackfl = false;
                        autoPrintCheck.printpckfl = false;
                        autoPrintCheck.printinvfl = false;
                        autoPrintCheck.printdelvfl = false;
                        autoPrintCheck.printrcptfl = false;
                     }
                     DataService.post('api/oe/asoeentry/oeetautoprintlaunchcheck', { data: autoPrintCheck, busy: true }, function (data) {
                        if (data) {
                           if (data.printackfl || data.printpckfl || data.printinvfl || data.printdelvfl || data.printrcptfl) {
                              var printReportList = [];
                              self.autoPrintData.printReportList.forEach(function (printReport) {
                                 switch (printReport.type) {
                                    case 'a':
                                       if (data.printackfl) {
                                          printReportList.push(printReport);
                                       }
                                       break;
                                    case 'p':
                                       if (data.printpckfl) {
                                          printReportList.push(printReport);
                                       }
                                       break;
                                    case 'i':
                                       if (data.printinvfl) {
                                          printReportList.push(printReport);
                                       }
                                       break;
                                    case 'd':
                                       if (data.printdelvfl) {
                                          printReportList.push(printReport);
                                       }
                                       break;
                                    case 'r':
                                       if (data.printrcptfl) {
                                          printReportList.push(printReport);
                                       }
                                       break;
                                 }
                              });

                              var printerSettings = [];
                              if (self.autoPrintData.isPrintAck && data.printackfl) {
                                 printerSettings.push(self.autoPrintData.ackSettings);
                              }
                              if (self.autoPrintData.isPrintPickTicket && data.printpckfl) {
                                 printerSettings.push(self.autoPrintData.pickTicketSettings);
                              }
                              if (self.autoPrintData.isPrintInvoice && data.printinvfl) {
                                 printerSettings.push(self.autoPrintData.invoiceSettings);
                              }
                              if (self.autoPrintData.isPrintDelivery && data.printdelvfl) {
                                 printerSettings.push(self.autoPrintData.deliverySettings);
                              }
                              if (self.autoPrintData.isPrintReceipt && data.printrcptfl) {
                                 printerSettings.push(self.autoPrintData.receiptSettings);
                              }

                              var printLaunchRequest = {
                                 oeetprintreportlist: printReportList,
                                 printersettings: printerSettings,
                                 oeetprintscreensingle: {
                                    orderno: data.orderno,
                                    ordersuf: data.ordersuf
                                 },
                                 oeetprintlaunchcriteria: {
                                    orderno: data.orderno,
                                    ordersuf: data.ordersuf
                                 }
                              };
                              DataService.post('api/oe/asoeentry/oeetprintlaunch', { data: printLaunchRequest, busy: false }, function () {
                                 MessageService.info('global.info', 'message.your.automatic.print.request.has.been.submitted');
                              });
                           }
                        }
                     });
                  }
                  if (!editCustShipTo) {
                     if (self.isAddOrderMode) {
                        MessageService.info('global.order.finished', $translate.instant('global.order') + ' ' + self.delimitedOrderNumber() + ' ' + $translate.instant('global.has.been.created'));
                     } else {
                        MessageService.info('global.order.finished', $translate.instant('global.order') + ' ' + self.delimitedOrderNumber() + ' ' + $translate.instant('global.has.been.updated'));
                     }  
                  }
                  self.canFinishWithoutTendering = true;
                  self.navigateAfterFinish(editCustShipTo);
               }
            }
         }
      });
   };

   self.navigateAfterFinish = function (editCustShipTo) {
      var oehdrCopy = angular.copy(self.oehdr);
      self.resetOehdr();
      if (editCustShipTo) {
         $state.go(self.baseState + '.editCustomerShipTo', { oehdr: oehdrCopy, returnScreen: $state.current.name });
         self.sidebarCollapsed = true;
      } else {
         switch (self.defaultOrderMode) {
         case 'a': //add
         case 'e':
         default:
            $state.go(self.baseState + '.initiate');
            break;
         case 'c': //maintain
            $state.go(self.baseState + '.maintain');
            break;
         case 'd': //delete
            $state.go(self.baseState + '.delete');
            break;
         }  
      }
   };

   self.sendCustomEntityContextMessages = function (oeline) {
      // Add OutgoingIAData entity to context for messaging
      self.iaDataEntityId = ContextService.addCustomEntity('OutgoingIAData', {
         custno: self.oehdr.custno,
         prod: oeline.prod,
         orderno: oeline.orderno,
         ordersuf: oeline.ordersuf,
         whse: self.oehdr.whse,
         ordtotalamt: self.oehdr.totlineamt
      });

      self.supplierAccessContextMessage(oeline);
   };

   self.supplierAccessContextMessage = function (oeline) {
      // Add ViewSxeSupplierAccess entity to context for messaging
      self.dsaDataEntityId = ContextService.addCustomEntity('ViewSxeSupplierAccess', {
         custno: self.oehdr.custno,
         lineno: oeline.lineno,
         module: 'oe',
         orderno: oeline.orderno,
         ordersuf: oeline.ordersuf,
         ordtotalamt: self.oehdr.totlineamt,
         shipprod: oeline.prod,
         qtyord: oeline.qtyord,
         specnstype: oeline.specnstype,
         stkqtyord: oeline.stkqtyord,
         unit: oeline.unit,
         unitconv: oeline.unitconv,
         userfield: oeline.userfield,
         whse: self.oehdr.whse
      });
   };

   // Remove old entities from context
   self.clearCustomEntityContextMessages = function (stateName) {
      //OutgoingIAData
      if (self.iaDataEntityId) {
         ContextService.removeEntity(self.iaDataEntityId);
      }

      //ViewSxeSupplierAccess
      if (self.dsaDataEntityId) {
         if (stateName) {
            ContextService.removeEntityFromState(stateName, self.dsaDataEntityId);
         }
         ContextService.removeEntity(self.dsaDataEntityId);
      }
   };

   // Clear the data in the Dimension Calculator (i.e. when ResetLine)
   self.clearDimensionCalculatorContextMessages = function () {
      ContextService.clearDimensionCalculatorContext();
   };

   TabService.canUserCloseTab(self.baseState, function () {
      if (self.inDrillDownOperation) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      } else {
         return true;
      }
   });

   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: 'oeeh',
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.ordersuf,
         custno: self.oehdr.custno,
         streetaddr: self.oehdr.shiptoaddr1,
         city: self.oehdr.shiptocity,
         state: self.oehdr.shiptost,
         zipcd: self.oehdr.shiptozip,
         country: self.oehdr.countrycd,
         outofcityfl: self.oehdr.outofcityfl
      };
   };

   //User Hook (do not rename)
   self.goToLineFromCartQualify = function (product, callback) {
      if (callback) {
         callback();
      }
   };

   //User Hook (do not rename)
   self.goToLinesGridFromCartQualify = function (callback) {
      if (callback) {
         callback();
      }
   };

   //User Hook (do not rename)
   self.goToCollectPaymentFromCartQualify = function (callback) {
      if (callback) {
         callback();
      }
   };
});

app.controller('OeetFlushDatesModalCtrl', function ($scope, DataService) {
   // alias => fdMo
   var self = this;
   var base = $scope.base;

   self.selectedFlushType = 'a';

   self.ok = function () {
      if (self.selectedFlushType !== 'n') {
         var changeDatesCriteria = {
            dtupdtype: self.selectedFlushType,
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            orgpromisedt: base.originalPromiseDate,
            orgreqshipdt: base.originalRequiredShipDate,
            newpromisedt: base.oehdr.promisedt,
            newreqshipdt: base.oehdr.reqshipdt,
            orgorigpromisedt: base.originalOriginalPromiseDate,
            neworigpromisedt: base.oehdr.origpromisedt
         };
         DataService.post('api/oe/asoeheader/oeheaderchangedates', { data: changeDatesCriteria, busy: true }, function (data) {
            base.flushDatesModal.destroy();
            base.calcsob = 'o';
            base.updateLineItems();
         });
      } else {
         base.flushDatesModal.destroy();
      }
   };

   self.cancel = function () {
      base.flushDatesModal.destroy();
   };
});

app.controller('OeetEditSoldToAddressModalCtrl', function ($scope) {
   // alias => esta
   var self = this;
   var base = $scope.base;

   var initialAddress = {
      addr1: base.oehdr.addr1,
      addr2: base.oehdr.addr2,
      addr3: base.oehdr.addr3,
      city: base.oehdr.city,
      state: base.oehdr.state,
      zipcd: base.oehdr.zipcd,
      countrycd: base.oehdr.countrycd,
      geocode: base.oehdr.geocode,
      outofcityfl: base.oehdr.outofcityfl
   };

   self.ok = function () {
      base.editSoldToAddrModal.destroy();
   };

   self.cancel = function () {
      base.oehdr.addr1 = initialAddress.addr1;
      base.oehdr.addr2 = initialAddress.addr2;
      base.oehdr.addr3 = initialAddress.addr3;
      base.oehdr.city = initialAddress.city;
      base.oehdr.state = initialAddress.state;
      base.oehdr.zipcd = initialAddress.zipcd;
      base.oehdr.countrycd = initialAddress.countrycd;
      base.oehdr.geocode = initialAddress.geocode;
      base.oehdr.outofcityfl = initialAddress.outofcityfl;

      base.editSoldToAddrModal.destroy();
   };
});

app.controller('OeetSuspendOrderModalCtrl', function ($scope, $translate, DataService) {
   // alias => soMo
   var self = this;
   var base = $scope.base;

   self.orderNumber = $translate.instant('global.order.number') + ': ' + base.delimitedOrderNumber();

   self.submit = function () {
      if (!base.suspendSingle.suspendorderchecked && !base.suspendSingle.pickprintchecked) {
         base.suspendOrderModal.destroy();
         return;
      }

      var suspendValidateRequest = {
         oeordersuspendsingle: base.suspendSingle,
         printersettings: self.printerSettings
      };
      DataService.post('api/oe/asoeheader/oeordersuspendvalidate', { data: suspendValidateRequest, busy: true }, function (data) {
         if (data) {
            base.suspendSingle = data;
            base.processSuspend(true, self.printerSettings);
         }
      });
   };

   self.cancel = function () {
      base.suspendOrderModal.destroy();
   };
});

//NOTE: Since this controller is defined in HTML code, it can't be extended
//with extensibility.  There are some hooks in strategic places in the functions
//that can be extended from the Base.  Tip: For extending the Base, a good
//practice is to extend that from the 'OeetSelectProductsCtrl' controller View.
app.controller('OeetCartCtrl', function ($scope, $state, Constants, MessageService) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.limit = Constants.CART_LIMIT;
   self.showing = Constants.CART_LIMIT;

   self.getNetAmount = function () {
      if (base.lineItems) {
         var orderTotal = 0;
         base.lineItems.forEach(function (lineItem) {
            orderTotal += (lineItem.netamt * (lineItem.returnfl ? -1 : 1));
         });
         return orderTotal.toFixed(2);
      } else {
         return 0;
      }
   };

   self.goToLine = function (product) {
      //User Hook (do not rename)
      base.goToLineFromCartQualify(product, function () {
         if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.oeline.prod && product.actllineno !== ale.oeline.lineno) {
            MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
               //yes callback
               self.lineToEditLineNo = product.actllineno;
               ale.clearLineAndReset(base.baseState + '.selectProducts.advancedLineEntry', { lineNo: self.lineToEditLineNo });
               self.lineToEditLineNo = null;
            });
         } else {
            $state.go(base.baseState + '.selectProducts.advancedLineEntry', { lineNo: product.actllineno }, { reload: base.baseState + '.selectProducts.advancedLineEntry' });
         }
      });
   };

   self.goToLinesGrid = function () {
      //User Hook (do not rename)
      base.goToLinesGridFromCartQualify(function () {
         if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.oeline.prod) {
            MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
               //yes callback
               ale.clearLineAndReset(base.baseState + '.selectProducts.linesGrid');
            });
         } else {
            $state.go(base.baseState + '.selectProducts.linesGrid');
         }
      });
   };

   self.goToCollectPayment = function () {
      //User Hook (do not rename)
      base.goToCollectPaymentFromCartQualify(function () {
         if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.oeline.prod) {
            MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
               //yes callback
               ale.clearLineAndReset(base.collectPayment, null, true);
            });
         } else {
            base.collectPayment();
         }
      });
   };
});

app.controller('OeetSignatureCtrl', function ($scope, $state, $stateParams, Utils, UserService, MessageService, DataService) {
   // alias => sig
   var self = this;
   var base = $scope.base;

   self.timer = {};

   self.navBackState = $stateParams.navBackState;

   self.accept = function () {
      if (NumberOfTabletPoints() === 0) {
         MessageService.error('global.error', 'message.please.sign.before.submitting');
      }
      else {
         SetTabletState(0, self.timer);
         SetSigCompressionMode(1);
         SetImageXSize(500);
         SetImageYSize(100);
         SetImagePenWidth(5);
         GetSigImageB64(self.saveImage);
      }
   };

   self.saveImage = function (imageString) {

      var pvImages = {
         cono: UserService.getCono(),
         keytype: 'oedlv',
         keyvalue1: base.oehdr.custno,
         keyvalue2: base.oehdr.orderno + '-' + Utils.pad(base.oehdr.ordersuf, 2),
         chunk: 1,
         descrip: 'Signature: ' + base.oehdr.custno,
         image64: imageString,
         currproc: 'oeet',
         operinit: UserService.getUserName()
      };

      DataService.post('api/oe/asoeentry/oesignaturesave', { data: pvImages, busy: true }, function () {
         MessageService.info('global.information', 'global.signature.saved.successfully');
         if (self.navBackState) {
            $state.go(self.navBackState);
         } else {
            $state.go('^.selectProducts');
         }
      });
   };

   self.clear = function () {
      ClearTablet();
   };

   self.back = function () {
      if (self.navBackState) {
         $state.go(self.navBackState);
      } else {
         $state.go('^.selectProducts');
      }

      SetTabletState(0, self.timer);
   };
});

app.directive('oeetSignatureCapture', function oeetSignatureCapture() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element) {
         var sig = scope.sig;

         var ctx = element.get(0).getContext('2d');
         SetDisplayXSize(500);
         SetDisplayYSize(100);
         SetJustifyMode(0);
         ClearTablet();
         sig.timer = SetTabletState(1, ctx, 50);
      }
   };

});

//This controller is for the Edit the Ship To address Modal popup.  It's accessed from a
//button on the Header Format panel.
//Alias: esta
app.controller('OeetEditShipToAddressModalCtrl', function ($state, $scope, $translate, Utils) {
   var self = this;
   var base = $scope.base;
   self.oehdr = {};

   //Save off our own copy so we can edit at will, and cancel if need-be.
   Utils.replaceObject(self.oehdr, base.oehdr);

   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: 'oeeh',
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.ordersuf,
         custno: self.oehdr.custno,
         streetaddr: self.oehdr.shiptoaddr1,
         city: self.oehdr.shiptocity,
         state: self.oehdr.shiptost,
         zipcd: self.oehdr.shiptozip,
         country: self.oehdr.countrycd,
         geocd: self.oehdr.geocd,
         outofcityfl: self.oehdr.outofcityfl
      };
   };

   self.submit = function () {
      //Write the values back to the main object where they can be persisted.
      Utils.replaceObject(base.oehdr, self.oehdr);
      base.updateOehdr(self.cancel);
   };

   self.cancel = function () {
      base.destroyEditShipToAddressModal();
   };
});
