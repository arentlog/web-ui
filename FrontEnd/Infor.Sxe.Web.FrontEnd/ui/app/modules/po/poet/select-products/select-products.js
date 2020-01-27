'use strict';

//Accessed when we move forward workflow from Initiate.
//Alias: sp
app.controller('PoetSelectProductsCtrl', function ($scope, $state, $translate, DataService, SecurityService, UserService, MessageService, Utils, AuthService, Constants, ImageService) {
   var self = this;
   var base = $scope.base;

   self.basePoline = {};
   self.poline = {};
   self.poLineTies = [];
   self.poBundlesCriteria = [];
   self.poBundlesControl = {};
   self.poTallyCriteria = {};
   self.poCoreAllocationCriteria = {};
   self.isLaunchTally = false;

   base.sidebarCollapsed = false;

   self.searchResults = [];

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(base.MENU_FUNCTION_POET);

   self.isPurchaseOrderSettings = function () {
      return $state.is(base.baseState + '.selectProducts.purchaseOrderSettings');
   };

   self.productSearch = function () {
      var criteria = {
         LookupParameter: 'icsw',
         MaxResults: Constants.EASY_ENTRY_RECORD_LIMIT,
         IsEasyLineSearch: true,
         ProductType: ['icsw', 'icsp', 'icsec'],
         QueryText: self.productToSearch,
         FacetQuery: {
            whse: [base.pohdr.whse],
            keyno: [base.pohdr.vendno]
         },
         MustNot: {
            statustype: ['x']
         }
      };

      DataService.post(Constants.SEARCH_PATH, { data: criteria, busy: true, errorFunction: 'selectproducts-po' }, function (data) {
         if (data) {
            data = Utils.processData(criteria, data, 'po');
            Utils.replaceArray(self.searchResults, data.hits);
            ImageService.getImages(self.searchResults, 'icsw');
         }
      });
   };

   self.clearSearch = function () {
      Utils.clearArray(self.searchResults);
      self.productToSearch = '';
      self.view.applyAutoFocus();
   };

   self.getNextLineNumber = function () {
      var nextLineNumber = 0;
      if (base.lineItems && base.lineItems.length > 0) {

         base.lineItems.forEach(function (result) {
            nextLineNumber = result.lineno;
         });
      }

      nextLineNumber++;

      return nextLineNumber;
   };

   self.addProduct = function (product) {
      //Go directly to the Initialize and Create steps from here.
      self.createPoLineStep2Initialize(product);
   };

   self.createPoLineStep5Refresh = function (data) {
      self.poline = data.poline;
      if (self.launchTallies()) {
         //TODO: Do we need to launch Tallies/Bundles or just provide a warning?
      }
      base.updateLineItems();
      // Must retrieve latest PO header to contain latest totals.
      base.getPohdr();
   };

   //User Hook (do not rename)
   self.poLineValidateContinue = function (poline, product) {
      self.createPoLineStep4Create(product);
   };

   //User Hook (do not rename)
   self.poLineValidateCallback = function (data, product) {
      if (data.messaging) {
         MessageService.processMessaging(data.messaging);
      }

      Utils.replaceObject(self.basePoline, data.poline);
      Utils.replaceObject(self.poline, data.poline);
      self.isLineValidated = true;

      //The Price is only available after the line is validated.  Stuff it on the object so we can
      //create the line.  NOTE:  Price is not visible on the "Easy Line Mode" for that reason.  No
      //call exists to get product Price (which is Costs in PO), except for the PoLineValidate call).
      product.Price = self.poline.price;

      //User Hook (do not rename)
      self.poLineValidateContinue(data.poline, product);
   };

   self.createPoLineStep3Validate = function (product) {
      if (!product.QuantityOrdered) {
         product.QuantityOrdered = base.easyDefaultQuantity;
      }

      self.poline.pono = base.pohdr.pono;
      self.poline.posuf = base.pohdr.posuf;
      self.poline.prod = product.value;
      self.poline.qtyord = product.QuantityOrdered;

      //User Hook (do not rename)
      base.setPoLineCriteria(self.poline);

      if (product.calc_uom) {
         self.poline.unit = product.calc_uom;
      } else {
         self.poline.unit = base.UNIT_EACH;
      }

      var poLineValidateRequest = {
         polineties: self.poLineTies,
         poline: self.poline,
         cMaintMode: base.IS_ADD_MODE,
         cChangeList: 'prod,qtyord,unit,' //NOTE:  The ending comma on this field list is necessary and very important.
      };

      DataService.post('api/po/aspoline/polinevalidate', { data: poLineValidateRequest, busy: true }, function (data) {
         if (data) {
            //User Hook (do not rename)
            self.poLineValidateCallback(data, product);
         }
      });
   };

   self.createPoLineStep4Create = function (product) {

      var polinecreateCriteria = {
         poline: self.poline,
         polineties: self.poLineTies,
         cMaintMode: base.IS_ADD_MODE,
         cChangeList: 'prod,scrnprice,unit,qtyord,' //NOTE:  This trailing "," is very important, otherwise the line won't drop.
      };

      DataService.post('api/po/aspoline/polinecreate', { data: polinecreateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.poline.restrictovrfl && data.poline.restricterrmess && data.poline.restricterrmess.length > 0) {
                  self.poline = data.poline;
                  MessageService.info('global.information', data.poline.restricterrmess);

                  AuthService.createAuthPoint(
                     base.MENU_FUNCTION_POET,
                     'lines',
                     'restrictovrfl',
                     '',
                     '',
                     null,
                     function () {
                        //Passed Authorization, call it again but mark it as restriction overridden.
                        self.poline.restricterrmess = '';
                        self.poline.restrictovrfl = true;
                        self.createPoLineStep4Create(product);
                     },
                     function () {
                        //Failed Authorization (or Cancelled)
                        self.resetRestrictionOverrideFlag();
                     });
                  return;
               }

               if (data.cUpdateMessage && data.cUpdateMessage !== base.MESSAGING_OK) {
                  MessageService.alertOk('global.alert', data.cUpdateMessage, function () {
                     self.createPoLineStep5Refresh(data);
                  });
               } else {
                  self.createPoLineStep5Refresh(data);
               }
            }
         }
      });
   };

   self.createPoLineStep2Initialize = function (product) {
      self.poLineTies = [];
      self.poBundlesCriteria = [];
      self.poBundlesControl = {};
      self.poTallyCriteria = {};
      self.poCoreAllocationCriteria = {};

      var poLineInitializeCriteria = {
         maintmode: true,
         pono:  base.pohdr.pono,
         posuf: base.pohdr.posuf,
         processtype: base.PROCESSTYPE_START,
         secure: self.operatorMenuSecurity
      };

      DataService.post('api/po/aspoline/polineinitialize', { data: poLineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.basePoline, data);
            Utils.replaceObject(self.poline, data);

            self.basePoline.nonstockty = self.basePoline.cDefaultNonStockTy;
            self.poline.nonstockty = self.poline.cDefaultNonStockTy;

            self.createPoLineStep3Validate(product);
         }
      });
   };

   self.createPoLineStep1CancelChange = function (product) {

      if (self.poline && self.poline.lineno > 0) {
         base.firstNonStockInitialize = true;

         var poLineCancelChangeCriteria = {
            lineno: self.poline && self.poline.lineno ? self.poline.lineno : 0,
            maintmode: true,
            pono: base.pohdr.pono,
            posuf: base.pohdr.posuf
         };

         DataService.post('api/po/aspoline/polinecancelchange', { data: poLineCancelChangeCriteria, busy: true }, function () {
            self.createPoLineStep2Initialize(product);
         });
      } else {
         self.createPoLineStep2Initialize(product);
      }
   };

   //TODO: SS mentioned that we should force the user to Advanced Line Entry for any non-normal items.
   //Q:  How do we determine that and where to trap?  Do we need a new call that figures this out for us first?
   self.launchTallies = function () {
      var isLaunchTally = false;
      if (self.poline) {
         if (!self.poline.lLaunchedTally && self.poline.lForceTallyMix) {
            isLaunchTally = true;
            if (self.poline.reqbundleidfl) {
               //TODO AJW: Launch Bundles tab here.  Perhaps make button visible?
            } else {
               //TODO AJW: Launch Tallies tab here.  Perhaps make button visible?
            }
         }
      }

      return isLaunchTally;
   };

   self.clearRestrictionErrorMessage = function () {
      self.poline.restricterrmess = '';
   };

   self.resetRestrictionOverrideFlag = function () {
      self.poline.restrictovrfl = false;
   };

   self.navigateToProduct = function (productNumber) {
      $state.go('icip.detail', { pk: productNumber, pk2: base.pohdr.whse });
   };

   self.advanced = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry', { product: self.productToSearch });
   };

   self.details = function (product) {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry', { product: product.value, qtyord: product.QuantityOrdered, unit: product.calc_uom});
   };

   self.continue = function () {
      $state.go(base.baseState + '.reviewAndTotals');
   };

});

