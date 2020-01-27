'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icsec', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icsec');

   $stateProvider.state('icsec.customerMaster', {
      url: '/customer-master',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/customer-master.json');
            },
            controller: 'IcsecCustomerMasterCtrl as cmst'
         }
      }
   });

   $stateProvider.state('icsec.vendorMaster', {
      url: '/vendor-master',
      views: {
         master: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/vendor-master.json');
            },
            controller: 'IcsecVendorMasterCtrl as vmst'
         }
      }
   });

   $stateProvider.state('icsec.referenceDetail', {
      url: '/reference-detail?id&pk&pk2&pk3',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/reference-detail.json');
            },
            controller: 'IcsecReferenceDetailCtrl as rdtl'
         }
      }
   });

   $stateProvider.state('icsec.referenceDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('icsec.referenceCreate', {
      url: '/reference-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/reference-detail.json');
            },
            controller: 'IcsecReferenceCreateCtrl as rdtl'
         }
      }
   });

   $stateProvider.state('icsec.customerDetail', {
      url: '/customer-detail?id',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/customer-detail.json');
            },
            controller: 'IcsecCustomerDetailCtrl as cdtl'
         }
      }
   });

   $stateProvider.state('icsec.customerDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('icsec.customerCreate', {
      url: '/customer-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/customer-detail.json');
            },
            controller: 'IcsecCustomerCreateCtrl as cdtl'
         }
      }
   });

   $stateProvider.state('icsec.vendorDetail', {
      url: '/vendor-detail?id',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/vendor-detail.json');
            },
            controller: 'IcsecVendorDetailCtrl as vdtl'
         }
      }
   });

   $stateProvider.state('icsec.vendorDetail.edit', {
      url: '/edit'
   });

   $stateProvider.state('icsec.vendorCreate', {
      url: '/vendor-create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsec/vendor-detail.json');
            },
            controller: 'IcsecVendorCreateCtrl as vdtl'
         }
      }
   });
}); //end app.config

