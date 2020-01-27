'use strict';

app.provider('OeLineDetailsState', function OeLineDetailsStateProvider($stateProvider) {
   var self = this;

   /**
    * Provider access method
    */
   this.$get = [function () {
      return self;
   }];

   /**
    * These States are used to help make it easier to implement, and share code.  Having them in this control means
    * that it doesn't need these states in each place this is called.
    */
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.line', {
         url: '/line',
         params: {
            whse: null,
            orderno: null,
            ordersuf: null,
            lineno: null,
            oelndspl: null
         },
         views: {
            lineDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/line-details/line.json');
               },
               controller: 'OeLineDetailsLineCtrl as line'
            }
         }
      });

      //Kit details states
      $stateProvider.state(parentState + '.line.kitComponentDetail', {
         url: '/kit-component',
         params: {
            component: null,
            componentType: null,
            matchedSubComponents: null
         },
         views: {
            kitComponentViewContainer: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/line-kit-inquiry/kit-component-details.json');
               },
               controller: 'OeLineKitCompDetailsCtrl as ldKitCd'
            }
         }
      });
      $stateProvider.state(parentState + '.line.kitGroupComponent', {
         url: '/kit-group-component',
         params: {
            selectedComponent: null,
            matchedSubComponents: null
         },
         views: {
            kitComponentViewContainer: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/line-kit-inquiry/kit-group-component.json');
               },
               controller: 'OeLineKitGroupCompCtrl as ldKitGc'
            }
         }
      });
      $stateProvider.state(parentState + '.line.kitOptionComponent', {
         url: '/kit-option-component',
         params: {
            selectedComponent: null,
            matchedSubComponents: null
         },
         views: {
            kitComponentViewContainer: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/line-kit-inquiry/kit-option-component.json');
               },
               controller: 'OeLineKitOptionCompCtrl as ldKitOc'
            }
         }
      });
      $stateProvider.state(parentState + '.line.kitKeywordComponent', {
         url: '/kit-keyword-component',
         params: {
            component: null,
            groupName: null,
            kitCriteria: null
         },
         views: {
            kitComponentViewContainer: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/line-kit-inquiry/kit-keyword-component.json');
               },
               controller: 'OeLineKitKeywordCompCtrl as ldKitKc'
            }
         }
      });
      $stateProvider.state(parentState + '.line.oneTimeCost', {
         url: '/one-time-cost',
         params: {
            oeline: null,
            isInquiry: true,
            okCallback: null,
            cancelCallback: null
         },
         views: {
            kitComponentViewContainer: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/one-time-cost/one-time-cost.json');
               },
               controller: 'OrderEntryOneTimeCostCtrl as oeOtc'
            }
         }
      });
      $stateProvider.state(parentState + '.line.oneTimeRebate', {
         url: '/one-time-rebate',
         params: {
            oeline: null,
            isInquiry: null,
            okCallback: null,
            cancelCallback: null
         },
         views: {
            kitComponentViewContainer: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/one-time-rebate/one-time-rebate.json');
               },
               controller: 'OrderEntryOneTimeRebateCtrl as oeOtr'
            }
         }
      });
      $stateProvider.state(parentState + '.bin-allocation', {
         url: '/bin-allocation',
         params: {
            criteria: null,
            binAllocationDisabled: null
         },
         views: {
            binAllocation: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/bin-allocation/bin-allocation.json');
               },
               controller: 'BinAllocationCtrl as bac'
            }
         }
      });
   };
});

/**
 * Control for displaying OE Line Details (grid)
 */
