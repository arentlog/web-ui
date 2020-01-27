'use strict';

app.controller('WtetBaseCtrl', function ($scope, $state, $translate, DataService, GlobalValueService, MessageService, ModalService, Utils, Sasoo, Sasc, Constants, RecoveryService, TabService, ImageService) {
   var self = this;

   // Get numbered base state (wtet, wtet2, etc.) and use it within this scope of wtet
   self.baseState = TabService.getBaseStateName($scope);

   self.sasoo = Sasoo;
   self.sasc = Sasc;
   self.isAddOrderMode = true;

   self.CRLF = '<br/>';
   self.MENU_FUNCTION_POET = 'poet';      // Needed for sourcing auth points
   self.MENU_FUNCTION_WTET = 'wtet';
   self.SUBMENU_DELIMITER = ' | ';
   self.LABEL_DELIMITER = ': ';
   self.DEFAULTLINEENTRYMODE_EASY = 'e';
   self.DEFAULTLINEENTRYMODE_ADVANCED = 'a';
   self.DEFAULTORDERMODE_ADD = 'a';
   self.DEFAULTORDERMODE_MAINTAIN = 'c';
   self.DEFAULTORDERMODE_DELETE = 'd';
   self.DEFAULTS_SCREEN_NAME = 'DefaultsH5';

   self.WEBSETTING_DEFAULTTRANSFERORDERMODE = 'DefaultTransferOrderMode';
   self.WEBSETTING_DEFAULTLINEENTRYMODE = 'DefaultLineEntryMode';
   self.WEBSETTING_SKIPMAINTAINHEADERFIELDS = 'SkipMaintainHeaderFields';
   self.WEBSETTING_DEFAULTLINETYPE = 'DefaultLineType';
   self.WEBSETTING_EASYDEFAULTQUANTITY = 'EasyDefaultQuantity';

   self.SETTINGVALUE_ORDERTYPE_DEFAULT = 'wt';
   self.SETTINGVALUE_LINETYPE_DEFAULT = '';
   self.WAREHOUSETRANSFER_MODE_ADD = 'a';
   self.WAREHOUSETRANSFER_MODE_CHANGE = 'c';
   self.WAREHOUSETRANSFER_MODE_DELETE = 'd';
   self.WAREHOUSETRANSFER_TYPE_PO = 'wt';
   self.HEADERFIELD_SHIPVIATYPE = 'shipviaty';
   self.HEADERFIELD_FREIGHTTERMSCODE = 'frttermscd';
   self.WTHEADERUPDATE_MODE_UPDATE = 'update';
   self.WTHEADERRETRIEVE_MODE_RETRIEVE = 'Retrieve';
   self.WTHEADERRETRIEVE_MODE_CHECKDELETE = "CheckDelete";
   self.PROCESSTYPE_START = 'Start';
   self.NONSTOCKTYPE_NONSTOCK = 'n';
   self.NONSTOCKTYPE_STOCKED = '';
   self.WTLINECREATEMAINTMODE_ADD = 'a';
   self.HEADERFIELD_LEAVE_FINISHADDONS = 'FinishAddons';
   self.BACKEND_WARNING_INDICATOR = 'warning';
   self.UNIT_EACH = "each";   

   //hydrated after the order is created/retrieved
   self.wthdr = {};
   self.orderTotals = {};
   self.lineItems = [];
   self.defaultLineType = self.NONSTOCKTYPE_STOCKED;    // Stock line item.
   self.defaultCurrencySymbol = '';
   self.isDefaultCurrencySymbolSet = false;
   self.transferOrderNumber = 0;
   self.inDrillDownOperation = false;

   //These are a couple of values that need to be 'sticky' while the user is logged in.  The setting is
   //shared between OEET, POET, and WTET.
   self.autoPrintDefault = GlobalValueService.get('Global.AutoPrint') || false;

   var retrieveWebSettingRequest = {
      cFunctionName: self.MENU_FUNCTION_WTET,
      cScreenName: 'DefaultsH5',
      cSettingName: ''
   };

   DataService.post('api/shared/assharedentry/retrievewebsetting', { data: retrieveWebSettingRequest, busy: true }, function (data) {
      if (data) {
         self.defaultWebSettings = data;
         self.setDefaultWebSettings();
         self.resetWthdr();
      }
   });

   self.setDefaultWebSettings = function () {
      self.defaultWebSettings.forEach(function (webSetting) {
         switch (webSetting.settingname) {
            case self.WEBSETTING_DEFAULTTRANSFERORDERMODE:
               if (webSetting.settingvalue) {
                  if (webSetting.settingvalue === self.DEFAULTORDERMODE_MAINTAIN) {
                     $state.go(self.baseState + '.maintain');
                  } else if (webSetting.settingvalue === self.DEFAULTORDERMODE_DELETE) {
                     $state.go(self.baseState + '.delete');
                  }

                  self.defaultOrderMode = webSetting.settingvalue;
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
      if (!self.defaultLineEntryState) {
         self.defaultLineEntryState = self.baseState + '.selectProducts';
      }

      if (!self.easyDefaultQuantity) {
         self.easyDefaultQuantity = parseFloat(0).toFixed(2); 
      }
   };

   self.resetWthdr = function () {
      // During add mode, only the "WT" order type is allowed (we don't allow a Direct Order to be created in WTET by the users).
      var newWthdr = {};

      newWthdr.wttype = self.defaultOrderType;
      newWthdr.cono2 = Sasc.cono;
      newWthdr.wttype = self.SETTINGVALUE_ORDERTYPE_DEFAULT;
      Utils.replaceObject(self.wthdr, newWthdr);
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

   self.delimitedTransferOrderNumber = function () {
      if (self.wthdr.wtno) {
         return self.wthdr.wtno + '-' + Utils.pad(self.wthdr.wtsuf, 2);
      }
      return '';
   };

   self.isAnyLinesExist = function () {
      return (!self.lineItems || self.lineItems.length === 0) ? false : true;
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

   self.editShipToAddress = function () {
      if (self.wthdr) {
         ModalService.showModal('wt/wtet/shared/edit-ship-to-address-modal.json', 'WtetEditShipToAddressModalCtrl as esta', $scope, function (modal) {
            self.editShiptoAddrModal = modal;
         });
      }
   };

   self.destroyEditShipToAddressModal = function () {
      self.editShiptoAddrModal.destroy();
   }

   self.isOrderCreated = function () {
      return self.wthdr.wtno !== 0;
   };

   self.calculateVendorClaims = function (data) {
      self.vendorContractClaims = data;

      self.vendorClaimTotal = 0;
      self.vendorContractClaims.forEach(function (row) {
         self.vendorClaimTotal = self.vendorClaimTotal + row.usenow;
      });
      self.isVendorContractClaimsAvailable = self.vendorContractClaims && self.vendorContractClaims.length > 0;
   };

   self.getWthdr = function (callback) {
      var headerRetrieveCriteria = {
         wtno: self.wthdr.wtno,
         wtsuf: self.wthdr.wtsuf,
         maintmode: self.isAddOrderMode,
         updatetype: self.WTHEADERRETRIEVE_MODE_RETRIEVE
      };
      DataService.post('api/wt/aswtheader/wtetheaderretrieve', { data: headerRetrieveCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
                Utils.replaceObject(self.wthdr, data.wthdr);
                if (callback) {
                    callback();
                }
            }
         }
      });
   };

   self.finishAutoPrint = function () {
      if (self.autoPrintData && self.autoPrintData.autoPrint && self.isAddOrderMode) {
         var pickTicketSettings = self.autoPrintData.pickTicketSettings;
         var printLoadCriteria = self.autoPrintData.printLoadCriteria;
         printLoadCriteria.wtno = self.wthdr.wtno;
         printLoadCriteria.wtsuf = self.wthdr.wtsuf;
         DataService.post('api/wt/aswtheader/wtetprintrun', { data: { printersettings: pickTicketSettings, wtetprint: printLoadCriteria }, busy: true }, function (data) {
            MessageService.info('global.information', 'message.your.print.request.has.been.sent');
         });
      }
   };

   self.finish = function () {
      self.updateWthdr(self.finishHeader);
   };

   self.finishHeader = function () {

      var wtheaderfinishCriteria = {
         wtno: self.wthdr.wtno,
         wtsuf: self.wthdr.wtsuf,
         maintmode: self.isAddOrderMode
      };

      DataService.post('api/wt/aswtheader/wtetheaderfinish', { data: wtheaderfinishCriteria, busy: true }, function (data) {
         if (data === '') {
            RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_WTET, 0, self.delimitedTransferOrderNumber());

            if (!self.isAnyLinesExist() && self.isAddOrderMode) {
               MessageService.info('global.information', 'message.number.of.line.items.on.wt.number.is.zero', { wtNum: self.delimitedTransferOrderNumber() });
            }
            self.finishAutoPrint();
            self.resetWthdr();
            $state.go(self.baseState + '.initiate');
         } else {
            // Warning message for # of line item = zero, comes from backend.
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }
            RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_WTET, 0, self.delimitedTransferOrderNumber());
            self.finishAutoPrint();
            self.resetWthdr();
            $state.go(self.baseState + '.initiate');
         }
      });
   };

   self.updateWthdr = function (callback) {
      DataService.post('api/wt/aswtheader/wtetheaderupdate', { data: self.wthdr, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data);

            if (callback) {
               callback();
            }
         }
      });
   };

   self.updateLineItems = function (callback) {

      var loadWtlineListCriteria = {
         wtno: self.wthdr.wtno,
         wtsuf: self.wthdr.wtsuf
      };

      DataService.post('api/wt/aswtline/wtetretrievelines', { data: loadWtlineListCriteria }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               ImageService.getImages(data.wtlines, 'icsw', 'shipprod', '', '', false, function () {
                  Utils.replaceArray(self.lineItems, data.wtlines);
                  if (callback) {
                     callback();
                  }
               });
            }

            if (callback) {
               callback();
            }
         }
      });
   };

   self.initiate = function () {
      $state.go(self.baseState + '.initiate');
   };

   self.selectProducts = function () {
      $state.go(self.baseState + '.selectProducts');
   };

   self.reviewAndTotals = function () {
      $state.go(self.baseState + '.reviewAndTotals');
   };

   self.stageWizardSelectProducts = function () {
      $state.go(self.defaultLineEntryState);
   };

   self.stageWizardReviewAndTotals = function () {
      $state.go(self.baseState + '.reviewAndTotals');
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

app.controller('WtetStageWizardCtrl', function ($state, $scope, MessageService) {
   var self = this;
   var base = $scope.base;

   self.selectProducts = function () {
      $state.go(base.defaultLineEntryState);
   };

   self.reviewAndTotals = function () {
      if ($state.is(base.baseState + '.selectProducts.advancedLineEntry')) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            $state.go(base.baseState + '.reviewAndTotals');
         });
      } else {
         $state.go(base.baseState + '.reviewAndTotals');
      }
   };

});