app.controller('IcsecBaseCtrl', function ($state, $translate, ConfigService, DataService, MessageService, SecurityService, TabService) { //as base
   var self = this;
   self.criteria = {};
   self.lastRsearchType = '';

   self.customerProductChanged = function (args) {
      self.criteria.cprod = args.value3;
   };

   self.security = {  //The strings used are dependent on the SASSM (Menu Item) 'Label' field definition for ICSEC
      reference: SecurityService.getSubSecurityLevel('icsec', 'References'),
      customer: SecurityService.getSubSecurityLevel('icsec', 'Customer'),
      vendor: SecurityService.getSubSecurityLevel('icsec', 'Vendor')
   };

   if (self.security.reference <= 1) { //if they do not have the sub security to even look at the References
      if (self.security.customer >= 2) { //if they do have sub security for Customer
         $state.go('icsec.customerMaster');
      } else if (self.security.vendor >= 2) {
         $state.go('icsec.vendorMaster');
      } else {
         MessageService.error('global.error', 'message.minimum.security.level.not.setup.for.operator');
         TabService.closeTab('icsec');
      }
   }

   self.isMaster = function () {
      return ($state.is('icsec.master') || $state.is('icsec.customerMaster') || $state.is('icsec.vendorMaster'));
   };

   self.includesMaster = function () {
      return ($state.includes('icsec.master') || $state.includes('icsec.customerMaster') || $state.includes('icsec.vendorMaster'));
   };

   self.isCustomerMaster = function () {
      return $state.is('icsec.customerMaster');
   };

   self.isDetail = function () {
      return ($state.is('icsec.referenceDetail') || $state.is('icsec.customerDetail') || $state.is('icsec.vendorDetail'));
   };

   self.includesDetail = function () {
      return ($state.includes('icsec.referenceDetail') || $state.includes('icsec.customerDetail') || $state.includes('icsec.vendorDetail'));
   };

   self.isEdit = function () {
      return ($state.is('icsec.referenceDetail.edit') || $state.is('icsec.customerDetail.edit') || $state.is('icsec.vendorDetail.edit'));
   };

   self.isCreate = function () {
      return ($state.is('icsec.referenceCreate') || $state.is('icsec.customerCreate') || $state.is('icsec.vendorCreate'));
   };

   self.isReference = function () {
      return ($state.is('icsec.master') || $state.is('icsec.referenceCreate') || $state.includes('icsec.referenceDetail'));
   };

   self.isCustomer = function () {
      return ($state.is('icsec.customerMaster') || $state.is('icsec.customerCreate') || $state.includes('icsec.customerDetail'));
   };

   self.isVendor = function () {
      return ($state.is('icsec.vendorMaster') || $state.is('icsec.vendorCreate') || $state.includes('icsec.vendorDetail'));
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.byreference = false;
      self.criteria.type = '';
   };

   // Perform search and update data set for the Reference grid
   self.rsearch = function () {
      self.criteria.prod = self.criteria.rprod;
      self.lastRsearchType = self.criteria.type;
      DataService.post('api/ic/icsec/lookupreference', { data: self.criteria, busy: true }, function (data) {
         self.rdataset = data.icxrefreferlookupresults;
      });
   };

   // Perform search and update data set for the Customer grid
   self.csearch = function () {
      self.criteria.prod = self.criteria.cprod;
      DataService.post('api/ic/icsec/lookupcustomerreference', { data: self.criteria, busy: true }, function (data) {
         self.cdataset = data.icxrefcustlookupresults;
      });
   };

   // Perform search and update data set for the Vendor grid
   self.vsearch = function () {
      self.criteria.prod = self.criteria.vprod;
      DataService.post('api/ic/icsec/lookupvendorreference', { data: self.criteria, busy: true }, function (data) {
         self.vdataset = data.icxrefvendlookupresults;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.xrefTypeRow = function (row, col, value) {
      return self.xrefType(value);
   };

   self.xrefType = function (value) {
      if (value) {
         switch (value.toLowerCase()) {
            case 'i': //ignore jslint - correct indentation
               return $translate.instant('global.interchange'); //ignore jslint - correct indentation
            case 't': //ignore jslint - correct indentation
               return $translate.instant('global.auto.price'); //ignore jslint - correct indentation
            case 'b': //ignore jslint - correct indentation
               return $translate.instant('global.barcode'); //ignore jslint - correct indentation
            case 's': //ignore jslint - correct indentation
               return $translate.instant('global.substitute'); //ignore jslint - correct indentation
            case 'p': //ignore jslint - correct indentation
               return $translate.instant('global.supersede'); //ignore jslint - correct indentation
            case 'o': //ignore jslint - correct indentation
               return $translate.instant('global.option'); //ignore jslint - correct indentation
            case 'u': //ignore jslint - correct indentation
               return $translate.instant('global.upgrade'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         return value;
      }
   };
}); //end base

//Search Controllers
app.controller('IcsecSearchCtrl', function () {
}); //not used, but required

app.controller('IcsecReferenceSearchCtrl', function ($scope, $state, $translate, DataService, Utils, Sasc) { //as rsrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   self.byreference = 'product';
   self.recordTypes = [];

   //Set Record Types
   self.recordTypes.push({ value: '', label: $translate.instant('global.all') });
   if (Sasc.icintchgfl) {
      self.recordTypes.push({ value: 'i', label: $translate.instant('global.interchange') });
   }
   if (Sasc.ictrdsrvfl) {
      self.recordTypes.push({ value: 't', label: $translate.instant('global.auto.price') });
   }
   if (Sasc.icbarcdfl) {
      self.recordTypes.push({ value: 'b', label: $translate.instant('global.barcode') });
   }
   if (Sasc.icsubfl) {
      self.recordTypes.push({ value: 's', label: $translate.instant('global.substitute') });
   }
   if (Sasc.icsupcedfl) {
      self.recordTypes.push({ value: 'p', label: $translate.instant('global.supersede') });
   }
   if (Sasc.icoptionfl) {
      self.recordTypes.push({ value: 'o', label: $translate.instant('global.option') });
   }
   if (Sasc.icupgrfl) {
      self.recordTypes.push({ value: 'u', label: $translate.instant('global.upgrade') });
   }

   //Provides the label for the product look up based on the currently selected searchType
   self.prodLabel = function () {
      if (self.byreference === 'product') {
         return $translate.instant('global.product');
      } else {
         return $translate.instant('global.reference');
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      var currentSearchType = criteria.byreference; //to preserve search type selection
      base.initCriteria(); // Re-initialize criteria (for static values and record limit)
      criteria.byreference = currentSearchType; //to preserve search type selection
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icsec.master');
      }
      criteria.byreference = (self.byreference === 'reference');
      base.rsearch();
   };
}); //end ReferenceSearch (rsrch)

app.controller('IcsecCustomerSearchCtrl', function ($scope, $state, DataService, Utils) { //as csrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icsec.customerMaster');
      }
      base.csearch();
   };
}); //end CustoemrSerach (csrch)

app.controller('IcsecVendorSearchCtrl', function ($scope, $state, DataService, Utils) { //as vsrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icsec.master');
      }

      base.vsearch();
   };
}); //end VendorSearch (vsrch)

//Master Controllers
app.controller('IcsecMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) { //as mst - used for reference master
   var self = this;
   var base = $scope.base;

   //Provides the label for the proddisplay column header based on the currently selected searchType
   self.prodLabel = function () {
      if (base.criteria.byreference) {
         return $translate.instant('global.products');
      } else {
         return (base.lastRsearchType !== '' ? base.xrefType(base.lastRsearchType) + ' ' : '') + $translate.instant('global.references');
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.rsearch();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      // Go to detail state passing the row id
      $state.go('^.referenceDetail', {
         id: record.rowidIcsec
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.rgrid);
      if (record) {
         $state.go('^.referenceDetail.edit', {
            id: record.rowidIcsec
         });
      }
   };

   self.create = function () {
      $state.go('^.referenceCreate');
   };

   self.delete = function () { //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      var records = GridService.getSelectedRecords(base.rgrid);
      if (records) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var recordsToDelete = [];
            records.forEach(function (row) {
               recordsToDelete.push(row.rowidIcsec);
            });
            DataService.delete('api/ic/icsec/deletelistbyrowids', { data: recordsToDelete, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.rsearch();
            }); //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
         });
      }
   };
}); //end Master (mst)