app.controller('OeLineDetailsCtrl', function ($scope, $state, AodataService, Utils, DataService, MessageService, Sasoo) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   var TIETYPE_KP = 'w';
   var TIETYPE_PO = 'p';
   var TIETYPE_VA = 'f';
   var TIETYPE_WT = 't';

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   self.sasoo = Sasoo;

   self.oeeh = Utils.getNestedValue($scope, options.headerModel);

   self.oeeh.$promise.then(function () {
      // Load Lines List
      var criteria = {
         orderno: self.oeeh.orderno,
         ordersuf: self.oeeh.ordersuf,
         showlines: 'i,c,t'
      };
      DataService.post('api/oe/asoeline/oeiolinelistfetch', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;

            //User Hook (do not rename)
            if (self.oeiolinelistfetchContinue) {
               self.oeiolinelistfetchContinue();
            }
         }
      });
   });

   self.canSeeCost = function () {
      return self.sasoo.seecostfl;
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         // Drill down to line detail view
         $state.go('.line', {
            whse: self.oeeh.whse,
            orderno: self.oeeh.orderno,
            ordersuf: self.oeeh.ordersuf,
            lineno: record.actllineno,
            oelndspl: record
         });
      }
   };

   /**
    * Order hyperlink
    */
   self.orderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderaltno) {
         switch (currentRow.ordertype.toLowerCase()) {
            case TIETYPE_PO:
               $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case TIETYPE_WT:
               $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case TIETYPE_VA:
               $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case TIETYPE_KP:
               $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;
         }
      }
   };

   /**
    * Price hyperlink
    */
   self.priceHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeip.detail', { pk: self.oeeh.custno, pk2: self.oeeh.whse, pk3: currentRow.shipprod, pk4: self.oeeh.shipto });
      }
   };

   /**
    * Product hyperlink
    */
   self.prodHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: self.oeeh.whse });
      }
   };

   /**
    * Quantity hyperlink
    */
   self.qtyHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: self.oeeh.whse }, { reload: 'icia.detail' });
      }
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

/**
 * Line Detail child view Controller
 */
app.controller('OeLineDetailsLineCtrl', function ($state, $stateParams, DataService, MessageService, SecurityService, Utils) {
   var self = this;
   self.whse = $stateParams.whse || '';
   self.orderno = $stateParams.orderno || 0;
   self.ordersuf = $stateParams.ordersuf || 0;
   self.lineno = $stateParams.lineno || 0;
   self.oelndspl = $stateParams.oelndspl || {};

   self.menuSecurity = SecurityService.getSecurityLevel('oeio');

   self.subTitle = MessageService.get('global.order.number') + ': ' + self.orderno + '-' + Utils.pad(self.ordersuf, 2) +
      ' | ' + MessageService.get('global.line.number') + ': ' + self.lineno;

   self.extendedTabSelected = true;
   self.comTabSelected = false;

   var criteria = {
      orderno: self.orderno,
      ordersuf: self.ordersuf,
      actlineno: self.oelndspl.actlineno,
      whse: self.whse,
      lineitemtype: self.oelndspl.lineitemtype,
      shipprod: self.oelndspl.shipprod,
      returnfl: self.oelndspl.returnfl,
      specnstype: self.oelndspl.specnstype,
      kitfl: self.oelndspl.kitfl,
      ordertype: self.oelndspl.ordertype,
      tallyfl: self.oelndspl.tallyfl,
      extcomfl: self.oelndspl.extcomfl
   };

   DataService.post('api/oe/asoeinquiry/oeioloadlinetabs', { data: criteria, busy: true }, function (data) {
      if (data) {
         self.tabs = data;

         // If the Extended tab is not visible then only the Int/Ext Comments tab will be visible so select
         if (!self.tabs.extendedfl) {
            self.extendedTabSelected = false;
            self.comTabSelected = true;
         }
      }
   });

   var params = {
      orderno: self.orderno,
      ordersuf: self.ordersuf,
      lineno: self.lineno
   };

   DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
      if (data) {
         self.oeel = data;
         if (self.oeel.transtype && self.oeel.transtype.toLowerCase() === 'cr') {
            self.tabs.returnfl = true;
         }
      }
   });

   self.isKitOrKitSubComponent = function () {
      if ($state.current.name.endsWith('.kitComponentDetail') ||
          $state.current.name.endsWith('.kitGroupComponent') ||
          $state.current.name.endsWith('.kitOptionComponent') ||
          $state.current.name.endsWith('.kitKeywordComponent') ||
          $state.current.name.endsWith('.oneTimeCost') ||
          $state.current.name.endsWith('.oneTimeRebate') ||
          $state.current.name.endsWith('.bin-allocation')) {
         return true;
      } else {
         return false;
      }
   };

   self.isKitComponent = function () {
      if ($state.current.name.endsWith('.kitComponentDetail') ||
          $state.current.name.endsWith('.kitGroupComponent') ||
          $state.current.name.endsWith('.kitOptionComponent') ||
          $state.current.name.endsWith('.kitKeywordComponent')) {
         return true;
      } else {
         return false;
      }
   };
});

