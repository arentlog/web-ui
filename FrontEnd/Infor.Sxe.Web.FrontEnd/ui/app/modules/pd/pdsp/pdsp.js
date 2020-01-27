'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('pd', 'pdsp', {
      widgets: ['SEARCH'],
      defaultState: 'pdsp'
   });

   $stateProvider.state('pdsp.customerMaster', {
      url: '/customer-master?pk',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/customer/customer-master.json');
            },
            controller: 'PdspCustomerMasterCtrl as cmst'
         }
      }
   });

   $stateProvider.state('pdsp.rebateMaster', {
      url: '/rebate-master?pk',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/rebate/rebate-master.json');
            },
            controller: 'PdspRebateMasterCtrl as rmst'
         }
      }
   });

   $stateProvider.state('pdsp.contractMaster', {
      url: '/contract-master',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/contract/contract-master.json');
            },
            controller: 'PdspContractMasterCtrl as vcmst'
         }
      }
   });

   $stateProvider.state('pdsp.vendorMaster', {
      url: '/vendor-master',
      sticky: true,
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/vendor/vendor-master.json');
            },
            controller: 'PdspVendorMasterCtrl as vmst'
         }
      }
   });

   $stateProvider.state('pdsp.nationalaccountMaster', {
      url: '/national-account-master',
      sticky: true,
       views: {
           master: {
               templateProvider: function (JsonViewService) {
                   return JsonViewService.getView('pd/pdsp/nationalaccount/nationalaccount-master.json');
               },
               controller: 'PdspNationalAccountMasterCtrl as namst'
           }
       }
   });

   $stateProvider.state('pdsp.customerDetail', {
      url: '/customer-detail?id&pk',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/customer/customer-detail.json');
            },
            controller: 'PdspCustomerDetailCtrl as cdtl'
         }
      }
   });

   $stateProvider.state('pdsp.customerDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('pdsp.customerCreate', {
      url: '/customer-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/customer/customer-create.json');
            },
            controller: 'PdspCustomerCreateCtrl as cdtl'
         }
      }
   });

   $stateProvider.state('pdsp.customerCopy', {
      url: '/customer-copy',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/customer/customer-create.json');
            },
            controller: 'PdspCustomerCreateCtrl as cdtl'
         }
      }
   });

   $stateProvider.state('pdsp.customerDetail.priceSheet', {
      url: '/price-sheet',
      params: {
         stateObject: null
      },
      views: {
         priceSheet: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/price-sheet/price-sheet.json');
            },
            controller: 'PdspPriceSheetCtrl as psht'
         }
      }
   });

   $stateProvider.state('pdsp.rebateDetail', {
      url: '/rebate-detail?id',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/rebate/rebate-detail.json');
            },
            controller: 'PdspRebateDetailCtrl as rdtl'
         }
      }
   });

   $stateProvider.state('pdsp.rebateDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('pdsp.rebateCreate', {
      url: '/rebate-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/rebate/rebate-create.json');
            },
            controller: 'PdspRebateCreateCtrl as rdtl'
         }
      }
   });

   $stateProvider.state('pdsp.rebateCopy', {
      url: '/rebate-copy',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/rebate/rebate-create.json');
            },
            controller: 'PdspRebateCreateCtrl as rdtl'
         }
      }
   });

   $stateProvider.state('pdsp.rebateDetail.priceSheet', {
      url: '/price-sheet',
      params: {
         stateObject: null
      },
      views: {
         priceSheet: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/price-sheet/price-sheet.json');
            },
            controller: 'PdspPriceSheetCtrl as psht'
         }
      }
   });

   $stateProvider.state('pdsp.vendorDetail', {
      url: '/vendor-detail?id',
      params: {
         stateObject: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/vendor/vendor-detail.json');
            },
            controller: 'PdspVendorDetailCtrl as vdtl'
         }
      }
   });

   $stateProvider.state('pdsp.vendorDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('pdsp.vendorCreate', {
      url: '/vendor-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/vendor/vendor-create.json');
            },
            controller: 'PdspVendorCreateCtrl as vdtl'
         }
      }
   });

   $stateProvider.state('pdsp.vendorCopy', {
      url: '/vendor-copy',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/vendor/vendor-create.json');
            },
            controller: 'PdspVendorCreateCtrl as vdtl'
         }
      }
   });

   $stateProvider.state('pdsp.contractDetail', {
      url: '/contract-detail?id',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/contract/contract-detail.json');
            },
            controller: 'PdspContractDetailCtrl as vcdtl'
         }
      }
   });

   $stateProvider.state('pdsp.contractDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('pdsp.contractCreate', {
      url: '/contract-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/contract/contract-create.json');
            },
            controller: 'PdspContractCreateCtrl as vcdtl'
         }
      }
   });

   $stateProvider.state('pdsp.contractCopy', {
      url: '/contract-copy',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/contract/contract-create.json');
            },
            controller: 'PdspContractCreateCtrl as vcdtl'
         }
      }
   });

   $stateProvider.state('pdsp.nationalaccountDetail', {
       url: '/national-account-detail?id',
       views: {
           detail: {
               templateProvider: function (JsonViewService) {
                   return JsonViewService.getView('pd/pdsp/nationalaccount/nationalaccount-detail.json');
               },
               controller: 'PdspNationalAccountDetailCtrl as nadtl'
           }
       }
   });

   $stateProvider.state('pdsp.nationalaccountDetail.edit', {
       url: '/edit'
   });

   $stateProvider.state('pdsp.nationalaccountCreate', {
       url: '/national-account-create',
       views: {
           detail: {
               templateProvider: function (JsonViewService) {
                   return JsonViewService.getView('pd/pdsp/nationalaccount/nationalaccount-create.json');
               },
               controller: 'PdspNationalAccountCreateCtrl as nadtl'
           }
       }
   });

   $stateProvider.state('pdsp.nationalaccountCopy', {
      url: '/national-account-copy',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdsp/nationalaccount/nationalaccount-create.json');
            },
            controller: 'PdspNationalAccountCreateCtrl as nadtl'
         }
      }
   });

}); //end app.config

