'use strict';

app.controller('OeetTaxesAndTotalsCtrl', function ($state, $stateParams, $scope, DataService, MessageService, GridService, Utils) {
   var self = this;
   var base = $scope.base;

   self.orderSuffix = base.oehdr.ordersuf ? base.oehdr.ordersuf : 0;
   self.taxSettings = {};
   self.taxStateTypes = [];
   self.taxCountyTypes = [];
   self.taxCityTypes = [];
   self.taxOther1Types = [];
   self.taxOther2Types = [];
   self.taxAuthTypes = [];
   self.taxDetailGrid = {};
   self.taxDetailCollection = [];
   self.addonsCollection = [];
   self.callType = '';

   self.navFromState = $stateParams.navFromState;
   self.drilldownState = $stateParams.drilldownState;

   self.loadTaxSettings = function () {
      var loadTaxSettingsCriteria = {
         maintmode: base.isAddOrderMode,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf
      };
      DataService.post('api/oe/asoeheader/loadoetaxsettings', { data: loadTaxSettingsCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.taxSettings, data.loadoetaxsettingsresults);
            }

            // sometimes need to set default state code for dropdown menu when using AvaTax
            if (base.orderTotals.statecd) {
               self.taxSettings.statecd = base.orderTotals.statecd;
            }

            self.loadTaxCombos();
            self.loadTaxDetail();

            if (self.drilldownState === 'addons') {
               $state.go('.addons');
            } else if (self.drilldownState === 'discounts') {
               $state.go('.discounts');
            }
         }
      });
   };

   // When using Taxware, these calls can collide so run loadTaxSettings as the callback function so that
   // getOrderTotals will complete before loadTaxSettings is run
   base.getOrderTotals(self.loadTaxSettings);

   self.loadTaxCombos = function () {
      var loadTaxCombosCriteria = {
         citycd: self.taxSettings.citycd,
         countycd: self.taxSettings.countycd,
         other1cd: self.taxSettings.other1cd,
         other2cd: self.taxSettings.other2cd,
         statecd: self.taxSettings.statecd,
         taxauth: self.taxSettings.taxauth
      };
      DataService.post('api/oe/asoeheader/loadoetaxcombos', { data: loadTaxCombosCriteria, busy: true }, function (data) {
         if (data) {
            self.createOptionsFromStrings(self.taxStateTypes, data.statecodes, data.statedescs);
            self.createOptionsFromStrings(self.taxCountyTypes, data.countycodes, data.countydescs);
            self.createOptionsFromStrings(self.taxCityTypes, data.citycodes, data.citydescs);
            self.createOptionsFromStrings(self.taxOther1Types, data.other1codes, data.other1descs);
            self.createOptionsFromStrings(self.taxOther2Types, data.other2codes, data.other2descs);
            self.createOptionsFromStrings(self.taxAuthTypes, data.taxauthcodes, data.taxauthdescs);
         }
      });
   };

   self.loadTaxDetail = function () {
      DataService.get('api/oe/asoeheader/oetaxdetailretrieve/' + base.oehdr.orderno + '/' + Utils.pad(base.oehdr.ordersuf, 2), { busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(self.taxDetailCollection, data);
         }
      });
   };

   self.createOptionsFromStrings = function (optionArray, optionCodes, optionDescriptions) {
      var optionTypes = [];
      if (optionCodes && optionDescriptions) {
         var codesList = optionCodes.split(',');
         var descriptionsList = optionDescriptions.split(',');
         for (var i = 0; i < codesList.length; i++) {
            var currentCode = codesList[i];
            if (currentCode) {
               optionTypes.push({ label: descriptionsList[i], value: currentCode });
            }
         }
      }
      Utils.replaceArray(optionArray, optionTypes);
   };

   self.saveTaxesAndTotals = function (callback) {
      self.saveTaxSettings();

      var taxesTotalsUpdateRequest = {
         oeaddons: self.addonsCollection,
         oehdr: base.oehdr,
         lMaintMode: base.isAddOrderMode
      };

      //User Hook (do not rename)
      if (self.saveTaxesAndTotalsCriteriaContinue) {
         self.saveTaxesAndTotalsCriteriaContinue(taxesTotalsUpdateRequest);
      }

      DataService.post('api/oe/asoeheader/oetaxestotalsupdate', { data: taxesTotalsUpdateRequest, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {

            // If using AvaTax, don't calculate taxes on each line add
            // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
            if (base.taxMethodType.toLowerCase() === 'a') {
               base.calcsob = 'z';
            } else {
               base.calcsob = 'b';
            }

            if (self.callType === 'suspend') {
               self.callType = '';
               base.suspend();
            }
            else if (self.callType === 'finish') {
               self.callType = '';
               base.finishOrder();
            }
            else if (callback) {
               base.getOrderData(callback);
            } else {
               base.getOrderData();
            }
         }
      });
   };

   self.saveTaxSettings = function () {
      base.oehdr.statecd = self.taxSettings.statecd;
      base.oehdr.countycd = self.taxSettings.countycd;
      base.oehdr.citycd = self.taxSettings.citycd;
      base.oehdr.other1cd = self.taxSettings.other1cd;
      base.oehdr.other2cd = self.taxSettings.other2cd;
      base.oehdr.taxauth = self.taxSettings.taxauth;
      base.oehdr.taxablefl = self.taxSettings.taxablefl;
      base.oehdr.pstlicenseno = self.taxSettings.pstlicenseno;
      base.oehdr.taxovercd = self.taxSettings.overridetype;
      base.oehdr.taxoverfl = self.taxSettings.taxoverfl;
      base.oehdr.nontaxtype = self.taxSettings.nontaxtype;
   };

   self.taxStateChanged = function () {
      //reset everything below state
      self.taxSettings.countycd = '';
      self.taxSettings.citycd = '';
      self.taxSettings.other1cd = '';
      self.taxSettings.other2cd = '';
      self.taxSettings.taxatuh = '';
      //reload the combos
      self.loadTaxCombos();
   };

   self.taxCountyChanged = function () {
      //reset everything below county
      self.taxSettings.citycd = '';
      self.taxSettings.other1cd = '';
      self.taxSettings.other2cd = '';
      self.taxSettings.taxatuh = '';
      //reload the combos
      self.loadTaxCombos();
   };

   self.taxCityChanged = function () {
      //reset everything below city
      self.taxSettings.other1cd = '';
      self.taxSettings.other2cd = '';
      self.taxSettings.taxatuh = '';
      //reload the combos
      self.loadTaxCombos();
   };

   self.taxableChanged = function () {
      if (self.taxSettings.taxablefl) {
         self.taxableTrue();
      } else {
         self.taxSettings.citycdenabled = false;
         self.taxSettings.countycdenabled = false;
         self.taxSettings.nontaxtypeenabled = true;
         self.taxSettings.other1cdenabled = false;
         self.taxSettings.other2cdenabled = false;
         self.taxSettings.statecdenabled = false;
         self.taxSettings.taxablefl = false;

         if (self.taxSettings.pstlicensenohidden) {
            self.taxSettings.btnrecalculatehidden = true;
         }
      }
   };

   self.editGSTTaxableChange = function () {

      if (self.taxSettings.taxmethodty = 'g') {

         if (self.taxSettings.pstlicenseno && self.taxSettings.taxauth !== 'dom') {
            self.taxSettings.taxablefl = false;
         } else {
            self.taxSettings.taxablefl = true;
         }
      }
   };

   self.taxableTrue = function () {
      self.taxSettings.citycdenabled = self.taxSettings.canoverridefl;
      self.taxSettings.countycdenabled = self.taxSettings.canoverridefl;
      self.taxSettings.nontaxtypeenabled = false;
      self.taxSettings.other1cdenabled = self.taxSettings.canoverridefl;
      self.taxSettings.other2cdenabled = self.taxSettings.canoverridefl;
      self.taxSettings.statecdenabled = self.taxSettings.canoverridefl;
      self.taxSettings.taxablefl = true;

      if (self.taxSettings.pstlicensenohidden) {
         self.taxSettings.btnrecalculatehidden = false;
      }
   };

   self.nonTaxTypeChanged = function () {
      if (!self.taxSettings.nontaxtype) {
         self.taxableTrue();
      }
   };

   self.newTaxDetailClicked = function () {
      $state.go(base.baseState + '.taxesAndTotals.taxDetail');
   };

   self.taxDetailDeleteClicked = function () {
      var selectedRecords = GridService.getSelectedRecords(self.taxDetailGrid);
      var selectedRecordCount = selectedRecords.length;

      for (var i = 0; i < selectedRecords.length; i++) {
         var currentSelectedRecord = selectedRecords[i];

         var taxDetailDeleteRequest = {
            oetaxdetail: currentSelectedRecord,
            iOrderNo: base.oehdr.orderno,
            iOrderSuf: base.oehdr.ordersuf
         };
         DataService.post('api/oe/asoeheader/oetaxdetaildelete', { data: taxDetailDeleteRequest, busy: true }, function (data) {
            selectedRecordCount--;
            if (selectedRecordCount <= 0) {
               self.loadTaxSettings();
            }
         });
      }
   };

   self.taxDetailDrilldownClicked = function (e, args) {
      var taxDetail = args[0].item;

      $state.go(base.baseState + '.taxesAndTotals.taxDetail', { selectedTaxDetail: taxDetail });
   };

   self.recalculate = function () {
      if (self.addonsCollection.length === 0) {
         DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + self.orderSuffix + '/false', { busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(self.addonsCollection, data);

               self.saveTaxesAndTotals(self.loadTaxSettings);
            }
         });
      } else {
         self.saveTaxesAndTotals(self.loadTaxSettings);
      }
   };

   self.completeTaxTotals = function (callType) {

      // 'suspend' or 'finish'
      self.callType = callType;

      if (self.addonsCollection.length === 0) {
         DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + self.orderSuffix + '/false', { busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(self.addonsCollection, data);

               self.saveTaxesAndTotals();
            }
         });
      } else {
         self.saveTaxesAndTotals();
      }
   };

   self.stageWizardNavigation = function (isContinue) {
      if (self.addonsCollection.length === 0) {
         DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + self.orderSuffix + '/false', { busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(self.addonsCollection, data);

               self.saveTaxesAndTotals(function () { self.navigateFromStageWizard(isContinue); });
            }
         });
      } else {
         self.saveTaxesAndTotals(function () { self.navigateFromStageWizard(isContinue); });
      }
   };

   self.navigateFromStageWizard = function (isContinue) {
      if (isContinue) {
         base.stageWizardCollectPayment();
      } else {
         base.stageWizardSelectProducts();
      }
   };
});