/**
 * Line Detail Extended Controller
 */
app.controller('OeLineDetailsExtendedCtrl', function ($state, $stateParams, AodataService, DataService, OptionSetService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   self.lineno = $stateParams.lineno || 0;
   self.currentOeline = {};

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   self.launchOneTimeCost = function () {
      if (self.currentOeline) {
         $state.go('.oneTimeCost', { oeline: self.currentOeline, isInquiry: true, okCallback: self.oneTimeOkCallback, cancelCallback: self.oneTimeCancelCallback });
      }
   };

   self.launchOneTimeRebate = function () {
      if (self.currentOeline) {
         $state.go('.oneTimeRebate', { oeline: self.currentOeline, isInquiry: true, okCallback: self.oneTimeOkCallback, cancelCallback: self.oneTimeCancelCallback });
      }
   };

   self.oneTimeCancelCallback = function () {
      $state.go('^');
   };

   self.oneTimeOkCallback = function () {
      $state.go('^');
   };

   if (orderno) {
      // Load Extended details
      var criteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: self.lineno
      };
      DataService.post('api/oe/asoeinquiry/oeioloadlineextended', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.results = data;
            self.domNetAmt = (data.netamt - data.custrebamt) * data.salesexrate;
            self.foreignCost = data.prodcost * data.salesexrate;
            self.boTypeFl = data.botype.toLowerCase() === 'y';

            // Load line type description
            OptionSetService.getDisplayLabel('OE', 'LineType', data.specnstype, function (label) {
               self.lineTypeDesc = label;
            });

            // Load frozen rebate type description
            OptionSetService.getDisplayLabel('OE', 'FrozenRebateType', data.frzrebty, function (label) {
               self.frzrebtyDesc = label;
            });

            // Load WL pick type description
            OptionSetService.getDisplayLabel('OE', 'WLPickType', data.wlpicktype, function (label) {
               self.wlpicktypeDesc = label;
            });
         }
      });

      // Load OE Line (for popups)
      criteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: self.lineno,
         readonlyfl: true
      };
      DataService.post('api/oe/asoeline/oelineretrieve', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.currentOeline = data.oeline;
         }
      });
   }
});

/**
 * Line Detail Nonstock Controller
 */
app.controller('OeLineDetailsNonstockCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {
      // Load Nonstock details
      var params = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno
      };

      DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.detailNonStock = data;
            self.description = data.proddesc + ' ' + data.proddesc2;
            self.arpWarehouse = data.arpvendno === 0 ? data.arpprodline : '';

            //TODO: WebUI has bindings to but no values set for these
            //self.isCreatePOChecked = false;
            //self.lineDescription = '';
            //self.categoryDescription = '';
            //self.priceTypeDescription = '';
            //self.vendorForeignCost = 0;
            //self.exchangeRate = 0;
            //self.commissionDescription = '';
            //self.currencyCode = '';
            //self.itemSelection = '';
            //self.isCopyOrderCommentsChecked = false;
            //self.vendorName = '';
            //self.availableStockQuantity = 0;
            //self.warehouseDescription = '';
            //self.availableNSQuantity = 0;
         }
      });
   }
});

/**
 * Line Detail Return Controller
 */