//This is used for the shopping cart visible on Select Products.  It's an HTML page that lists the items.  They can
//launch a detailed grid from there.
//Alias: cart
app.controller('WtetCartCtrl', function ($scope, $state, MessageService) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.getNetAmount = function () {
      var orderTotal = 0;
      if (base.wthdr) {
         orderTotal = base.wthdr.totordamt;
      }
      return orderTotal;
   };

   self.goToLine = function (product) {
      if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.wtline.prod) {
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
      if ($state.is(base.baseState + '.selectProducts.advancedLineEntry') && ale.wtline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            ale.clearLineAndReset(base.baseState + '.selectProducts.detailedGrid');
         });
      } else {
         $state.go(base.baseState + '.selectProducts.detailedGrid');
      }
   };
});

//This controller is for the Edit the Ship To address Modal popup.  It's accessed from a
//button on the Header Format panel.
//Alias: esta
app.controller('WtetEditShipToAddressModalCtrl', function ($state, $scope, $translate, Utils) {
   var self = this;
   var base = $scope.base;
   self.wthdr = {};

   //Save off our own copy so we can edit at will, and cancel if need-be.
   Utils.replaceObject(self.wthdr, base.wthdr);

   self.submit = function () {
      //Write the values back to the main object where they can be persisted.
      Utils.replaceObject(base.wthdr, self.wthdr);
      base.updateWthdr(self.cancel);
   };

   self.cancel = function () {
      base.destroyEditShipToAddressModal();
   };
});