app.controller('IcsecCustomerMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) { //as cmst
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.csearch();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      // Go to detail state passing the row id
      $state.go('^.customerDetail', {
         id: record.rowidIcsec
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.cgrid);
      if (record) {
         $state.go('^.customerDetail.edit', {
            id: record.rowidIcsec
         });
      }
   };

   self.create = function () {
      $state.go('^.customerCreate');
   };

   self.delete = function () { //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      var records = GridService.getSelectedRecords(base.cgrid);
      if (records) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var recordsToDelete = [];
            records.forEach(function (row) {
               recordsToDelete.push(row.rowidIcsec);
            });
            DataService.delete('api/ic/icsec/deletelistbyrowids', { data: recordsToDelete, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.csearch();
            }); //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
         });
      }
   };
}); //end CustomerMaster (cmst)

app.controller('IcsecVendorMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) { //as vmst
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.vsearch();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      // Go to detail state passing the row id
      $state.go('^.vendorDetail', {
         id: record.rowidIcsec
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.vgrid);
      if (record) {
         $state.go('^.vendorDetail.edit', {
            id: record.rowidIcsec
         });
      }
   };

   self.create = function () {
      $state.go('^.vendorCreate');
   };

   self.delete = function () { //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      var records = GridService.getSelectedRecords(base.vgrid);
      if (records) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var recordsToDelete = [];
            records.forEach(function (row) {
               recordsToDelete.push(row.rowidIcsec);
            });
            DataService.delete('api/ic/icsec/deletelistbyrowids', { data: recordsToDelete, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.vsearch();
            }); //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
         });
      }
   };
}); //end VendorMaster (vmst)