app.controller('OeLineDetailsReturnCtrl', function ($scope, $stateParams, DataService, MessageService, OptionSetService, Sasc, Utils) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;
   var line = $scope.line;

   if (orderno) {
      var taxGroups = [MessageService.get('global.not.taxable')];

      for (var i = 1; i < 6; i++) {
         var fieldName = 'taxgroupnm' + i;
         taxGroups.push(Sasc[fieldName]);
      }

      // Load Return details
      var params = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno
      };

      DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.oeLineReturns = data;

            self.restockCharge = data.restockamt.toString();
            self.restockChargeLabel = data.restockfl ? MessageService.get('global.amount') : MessageService.get('global.percent');
            self.vendorNumber = data.vendno;
            self.tieToPo = data.orderaltno !== 0;
            if (data.transtype.toLowerCase() === 'cr') {
               self.invoiceNo = data.crinvno + '-' + Utils.pad(data.crinvsuf, 2);
               self.invoiceLabel = MessageService.get('global.corrected.invoice.number');
               self.lineno = line.oelndspl.crlineno;
            }
            else {
               self.invoiceNo = data.retorderno + '-' + Utils.pad(data.retordersuf, 2);
               self.invoiceLabel = MessageService.get('global.invoice.number');
               self.lineno = data.retlineno;
            }
            self.taxGroupDesc = taxGroups[data.restktaxgrp];

            getLineDetailReturn(data.crreasonty, data.reasunavty);

            //User Hook (do not rename)
            if (self.oeelContinue) {
               self.oeelContinue(data);
            }
         }
      });
   }

   function getLineDetailReturn(codeReturnValue, codeUnavailableValue) {
      var getParams;

      // Load Return Reason Description
      if (codeReturnValue) {
         getParams = {
            codeiden: 'M',
            codeval: codeReturnValue,
            fldlist: 'descrip,returnty,warrexchgfl'
         };
         DataService.get('api/sa/sasta/getbypk', { params: getParams, busy: true }, function (data) {
            if (data) {
               self.returnReasonDescription = data.descrip;

               // Load Return Type description
               OptionSetService.getDisplayLabel('SA', 'ReturnType', data.returnty, function (label) {
                  self.returnType = label;
               });

               self.invoiceDescription = data.warrexchgfl ? MessageService.get('global.warranty.exchange') : '';
            }
         });
      }

      // Load Unavailable Reason Description
      if (codeUnavailableValue) {
         getParams = {
            codeiden: 'L',
            codeval: codeUnavailableValue,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: getParams, busy: true }, function (data) {
            if (data) {
               self.unAvailableReasonDescription = data.descrip;
            }
         });
      }
   }
});


/**
 * Line Detail Configurator Controller
 */
app.controller('OeLineDetailsConfiguratorCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {

      // Load Configurator details
      var params = {
         ordertype: 'o',
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno,
         seqno: 0,
         fldlist: 'cfgintdata'
      };

      DataService.get('api/shared/cfgdata/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.cfgintdatafield = data.cfgintdata.replace(/[\r]/g, '<br/>');
         }
      });
   }
});

/**
 * Line Detail Core Returns Controller
 */
app.controller('OeLineDetailsCoreReturnsCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {

      // Load Core Returns Grid
      var criteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno
      };

      DataService.post('api/oe/asoeinquiry/corescreatereturnstt', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.corescrtretsttresults;
         }
      });
   }
});

/**
 * Line Detail Core Allocations Controller
 */
app.controller('OeLineDetailsCoreAllocationsCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;
   var CALLMODE_INQUIRY = 'i';
   var CORE_RETURN_TYPE_SUBSTITUTE = 's';
   var TRANSTYPE_ORDER = 'o';

   if (orderno) {

      var params = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno
      };

      DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
         if (data) {

            self.orderProof = 0;
            self.product = data.shipprod;

            if (data.corertnty.toLowerCase() === CORE_RETURN_TYPE_SUBSTITUTE) {
               self.product = data.origcore;
            }

            // Load Core Allocations Grid
            var criteria = {
               orderno: data.orderno,
               ordersuf: data.ordersuf,
               lineno: data.lineno,
               prod: self.product,
               custno: data.custno,
               transty: TRANSTYPE_ORDER,
               warrfl: false,
               callmode: CALLMODE_INQUIRY
            };

            DataService.post('api/oe/asoeinquiry/corescreateoeallocationtt', { data: criteria, busy: true }, function (alloc) {
               if (alloc) {
                  // Only display records with quantity allocated
                  self.dataset = alloc.filter(function (item) {
                     return item.qtyalloc;
                  });
               }
            });
         }
      });
   }
});

/**
 * Line Detail Extended Line Comments Controller
 */
app.controller('OeLineDetailsExtendedLineCommentsCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {

      var params = {
         batchnm: '',
         seqno: orderno,
         lineno: lineno,
         fldlist: 'extlncom'
      };

      DataService.get('api/edi/edil/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            // Replace pv-delimiter with space
            self.comments = data.extlncom.replace(/[\u0003]/g, ' ');
         }
      });
   }
});

/**
 * Line Detail Original Line History Controller
 */
