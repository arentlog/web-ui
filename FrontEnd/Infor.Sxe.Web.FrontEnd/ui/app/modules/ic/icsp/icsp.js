'use strict';

app.config(function ($stateProvider, StateProvider, MultiLanguageStateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsp',
      dataPath: 'api/ic/icsp',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsp/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'icproductlookupresults',
      resultsRowIdField: 'rowidIcsp',
      primaryKeyParams: ['prod'],
      createStateView: 'ic/icsp/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsp/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/icproductcopy',
      copySubTitle: [
         { label: null, value: 'prod' }
      ],
      detailSubTitle: [
         { label: null, value: 'prod' },
         { label: null, value: 'descrip1' }
      ],
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: { label: null, value: 'descrip1' }
      }
   });
   $stateProvider.state('icsp.master.addproductlist', {
      url: '/add-product-list',
      params: {
         detailRecord: null
      },
      views: {
         masterExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsp/add-product-list.json');
            },
            controller: 'IcspAddProductListCtrl as apl'
         }
      }
   });
   $stateProvider.state('icsp.master.createproductlist', {
      url: '/create-product-list',
      params: {
         detailRecord: null
      },
      views: {
         masterExtendView2: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsp/create-product-list.json');
            },
            controller: 'IcspCreateProductListCtrl as cpl'
         }
      }
   });
   MultiLanguageStateProvider.addStates('ic', 'icsp', 'icsp.detail');
});