//Detail Controllers
app.controller('IcsecReferenceDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, ModalService, UserService, Sasc) { //as rdtl
   var self = this;
   var base = $scope.base;
   self.recordTypes = [];
   self.icsec = {};

   //Set Record Types
   if (Sasc.icintchgfl) {
      self.recordTypes.push({ value: 'i', label: $translate.instant('global.interchange') });
   }
   if (Sasc.ictrdsrvfl) {
      self.recordTypes.push({ value: 't', label: $translate.instant('global.auto.price') });
   }
   if (Sasc.icbarcdfl) {
      self.recordTypes.push({ value: 'b', label: $translate.instant('global.barcode') });
   }
   if (Sasc.icsubfl) {
      self.recordTypes.push({ value: 's', label: $translate.instant('global.substitute') });
   }
   if (Sasc.icsupcedfl) {
      self.recordTypes.push({ value: 'p', label: $translate.instant('global.supersede') });
   }
   if (Sasc.icoptionfl) {
      self.recordTypes.push({ value: 'o', label: $translate.instant('global.option') });
   }
   if (Sasc.icupgrfl) {
      self.recordTypes.push({ value: 'u', label: $translate.instant('global.upgrade') });
   }

   //Set local icsec record
   self.loadRecord = function () {

      var urltoGetRecord = '';
      var params = {};
      if ($stateParams.id) {
         urltoGetRecord = 'getbyrowid/' + $stateParams.id;
      } else if ($stateParams.pk) {
         urltoGetRecord = 'getbypk';
         params.rectype = $stateParams.pk;
         params.prod = $stateParams.pk2;
         params.keyno = $stateParams.pk3;
      };

      DataService.get('api/ic/icsec/' + urltoGetRecord, { params: params, busy: true }, function (data) {
         self.icsec = data;
         if (self.icsec.rectype === 'i' || self.icsec.rectype === 't' || self.icsec.rectype === 'b') { //swap fields for interchange, barcode, and auto price records
            self.prod = self.icsec.altprod;
            self.refProd = self.icsec.prod;
         } else { //otherwise maintain
            self.prod = self.icsec.prod;
            self.refProd = self.icsec.altprod;
         }
      });
   };

   self.loadRecord();

   //To create the labels for the prod and altprod fields
   self.labelByReference = function () {
      if (!self.icsec.rectype || self.icsec.rectype === null) {
         return $translate.instant('global.reference');
      } else {
         switch (self.icsec.rectype.toLowerCase()) {
            case 'i': //ignore jslint - correct indentation
               return $translate.instant('global.interchange.reference'); //ignore jslint - correct indentation
            case 't': //ignore jslint - correct indentation
               return $translate.instant('global.auto.price.reference'); //ignore jslint - correct indentation
            case 'b': //ignore jslint - correct indentation
               return $translate.instant('global.barcode.reference'); //ignore jslint - correct indentation
            case 's': //ignore jslint - correct indentation
               return $translate.instant('global.substitute.reference'); //ignore jslint - correct indentation
            case 'p': //ignore jslint - correct indentation
               return $translate.instant('global.supersede.reference'); //ignore jslint - correct indentation
            case 'o': //ignore jslint - correct indentation
               return $translate.instant('global.option.reference'); //ignore jslint - correct indentation
            case 'u': //ignore jslint - correct indentation
               return $translate.instant('global.upgrade.reference'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return $translate.instant('global.reference'); //ignore jslint - correct indentation
         }
      }
   };

   //To create the labels for the sell first type
   self.labelBySellFirst = function () {
      if (self.icsec && self.icsec.rectype) {
         switch (self.icsec.rectype.toLowerCase()) {
            case 's': //ignore jslint - correct indentation
               return $translate.instant('global.sell.substituted.first'); //ignore jslint - correct indentation
            case 'p': //ignore jslint - correct indentation
               return $translate.instant('global.sell.superseded.first'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return $translate.instant('global.reference'); //ignore jslint - correct indentation
         }
      }
   };

   //To grab the "proddisplay" for the page subtitle
   self.subtitle = function () {
      if (self.icsec.prod) {
         return $translate.instant('global.reference') + Constants.SUB_TITLE_SEPARATOR + self.icsec.prod;
      } else {
         return $translate.instant('global.reference');
      }
   };

   self.edit = function () {
      $state.go('.edit');
   };

   self.create = function () {
      $state.go('^.referenceCreate');
   };

   self.getStkUnitConversion = function (args) {
      DataService.post('api/ic/asicsetup/icvalidateproductunit', { data: { cProduct: self.prod, cUnit: args.value }, busy: true }, function (data) {
         self.dUnitConv = data.dUnitConv;
      }, function () {
         self.dUnitConv = '';
      });
   };

   self.cancel = function () {
      $state.go('^');
      self.loadRecord();
   };

   self.delete = function () { //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.delete('api/ic/icsec', { data: self.icsec, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.rsearch();
            $state.go('^.master', null, { reload: '^.master' });
         }); //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      });
   };

   self.submit = function () {
      if (self.icsec.rectype !== 'b' && self.icsec.unitstnd && self.icsec.unitstnd !== '') {
         self.icsec.unitstnd = '';
      }
      if (self.icsec.rectype === 'i' || self.icsec.rectype === 't' || self.icsec.rectype === 'b') { //swap fields for interchange, barcode, and auto price records
         self.icsec.prod = self.refProd;
         self.icsec.altprod = self.prod;
      } else { //otherwise maintain
         var prodChanged = (self.icsec.rectype === 'p' && self.icsec.altprod && self.icsec.altprod !== self.refProd); //if superscede product changed, mark (for opposite create)
         self.icsec.prod = self.prod;
         self.icsec.altprod = self.refProd;
      }
      DataService.update('api/ic/icsec', { data: self.icsec, busy: true }, function () { //update record
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if (prodChanged) { //if superscede product chagned
            self.createOpposite(true); //offer create opposite
         } else {
            self.saveBack();
         }
      });
   };

   self.saveBack = function () {
      base.criteria.byreference = false;
      base.criteria.rprod = (self.icsec.rectype === 'b') ? self.icsec.altprod : self.icsec.prod;
      base.criteria.type = '';
      base.rsearch();
      $state.go('^.^.master', null, { reload: '^.^.master' });
   };

   self.createOpposite = function (includeSuper) {
      self.oppositeCreate = {
         prod: self.icsec.prod,
         altprod: self.icsec.altprod,
         rectype: self.icsec.rectype
      };
      if (includeSuper) {
         self.superXrefCreate = {
            addmodefl: true,
            altprod: self.icsec.altprod,
            keyno: self.icsec.keyno,
            prod: self.icsec.prod,
            rectype: self.icsec.rectype
         };
      } else {
         self.superXrefCreate = null;
      }

      ModalService.showModal('ic/icsec/opposite-create.json', 'IcsecOppositeCreateModalCtrl as mod', $scope, function (modal) {
         self.createOppositeModal = modal;
      });
   };
}); //end ReferenceDetail (rdtl)