app.controller('OeetTaxDetailCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   var tat = $scope.tat;

   self.selectedTaxDetail = {};
   self.isInEditMode = false;
   self.taxDetailTypes = [];
   self.stateTypes = [];
   self.countyTypes = [];
   self.cityTypes = [];
   self.otherTypes = [];
   self.isTypeEnabled = false;
   self.isStateEnabled = false;
   self.isCountyEnabled = false;
   self.isCityEnabled = false;
   self.isOtherEnabled = false;

   self.loadTaxDetailCombos = function () {
      var loadTaxCombosCriteria = {
         citycd: self.selectedTaxDetail.citycd,
         countycd: self.selectedTaxDetail.countycd,
         other1cd: self.selectedTaxDetail.othercd,
         other2cd: '',
         statecd: self.selectedTaxDetail.statecd,
         taxauth: ''
      };
      DataService.post('api/oe/asoeheader/loadoetaxcombos', { data: loadTaxCombosCriteria, busy: true }, function (data) {
         if (data) {
            tat.createOptionsFromStrings(self.stateTypes, data.statecodes, data.statedescs);
            tat.createOptionsFromStrings(self.countyTypes, data.countycodes, data.countydescs);
            tat.createOptionsFromStrings(self.cityTypes, data.citycodes, data.citydescs);
            tat.createOptionsFromStrings(self.otherTypes, data.other1codes, data.other1descs);
         }
      });
   };

   self.overrideReasonChanged = function () {
      if (tat.taxSettings.overridetype) {
         tat.taxSettings.taxoverfl = true;
         self.isTypeEnabled = true;
      } else {
         tat.taxSettings.taxoverfl = false;
         self.isTypeEnabled = false;
         self.isStateEnabled = false;
         self.isCountyEnabled = false;
         self.isCityEnabled = false;
         self.isOtherEnabled = false;
      }
      self.taxDetailTypeChanged();
      self.loadTaxDetailCombos();
   };

   self.taxDetailTypeChanged = function () {
      switch (self.selectedTaxDetail.recty) {
         case 1: //federal
            self.isTypeEnabled = true;
            self.isStateEnabled = false;
            self.isCountyEnabled = false;
            self.isCityEnabled = false;
            self.isOtherEnabled = false;

            self.selectedTaxDetail.statecd = '';
            self.selectedTaxDetail.countycd = '';
            self.selectedTaxDetail.citycd = '';
            self.selectedTaxDetail.othercd = '';

            self.loadTaxDetailCombos();
            break;
         case 2: //state
            self.isTypeEnabled = true;
            self.isStateEnabled = true;
            self.isCountyEnabled = false;
            self.isCityEnabled = false;
            self.isOtherEnabled = false;

            self.taxDetailStateChanged();
            break;
         case 3: //county
            self.isTypeEnabled = true;
            self.isStateEnabled = true;
            self.isCountyEnabled = true;
            self.isCityEnabled = false;
            self.isOtherEnabled = false;

            self.taxDetailCountyChanged();
            break;
         case 4: //city
            self.isTypeEnabled = true;
            self.isStateEnabled = true;
            self.isCountyEnabled = true;
            self.isCityEnabled = true;
            self.isOtherEnabled = false;

            self.taxDetailCityChanged();
            break;
         case 5: //other
            self.isTypeEnabled = true;
            self.isStateEnabled = true;
            self.isCountyEnabled = true;
            self.isCityEnabled = true;
            self.isOtherEnabled = true;
            break;
      }
   };

   self.taxDetailStateChanged = function () {
      self.selectedTaxDetail.countycd = '';
      self.selectedTaxDetail.citycd = '';
      self.selectedTaxDetail.othercd = '';

      self.loadTaxDetailCombos();
   };

   self.taxDetailCountyChanged = function () {
      self.selectedTaxDetail.citycd = '';
      self.selectedTaxDetail.othercd = '';

      self.loadTaxDetailCombos();
   };

   self.taxDetailCityChanged = function () {
      self.selectedTaxDetail.othercd = '';

      self.loadTaxDetailCombos();
   };

   if ($stateParams.selectedTaxDetail) {
      self.selectedTaxDetail = $stateParams.selectedTaxDetail;
      self.isInEditMode = true;
      self.overrideReasonChanged();
   }

   self.save = function () {
      var taxDetailCreateRequest = {
         oetaxdetail: self.selectedTaxDetail,
         iOrderNo: base.oehdr.orderno,
         iOrderSuf: base.oehdr.ordersuf
      };
      if (!self.isInEditMode) {
         DataService.post('api/oe/asoeheader/oetaxdetailcreate', { data: taxDetailCreateRequest, busy: true }, function (data) {
            $state.go('^');
            tat.loadTaxSettings();
         });
      } else {
         var taxDetailUpdateRequest = {
            oetaxdetail: self.selectedTaxDetail,
            iOrderNo: base.oehdr.orderno,
            iOrderSuf: base.oehdr.ordersuf
         };
         DataService.post('api/oe/asoeheader/oetaxdetailupdate', { data: taxDetailUpdateRequest, busy: true }, function (data) {
            base.oehdr.taxovercd = tat.taxSettings.overridetype;
            base.oehdr.taxoverfl = tat.taxSettings.taxoverfl;
            base.updateOehdr(function () {
               tat.saveTaxesAndTotals(tat.loadTaxSettings);
               $state.go('^');
            });
         });
      }
   };

   self.reset = function () {
      if (self.isInEditMode) {
         self.selectedTaxDetail = $stateParams.selectedTaxDetail;
      } else {
         self.selectedTaxDetail = {};
      }

      self.loadTaxDetailCombos();
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetDiscountsCtrl', function ($state, $scope, $translate, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var tat = $scope.tat;

   self.asText = $translate.instant('global.as');
   self.ofText = $translate.instant('global.of');

   if (tat.addonsCollection.length === 0) {
      DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + tat.orderSuffix + '/false', { busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(tat.addonsCollection, data);
         }
      });
   }

   self.calculatorTypes = [
      { label: $translate.instant('global.total.net.sale'), value: 'tns' }
   ];
   if (base.sasoo.seecostfl) {
      self.calculatorTypes.push({ label: $translate.instant('global.gross.margin.percent'), value: 'gm' });
   }

   self.selectedCalculatorType = 'tns';
   self.calculatorAmount = 0;
   self.isCalculatorAmount = true;
   base.orderTotals.wodisctype = base.oehdr.wodisctype;

   self.amountChanged = function () {
      var calculateDiscountCriteria = {
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         discamt: base.orderTotals.wodiscamtdspl,
         disctype: base.orderTotals.wodisctype
      };
      DataService.post('api/oe/asoeheader/oecalculatediscountnet', { data: calculateDiscountCriteria, busy: true }, function (data) {
         if (data || data === 0) {
            base.oehdr.wodiscamt = data;
            base.oehdr.wodiscoverfl = true;
         }
      });
   };

   self.calculate = function () {
      var totalSale = 0;
      var marginAmt = 0;

      if (self.selectedCalculatorType === 'tns') {
         totalSale = self.calculatorAmount;
      } else {
         marginAmt = self.calculatorAmount;
      }

      var discountCalculatorUpdateCriteria = {
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         totalsale: totalSale,
         marginamt: marginAmt,
         expressedasfl: self.isCalculatorAmount,
         lotpricefl: base.orderTotals.lotpricefl
      };

      DataService.post('api/oe/asoeheader/oediscountcalculatorupdate', { data: discountCalculatorUpdateCriteria, busy: true }, function () {

         // If using AvaTax, don't calculate taxes on each line add
         // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
         if (base.taxMethodType.toLowerCase() === 'a') {
            base.calcsob = 'z';
         } else {
            base.calcsob = 'b';
         }

         base.getOrderData(function () { $state.go('^') });
      });
   };

   self.submit = function () {
      base.oehdr.wodisctype = base.orderTotals.wodisctype;
      base.oehdr.wodiscpct = base.oehdr.wodisctype ? 0 : base.orderTotals.wodiscamtdspl;
      base.oehdr.wodiscamt = base.oehdr.wodisctype ? base.orderTotals.wodiscamtdspl : 0;

      tat.saveTaxesAndTotals(function () {
         if (tat.navFromState) {
            $state.go(tat.navFromState);
         } else {
            $state.go('^');
         }
      });
   };
});

