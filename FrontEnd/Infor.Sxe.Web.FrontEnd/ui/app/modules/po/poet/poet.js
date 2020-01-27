'use strict';

app.controller('PoetBaseCtrl', function ($scope, $state, $translate, RecoveryService, DataService, GlobalValueService, MessageService, ModalService, Utils, Sasoo, Sasc, Constants, SecurityService, TabService, ImageService, UtilsData) {
   var self = this;

   // Get numbered base state (poet, poet2, etc.) and use it within this scope of poet
   self.baseState = TabService.getBaseStateName($scope);

   self.sasoo = Sasoo;
   self.sasc = Sasc;
   self.isAddOrderMode = true;
   self.isShipViaLimited = false;

   self.IS_ADD_MODE = true;
   self.SUBMENU_DELIMITER = ' | ';
   self.LABEL_DELIMITER = ': ';
   self.MESSAGING_OK = 'ok';
   self.CRLF = '<br/>';
   self.MENU_FUNCTION_POET = 'poet';

   //These values are driven off pv_sassm meta data as the Sub Functions.
   self.SUB_FUNCTION_INITIATE = 'Initiate Order';
   self.SUB_FUNCTION_SELECTPRODUCTS = 'Select Products';
   self.SUB_FUNCTION_REVIEWTAXESANDTOTALS = 'Review Taxes and Tot';

   self.DEFAULTS_SCREEN_NAME = 'DefaultsH5';
   self.DEFAULTLINEENTRYMODE_EASY = 'e';
   self.DEFAULTLINEENTRYMODE_ADVANCED = 'a';
   self.DEFAULTORDERMODE_ADD = 'a';
   self.DEFAULTORDERMODE_MAINTAIN = 'c';
   self.DEFAULTORDERMODE_DELETE = 'd';
   self.DEFAULTORDERTYPE_PURCHASE_ORDER = 'po';
   self.DEFAULTWAREHOUSE_HOME = 'home';
   self.WEBSETTING_DEFAULTPURCHASEORDERMODE = 'DefaultPurchaseOrderMode';
   self.WEBSETTING_DEFAULTPURCHASEORDERTYPE = 'DefaultPurchaseOrderType';
   self.WEBSETTING_DEFAULTLINEENTRYMODE = 'DefaultLineEntryMode';
   self.WEBSETTING_SKIPMAINTAINHEADERFIELDS = 'SkipMaintainHeaderFields';
   self.WEBSETTING_EASYDEFAULTQUANTITY = 'EasyDefaultQuantity';
   self.WEBSETTING_DEFAULTORDERMODE = 'DefaultOrderMode';
   self.WEBSETTING_DEFAULTORDERTYPE = 'DefaultOrderType';
   self.WEBSETTING_DEFAULTLINETYPE = 'DefaultLineType';
   self.MISC_VENDOR = 999999999999;
   self.SETTINGVALUE_ORDERTYPE_DEFAULT = 'po';
   self.SETTINGVALUE_LINETYPE_DEFAULT = '';
   self.PURCHASEORDER_MODE_ADD = 'a';
   self.PURCHASEORDER_MODE_CHANGE = 'c';
   self.PURCHASEORDER_MODE_DELETE = 'd';
   self.PURCHASEORDER_TYPE_PO = 'po';
   self.PURCHASEORDER_TYPE_RETURN = 'rm';
   self.PURCHASEORDER_TYPE_DIRECTORDER = 'do';
   self.PO_STAGE_PRINTED = 2;
   self.HEADERFIELD_SHIPVIATYPE = 'shipviaty';
   self.HEADERFIELD_FREIGHTTERMSCODE = 'frttermscd';
   self.POHEADERUPDATE_MODE_UPDATE = 'update';
   self.POHEADERRETRIEVE_MODE_RETRIEVE = 'Retrieve';
   self.POHEADERRETRIEVE_MODE_CHECKDELETE = "CheckDelete";
   self.PROCESSTYPE_START = 'Start';
   self.NONSTOCKTYPE_STOCKED = '';
   self.NONSTOCKTYPE_RESALE = 'r';
   self.NONSTOCKTYPE_NONSTOCK = 'n';
   self.POLINECREATEMAINTMODE_ADD = 'a';
   self.HEADERFIELD_LEAVE_FINISHADDONS = 'FinishAddons';
   self.BACKEND_WARNING_INDICATOR = 'warning';
   self.UNIT_EACH = 'each';
   self.CONTACTS_CONTACTYPE_VENDOR = 'apsv';
   self.homeWarehouse = '';
   self.isWhseEnabled = true;

   //hydrated after the order is created/retrieved
   self.pohdr = {};
   self.orderTotals = {};
   self.lineItems = [];
   self.vendorContractClaims = [];
   self.vendorClaimTotal = 0;
   self.isVendorContractClaimsAvailable = false;
   self.defaultLineType = self.NONSTOCKTYPE_STOCKED;
   self.defaultCurrencySymbol = '';
   self.isDefaultCurrencySymbolSet = false;
   self.purchaseOrderNumber = 0;
   self.firstNonStockInitialize = false;
   self.inDrillDownOperation = false;
   self.isReturn = false;

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(self.MENU_FUNCTION_POET);
   //Nothing is needed for the Sub Function security for 'Initiate'.

   //If they don't have security for Lines, they can't do anything except for action buttons in Initiate (i.e.
   //they can't go in to maintain or delete the order).  They can do action such as Print, Copy, Import.
   self.subFunctionSecurityForLines = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_POET, self.SUB_FUNCTION_SELECTPRODUCTS);

   //If they don't have security for 'Review Taxes and Tot', they get an error if they try to reach that screen.
   self.subFunctionSecurityForReview = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_POET, self.SUB_FUNCTION_REVIEWTAXESANDTOTALS);

   //These are a couple of values that need to be 'sticky' while the user is logged in.  The setting is
   //shared between OEET, POET, and WTET.
   self.autoPrintDefault = GlobalValueService.get('Global.AutoPrint') || false;
   self.useWhereAppropriateDefault = GlobalValueService.get('Global.UseWhereAppropriate') || false;

   //Check if Allow Expanded Name/Address
   self.shipToAddrMaxLength = UtilsData.getNameAddressMaxLength();

   //User Hook (do not rename)
   self.setPoLineCriteria = function (poline) { };

   //User Hook (do not rename)
   self.poLineValidateContinue = function (poline) { };

   var retrieveWebSettingRequest = {
      cFunctionName: self.MENU_FUNCTION_POET,
      cScreenName: 'DefaultsH5',
      cSettingName: ''
   };

   self.setDefaultWarehouse = function () {
      DataService.get('api/po/aspoheader/poloadbannerwhse', { busy: true }, function (data) {
         if (data) {
            self.homeWarehouse = data.cWhse;
            self.isWhseEnabled = data.lWhseSensitive;
            //NOTE: Do not call the resetPohdr() here, otherwise the Recovery will be broken since it resets the po#.
         }
         self.pohdr.whse = self.homeWarehouse;
      });
   };

   DataService.post('api/shared/assharedentry/retrievewebsetting', { data: retrieveWebSettingRequest, busy: true }, function (data) {
      if (data) {
         self.defaultWebSettings = data;
         self.setDefaultWebSettings();
         self.setDefaultWarehouse();
      } else {
         self.setDefaultWarehouse();
      }
      //Need to call the reset after we call the DefaultWarehouse logic.
      self.resetPohdr();
   });

   self.setDefaultWebSettings = function () {
      self.defaultWebSettings.forEach(function (webSetting) {
         switch (webSetting.settingname) {
            case self.WEBSETTING_DEFAULTPURCHASEORDERMODE:
               if (webSetting.settingvalue) {
                  if (!self.callingState) {
                     if (webSetting.settingvalue === self.DEFAULTORDERMODE_MAINTAIN) {
                        $state.go(self.baseState + '.maintain');
                     } else if (webSetting.settingvalue === self.DEFAULTORDERMODE_DELETE) {
                        $state.go(self.baseState + '.delete');
                     }
                  }

                  self.defaultOrderMode = webSetting.settingvalue;
               }
               break;
            case self.WEBSETTING_DEFAULTPURCHASEORDERTYPE:
               if (webSetting.settingvalue) {
                  self.defaultOrderType = webSetting.settingvalue;
               } else {
                  self.defaultOrderType = self.DEFAULTORDERTYPE_PURCHASE_ORDER;
               }
               break;
            case self.WEBSETTING_DEFAULTLINEENTRYMODE:
               switch (webSetting.settingvalue) {
                  case self.DEFAULTLINEENTRYMODE_EASY: //ignore jslint - correct indentation
                  default: //ignore jslint - correct indentation
                     self.defaultLineEntryState = self.baseState + '.selectProducts'; //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case self.DEFAULTLINEENTRYMODE_ADVANCED: //ignore jslint - correct indentation
                     self.defaultLineEntryState = self.baseState + '.selectProducts.advancedLineEntry';
                     break; //ignore jslint - correct indentation
               }
               break;
            case self.WEBSETTING_DEFAULTLINETYPE:
               if (webSetting.settingvalue) {
                  self.defaultLineType = webSetting.settingvalue;
               } else {
                  self.defaultLineType = self.NONSTOCKTYPE_STOCKED;
               }
               break;
            case self.WEBSETTING_EASYDEFAULTQUANTITY:
               self.easyDefaultQuantity = webSetting.settingvalue ? parseFloat(webSetting.settingvalue).toFixed(2) : 0.00;
               break;
            case self.WEBSETTING_SKIPMAINTAINHEADERFIELDS:
               self.skipMaintainHeader = webSetting.settingvalue === 'true';
               break;
            default:
               break;
         }
      });

      //once we've set all the settings that have been returned, set the ones that aren't already set and are required
      if (!self.defaultOrderMode) {
         self.defaultOrderMode = self.DEFAULTORDERMODE_ADD;
      }
      if (!self.defaultOrderType) {
         self.defaultOrderType = self.DEFAULTORDERTYPE_PURCHASE_ORDER;
      }
      if (!self.defaultLineEntryState) {
         self.defaultLineEntryState = self.baseState + '.selectProducts';
      }
      if (!self.easyDefaultQuantity) {
         self.easyDefaultQuantity = 0.00;
      }
   };

   self.setReturnType = function () {
      self.isReturn = self.pohdr && self.pohdr.potype && self.pohdr.potype.toLowerCase() === self.PURCHASEORDER_TYPE_RETURN;
   };

   self.loadVendorAddress = function () {
      var params = {
         vendno: self.pohdr.vendno,
         fldlist: ''
      };

      DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.pohdr.vendname = data.name;
            self.pohdr.vendaddr1 = data.addr1;
            self.pohdr.vendaddr2 = data.addr2;
            self.pohdr.vendaddr3 = data.addr3;
            self.pohdr.vendcity = data.city;
            self.pohdr.vendstate = data.state;
            self.pohdr.vendzipcd = data.zipcd;

         }
      });
   };

   self.resetPohdr = function () {
      var newPohdr = {};
      newPohdr.potype = self.defaultOrderType;
      newPohdr.whse = self.homeWarehouse;
      newPohdr.resalefl = true;
      newPohdr.resaleflSensitive = true;
      newPohdr.shipfmno = 0;
      newPohdr.frtbillacct = '';
      newPohdr.newFrtbillacct = '';
      Utils.replaceObject(self.pohdr, newPohdr);
      self.setReturnType();

      self.inDrillDownOperation = false;
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

   self.isReviewAndTotals = function () {
      return $state.is(self.baseState + '.reviewAndTotals');
   };

   self.includesReviewAndTotals = function () {
      return $state.includes(self.baseState + '.reviewAndTotals');
   };

   self.delimitedPurchaseOrderNumber = function () {
      if (self.pohdr.pono) {
         return self.pohdr.pono + '-' + Utils.pad(self.pohdr.posuf, 2);
      }
      return "";
   };

   self.isAnyLinesExist = function () {
      return (!self.lineItems || self.lineItems.length === 0) ? false : true;
   };

   self.getVendorNumberForContact = function () {
      if (self.pohdr && self.pohdr.vendno) {
         return self.pohdr.vendno;
      } else {
         return 0;
      }
   };

   self.getShipFmNoForContact = function () {
      if (self.pohdr && self.pohdr.shipfmno > 0) {
         return self.pohdr.shipfmno;
      } else {
         return 0;
      }
   };

   self.getStage = function () {
      if (self.includesInitiate()) {
         return 1;
      } else if (self.includesSelectProducts()) {
         return 2;
      } else if (self.includesReviewAndTotals()) {
         return 3;
      } else {
         return 1;
      }
   };

   self.getVendor = function (callback) {
      var params = {
         vendno: self.pohdr.vendno,
         fldlist: 'limitshipvia'
      };

      DataService.get('api/ap/apsv/getbypk', { params: params }, function (data) {
         if (data) {
            self.isShipViaLimited = data.limitshipvia;
            if (callback) {
               callback();
            }
         }
      });
   };

   self.getShipFrom = function (callback) {
      var params = {
         vendno: self.pohdr.vendno,
         shipfmno: self.pohdr.shipfmno,
         fldlist: 'limitshipvia'
      };

      DataService.get('api/ap/apss/getbypk', { params: params }, function (data) {
         if (data) {
            self.isShipViaLimited = data.limitshipvia;
            if (callback) {
               callback();
            }
         }
      });
   };

   self.editShipToAddress = function () {
      if (self.pohdr) {
         ModalService.showModal('po/poet/shared/edit-ship-to-address-modal.json', 'PoetEditShipToAddressModalCtrl as esta', $scope, function (modal) {
            self.editShipToAddrModal = modal;
         });
      }
   };

   self.destroyEditShipToAddressModal = function () {
      self.editShipToAddrModal.destroy();
   }

   self.isOrderCreated = function () {
      return self.pohdr.pono !== 0;
   };

   self.setDefaultCurrencySymbolForVendor = function (currencyType) {
      var sastcFetchCriteria = {
         currencyty: currencyType
      };

      DataService.post('api/sa/assasetup/sastcfetch', { data: sastcFetchCriteria, busy: true }, function (data) {
         if (data) {
            self.defaultCurrencySymbol = data.currsymbol;
            self.isDefaultCurrencySymbolSet = true;
         }
      });

   };

   self.calculateVendorClaims = function (data) {
      self.vendorContractClaims = data;

      self.vendorClaimTotal = 0;
      self.vendorContractClaims.forEach(function (row) {
         self.vendorClaimTotal = self.vendorClaimTotal + row.usenow;
      });
      self.isVendorContractClaimsAvailable = self.vendorContractClaims && self.vendorContractClaims.length > 0;
   };

   self.findVendorContractsToClaim = function () {
      if (self.pohdr.vendno) {
         var requestCriteria = {
            pvVendno: self.pohdr.vendno
         };

         DataService.get('api/po/aspoheader/povendorcreditretrieve/{pvVendno}', { pathParams: requestCriteria, busy: true }, function (data) {
            if (data) {
               self.calculateVendorClaims(data);
            }
         });
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.vendor');
      }
   };

   self.getPohdr = function () {
      var headerRetrieveCriteria = {
         pono: self.pohdr.pono,
         posuf: self.pohdr.posuf,
         maintmode: self.isAddOrderMode,
         updatetype: self.POHEADERRETRIEVE_MODE_RETRIEVE
      };
      DataService.post('api/po/aspoheader/poheaderretrieve', { data: headerRetrieveCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.pohdr, data.pohdr);
               self.setReturnType();

               //By design, we are not performing the calls to get the APSV or APSS information since we're simply refreshing the Header.
            }
         }
      });
   };

   //This is a multi-step process.  Multiple backend calls are made in sequence.
   self.finish = function () {
      self.updatePohdr(self.finishStep2Header);
   };

   self.finishStep4Reset = function () {
      self.resetPohdr();
      if (self.defaultOrderMode && self.defaultOrderMode === self.DEFAULTORDERMODE_MAINTAIN) {
         $state.go(self.baseState + '.maintain');
      } else {
         $state.go(self.baseState + '.initiate');
      }
   };

   //The Auto-Print is only available for Non-Fax devices.  If the user prints a PO and sets the 'Auto Print' flag,
   //any new PO that is added will be 'printed'.  NOTE:  This does not happen in Maintenance mode.
   //Once the user prints a PO via the Print feature with the flag set to false, this 'Auto Print' feature is disabled.
   self.finishStep3AutoPrint = function () {
      if (self.autoPrintData && self.autoPrintData.autoPrint && self.isAddOrderMode) {
         var poetPrintLaunchCriteria = self.autoPrintData.printLaunchCriteria;
         poetPrintLaunchCriteria.pono = self.pohdr.pono;
         poetPrintLaunchCriteria.posuf = self.pohdr.posuf;

         var printScreenSingle = self.autoPrintData.printSingle;
         printScreenSingle.pono = self.pohdr.pono;
         printScreenSingle.posuf = self.pohdr.posuf;

         var launchCriteria = {
            poetprintreportlist: self.autoPrintData.printReportList,
            printersettings: self.autoPrintData.printerSettingsList,
            poetprintscreensingle: printScreenSingle,
            poetprintlaunchcriteria: poetPrintLaunchCriteria
         };

         DataService.post('api/po/aspoheader/poetprintlaunch', { data: launchCriteria, busy: true }, function () {
            MessageService.info('global.information', 'message.your.automatic.print.request.has.been.submitted');
            self.finishStep4Reset();
         });
      } else {
         self.finishStep4Reset();
      }
   };

   self.finishStep2Header = function () {
      var poheaderfinishCriteria = {
         pono: self.pohdr.pono,
         posuf: self.pohdr.posuf,
         maintmode: self.isAddOrderMode
      };

      DataService.post('api/po/aspoheader/poheaderfinish', { data: poheaderfinishCriteria, busy: true }, function (data) {
         if (data === '' || data.toLowerCase().startsWith(self.BACKEND_WARNING_INDICATOR)) {
            if (data.toLowerCase().startsWith(self.BACKEND_WARNING_INDICATOR)) {

               var msg = $translate.instant('global.finishing.the.purchase.order') + ' ' +
                  self.delimitedPurchaseOrderNumber() + '<br/>' + data;

               MessageService.info('global.information', msg);
            }

            RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_POET, 0, self.delimitedPurchaseOrderNumber());

            if (!self.isAnyLinesExist() && self.isAddOrderMode) {
               MessageService.info('global.information', 'message.number.of.line.items.on.po.number.is.zero', { poNum: self.delimitedPurchaseOrderNumber() });
            }

            self.finishStep3AutoPrint();

         } else {
            var msg = $translate.instant('global.finishing.the.purchase.order') + ' ' +
               self.delimitedPurchaseOrderNumber() + '<br/>' + data;
            MessageService.error('global.error', msg);
         }
      });
   };

   self.updatePohdr = function (callback) {
      var poHeaderUpdateCriteria = {
         pohdr: self.pohdr,
         cType: self.POHEADERUPDATE_MODE_UPDATE
      };

      DataService.post('api/po/aspoheader/poheaderupdate', { data: poHeaderUpdateCriteria, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data);

            if (callback) {
               callback();
            }
         }
      });
   };

   self.updateLineItems = function (callback) {
      var loadPolineListCriteria = {
         pvPono: self.pohdr.pono,
         pvPosuf: self.pohdr.posuf,
         pvShowinactive: true
      };

      DataService.post('api/po/aspoline/loadpolinelist', { data: loadPolineListCriteria }, function (data) {
         if (data) {
            ImageService.getImages(data, 'icsw', 'shipprod', '', '', false, function () {
               Utils.replaceArray(self.lineItems, data);
               if (callback) {
                  callback();
               }
            });
         }
      });
   };

   self.initiate = function () {
      $state.go(self.baseState + '.initiate');
   };

   self.selectProducts = function () {
      $state.go(self.baseState + '.selectProducts');
   };

   self.stageWizardSelectProducts = function () {
      $state.go(self.defaultLineEntryState);
   };

   self.stageWizardReviewAndTotals = function () {
      if (self.subFunctionSecurityForReview > 1) {
         $state.go(self.baseState + '.reviewAndTotals');
      } else {
         MessageService.error('global.error', 'global.operator.security.prohibits.accessing.review.and.totals');
      }
   };

   TabService.canUserCloseTab(self.baseState, function () {
      if (self.inDrillDownOperation) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      } else {
         return true;
      }
   });

});

