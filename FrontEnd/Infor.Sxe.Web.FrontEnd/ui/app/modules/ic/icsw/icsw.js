'use strict';

app.config(function (StateProvider, ProductWarehouseUsageStateProvider, LeadTimeHistoryStateProvider, TrendInformationStateProvider, AdjustersInformationStateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsw',
      dataPath: 'api/ic/icsw',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsw/lookup',
      searchRecordLimitField: 'recordlimit',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'rowidIcsw',
      createStateView: 'ic/icsw/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsw/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/',
      copyMultiple: true,
      primaryKeyParams: ['prod', 'whse'],
      detailStateParams: { activeTab: null },
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whse' },
         { label: 'global.product', value: 'prod' }
      ],
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whse' },
         description: [{ label: 'global.product', value: 'prod' }]
      }
   });

   ProductWarehouseUsageStateProvider.addStates('ic', 'icsw', 'icsw.detail');
   LeadTimeHistoryStateProvider.addStates('ic', 'icsw', 'icsw.detail');
   TrendInformationStateProvider.addStates('ic', 'icsw', 'icsw.detail');
   AdjustersInformationStateProvider.addStates('ic', 'icsw', 'icsw.detail');

   // Create Catalog In Inventory
   StateProvider.addState('icsw.create.createCatalogInInventory', {
      url: '/create-catalog-in-inventory',
      params: {
         productType: null,
         statusType: null,
         hsCode: null,
         countryCode: null,
         callbackFunction: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsw/create-catalog-in-inventory.json');
            },
            controller: 'IcswCreateCatalogInInventoryCtrl as cci'
         }
      }
   });

});