app.service('IcspService', function ($state, $translate, DataService, MessageService, MruService, ConfigService, UserService, AodataService, Utils, Sasa, Sasc, SecurityService) {

   this.extendBaseController = function (self) {

      self.showLWH = Sasa.modwlfl;
      self.noKit = !Sasa.modkpfl;

      var allowexpandedproduct = AodataService.getValue('IC', 'allowexpandedproduct');
      self.prodMaxLength = (allowexpandedproduct.toLowerCase() === 'yes' || allowexpandedproduct.toLowerCase() === 'y') ? 50 : 24;
      self.allowExpandedTaxGroups = AodataService.getValue('TAX', 'ExpandedTaxGroups').toLowerCase() === 'yes';
      self.isRebateByPriceAoFl = AodataService.getValue("PD", "pDRebateByPriceOptionFl").toLowerCase() === 'yes';

      self.calcCube = function (length, width, height) {
         return (length * width * height).toFixed(5);
      };

      self.validateFields = function (icsp) {

         if (icsp.lwhrequiredfl && (icsp.length === 0 || icsp.height === 0 || icsp.width === 0)) {
            MessageService.error('global.error', 'error.length.width.and.height.are.required');
            return false;
         } else {
            return true;
         }
      };
   };

   this.extendDetailController = function (self, base, icsp) {
      self.sasa = Sasa;
      self.sasc = Sasc;

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'General') < 3;
      self.isPricingTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'Pricing & Warranty') < 3;
      self.isCoresTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'Cores & Kits') < 3;
      self.isIntrastatTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'Intrastat') < 3;
      self.isCutTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'RF Cut') < 3;
      self.isWarehouseTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'Warehouse Products') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsp', 'Custom') < 3;

      // Recalculate Cubes when Length, Width or Height Changes
      self.calcCube = function () {
         icsp.cubes = base.calcCube(icsp.length, icsp.width, icsp.height);
      };

      icsp.$promise.then(function () {
         var productDesc = '';
         if (icsp.descrip1) {
            productDesc = icsp.descrip1;
         }
         if (icsp.descrip2) {
            productDesc = productDesc + ' ' + icsp.descrip2;
         }
         MruService.addToList('Prod', icsp.rowpointer, icsp.prod + ' - ' + productDesc, icsp.prod);

         // blank and N are both treated as 'Neither
         if (icsp.tiedcompprt === '') {
            icsp.tiedcompprt = 'N';
         }

         // Get field controls
         var icspFieldCriteria = {
            prod: icsp.prod
         };
         DataService.post('api/ic/asicsetup/icproductfieldcontrols', { data: icspFieldCriteria, busy: true }, function (data) {
            if (data) {
               icsp.noupdtfl = data.noupdtfl;
               icsp.lwhrequiredfl = data.lwhrequiredfl;
            }
         });

         // Get special/price cost data from ICSS based on icspecrecno
         var params = {
            prod: icsp.prod,
            icspecrecno: icsp.icspecrecno
         };
         DataService.get('api/ic/icss/getbypk', { params: params, busy: true }, function (data) {
            icsp.speccostty = data.speccostty;
            icsp.csunperstk = data.csunperstk;
            icsp.prccostper = data.prccostper;
         });

         // Get Commodity Code to enable/disable Net Mass and Supplementary Units
         icsp.useSupp = false;
         icsp.useNet = false;
         if (icsp.commoditycd !== "") {
            var sastaParams = {
               codeiden: 'CD',
               codeval: icsp.commoditycd
            };
            DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (data) {
               icsp.useSupp = data.usesuppunitsfl;
               icsp.useNet = !data.usesuppunitsfl;
            });
         }
      });

      self.multiLangClick = function () {
         $state.go('icsp.detail.multilanguage', {
            codeiden: 'p',
            codeval: icsp.prod,
            descrip1: icsp.descrip1,
            descrip2: icsp.descrip2,
            extended: icsp.descrip3,
            returnState: $state.current.name
         });
      };

      self.customSubmit = function () {
         var icssSaveCriteria = {
            prod: icsp.prod,
            speccostty: icsp.speccostty,
            prccostper: icsp.prccostper,
            csunperstk: icsp.csunperstk,
            newicsprecord: false
         };

         DataService.post('api/ic/asicsetup/icupdateicspspecpricecost', { data: icssSaveCriteria, busy: true }, function (data) {
            if (data) {
               var params = {
                  prod: icsp.prod,
                  fldlist: 'icspecrecno,notesfl'
               };
               DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (icspData) {
                  if (data) {
                     icsp.icspecrecno = icspData.icspecrecno;
                     //Need this so we don't lose an update that might happen on the Notes WebPart.
                     //This makes sure we have the latest value for the Notes Flag.
                     icsp.notesfl = icspData.notesfl;
                     self.submit();
                  }
               });
            }
         });
      };

      // General Tab: Kit Type Changed
      self.kitTypeChanged = function () {
         var changeCriteria = {
            ttblicproductkittypechange: {
               prod: icsp.prod,
               kittype: icsp.kittype
            }
         };
         DataService.post('/web/api/ic/icproductkittypechange', { data: changeCriteria, busy: true }, function () {
         });
      };

      // General Tab: VA Assembly Type Changed
      self.setResetVaAssemblyTy = function () {
         if (icsp.vaassemblyty !== '') {
            icsp.vacutofflength = 0;
            icsp.unitvaassembly = '';
         }
      };

      // Intrastat Tab: Commodity Code Changed
      self.setResetCommodityCd = function () {
         icsp.useSupp = false;
         icsp.useNet = false;
         if (icsp.commoditycd !== "" && icsp.commoditycd !== null) {
            var params = {
               codeiden: 'CD',
               codeval: icsp.commoditycd
            };
            DataService.get('api/sa/sasta/getbypk', { params: params, busy: true }, function (data) {
               icsp.useSupp = data.usesuppunitsfl;
               icsp.useNet = !data.usesuppunitsfl;
            });
         }
         if (!icsp.useSupp) {
            icsp.usesuppunits = 0;
         }
         if (!icsp.useNet) {
            icsp.netmassamt = 0;
         }
      };

      // Cores Tab: if the Product Type changes to/from Reman default Core Data
      self.setResetCoreDefaults = function () {
         if (icsp.prodtype !== 'R') {
            icsp.impliedcoreprod = '';
            icsp.implyqty = 0;
            icsp.dirtycoreprod = '';
            icsp.vendgraceper = 0;
            icsp.custgraceper = 0;
            icsp.vendcoregrcfl = false;
            icsp.custcoregrcfl = false;
         } else {
            var getCriteria = {
               prod: icsp.prod,
               impliedcoreprod: icsp.impliedcoreprod,
               dirtycoreprod: icsp.dirtycoreprod,
               vendgraceper: icsp.vendgraceper,
               custgraceper: icsp.custgraceper,
               vendcoregrcfl: icsp.vendcoregrcfl,
               custcoregrcfl: icsp.custcoregrcfl
            };
            DataService.post('api/ic/asicsetup/icproductremandefaults', { data: getCriteria, busy: true }, function (data) {
               icsp.impliedcoreprod = data.impliedcoreprod;
               icsp.dirtycoreprod = data.dirtycoreprod;
               icsp.implyqty = data.implyqty;
               icsp.vendcoregrcfl = data.vendcoregrcfl;
               icsp.custcoregrcfl = data.custcoregrcfl;
               icsp.vendgraceper = data.vendgraceper;
               icsp.custgraceper = data.custgraceper;
            });
         }
      };

      // Cut Tab - If the Cut Type changes set defaults if needed
      self.setResetCutType = function () {
         if (icsp.cuttype === 'L' && icsp.cutnumparts === 0) {
            icsp.cutnumparts = 1;
         } else if (icsp.cuttype === 'D') {
            if (icsp.dimlengthparts === 0) {
               icsp.dimlengthparts = 1;
               icsp.dimlengthty1 = 'I';
               icsp.dimlengthty2 = 'I';
            }
            if (icsp.dimwidthparts === 0) {
               icsp.dimwidthparts = 1;
               icsp.dimwidthty1 = 'I';
               icsp.dimwidthty2 = 'I';
            }
         }
      };

      self.showRebWarningMessage = function () {
         if (base.isRebateByPriceAoFl) {
            MessageService.info('global.alert', 'message.warning.special.price.cost.data.updated.create.new.rebate.by.selling.price.records.as.needed.to.reflect.the.price.change');
         }
      };

      self.specialPriceChange = function () {
         self.showRebWarningMessage();
      };

      self.priceCostPerChange = function () {
         self.showRebWarningMessage();
      };

      self.specPriceStkUnitChange = function () {
         self.showRebWarningMessage();
      };
   };

   this.extendCreateController = function (self, base, icsp) {
      var icspOriginal = null;
      var isCopyIcss = false;

      if (icsp) {
         icsp.statustype = 'A';
      }

      // Get field controls
      var icspFieldCriteria = {
         prod: ''
      };
      DataService.post('api/ic/asicsetup/icproductfieldcontrols', { data: icspFieldCriteria, busy: true }, function (data) {
         if (data) {
            icsp.noupdtfl = data.noupdtfl;
            icsp.lwhrequiredfl = data.lwhrequiredfl;

            //Save off a copy in case they try enter a product and the data comes from the Catalog, but then
            //they change their mind and enter a different unique product, we want the ICSP to be fresh.
            icspOriginal = angular.copy(icsp);
         }
      });

      self.productChange = function () {
         isCopyIcss = false;

         var requestCriteria = {
            ttblicspinitcreatecriteria: {
               prod: icsp.prod
            }
         };

         //WebHandler call
         DataService.post('/web/api/ic/ICSPInitializeCreate', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               if (data.ttblicsp && data.ttblicsp.length > 0) {

                  //By design, there isn't a question popping up asking if you wish to copy the
                  //data.  Be aware that regardless of if you omit this copy logic, the Notes from the
                  //catalog item will still copy over from the to the new Product during the
                  //SubmitChangescall in the backend.  That can't be overridden; it's part of the
                  //'CreatePostTrans' logic during the create.  Legacy logic across all of the UI's.
                  Utils.extend(icsp, data.ttblicsp[0]);

                  //Need to convert from an Array that the backend sends up, and flatten it.
                  icsp.descrip1 = data.ttblicsp[0].descrip[0];
                  icsp.descrip2 = data.ttblicsp[0].descrip[1];

                  //The backend call returns this as a string "?" and it needs to be nulled out.
                  icsp.rowpointer = null;

                  isCopyIcss = true;

                  MessageService.info('global.information', 'message.product.was.found.in.catalog');
               } else {
                  //Clean any residual data, in case they had a Catalog entered first.
                  Utils.replaceObject(icsp, icspOriginal);

                  icsp.prod = requestCriteria.ttblicspinitcreatecriteria.prod;
               }
            }
         });
      };

      self.customSubmit = function () {
         if (base.validateFields(icsp)) {

            icsp.cubes = base.calcCube(icsp.length, icsp.width, icsp.height);
            icsp.cutparttype2 = true;
            icsp.cuttype = 'N';
            icsp.dimlengthincr = 1;
            icsp.dimlengthparts = 1;
            icsp.dimlengthty1 = 'I';
            icsp.dimlengthty2 = 'I';
            icsp.dimwidthincr = 1;
            icsp.dimwidthparts = 1;
            icsp.dimwidthty1 = 'I';
            icsp.dimwidthty2 = 'I';
            icsp.esbactioncode = 'Replace';
            icsp.implyqty = 1;
            icsp.prodtype = 'S';
            icsp.tiedcompprt = 'N';
            icsp.warrtype = 'M';

            //Field(s) that would come from ICSC if the product exists in the catalog too, do not
            //overwrite if they did get copied over.
            if (!isCopyIcss) {
               icsp.termsdiscfl = true;
               icsp.priceonty = 'B';
            }

            //We don't want the SaveChanges to do the ICSC defaulting work
            //because we've done that as they changed the product.  We do however
            //want that backend call to copy the ICSC Notes over to the ICSP.  That
            //will still happen.
            icsp.bypassicsccopy = true;

            self.submit();
         }
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromprod = stateParams.object.prod;
      request.toprod = stateParams.object.prod;
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         kittype: '',
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'prod', label: MessageService.get('global.product') },
         { value: 'keywords', label: MessageService.get('global.keyword') },
         { value: 'lookupnm', label: MessageService.get('global.lookup.name') },
         { value: 'prodcat', label: MessageService.get('global.product.category') },
         { value: 'includeinactive', label: MessageService.get('global.include.inactive') },
         { value: 'kittype', label: MessageService.get('global.kit.type') },
         { value: 'prodtiergrp', label: MessageService.get('global.tier.group') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['keywords', 'prod'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/icsp/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.icproductlookupresults;
            }
         });
      };

      self.launchAddProductList = function () {
         $state.go('icsp.master.addproductlist');
      };

      self.launchCreateProductList = function () {
         $state.go('icsp.master.createproductlist');
      };
   };
});

