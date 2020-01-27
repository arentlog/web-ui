'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsc',
      dataPath: 'api/ic/icsc',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsc/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'iccataloglookupresults',
      resultsRowIdField: 'rowidIcsc',
      createStateView: 'ic/icsc/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsc/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/iccatalogcopy',
      primaryKeyParams: ['catalog'],
      recentlyVisited: {
         title: { label: 'global.catalog', value: 'catalog' },
         description: { label: null, value: 'descrip1'}
      }
   });
});
app.service('IcscService', function ($state, MessageService, MruService, DataService, ConfigService, UserService, Utils, AodataService, Sasa, Constants, SecurityService) {

   this.extendBaseController = function (self) {
      self.VENDORPRODUCTLINE = Constants.VENDOR_AND_PRODUCT_LINE;
      self.icRequireVendProdLine = AodataService.getValue('IC', 'icrequirevendnopline');
      self.allowExpandedTaxGroups = AodataService.getValue('TAX', 'ExpandedTaxGroups').toLowerCase() === 'yes';
      self.showLWH = Sasa.modwlfl;

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

      self.calcCube = function (length, width, height) {
         return length * width * height;

      };

      self.validateFields = function (icsc) {
         if (icsc.vendprod && icsc.vendprod.length > 24 && !self.allowExpandedVendProd) {
            MessageService.error('global.error', 'error.maximum.length.for.vendor.product.is.24');
            return false;
         } else {
            return true;
         }
      };
   };
   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         keywords: '',
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'vendno', label: MessageService.get('global.vendor.number') },
         { value: 'catalog', label: MessageService.get('global.catalog.product') },
         { value: 'prodline', label: MessageService.get('global.product.line') },
         { value: 'prodcat', label: MessageService.get('global.product.category') },
         { value: 'keywords', label: MessageService.get('global.keyword') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields

      self.defaultSelectedCriteria = ['catalog'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/icsc/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.iccataloglookupresults;
            }
         });
      };
   };
   this.extendDetailController = function (self, base, icsc) {

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icsc', 'General') < 3;
      self.isPricingTabReadonly = SecurityService.getSubSecurityLevel('icsc', 'Pricing') < 3;
      self.isIntrastatTabReadonly = SecurityService.getSubSecurityLevel('icsc', 'Intrastat') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsc', 'Custom') < 3;

      self.calcCube = function () {
         icsc.cubes = base.calcCube(icsc.length, icsc.width, icsc.height);
      };

      icsc.$promise.then(function () {
         var catalogDesc = '';
         if (icsc.descrip1) {
            catalogDesc = icsc.descrip1;
         }
         if (icsc.descrip2) {
            catalogDesc = catalogDesc + ' ' + icsc.descrip2;
         }
         MruService.addToList('Prod', icsc.rowpointer, icsc.catalog + ' - ' + catalogDesc, icsc.catalog);

         var criteria = { cCatalog: icsc.catalog };
         DataService.post('api/ic/asicinquiry/iccataloggetupc/', { data: criteria, busy: false }, function (data) {
            if (data) {
               self.upccode = data;
            }
         });
         // Get Commodity Code to enable/disable Net Mass and Supplementary Units
         icsc.useSupp = false;
         icsc.useNet = false;
         if (icsc.commoditycd !== "") {
            var sastaParams = {
               codeiden: 'CD',
               codeval: icsc.commoditycd
            };
            DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (data) {
               icsc.useSupp = data.usesuppunitsfl;
               icsc.useNet = !data.usesuppunitsfl;
            });
         }
      });

      // Intrastat Tab: Commodity Code Changed
      self.setResetCommodityCd = function () {
         icsc.useSupp = false;
         icsc.useNet = false;
         if (icsc.commoditycd !== "" && icsc.commoditycd !== null) {
            var params = {
               codeiden: 'CD',
               codeval: icsc.commoditycd
            };
            DataService.get('api/sa/sasta/getbypk', { params: params, busy: true }, function (data) {
               icsc.useSupp = data.usesuppunitsfl;
               icsc.useNet = !data.usesuppunitsfl;
            });
         }
         if (!icsc.useSupp) {
            icsc.usesuppunits = 0;
         }
         if (!icsc.useNet) {
            icsc.netmassamt = 0;
         }
      };

      self.customSubmitContinue = function () {
         //Get a current copy of the ICSC so we deal with a possible concurrency issue with
         //Notes.  If we are in the process of creating (or updating) an catalog and they use
         //The WebPart to create/delete the Notes, that process will set the icsc.notesfl
         //field for us.  The current one in memory is possibly stale data.  This will get us
         //latest data so we doin't stomp on good data.
         DataService.get('api/ic/icsc/getbyrowid/' + icsc.rowID, function (data) {
            if (data) {
               icsc.notesfl = data.notesfl;
            }
            self.submit();
         });
      };

      self.customSubmit = function () {

         checkVendReb(function (isContinue) {
            if (isContinue) {
               checkVendSubReb(function (stillContinue) {
                  if (stillContinue) {
                     if (base.validateFields(icsc)) {
                        self.customSubmitContinue();
                     }
                  }
               });
            }
         });
      };

      function checkVendReb(callback) {
         if (icsc.vendno && icsc.rebatety) {
            var params = {
               codeiden: 'pt',
               codeval: icsc.rebatety,
               fldlist: 'vendno'
            };

            DataService.get('api/pd/pdst/getbypk', { params: params, busy: true }, function (pdst) {
               self.pdstvendno = pdst ? pdst.vendno : '';

               if (self.pdstvendno && self.pdstvendno !== 0 && icsc.vendno !== self.pdstvendno) {
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
         if (icsc.vendno && icsc.rebsubty) {
            var params = {
               codeiden: 'st',
               codeval: icsc.rebsubty,
               fldlist: 'vendno'
            };

            DataService.get('api/pd/pdst/getbypk', { params: params, busy: true }, function (pdst) {
               self.pdstsubvendno = pdst ? pdst.vendno : '';

               if (self.pdstsubvendno && self.pdstsubvendno !== 0 && icsc.vendno !== self.pdstsubvendno) {
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
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromcatalog = stateParams.object.catalog;

   };

   this.extendCreateController = function (self, base, icsc) {
      icsc.cubes = 0;
      icsc.length = 0;
      icsc.height = 0;
      icsc.width = 0;

      self.calcCube = function () {
         icsc.cubes = base.calcCube(icsc.length, icsc.width, icsc.height);
      };
      icsc.unitstock = 'each';

      self.customSubmit = function () {
         if (base.validateFields(icsc)) {
            self.submit();
         }
      };
   };
});