//Accessed when the user clicks 'Purchase Order Settings" from the Select Products view.
//Alias: pos
app.controller('PoetPurchaseOrderSettingsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.resetPohdr = angular.copy(base.pohdr);
   self.callingState = $stateParams.callingState;

   self.isFreightRelatedFieldChanged = false;
   self.isFreightRelatedFieldChangedAndWarningPresented = false;
   self.freightRelatedFields = [base.HEADERFIELD_SHIPVIATYPE, base.HEADERFIELD_FREIGHTTERMSCODE];

   self.tiePurchaseOrderNumberSuffix = function () {
      if (base.pohdr.orderaltno) {
         return base.pohdr.orderaltno + '-' + Utils.pad(base.pohdr.orderaltsuf, 2);
      } else {
         return '';
      }
   };

   self.shipViaLostFocus = function () {
      self.poheaderLeaveField(base.HEADERFIELD_SHIPVIATYPE);
   };

   self.freightTermsLostFocus = function () {
      self.poheaderLeaveField(base.HEADERFIELD_FREIGHTTERMSCODE);
   };

   self.isFreightRelatedField = function (fieldName) {
      return self.freightRelatedFields.indexOf(fieldName.toLowerCase()) > -1;
   };

   self.poheaderLeaveField = function (fieldName) {
      var poHeaderFieldLeaveRequest = {
         pohdr: base.pohdr,
         cField: fieldName
      };
      DataService.post('api/po/aspoheader/poheaderfieldleave', { data: poHeaderFieldLeaveRequest, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage && data.cWarningMessage.length > 0) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            base.pohdr = data.pohdr;

            if (self.isFreightRelatedField(fieldName) && base.pohdr.frtbillacct !== base.pohdr.newFrtbillacct) {
               if (self.isFreightRelatedFieldChangedAndWarningPresented) {
                  base.pohdr.frtbillacct = base.pohdr.newFrtbillacct;
               } else {
                  self.isFreightRelatedFieldChangedAndWarningPresented = true;

                  var popupMessage = $translate.instant('message.the.freight.bill.account.is.changing.from');
                  if (base.pohdr.frtbillacct) {
                     popupMessage = popupMessage + ' ' + base.pohdr.frtbillacct;
                  } else {
                     popupMessage = popupMessage + ' ' + $translate.instant('global.blank.in.parenthesis');
                  }

                  popupMessage = popupMessage + ' ' + $translate.instant('global.to.as.lowercase');

                  if (base.pohdr.newFrtbillacct) {
                     popupMessage = popupMessage + ' ' + base.pohdr.newFrtbillacct;
                  } else {
                     popupMessage = popupMessage + ' ' + $translate.instant('global.blank.in.parenthesis');
                  }

                  popupMessage = popupMessage + ' ' + $translate.instant('question.do.you.wish.to.continue');

                  MessageService.yesNo('global.question', popupMessage,
                  // Yes processing
                  function () {
                     base.pohdr.frtbillacct = base.pohdr.newFrtbillacct;
                     self.isFreightRelatedFieldChangedAndWarningPresented = false;
                  }, // No processing
                  function () {
                     self.isFreightRelatedFieldChangedAndWarningPresented = false;
                  });
               }
            }
         }
      });
   };

   self.launchVendorClaims = function () {
      if (base.isVendorContractClaimsAvailable) {
         $state.go(base.baseState + '.selectProducts.purchaseOrderSettings.vendorClaims', { submitCallback: self.vendorClaimsCallback });
      } else {
         MessageService.error('global.error', 'global.no.vendor.claims.are.available');
      }
   };

   self.vendorClaimsCallback = function () {
      //Refind the Vendor Claims, since they might all be consumed at this point, we'd hide the button.
      self.findVendorClaims();

      //Return back to the same state (which is the PO Settings).
      $state.go('^');
   };

   self.findVendorClaims = function () {
      var requestCriteria = {
         pvVendno: base.pohdr.vendno
      };

      DataService.get('api/po/aspoheader/povendorcreditretrieve/{pvVendno}', { pathParams: requestCriteria, busy: true }, function (data) {
         if (data) {
            base.calculateVendorClaims(data);
         }
      });
   };

   self.initiate = function () {
      self.findVendorClaims();
   };

   self.updateLineItems = function () {
      base.updateLineItems();
   };

   self.save = function () {
      base.updatePohdr(self.updateLineItems);
   };

   self.reset = function () {
      base.pohdr = angular.copy(self.resetPohdr);
   };

   self.refresh = function () {
   };

   self.back = function () {
      if (self.callingState) {
         $state.go(self.callingState);
      }
      else {
         $state.go('^');
      }

      if ($scope.sp && $scope.sp.view) {
         $scope.sp.view.applyAutoFocus();
      }
   };

   self.initiate();
});