app.controller('OeLineDetailsOrigLineHistoryCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {

      // Load Original Line History Grid
      var criteria = {
         orderno: orderno,
         lineno: lineno
      };

      DataService.post('api/oe/asoeinquiry/oeoriglinehistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   }
});

/**
 * Line Detail Actual Line History Controller
 */
app.controller('OeLineDetailsActLineHistoryCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {

      // Load Actual Line History Grid
      var criteria = {
         orderno: orderno,
         lineno: lineno
      };

      DataService.post('api/oe/asoeinquiry/oelinehistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   }
});

/**
 * Line Detail Sub Total Lines Controller
 */
app.controller('OeLineDetailsSubTotalLinesCtrl', function ($stateParams, DataService) {
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;

   if (orderno) {

      // Load Actual Line History Grid
      var criteria = {
         orderno: orderno,
         ordersuf: ordersuf
      };

      DataService.post('api/oe/asoeinquiry/loadoeelctemptable', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   }
});

/**
 * Line Detail Kit Lines Controller
 */
app.controller('OeLineDetailKitCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => oeLdKit
   var self = this;
   var line = $scope.line;

   self.kitSingle = {};

   // initialize kit
   self.kitCriteria = {
      orderno: line.orderno,
      ordersuf: line.ordersuf,
      ordtype: 'o',
      whse: line.whse,
      kitprod: line.oelndspl.shipprod,
      lineno: line.oelndspl.actllineno,
      stkqtyord: line.oelndspl.qtyord,
      addfl: true,
      inquiryfl: false,
      optionsfl: true,
      keywordsfl: true,
      seriallotfl: true,
      deletefl: true,
      //verno: line.oelndspl.verno,
      specNsType: line.oelndspl.specnstype,
      returnfl: line.oelndspl.returnfl
   };
   DataService.post('api/oe/asoeinquiry/loadtcomps', { data: self.kitCriteria, busy: true }, function (data) {
      if (data) {
         self.kitCriteria = data.kitscriteria;
         self.kitSingle = data.loadtcompssingle;
         self.kitResultsCollection = data.loadtcompsresults;
         self.kitSubResultsCollection = data.loadtcompssubresults;
      }
   });

   self.productSubTitle = function () {
      var subTitle = self.kitSingle.prod + ' - ' + self.kitSingle.proddesc;
      if (self.kitSingle.reqnsmsgvisible) {
         subTitle += ' | ' + self.kitSingle.reqnsmsg;
      }
      return subTitle;
   };

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // ICIP HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: line.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // ICIP HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: line.whse }, { reload: 'icia.detail' });
      }
   };

   self.orderAltNoHyperlinkClicked = function (e, args) {
      var currentRow = args[0].item;

      switch (currentRow.orderalttype.toLowerCase()) {
         //need orderaltno & suffix is always 0 for each nav
         case "t":
            $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "p":
            $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "f":
            $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "w":
            $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "o":
            $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
      }
   };

   self.drilldownClicked = function (e, args) {
      // do not allow editing if modification is disabled
      if (!self.kitSingle.mmodifyaproductenabled) {
         MessageService.error('global.error', 'message.modification.of.this.component.is.not.allowed');
      } else {
         var selectedComponent = args[0].item;
         if (selectedComponent.fromoeelk) { // actual component - go to kit details screen
            $state.go('.kitComponentDetail', { component: selectedComponent, componentType: 'details' });
         } else { // sub-component - go to sub screen
            if (selectedComponent.comptype.toLowerCase() === 'k') { //keyword
               $state.go('.kitKeywordComponent', { component: selectedComponent, groupName: selectedComponent.groupname, kitCriteria: self.kitCriteria });
            } else { //sub-component
               var matchedSubComponents = [];
               self.kitSubResultsCollection.forEach(function (subComponent) {
                  if (selectedComponent.comptype === subComponent.comptype && selectedComponent.groupname === subComponent.groupname) {
                     matchedSubComponents.push(subComponent);
                  }
               });

               if (matchedSubComponents.length > 0) {
                  if (selectedComponent.comptype.toLowerCase() === 'g') { //group component
                     $state.go('.kitGroupComponent', { selectedComponent: selectedComponent, matchedSubComponents: matchedSubComponents });
                  } else if (selectedComponent.comptype.toLowerCase() === 'o') { //option component
                     $state.go('.kitOptionComponent', { selectedComponent: selectedComponent, matchedSubComponents: matchedSubComponents });
                  }
               } else {
                  //go to kit details screen
                  $state.go('.kitComponentDetail', { component: selectedComponent, componentType: 'details' });
               }
            }
         }
      }
   };
});

