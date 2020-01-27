'use strict';

app.controller('OeetCollectPaymentCtrl', function ($state, $scope, $translate, CenPosService, DataService, MessageService, SecurityService, AodataService, AuthService, Utils, Constants, UserService) {
   var self = this;
   var base = $scope.base;

   self.ofText = $translate.instant('global.of');
   self.subMenuSecurity = SecurityService.getSubSecurityLevel('oeet', 'Collect Payment') > 2 ? true : false;
   var tenderAvailMessage = '';
   if (base.oehdr.oetype.toLowerCase() === 'qu' || base.oehdr.oetype.toLowerCase() === 'st' || base.oehdr.oetype.toLowerCase() === 'bl') {
      tenderAvailMessage += $translate.instant('message.payment.is.unavailable.for.a') + ' ';
      switch (base.oehdr.oetype.toLowerCase()) {
         case 'qu':
            tenderAvailMessage += $translate.instant('global.quote.order');
            break;
         case 'st':
            tenderAvailMessage += $translate.instant('global.standing.order');
            break;
         case 'bl':
            tenderAvailMessage += $translate.instant('global.blanket.order');
            break;
      }
      tenderAvailMessage += '.';
   }
   else {
      if (!self.subMenuSecurity) {
         tenderAvailMessage += $translate.instant('message.user.doesnt.meet.security.level.to.perform.this.a') + ' - ';
         tenderAvailMessage += $translate.instant('global.pricing.calculator') + ' & ' + $translate.instant('global.process.payment') + '.';
      }
   }
   self.tenderingNotAvailableMessage = tenderAvailMessage;

   self.enableAddlAmount = AodataService.getValue('OE', 'OEAuthOverride');

   self.sastnRecords = [];
   self.priceCalculatorPercent = 100;
   self.priceCalculatorAmount = 0;
   base.amountDue = 0;
   self.priceCalculatorMode = '';
   self.tenderingCollection = [];
   self.tenderingHistoryGrid = {};
   self.tenderingHistoryCollection = [];
   self.tenderingTotalsCollection = [];
   self.chargeRemainingToAccount = false;
   self.failedTransactionCollection = [];

   self.calculatedPriceLabel = $translate.instant('global.total.charged');
   self.calculatedPrice = 0;
   self.setCalculatedPrice = function (newPrice) {
      self.calculatedPrice = newPrice;
      if (base.oehdr.oetype.toLowerCase() === 'rm') {
         self.calculatedPriceLabel = $translate.instant('global.total.refund');
      } else {
         self.calculatedPriceLabel = $translate.instant('global.total.charged');
      }
   };

   // Load operator default swipe device if not overridden for this session
   if (!base.ipAddress && base.sasoo.devloc) {
      var loadTableDataRequest = {
         sasttcodes: {
            codeid: 'DL',
            filename: 'A'
         },
         sasttsearchcriteria: {}
      };
      DataService.post('api/sa/assasetup/sasttloadtabledata', { data: loadTableDataRequest, busy: true }, function (loadData) {
         if (loadData) {
            var sasttMatch;
            loadData.forEach(function (sastt) {
               if (sastt.codechar === base.sasoo.devloc) {
                  sasttMatch = sastt;
               }
            });
            if (sasttMatch) {
               DataService.post('api/sa/assasetup/sasttloadsasta', { data: sasttMatch, busy: true }, function (matchData) {
                  if (matchData) {
                     base.ipAddress = matchData.iPAddress;
                     base.deviceLocation = base.sasoo.devloc;
                  }
               });
            }
         }
      });
   }

   self.setupTendering = function () {
      self.loadForceTenderingData();

      DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: 'p', fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor,ehffl' }, busy: true }, function (data) {
         if (data) {
            var list = [];
            data.forEach(function (sastn) {
               if (!sastn.ehffl) {
                  list.push(sastn);
               }
            });

            self.completePaymentTypeList = list;

            self.loadTendering();

            //User Hook (do not rename)
            //NOTE: Be aware that due to the nature of Asynchronous calls, this will be called after the callbacks
            //in the loadTendering API calls complete.
            if (self.setupTenderingContinue) {
               self.setupTenderingContinue(data);
            }

         }
      });
   };

   self.loadTendering = function (callback, preserveAmount, preserveCardNo) {
      var loadTenderingRequest = {
         oehdr: base.oehdr,
         lMaintMode: base.isAddOrderMode
      };
      DataService.post('api/oe/asoeheader/loadoetendering', { data: loadTenderingRequest, busy: true }, function (data) {
         if (data) {
            self.paymentNumbers = data.paymentnumbers;
            if (self.tenderingMeta) {
               self.tenderingMeta = [];
            }
            self.tenderingMeta = data.tendering.slice();

            var newTenderingCollection = [];
            var defaultTenderType = jQuery.extend({}, data.tendering[0]);
            if (preserveCardNo) {
               self.tenderingMeta.forEach(function (tenderingObject) {
                  if (preserveCardNo === tenderingObject.cUnMaskCardNo) {
                     defaultTenderType = jQuery.extend(defaultTenderType, tenderingObject);
                  }
               });
            }

            if (defaultTenderType) {
               defaultTenderType.paymentInfo = {};
               self.getSastnMatchForTenderingItem(defaultTenderType);
               newTenderingCollection.push(defaultTenderType);
            }

            Utils.replaceArray(self.tenderingCollection, newTenderingCollection);
            self.priceCalculatorMode = base.arsc.tendqtyfl ? 'o' : 's';
            if (preserveAmount) {
               // update the pricing calculator, which pushes amount down into tendering line and updates
               self.priceCalculatorAmount = preserveAmount;
               self.priceCalculatorAmountChanged();
            }
            else {
               self.priceCalculatorTotalByChanged();
            }

            //rebuild totals grid
            self.buildTenderingTotalsGrid();

            Utils.replaceArray(self.tenderingHistoryCollection, data.tenderingglhist);

            //User Hook (do not rename)
            if (self.loadTenderingContinue) {
               self.loadTenderingContinue(newTenderingCollection);
            }

            if (callback) {
               callback();
            }
         }
      });
   };

   self.loadForceTenderingData = function () {
      var takenByType = base.selectedTakenByType ? base.selectedTakenByType : '';
      var forceTenderRequest = {
         oehdr: base.oehdr,
         lMaintMode: base.isAddOrderMode,
         cTenderTy: takenByType
      };
      DataService.post('api/oe/asoeheader/oeloadforcetender', { data: forceTenderRequest, busy: true }, function (data) {
         if (data) {
            base.forceTender = data.cForceTender;
            self.forceTenderFromCall = data.cForceTender;
            base.forceTenderAmount = data.dForceTenderAmt;
         }
      });
   };

   self.buildTenderingTotalsGrid = function () {
      self.tenderingTotalsCollection = [];
      var lineItemsRow = {
         description: $translate.instant('global.line.items'),
         boamt: base.orderTotals.ordlineamt - base.orderTotals.shplineamt,
         shipamt: base.orderTotals.shplineamt,
         ordamt: base.orderTotals.ordlineamt
      };
      self.tenderingTotalsCollection.push(lineItemsRow);
      var discountRow = {
         description: $translate.instant('global.discount'),
         boamt: base.orderTotals.orddiscamt - base.orderTotals.shpdiscamt,
         shipamt: base.orderTotals.shpdiscamt,
         ordamt: base.orderTotals.orddiscamt
      };
      self.tenderingTotalsCollection.push(discountRow);
      var addonsRow = {
         description: $translate.instant('global.addons'),
         boamt: base.orderTotals.ordaddonamt - base.orderTotals.shpaddonamt,
         shipamt: base.orderTotals.shpaddonamt,
         ordamt: base.orderTotals.ordaddonamt
      };
      self.tenderingTotalsCollection.push(addonsRow);
      var taxRow = {
         description: $translate.instant('global.tax'),
         boamt: base.orderTotals.ordtaxamt - base.orderTotals.shptaxamt,
         shipamt: base.orderTotals.shptaxamt,
         ordamt: base.orderTotals.ordtaxamt
      };
      if (!base.orderTotals.taxordhidden) {
         self.tenderingTotalsCollection.push(taxRow);
      }
      var paidRow = {
         description: $translate.instant('global.paid'),
         boamt: base.orderTotals.ordtottendamt - base.orderTotals.shptottendamt,
         shipamt: base.orderTotals.shptottendamt,
         ordamt: base.orderTotals.ordtottendamt
      };
      self.tenderingTotalsCollection.push(paidRow);
      var dueRow = {
         description: $translate.instant('global.due'),
         boamt: base.orderTotals.orddue - base.orderTotals.shpdue,
         shipamt: base.orderTotals.shpdue,
         ordamt: base.orderTotals.orddue
      };
      self.tenderingTotalsCollection.push(dueRow);
      var totalRow = {
         description: $translate.instant('global.total'),
         boamt: base.orderTotals.ordtotalamt - base.orderTotals.shptotalamt,
         shipamt: base.orderTotals.shptotalamt,
         ordamt: base.orderTotals.ordtotalamt
      };
      self.tenderingTotalsCollection.push(totalRow);
   };

   //get tendering data first time into screen
   base.getOrderTotals(self.setupTendering);

   self.tenderingLineAmountChanged = function (tenderingItem) {
      self.setAmountSensativeTenderingLineFields(tenderingItem);
   };

   self.setAmountSensativeTenderingLineFields = function (tenderingItem) {

      if (tenderingItem.paymentInfo.matchedPaymentNumbers.length === 0) {
         if (tenderingItem.paymentInfo.ccAddon) {
            tenderingItem.dAddlAuth = tenderingItem.paymentInfo.ccAddon;
         } else {
            tenderingItem.dAddlAuth = 0;
         }
      } else {
         if (tenderingItem.paymentInfo.matchedPaymentNumbers[0].cCCAddonType === "%") {
            var addlAuth = tenderingItem.dAmount * (tenderingItem.paymentInfo.matchedPaymentNumbers[0].deCCAddon / 100);
            tenderingItem.dAddlAuth = parseFloat(addlAuth.toFixed(2));
         } else {
            tenderingItem.dAddlAuth = tenderingItem.paymentInfo.matchedPaymentNumbers[0].deCCAddon;
         }
      }
      if (tenderingItem.paymentInfo.lIsCreditCard) {
         if ((tenderingItem.dAmount > 0 && base.oehdr.oetype.toLowerCase() !== 'rm') ||
            (tenderingItem.dAmount < 0 && base.oehdr.oetype.toLowerCase() === 'rm')) {
            tenderingItem.paymentInfo.oneTimeButtonLabel = $translate.instant('global.one.time.sale');
         }
         else if ((tenderingItem.dAmount > 0 && base.oehdr.oetype.toLowerCase() === 'rm') ||
            (tenderingItem.dAmount < 0 && base.oehdr.oetype.toLowerCase() !== 'rm')) {
            tenderingItem.paymentInfo.oneTimeButtonLabel = $translate.instant('global.one.time.return');
            tenderingItem.paymentInfo.isCCReturn = true;
            tenderingItem.paymentInfo.isAchCredit = false;
         }

         tenderingItem.paymentInfo.addNewButtonLabel = $translate.instant('global.add.new.card');
      }
      if (tenderingItem.paymentInfo.lIsACH) {
         if ((tenderingItem.dAmount > 0 && base.oehdr.oetype.toLowerCase() !== 'rm') ||
            (tenderingItem.dAmount < 0 && base.oehdr.oetype.toLowerCase() === 'rm')) {
            tenderingItem.paymentInfo.oneTimeButtonLabel = $translate.instant('global.one.time.ach');
         }
         else if ((tenderingItem.dAmount > 0 && base.oehdr.oetype.toLowerCase() === 'rm') ||
            (tenderingItem.dAmount < 0 && base.oehdr.oetype.toLowerCase() !== 'rm')) {
            tenderingItem.paymentInfo.oneTimeButtonLabel = $translate.instant('global.one.time.ach.credit');
            tenderingItem.paymentInfo.isAchCredit = true;
            tenderingItem.paymentInfo.isCCReturn = false;
         }

         tenderingItem.paymentInfo.addNewButtonLabel = $translate.instant('global.add.new.ach');
      }

      var allowOneTime = false;
      var linesWithTender = JSLINQ(self.tenderingCollection).Where(function (item) { return item.dAmount !== 0; }) || [];
      allowOneTime = linesWithTender.items.length <= 1;

      if ((tenderingItem.paymentInfo.lIsCreditCard || tenderingItem.paymentInfo.lIsACH || tenderingItem.paymentInfo.isAchCredit) && (self.calculatedPrice === tenderingItem.dAmount && tenderingItem.dAmount !== 0 && allowOneTime)) {
         tenderingItem.paymentInfo.isFullDownPaymentTendered = true;
      }
      else {
         tenderingItem.paymentInfo.isFullDownPaymentTendered = false;
      }

      if (tenderingItem.paymentInfo.lIsCreditCard && allowOneTime &&
         self.calculatedPrice === tenderingItem.dAmount &&
         tenderingItem.dAmount !== 0 &&
         !base.oehdr.ccnonrefundfl &&
         (tenderingItem.dAmount > 0 && base.oehdr.oetype.toLowerCase() !== 'rm' || tenderingItem.dAmount < 0 && base.oehdr.oetype.toLowerCase() === 'rm')) {
         tenderingItem.paymentInfo.isOneTimeAuthEnabled = true;
      }
      else {
         tenderingItem.paymentInfo.isOneTimeAuthEnabled = false;
      }

      if (self.calculatedPrice === 0 && tenderingItem.dAmount === 0 && base.orderTotals.ordtotalamt > 0 && base.oehdr.termstype.toLowerCase() === 'cc' && !tenderingItem.lCCHoldBofl) {
         tenderingItem.paymentInfo.isHoldCCReadOnly = false;
      }
      else {
         tenderingItem.paymentInfo.isHoldCCReadOnly = true;
      }
   };

   self.checkBackOrderAllowedForTenderingLine = function (tenderingItem) {
      if (self.priceCalculatorMode.toLowerCase() === 'o' &&
         (tenderingItem.paymentInfo.isACH || tenderingItem.paymentInfo.isCreditCard) &&
         !base.oehdr.bofl &&
         (base.oehdr.totqtyshp < base.oehdr.totqtyord)) {
         tenderingItem.paymentInfo.tenderingErrorMessage = $translate.instant('message.warning.customer.doesnt.accept.back.order.payment');
         return false;
      } else {
         tenderingItem.paymentInfo.tenderingErrorMessage = '';
         return true;
      }
   };

   self.setTenderingLine = function (tenderingLine, sastnRecord) {
      var isPaymentInfoSet;

      var matchesWithShipTo = [];
      var matchesWithoutShipTo = [];
      self.paymentNumbers.forEach(function (paymentNumber) {
         if (paymentNumber.iMediaCd === tenderingLine.iMediaCd) {
            var matchedPaymentNumber = jQuery.extend({}, paymentNumber);
            matchedPaymentNumber.displayPaymentNo = paymentNumber.cCardholderName + ' - ' +
               paymentNumber.cPaymentNo.split('*').join('');
            if (paymentNumber.cShipto) {
               matchedPaymentNumber.displayPaymentNo += ' (' + paymentNumber.cShipto + ')';
            }

            if (tenderingLine.paymentInfo) {
               self.tenderingCollection.forEach(function (tenderingLine) {
                  if (tenderingLine.cUnMaskCardNo === paymentNumber.cUnmaskCardNo) {
                     matchedPaymentNumber.isInUse = true;
                  }
               });
            }

            if (paymentNumber.cShipto) {
               matchesWithShipTo.push(matchedPaymentNumber);
            } else {
               matchesWithoutShipTo.push(matchedPaymentNumber);
            }

            if ((tenderingLine.cUnMaskCardNo && tenderingLine.cUnMaskCardNo === paymentNumber.cUnmaskCardNo) || !tenderingLine.cUnMaskCardNo) {
               if (!matchedPaymentNumber.isInUse && !isPaymentInfoSet) {
                  tenderingLine.cRefer = paymentNumber.cPaymentNo;
                  tenderingLine.cUnMaskCardNo = paymentNumber.cUnmaskCardNo;
                  tenderingLine.paymentInfo = jQuery.extend(tenderingLine.paymentInfo, matchedPaymentNumber);
                  tenderingLine.paymentInfo.cUnMaskCardNo = matchedPaymentNumber.cUnmaskCardNo;

                  self.tenderingMeta.forEach(function (tenderingObject) {
                     if (tenderingLine.cUnMaskCardNo === tenderingObject.cUnMaskCardNo && tenderingLine.iMediaCd === tenderingObject.iMediaCd) {
                        var preserveAmount;
                        if (tenderingLine.dAmount) {
                           preserveAmount = tenderingLine.dAmount;
                        }
                        tenderingLine = jQuery.extend(tenderingLine, tenderingObject);
                        if (preserveAmount) {
                           tenderingLine.dAmount = preserveAmount;
                        }
                     }
                  });

                  isPaymentInfoSet = true;
               }
            }
         }
      });

      var matchingPaymentNumbers = matchesWithShipTo.concat(matchesWithoutShipTo);

      if (tenderingLine.paymentInfo && sastnRecord) {
         if (matchingPaymentNumbers.length === 0) {
            tenderingLine.paymentInfo.lIsCreditCard = sastnRecord.addtaxfl;
            tenderingLine.paymentInfo.lIsACH = sastnRecord.chkauth;
            tenderingLine.paymentInfo.dMinSale = sastnRecord.addonmin;
            tenderingLine.paymentInfo.ccAddon = sastnRecord.ccaddon;
         } else {
            var paymentNumberDefaults = matchingPaymentNumbers[0];
            tenderingLine.paymentInfo.lIsCreditCard = paymentNumberDefaults.lIsCreditCard;
            tenderingLine.paymentInfo.lIsACH = paymentNumberDefaults.lIsACH;
            tenderingLine.paymentInfo.dMinSale = paymentNumberDefaults.dMinSale;
         }
      }

      tenderingLine.paymentInfo.matchedPaymentNumbers = matchingPaymentNumbers;

      self.checkBackOrderAllowedForTenderingLine(tenderingLine);
      self.setAmountSensativeTenderingLineFields(tenderingLine);
   };

   self.priceCalculatorPercentageChanged = function () {
      if (self.priceCalculatorPercent !== 0 && self.priceCalculatorAmount !== 0) {
         var calculatedPrice = (self.priceCalculatorAmount / 100) * self.priceCalculatorPercent;
         self.setCalculatedPrice(parseFloat(calculatedPrice.toFixed(2)));
      } else {
         self.setCalculatedPrice(0);
      }

      self.pushCalculatedAmount();
   };

   self.priceCalculatorAmountChanged = function () {
      if (self.priceCalculatorPercent !== 0 && self.priceCalculatorAmount !== 0) {
         var calculatedPrice = (self.priceCalculatorAmount / 100) * self.priceCalculatorPercent;
         self.setCalculatedPrice(parseFloat(calculatedPrice.toFixed(2)));
      } else {
         self.setCalculatedPrice(0);
      }

      self.isPriceCalculatorAmountOrderedTotal = self.priceCalculatorAmount === base.orderTotals.orddue;

      self.pushCalculatedAmount();
   };

   self.pushCalculatedAmount = function () {
      var tenderingCollectionLength = self.tenderingCollection.length;
      if (tenderingCollectionLength > 0) {
         var cancelPush = false;

         for (var i = 0; i < tenderingCollectionLength; i++) {
            if (i !== 0 && !cancelPush) {
               cancelPush = self.tenderingCollection[i].dAmount !== 0;
            }
         }

         if (!cancelPush) {
            var okToPush = self.checkBackOrderAllowedForTenderingLine(self.tenderingCollection[0]);
            if (okToPush) {
               self.tenderingCollection[0].dAmount = self.calculatedPrice;
               self.setAmountSensativeTenderingLineFields(self.tenderingCollection[0]);
            }
         }

         self.recalculateTotal();
      }
   };

   self.setBaseAmountFromCalcMode = function () {
      if (self.priceCalculatorMode.toLowerCase() === 'o') {
         base.amountDue = base.orderTotals.orddue - self.totalTenderedAmount;
      } else if (self.priceCalculatorMode.toLowerCase() === 's') {
         if (base.orderTotals.orddue >= 0 && base.orderTotals.shpdue - self.totalTenderedAmount < 0) {
            base.amountDue = 0;
         } else {
            base.amountDue = base.orderTotals.shpdue - self.totalTenderedAmount;
         }
      } else if (self.priceCalculatorMode.toLowerCase() === 'b') {
         if (base.orderTotals.orddue >= 0 && (base.orderTotals.orddue - base.orderTotals.shpdue) - self.totalTenderedAmount < 0) {
            base.amountDue = 0;
         } else {
            base.amountDue = (base.orderTotals.orddue - base.orderTotals.shpdue) - self.totalTenderedAmount;
         }
      } else {
         base.amountDue = base.orderTotals.orddue;
      }
   };

   self.recalculateTotal = function () {
      var totalTendered = 0;
      self.tenderingCollection.forEach(function (item) {
         totalTendered += item.dAmount;
      });
      self.totalTenderedAmount = totalTendered;

      self.setBaseAmountFromCalcMode();

      //reset forceTender because we're recalculating
      base.forceTender = self.forceTenderFromCall;

      if (base.oehdr.oetype.toLowerCase() === 'cs') {
         if ((base.amountDue === 0 && self.priceCalculatorAmount === 0) || (base.sasc.tenderfl && !base.forceTender)) {
            self.canContinueWithoutTendering = true;
            base.forceTender = '';
         } else {
            self.canContinueWithoutTendering = false;
         }
      }
   };

   self.priceCalculatorTotalByChanged = function () {
      if (self.priceCalculatorMode.toLowerCase() === 'o') {
         self.priceCalculatorAmount = base.orderTotals.orddue;
      } else if (self.priceCalculatorMode.toLowerCase() === 's') {
         if (base.orderTotals.orddue >= 0 && base.orderTotals.shpdue < 0) {
            self.priceCalculatorAmount = 0;
         } else {
            self.priceCalculatorAmount = base.orderTotals.shpdue;
         }
      } else if (self.priceCalculatorMode.toLowerCase() === 'b') {
         if (base.orderTotals.orddue >= 0 && base.orderTotals.orddue - base.orderTotals.shpdue < 0) {
            self.priceCalculatorAmount = 0;
         } else {
            self.priceCalculatorAmount = base.orderTotals.orddue - base.orderTotals.shpdue;
         }
      } else {
         self.priceCalculatorAmount = 0;
         self.amountDue = 0;
      }

      self.priceCalculatorAmountChanged();
   };

   self.isCodDisabled = function () {
      if (!base.sasoo.termsoverfl ||
         (base.oehdr.oetype.toLowerCase() === 'cs' || base.oehdr.oetype.toLowerCase() === 'cr') ||
         base.oehdr.nodolines === 0 ||
         base.orderTotals.ordtotalamt <= 0) {
         return true; //disabled
      } else {
         return false; //enabled
      }
   };

   self.isCcNonRefundDisabled = function () {
      if ((base.oehdr.oetype.toLowerCase() === 'qu' || base.oehdr.oetype.toLowerCase() === 'st' || base.oehdr.oetype.toLowerCase() === 'bl' || base.oehdr.oetype.toLowerCase() === 'rm') ||
         base.orderTotals.ordtotalamt <= 0 ||
         !base.oelineSettings.lCCInstalled ||
         base.oehdr.tendamt !== 0) {
         return true; //disabled
      } else {
         return false; //enabled
      }
   };

   self.signature = function (iLoop) {
      if (!base.icsd) {
         DataService.get('api/ic/icsd/getbypk', { params: { whse: base.oehdr.whse } }, function (data) {
            if (data) {
               base.icsd = data;
               self.signature();
            }
         });
         return;
      }

      if (!base.icsd.cenpossigfl) {
         $state.go(base.baseState + '.signature', { navBackState: base.baseState + '.collectPayment' });
      } else {
         if (!iLoop) {
            iLoop = 0;
         }

         var currentPaymentType = self.completePaymentTypeList[iLoop];
         if (currentPaymentType.processor && currentPaymentType.processor !== "0") {
            DataService.getResource('api/sa/assasetup/sastpretrieve/' + currentPaymentType.processor, { method: 'GET', busy: true }, function (data) {
               if (data.callingURLH5) {
                  self.signaturePopup(currentPaymentType.codeval);
               } else {
                  iLoop++;
                  self.signature(iLoop);
               }
            });
         } else {
            iLoop++;
            self.signature(iLoop);
         }
      }
   };

   self.signaturePopup = function (SigMediaCd) {
      CenPosService.showModal({
         type: 'signature',
         mediacd: SigMediaCd,
         invoiceno: base.oehdr.orderno + '-' + base.oehdr.ordersuf,
         successCallback: self.saveImage
      });
   };

   self.saveImage = function () {

      var pvImages = {
         cono: UserService.getCono(),
         keytype: 'oedlv',
         keyvalue1: base.oehdr.custno,
         keyvalue2: base.oehdr.orderno + '-' + Utils.pad(base.oehdr.ordersuf, 2),
         chunk: 1,
         descrip: 'Signature: ' + base.oehdr.custno,
         image64: 'cctrans',
         currproc: 'oeet',
         operinit: UserService.getUserName()
      };

      DataService.post('api/oe/asoeentry/oesignaturesave', { data: pvImages, busy: true }, function () {
         MessageService.info('global.information', 'global.signature.saved.successfully');
         if (self.navBackState) {
            $state.go(self.navBackState);
         } else {
            // no change in state
         }
      });
   };

   self.acceptTender = function () {
      self.isProcessingTender = true;
      var totalTendered = 0;
      var linesToTender = JSLINQ(self.tenderingCollection).Where(function (tenderingLine) { return tenderingLine.dAmount !== 0; }) || [];
      var numberOfLinesToTender = linesToTender.items.length;
      for (var i = 0; i < numberOfLinesToTender; i++) {
         var currentTenderingLine = linesToTender.items[i];
         totalTendered += currentTenderingLine.dAmount;
      }

      if (totalTendered < self.calculatedPrice) {
         var mismatchedAmountErrorMessage = $translate.instant('message.mismatched.tendering.totals.part.1') + totalTendered +
            $translate.instant('message.mismatched.tendering.totals.part.2') + self.calculatedPrice + '.' + '<br/>' +
            $translate.instant('message.mismatched.tendering.totals.part.3');
         MessageService.error('global.error', mismatchedAmountErrorMessage);
         self.isProcessingTender = false;
         return;
      }

      if (base.journal && base.journal.gJrnlno) {
         if (numberOfLinesToTender > 0) {
            var isAch = false;
            var tenderContainsCreditCard = false;
            var isMinSale = false;
            var holdBo = false;
            for (var j = 0; j < numberOfLinesToTender; j++) {
               var currentLineToTender = linesToTender.items[j];
               //check for ACH
               if (!currentLineToTender.isCreditCard && currentLineToTender.isAch) {
                  isAch = true;
               }
               //check for credit cards
               if (currentLineToTender.isCreditCard) {
                  tenderContainsCreditCard = true;
               }
               //check for minimum sale
               if (currentLineToTender.minSaleAmount >= totalTendered) {
                  isMinSale = true;
               }
               //check for hold BO flag
               if (currentLineToTender.lCCHoldBofl) {
                  holdBo = true;
               }
            }
            //check if tendered amount is positive
            var isTotalTenderPositive = totalTendered > 0 && base.oehdr.oetype.toLowerCase() !== 'rm';

            if ((tenderContainsCreditCard || holdBo) && !isMinSale && !base.oehdr.ccnonrefundfl && isTotalTenderPositive) {
               switch (base.sasoo.holdforauthdefault.toLowerCase()) {
                  case 'always':
                     self.tenderingUpdate(true, false);
                     break;
                  case 'never':
                     self.tenderingUpdate(false, false);
                     break;
                  case 'prompt':
                     MessageService.yesNo('global.credit.card.authorization', 'question.hold.for.authorization', function () {
                        //yes callback
                        self.tenderingUpdate(true, false);
                     }, function () {
                        //no callback
                        self.tenderingUpdate(false, false);
                     });
                     break;
                  default:
                     var aoHoldForAuth = AodataService.getValue('OE', 'holdforauthdefault');
                     if (aoHoldForAuth !== null) {
                        switch (aoHoldForAuth.fieldvalue) {
                           case 'always':
                              self.tenderingUpdate(true, false);
                              break;
                           case 'never':
                              self.tenderingUpdate(false, false);
                              break;
                           case 'prompt':
                              MessageService.yesNo('global.credit.card.authorization', 'question.hold.for.authorization', function () {
                                 //yes callback
                                 self.tenderingUpdate(true, false);
                              }, function () {
                                 //no callback
                                 self.tenderingUpdate(false, false);
                              });
                              break;
                        }
                     } else {
                        MessageService.yesNo('global.credit.card.authorization', 'question.hold.for.authorization', function () {
                           //yes callback
                           self.tenderingUpdate(true, false);
                        }, function () {
                           //no callback
                           self.tenderingUpdate(false, false);
                        });
                     }
                     break;
               }
            } else {
               if ((base.oehdr.oetype.toLowerCase() === 'cs' || base.oehdr.selltype.toLowerCase() === 'c' || base.oehdr.selltype.toLowerCase() === 'd') &&
                  (base.oehdr.approvty.toLowerCase() === 'y' && base.amountDue > 0)) {
                  MessageService.yesNo('global.confirm', 'question.charge.remaining.amount.to.account', self.chargeRemainingAmountYes, self.setIsProcessingTender);
               } else {
                  self.checkForTenderingAuthorization();
               }
            }
         } else {
            MessageService.error('global.error', 'message.no.tendering.lines.selected');
            self.isProcessingTender = false;
         }
      } else {
         //open a journal
         base.journalControl.showOpenView(self.acceptTender, function () {
            //cancel callback
            self.isProcessingTender = false;
         });
      }
   };

   self.chargeRemainingAmountYes = function () {
      if (base.oehdr.selltype.toLowerCase() === 'c' || base.oehdr.selltype.toLowerCase() === 'd') {
         base.forceTender = '';
         self.chargeRemainingToAccount = true;
      }
      self.checkForTenderingAuthorization();
   };

   self.checkForTenderingAuthorization = function () {

      /* Valid Sell Types from ARSC
      Y - Yes
      N - No
      C - Cash Only
      D - COD Only
      H - Hold Until
      O - Open Until
      */
      if (base.oehdr.oetype.toLowerCase() === 'cs' && base.oehdr.selltype === 'c') {
         // check for refunds - Do not return more than the amount of the order
         if (base.orderTotals.orddue < 0 && Math.abs(self.priceCalculatorAmount) > Math.abs(base.orderTotals.orddue) ||
            (Math.abs(self.priceCalculatorAmount) > Math.abs(base.orderTotals.shpdue) && Math.abs(self.priceCalculatorAmount) !== Math.abs(base.orderTotals.orddue))) {
            AuthService.createAuthPoint('oeet', 'tendering', 'payment', '', '', null, function () {
               //auth point passed functionality
               self.tenderingUpdate(false, false);
            }, self.setIsProcessingTender);
         } else if (base.orderTotals.orddue > 0 && self.priceCalculatorAmount < base.orderTotals.orddue &&
            (self.priceCalculatorMode.toLowerCase() === 'o' || self.priceCalculatorAmount < base.orderTotals.shpdue)) {
            // ^^ else-if checking for down payment ^^
            AuthService.createAuthPoint('oeet', 'tendering', 'payment', '', '', null, function () {
               //auth point passed functionality
               self.tenderingUpdate(false, false);
            }, self.setIsProcessingTender);
         } else {
            // no auth required
            self.tenderingUpdate(false, false);
         }
      } else if (base.oehdr.oetype.toLowerCase() === 'cs' && base.oehdr.selltype.toLowerCase() === 'd' || base.oehdr.selltype.toLowerCase() === 'h') {
         //check for refunds - do not return more than the amount that was shipped
         if (base.orderTotals.shpdue < 0 && Math.abs(self.priceCalculatorAmount) > Math.abs(base.orderTotals.shpdue)) {
            AuthService.createAuthPoint('oeet', 'tendering', 'payment', '', '', null, function () {
               //auth point passed functionality
               self.tenderingUpdate(false, false);
            }, self.setIsProcessingTender);
         } else if (base.orderTotals.shpdue > 0 && self.priceCalculatorAmount < base.orderTotals.shpdue) {
            // ^^ else-if checking for down payment ^^
            AuthService.createAuthPoint('oeet', 'tendering', 'payment', '', '', null, function () {
               //auth point passed functionality
               self.tenderingUpdate(false, false);
            }, self.setIsProcessingTender);
         } else {
            // no auth required
            self.tenderingUpdate(false, false);
         }
      } else {
         // no auth required
         self.tenderingUpdate(false, false);
      }
   };

   self.setIsProcessingTender = function () {
      self.isProcessingTender = false;
   };

   self.calculateTenderingUpdateParams = function (tenderingCollection) {
      //calculate total amount tendered
      var totalTendered = 0;
      var numberOfLinesToTender = tenderingCollection.length;
      for (var i = 0; i < numberOfLinesToTender; i++) {
         var currentTenderingLine = tenderingCollection[i];
         totalTendered += currentTenderingLine.dAmount;
      }

      //calculate change due
      var changeDue = 0;
      if (totalTendered < 0 && base.oehdr.oetype.toLowerCase() !== 'rm') {
         changeDue = -totalTendered;
      } else if (totalTendered > 0 && totalTendered > self.calculatedPrice) {
         var cashTenderingLines = JSLINQ(tenderingCollection).Where(function (tenderingLine) {
            return !tenderingLine.paymentInfo.lIsACH && !tenderingLine.paymentInfo.lIsCreditCard && tenderingLine.dAmount !== 0;
         }) || [];

         if (cashTenderingLines.items.length > 0) {
            changeDue = totalTendered - self.calculatedPrice;
         }
      }
      return { totalTendered: totalTendered, changeDue: changeDue };
   };

   self.tenderingUpdate = function (holdForAuth, overrideNonRefund) {
      var tenderingParams = self.calculateTenderingUpdateParams(self.tenderingCollection);
      var totalTendered = tenderingParams.totalTendered;
      var changeDue = tenderingParams.changeDue;

      var nonRefundFl = base.oehdr.ccnonrefundfl;
      if (overrideNonRefund) {
         nonRefundFl = true;
      }

      var tenderingUpdateRequest = {
         tendering: self.tenderingCollection,
         oetenderingupdatecriteria: {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            jrnlno: base.journal.gJrnlno,
            dwnpmtamt: self.calculatedPrice,
            chgdue: changeDue,
            maint: base.isAddOrderMode,
            codfl: base.oehdr.codfl,
            holdforauth: true,
            nonrefundfl: nonRefundFl
         }
      };
      DataService.post('api/oe/asoeheader/oetenderingupdate', { data: tenderingUpdateRequest, busy: true }, function (data) {
         if (data) {
            var transErrSequences = [];
            //checking for failed transactions
            data.messaging.forEach(function (message) {
               if (message.messagetype.toLowerCase() === 'e') {
                  var transErrIndex = message.messagetxt.indexOf('Seq');
                  if (transErrIndex !== -1) {
                     //grab the sequence numbers of the failed transactions
                     var transErrSeq = message.messagetxt.substr(transErrIndex + 3, 3);
                     transErrSequences.push(transErrSeq);
                     //clear the sequence number from the message text
                     message.messagetxt = message.messagetxt.slice(0, transErrIndex);
                  }
               }
            });
            if (MessageService.processMessaging(data.messaging)) {
               //if there were failed transactions, then we need to recalculate totals
               if (transErrSequences.length > 0) {
                  //seperate the transactions that failed from the ones that were successful
                  var successfulTransCollection = [];
                  self.tenderingCollection.forEach(function (tenderingLine) {
                     transErrSequences.forEach(function (transErrSeq) {
                        if (tenderingLine.iSeqNo === parseInt(transErrSeq, 10)) {
                           self.failedTransactionCollection.push(tenderingLine);
                        } else {
                           successfulTransCollection.push(tenderingLine);
                        }
                     });
                  });

                  var tenderingParams = self.calculateTenderingUpdateParams(successfulTransCollection);
                  totalTendered = tenderingParams.totalTendered;
                  changeDue = tenderingParams.changeDue;
               }
            }

            if (changeDue !== 0) {
               var changeDueMessage = $translate.instant('global.paid') + ': ' + parseFloat(totalTendered).toFixed(2) + '<br/>' +
                  $translate.instant('global.down.payment') + ': ' + parseFloat(self.calculatedPrice).toFixed(2) + '<br/><br/>' +
                  '<strong>' + $translate.instant('global.change.due') + ': ' + parseFloat(changeDue).toFixed(2) + '</strong><br/>';
               MessageService.confirmation('global.change.due', changeDueMessage);
            }

            if (base.orderTenderedAmount) {
               base.orderTenderedAmount += totalTendered;
            } else {
               base.orderTenderedAmount = totalTendered;
            }

            // Retotal order based on (O)rdered, (S)hipped or (B)oth
            base.calcsob = 'b';

            base.getOrderData(self.loadTendering, self.resetFailedTransactions);
         }
         self.isProcessingTender = false;
      }, function () {
         //error processing
         self.isProcessingTender = false;
      });
   };

   self.resetFailedTransactions = function () {
      if (self.failedTransactionCollection.length > 0) {
         var existingTransaction = 0;
         if (self.tenderingCollection.length > 0) {
            self.tenderingCollection.forEach(function (tenderingLine) {
               if (tenderingLine.iSeqNo > existingTransaction) {
                  existingTransaction = tenderingLine.iSeqNo;
               }
            });
         }
         self.failedTransactionCollection.forEach(function (failedTransaction) {
            failedTransaction.iSeqNo = existingTransaction + 1;
            self.tenderingCollection.push(failedTransaction);
         });

         //reset failed transactions
         self.failedTransactionCollection = [];
      }
   };

   self.addPaymentType = function () {
      var lastSeqNo = 0;
      var tenderAmount = 0;
      self.tenderingCollection.forEach(function (tenderingItem) {
         if (tenderingItem.iSeqNo > lastSeqNo) {
            lastSeqNo = tenderingItem.iSeqNo;
         }
         tenderAmount += tenderingItem.dAmount;
      });
      var amountLeft = 0;
      if (self.calculatedPrice > tenderAmount) {
         amountLeft = self.calculatedPrice - tenderAmount;
      }
      self.tenderingCollection.push({
         paymentInfo: {
            tenderingErrorMessage: $translate.instant('message.please.select.a.payment.type')
         },
         dAmount: amountLeft,
         iSeqNo: lastSeqNo + 1
      });
   };

   self.getSastnMatchForTenderingItem = function (tenderingItem) {
      var sastnMatch = JSLINQ(self.completePaymentTypeList).Where(function (sastnRecord) { return sastnRecord.codeval === tenderingItem.iMediaCd; }) || [];
      if (sastnMatch.items.length === 0) {
         var params = {
            codeiden: 'p',
            codeval: tenderingItem.iMediaCd,
            fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,ccaddon'
         };

         DataService.get('api/sa/sastn/getbypk', { params: params }, function (data) {
            if (data) {
               self.completePaymentTypeList.push({ key: data.codeiden + '-' + data.codeval, sastn: data });
            }
            self.addTenderingAdditionalFields(tenderingItem, data);
         });
      } else {
         self.addTenderingAdditionalFields(tenderingItem, sastnMatch.items[0]);
      }
   };

   self.addTenderingAdditionalFields = function (tenderingItem, sastnRecord) {

      tenderingItem.paymentInfo.isModifyCardEnabled = base.sasoo.oetokenmodifyfl;

      var aoBlockCardCreate = AodataService.getValue('OE', 'BlockCardCreate');
      var aoCardPrompt = false;
      DataService.get('api/oe/oeao/getbypk', { busy: false }, function (data) {
         if (data) {
            aoCardPrompt = data.promptcreatecardfl;
            if (aoBlockCardCreate.toLowerCase() === 'yes' || aoCardPrompt === false) {
               tenderingItem.paymentInfo.isCreateCardBlockedByAo = true;
               tenderingItem.paymentInfo.isAddNewCardEnabled = false;
            } else {
               var params;
               tenderingItem.paymentInfo.isCreateCardBlockedByAo = false;

               if (base.oehdr.shipto) {
                  params = {
                     custno: base.oehdr.custno,
                     shipto: base.oehdr.shipto,
                     fldlist: 'ccblockfl'
                  };

                  DataService.get('api/ar/arss/getbypk', { params: params }, function (data) {
                     if (data) {
                        tenderingItem.paymentInfo.isAddNewCardEnabled = !data.ccblockfl;
                     }
                  });
               }
               else {
                  params = {
                     custno: base.oehdr.custno,
                     fldlist: 'ccblockfl'
                  };

                  DataService.get('api/ar/arsc/getbypk', { params: params }, function (data) {
                     if (data) {
                        tenderingItem.paymentInfo.isAddNewCardEnabled = !data.ccblockfl;
                     }
                  });
               }
            }

         }
      });

      if (sastnRecord) {
         self.setTenderingLine(tenderingItem, sastnRecord);
      } else {
         tenderingItem.paymentInfo.lIsCreditCard = false;
         tenderingItem.paymentInfo.lIsACH = false;
         tenderingItem.paymentInfo.dMinSale = 0;

         self.checkBackOrderAllowedForTenderingLine(tenderingItem);
         self.setAmountSensativeTenderingLineFields(tenderingItem);
      }
   };

   self.tenderingLineReferenceChanged = function (tenderingLine) {
      if (tenderingLine.iMediaCd) {
         self.completePaymentTypeList.forEach(function (paymentType) {
            if (paymentType.codeval === tenderingLine.iMediaCd) {
               tenderingLine.cReference = paymentType.descrip;
               // clear out paymentInfo and card-specific fields when the user changes the Payment Type
               tenderingLine.cRefer = '';
               tenderingLine.cUnMaskCardNo = '';
               tenderingLine.paymentInfo = {};
            }
         });

         self.getSastnMatchForTenderingItem(tenderingLine);

         if (tenderingLine.iMediaCd === 1) {
            tenderingLine.paymentInfo.isCheckRecord = true;
         }

         tenderingLine.paymentInfo.tenderingErrorMessage = '';
      } else {
         tenderingLine.paymentInfo.tenderingErrorMessage = $translate.instant('message.please.select.a.payment.type');
      }
   };

   self.tenderingLinePaymentNumberChanged = function (tenderingLine) {
      self.tenderingMeta.forEach(function (tenderingObject) {
         if (tenderingLine.cUnMaskCardNo === tenderingObject.cUnMaskCardNo && tenderingLine.iMediaCd === tenderingObject.iMediaCd) {
            var preserveAmount;
            if (tenderingLine.dAmount) {
               preserveAmount = tenderingLine.dAmount;
            }
            tenderingLine = jQuery.extend(tenderingLine, tenderingObject);
            if (preserveAmount) {
               tenderingLine.dAmount = preserveAmount;
            }
         }
      });

      self.paymentNumbers.forEach(function (paymentNumber) {
         if (paymentNumber.cUnmaskCardNo === tenderingLine.cUnMaskCardNo) {
            tenderingLine.paymentInfo = jQuery.extend(tenderingLine.paymentInfo, paymentNumber);
            tenderingLine.paymentInfo.cUnMaskCardNo = paymentNumber.cUnmaskCardNo;
            self.setTenderingLine(tenderingItem, sastnRecord);

            self.checkBackOrderAllowedForTenderingLine(tenderingLine);
            self.setAmountSensativeTenderingLineFields(tenderingLine);
         }
      });
   };

   self.cancelTenderingWork = function () {
      self.loadTendering();
   };

   self.modifyCardClicked = function (tenderingLine) {
      self.selectedTenderingLine = tenderingLine;
      var tokenID = tenderingLine.cUnMaskCardNo.split('\u0003');

      CenPosService.showModal({
         type: 'modify',
         mediacd: tenderingLine.iMediaCd,
         shipto: base.oehdr.shipto,
         custno: base.oehdr.custno,
         tokenid: tokenID[1],
         invoiceno: base.oehdr.orderno + '-' + base.oehdr.ordersuf,
         successCallback: self.modifyARSD
      });
   };

   self.addNewCardClicked = function (tenderingLine) {
      self.selectedTenderingLine = tenderingLine;
      CenPosService.showModal({
         type: 'add',
         mediacd: tenderingLine.iMediaCd,
         shipto: base.oehdr.shipto,
         custno: base.oehdr.custno,
         invoiceno: base.oehdr.orderno + '-' + base.oehdr.ordersuf,
         successCallback: self.saveARSD
      });
   };

   self.saveARSD = function () {
      var arsdSave = {
         mediacd: self.selectedTenderingLine.iMediaCd,
         shipto: base.oehdr.shipto,
         custno: base.oehdr.custno
      };
      DataService.post('api/ar/asarsetup/arsdsave', { data: arsdSave, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            var preserveAmount = self.selectedTenderingLine.dAmount;
            self.loadTendering(self.setNewCard(data.arsdsave), preserveAmount, data.arsdsave.cardno);
         }
         self.selectedTenderingLine = null;
      }, function () {
         //error handling
         self.selectedTenderingLine = null;
      });
   };

   self.modifyARSD = function () {
      var arsdModify = {
         arsdrowid: self.selectedTenderingLine.paymentInfo.rowidARSD
      };
      DataService.post('api/ar/asarsetup/arsoccreditcardmodify', { data: arsdModify, busy: true }, function (data) {
         if (data) {
            // no response handling required
         }
      });
   };

   self.setNewCard = function (arsdSave) {
      if (arsdSave) {
         var tenderingLine = {
            iMediaCd: arsdSave.mediacd,
            cRefer: arsdSave.cardno,
            paymentInfo: {}
         };
         self.getSastnMatchForTenderingItem(tenderingLine);
      }
   };

   self.oneTimeAuthClicked = function (tenderingLine) {
      if (base.journal && base.journal.gJrnlno) {
         //checking for gJrnlno because if we auto-open a journal, it sends journal info back, not the tenderingLine we want
         if (tenderingLine.gJrnlno) {
            tenderingLine = self.autoOpenJournalTenderingLine;
            self.autoOpenJournalTenderingLine = null;
         }

         //override the transaction code
         tenderingLine.cCardTrans = 'AUTH';

         CenPosService.showModal({
            type: 'auth',
            mediacd: tenderingLine.iMediaCd,
            shipto: base.oehdr.shipto,
            custno: base.oehdr.custno,
            invoiceno: base.oehdr.orderno + '-' + base.oehdr.ordersuf,
            whse: base.oehdr.whse,
            onetimetype: 'Auth',
            issale: false,
            amount: tenderingLine.dAmount,
            taxamt: self.calculateTaxAmount(tenderingLine),
            successCallback: self.loadCenPosSaleAuth,
            ipaddress: base.ipAddress
         });
      } else {
         //save the tenderingLine so that once the journal is autoOpened, we still have access to it
         self.autoOpenJournalTenderingLine = tenderingLine;
         base.journalControl.showOpenView(self.oneTimeAuthClicked);
      }
   };

   self.oneTimeTransClicked = function (tenderingLine) {
      self.navToOneTimeTrans(tenderingLine);
   };

   self.calculateTaxAmount = function (tenderingLine) {
      if (base.oehdr.totinvamt) {
         var absTenderAmt = Math.abs(tenderingLine.dAmount);
         var taxAmt = base.oehdr.taxamt1 + base.oehdr.taxamt2 + base.oehdr.taxamt3 + base.oehdr.taxamt4;
         var calculatedAmount = (absTenderAmt / base.oehdr.totinvamt) * taxAmt;
         return parseFloat(calculatedAmount.toFixed(5));
      } else {
         return 0;
      }
   };

   self.navToOneTimeTrans = function (tenderingLine) {
      if (base.journal && base.journal.gJrnlno) {
         //checking for gJrnlno because if we auto-open a journal, it sends journal info back, not the tenderingLine we want
         if (tenderingLine.gJrnlno) {
            tenderingLine = self.autoOpenJournalTenderingLine;
            self.autoOpenJournalTenderingLine = null;
         }

         var oneTimeType;
         if (tenderingLine.paymentInfo.isAchCredit) {
            oneTimeType = 'ACHCredit';
         } else if (tenderingLine.paymentInfo.lIsACH) {
            oneTimeType = 'ACHDebit';
         } else if (tenderingLine.paymentInfo.isCCReturn) {
            oneTimeType = 'Credit';
         } else {
            oneTimeType = 'Sale';
         }

         //override the transaction code
         if (tenderingLine.paymentInfo.isCCReturn) {
            tenderingLine.cCardTrans = 'RETN';
         } else {
            tenderingLine.cCardTrans = 'SALE';
         }

         base.oehdr.ccnonrefundfl = true;

         CenPosService.showModal({
            type: 'sale',
            mediacd: tenderingLine.iMediaCd,
            shipto: base.oehdr.shipto,
            custno: base.oehdr.custno,
            invoiceno: base.oehdr.orderno + '-' + base.oehdr.ordersuf,
            whse: base.oehdr.whse,
            onetimetype: oneTimeType,
            issale: false,
            amount: tenderingLine.dAmount,
            taxamt: self.calculateTaxAmount(tenderingLine),
            successCallback: self.loadCenPosSaleTrans,
            ipaddress: base.ipAddress
         });
      } else {
         //save the tenderingLine so that once the journal is autoOpened, we still have access to it
         self.autoOpenJournalTenderingLine = tenderingLine;
         base.journalControl.showOpenView(self.navToOneTimeTrans);
      }
   };

   self.loadCenPosSaleTrans = function () {
      self.loadCenPosSale(false);
   };

   self.loadCenPosSaleAuth = function () {
      self.loadCenPosSale(true);
   };

   self.loadCenPosSale = function (overrideNonRefund) {
      DataService.post('api/oe/asoeheader/loadcenpossale', { data: self.tenderingCollection, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            Utils.replaceArray(self.tenderingCollection, data.tendering);

            self.tenderingUpdate(false, overrideNonRefund);
         }
      });
   };

   self.back = function () {
      $state.go(base.baseState + '.taxesAndTotals');
   };
});