app.controller('IcsecCustomerDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService) { //as cdtl
   var self = this;
   var base = $scope.base;
   self.icsec = {};

   //Set local icsec record
   self.loadRecord = function () {
      DataService.get('api/ic/icsec/getbyrowid/' + $stateParams.id, { busy: true }, function (data) {
         self.icsec = data;

         //User Hook (do not rename)
         if (self.loadRecordContinue) {
            self.loadRecordContinue();
         }
      });
   };

   self.loadRecord();

   self.subtitle = function () {
      if (self.icsec.prod) {
         return $translate.instant('global.customer') + Constants.SUB_TITLE_SEPARATOR + self.icsec.prod;
      } else {
         return $translate.instant('global.customer');
      }
   };

   self.edit = function () {
      $state.go('.edit');
   };

   self.create = function () {
      $state.go('^.customerCreate');
   };

   self.cancel = function () {
      $state.go('^');
      self.loadRecord();
   };

   self.delete = function () { //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.delete('api/ic/icsec', { data: self.icsec, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.csearch();
            $state.go('^.customerMaster', null, { reload: '^.customerMaster' });
         }); //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      });
   };

   self.submit = function () {
      DataService.update('api/ic/icsec', { data: self.icsec, busy: true }, function () { //update record
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.saveBack();
      });
   };

   self.saveBack = function () {
      base.criteria.cprod = self.icsec.prod;
      base.criteria.custno = self.icsec.custno;
      base.criteria.shipto = self.icsec.shipto;
      base.csearch();
      $state.go('^.^.customerMaster', null, { reload: '^.^.customerMaster' });
   };
}); //end CustomerDetail (cdtl)