//This is used for the shopping cart visible on Select Products.  It's an HTML page that lists the items.  They can
//launch a detailed grid from there.
//Alias: cart
app.controller('PoetCartCtrl', function ($scope, $state, MessageService) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.getNetAmount = function () {
      if (base.lineItems) {
         var orderTotal = 0;
         for (var i = 0; i < base.lineItems.length; i++) {
            var currentLineItem = base.lineItems[i];
            orderTotal += currentLineItem.dnetamt;
         }
         return orderTotal.toFixed(2);
      } else {
         return 0;
      }
   };

   self.goToLine = function (product) {
      if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.poline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.lineToEditLineNo = product.lineno;
            ale.clearLineAndReset(base.baseState + '.selectProducts.advancedLineEntry', { lineNo: self.lineToEditLineNo });
            self.lineToEditLineNo = null;
         });
      } else {
         $state.go(base.baseState + '.selectProducts.advancedLineEntry', { lineNo: product.lineno }, { reload: base.baseState + '.selectProducts.advancedLineEntry' });
      }
   };

   self.goToDetailedGrid = function () {
      if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.poline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            ale.clearLineAndReset(base.baseState + '.selectProducts.detailedGrid');
         });
      } else {
         $state.go(base.baseState + '.selectProducts.detailedGrid');
      }
   };

});

