'use strict';

//Accessed when we move forward workflow from Initiate.
//Alias: sp
app.controller('WtetSelectProductsCtrl', function ($scope, $state, $translate, DataService, SecurityService, UserService, MessageService, Utils, AuthService, Constants, ImageService) {
   var self = this;
   var base = $scope.base;

   self.baseWtline = {};
   self.wtline = {};
   self.wtlnties = [];
   self.isLaunchTally = false;
   self.product = {};
   self.wlwhsechgfl = (base.wthdr.wlwhsefl && base.wthdr.stagecd >= 2 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;

   base.sidebarCollapsed = false;

   self.searchResults = [];

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(base.MENU_FUNCTION_POET);

   self.isTransferOrderSettings = function () {
      return $state.is(base.baseState + '.selectProducts.transferOrderSettings');
   };

   self.productSearch = function () {
      var criteria = {
         LookupParameter: 'icsw',
         MaxResults: Constants.EASY_ENTRY_RECORD_LIMIT,
         IsEasyLineSearch: true,
         QueryText: self.productToSearch,
         ProductType: ['icsw', 'icsp', 'icsec'],
         FacetQuery: {
            whse: [base.wthdr.shipfmwhse]
         }
      };

      DataService.post(Constants.SEARCH_PATH, { data: criteria, busy: true, errorFunction: 'selectproducts-wt' }, function (data) {
         if (data) {
            data = Utils.processData(criteria, data, 'wt');
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
      self.product = product;
      //Go directly to the Initialize and Create steps from here.
      self.createwtLineStep2Initialize(product);
   };

   self.createwtLineStep3Create = function (product) {

      if (!product.QuantityOrdered) {
         product.QuantityOrdered = base.easyDefaultQuantity;
      }

      self.wtline.prod = product.value;
      self.wtline.prodcost = 0;
      self.wtline.qtyord = product.QuantityOrdered;
      self.wtline.unit = 'each';
      if (product.calc_uom) {
         self.wtline.unit = product.calc_uom;
      }

      var wtLinecreateCriteria = {
         wtline: self.wtline,
         wtlnties: self.wtlnties,
         cMaintMode: true, //Add mode
         wtlinecriteria: {},  // not used in this SI call
         cChangeList: 'prod,unit,qtyord'
      };

      DataService.post('api/wt/aswtLine/wtLinecreate', { data: wtLinecreateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {

               if (data.wtline.restrictovrfl && data.wtline.restricterrmess && data.wtline.restricterrmess.length > 0) {
                  self.wtline = data.wtline;
                  MessageService.info('global.information', data.wtline.restricterrmess);

                  AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.wtLineCreateCheckAuthPassed, self.wtLineCreateCheckAuthFailed);
                  return;
               }

               if (data.cUpdateMessage && data.cUpdateMessage !== 'ok') {
                  if (data.cUpdateMessage && data.cUpdateMessage.length > 0) {
                     MessageService.info('global.information', data.cUpdateMessage);
                  }

                  self.wtline = data.wtLine;
               }

               base.updateLineItems();
               // Must retrieve latest WT header to contain latest totals.
               base.getWthdr();
            }
         }
      });
   };

   //User Hook (do not rename)
   self.setWTLineCriteria = function (wtline) { };

   //User Hook (do not rename)
   self.createwtLineStep2InitializeContinue = function (wtline, product) {
      self.createwtLineStep3Create(product);
   };

   self.createwtLineStep2Initialize = function (product) {
      self.wtlnties = [];

      var wtLineInitializeCriteria = {
         maintmode: true,
         wtno:  base.wthdr.wtno,
         wtsuf: base.wthdr.wtsuf,
         processtype: base.PROCESSTYPE_START,
         secure: self.operatorMenuSecurity
      };

      DataService.post('api/wt/aswtLine/wtLineinitialize', { data: wtLineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            self.wtline = {};
            Utils.replaceObject(self.baseWtline, data.wtline);
            Utils.replaceObject(self.wtline, data.wtline);
            self.view.applyAutoFocus(); 
            //User Hook (do not rename)
            self.createwtLineStep2InitializeContinue(self.wtline, product);
         }
      });
   };

   self.createwtLineStep1CancelChange = function (product) {

      if (self.wtline && self.wtline.lineno > 0) {
         var wtLineCancelChangeCriteria = {
            lineno: self.wtline && self.wtline.lineno ? self.wtline.lineno : 0,
            maintmode: true,
            wtno: base.wthdr.wtno,
            wtsuf: base.wthdr.wtsuf
         };

         DataService.post('api/wt/aswtLine/wtLinecancelchange', { data: wtLineCancelChangeCriteria, busy: true }, function (data) {
            self.createwtLineStep2Initialize(product);
         });
      } else {
         self.createwtLineStep2Initialize(product);
      }
   };

   self.clearRestrictionErrorMessage = function () {
      self.wtline.restricterrmess = '';
   };

   self.resetRestrictionOverrideFlag = function () {
      self.wtline.restrictovrfl = false;
   };

   self.wtLineCreateCheckAuthPassed = function () {

      self.wtline.restrictovrfl = true;
      self.wtline.restricterrmess = '';

      //Passed Authorization, call it again.
      self.createwtLineStep3Create(self.product);
   };

   self.wtLineCreateCheckAuthFailed = function () {
      self.resetRestrictionOverrideFlag();
   };

   self.navigateToProduct = function (product) {
      $state.go('icip.detail', { pk: product, pk2: base.wthdr.shipfmwhse });
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

//Accessed when the user clicks 'Transfer Order Settings" from the Select Products view.
//Alias: pos
app.controller('WtetTransferOrderSettingsCtrl', function ($scope, $state, $stateParams, $translate, CommonConverters, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.resetWthdr = angular.copy(base.wthdr);
   self.callingState = $stateParams.callingState;

   self.orderAltNo = '';

   // First time in here
   if (base) {
      if (base.wthdr) {
         if (base.wthdr.orderaltno) {
            self.orderAltNo = base.wthdr.orderaltno.toString() + '-' + CommonConverters.Suffix.convert(base.wthdr.orderaltsuf);
         }
      }
   }

   self.save = function () {
      base.updateWthdr();
   };

   self.reset = function () {
      base.wthdr = angular.copy(self.resetWthdr);
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
   };
});