app.controller('IcsecVendorDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService) { //as vdtl
   var self = this;
   var base = $scope.base;
   self.icsec = {};

   //Set local icsec record
   self.loadRecord = function () {
      DataService.get('api/ic/icsec/getbyrowid/' + $stateParams.id, { busy: true }, function (data) {
         self.icsec = data;

         //User Hook (do not rename)
         if (self.loadRecordContinue) {
            self.loadRecordContinue();
         }
      });
   };

   self.loadRecord();

   self.subtitle = function () {
      if (self.icsec.prod) {
         return $translate.instant('global.vendor') + Constants.SUB_TITLE_SEPARATOR + self.icsec.prod;
      } else {
         return $translate.instant('global.vendor');
      }
   };

   self.edit = function () {
      $state.go('.edit');
   };

   self.create = function () {
      $state.go('^.vendorCreate');
   };

   self.cancel = function () {
      $state.go('^');
      self.loadRecord();
   };

   self.delete = function () { //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.delete('api/ic/icsec', { data: self.icsec, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.csearch();
            $state.go('^.customerMaster', null, { reload: '^.customerMaster' });
         }); //ignore jslint - delete used as standard function name (see setup-ctrl.js and others)
      });
   };

   self.submit = function () {
      DataService.update('api/ic/icsec', { data: self.icsec, busy: true }, function () { //update record
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.saveBack();
      });
   };

   self.saveBack = function () {
      base.criteria.vprod = self.icsec.prod;
      base.criteria.vendno = self.icsec.keyno;
      base.vsearch();
      $state.go('^.^.vendorMaster', null, { reload: '^.^.vendorMaster' });
   };
}); //end VendorDetail (vdtl)