/**
 * Line Detail Kit Component Detail Controller
 */
app.controller('OeLineKitCompDetailsCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   //alias => ldKitCd
   var self = this;
   var line = $scope.line;

   self.component = $stateParams.component;
   self.matchedSubComponents = $stateParams.matchedSubComponents;
   self.componentType = $stateParams.componentType; //details or group
   self.componentDetails = {};
   self.stickyNonStockData = {};
   self.ordertype = 'o';
   self.orderno = line.orderno;
   self.ordersuf = line.ordersuf;

   self.setupComponentDetails = function () {
      self.componentDetailsCriteria = {
         orderno: line.orderno,
         ordersuf: line.ordersuf,
         ordtype: 'o',
         whse: line.whse,
         kitprod: line.oelndspl.shipprod,
         lineno: line.oelndspl.actllineno,
         stkqtyord: line.oelndspl.qtyord,
         ourproc: 'oeetl',
         specNsType: line.oelndspl.specnstype,
         returnfl: line.oelndspl.returnfl,
         fabwhse: line.oelndspl.fabwhse,
         inquiryfl: false,
         nsokfl: true,
         addfl: false,
         modfl: false,
         seqno: self.component.seqno
      };

      DataService.post('api/oe/asoeinquiry/kitcreatedetailstt', { data: self.componentDetailsCriteria, busy: true }, function (data) {
         if (data) {
            self.componentDetails = data.kitcreatedetailsttresults;
            if (!self.componentDetails.unit) {
               self.componentDetails.unit = 'each';
            }
         }
      });
   };

   // initialize component details
   self.setupComponentDetails();

   self.getTitle = function () {
      switch (self.componentType.toLowerCase()) {
         case 'details':
            return $translate.instant('global.component.details');
         case 'group':
            return $translate.instant('global.group.component.details');
         case 'option':
            return $translate.instant('global.option.component.details');
         default:
            return $translate.instant('global.component.details');
      }
   };
   self.getSubTitle = function () {
      return line.oelndspl.shipprod + ' - ' + line.oelndspl.proddesc;
   };

   self.isBinAllocation = function () {
      return $state.current.name.endsWith('.bin-allocation');
   };

   self.prodCostLabel = function () {
      if (self.componentDetails.pdprodcosthidden) {
         return '';
      } else {
         return self.componentDetails.pdprodcost;
      }
   };

   self.prodCost = function () {
      var prodCost = '';
      if (!self.componentDetails.prodcosthidden && self.componentDetails.prodcost) {
         prodCost += self.componentDetails.prodcost;
      }
      if (!self.componentDetails.speccosttyhidden && self.componentDetails.speccostty) {
         prodCost += '(' + self.component.speccostty + ')';
      }
      return prodCost;
   };

   self.priceLabel = function () {
      if (self.componentDetails.pdpricehidden) {
         return '';
      } else {
         return self.componentDetails.pdprice;
      }
   };

   self.price = function () {
      var price = '';
      if (!self.componentDetails.pricehidden && self.componentDetails.price) {
         price += self.componentDetails.price;
      }
      if (!self.componentDetails.specpricetyhidden && self.componentDetails.specpricety) {
         price += '(' + self.component.specpricety + ')';
      }
      return price;
   };

   self.warehouseManagerClicked = function () {
      var wmBinAssignCriteria = {
         currproc: 'oeio',
         jrnlno: 0,
         kitfl: line.oelndspl.kitfl,
         lineno: self.componentDetails.lineno,
         ourproc: 'oeetl',
         ordertype: self.componentDetails.ordtype,
         orderno: self.componentDetails.orderno,
         ordersuf: self.componentDetails.ordersuf,
         returnfl: self.componentDetails.returnfl,
         potype: '',
         prod: self.componentDetails.shipprod,
         seqno: self.componentDetails.seqnoOeelk,
         skipnonkitlogic: false,
         stkqtyship: line.oelndspl.qtyship,
         stkqtyrcv: 0,
         unit: self.componentDetails.unit,
         vamodule: '',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: self.componentDetails.whse
      };

      $state.go('.bin-allocation', {
         criteria: wmBinAssignCriteria,
         binAllocationDisabled: true
      });
   };

   self.back = function () {
      switch (self.componentType.toLowerCase()) {
         case 'details':
            $state.go('^');
            break;
         case 'group':
            $state.go('^.kitGroupComponent', { selectedComponent: self.component, matchedSubComponents: self.matchedSubComponents });
            break;
      }
   };
});