app.controller('IcspWhseProdCtrl', function ($scope, $state, DataService, MessageService, GridService) {
   var self = this;
   var icsp = $scope.dtl.icsp;

   icsp.$promise.then(function () {
      var whseProdCriteria = {
         prod: icsp.prod
      };

      DataService.post('api/ic/icsw/lookup', { data: whseProdCriteria, busy: true }, function (data) {
         self.whseProdList = data;
      });
   });

   // Edit selected record -> ICSW
   self.edit = function () {
      var record = GridService.getSelectedRecord(self.whseProdGrid);
      if (record) {
         var params = {
            prod: record.prod,
            whse: record.whse,
            fillmode: true
         };

         DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               $state.go('icsw.detail.edit', { id: data.rowID });
            }
         });
      }
   };
});

app.controller('IcspAddProductListCtrl', function ($scope, $state, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   //var icsp = $scope.mst.icsp;

   // Manually build Product List Drop Down
   DataService.get('api/ic/icspl', { busy: true }, function (data) {
      base.productListTypes = data;
   });

   self.returnToMaster = function () {
      $state.go('^');
   };

   self.addToList = function () {

      var records = GridService.getSelectedRecords(base.grid);

      // Proceed if any rows are selected
      if (records && records.length) {

         var prodListAddProdList = [];
         var prodListAddTypeCriteria = {
            type: self.type,
            removeflag: self.removeflag
         };

         records.forEach(function (record) {
            prodListAddProdList.push({ prod: record.prod, userfield: record.userfield });
         });

         DataService.post('api/ic/asicsetup/icproductlistadd', {
            data: {
               icprodlistaddprod: prodListAddProdList,
               icprodlistaddtype: prodListAddTypeCriteria
            },
            busy: true
         }, function () {
            $state.go('^');
         });
      }
   };
});

app.controller('IcspCreateProductListCtrl', function ($scope, $state, DataService, UserService) {
   var self = this;

   self.returnToMaster = function () {
      $state.go('^');
   };

   self.createNewType = function () {
      var createData = {
         cono: UserService.getCono(),
         type: self.newtype,
         descrip: self.newdescrip
      };
      DataService.create('api/ic/icspl', { data: createData, busy: true }, function () {
         $state.go('^');
      });
   };
});