//Create Controllers
app.controller('IcsecReferenceCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, ModalService, UserService, Sasc) { //as rdtl
   var self = this;
   var base = $scope.base;
   self.recordTypes = [];

   //Set Record Types
   if (Sasc.icintchgfl) {
      self.recordTypes.push({ value: 'i', label: $translate.instant('global.interchange') });
   }
   if (Sasc.ictrdsrvfl) {
      self.recordTypes.push({ value: 't', label: $translate.instant('global.auto.price') });
   }
   if (Sasc.icbarcdfl) {
      self.recordTypes.push({ value: 'b', label: $translate.instant('global.barcode') });
   }
   if (Sasc.icsubfl) {
      self.recordTypes.push({ value: 's', label: $translate.instant('global.substitute') });
   }
   if (Sasc.icsupcedfl) {
      self.recordTypes.push({ value: 'p', label: $translate.instant('global.supersede') });
   }
   if (Sasc.icoptionfl) {
      self.recordTypes.push({ value: 'o', label: $translate.instant('global.option') });
   }
   if (Sasc.icupgrfl) {
      self.recordTypes.push({ value: 'u', label: $translate.instant('global.upgrade') });
   }

   self.icsec = {
      cono: UserService.getCono(),
      rectype: self.recordTypes[0].value
   };

   //To create the labels for the prod and altprod fields
   self.labelByReference = function () {
      if (!self.icsec.rectype || self.icsec.rectype === null) {
         return $translate.instant('global.reference');
      } else {
         switch ((self.icsec.rectype).toLowerCase()) {
            case 'i': //ignore jslint - correct indentation
               return $translate.instant('global.interchange.reference'); //ignore jslint - correct indentation
            case 't': //ignore jslint - correct indentation
               return $translate.instant('global.auto.price.reference'); //ignore jslint - correct indentation
            case 'b': //ignore jslint - correct indentation
               return $translate.instant('global.barcode.reference'); //ignore jslint - correct indentation
            case 's': //ignore jslint - correct indentation
               return $translate.instant('global.substitute.reference'); //ignore jslint - correct indentation
            case 'p': //ignore jslint - correct indentation
               return $translate.instant('global.supersede.reference'); //ignore jslint - correct indentation
            case 'o': //ignore jslint - correct indentation
               return $translate.instant('global.option.reference'); //ignore jslint - correct indentation
            case 'u': //ignore jslint - correct indentation
               return $translate.instant('global.upgrade.reference'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return $translate.instant('global.reference'); //ignore jslint - correct indentation
         }
      }
   };

   //To create the labels for the sell first type
   self.labelBySellFirst = function () {
      if (self.icsec && self.icsec.rectype) {
         switch (self.icsec.rectype.toLowerCase()) {
            case 's': //ignore jslint - correct indentation
               return $translate.instant('global.sell.substituted.first'); //ignore jslint - correct indentation
            case 'p': //ignore jslint - correct indentation
               return $translate.instant('global.sell.superseded.first'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return $translate.instant('global.reference'); //ignore jslint - correct indentation
         }
      }
   };

   //To grab the "proddisplay" for the page subtitle
   self.subtitle = function () {
      return $translate.instant('global.reference') + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.new.record');
   };

   self.getStkUnitConversion = function (args) {
      DataService.post('api/ic/asicsetup/icvalidateproductunit', { data: { cProduct: self.prod, cUnit: args.value }, busy: true }, function (data) {
         self.dUnitConv = data.dUnitConv;
      }, function () {
         self.dUnitConv = '';
      });
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   self.submit = function () {
      if (self.icsec.rectype !== 'b' && self.icsec.unitstnd && self.icsec.unitstnd !== '') {
         self.icsec.unitstnd = '';
      }
      if (self.icsec.rectype === 'i' || self.icsec.rectype === 't' || self.icsec.rectype === 'b') { //swap fields for interchange, barcode, and auto price records
         self.icsec.prod = self.refProd;
         self.icsec.altprod = self.prod;
      } else { //otherwise maintain
         self.icsec.prod = self.prod;
         self.icsec.altprod = self.refProd;
      }
      if (self.icsec.rectype !== 't' && self.icsec.keyno && self.icsec.keyno !== 0) {
         self.icsec.keyno = 0;
      } else {
         //NOTE:  We need to assign this to a non-zero value so the Usage gets moved over properly for Supercedes.
         //It's fine we hard code it as 1, even though there may already be existing sequences.  The backend call
         //will assign it sequentially properly.  It's just important that this is set to 1 from the UI.
         self.icsec.keyno = 1;
      }
      var icsecExistsCriteria = { //create search criteria for exists (by type, prod, and altprod)
         rectype: self.icsec.rectype,
         prod: self.icsec.prod,
         altprod: self.icsec.altprod
      };
      DataService.post('api/ic/icsec/geticsecsbytypeprodaltprod', { data: icsecExistsCriteria, busy: true }, function (data) { //get existing records
         if (data.length === 0) { //if record does not already exist
            DataService.create('api/ic/icsec', { data: self.icsec, busy: true }, function () { //create new record
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               if (self.icsec.rectype === 'p' || self.icsec.rectype === 's') { //if superscede or substitute product
                  self.createOpposite(self.icsec.rectype === 'p'); //offer create opposite
               } else {
                  self.saveBack();
               }
            });
         } else {
            MessageService.error('global.error', 'global.create.alreadyexists');
         }
      });
   };

   self.saveBack = function () {
      base.criteria.byreference = false;
      base.criteria.rprod = self.icsec.prod;
      base.criteria.type = '';
      base.rsearch();
      $state.go('^.master', null, { reload: '^.master' });
   };

   self.createOpposite = function (includeSuper) {
      self.oppositeCreate = {
         prod: self.icsec.prod,
         altprod: self.icsec.altprod,
         rectype: self.icsec.rectype
      };
      if (includeSuper) {
         self.superXrefCreate = {
            addmodefl: true,
            altprod: self.icsec.altprod,
            keyno: self.icsec.keyno,
            prod: self.icsec.prod,
            rectype: self.icsec.rectype
         };
      } else {
         self.superXrefCreate = null;
      }
      ModalService.showModal('ic/icsec/opposite-create.json', 'IcsecOppositeCreateModalCtrl as mod', $scope, function (modal) {
         self.createOppositeModal = modal;
      });
   };
}); //end ReferenceCreate (rdtl)

app.controller('IcsecCustomerCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, ModalService, UserService) { //as cdtl
   var self = this;
   var base = $scope.base;
   self.icsec = {
      cono: UserService.getCono(),
      custno: base.criteria.custno,
      shipto: base.criteria.shipto
   };

   self.subtitle = function () {
      return $translate.instant('global.customer') + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.new.record');
   };

   self.cancel = function () {
      $state.go('^.customerMaster');
   };

   self.submit = function () {
      if (self.icsec.shipto && self.icsec.shipto !== null && self.icsec.shipto !== '' && self.icsec.shipto !== 0) {
         self.icsec.rectype = 'h';
      } else {
         self.icsec.rectype = 'c';
      }
      DataService.create('api/ic/icsec', { data: self.icsec, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.saveBack();
      });
   };

   self.saveBack = function () {
      base.criteria.cprod = self.icsec.prod;
      base.criteria.custno = self.icsec.custno;
      base.criteria.shipto = self.icsec.shipto;
      base.csearch();
      $state.go('^.customerMaster', null, { reload: '^.customerMaster' });
   };
}); //end CustomerCreate (cdtl)

app.controller('IcsecVendorCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, ModalService, UserService) { //as vdtl
   var self = this;
   var base = $scope.base;
   var now = new Date();
   now.setTime(Date.now());
   self.icsec = {
      cono: UserService.getCono(),
      rectype: 'v',
      lastchgdt: now //required - api does not populate automatically
   };

   self.subtitle = function () {
      return $translate.instant('global.vendor') + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.new.record');
   };

   self.cancel = function () {
      $state.go('^.vendorMaster');
   };

   self.submit = function () {
      DataService.create('api/ic/icsec', { data: self.icsec, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.saveBack();
      });
   };

   self.saveBack = function () {
      base.criteria.vprod = self.icsec.prod;
      base.criteria.vendno = self.icsec.keyno;
      base.vsearch();
      $state.go('^.vendorMaster', null, { reload: '^.vendorMaster' });
   };
}); //end CustomerCreate (cdtl)