app.service('IcswService', function ($state, $translate, MessageService, MruService, ModalService, ConfigService, AodataService, DataService, UserService, Utils, Sasoo, Sasc, PvUser, SecurityService, GridService, Constants, TabService) {

   this.extendBaseController = function (self) {
      self.RECALC = 'recalc';
      self.INIT = 'init';
      self.VENDORPRODUCTLINE = Constants.VENDOR_AND_PRODUCT_LINE;
      self.VENDOR = Constants.VENDOR;
      self.sasc = Sasc;
      self.sasoo = Sasoo;
      self.AOAvgFl = self.sasc.icglcost.toUpperCase() === 'A';
      self.AOLastFl = self.sasc.icglcost.toUpperCase() === 'L';
      self.AOReplFl = self.sasc.icglcost.toUpperCase() === 'R';
      self.AOFifoFl = self.sasc.icglcost.toUpperCase() === 'F';
      self.AOStndFl = self.sasc.icglcost.toUpperCase() === 'S';
      self.chgGLCost = self.sasoo.chgglcostfl;
      self.ICIncAddGL = self.sasc.icincaddgl;
      self.glby = '';
      self.cpby = '';
      switch (self.sasc.icglcost.toUpperCase()) {
         case 'A':
            self.glby = MessageService.get('global.average');
            break;
         case 'S':
            self.glby = MessageService.get('global.standard');
            break;
         case 'R':
            self.glby = MessageService.get('global.replacement');
            break;
         case 'L':
            self.glby = MessageService.get('global.last');
            break;
         case 'F':
            self.glby = MessageService.get('global.fifo');
            break;
         default:
            self.glby = MessageService.get('global.average');
            break;
      }

      if (self.ICIncAddGL) {
         self.glby = self.glby + MessageService.get('global.plus.addon');
      }

      switch (self.sasc.iccosttype.toUpperCase()) {
         case 'A':
            self.cpby = MessageService.get('global.average');
            break;
         case 'S':
            self.cpby = MessageService.get('global.standard');
            break;
         case 'R':
            self.cpby = MessageService.get('global.replacement');
            break;
         case 'L':
            self.cpby = MessageService.get('global.last');
            break;
         default:
            self.cpby = MessageService.get('global.average');
            break;
      }

      if (self.icincaddcp) {
         self.cpby = self.cpby + MessageService.get('global.plus.addon');
      }

      // Capture the string of data and convert it to true or false.  If nothing is found (undefined) converts to false
      var aodataAllowExpandedVendProd = AodataService.getValue('IC', 'allowexpandedvendprod');
      if (aodataAllowExpandedVendProd) {
         if (aodataAllowExpandedVendProd.toLowerCase() === 'yes' || aodataAllowExpandedVendProd.toLowerCase() === 'y') {
            self.allowExpandedVendProd = true;
         } else {
            self.allowExpandedVendProd = false;
         }
      } else {
         self.allowExpandedVendProd = false;
      }

      self.icRequireVendProdLine = AodataService.getValue('IC', 'icrequirevendnopline');

      self.validateFields = function (icsw) {

         if (icsw.vendprod && icsw.vendprod.length > 24 && !self.allowExpandedVendProd) {
            MessageService.error('global.error', 'error.maximum.length.for.vendor.product.is.24');
            return false;

         } else {
            return true;
         }
      };

      TabService.canUserCloseTab('icsw', function () {
         // When user creates a new icsw record, force them to save the product line, if it is required, before allowing them to close tab.
         // Prevent closing the tab if in edit mode and product line is required and [is blank or has changes]
         if (self.isEdit() && !self.isProdlineValid) { 
            MessageService.error('global.error', 'error.please.save.changes.first');
            return false; // prevent closing until a valid product line is saved
         }
         return true;
      });

      
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         prod: '',
         whse: '',
         arpvendno: 0,
         allicspstatusfl: true,
         kittype: '',
         icswstatus: '',
         keywords: '',
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'whse', label: MessageService.get('global.warehouse') },
         { value: 'arpvendno', label: MessageService.get('global.vendor.number') },
         { value: 'prod', label: MessageService.get('global.product') },
         { value: 'prodline', label: MessageService.get('global.product.line') },
         { value: 'lookupnm', label: MessageService.get('global.lookup.name') },
         { value: 'allicspstatusfl', label: MessageService.get('global.include.inactive') },
         { value: 'kittype', label: MessageService.get('global.kit.type') },
         { value: 'icswstatus', label: MessageService.get('global.status') },
         { value: 'quantitytype', label: MessageService.get('global.quantity') },
         { value: 'keywords', label: MessageService.get('global.keyword') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields

      self.defaultSelectedCriteria = ['whse', 'prod'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/icsw/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data;
            }
         });
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      self.icslsecure = SecurityService.getSecurityLevel('icsl');
      self.flags = {
         costfl: true,
         binfl: false,
         useICSLfl: false,
         listMessagefl: false,
         arpwhse: ''
      };

      var whseCriteria = {
         whse: ''
      };
      DataService.post('api/ic/icsd/lookup', { data: whseCriteria, busy: true }, function (data) {
         self.whseList = data.warehouselookupresults;
      });

      // Perform custom submit which copies the warehouse products
      self.cpySubmit = function () {
         var whses = GridService.getSelectedRecords(self.whseGrid);
         var prods = stateParams.records;
         prods.forEach(function (product) {
            product.fromwhse = product.whse;
            product.fromprod = product.prod;
         });

         // Proceed if any rows are selected
         if (whses && whses.length) {
            var copyData = [{
               copycost: self.flags.costfl,
               copybin: self.flags.binfl,
               useicsl: self.flags.useICSLfl,
               arpwhse: self.flags.arpwhse,
               icslsecurity: self.icslsecure
            }];
            var initData = {
               icwhseproductcopyflags: copyData,
               icwhseproductcopyprods: prods,
               icwhseproductcopywhses: whses
            };
            DataService.post('api/ic/asicsetup/icwhseproductcopy', { data: initData, busy: true }, function (data) {
               if (data && self.flags.listMessagefl) {
                  self.icwhseproductcopyresults = data;
                  if (data.length > 0) {
                     ModalService.showModal('ic/icsw/copy-errors.json', null, scope, function (modal) {
                        self.errorsModal = modal;
                     });
                  } else {
                     self.refreshMaster();
                  }
               } else {
                  self.refreshMaster();
               }
            });
         } else {
            MessageService.info('global.information', 'message.no.warehouses.selected');
         }
      };

      self.closeErrorsModal = function () {
         self.errorsModal.destroy();
         self.refreshMaster();
      };

      self.refreshMaster = function () {
         MessageService.info('global.information', 'message.copy.operation.completed.successfully');
         // Go back to master list and refresh the search
         base.refreshSearch = true;
         $state.go('^.master', null, { reload: '^.master' });
      };
   };

   this.extendDetailController = function (self, base, icsw, scope, $stateParams) {
      var params = {};
      self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toUpperCase();
      self.activeTab = $stateParams.activeTab;
      self.sasoo = Sasoo;
      self.showOAN = false;
      self.showRank = true;
      self.showAdjusters = true;
      self.foundTrends = false;
      self.icslBuyer = null;
      self.foundAdjuster = false;
      self.statustype = null;
      self.upccode = '';
      self.findIcsl = {
         vendno: 0,
         buyer: '',
         whse: ''
      };
      self.PvUser = PvUser;
      self.criticalpt = 0;
      self.statusTypes = [];
      self.isProdlineValid = true;

      self.securityLevelICSW = SecurityService.getSecurityLevel('icsw');
      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'General') < 3;
      self.isOrderingTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'Ordering') < 3;
      self.isCostsTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'Cost & Pricing') < 3;
      self.isWLTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'Wl Setup') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'Custom') < 3;
      self.isStoreroomTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'Storeroom') < 3;
      self.isTaxingTabReadonly = SecurityService.getSubSecurityLevel('icsw', 'Taxing') < 3;

      
      self.isUpdateSecure = self.securityLevelICSW >= 3 ? true : false;

      self.buildStatusTypes = function () {
         self.statusTypes = [];
         self.statusTypes.push({ label: $translate.instant('global.direct.ship'), value: 'd' });
         self.statusTypes.push({ label: $translate.instant('global.order.as.needed'), value: 'o' });
         if (base.sasoo.icswstchgfl) {
            self.statusTypes.push({ label: $translate.instant('global.order.as.needed.non.stock'), value: 'n' });
         }
         self.statusTypes.push({ label: $translate.instant('global.stock'), value: 's' });
         self.statusTypes.push({ label: $translate.instant('global.do.not.reorder'), value: 'x' });
      };

      self.buildStatusTypes();

      self.leadTimeFinished = function (leadtimeavg, leadtimedt, leadtimeupdated) {
         if (leadtimeupdated) {
            self.icsw.leadtmavg = leadtimeavg;
            self.icsw.avgltdt = leadtimedt;
         }
      };

      self.goToUsage = function () {
         if (base.isEdit()) {
            $state.go('icsw.detail.productWarehouseUsage', { enabled: true, prod: icsw.prod, whse: icsw.whse, unit: '', recalcEnabled: true, returnState: $state.current.name });
         } else {
            $state.go('icsw.detail.productWarehouseUsage', { enabled: false, prod: icsw.prod, whse: icsw.whse, unit: '', recalcEnabled: false, returnState: $state.current.name });
         }
      };

      self.goToLeadTime = function () {
         if (base.isEdit()) {
            $state.go('icsw.detail.leadTimeHistory', { enabled: self.isUpdateSecure, prod: icsw.prod, whse: icsw.whse, frozenty: icsw.frozenltty, leadtimeavg: icsw.leadtmavg, leadtimedt: icsw.avgltdt, callback: self.leadTimeFinished, returnState: $state.current.name });
         }
      };

      self.goToTrendInfo = function () {
         $state.go('icsw.detail.trendInformation', { prod: icsw.prod, whse: icsw.whse, returnState: $state.current.name });
      };

      self.goToAdjusters = function () {
         $state.go('icsw.detail.adjustersInformation', { prod: icsw.prod, whse: icsw.whse });
      };

      self.icswOrderUnit = function () {
         var criteria = {
            product: self.icsw.prod,
            unitbuy: self.icsw.unitbuy,
            unitstnd: self.icsw.unitstnd,
            unitwt: self.icsw.unitwt
         };
         DataService.post('api/ic/asicsetup/icswordunit', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.dataUnits = data;
            }
         });
      };

      self.getUPCNumber = function () {
         var data = {
            cWhse: icsw.whse,
            cProduct: icsw.prod,
            dVendorNumber: icsw.arpvendno
         };
         DataService.post('api/ic/asicinquiry/icwhseproductgetupc', { data: data }, function (upc) {
            self.upccode = upc;
         });
      };

      icsw.$promise.then(function () {
         if (icsw.statustype && icsw.statustype.toLowerCase() === 'o' && icsw.nonstockty && icsw.nonstockty.toLowerCase() === 'n') {
            self.statustype = 'n';
         } else {
            self.statustype = icsw.statustype;
         }

         if (icsw.whse) {
            DataService.get('api/wl/aswlinquiry/getwlaowhsesettings/' + icsw.whse + '/' + '0', { busy: true }, function (data) {
               if (data[0]) {
                  var setting = data[0];
                  self.wlWhse = setting.wlwhsefl ? setting.wlwhsefl : false;
                  self.wlEsbfl = setting.wlesbfl ? setting.wlesbfl : false;
                  self.modwlfl = setting.modwlfl ? setting.modwlfl : false;
                  self.wlrcvonlyfl = setting.wlrcvonlyfl ? setting.wlrcvonlyfl : false;
               }
            });
            params = { whse: icsw.whse };
            DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (data) {
               self.SRWhseFl = data.managedfl;
               self.wlloc = data.wlloc;
            });
         }

         if (icsw.prod) {
            params = {
               prod: icsw.prod,
               fldlist: 'rowpointer,prod,unitstock,descrip'
            };
            DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
               if (icsp) {
                  var productDesc = '';
                  if (icsp.descrip1) {
                     productDesc = icsp.descrip1;
                  }
                  if (icsp.descrip2) {
                     productDesc = productDesc + ' ' + icsp.descrip2;
                  }
                  MruService.addToList('Prod', icsp.rowpointer, icsp.prod + ' - ' + productDesc, icsp.prod);
               }
               if (icsp && icsp.unitstock) {
                  self.costsper = icsp.unitstock;
                  self.qtyper = icsp.unitstock;
               }
            });
         }
         var icswCriteria = {
            whse: icsw.whse,
            prod: icsw.prod
         };
         DataService.post('api/ic/icsw/lookup', { data: icswCriteria, busy: true }, function (data) {
            if (data) {
               self.netavail = data[0].netavail;
            }
         });
         DataService.get('api/ic/icsr/geticsrzerovendorblankwhseline', { busy: false }, function (data) {
            if (data) {
               self.icUsage = data.icusage;
               self.rankTy = data.rankty;

               if ((icsw.arptype.includes('c') || icsw.arptype.includes('w')) &&
                  icsw.statustype.toUpperCase() === 'O' && self.icUsage.toUpperCase() === 'A') {
                  self.showOAN = true;
               } else {
                  self.showOAN = false;
               }
               if (self.rankTy.toUpperCase() !== 'Y') {
                  self.showRank = false;
               }

            } else {
               self.showAdjusters = false;
               self.showRank = false;
            }
         });

         if (icsw.prodline) {
            params = {
               whse: icsw.whse,
               vendno: icsw.arpvndno,
               prodline: icsw.prodline
            };
            DataService.get('api/ic/icsl/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.icslBuyer = data.buyer;
                  self.findIcamue();
               }
            });
            self.originalProdline = icsw.prodline;
         }
         self.validateProductLine();

         self.icswOrderUnit();
         self.getUPCNumber();

         var safetyInit = {
            calctype: base.INIT,
            origsafeallamt: self.icsw.safeallamt,
            origsafeallpct: self.icsw.safeallpct,
            origsafealldays: self.icsw.safealldays,
            latestleadtmavg: self.icsw.leadtmavg,
            latestusagerate: self.icsw.usagerate,
            safeallowty: self.icsw.safeallty,
            safeallamt: 0,
            safeallamt2: 0
         };
         DataService.post('api/ic/asicadmin/icswdisplaysafetyallowance', { data: safetyInit, busy: true }, function (data) {
            if (data) {
               self.safeallamt1 = data.safeallamt;
               self.safeallamt2 = Math.round(data.safeallamt2);
            }
         });
         self.setStatusEnablement();
         self.criticalpt = self.icsw.usagerate * self.icsw.leadtmavg / 28;

         if (icsw.prod) {
            var criteriaCost = { cProduct: icsw.prod };
            DataService.post('api/ic/asicsetup/geticlotspecpricelabel', { data: criteriaCost, busy: true }, function (data) {
               if (data) {
                  self.costsper = data;
               }
            });
         }
      });

      self.findIcamue = function () {
         if (self.icslBuyer) {
            self.foundAdjuster = false;
            self.foundTrends = false;
            params = {
               activefl: true,
               whse: icsw.whse,
               buyer: self.icslBuyer,
               prod: icsw.prod,
               exctype: "InvValChg"
            };
            DataService.get('api/ic/icamue/existsbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.foundAdjuster = data;
               }
            });
            params = {
               activefl: true,
               whse: icsw.whse,
               buyer: self.icslBuyer,
               prod: icsw.prod,
               exctype: "TrendInfo"
            };
            DataService.get('api/ic/icamue/existsbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.foundTrends = data;
               }
            });
         }
      };

      self.safetyChanged = function () {
         var safetyRecalc = {
            calctype: base.RECALC,
            origsafeallamt: self.icsw.safeallamt,
            origsafeallpct: self.icsw.safeallpct,
            origsafealldays: self.icsw.safealldays,
            latestleadtmavg: self.icsw.leadtmavg,
            latestusagerate: self.icsw.usagerate,
            safeallowty: self.icsw.safeallty,
            safeallamt: self.safeallamt1,
            safeallamt2: self.safeallamt2
         };
         DataService.post('api/ic/asicadmin/icswdisplaysafetyallowance', { data: safetyRecalc, busy: true }, function (data) {
            if (data) {
               self.safeallamt1 = data.safeallamt;
               self.safeallamt2 = Math.round(data.safeallamt2);
            }
         });
      };

      self.statusTypeChanged = function () {
         var alert = false;
         if (self.statustype && self.statustype.toLowerCase() === 'n') {
            self.icsw.statustype = 'o';
            self.icsw.nonstockty = 'n';
         } else {
            self.icsw.statustype = self.statustype;
            self.icsw.nonstockty = '';
         }
         if (self.icsw.statustype.toLowerCase() === 'o' && (self.icsw.qtyreservd > 0 || self.icsw.qtycommit > 0 ||
            self.icsw.qtyintrans > 0 || self.icsw.qtyonorder > 0 || self.icsw.qtyreqshp > 0 || self.icsw.qtybo > 0)) {
            alert = true;
         }
         if ((self.icsw.statustype.toLowerCase() === 'o' || self.icsw.statustype.toLowerCase() === 'x') &&
            (self.icsw.linept > 0 || self.icsw.orderpt > 0 || self.icsw.ordqtyin > 0)) {
            var message = '';
            if (alert) {
               message += MessageService.get('message.warning.open.pos.wts.or.sales.orders.exist') + '<br/>';
            }
            message += MessageService.get('question.clear.ordering.controls');
            MessageService.yesNo('global.warning', message, function () {
               self.icsw.linept = 0;
               self.icsw.orderpt = 0;
               self.icsw.ordqtyin = 0;
               self.icsw.ordcalcty = "c";
            });
         } else if (alert) {
            MessageService.alert('global.warning', 'message.warning.open.pos.wts.or.sales.orders.exist');
         }
      };

      self.taxGroupChanged = function () {
         if (self.taxMethodType === 'G') {
            if (self.icsw.taxgroup) {
               self.icsw.taxablety = 'y';
            } else {
               self.icsw.taxablety = 'n';
            }
         }
      };

      self.setStatusEnablement = function () {

         if (self.sasoo.superfl) {
            self.allowStatusChange = true;
         } else if (icsw.qtyreservd ||
            icsw.qtyintrans ||
            icsw.qtyonorder ||
            icsw.qtyrcvd ||
            icsw.qtyreqshp ||
            icsw.qtyreqrcv ||
            icsw.qtydemand ||
            icsw.qtybo ||
            icsw.custqtyonorder ||
            icsw.custqtyrcvd) {
            self.allowStatusChange = false;

         } else {
            self.allowStatusChange = true;
         }

         if (!self.sasoo.icswstchgfl && icsw.statustype.toUpperCase() === 'O' && icsw.nonstockty.toUpperCase() === 'N') {
            self.statusTypeEnablement = false;
            if (icsw.nonstockty.toUpperCase() === 'N') {
               self.statusTypes.push({ label: $translate.instant('global.order.as.needed.non.stock'), value: 'n' });
            }
         } else {
            self.statusTypeEnablement = self.allowStatusChange;
         }
      };

      self.customSubmit = function (recalculateCallback) {
         if (self.icsw.safeallty === 'Q') {
            self.icsw.safeallamt = self.safeallamt1;
            self.icsw.safeallpct = self.safeallamt2;
         } else if (self.icsw.safeallty === '%') {
            self.icsw.safeallpct = self.safeallamt1;
            self.icsw.safeallamt = self.safeallamt2;
         } else {
            self.icsw.safealldays = self.safeallamt1;
            self.icsw.safeallamt = self.safeallamt2;
         }
         checkVendReb(function (isContinue) {
            if (isContinue) {
               checkVendSubReb(function (stillContinue) {
                  if (stillContinue) {
                     if (base.validateFields(icsw)) {
                        // The WLICSW will only exist if it's tab has been activated
                        if (self.wlicsw) {
                           // Handle create (POST) and update (PUT)
                           var method = self.isWlicswRecordNew ? 'POST' : 'PUT';

                           // When saving WLICSW, only save the ICSW after WLICSW save succeeds
                           DataService.send('api/wl/wlicsw', { method: method, data: self.wlicsw, busy: true }, function (wlicsw) {

                              // Catch created oedc record (which is no longer new) since save of icsd may fail
                              self.wlicsw = wlicsw;
                              self.isWlicswRecordNew = false;

                              // if we are coming from the recalcute we can't perform the standard submit
                              if (recalculateCallback) {
                                 recalculateCallback();
                              } else {
                                 self.submit();
                              }
                           });
                           // else if not wlicsw
                        } else {
                           if (recalculateCallback) {
                              recalculateCallback();
                           } else {
                              self.submit();
                           }
                        }
                     }
                  }
               });
            }
         });
      };

      function checkVendReb(callback) {
         if (icsw.arpvendno && icsw.rebatety) {
            var params = {
               codeiden: 'pt',
               codeval: icsw.rebatety,
               fldlist: 'vendno'
            };

            DataService.get('api/pd/pdst/getbypk', { params: params, busy: true }, function (pdst) {
               self.pdstvendno = pdst ? pdst.vendno : '';

               if (self.pdstvendno && self.pdstvendno !== 0 && icsw.arpvendno !== self.pdstvendno) {
                  MessageService.okCancel('global.warning', 'message.the.vendor.on.the.rebate.type.in.pdst.does.not.mat', function () {
                     callback(true);
                  }, function () {
                     callback(false);
                  });
               } else {
                  callback(true);
               }
            });
         } else {
            callback(true);
         }
      }

      function checkVendSubReb(callback) {
         if (icsw.arpvendno && icsw.rebsubty) {
            var params = {
               codeiden: 'st',
               codeval: icsw.rebsubty,
               fldlist: 'vendno'
            };

            DataService.get('api/pd/pdst/getbypk', { params: params, busy: true }, function (pdst) {
               self.pdstsubvendno = pdst ? pdst.vendno : '';

               if (self.pdstsubvendno && self.pdstsubvendno !== 0 && icsw.arpvendno !== self.pdstsubvendno) {
                  MessageService.okCancel('global.warning', 'message.the.vendor.on.the.rebate.sub.type.in.pdst.does.not', function () {
                     callback(true);
                  }, function () {
                     callback(false);
                  });
               } else {
                  callback(true);
               }
            });
         } else {
            callback(true);
         }
      }

      self.callRecalculate = function () {
         if (icsw.statustype.toLowerCase() === 's') {
            // need to run custom submit logic but not standard submit before recalculate
            self.customSubmit(function () {
               // need to manually save the icsw
               DataService.update('api/ic/icsw', { data: icsw, busy: true }, function () {
                  // run the recalculate and reload icsw and place user back on order tab in edit mode
                  var criteriaList = [{ prod: icsw.prod, whse: icsw.whse }];
                  DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criteriaList, busy: true }, function () {
                     MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     $state.go('icsw.detail.edit', { id: icsw.rowID, activeTab: 'ordering' }, { reload: 'icsw.detail' });
                  });
               });
            });
         } else {
            MessageService.info('global.information', 'message.the.product.must.be.a.stocked.item');
         }

      }; // self.callRecalculate

      self.exitDetail = function () {
         // When user creates a new icsw record, force them to save the prod line, if it is required, before allowing them to go back
         // Prevent leaving the tab if in edit mode and product line is required and [is blank or has changes]
         self.validateProductLine();
         if (base.isEdit() && !base.isProdlineValid) {
            MessageService.error('global.error', 'error.please.save.changes.first');
            return; // prevent leaving until a product line is saved
         }
         $state.go('icsw.master');
      };

      self.prodlineChanged = function () {
         self.validateProductLine();
      };

      self.validateProductLine = function () {
         if ((self.icsw.arptype === 'V' || self.icsw.arptype === 'M' || base.icRequireVendProdLine === base.VENDORPRODUCTLINE)) { // if product line is required
            if (!self.icsw.prodline || self.originalProdline !== self.icsw.prodline) { // and if product line is blank or has changes
               base.isProdlineValid = false; // prevent leaving until product line corrected and saved
               return;
            }
         }
         base.isProdlineValid = true;
      };

   };

   this.extendCreateController = function (self, base, icsw) {
      self.sasoo = Sasoo;
      self.icsw.statustype = 's';
      self.arptype = 'v';
      self.wmallocty = 'c';
      self.wmpriority = 'f';
      self.ordcalcty = 'c';
      self.surplusty = 'i';
      self.class = '1';
      self.icsw.taxablety = 'y';
      self.icsw.prodline = '';
      self.icsw.whse = base.criteria.whse;
      self.icsw.avgcost = 0;
      self.icsw.lastcost = 0;
      self.icsw.replcost = 0;
      self.icsw.stndcost = 0;
      self.icsw.smanalfl = true;
      self.icsw.autofillfl = true;
      self.customSubmit = function () {
         if (base.validateFields(icsw)) {
            if (!self.icsw.arpvendno) {
               self.icsw.arpvendno = 0;
            }
            self.checkCatalogValidation();
         }
      };

      self.checkCatalogValidation = function () {
         if (self.sasoo.caticcrtty.toLowerCase() === 'y') {
            var params = {
               prod: self.icsw.prod,
               fldlist: ''
            };
            DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (icsp) {
               if (icsp) {
                  self.submit();
               }
               else {
                  var params = {
                     catalog: self.icsw.prod,
                     fldlist: ''
                  };
                  DataService.get('api/ic/icsc/getbypk', { params: params, busy: true }, function (icsc) {
                     if (icsc) {
                        MessageService.yesNoCancel('global.question', 'question.create.catalog.product.in.inventory', function () {
                           //yes callback
                           var initCriteriaProdFromCat = {
                              prod: self.icsw.prod,
                              whse: self.icsw.whse,
                              fieldlist: 'countryoforigin,tariffcd'
                           };
                           DataService.post('api/oe/asoeline/oeinitcreateprodfromcat', { data: initCriteriaProdFromCat, busy: true }, function (data) {
                              if (data) {
                                 var hsCode;
                                 var countryCode;
                                 data.forEach(function (initCreateProdResults) {
                                    if (initCreateProdResults.fieldname === 'tariffcd') {
                                       hsCode = initCreateProdResults.fieldvalue;
                                    }
                                    if (initCreateProdResults.fieldname === 'countryoforigin') {
                                       countryCode = initCreateProdResults.fieldvalue;
                                    }
                                 });
                                 $state.go('.createCatalogInInventory', {
                                    productType: 's',
                                    statusType: 's',
                                    hsCode: hsCode,
                                    countryCode: countryCode,
                                    callbackFunction: self.createProdFromCatalog
                                 });
                              }
                           });
                        }, function () {
                           //no callback
                        });
                     }
                     else {
                        self.submit();
                     }
                  });
               }
            });
         }
         else {
            self.submit();
         }
      };

      self.createProdFromCatalog = function (productType, statusType, hsCode, countryCode) {
         var prodType = statusType === 'n' ? statusType + productType : productType;
         var createProdFromCatalogCriteria = {
            prod: self.icsw.prod,
            whse: self.icsw.whse,
            statustype: statusType,
            prodtype: prodType,
            countryoforigin: countryCode,
            tariffcd: hsCode
         };
         DataService.post('api/oe/asoeline/createprodfromcatalog', { data: createProdFromCatalogCriteria, busy: true }, function (data) {
            if (data) {
               if (data.cWarningMessage) {
                  MessageService.info('global.information', data.cWarningMessage);
               }

               var params = {
                  prod: self.icsw.prod,
                  whse: self.icsw.whse,
                  fldlist: 'rowID'
               };

               DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (newIcsw) {
                  if (newIcsw) {
                     $state.go('icsw.detail.edit', { id: newIcsw.rowID, activeTab: 'ordering' }, { reload: 'icsw.detail' });
                  }
                  else {
                     $state.go('^');
                  }
               });
            }
         });
      };
   };
});