app.controller('OeetFreightRateShopCtrl', function ($filter, $state, $scope, $translate, DataService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   var tat = $scope.tat;

   var originalShipVia = base.oehdr.shipviaty;
   var originalShippingOverride = base.oehdr.pmfl;

   var params = {
      whse: base.oehdr.whse,
      fldlist: 'name,addr1,addr2,addr3,city,state,zipcd'
   };
   DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
      if (data) {
         self.warehouse = data;
      }
   });

   DataService.get('api/oe/asoeentry/frtrateshopload/' + base.oehdr.orderno + '/' + base.oehdr.ordersuf + '/oeet/userfield', function (data) {
      if (data) {
         // Sort results by order freight
         self.frsList = $filter('orderBy')(data.frtrateshoploadlist, 'orderfrt');
         self.frsSingle = data.frtrateshoploadsingle;
      }
   });

   if (tat.addonsCollection.length === 0) {
      DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + tat.orderSuffix + '/false', { busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(tat.addonsCollection, data);
            self.originalAddons = jQuery.extend({}, data);
         }
      });
   } else {
      self.originalAddons = jQuery.extend({}, tat.addonsCollection);
   }

   self.recalculate = function () {
      DataService.post('api/oe/asoeentry/frtrateshoprecalc', { data: self.frsSingle, busy: true }, function (data) {
         if (data) {
            // Sort results by order freight
            self.frsList = $filter('orderBy')(data, 'orderfrt');
         }
      });
   };

   self.shipViaSelected = function () {
      var selectedShipVia = GridService.getSelectedRecord(self.grid);
      var changeAddonrequest = {};

      base.oehdr.shipviaty = selectedShipVia.shipvia;

      if (selectedShipVia.orderfrt !== 0) {
         changeAddonrequest = {
            oeaddons: tat.addonsCollection[1],
            iNewAddonNo: tat.addonsCollection[1].addonno,
            dNewAddonAmt: selectedShipVia.orderfrt - selectedShipVia.ordfrtextra1 - selectedShipVia.ordfrtextra2,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            if (data) {
               tat.addonsCollection[1] = data;
            }
         });
      }
      if (selectedShipVia.ordfrtextra1 !== 0) {
         changeAddonrequest = {
            oeaddons: tat.addonsCollection[2],
            iNewAddonNo: tat.addonsCollection[2].addonno,
            dNewAddonAmt: selectedShipVia.ordfrtextra1,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            if (data) {
               tat.addonsCollection[2] = data;
            }
         });
      }

      if (selectedShipVia.ordfrtextra2 !== 0) {
         changeAddonrequest = {
            oeaddons: tat.addonsCollection[3],
            iNewAddonNo: tat.addonsCollection[3].addonno,
            dNewAddonAmt: selectedShipVia.ordfrtextra2,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            if (data) {
               tat.addonsCollection[3] = data;
            }
         });
      }
   };

   self.back = function () {
      $state.go('^');
   };

   self.cancel = function () {
      base.oehdr.shipviaty = originalShipVia;
      base.oehdr.pmfl = originalShippingOverride;

      if (self.originalAddons.length !== 0) {
         tat.addonsCollection = jQuery.extend(tat.addonsCollection, self.originalAddons);
      }

      $state.go('^');
   };
});