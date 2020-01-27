'use strict';

/**
 * Control for displaying the general information about a customer (shared by ARIC general tab and other functions).
 *
 * Alias: custgnrl
 */
app.controller('CustomerInquiryGeneralCtrl', function ($scope, StandardConverters, DataService, Utils, $translate, AodataService, Sasc, UserService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   var dtl = $scope.dtl;
   self.totalty = 'T';
   self.dispformat = 'true';
   self.period1 = '';
   self.period2 = '';
   self.period3 = '';
   self.period4 = '';
   self.period5 = '';
   self.iscustomer = 'true';
   self.isCustPricing = 'true';
   self.salesExchangeRate = 1;
   self.custno = 0;
   self.currencyDescription = '';

   self.periodbalance = {
      period1balance: 0,
      period2balance: 0,
      period3balance: 0,
      period4balance: 0,
      period5balance: 0,
      period1: '',
      period2: '',
      period3: '',
      period4: '',
      period5: '',
      period1Display: '',
      period2Display: '',
      period3Display: '',
      period4Display: '',
      period5Display: '',
      futureinvoice: 0,
      total1: '',
      total2: '',
      total3: '',
      total4: '',
      total5: '',
      total1balance: 0,
      total2balance: 0,
      total3balance: 0,
      total4balance: 0,
      total5balance: 0
   };

   self.getTermsDescription = function () {
      if (self.arsc.termstype) {
         var sastaParams = {
            codeiden: 't',
            codeval: self.arsc.termstype,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.termsdescription = sasta.descrip;
            }
         });
      }
   };

   self.getPricingDetails = function () {
      if (self.isCustPricing === 'true') {
         self.pricingobject = self.arsc;
      } else {
         //need to change arss pbject
         self.pricingobject = self.arss;
      }
      if (self.pricingobject) {
         self.getshipViaDescription(self.pricingobject.shipviaty);
         self.getspcDefault(self.pricingobject.spcdefaultty);
         self.getDisposition(self.pricingobject.orderdisp);
      }
   };

   self.getshipViaDescription = function (shipvia) {
      if (shipvia) {
         var sastaParams = {
            codeiden: 's',
            codeval: shipvia,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.shipvia = sasta.descrip;
            }
         });
      }
   };

   self.getspcDefault = function (spcdefault) {
      if (!spcdefault || spcdefault.toLowerCase() === 'i') {
         self.spcdefault = $translate.instant('menu.ic');
      } else if (spcdefault.toLowerCase() === 'o') {
         self.spcdefault = $translate.instant('global.override.oe');
      } else if (spcdefault.toLowerCase() === "n") {
         self.spcdefault = $translate.instant('global.not.special');
      } else {
         self.spcdefault = '';
      }
   };

   self.getDisposition = function (disposition) {
      if (disposition) {
         if (disposition.toLowerCase() === 's') {
            self.orderdisp = $translate.instant('global.ship.complete');
         } else if (disposition.toLowerCase() === 't') {
            self.orderdisp = $translate.instant('global.tag.and.hold');
         } else if (disposition.toLowerCase() === "w") {
            self.orderdisp = $translate.instant('global.will.call');
         } else if (disposition.toLowerCase() === "j") {
            self.orderdisp = $translate.instant('global.jit');
         } else {
            self.orderdisp = '';
         }
      } else {
         self.orderdisp = '';
      }
   };

   self.getPeriodAndCreditBalance = function () {
      var periodCriteria = {
         custno: self.arsc.custno,
         shipto: self.arss ? self.arss.shipto : '',
         groupid: self.groupid ? self.groupid : '',
         totalty: self.totalty,
         userfield: ''
      };

      DataService.post('api/ar/asarinquiry/custbaldisplay', { data: periodCriteria, busy: true }, function (data) {
         if (data) {
            var periodTextList = self.getPeriodMessageTypeList(data, 'periodtext');
            var periodBalances = self.getPeriodMessageTypeList(data, 'periodbalances');
            var futureBalanceRecord = JSLINQ(data).Where(function (futureBalance) { return (futureBalance.messageType.toLowerCase() === 'futurebalance'); }).FirstOrDefault();
            var futureBalance = futureBalanceRecord && futureBalanceRecord.description ? futureBalanceRecord.description : '';

            var totalTextList = self.getPeriodMessageTypeList(data, 'totaltext');
            var totalBalances = self.getPeriodMessageTypeList(data, 'totalbalances');

            self.periodbalance.futureinvoice = futureBalance ? parseFloat(futureBalance) : 0;
            if (periodTextList && periodBalances) {
               self.periodbalance.period1 = periodTextList[0];
               self.periodbalance.period1Display = Utils.reformatPeriodDates(periodTextList[0]);
               self.periodbalance.period1balance = periodBalances[0] ? parseFloat(periodBalances[0]) : 0;
               self.periodbalance.period2 = periodTextList[1];
               self.periodbalance.period2Display = Utils.reformatPeriodDates(periodTextList[1]);
               self.periodbalance.period2balance = periodBalances[1] ? parseFloat(periodBalances[1]) : 0;
               self.periodbalance.period3 = periodTextList[2];
               self.periodbalance.period3Display = Utils.reformatPeriodDates(periodTextList[2]);
               self.periodbalance.period3balance = periodBalances[2] ? parseFloat(periodBalances[2]) : 0;
               self.periodbalance.period4 = periodTextList[3];
               self.periodbalance.period4Display = Utils.reformatPeriodDates(periodTextList[3]);
               self.periodbalance.period4balance = periodBalances[3] ? parseFloat(periodBalances[3]) : 0;
               self.periodbalance.period5 = periodTextList[4];
               self.periodbalance.period5Display = Utils.reformatPeriodDates(periodTextList[4]);
               self.periodbalance.period5balance = periodBalances[4] ? parseFloat(periodBalances[4]) : 0;
            }
            else if (periodBalances) {
               self.periodbalance.period1balance = periodBalances[0] ? parseFloat(periodBalances[0]) : 0;
               self.periodbalance.period2balance = periodBalances[1] ? parseFloat(periodBalances[1]) : 0;
               self.periodbalance.period3balance = periodBalances[2] ? parseFloat(periodBalances[2]) : 0;
               self.periodbalance.period4balance = periodBalances[3] ? parseFloat(periodBalances[3]) : 0;
               self.periodbalance.period5balance = periodBalances[4] ? parseFloat(periodBalances[4]) : 0;
            }
            if (totalTextList && totalBalances) {
               self.periodbalance.total1 = totalTextList[0];
               self.periodbalance.total1balance = totalBalances[0] ? parseFloat(totalBalances[0]) : 0;
               self.periodbalance.total2 = totalTextList[1];
               self.periodbalance.total2balance = totalBalances[1] ? parseFloat(totalBalances[1]) : 0;
               self.periodbalance.total3 = totalTextList[2];
               self.periodbalance.total3balance = totalBalances[2] ? parseFloat(totalBalances[2]) : 0;
               self.periodbalance.total4 = totalTextList[3];
               self.periodbalance.total4balance = totalBalances[3] ? parseFloat(totalBalances[3]) : 0;
               self.periodbalance.total5 = totalTextList[4];
               self.periodbalance.total5balance = totalBalances[4] ? parseFloat(totalBalances[4]) : 0;
            }
            self.onDisplayFormatChange();
         }
      });

      var onOrderCreditCriteria = {};
      Utils.replaceObject(onOrderCreditCriteria, periodCriteria);
      if (periodCriteria.totalty === 'Z') {
         onOrderCreditCriteria.totalty = 'C';
      }
      DataService.post('api/ar/asarinquiry/calconordercreditavail', { data: onOrderCreditCriteria, busy: true }, function (credit) {
         if (credit) {
            self.credit = credit;

            // Build the data for the Credit Balance chart
            var spentValue = credit.credlim - credit.credrem;
            spentValue = parseFloat(spentValue.toFixed(2)); // round to 2 decimal places
            var isLimitReached = credit.credrem <= 0 && credit.credlim > 0;
            var spentColor = isLimitReached ? 'error' : '';
            self.creditBalanceChartOptions = {
               dataset: [{
                  data: [{
                     name: { text: $translate.instant('global.avail.credit') },
                     completed: { text: $translate.instant('global.spent'), value: spentValue, format: ',.00', color: spentColor },
                     remaining: { text: $translate.instant('global.limit'), value: credit.credlim, format: ',.00' },
                     total: { value: credit.credlim, format: ',.00' }
                  }]
               }]
            };
         }
      });
   };

   self.getPeriodMessageTypeList = function (list, messageType) {
      var periodMsgList = [];
      var periodMessageResultText = JSLINQ(list).Where(function (periodMessage) { return (periodMessage.messageType.toLowerCase() === messageType.toLowerCase()); }).FirstOrDefault();
      if (periodMessageResultText && periodMessageResultText.description) {
         periodMsgList = periodMessageResultText.description.split('|');
      }
      return periodMsgList;
   };

   self.onDisplayFormatChange = function () {
      if (self.dispformat === 'true') {
         self.period1 = self.periodbalance.period1Display;
         self.period2 = self.periodbalance.period2Display;
         self.period3 = self.periodbalance.period3Display;
         self.period4 = self.periodbalance.period4Display;
         self.period5 = self.periodbalance.period5Display;
      } else {
         self.period1 = $translate.instant('ar.periodbalance.period1');
         self.period2 = $translate.instant('ar.periodbalance.period2');
         self.period3 = $translate.instant('ar.periodbalance.period3');
         self.period4 = $translate.instant('ar.periodbalance.period4');
         self.period5 = $translate.instant('ar.periodbalance.period5');
      }

      // Build the data for the Period Balance chart
      self.periodBalanceChartOptions = {
         dataset: [{
            data: [{
               name: $translate.instant('global.period.1'),
               abbrName: '1',
               color: '#66a140',
               value: self.periodbalance.period1balance,
               tooltip: self.period1 + ' <b>' + StandardConverters.Currency.convert(self.periodbalance.period1balance) + '</b>'
            }, {
               name: $translate.instant('global.period.2'),
               abbrName: '2',
               color: '#8ed1c6',
               value: self.periodbalance.period2balance,
               tooltip: self.period2 + ' <b>' + StandardConverters.Currency.convert(self.periodbalance.period2balance) + '</b>'
            }, {
               name: $translate.instant('global.period.3'),
               abbrName: '3',
               color: '#1d5f8a',
               value: self.periodbalance.period3balance,
               tooltip: self.period3 + ' <b>' + StandardConverters.Currency.convert(self.periodbalance.period3balance) + '</b>'
            }, {
               name: $translate.instant('global.period.4'),
               abbrName: '4',
               color: '#9279a6',
               value: self.periodbalance.period4balance,
               tooltip: self.period4 + ' <b>' + StandardConverters.Currency.convert(self.periodbalance.period4balance) + '</b>'
            }, {
               name: $translate.instant('global.period.5'),
               abbrName: '5',
               color: '#f2bc41',
               value: self.periodbalance.period5balance,
               tooltip: self.period5 + ' <b>' + StandardConverters.Currency.convert(self.periodbalance.period5balance) + '</b>'
            }]
         }]
      };
   };

   self.periodbalanceSelection = function (period) {
      if (dtl) {
         dtl.canSelecteTransactionTab = true;
         dtl.duedateModel = period;
      }
   };

   self.getTaxingInformation = function () {
      self.taxMethodType = AodataService.getValue('TAX', 'TaxMethodTy');
      if (self.iscustomer === 'true') {
         self.taxobject = self.arsc;
      } else {
         self.taxobject = self.arss;
      }
      self.getTaxingDetails();
   };

   self.clearTaxDetails = function () {
      self.gstcertnumber = '';
      self.gstregnumber = '';
      self.taxableStatus = '';
      self.other1 = '';
      self.countycd = '';
      self.nontaxreason = '';
      self.other1description = '';
      self.other2description = '';
      self.citydescription = '';
      self.countydescription = '';
      self.statedescription = '';
   };

   self.getTaxingDetails = function () {
      if (self.taxobject) {
         self.clearTaxDetails();
         self.gstcertnumber = self.taxobject.gstcert;
         self.gstregnumber = self.taxobject.gstreg;
         if (self.taxobject.taxablety.toLowerCase() !== 'y') {
            self.getNonTaxReason(self.taxobject.nontaxtype);
         }
         self.taxableStatus = self.getTaxableStatus(self.taxobject.taxablety);
         self.other1 = (self.taxMethodType.toLowerCase() === 'g') ? '' : self.taxobject.other1cd;
         self.countycd = (self.taxMethodType.toLowerCase() === 'g') ? self.taxobject.taxauth : self.taxobject.countycd;
         self.getOther1Description(self.taxobject.statecd, self.countycd, self.taxobject.citycd, self.other1);
         self.getOther2Description(self.taxobject.statecd, self.countycd, self.taxobject.citycd, self.taxobject.other2cd);
         self.getCityDescription(self.taxobject.statecd, self.countycd, self.taxobject.citycd);
         if (self.taxMethodType.toLowerCase() === 'g') {
            self.getCountyDescripFromSasgl(self.taxobject.statecd, self.countycd);
            self.getStateDescripFromSasgl(self.taxobject.statecd);
         }
         else {
            self.getCountyDescripFromSasgm(self.taxobject.statecd, self.countycd);
            self.getStateDescripFromSasgm(self.taxobject.statecd);
         }
      } else {
         self.clearTaxDetails();
      }
   };

   self.getNonTaxReason = function (nontaxtype) {
      var sastaParams = {
         codeiden: 'n',
         codeval: nontaxtype,
         fldlist: 'descrip'
      };
      DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (taxreason) {
         if (taxreason) {
            self.nontaxreason = taxreason.descrip;
         }
      });
   };

   self.getTaxableStatus = function (taxableType) {
      var status = '';
      if (taxableType) {
         if (taxableType.toLowerCase() === 'y') {
            status = $translate.instant('global.taxable');
         } else if (taxableType.toLowerCase() === 'n') {
            status = $translate.instant('global.non.dash.taxable');
         } else {
            status = $translate.instant('global.variable');
         }
      }
      return status;
   };

   self.getOther1Description = function (statecd, countycd, citycd, other1cd) {
      if (other1cd) {
         var other1Params = {
            recty: 5,
            taxgroup: 1,
            statecd: statecd,
            countycd: countycd,
            citycd: citycd,
            othercd: other1cd,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgm/getbypk', { params: other1Params, busy: true }, function (other1) {
            if (other1) {
               self.other1description = other1.descrip;
            }
         });
      }
   };

   self.getOther2Description = function (statecd, countycd, citycd, other2cd) {
      if (other2cd) {
         var other2Params = {
            recty: 5,
            taxgroup: 1,
            statecd: statecd,
            countycd: countycd,
            citycd: citycd,
            othercd: other2cd,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgm/getbypk', { params: other2Params, busy: true }, function (other2) {
            if (other2) {
               self.other2description = other2.descrip;
            }
         });
      }
   };

   self.getCityDescription = function (statecd, countycd, citycd) {
      if (citycd) {
         var cityParams = {
            recty: 4,
            taxgroup: 1,
            statecd: statecd,
            countycd: countycd,
            citycd: citycd,
            othercd: '',
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgm/getbypk', { params: cityParams, busy: true }, function (city) {
            if (city) {
               self.citydescription = city.descrip;
            }
         });
      }
   };

   self.getCountyDescripFromSasgm = function (statecd, countycd) {
      if (countycd) {
         var countyParams = {
            recty: 3,
            taxgroup: 1,
            statecd: statecd,
            countycd: countycd,
            citycd: '',
            othercd: '',
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgm/getbypk', { params: countyParams, busy: true }, function (county) {
            if (county) {
               self.countydescription = county.descrip;
            }
         });
      }
   };

   self.getStateDescripFromSasgm = function (statecd) {
      if (statecd) {
         var stateParams = {
            recty: 2,
            taxgroup: 1,
            statecd: statecd,
            countycd: '',
            citycd: '',
            othercd: '',
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgm/getbypk', { params: stateParams, busy: true }, function (state) {
            if (state) {
               self.statedescription = state.descrip;
            }
         });
      }
   };

   self.getCountyDescripFromSasgl = function (statecd, taxauth) {
      if (taxauth) {
         var countyParams = {
            state: statecd,
            taxauth: taxauth,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgl/getbypk', { params: countyParams, busy: true }, function (county) {
            if (county) {
               self.countydescription = county.descrip;
            }
         });
      }
   };

   self.getStateDescripFromSasgl = function (statecd) {
      if (statecd) {
         var stateParams = {
            state: statecd,
            taxauth: '',
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasgl/getbypk', { params: stateParams, busy: true }, function (state) {
            if (state) {
               self.statedescription = state.descrip;
            }
         });
      }
   };

   self.getShipToExposure = function () {
      if (self.arss && self.arsc && self.arsc.custno) {
         var agingCriteria = {
            custno: self.arsc.custno,
            shipto: self.arss.shipto,
            customfield: ''
         };
         DataService.post('api/ar/asarinquiry/shiptoaging', { data: agingCriteria, busy: true }, function (data) {
            if (data) {
               self.shiptoaging = data;
            }
         });
      }
   };

   self.getytdGrossAmount = function () {
      if (self.arsc.currencyty) {
         var params = {
            currencyty: self.arsc.currencyty,
            fldlist: 'salesexrate'
         };
         DataService.getResource('api/sa/sastc/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.salesExchangeRate = data.salesexrate;
            }
            self.bindYtdGrossAmount();
         });
      } else {
         self.bindYtdGrossAmount();
      }
   };

   self.bindYtdGrossAmount = function () {
      var lastytdgrossmarginperc = 0;
      var ytdgrossmarginperc = 0;
      var lastytdgrossmargin = (self.arsc.lastsalesytd - self.arsc.lastcostytd);
      if (Sasc) {
         if (Sasc.oecostsale) {
            if (self.arsc.salesytd) {
               ytdgrossmarginperc = (((Number(self.arsc.salesytd) * Number(self.salesExchangeRate)) - Number(self.arsc.costytd)) /
                  (Number(self.arsc.salesytd) * Number(self.salesExchangeRate)) * 100).toFixed(2);
            }
            if (self.arsc.lastsalesytd) {
               lastytdgrossmarginperc = ((Number(self.arsc.lastsalesytd) - Number(self.arsc.lastcostytd)) / Number(self.arsc.lastsalesytd) * 100).toFixed(2);
            }
         }
         else {
            if (self.arsc.costytd) {
               ytdgrossmarginperc = ((((Number(self.arsc.salesytd) * Number(self.salesExchangeRate)) - Number(self.arsc.costytd)) / Number(self.arsc.costytd)) * 100).toFixed(2);
            }
            if (self.arsc.lastcostytd) {
               lastytdgrossmarginperc = (((Number(self.arsc.lastsalesytd) - Number(self.arsc.lastcostytd)) / Number(self.arsc.lastcostytd)) * 100).toFixed(2);
            }
         }
      }
      var ytdgrossmargin = ((self.arsc.salesytd * self.salesExchangeRate) - self.arsc.costytd);

      self.ytdbalances = [];
      var currentytd = {
         type: $translate.instant('global.ytd.balances'),
         costytd: self.arsc.costytd,
         salesytd: self.arsc.salesytd,
         returnsytd: self.arsc.returnsytd,
         rebatesytd: self.arsc.rebatesytd,
         servchgytd: self.arsc.servchgytd,
         discytd: self.arsc.discytd,
         unearnedytd: self.arsc.unearnedytd,
         ytdgrossmargin: ytdgrossmargin,
         ytdgrossmarginperc: ytdgrossmarginperc
      };
      var previousytd = {
         type: $translate.instant('global.previous.year.balances'),
         costytd: self.arsc.lastcostytd,
         salesytd: self.arsc.lastsalesytd,
         returnsytd: self.arsc.lastreturnsytd,
         rebatesytd: self.arsc.lastrebatesytd,
         servchgytd: self.arsc.lastservchgytd,
         discytd: self.arsc.lastdiscytd,
         unearnedytd: self.arsc.lastunearnedytd,
         ytdgrossmargin: lastytdgrossmargin,
         ytdgrossmarginperc: lastytdgrossmarginperc
      };
      self.ytdbalances.push(currentytd);
      self.ytdbalances.push(previousytd);
   };

   self.viewShipToDetails = function () {
      if (dtl) {
         dtl.canSelecteShipToTab = true;
      }
   };

   self.getCurrencyDescription = function () {
      self.currencyDescription = '';
      if (self.arsc.currencyty) {
         var sastaParams = {
            currencyty: self.arsc.currencyty,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sastc/getbypk', { params: sastaParams, busy: true }, function (sastc) {
            if (sastc) {
               self.currencyDescription = sastc.descrip;
            }
         });
      }
   };

   // Get arsc record from parent reference, or asynchronously via a function and callback
   if (options.arscModel) {
      self.arsc = Utils.getNestedValue($scope, options.arscModel);
      self.arsc.$promise.then(function () {
         self.custno = self.arsc.custno;
         self.getTermsDescription();
         self.getPeriodAndCreditBalance();
         self.getTaxingInformation();
         self.getPricingDetails();
         self.getytdGrossAmount();
         self.getShipToExposure();
         self.getCurrencyDescription();
      });
   } else if (options.custnoFunction) {
      var custnoFunctionRef = options.custnoFunction;

      // Remove invoke parenthesis if present since we simply want to get the reference to the function
      custnoFunctionRef = custnoFunctionRef.replace('()', '');

      // Get function
      var getCustnoFn = Utils.getNestedValue($scope, custnoFunctionRef);

      // Call the function, passing a callback function that will fetch the arsc by custno
      getCustnoFn(function (custno) {
         if (custno) {
            self.custno = custno;
            var params = {
               custno: custno
            };
            DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.arsc = data;
                  self.getTermsDescription();
                  self.getPeriodAndCreditBalance();
                  self.getTaxingInformation();
                  self.getPricingDetails();
                  self.getytdGrossAmount();
                  self.getShipToExposure();
                  self.getCurrencyDescription();
               }
            });
         }
      });
   } else if (options.arscFunction) {
      var arscFunctionRef = options.arscFunction;

      // Remove invoke parenthesis if present since we simply want to get the reference to the function
      arscFunctionRef = arscFunctionRef.replace('()', '');

      // Get function
      var getCustomerFn = Utils.getNestedValue($scope, arscFunctionRef);

      getCustomerFn(function (arsc) {
         if (arsc) {
            self.arsc = arsc;
            self.custno = self.arsc.custno;
            self.getTermsDescription();
            self.getPeriodAndCreditBalance();
            self.getTaxingInformation();
            self.getPricingDetails();
            self.getytdGrossAmount();
            self.getShipToExposure();
            self.getCurrencyDescription();
         }
      });
   }

   if (options.shiptoFunction) {
      var shitoFunctionRef = options.shiptoFunction;

      // Remove invoke parenthesis if present since we simply want to get the reference to the function
      shitoFunctionRef = shitoFunctionRef.replace('()', '');

      // Get function
      var getShiptoFn = Utils.getNestedValue($scope, shitoFunctionRef);

      // Call the function, passing a callback function that will fetch the arsc by custno
      getShiptoFn(function (shipto) {
         if (shipto && self.custno) {
            var arssparams = {
               custno: self.custno,
               shipto: shipto
            };
            DataService.get('api/ar/arss/getbypk', { params: arssparams, busy: true }, function (arss) {
               if (arss) {
                  self.arss = arss;
                  self.getPeriodAndCreditBalance();
                  self.getTaxingInformation();
                  self.getPricingDetails();
                  self.getShipToExposure();
               }
            });
         }
      });
   }

   if (options.groupidModel) {
      $scope.$watch(options.groupidModel, function (newValue) {
         self.groupid = newValue;
         if (self.custno) {
            self.getPeriodAndCreditBalance();
         }
      });
   }

   // Notify that the controller is now ready
   customCtrl.ready(self);
});