/**
 * Controller for the Warehouse logistics tab view. We only need to fetch the wlicsw record
 * when the user has activated this tab.
 */
app.controller('IcswWLSetupCtrl', function ($scope, DataService, UserService) {
   var dtl = $scope.dtl;

   // After making sure the full icsw object has been resolved, fetch the corresponding wlicsw record
   dtl.icsw.$promise.then(function () {
      var params = {
         whse: dtl.icsw.whse,
         prod: dtl.icsw.prod
      };

      DataService.get('api/wl/wlicsw/getbypk', { params: params, busy: true }, function (wlicsw) {

         if (wlicsw) {
            dtl.wlicsw = wlicsw;
         } else {
            DataService.get('api/wl/wlao/getbypk', { busy: true }, function (wlao) {
               if (wlao) {
                  dtl.whzone = wlao.whzone;
               }
            });
            // If wlicsw doesn't exist, make a new one
            dtl.wlicsw = {
               cono: UserService.getCono(),
               whse: dtl.icsw.whse,
               prod: dtl.icsw.prod,
               boxqty: 1,
               caseqty: 1,
               palletqty: 1,
               whzone: dtl.whzone
            };

            // Set flag for submit to check
            dtl.isWlicswRecordNew = true;
         }
      });
   });
});

app.controller('IcswCreateCatalogInInventoryCtrl', function ($scope, $state, $stateParams, $translate) {
   //alias => cci
   var self = this;

   self.productType = $stateParams.productType;
   self.statusType = $stateParams.statusType;
   self.hsCode = $stateParams.hsCode;
   self.countryCode = $stateParams.countryCode;

   self.statusTypes = [
      { label: $translate.instant('global.stock'), value: 's' },
      { label: $translate.instant('global.order.as.needed'), value: 'o' },
      { label: $translate.instant('global.order.as.needed.non.stock'), value: 'n' }
   ];

   self.submit = function () {
      $stateParams.callbackFunction(self.productType, self.statusType, self.hsCode, self.countryCode);
   };
});