//Opposite Create Modal window controller
app.controller('IcsecOppositeCreateModalCtrl', function ($scope, $translate, DataService) { //as mod
   var self = this;
   self.IcsecOppositeCreateSettings = {
      createsubstitute: $translate.instant('question.create.opposite.substitute')
   };

   //Set pieces based on state:
   var modalParent = $scope.rdtl;
   self.oppositeCreate = modalParent.oppositeCreate;
   self.superXrefCreate = modalParent.superXrefCreate;

   // Get settings
   DataService.post('api/ic/asicsetup/icsecoppositescreenenablement', { data: { cProduct: modalParent.icsec.prod, cXrefType: modalParent.icsec.rectype }, busy: true }, function (data) {
      self.IcsecOppositeCreateSettings = data;
   });

   // Cancel action
   self.cancel = function () {
      modalParent.saveBack();
      modalParent.createOppositeModal.destroy();
   };

   // Submit action
   self.submit = function () {
      if (self.oppositeCreate) {
         if (self.superXrefCreate && self.superXrefCreate !== null) {
            DataService.post('api/ic/asicsetup/icsecsuperxrefcreate', { data: self.superXrefCreate, busy: true }, function () {
               self.oppositeCreateCall();
            });
         } else {
            self.oppositeCreateCall();
         }
      }
   };

   self.oppositeCreateCall = function () {
      DataService.post('api/ic/asicsetup/icsecoppositecreate', { data: self.oppositeCreate, busy: true }, function () {
         modalParent.saveBack();
         modalParent.createOppositeModal.destroy();
      });
   };
}); //end OppositeCreateModal (mod)