app.controller('OeetTenderingHistoryDetailsCtrl', function ($state, $scope, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var cp = $scope.cp;

   self.noDetailsMessage = $translate.instant('message.no.detailed.information.is.available.for.this');
   self.ccHistoryRow = cp.rowParams.item;
   self.creditCardHistory = {};
   self.creditCardDetail = {};
   var ccHistoryCriteria = {
      orderno: base.oehdr.orderno,
      ordersuf: base.oehdr.ordersuf
   };

   DataService.post('api/oe/asoeinquiry/oeircchistory', { data: ccHistoryCriteria, busy: true }, function (data) {
      if (data) {
         var match = JSLINQ(data).Where(function (ccHistory) {
            return ccHistory.amount === self.ccHistoryRow.amount && ccHistory.mediacd === self.ccHistoryRow.mediacd && ccHistory.statustype;
         }) || [];
         var match2 = JSLINQ(data).Where(function (ccHistory) {
            return ccHistory.amount >= self.ccHistoryRow.amount && ccHistory.mediacd === self.ccHistoryRow.mediacd && ccHistory.statustype;
         }) || [];

         if (match.items.length === 1) {
            self.creditCardHistory = match.items[0];

            var ccDetailCriteria = {
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               cardno: self.creditCardHistory.enccardno,
               mediacd: self.creditCardHistory.mediacd,
               transcd: self.creditCardHistory.transcd,
               seqno: self.creditCardHistory.seqno
            };
            DataService.post('api/oe/asoeinquiry/oeirccdetail', { data: ccDetailCriteria, busy: true }, function (data) {
               if (data) {
                  self.creditCardDetail = data;
               }
            });
         } else if (match2.items.length === 1) {
            self.creditCardHistory = match2.items[0];

            var ccDetailCriteria = {
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               cardno: self.creditCardHistory.enccardno,
               mediacd: self.creditCardHistory.mediacd,
               transcd: self.creditCardHistory.transcd,
               seqno: self.creditCardHistory.seqno
            };
            DataService.post('api/oe/asoeinquiry/oeirccdetail', { data: ccDetailCriteria, busy: true }, function (data) {
               if (data) {
                  self.creditCardDetail = data;
               }
            });
         } else {
            self.creditCardDetail.cardname = self.noDetailsMessage;
         }
      }
   });

   self.sendAuthorizationRequest = function () {
      var params = {
         codeiden: 'p',
         codeval: self.creditCardHistory.mediacd,
         fldlist: 'addtaxfl'
      };

      DataService.get('api/sa/sastn/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            if (data.addtaxfl) {
               MessageService.yesNoCancel('', 'global.hold.for.authorization', self.holdForAuthYesCallback, self.holdForAuthNoCallback, self.holdForAuthCancelCallback);
            }
         }
      });
   };

   self.holdForAuthYesCallback = function () {
      self.authorizeCreditCard(true);
   };

   self.holdForAuthNoCallback = function () {
      self.authorizeCreditCard(false);
   };

   self.holdForAuthCancelCallback = function () {
      MessageService.alert('', 'message.authorization.not.performed');
   };

   self.authorizeCreditCard = function (holdForAuth) {
      var ccAuthorizeRequest = {
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         mediacd: self.creditCardHistory.mediacd,
         enccardno: self.creditCardHistory.enccardno,
         transcd: self.creditCardHistory.transcd,
         seqno: self.creditCardHistory.seqno,
         holdforauth: holdForAuth
      };
      DataService.post('api/oe/asoeheader/authorizeoeircreditcard', { data: ccAuthorizeRequest, busy: true }, function (data) {
         if (data) {
            MessageService.confirmation('global.info', data);
         }
      });
   };
});