app.controller('PdspBaseCtrl', function ($state, $translate, $stateParams, ConfigService, DataService, MessageService, Utils, SecurityService, TabService, AodataService, Sasc, Sasoo, PdConverters) {
    //as base
    var self = this;
    self.criteria = {};

    var holdDefaultLevelCode;
    self.MENU_FUNCTION_PDSP = 'pdsp';
    self.SUBMENU_PDSP_PDSC = 'Customer Records';   //This is dependent on the SASSM (Menu Item) 'Label' field definition for PDSP.
    self.SUBMENU_PDSP_PDSR = 'Rebate Records';     //This is dependent on the SASSM (Menu Item) 'Label' field definition for PDSP.
    self.SUBMENU_PDSP_PDSV = 'Vendor Records';     //This is dependent on the SASSM (Menu Item) 'Label' field definition for PDSP.
    self.SUBMENU_PDSP_PDSVC = 'Contract Records';  //This is dependent on the SASSM (Menu Item) 'Label' field definition for PDSP.
    self.SUBMENU_PDSP_PDSN = 'National Account';   //This is dependent on the SASSM (Menu Item) 'Label' field definition for PDSP.
    self.nationalAccountAOData = AodataService.getValue("PD", "PDNationalProgramsFl").toLowerCase();
    self.nationalAccountShipToAOData = AodataService.getValue("PD", "PDNationalProgramsByShipto").toLowerCase();
    self.pdscRebSubTyAOData = AodataService.getValue("PD", "PDSCRebateSubType").toLowerCase() === 'yes';
          
    var securityLevelPDSP = SecurityService.getSecurityLevel(self.MENU_FUNCTION_PDSP);
    self.cancelMessage = 'question.a.record.was.in.the.process.of.being.added.it.wil';

    // PDSR Manual Rebate Flag Visibility
    self.manualFlagVisibility = false;

    // PDSC Price Sheet
    self.seecostfl = Sasoo.seecostfl;
    self.oepricefl = Sasoo.oepricefl;

    // PDSC - Pricing
    self.sascPDPromoFl = Sasc.pdpromofl;

    // Level Code Drop Down Lists
    self.levelCodePDSC = [];
    self.levelCodeDetailPDSC = [];
    self.levelCodePDSR = [];
    self.levelCodeDetailPDSR = [];
    self.levelCodePDSV = [];
    self.levelCodePDSVC = [];
    self.levelCodePDSN = [];
    self.levelCodeDetailPDSN = [];
    self.levelCodeDetailPDSVC = [];

    // Level Code Selection Changes - used in Create and Copy as defaults
    self.currentChangeLevelCd = '';

    // Security Levels per record type
    self.securityLevelPDSC = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_PDSP, self.SUBMENU_PDSP_PDSC);
    self.securityLevelPDSR = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_PDSP, self.SUBMENU_PDSP_PDSR);
    self.securityLevelPDSV = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_PDSP, self.SUBMENU_PDSP_PDSV);
    self.securityLevelPDSVC = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_PDSP, self.SUBMENU_PDSP_PDSVC);
    self.securityLevelPDSN = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_PDSP, self.SUBMENU_PDSP_PDSN);

    self.rebatecdSave = 'c';
    self.shiptypeSave = 'w';
    self.advRebatecdSave = 'c';
    self.advShiptypeSave = 'w';

    // Set a default function - look at security
    if (self.securityLevelPDSC <= 1 && self.securityLevelPDSR <= 1 && self.securityLevelPDSV <= 1 && self.securityLevelPDSVC <= 1) {
        MessageService.error('global.error', 'message.minimum.security.level.not.setup.for.operator');
        TabService.closeTab('pdsp');
    }

    //User Hook (do not rename)
    self.pdspLevelContinue = function () {
       // Based on AO Settings per function - what is turned on
       if (holdDefaultLevelCode.substring(0, 1) === 'c') {
          $state.go('pdsp.customerMaster');
       } else if (holdDefaultLevelCode.substring(0, 1) === 'r') {
          $state.go('pdsp.rebateMaster');
       } else if (holdDefaultLevelCode.substring(0, 1) === 'v') {
          if (holdDefaultLevelCode === 'v1') {
             $state.go('pdsp.vendorMaster');
          } else {
             $state.go('pdsp.contractMaster');
          }
       } else {
          MessageService.error('global.error', 'message.none.of.the.pricing.types.are.setup.to.run.pricing');
          TabService.closeTab('pdsp');
       }
    };

    // Load the Levels allowed off AO Settings
    DataService.get('api/pd/aspdsetup/pdsplevel/' + securityLevelPDSP, { busy: true }, function (data) {

        if (data) {

            // Parse out the comma delimited field value for the drop down list
            var levelCode;
            var levelLabel;
            var levelType;
            var levelInteger;
            var levelCodeArray = [];
            var levelLabelArray = [];
            levelCodeArray = data.cLeveldata.split(",");
            levelLabelArray = data.cLevelcd.split(",");

            // Build the Drop Down data
            for (var i = 0; i <= levelCodeArray.length; i++) {

                levelCode = levelCodeArray[i];

                if (levelCode) {

                    levelLabel = levelLabelArray[i];
                    levelType = levelCode.substring(0, 1);
                    levelInteger = levelCode.substring(1, 2);

                    // Save off the First Level Code as the Default - minimum inquiry security level
                    if (!holdDefaultLevelCode) {
                        if (levelType === 'c' && self.securityLevelPDSC >= 2) {
                            holdDefaultLevelCode = levelCode;
                            self.criteria.clevelcd = holdDefaultLevelCode;
                        } else if (levelType === 'r' && self.securityLevelPDSR >= 2) {
                            holdDefaultLevelCode = levelCode;
                            self.criteria.clevelcd = holdDefaultLevelCode;
                        } else if (levelType === 'v' && levelInteger === 1 && self.securityLevelPDSV >= 2) {
                            holdDefaultLevelCode = levelCode;
                            self.criteria.clevelcd = holdDefaultLevelCode;
                        } else if (levelType === 'v' && levelInteger !== 1 && self.securityLevelPDSVC >= 2) {
                            holdDefaultLevelCode = levelCode;
                            self.criteria.clevelcd = holdDefaultLevelCode;
                        }
                    }

                    if (levelType === 'c') {
                        self.levelCodePDSC.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSCToName.convert(levelCode) });
                        if (levelInteger !== '0' && levelInteger !== '') {
                            self.levelCodeDetailPDSC.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSCToName.convert(levelCode) });
                        }
                    } else if (levelType === 'r') {
                        self.levelCodePDSR.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSRToName.convert(levelCode) });
                        if (levelInteger !== '0' && levelInteger !== '') {
                            self.levelCodeDetailPDSR.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSRToName.convert(levelCode) });
                        }
                    } else if (levelType === 'v') {
                        if (levelCode === 'v1') {
                            self.levelCodePDSV.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSVToName.convert(levelCode) });
                        } else {
                            self.levelCodePDSVC.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSVToName.convert(levelCode) });
                            if (levelInteger !== '0' && levelInteger !== '') {
                                self.levelCodeDetailPDSVC.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSVToName.convert(levelCode) });
                            }
                        }
                    } else if (levelType === 'n') {
                        self.levelCodePDSN.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSNToName.convert(levelCode) });
                        if (levelInteger !== '0' && levelInteger !== '') {
                            self.levelCodeDetailPDSN.push({ value: levelCode, label: PdConverters.PricingRecordTypeForPDSNToName.convert(levelCode) });
                        }
                    }
                }
            }
        }

        //User Hook (do not rename)
        self.pdspLevelContinue();
    });

    self.isMaster = function () {
        return ($state.is('pdsp.customerMaster') || $state.is('pdsp.rebateMaster') || $state.is('pdsp.contractMaster') || $state.is('pdsp.vendorMaster') || $state.is('pdsp.nationalaccountMaster'));
    };

    self.includesMaster = function () {
        return ($state.includes('pdsp.customerMaster') || $state.includes('pdsp.rebateMaster') || $state.includes('pdsp.contractMaster') || $state.includes('pdsp.vendorMaster') || $state.includes('pdsp.nationalaccountMaster'));
    };

    self.isDetail = function () {
        return ($state.is('pdsp.customerDetail') || $state.is('pdsp.rebateDetail') || $state.is('pdsp.vendorDetail') || $state.is('pdsp.contractDetail') || $state.is('pdsp.nationalaccountDetail'));
    };

    self.includesDetail = function () {
        return ($state.includes('pdsp.customerDetail') || $state.includes('pdsp.rebateDetail') || $state.includes('pdsp.vendorDetail') || $state.includes('pdsp.contractDetail') || $state.includes('pdsp.nationalaccountDetail'));
   };

   self.isEdit = function () {
       return ($state.is('pdsp.customerDetail.edit') || $state.is('pdsp.rebateDetail.edit') || $state.is('pdsp.vendorDetail.edit') || $state.is('pdsp.contractDetail.edit') || $state.is('pdsp.nationalaccountDetail.edit'));
   };

   self.isCreate = function () {
       return ($state.is('pdsp.customerCreate') || $state.is('pdsp.rebateCreate') || $state.is('pdsp.vendorCreate') || $state.is('pdsp.contractCreate') || $state.is('pdsp.nationalaccountCreate'));
   };

   self.isCustomer = function () {
      return ($state.is('pdsp.customerMaster') || $state.is('pdsp.customerCreate') || $state.includes('pdsp.customerDetail'));
   };

   self.isRebate = function () {
      return ($state.is('pdsp.rebateMaster') || $state.is('pdsp.rebateCreate') || $state.includes('pdsp.rebateDetail'));
   };

   self.isVendor = function () {
      return ($state.is('pdsp.vendorMaster') || $state.is('pdsp.vendorCreate') || $state.includes('pdsp.vendorDetail'));
   };

   self.isContract = function () {
      return ($state.is('pdsp.contractMaster') || $state.is('pdsp.contractCreate') || $state.includes('pdsp.contractDetail'));
   };

   self.isNationalAccount = function () {
       return ($state.is('pdsp.nationalaccountMaster') || $state.is('pdsp.nationalaccountCreate') || $state.includes('pdsp.nationalaccountDetail'));
   };

   self.isNationalAccountTabEnabled = function () {
       var retn = false;
       if (self.securityLevelPDSN) {
           if (self.securityLevelPDSN >= 2 && self.nationalAccountAOData === 'yes') {
               retn = true;
           }
       }
       return retn;
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.iRecordlimit = ConfigService.getDefaultRecordLimit();
   };

   self.loadCodeDesc = function (levelCode) {

      var levelCodeDesc;
      levelCodeDesc = '';

      // Load the Actual Level Description
      if (levelCode) {
         switch (levelCode.toLowerCase()) {
            case 'c1':
               levelCodeDesc = $translate.instant('global.customer') + '/' + $translate.instant('global.product');
               break;
            case 'c2p':
               levelCodeDesc = $translate.instant('global.customer') + '/' + $translate.instant('global.product.type');
               break;
            case 'c2l':
               levelCodeDesc = $translate.instant('global.customer') + '/' + $translate.instant('global.product.line');
               break;
            case 'c2c':
               levelCodeDesc = $translate.instant('global.customer') + '/' + $translate.instant('global.product.category');
               break;
            case 'c2r':
               levelCodeDesc = $translate.instant('global.customer') + '/' + $translate.instant('global.product.rebate');
               break;
            case 'c3':
               levelCodeDesc = $translate.instant('global.customer.type') + '/' + $translate.instant('global.product');
               break;
            case 'c4p':
               levelCodeDesc = $translate.instant('global.customer.type') + '/' + $translate.instant('global.product.type');
               break;
            case 'c4r':
               levelCodeDesc = $translate.instant('global.customer.type') + '/' + $translate.instant('global.rebate.type');
               break;
            case 'c5':
               levelCodeDesc = $translate.instant('global.customer');
               break;
            case 'c6':
               levelCodeDesc = $translate.instant('global.customer.type');
               break;
            case 'c7':
               levelCodeDesc = $translate.instant('global.product');
               break;
            case 'c8':
               levelCodeDesc = $translate.instant('global.product.price.type');
               break;
            case 'r1':
               levelCodeDesc = $translate.instant('global.product');
               break;
            case 'r2':
               levelCodeDesc = $translate.instant('global.rebate.type');
               break;
            case 'r3':
               levelCodeDesc = $translate.instant('global.product.price.type');
               break;
            case 'r4':
               levelCodeDesc = $translate.instant('global.product.line');
               break;
            case 'r5':
               levelCodeDesc = $translate.instant('global.product.category');
               break;
            case 'v2':
               levelCodeDesc = $translate.instant('global.product');
               break;
            case 'v2p':
               levelCodeDesc = $translate.instant('global.product.price.type');
               break;
            case 'v3':
               levelCodeDesc = $translate.instant('global.rebate.type');
               break;
            case 'v4':
               levelCodeDesc = $translate.instant('global.contract.number');
               break;
         }
      };

      return levelCodeDesc;
   };

   //User Hook (do not rename)
   self.pdspSearchContinue = function (data) { };

   //User Hook (do not rename)
   self.csearchInitialize = function () {
      self.cdataset = [];
   };

   //User Hook (do not rename)
   self.csearchResults = function (data) {
      self.cdataset = data.pdspcustprodresults;
   };

   // Perform search and update data set for the Customer (PDSC) grid
   self.csearch = function (callback) {

      var searchLevelCode;

      //User Hook (do not rename)
      //Needed additional hook so we can initialize the standard or perhaps a custom results collection.
      self.csearchInitialize();

      if (self.criteria.clevelcd === 'c7' || self.criteria.clevelcd === 'c8') {
         self.criteria.promosfl = self.sascPDPromoFl;
      } else {
         delete self.criteria.promosfl;
      }

      //User Hook (do not rename)
      if (self.setPdspSearchCriteria) {
         self.setPdspSearchCriteria();
      };

      DataService.post('api/pd/aspdsetup/pdspcustprodsearch', { data: self.criteria, busy: true }, function (data) {
         if (data) {

            searchLevelCode = self.criteria.clevelcd;

            // Single Record found off Record# - load the Type found for the Grid Columns display
            if (searchLevelCode === 'c0' && data.pdspcustprodresults.length) {

               searchLevelCode = data.pdspcustprodresults[0].levelcd;

               // Load the Level Code Description
               data.pdspcustprodresults[0].clevelcd = self.loadCodeDesc(searchLevelCode);
            }

            // Load the Column Visibility Settings
            self.searchFieldsVisible(searchLevelCode, '', '', '', 'srch');

            //User Hook (do not rename)
            self.pdspSearchContinue(data);

            //User Hook (do not rename)
            //Needed additional hook here because the 'pdspSearchContinue' was already in the code.
            //In this hook, we are taking the results and possibly setting a different collection.
            self.csearchResults(data);

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }

            callback(true);
         }
      });
   };

   // Perform search and update data set for the Rebate (PCSR) grid
   self.rsearch = function (callback) {

      var searchLevelCode;
      var searchRebateCode;

      self.criteria.custno = '0';
      self.criteria.shipto = '';
      self.criteria.usecontractvfl = '';
      self.criteria.usepricevfl = '';

      if (self.criteria.rebatecd === 'p') {
         self.criteria.prodpricety = '';
      }

      if (self.criteria.rebatecd.toLowerCase() === 's') {
         self.manualFlagVisibility = true;
      }
      else {
         self.manualFlagVisibility = false;
      }

      self.rdataset = [];

      DataService.post('api/pd/aspdsetup/pdsprebatesearch', { data: self.criteria, busy: true }, function (data) {
         if (data) {

            searchLevelCode = self.criteria.clevelcd;
            searchRebateCode = self.criteria.rebatecd;

            self.rebatecdSave = self.criteria.rebatecd;
            self.shiptypeSave = self.criteria.shiptype;

            // Single Record found off Record# - load the Type found for the Grid Columns display
            if (self.criteria.clevelcd === 'r0' && data.pdsprebateresults.length) {

               searchLevelCode = data.pdsprebateresults[0].levelcd;
               searchRebateCode = data.pdsprebateresults[0].rebatecd;

               // Load the Level Code Description
               data.pdsprebateresults[0].clevelcd = self.loadCodeDesc(data.pdsprebateresults[0].levelcd);
            }
            var contract = searchRebateCode === 's' ? true : '';
            var rebprice = searchRebateCode === 's' ? true : '';
            
            // Load the Column Visibility Settings
            self.searchFieldsVisible(searchLevelCode, searchRebateCode, contract, rebprice, 'srch');

            self.rdataset = data.pdsprebateresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }

            callback(true);
         }
      });
   };

   // Perform search and update data set for the Vendor (PDSV) grid
   self.vsearch = function () {

      DataService.post('api/pd/aspdsetup/pdspvendsearch', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.vdataset = data.pdspvendresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });
   };

   // Perform search and update data set for the Vendor Contract (PDSVC) grid
   self.vcsearch = function () {

      var searchLevelCode;
      self.vcdataset = [];

      DataService.post('api/pd/aspdsetup/pdspvendcontsearch', { data: self.criteria, busy: true }, function (data) {
         if (data) {

            searchLevelCode = self.criteria.clevelcd;

            // Single Record found off Record# - load the Type found for the Grid Columns display
            if (searchLevelCode === 'v0' && data.pdspvendcontresults.length) {

               searchLevelCode = data.pdspvendcontresults[0].levelcd;

               // Load the Level Code Description
               data.pdspvendcontresults[0].leveldesc = self.loadCodeDesc(searchLevelCode);
            }

            // Load variable values not on the Results Table - leave prod 'as-is' with over stuffed data
            data.pdspvendcontresults.forEach(function (gridData) {

               if (gridData.levelcd === 'v2') {
                  gridData.leveldesc = self.loadCodeDesc(gridData.levelcd);
               } else if (gridData.levelcd === 'v2p') {
                  gridData.prodpricety = gridData.prod;
                  gridData.leveldesc = self.loadCodeDesc(gridData.levelcd);
               } else if (gridData.levelcd === 'v3') {
                  gridData.rebatety = gridData.prod.substring(0, 7);
                  gridData.subrebty = gridData.prod.substring(8);
                  gridData.leveldesc = self.loadCodeDesc(gridData.levelcd);
               } else if (gridData.levelcd === 'v4') {
                  gridData.leveldesc = self.loadCodeDesc(gridData.levelcd);
               } else {
                  gridData.leveldesc = $translate.instant('global.invalid');
               }
            });

            // Load the Column Visibility Settings
            self.searchFieldsVisible(searchLevelCode, '', '', '', 'srch');

            // Reload Changed data to the Grid data Set
            self.vcdataset = data.pdspvendcontresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });

   };

    // Perform search and update data set for the National Account (PDSN) grid
   self.nasearch = function () {
       var searchLevelCode;
       DataService.post('api/pd/aspdsetup/pdspnpsearch', { data: self.criteria, busy: true }, function (data) {
           if (data) {
               searchLevelCode = self.criteria.clevelcd;
               self.nadataset = data.pdspnpresults;

               // Load the Column Visibility Settings
               self.searchFieldsVisible(searchLevelCode, '', '', '', 'srch');

               if (data.lMorerecords) {
                   MessageService.alert('global.warning', data.cWarningMsg);
               }
           }
       });
   };

   // Advance Criteria Field Visibility Settings - triggers each time the Level Code is changed (or other fields change)
   self.searchFieldsVisible = function (levelCode, rebateCode, useContract, usePrice, searchType, callback) {

      // 'Adv' Search Criteria Field Setting or 'Srch' Setting for Master Grid Columns
      if (searchType === 'adv') {
         self.CustNoFl = false;
         self.CustGroupFl = false;
         self.CustPriceTypeFl = false;
         self.ProdFl = false;
         self.ProdCatFl = false;
         self.ProdLineFl = false;
         self.ProdPriceTypeFl = false;
         self.RebTypeFl = false;
         self.ShipToFl = false;
         self.StartDtFl = false;
         self.UnitFl = false;
         self.VendNoFl = false;
         self.WhseFl = false;
         self.RegnFl = false;
         self.PriceRebFl = false;
         self.PromoFl = false;
         self.CustRebTypeFl = false;
         self.ContractNoFl = false;
         self.ShipTypeFl = false;
         self.ManualFl = false;
         self.ContractLineNoFl = false;
         self.RebateCdFl = false;
         self.SubRebTypeFl = false;
         self.UseContractVFl = false;
         self.UseContractsFl = false;
         self.UseRebSubTypeFl = false;
         self.ModelFl = false;
         self.BrandFl = false;
         self.PriceRebFl = false;
         self.UsePriceVFl = false;
      } else {
         self.srchCustNoFl = false;
         self.srchCustGroupFl = false;
         self.srchCustPriceTypeFl = false;
         self.srchPriceRebFl = false;
         self.srchProdFl = false;
         self.srchProdCatFl = false;
         self.srchProdLineFl = false;
         self.srchProdPriceTypeFl = false;
         self.srchRebTypeFl = false;
         self.srchShipToFl = false;
         self.srchStartDtFl = false;
         self.srchUnitFl = false;
         self.srchVendNoFl = false;
         self.srchWhseFl = false;
         self.srchRegnFl = false;
         self.srchPromoFl = false;
         self.srchCustRebTypeFl = false;
         self.srchContractNoFl = false;
         self.srchShipTypeFl = false;
         self.srchManualFl = false;
         self.srchContractLineNoFl = false;
         self.srchRebateCdFl = false;
         self.srchSubRebTypeFl = false;
         self.srchUseContractVFl = false;
         self.srchUseContractsFl = false;
         self.srchUseRebSubTypeFl = false;
         self.srchModelFl = false;
         self.srchBrandFl = false;
         self.srchPriceRebFl = false;
         self.srchUsePriceVFl = false;
      }

      if (levelCode) {

         // Advance Search runs this call when Level Code drop down changed - trap changed levelcd as a default for New/Copy
         if (searchType === 'adv') {
            self.currentChangeLevelCd = levelCode;
         }

         // Load null value - Rebates
         if (useContract !== true) {
            useContract = false;
         }

         // Load null value - Rebates
         if (usePrice !== true) {
            usePrice = false;
         }

         var searchCriteria = {
            cLevelcd: levelCode,
            cRebatecd: rebateCode,
            lUseContractvfl: useContract,
            lUsePricevfl: usePrice
         };

         DataService.post('api/pd/aspdsetup/pdspwidget', { data: searchCriteria, busy: true }, function (data) {
            if (data) {

               if (searchType === 'adv') {
                  self.CustNoFl = data.pdspwidgetresults.lCustNofl;
                  self.CustGroupFl = data.pdspwidgetresults.lCustGroupfl;
                  self.CustPriceTypeFl = data.pdspwidgetresults.lCustPricetypefl;
                  self.ProdFl = data.pdspwidgetresults.lProdfl;
                  self.ProdCatFl = data.pdspwidgetresults.lProdCatfl;
                  self.ProdLineFl = data.pdspwidgetresults.lProdLinefl;
                  self.ProdPriceTypeFl = data.pdspwidgetresults.lProdPricetypefl;
                  self.RebTypeFl = data.pdspwidgetresults.lRebTypefl;
                  self.ShipToFl = data.pdspwidgetresults.lShipTofl;
                  self.StartDtFl = data.pdspwidgetresults.lStartdtfl;
                  self.UnitFl = data.pdspwidgetresults.lUnitfl;
                  self.VendNoFl = data.pdspwidgetresults.lVendNofl;
                  self.WhseFl = data.pdspwidgetresults.lWhsefl;
                  self.RegnFl = data.pdspwidgetresults.lRegnFl;
                  self.CustRebTypeFl = data.pdspwidgetresults.lCustRebtypefl;
                  self.ContractNoFl = data.pdspwidgetresults.lContractNofl;
                  self.ShipTypeFl = data.pdspwidgetresults.lShiptypefl;
                  self.ManualFl = data.pdspwidgetresults.lManualfl;
                  self.ContractLineNoFl = data.pdspwidgetresults.lContractlineno;
                  self.RebateCdFl = data.pdspwidgetresults.lRebatecdfl;
                  self.SubRebTypeFl = data.pdspwidgetresults.lSubRebtypefl;
                  self.UseContractVFl = data.pdspwidgetresults.lUseContractvfl;
                  self.UseContractsFl = data.pdspwidgetresults.lUseContractsfl;
                  self.UseRebSubTypeFl = data.pdspwidgetresults.lUseRebSubTypefl;
                  self.ModelFl = data.pdspwidgetresults.lModelfl;
                  self.BrandFl = data.pdspwidgetresults.lBrandfl;
                  self.PriceRebFl = data.pdspwidgetresults.lPriceRebfl;
                  self.UsePriceVFl = data.pdspwidgetresults.lUsePricevfl;

                  if (levelCode === 'c7' || levelCode === 'c8') {
                     if (self.sascPDPromoFl) {
                        self.PromoFl = true;
                     }
                  }                                   
               } else {
                  self.srchCustNoFl = data.pdspwidgetresults.lCustNofl;
                  self.srchCustGroupFl = data.pdspwidgetresults.lCustGroupfl;
                  self.srchCustPriceTypeFl = data.pdspwidgetresults.lCustPricetypefl;
                  self.srchProdFl = data.pdspwidgetresults.lProdfl;
                  self.srchProdCatFl = data.pdspwidgetresults.lProdCatfl;
                  self.srchProdLineFl = data.pdspwidgetresults.lProdLinefl;
                  self.srchProdPriceTypeFl = data.pdspwidgetresults.lProdPricetypefl;
                  self.srchRebTypeFl = data.pdspwidgetresults.lRebTypefl;
                  self.srchShipToFl = data.pdspwidgetresults.lShipTofl;
                  self.srchStartDtFl = data.pdspwidgetresults.lStartdtfl;
                  self.srchUnitFl = data.pdspwidgetresults.lUnitfl;
                  self.srchVendNoFl = data.pdspwidgetresults.lVendNofl;
                  self.srchWhseFl = data.pdspwidgetresults.lWhsefl;
                  self.srchRegnFl = data.pdspwidgetresults.lRegnFl;
                  self.srchCustRebTypeFl = data.pdspwidgetresults.lCustRebtypefl;
                  self.srchContractNoFl = data.pdspwidgetresults.lContractNofl;
                  self.srchShipTypeFl = data.pdspwidgetresults.lShiptypefl;
                  self.srchManualFl = data.pdspwidgetresults.lManualfl;
                  self.srchContractLineNoFl = data.pdspwidgetresults.lContractlineno;
                  self.srchRebateCdFl = data.pdspwidgetresults.lRebatecdfl;
                  self.srchSubRebTypeFl = data.pdspwidgetresults.lSubRebtypefl;
                  self.srchUseContractVFl = data.pdspwidgetresults.lUseContractvfl;
                  self.srchUseContractsFl = data.pdspwidgetresults.lUseContractsfl;
                  self.srchUseRebSubTypeFl = data.pdspwidgetresults.lUseRebSubTypefl;
                  self.srchModelFl = data.pdspwidgetresults.lModelfl;
                  self.srchBrandFl = data.pdspwidgetresults.lBrandfl;
                  self.srchPriceRebFl = data.pdspwidgetresults.lPriceRebfl;
                  self.srchUsePriceVFl = data.pdspwidgetresults.lUsePricevfl;

                  if (levelCode === 'c7' || levelCode === 'c8') {
                     if (self.sascPDPromoFl) {
                        self.srchPromoFl = true;
                     }
                  }
                                                   
               }

               if (data.cWarning) {
                  MessageService.alert('global.warning', data.cWarning);
               }

               if (callback) {
                  callback();
               }
            }
         });
      }
   };

   self.changeSearchLevelCd = function () {
      // criteria Search runs this call when Level Code drop down changed - trap changed levelcd as a default for New/Copy
      self.currentChangeLevelCd = self.criteria.clevelcd;

      // Search Criteria - Not Advanced - Always set expiredfl so the search includes expired and non-expired (All).
      self.criteria.expiredfl = true;

      // Set the rebsubty to ALL to include Use Contract Line and non Contract Reb Sub Type rebate records.
      // Rebate Sub Type - used in Customer Pricing now - need actual search value
      if (self.currentChangeLevelCd.substring(0,1).toLowerCase() === 'r') {
         self.criteria.rebsubty = 'Criteria-Search';
      } else {
         self.criteria.rebsubty = '';
      }
   };

   self.validateProduct = function (icProduct, icWarehouse, callback) {

      if (!icProduct) {
         icProduct = '';
      }

      if (!icWarehouse) {
         icWarehouse = '';
      }

      if (icProduct) {

         var params = {
            prod: icProduct,
            fldlist: 'prod'
         };

         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
            if (icsp) {

               if (icWarehouse) {
                  var params = {
                     prod: icProduct,
                     whse: icWarehouse,
                     fldlist: 'prod,whse'
                  };

                  DataService.get('api/ic/icsw/getbypk', { params: params }, function (icsw) {
                     if (!icsw) {
                        MessageService.okCancel('global.question', 'message.this.product.is.neither.a.stock.product.nor.a.cata', function () {
                           callback(true);
                           return true;
                        },
                        function () {
                           callback(false);
                        });
                     } else {
                        callback(false);
                     }
                  });
               } else {
                  callback(false);
               }

            } else {

               var params = {
                  catalog: icProduct,
                  fldlist: 'catalog'
               };

               DataService.get('api/ic/icsc/getbypk', { params: params }, function (icsc) {
                  if (!icsc) {
                     MessageService.okCancel('global.question', 'message.this.product.is.neither.a.stock.product.nor.a.cata', function () {
                        callback(true);
                     },
                     function () {
                        callback(false);
                     });
                  } else {
                     callback(false);
                  }
               });
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();

}); //end base

//Search Controllers
app.controller('PdspSearchCtrl', function () {
}); //not used, but required

//Master Controllers
app.controller('PdspMasterCtrl', function () {
}); //not used, but required