//This is used for the Vendor Claims.  It is presented during the process of creating a PO (with Vendor Claims available)
//and when the user clicks 'Contract Amount' from the PO Settings.
//Alias: vc
app.controller('PoetVendorClaimsCtrl', function ($state, $scope, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   self.submitCallback = $stateParams.submitCallback;
   self.cancelCallback = $stateParams.cancelCallback;
   self.vendorClaimTotal = 0;

   self.getSubTitle = function () {
      if (base.pohdr) {
         return base.pohdr.vendno + base.SUBMENU_DELIMITER + base.pohdr.vendname;
      } else {
         return '';
      }
   };

   self.calculateVendorClaimTotal = function () {
      var accumTotal = 0;
      if (base.vendorContractClaims) {
         base.vendorContractClaims.forEach(function (row) {
            accumTotal += row.usenow;
         });
      }
      self.vendorClaimTotal = accumTotal;
   };

   self.initialize = function () {
      self.calculateVendorClaimTotal();
   };

   self.calculateQuantities = function (row, maxqty, actqty, qtyRemaining, qtyToUseNow, isClear) {
      if (isClear) {
         qtyToUseNow = 0;
      } else {
         qtyToUseNow = maxqty - actqty;
      }

      self.processCalculateQuantities(row, maxqty, actqty, qtyRemaining, qtyToUseNow);
   };

   self.processCalculateQuantities = function (row, maxqty, actqty, qtyRemaining, qtyToUseNow) {
      var originalQtyRemaining = maxqty - actqty;

      if (qtyToUseNow <= originalQtyRemaining) {
         qtyRemaining = originalQtyRemaining - qtyToUseNow;
      }
      else {
         qtyToUseNow = originalQtyRemaining;
         qtyRemaining = 0;
      }

      if (qtyToUseNow === 0) {
         qtyRemaining = originalQtyRemaining;
      }

      row.remamt = qtyRemaining;
      row.usenow = qtyToUseNow;

      self.calculateVendorClaimTotal();
   };

   self.cancelAllAmounts = function () {
      base.vendorContractClaims.forEach(function (row) {
         self.calculateQuantities(row, row.maxqty, row.actqty, row.remamt, row.usenow, true);
      });

      self.vendorClaimsGrid.loadData(base.vendorContractClaims);
      self.calculateVendorClaimTotal();
   }

   //This serves both the Clear and Apply Full Amount feature.  'true' means clear.  'false' means Full Apply.
   self.applyClearOrFullAmount = function (isClearMode) {
      var selectedRows = GridService.getSelectedRecords(self.vendorClaimsGrid);
      selectedRows.forEach(function (row) {
         self.calculateQuantities(row, row.maxqty, row.actqty, row.remamt, row.usenow, isClearMode);
      });

      self.vendorClaimsGrid.loadData(base.vendorContractClaims);
      self.calculateVendorClaimTotal();
   };

   //Updateable fields: usenow
   self.onCellChange = function (e, args) {
      if (args) {
         var row = base.vendorContractClaims[args.row];
         self.processCalculateQuantities(row, row.maxqty, row.actqty, row.remamt, row.usenow);
         self.vendorClaimsGrid.loadData(base.vendorContractClaims);
         self.calculateVendorClaimTotal();
      }
   };

   self.submitContinue = function () {
      if (self.submitCallback) {
         self.submitCallback();
      }
   }

   self.submit = function () {
      //Send only the rows that have been updated with a quantity to save on network traffic.
      var rowsToUpdate = base.vendorContractClaims.filter(function (row) {
         return row.usenow > 0;
      });

      if (rowsToUpdate && rowsToUpdate.length > 0) {
         DataService.post('api/po/aspoheader/povendorcreditupdate', { data: rowsToUpdate, busy: true }, function (data) {
            if (data) {
               //NOTE:  Do not write these back to the collection since results only contains the updated row.
               self.submitContinue();
            }
         });
      } else {
         self.submitContinue();
      }
   };

   self.cancel = function () {
      //If when working from some places (i.e. PO Settings), if they cancel, we need to back out any work in case they
      //go back in, we don't want residual data.
      self.cancelAllAmounts();

      //Some places, when the 'Cancel' is hit, we still want to go forward in the workflow (i.e. Initiate PO).
      if (self.cancelCallback) {
         self.cancelCallback();
      } else {
         //Other places, we simply want to go back to where we were called from (i.e. PO Settings).
         $state.go('^');
      }
   };

   self.back = function () {
      self.cancelAllAmounts();
      $state.go('^');
   };

   self.initialize();
});

//This controller is for the Edit the Ship To address Modal popup.  It's accessed from a
//button on the Header Format panel.
//Alias: esta
app.controller('PoetEditShipToAddressModalCtrl', function ($state, $scope, $translate, Utils) {
   var self = this;
   var base = $scope.base;
   self.pohdr = {};

   //Save off our own copy so we can edit at will, and cancel if need-be.
   Utils.replaceObject(self.pohdr, base.pohdr);

   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: 'poeh',
         pono: self.pohdr.pono,
         posuf: self.pohdr.posuf,
         streetaddr: self.pohdr.shiptoaddr1,
         city: self.pohdr.shiptocity,
         state: self.pohdr.shiptost,
         zipcd: self.pohdr.shiptozip,
         country: self.pohdr.countrycd,
         geocd: self.pohdr.geocd,
         outofcityfl: self.pohdr.outofcityfl
      };
   };

   self.submit = function () {
      //Write the values back to the main object where they can be persisted.
      Utils.replaceObject(base.pohdr, self.pohdr);
      base.updatePohdr(self.cancel);
   };

   self.cancel = function () {
      base.destroyEditShipToAddressModal();
   };
});