/**
 * Line Detail Kit Group Component Controller
 */
app.controller('OeLineKitGroupCompCtrl', function ($scope, $state, $stateParams, $translate) {
   //alias => ldKitGc
   var self = this;

   self.component = $stateParams.selectedComponent;
   self.subComponentsCollection = $stateParams.matchedSubComponents;

   self.getSubTitle = function () {
      return $translate.instant('global.product') + ': ' + self.component.prod + ' - ' + self.component.proddesc + ' | ' +
             $translate.instant('global.group') + ': ' + self.component.prodname;
   };

   self.drilldownClicked = function (e, args) {
      var selectedComponent = args[0].item;
      $state.go('^.kitComponentDetail', { component: selectedComponent, matchedSubComponents: self.subComponentsCollection, componentType: 'group' });
   };
});

/**
 * Line Detail Kit Option Component Controller
 */
app.controller('OeLineKitOptionCompCtrl', function ($scope, $state, $stateParams, $translate) {
   //alias => ldKitOc
   var self = this;

   self.component = $stateParams.selectedComponent;
   self.subComponentsCollection = $stateParams.matchedSubComponents;

   self.getSubTitle = function () {
      return $translate.instant('global.kit') + ': ' + self.component.prod + ' - ' + self.component.proddesc + ' | ' +
             $translate.instant('global.option') + ': ' + self.component.prodname;
   };
});

/**
 * Line Detail Kit Keyword Component Controller
 */
app.controller('OeLineKitKeywordCompCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   //alias => ldKitKc
   var self = this;

   self.component = $stateParams.component;
   self.groupName = $stateParams.groupName;

   var createKeywordsRequest = {
      kitscriteria: $stateParams.kitCriteria,
      cKeyWords: self.groupName
   };
   DataService.post('api/oe/asoeinquiry/kitcreatekeywordstt', { data: createKeywordsRequest, busy: true }, function (data) {
      if (data) {
         self.keywordsCollection = data.kitcreatekwdsttresults;
      }
   });

   self.getSubTitle = function () {
      return $translate.instant('global.kit') + ': ' + self.component.shipprod + ' | ' +
             $translate.instant('global.keyword') + ': ' + self.groupName;
   };
});

/**
 * Line Detail Correction Date Controller
 */
app.controller('OeLineDetailsCorrectionDateCtrl', function ($scope, Utils, DataService) {
   var self = this;
   var line = $scope.line;

   if (line.oeel) {
      var params = {
         orderno: line.oeel.crinvno,
         ordersuf: line.oeel.crinvsuf,
         fillmode: true
      };
      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (oeeh) {
         if (oeeh) {
            self.oeeh = oeeh;
            self.fullOrderNumber = self.oeeh.orderno + '-' + Utils.pad(self.oeeh.ordersuf, 2);
         }
      });
   }
});

/**
 * Line Detail Return and Correction History Controller
 */
app.controller('OELineDetailsCorrectionHistoryCtrl', function ($stateParams, DataService, Sasoo) {
   //alias => corhist
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;
   self.sasoo = Sasoo;

   if (orderno) {

      // Load Return and Correction History Grid
      var criteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno
      };

      DataService.post('api/oe/asoeinquiry/oeioextline', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   }
});

app.controller('OELineDetailsRebateCtrl', function ($stateParams, DataService) {
   //alias => reb
   var self = this;
   var orderno = $stateParams.orderno || 0;
   var ordersuf = $stateParams.ordersuf || 0;
   var lineno = $stateParams.lineno || 0;

   if (orderno) {

      // Load Rebate details
      var criteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         lineno: lineno
      };

      DataService.post('api/oe/asoelineextra/oelinerebate', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.rebate = data;
         }
      });
   }
});